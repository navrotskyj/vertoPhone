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
        };

        $scope.toggleHold = function (id) {
            CallService.toggleHold(id);
        };        

        $scope.toggleMute = function (id) {
            CallService.toggleMute(id);
        };          

        $scope.openMenu = function (id, name) {
            CallService.openMenu(id, name);
        };

        $scope.dtmf = function (d) {
            if ($scope.activeCall) 
                CallService.dtmf($scope.activeCall.id, d);
        };
    })
    .directive('uiTimer', function () {
        return {
            restrict: 'A',
            scope: {start: "=start"},
            link: function(scope, ele) {
              var checkTime, startTimer;

              startTimer = function() {
                if (scope.$$destroyed)
                    return;
                var m, s, time, t;

                if (!scope.start) {
                    ele.html("00:00");
                    return t = setTimeout(startTimer, 1000);
                }
                s = Math.floor((Date.now() - scope.start) / 1000);
                m = Math.floor(s / 60);
                m = checkTime(m);
                s = checkTime(s % 60);
                time = m + ":" + s;
                ele.html(time);
                return t = setTimeout(startTimer, 1000);
              };
              checkTime = function(i) {
                if (i < 10) {
                  i = "0" + i;
                }
                return i;
              };
              return startTimer();
            }

        }
    });