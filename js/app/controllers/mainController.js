angular.module('store')
	.controller('MainController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {
		$scope.user = DataFactory.getUser();
		$scope.loading = DataFactory.getLoading();
		
		$scope.$watch(
			function() {
				return $location.path();
			},
			function(newValue, oldValue){
				if (!$scope.isUserSignedIn()) {
					if (newValue === '/addNewGem' || newValue === '/cart') {
						$location.path('/login');
					}
				}
			}
		);

		$scope.$watch(
			function() { return DataFactory.getLoading(); },
			function(newValue, oldValue) {
				$scope.loading = newValue;
		});

		$scope.$watch(
			function() { 
				// console.log('user watching1'); 
				return DataFactory.getUser(); },
			function(newValue, oldValue) {
				// console.log('newValue: ' + newValue + ', oldValue: ' + oldValue);
				// console.log('user watching2');
				$scope.user = newValue;
		});

		$scope.isUserSignedIn = function() {
			return $scope.user !== null;
		};

		$scope.toLogin = function() {
			$location.path('/login');
		};

		$scope.hasAccess = function () {
			if ($scope.isUserSignedIn())
				return true;
			else {
				$scope.toLogin();
				return false;
			}
		}

	}]);