
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
	.controller('contactPageCtrl', function ($scope, $rootScope, contactsService, CallService, $timeout) {
		var data = $scope.data = $rootScope.currentViewData;
		$scope.edit = data && !data.id;

		if (!data || !data.id) {
			var numbers = [];
			if (data && data.number)
				numbers.push({
					number: data.number
				});

			$scope.data = {
				name: "",
				numbers: numbers,
				favorite: false
			};
		} else {
			data.favorite = data.favorite == 'true' ? true : false;
		}
		
		$scope.setEdit = function (val) {
			$scope.edit = val;
			$timeout(function () {
				$scope.$apply();
			});
		};
		
		$scope.addNumber = function (contact) {
			if (!contact.numbers)
				contact.numbers = [];

			contact.numbers.push({
				number: ""
			})
		};
		
		$scope.makeCall = function (number) {
			CallService.makeCall(number)
		};
		
		$scope.save = function (contact) {
			var cb = function (err, res) {
				if (err)
					return console.error(err);

				if (res && res.currentTarget && res.currentTarget.result) {
					$scope.data.id = res.currentTarget.result;
				}

				$scope.setEdit(false)
			};

			contact._numbers = [];
			angular.forEach(contact.numbers, function (i) {
				if (i.number)
					contact._numbers.push(i.number)
			});

			contact.favorite = contact.favorite ? 'true' : 'false';

			if (contact.id) {
				contactsService.update(contact.id, contact, cb)
			} else {
				contactsService.add(contact, cb)
			}
		};

		$scope.remove = function (id) {
			contactsService.remove(id, function (err, res) {
				if (err)
					return console.error(err);

				$rootScope.changeState('contacts', false);
				$timeout(function () {
					$scope.$apply();
				})
			})
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
			$window.vertoSession.addCollection('contacts', angular.copy(contact), cb);
		}

		function remove(id, cb) {
			$window.vertoSession.removeCollection('contacts', id, cb);
		}

		function update(id, contact, cb) {
			$window.vertoSession.updateCollection('contacts', id, angular.copy(contact), cb);
		}

		function list(params, cb) {
			$window.vertoSession.listCollection('contacts', {limit: 100, index: params.index || "name", sort: 'next', search: params.search}, cb);
		}

		return {
			getById: getById,
			add: add,
			remove: remove,
			update: update,
			list: list
		}
	});