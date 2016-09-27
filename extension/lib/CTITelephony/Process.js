/*
*	Telephone Number Detection
*	Source © CTI Telephony
*	CTITelephony@GMail.com
*/


var Process = function() {

    var sendPageRequest = function(request) {
        var requestOptions = {};
        switch (request) {
            case 'parseDOM':
                requestOptions.parseDOM = true;
                break;
            case 'clearDOM':
                requestOptions.clearDOM = true;
                break;
			case 'isPageComplete':
                requestOptions.isPageComplete = true;
                break;
        }
		
		chrome.tabs.query({}, function(tabs) {
			for (var i=0; i<tabs.length; ++i) {
				chrome.tabs.sendMessage(tabs[i].id, requestOptions);
			}
		});

    };

    var pref = Preferences; // alias for the Preferences object
    return {
        init: function() {
            var ON = pref.get('enabled');
            if (ON) {
                this.enable();
            } else {
                this.disable();
            }
        },
        enable: function() {
            sendPageRequest('parseDOM');
        },
        disable: function() {
            pref.set('enabled', false);
            sendPageRequest('clearDOM');
        },
		isPageComplete: function() {
            sendPageRequest('isPageComplete');
        },
        toggle: function() {
            var ON = pref.get('enabled');
            if (ON) {
                this.disable();
            } else {
                this.enable();
            }
        }
    }
}

var Preferences = {
    defaults: {
        timeout: 3000,
        enabled: true
    },
    set: function(name, value) {
        window.localStorage[name] = JSON.stringify(value);
        chrome.storage.sync.set({'telEnabled': value});
    },
    get: function(name) {
        var value = window.localStorage[name];
        if (value == null || value == undefined) { value = this.defaults[name]; }
        else { value = JSON.parse(value); }
        return value;
    }
};