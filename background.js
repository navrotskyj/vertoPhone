console.log('init bg', $.verto);

var phoneWindow = null,
	session;

var Session = function (option) {
	this.verto = new $.verto({
		login: option.login,
		passwd: option.password,
		socketUrl: option.server
	}, this);

	this.verto.login();
};

Session.prototype.onWSLogin = function (e) {
	console.info('onWSLogin');
	console.info(e);
};

Session.prototype.onWSClose = function (e) {
	console.info('onWSClose');
	console.info(e);
};

Session.prototype.onEvent = function (e) {
	console.info('onEvent');
	console.info(e);
};

Session.prototype.onDialogState = function (d) {
	createNotification(d.state.name, d.callID, d.state.name)
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
				chrome.storage.local.get('settings', function(data) {
					phoneWindow.contentWindow.vertoPhone.setSettings( (data && data.settings) || {});
					phoneWindow.contentWindow.vertoPhone.on('saveSettings', saveSettings)
				});
			};

		}
	);

	chrome.storage.local.get('settings', function(data) {
		if (data && data.settings) {
			session = new Session(data && data.settings);
		} else {
			createNotification('FACK')
		}
	});
});

function saveSettings(e, data) {
	var obj = {
		settings: data
	};
	chrome.storage.local.set(obj, function () {
		createNotification('Saved', 'Saved', '');
	});
}

function createNotification(title, messsage, contextMessage) {
	chrome.notifications.create({
		type: 'basic',
		iconUrl: 'images/phone16.png',
		title: title,
		message: messsage,
		contextMessage: contextMessage
	});
}
