var phoneWindow = null,
	session,
	maxCallCount = 5;

modelVerto.init();

var video = document.createElement('video');
video.id = "localTagVideo";
video.volume = 1;
video.style.display = 'none';
document.body.appendChild(video);

var missedNotifications = {};

var Session = function (option) {
	this.vertoLogin = option.login;

	this.notificationMissed = option.notificationMissed;
	this.notificationNewCall = option.notificationNewCall;

	if (option.ring) {
		this.ring = 'sound/iphone.mp3';
	}

	this.verto = new $.verto({
		login: option.login,
		passwd: option.password,
		socketUrl: option.server,
		ringFile: this.ring,
		localTag: 'localTagVideo'
	}, this);

	this.activeCalls = {

	};
	this.isLogin = false;

	this.verto.login();
};

Session.prototype.listCollection = function (collectionName, params, cb) {
	modelVerto.list(collectionName, params, cb);
};

Session.prototype.logout = function () {
	this.verto.logout();
};

Session.prototype.makeCall = function (number, option) {
	this.verto.newCall({
		destination_number: number,
		caller_id_name: this.vertoLogin,
		caller_id_number: this.vertoLogin,
		useVideo: option && option.useVideo,
		useStereo: false
	});
};

Session.prototype.getCallStream = function (id) {
	var call = this.verto.dialogs[id];
	if (call) {
		return {
			localStream: call.rtc.localStream,
			remoteStream: call.rtc.remoteStream
		}
	}
};

Session.prototype.onRemoteStream = function (d) {
	var call = this.activeCalls[d.callID];
	if (call) {
		call.initRemoteStream = true;
		sendSession('changeCall', this.activeCalls);
	}
};

Session.prototype.dropCall = function (id) {
	var call = this.verto.dialogs[id];
	if (call) {
		call.userDropCall = true;
		call.hangup();
	}
};

