/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.call', ['app.callService'])
    .controller('callCtrl', function ($scope, CallService) {
        $scope.dropCall = function (id) {
            CallService.dropCall(id);
        };

        $scope.answerCall = function (id) {
            CallService.answerCall(id);
        };

        $scope.holdCall = function (id) {
            CallService.holdCall(id);
        };

        $scope.unholdCall = function (id) {
            CallService.unholdCall(id);
        }
    });