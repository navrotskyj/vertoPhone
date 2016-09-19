/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.callService', [])
    .service('CallService', function ($window) {
    return {
        makeCall: function (number) {
            $window.vertoSession.makeCall(number);
        },

        dropCall: function (id) {
            $window.vertoSession.dropCall(id);
        },

        answerCall: function (id) {
            $window.vertoSession.answerCall(id);
        },

        holdCall: function (id) {
            $window.vertoSession.holdCall(id);
        },

        unholdCall: function (id) {
            $window.vertoSession.unholdCall(id);
        }
    }
});