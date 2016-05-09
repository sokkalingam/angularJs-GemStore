angular.module('store')
	.config(function($routeProvider){
		$routeProvider
		.when('/gems', {
			templateUrl: '../templates/gems/pages/list-page.html',
			controller: 'GemsController'
		})
		.when('/addNewGem', {
			templateUrl: '../templates/gems/pages/add-page.html',
			controller: 'AddGemController',
			controllerAs: 'gemsCtrl'
		})
		.when('/cart', {
			templateUrl: '../templates/gems/pages/shopping-cart-page.html',
			controller: 'ShoppingcartController'
		})
		.when('/login', {
			templateUrl: '../templates/home/login.html',
			controller: 'LoginController'
		})
		.when('/', {
			templateUrl: '../templates/home/home-page.html',
			controller: 'TabController'
		})
		.otherwise({redirectTo: '/'});
	});