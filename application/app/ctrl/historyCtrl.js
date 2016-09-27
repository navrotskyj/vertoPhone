/**
 * Created by igor on 20.09.16.
 */

"use strict";

angular
    .module('app.history', ['app.callService'])
    .controller('historyCtrl', ['$scope', '$rootScope', 'historyService', 'CallService', function ($scope, $rootScope, historyService, CallService) {
        $scope.data = [];
        
        $scope.$watch('search', function (val, oldVal) {
            var f = {
                column: 'number'
            };
            if (val)
                f.reg = new RegExp('^' + val);

            historyService.list({
                search: f
            }, function (data) {
                $scope.data = data;
                $scope.$apply()
            });

        });

        $scope.makeCall = function (number) {
            CallService.makeCall(number)
        };
        
        $scope.getTime = function (time) {
            return new Date(time).toLocaleString()
        }
    }])
    .service('historyService', function ($window) {

        function list(params, cb) {
            $window.vertoSession.listCollection('history', {limit: 100, index: "createdOn", sort: 'prev', search: params.search}, cb);
        }

        return {
            list: list
        }
    });
