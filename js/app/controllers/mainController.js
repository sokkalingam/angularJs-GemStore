angular.module('store')
	.controller('MainController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {
		$scope.user = DataFactory.getUser();
		$scope.loading = DataFactory.getLoading();
		
		$scope.$watch(
			function() { return $location.path(); },
			function(newValue, oldValue){
				if (newValue === '/addNewGem' || newValue === '/cart') {
						$scope.hasAccess();
				}
			}
		);

		$scope.$watch(
			function() { return DataFactory.getLoading(); },
			function(newValue, oldValue) { $scope.loading = newValue; }
		);

		$scope.$watch(
			function() { return DataFactory.getUser(); },
			function(newValue, oldValue) { $scope.user = newValue; }
		);

		$scope.isUserSignedIn = function() {
			return $scope.user !== null;
		};

		$scope.toLogin = function() {
			$location.path('/login');
		};

		$scope.getUserName = function() {
			if ($scope.isUserSignedIn())
				return $scope.user.name;
		};

		$scope.hasAccess = function () {
			if ($scope.isUserSignedIn())
				return true;
			else {
				$scope.toLogin();
				return false;
			}
		};

	}]);