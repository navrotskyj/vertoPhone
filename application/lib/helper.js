/**
 * Created by igor on 30.09.16.
 */

"use strict";

const SETTINGS_LOCAL_STORAGE = ['selectedAudio', 'selectedSpeaker', 'selectedVideo', 'sessid'];

const Helper = {
    session: null,
    missedNotifications: {},
    videoParamsBest: {},
    extensionPort: null,

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
        this.createNotification({
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
                alwaysOnTop: this.session && this.session.alwaysOnTop,
                innerBounds: {
                    width: 235,
                    height: 430,
                    minWidth: 235,
                    maxWidth: 235,
                    minHeight: 430
                }
            },
            (window) => {
                phoneWindow = window;
                phoneWindow.contentWindow.vertoDevices = {
                    audioInDevices: $.verto.audioInDevices,
                    audioOutDevices: $.verto.audioOutDevices,
                    videoDevices: $.verto.videoDevices
                };

                phoneWindow.contentWindow.onload = () => {
                    phoneWindow.session = this.session;

                    this.getSettings(function (data) {
                        phoneWindow.contentWindow.vertoSession = session;

                        this.sendSession('init', {
                            settings: data || {},
                            activeCalls: this.session && this.session.activeCalls,
                            logged: this.session && this.session.isLogin
                        });
                    });
                };
            }
        );
    },

    getSettings: (cb) => {
        if (this.session && this.session._settings)
            return cb(this.session._settings);

        let settings = {};

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
    }
};