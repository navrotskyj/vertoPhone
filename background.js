console.log('init bg');

var phoneWindow = null;
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
			chrome.storage.local.get('settings', function(data) {
				phoneWindow.contentWindow.phone.setSettings(data);
				phoneWindow.contentWindow.phone.on('saveSettings', saveSettings)
			});
		}
	);
});

function saveSettings(e, data) {
	chrome.storage.local.set(data);
}