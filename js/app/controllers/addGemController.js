angular.module('store')
	.controller('AddGemController',
		['$scope', 'DataFactory', 'GemService',
			function($scope, DataFactory, GemService) {
			
			DataFactory.setTab(4);
			
			$scope.product = {};

			$scope.addProduct = function() {
				DataFactory.loadStart();
				GemService.addProduct($scope.product).success(function(data) {
					$scope.product = {};
					$scope.addProductForm.$setPristine();
					$scope.addProductForm.$setUntouched();
					DataFactory.loadEnd();
				});
			};
	}]);