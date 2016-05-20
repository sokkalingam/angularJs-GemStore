angular.module('store')
	.controller('MainController', ['$scope', '$location', 'DataFactory', function($scope, $location, DataFactory) {
		$scope.user = DataFactory.getUser();
		$scope.loading = DataFactory.getLoading();
		
		// $scope.$watch(
		// 	function() {
		// 		console.log("location path: " + $location.path()); 
		// 		return $location.path();
		// 	},
		// 	function(newValue, oldValue){
		// 		console.log("newValue: " + newValue + ", oldValue: " + oldValue);
		// 	}
		// );

		$scope.$watch(
			function() { return DataFactory.getLoading(); },
			function(newValue, oldValue) {
				$scope.loading = newValue;
		});

		$scope.$watch(
			function() { console.log('user watching1'); return DataFactory.getUser(); },
			function(newValue, oldValue) {
				console.log('newValue: ' + newValue + ', oldValue: ' + oldValue);
				console.log('user watching2');
				$scope.user = newValue;
		});

	}]);