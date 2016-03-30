angular.module('store')
	.config(function($routeProvider){
		$routeProvider
		.when('/gems', {
			templateUrl: '../templates/gems/pages/list-page.html',
			controller: 'GemsController',
			controllerAs: 'gemsCtrl'
		})
		.when('/addNewGem', {
			templateUrl: '../templates/gems/pages/add-page.html',
			controller: 'GemsController',
			controllerAs: 'gemsCtrl'
		});
	});