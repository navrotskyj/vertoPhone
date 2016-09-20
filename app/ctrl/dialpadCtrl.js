/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.dialpad', ['app.callService'])
    .controller('dialpadCtrl', function ($scope, $window, CallService) {
        console.debug('init dialpad');
        $scope.number = '';

        var ringer = document.getElementById('localVideo');
        ringer.volume = 0.2;
        
        $scope.dtmf = function (digit) {
            $scope.number += digit;
            ringer.src = '../sound/DTMF' + encodeURIComponent(digit || 0) + '.mp3';
            ringer.play();
        };
        
        $scope.makeCall = function () {
            CallService.makeCall($scope.number);
        };
        
        $scope.delLastNumber = function () {
            $scope.number = $scope.number.substring(0, $scope.number.length - 1);
        };
    });