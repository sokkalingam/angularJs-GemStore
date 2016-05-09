angular.module('store')
	.controller('TabController', ['$scope', 'DataFactory', function($scope, DataFactory) {

		$scope.tab = DataFactory.getTab();
		$scope.gemTab = 1;

		$scope.$watch(
			function() { return DataFactory.getTab(); },
			function(newValue, oldValue){
				DataFactory.setTab(newValue);
		});

		$scope.setTab = function(tab) {
			$scope.tab = tab;
			DataFactory.setTab(tab);
		};

		$scope.isTab = function(tab) {
			return DataFactory.getTab() === tab;
		};

		$scope.setGemTab = function(tab) {
			$scope.gemTab = tab;
		};

		$scope.isGemTab = function(tab) {
			return $scope.gemTab === tab;
		};

	}]);