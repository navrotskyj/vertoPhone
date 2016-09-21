/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.dialpad', ['app.callService'])
    .controller('dialpadCtrl', function ($scope, $window, CallService, $timeout, $rootScope) {
        console.debug('init dialpad');
        $scope.number = '';
        $scope.execMakeCall = false;

        var ringer = document.getElementById('localVideo');
        // ringer.volume = 0.2;

        var onKeyUp = $rootScope.$on('key:down', function (e, key) {
            if (key.target.nodeName == "INPUT") return;
            var myKey = false;
            if (between(key.keyCode, 48, 90) || between(key.keyCode, 96, 105)) {
                dtmf(key.key);
                myKey = true;
            } else if (key.keyCode == 8) {
                if (key.ctrlKey) {
                    $scope.number = '';
                } else {
                    delLastNumber();
                }
                myKey = true;
            } else if (key.keyCode == 13) {
                myKey = true;
                makeCall()
            }

            if (myKey) {
                key.preventDefault();
                $scope.$apply();
            }
        });

        $scope.$on('$destroy', function () {
            onKeyUp();
        });
        
        $scope.dtmf = dtmf;
        $scope.delLastNumber = delLastNumber;
        $scope.makeCall = makeCall;

        function makeCall() {
            if ($scope.execMakeCall || !$scope.number)
                return;

            CallService.makeCall($scope.number);
            $scope.execMakeCall = true;
            $timeout(function () {
                $scope.execMakeCall = false;
            }, 1000);
        }

        function dtmf(digit) {
            $scope.number += digit;
            ringer.src = '../sound/DTMF' + encodeURIComponent(isFinite(digit) ? digit : 0) + '.mp3';
            ringer.play();
        }

        function delLastNumber() {
            $scope.number = $scope.number.substring(0, $scope.number.length - 1);
        }

        function between(x, min, max) {
            return x >= min && x <= max;
        }
    });