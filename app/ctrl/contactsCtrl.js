
angular
	.module('app.contacts', [])
	.controller('contactsCtrl', function ($scope) {
		$scope.contacts = [];

		for (var i =0; i < 100; i++)
			$scope.contacts.push({name: "igor" +i});
	})