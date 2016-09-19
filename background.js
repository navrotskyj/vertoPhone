var phoneWindow = null,
	session,
	db = getVertoDB();

var Session = function (option) {
	this.verto = new $.verto({
		login: option.login,
		passwd: option.password,
		socketUrl: option.server
	}, this);
	
	this.vertoLogin = option.login;
	this.activeCalls = {
	};
	this.isLogin = false;

	this.verto.login();
};

Session.prototype.logout = function () {
	this.verto.logout();
};

Session.prototype.makeCall = function (number, option) {
	this.verto.newCall({
		destination_number: number,
		caller_id_name: this.vertoLogin,
		caller_id_number: this.vertoLogin,
		useVideo: false,
		useStereo: false
	});
};

Session.prototype.dropCall = function (id) {
	var call = this.verto.dialogs[id];
	if (call)
		call.hangup();
};

Session.prototype.answerCall = function (id, params) {
	var call = this.verto.dialogs[id];
	if (call) {
		call.answer();
	}
};

Session.prototype.holdCall = function (id) {
	var call = this.verto.dialogs[id];
	if (call) {
		call.hold();
	}
};
Session.prototype.unholdCall = function (id) {
	var call = this.verto.dialogs[id];
	if (call) {
		call.unhold();
	}
};

Session.prototype.onGetVideoContainer = function (d) {
	var video = document.createElement('video');
	video.id = d.callID;
	video.style.display = 'none';
	document.body.appendChild(video);
	d.params.tag = video.id;
};

Session.prototype.onWSLogin = function (e, success) {
	console.info('onWSLogin');
	this.isLogin = success;
	if (success) {
		createNotification('Login', 'Success', 'login ' + this.vertoLogin, 'images/bell64.png', 2000)
	} else {
		createNotification('Login', 'Error', 'bad credentials ' + this.vertoLogin, 'images/error64.png', 10000)
	}
};

Session.prototype.onWSClose = function (e) {
	console.info('onWSClose');
	console.info(e);
	this.isLogin = false;
};

Session.prototype.onEvent = function (e) {
	console.info('onEvent');
	console.info(e);
};

Session.prototype.onError = function (dialog, e) {
	this.lastError = {
		dialog: dialog,
		error: e
	}
};



Session.prototype.onDialogState = function (d) {
	switch (d.state) {
		case $.verto.enum.state.recovering:
		case $.verto.enum.state.ringing:
		case $.verto.enum.state.requesting:
			this.activeCalls[d.callID] = new Call(d);
			if (d.direction == $.verto.enum.direction.inbound) {
				createNotification(
					"New call",
					d.params.remote_caller_id_number,
					d.params.remote_caller_id_name,
					'images/call64.png'
				);
			}
			break;
		case $.verto.enum.state.active:
			var dialogs = this.verto.dialogs;
			for (var key in dialogs) {
				if (key != d.callID && dialogs.hasOwnProperty(key) && dialogs[key].state == $.verto.enum.state.active) {
					dialogs[key].hold();
				}
			}
		case $.verto.enum.state.trying:
		case $.verto.enum.state.held:
			if (this.activeCalls.hasOwnProperty(d.callID)) {
				this.activeCalls[d.callID].setState(d.state.name)
			}
			break;
		case $.verto.enum.state.hangup:
		case $.verto.enum.state.destroy:
			var videoTag = document.getElementById(d.callID);
			if (videoTag) {
				videoTag.remove();
			}

			delete this.activeCalls[d.callID];
			break;
		default:
			console.warn('No handle: ', d.state);
			this.activeCalls[d.callID].setState(d.state.name);

	}

	console.log(this.activeCalls);
	sendSession('changeCall', this.activeCalls);
};

var Call = function (d) {
	this.id = d.callID;
	this.direction = d.direction;
	this.cause = d.cause;
	this.answered = d.answered;
	this.attach = d.attach;
	this.calleeIdName = d.params.remote_caller_id_name;
	this.calleeIdNumber = d.params.remote_caller_id_number;
	this.callerIdName = d.params.caller_id_name;
	this.callerIdNumber = d.params.caller_id_number;
	this.state = 'newCall';
};

Call.prototype.setState = function (state) {
	this.state = state;
};

chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', 
		{
			id: "vertoPhone",
			innerBounds: {
				width: 235,
				height: 430,
				minWidth: 235,
				maxWidth: 235,
				minHeight: 430
			}
		},
		function (window) {
			phoneWindow = window;
			phoneWindow.contentWindow.onload = function () {
				phoneWindow.session = session;
				chrome.storage.local.get('settings', function(data) {
					phoneWindow.contentWindow.vertoSession = session;

					sendSession('init', {
						settings: (data && data.settings) || {},
						activeCalls: session && session.activeCalls,
						logged: session && session.isLogin
					});
				});
			};

		}
	);

	chrome.storage.local.get('settings', function(data) {
		if (!session && data && data.settings) {
			session = new Session(data && data.settings);
		}
	});
});

function makeCall(number, options) {
	session.makeCall(number, options);
}

function sendSession(action, obj) {
	chrome.runtime.sendMessage({
		action: action,
		data: obj,
	});
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.action && vertoAction[request.action])
			vertoAction[request.action](request.data);
	}
);

var vertoAction = {
	saveSettings: saveSettings
};

function saveSettings(data) {
	var obj = {
		settings: data
	};
	chrome.storage.local.set(obj, function () {

		if (session) {
			session.logout();
		}

		session = new Session(obj.settings);

		if (phoneWindow)
			phoneWindow.contentWindow.vertoSession = session;

		createNotification('Save', 'Saved settings', '', 'images/success64.png', 2000);
	});
}

function createNotification(title, messsage, contextMessage, imgUri, time) {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: imgUri || 'images/phone16.png',
		title: title,
		message: messsage,
		contextMessage: contextMessage
	}, function (id) {
		console.log(id);
		if (time)
			setTimeout(function () {
				chrome.notifications.clear(id)
			}, time)
	});

}
