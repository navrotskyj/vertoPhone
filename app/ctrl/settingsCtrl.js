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
    }]);
