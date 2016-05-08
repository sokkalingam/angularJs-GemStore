angular.module('store')
	.controller('LoginController', ['$scope','AuthService', 'DataFactory', function($scope, AuthService, DataFactory) {
		$scope.auth2 = {};
		$scope.token = {};

		$scope.load = function() {
			console.log("auth2 load");
			gapi.load('auth2', function() {
				gapi.auth2.init();
			});
		};

		$scope.authorize = function(token) {
			AuthService.authorize(token).success(function(user){
				DataFactory.setUser(user);
			});
		};

	    $scope.signIn = function() {
	    	$scope.auth2 = gapi.auth2.getAuthInstance();
			$scope.auth2.signIn().then(function (data) {
			  $scope.token = data.getAuthResponse().id_token;
			  $scope.authorize($scope.token);
			});
		};

		$scope.signOut = function() {
			$scope.auth2 = gapi.auth2.getAuthInstance();
			$scope.auth2.signOut().then(function () {
			  $scope.$apply(DataFactory.setUser(null));
			  console.log('User signed out');
			});
		};
	}]);