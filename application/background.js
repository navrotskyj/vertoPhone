const helper = Helper;

modelVerto.init();

helper.refreshVertoDevice();
helper.init();


chrome.notifications.onClosed.addListener((notifId, byUser) => {
	if (byUser && Helper.missedNotifications.hasOwnProperty(notifId))
		delete Helper.missedNotifications[notifId];
});

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
	console.log(notifId);
	if (Helper.missedNotifications.hasOwnProperty(notifId)) {
		if (btnIdx === 0 && Helper.session) {
			Helper.session.makeCall(Helper.missedNotifications[notifId].number);
		}
		delete  Helper.missedNotifications[notifId];
		chrome.notifications.clear(notifId);
		return;
	}
	const calls = Helper.session && Helper.session.activeCalls;
	for (let key in calls) {
		if (calls[key].notificationId == notifId) {
			if (btnIdx) { // answer
				Helper.session.dropCall(key)
			} else {
				Helper.session.answerCall(key)
			}
		}
	}
	chrome.notifications.clear(notifId);
});

chrome.app.runtime.onLaunched.addListener(() => {
	Helper.createVertoWindow();
});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.action && vertoAction[request.action])
			vertoAction[request.action](request.data);
	}
);

chrome.runtime.onConnectExternal.addListener((port) => {
	if (port.name === 'vertoExtension') {
		let extensionPort = Helper.extensionPort = port;
		console.debug(`Open port vertoExtension`);
		extensionPort.onDisconnect.addListener(() => {
			console.warn(`Close port vertoExtension`);
			extensionPort = null;
		});
		if (Helper.session && Helper.session.isLogin) {
			Helper.session.sendLoginToExtension();
		} else {
			extensionPort.postMessage({
				action: "noLiveConnect",
				data: {}
			});
		}
		extensionPort.onMessage.addListener((data) => {
			if (data && data.action && vertoAction.hasOwnProperty(data.action)) {
				return vertoAction[data.action](data.data);
			}
		});
	} else {
		port.disconnect()
	}
});


const vertoAction = {
	saveSettings: Helper.saveSettings,
	makeCall: (params = {}) => {
		if (Helper.session) {
			Helper.session.makeCall(params.number, params.option);
		}
	}
};