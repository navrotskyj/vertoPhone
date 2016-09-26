
angular
	.module('app.contacts', [])
	.controller('contactsCtrl', function ($scope, CallService, contactsService) {
		$scope.data = [];

		$scope.$watch('search', function (val, oldVal) {
			var f = {
				column: 'name'
			};
			if (val)
				f.reg = new RegExp('^' + val);

			contactsService.list({
				search: f
			}, function (data) {
				$scope.data = data;
				$scope.$apply()
			});

		});

		$scope.makeCall = function (number) {
			CallService.makeCall(number)
		};

	})
	.controller('contactPageCtrl', function ($scope, $rootScope, contactsService) {
		var data = $scope.data = $rootScope.currentViewData;
		if (data && data.id) {
			contactsService.getById(data.id, function (contact) {
				$scope.data = contact;
			})
		} else {
			var numbers = [];
			if (data && data.number)
				numbers.push({number: data.number});

			$scope.data = {
				name: "",
				numbers: numbers,
				favorite: false
			};
		}
		
		$scope.addNumber = function (contact) {
			if (!contact.numbers)
				contact.numbers = [];

			contact.numbers.push({
				number: ""
			})
		};
		
		$scope.save = function (contact) {
			var cb = function (err, res) {
				if (err)
					console.error(err);
			};

			if (contact.id) {
				contactsService.update(contact.id, contact, cb)
			} else {
				contactsService.add(contact, cb)
			}
		};
		
		$scope.removerNumber = function (numbers, number) {
			var i = numbers.indexOf(number);
			if (~i) {
				numbers.splice(i, 1)
			}
		}
	})
	.service('contactsService', function ($window) {

		function getById(id, cb) {
			$window.vertoSession.listCollection('contacts', {limit: 1, sort: 'next', search: {text: id}}, cb);
		}

		function add(contact, cb) {
			$window.vertoSession.addCollection('contacts', contact, cb);
		}

		function update(id, contact, cb) {
			$window.vertoSession.updateCollection('contacts', id, contact, cb);
		}

		function list(params, cb) {
			$window.vertoSession.listCollection('contacts', {limit: 100, index: "name", sort: 'next', search: params.search}, cb);
		}

		return {
			getById: getById,
			add: add,
			update: update,
			list: list
		}
	});