/**
 * Created by igor on 26.09.16.
 */

"use strict";

angular
    .module('app.favorites', ['app.contacts'])
    .controller('favoritesCtrl', function ($scope, CallService, contactsService) {
        $scope.data = [];

        $scope.$watch('search', function (val, oldVal) {
            var f = {
                column: 'name',
                text: 'true'
            };
            if (val)
                f.reg = new RegExp('^' + val);

            contactsService.list({
                index: 'favorite',
                search: f
            }, function (data) {
                $scope.data = data;
                $scope.$apply()
            });

        });
    });