/**
 * Created by igor on 19.09.16.
 */

"use strict";
    
angular
    .module('app.settings', [])
    .controller('settingsCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $scope.settings = $rootScope.vertoSettings;
        console.log('get settings', $scope.settings);
        $scope.saveSettings = function () {
            $rootScope.sendBg('saveSettings', $scope.settings);
        };
        
        $scope.$watch('settings.useVideo', function (val) {
            if (!$scope.settings)
                return;
            if ($scope.devices && $scope.devices.videoDevices && $scope.devices.videoDevices.length > 0) {
                $scope.settings.useVideo = val;
            } else {
                $scope.settings.useVideo = false;
            }
        });

        $scope.devices = window.vertoDevices;
    }]);
