/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.callService', [])
    .service('CallService', function ($window, $rootScope) {
    return {
        makeCall: function (number, params) {
            $window.vertoSession.makeCall(number, params);
        },

        dropCall: function (id) {
            $window.vertoSession.dropCall(id);
        },

        answerCall: function (id, params) {
            $window.vertoSession.answerCall(id, params);
        },

        getCallStream: function (id) {
            return $window.vertoSession.getCallStream(id);
        },        

        holdCall: function (id) {
            $window.vertoSession.holdCall(id);
        },

        unholdCall: function (id) {
            $window.vertoSession.unholdCall(id);
        },

        toggleHold: function (id) {
            $window.vertoSession.toggleHold(id);
        },

        toggleMute: function (id) {
            $window.vertoSession.toggleMute(id);
        },

        dtmf: function (id, d) {
            $window.vertoSession.dtmf(id, d);
        },

        transfer: function (id, dest) {
            if (!dest) {
                return false;
            }

            $window.vertoSession.transfer(id, dest);
        },

        openVideo: function (id) {
            $window.vertoSession.openVideo(id);
        },

        openMenu: function (id, name) {
            $window.vertoSession.openMenu(id, name);
        },

        setValue: function (id, key, value) {
            if ($window.vertoSession[id]) {
                $window.vertoSession[id][key] = value;
            }
        },
        getValue: function (id, key) {
            if ($window.vertoSession[id]) {
                return $window.vertoSession[id][key];
            }
        }
    }
});