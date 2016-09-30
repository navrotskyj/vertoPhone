/**
 * Created by igor on 30.09.16.
 */

"use strict";

const SETTINGS_LOCAL_STORAGE = ['selectedAudio', 'selectedSpeaker', 'selectedVideo', 'sessid'];

let Helper = {
    session: null,
    phoneWindow: null,
    missedNotifications: {},
    videoParamsBest: {},
    extensionPort: null,

    init: () => {
        const video = document.createElement('video');
        video.id = "localTagVideo";
        video.volume = 1;
        video.style.display = 'none';
        document.body.appendChild(video);

        Helper.getSettings(data => {
            if (!Helper.session && data && data.server) {
                Helper.session  = new Session(data);
            }
        });
    },

    refreshVertoDevice: () => {
        $.verto.init({skipPermCheck: true}, ()=> {
            Helper.videoParamsBest = {};
            let count = $.verto.videoDevices.length;

            $.verto.videoDevices.forEach( (i) => {
                console.log('try check test video ', i);
                $.FSRTC.getValidRes(i.id, (r) => {
                    Helper.videoParamsBest[i.id] = {
                        w: r.bestResSupported[0],
                        h: r.bestResSupported[1]
                    };

                    if (!--count && Helper.session && Helper.videoParamsBest[Helper.session.selectedVideo]) {
                        Helper.session.verto.videoParams({
                            minWidth: Helper.videoParamsBest[Helper.session.selectedVideo].w,
                            minHeight: Helper.videoParamsBest[Helper.session.selectedVideo].h,
                            maxWidth: Helper.videoParamsBest[Helper.session.selectedVideo].w,
                            maxHeight: Helper.videoParamsBest[Helper.session.selectedVideo].h
                        })
                    }
                });


            })
        })
    },

    deleteDomain: (param) => {
        if (typeof param == "string") {
            let i = param.indexOf('@');
            if (~i) {
                param = param.substr(0, i);
            }
        }
        return param;
    },

    sendSession: (action, obj) => {
        chrome.runtime.sendMessage({
            action: action,
            data: obj
        });
    },

    getWindowById: (id) => {
        return chrome.app.window.get(id);
    },

    clearNotificationId: (id) => {
        chrome.notifications.clear(id);
    },

    createNotificationMsg: (title, messsage, contextMessage, imgUri, time) => {
        Helper.createNotification({
            type: 'basic',
            iconUrl: imgUri || 'images/phone16.png',
            title: title,
            message: messsage,
            contextMessage: contextMessage
        }, (id) => {
            console.log(id);
            if (time)
                setTimeout(() => {
                    chrome.notifications.clear(id)
                }, time)
        });
    },

    createNotification: (params, cb) => {
        chrome.notifications.create(params, cb);
    },

    createVertoWindow: () => {
        chrome.app.window.create('index.html',
            {
                id: "vertoPhone",
                alwaysOnTop: Helper.session && Helper.session.alwaysOnTop,
                innerBounds: {
                    width: 235,
                    height: 430,
                    minWidth: 235,
                    maxWidth: 235,
                    minHeight: 430
                }
            },
            (window) => {
                const phoneWindow = Helper.phoneWindow = window;
                phoneWindow.contentWindow.vertoDevices = {
                    audioInDevices: $.verto.audioInDevices,
                    audioOutDevices: $.verto.audioOutDevices,
                    videoDevices: $.verto.videoDevices
                };

                phoneWindow.contentWindow.onload = () => {
                    phoneWindow.vertoSession = Helper.session;

                    Helper.getSettings(function (data) {
                        phoneWindow.contentWindow.vertoSession = Helper.session;

                        Helper.sendSession('init', {
                            settings: data || {},
                            activeCalls: Helper.session && Helper.session.activeCalls,
                            logged: Helper.session && Helper.session.isLogin
                        });
                    });
                };
            }
        );
    },

    getSettings: (cb) => {
        if (Helper.session && Helper.session._settings)
            return cb(Helper.session._settings);

        let settings = {
            iceServers: true,
            ring: true,
            alwaysOnTop: true
        };

        function copyTo(to, from) {
            for (var key in from) {
                if (from.hasOwnProperty(key)) {
                    to[key] = from[key]
                }
            }
        }

        chrome.storage.sync.get('settings', function (sync) {
            copyTo(settings, sync && sync.settings);
            chrome.storage.local.get('settings', function (local) {
                copyTo(settings, local && local.settings);
                cb(settings);
            });
        });
    },

    setSettings: (data, cb) => {
        var sync = {};
        var local = {};

        for (var key in data) {
            if (!data.hasOwnProperty(key)) continue;

            if (~SETTINGS_LOCAL_STORAGE.indexOf(key)) {
                local[key] = data[key]
            } else {
                sync[key] = data[key]
            }
        }

        chrome.storage.sync.set({settings: sync});
        chrome.storage.local.set({settings: local}, cb);
    },

    saveSettings: (data) => {
        if (!data.sessid ) {
            data.sessid = $.verto.genUUID();
        }

        Helper.setSettings(data, () => {
            if (Helper.session) {
                Helper.session.logout();
            }

            Helper.session = new Session(data);

            if (Helper.phoneWindow)
                Helper.phoneWindow.contentWindow.vertoSession = Helper.session;

            Helper.createNotificationMsg('Save', 'Saved settings', '', 'images/success64.png', 2000);
        });
    }
};