angular.module('store')
	.controller('TabController', ['$scope', function($scope) {

		$scope.tab = 1;

		$scope.setTab = function(tab) {
			$scope.tab = tab;
		};

		$scope.isTab = function(tab) {
			return $scope.tab === tab;
		};

	}]);