Session.prototype.answerCall = function (id, params) {
	var d = this.verto.dialogs[id];
	var call = this.activeCalls[id];
	if (d && call && !call.onActiveTime) {
		d.answer({
			useVideo: params && params.useVideo
		});
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

Session.prototype.toggleHold = function (id) {
	var call = this.verto.dialogs[id];
	if (call) {
		call.toggleHold();
	}
};

Session.prototype.dtmf = function (id, d) {
	var call = this.verto.dialogs[id];
	if (call) {
		call.dtmf(d);
	}
};

Session.prototype.openMenu = function (id, name) {
	var call = this.activeCalls[id];
	if (call) {
		call.openMenu(name);
		sendSession('changeCall', this.activeCalls);
	}
};

Session.prototype.openVideo = function (id) {
	var call = this.activeCalls[id];
	var scope = this;
	if (call && call.initRemoteStream) {
		console.warn('open window');
			chrome.app.window.create('app/view/videoCall.html',
				{
					id: id,
					// alwaysOnTop: true,
					innerBounds: {
						width: 640,
						height: 480
					}
				},
				function (window) {
					window.contentWindow.onload = function (e) {
						var videoR = e.target.getElementById('remoteVideo');
						var videoL = e.target.getElementById('localVideo');
						if (videoR) {
							var stream = scope.getCallStream(id);
							if (stream) {
								videoR.srcObject = stream.remoteStream;
								videoR.play();
								videoL.srcObject = stream.localStream;
								videoL.play();
							}
						}
					}
				}
			);
	}
}

Session.prototype.transfer = function (id, dest, params) {
	var dialog = this.verto.dialogs[id];
	if (dialog)
		dialog.transfer(dest, params);
};

Session.prototype.toggleMute = function (id) {
	var call = this.activeCalls[id];
	var dialog = this.verto.dialogs[id];

	if (call && dialog) {
		call.setMute(dialog.setMute('toggle'));
		sendSession('changeCall', this.activeCalls);
	}
};

Session.prototype.onGetVideoContainer = function (d) {
	var video = document.createElement('video');
	video.id = d.callID;
	video.volume = 1;
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


// TODO
// Session.prototype.onMessage = function (v, n, e, msg) {
// 	console.log(arguments);
// 	var _msg = {
// 		from: msg.from,
// 		to: msg.to,
// 		body: msg.body,
// 		createdOn: Date.now(),
// 		direction: "inbound"
// 	};
//
// 	modelVerto.add('chat', _msg, function (err) {
// 		if (err)
// 			console.error(err);
// 	});
// 	sendSession('chat', _msg);
// };

Session.prototype.onDialogState = function (d) {
	switch (d.state) {
		case $.verto.enum.state.recovering:
		case $.verto.enum.state.ringing:
		case $.verto.enum.state.requesting:
			if (Object.keys(this.activeCalls).length >= maxCallCount) {
				d.hangup();
				return;
			}
			d.createdOn = Date.now();
			this.activeCalls[d.callID] = new Call(d);
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
			if (this.activeCalls[d.callID]) {
				modelVerto.add('history', {
					createdOn: d.createdOn,
					answeredOn: this.activeCalls[d.callID].onActiveTime,
					hangupOn: Date.now(),
					endCause: d.cause,
					number: d.params.remote_caller_id_number,
					direction: d.direction.name
				}, function (err) {
					if (err)
						console.error(err);
				});
				if (this.activeCalls[d.callID]) {
					this.activeCalls[d.callID].destroy(d.userDropCall);
					delete this.activeCalls[d.callID];
				}
			}
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
	this.useVideo = d.params.useVideo;
	this.state = 'newCall';
	this.onActiveTime = null;
	this.menuName = '';
	this.mute = false;
	this.initRemoteStream = false;
	this.dtmf = [];

	if (this.direction == $.verto.enum.direction.inbound) {
		this.showNewCall();
	}
};

Call.prototype.setMute = function (mute) {
	this.mute = mute;
};

Call.prototype.setState = function (state) {
	this.state = state;
	if (!this.onActiveTime && state == 'active') {
		this.onActiveTime = Date.now();
		if (this.notificationId)
			chrome.notifications.clear(this.notificationId);
	}
};

Call.prototype.openMenu = function (name) {
	this.menuName = name;
};

Call.prototype.destroy = function (userDropCall) {
	if (this.notificationId)
		chrome.notifications.clear(this.notificationId);

	if (!userDropCall && !this.onActiveTime)
		this.showMissed();

	if (this.useVideo) {
		var videoWindow = chrome.app.window.get(this.id);
		if (videoWindow)
			videoWindow.close();
	}
};

Call.prototype.showNewCall = function () {
	if  (session && session.notificationNewCall) {
		var scope = this;
		chrome.notifications.create({
			type: 'basic',
			iconUrl: 'images/call64.png',
			title: "New call",
			message: this.calleeIdNumber,
			contextMessage: this.calleeIdName,
			requireInteraction: true,
			buttons: [
				{
					title: "Answer",
					iconUrl: "images/call64.png"
				},
				{
					title: "Hangup",
					iconUrl: "images/error64.png"
				}
			]
		}, function (id) {
			console.log(id);
			scope.notificationId = id;
		});
	} else {
		if (!chrome.app.window.get('vertoPhone'))
			createVertoWindow();
	}

};

Call.prototype.showMissed = function () {
	if  (session && session.notificationMissed) {
		var number = this.calleeIdNumber;
		chrome.notifications.create({
			type: 'basic',
			iconUrl: 'images/error64.png',
			title: "Missed call!",
			message: number,
			contextMessage: this.calleeIdName + '(' + new Date().toLocaleString() + ')',
			requireInteraction: true,
			buttons: [
				{
					title: "Reply",
					iconUrl: "images/call64.png"
				},
				{
					title: "OK",
					iconUrl: "images/success64.png"
				}
			]
		}, function (id) {
			console.log(id);
			missedNotifications[id] = {
				number: number
			}
		});
	}
};

chrome.notifications.onClosed.addListener(function (notifId, byUser) {
	if (byUser && missedNotifications.hasOwnProperty(notifId))
		delete missedNotifications[notifId];
});

chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
	console.log(notifId);
	if (missedNotifications.hasOwnProperty(notifId)) {
		if (btnIdx === 0 && session) {
			session.makeCall(missedNotifications[notifId].number);
		}
		delete  missedNotifications[notifId];
		chrome.notifications.clear(notifId);
		return;
	}
	var calls = session && session.activeCalls;
	for (var key in calls) {
		if (calls[key].notificationId == notifId) {
			if (btnIdx) { // answer
				session.dropCall(key)
			} else {
				session.answerCall(key)
			}
		}
	}
	chrome.notifications.clear(notifId);
});

chrome.app.runtime.onLaunched.addListener(function() {
	createVertoWindow();
});


chrome.storage.local.get('settings', function(data) {
	if (!session && data && data.settings) {
		session = new Session(data && data.settings);
	}
});

function createVertoWindow() {
	chrome.app.window.create('index.html',
		{
			id: "vertoPhone",
			// alwaysOnTop: true,
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
}

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
