/**
 * Created by igor on 20.09.16.
 */

"use strict";

angular
    .module('app.chat', [])
    .controller('chatCtrl', ['$scope', '$rootScope', 'chatService', function ($scope, $rootScope, chatService) {
        $scope.data = [];

        $scope.$watch('search', function (val) {
            console.log(val)
        });

        chatService.list({}, function (data) {
            $scope.data = data;
            $scope.$apply();
        });

        $scope.getTime = function (time) {
            return new Date(time).toLocaleString()
        }
    }])
    .controller('chatPageCtrl', ['$scope', '$rootScope', 'chatService', function ($scope, $rootScope, chatService) {
        var from = $rootScope.currentViewData && $rootScope.currentViewData.from;
        $scope.data = [];

        if (from) {
            chatService.from(from, {}, function (data) {
                $scope.data = data;
                $scope.$apply();
            })
        }
    }])
    .service('chatService', function ($window) {

        function list(params, cb) {
            $window.vertoSession.listCollection('chat', {limit: 100, index: "from", sort: 'prevunique', search: params.search}, cb);
        }

        function from(id, params, cb) {
            $window.vertoSession.listCollection('chat', {limit: 100, index: "from", sort: 'prev', search: id}, cb);
        }

        return {
            list: list,
            from: from,
        }
    });