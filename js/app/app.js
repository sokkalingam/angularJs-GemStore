var app = angular.module('store', ['ngRoute', 'xeditable']);
var baseUrl = 'http://localhost:8080/gemstore/webapi';

app.controller('ReviewController', ['$scope', '$http', function($scope, $http) {
	$scope.review = {};
	$scope.reviews = [];
	$scope.averageReview = {};
	$scope.rating = 0;

	$scope.getReviews = function(product) {
		if (product != null && product.gemReview != null) {
			$scope.reviews = product.gemReview.reviews;
			$scope.averageReview = product.gemReview.averageReview;
		}
	}

	$scope.loadReviews = function(product) {
		$http.get(baseUrl + '/gems/' + product.id + '/reviews').success(function(data){
			$scope.reviews = data.reviews;
			$scope.averageReview = data.averageReview;
		});
	};

	$scope.addReview = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/reviews', $scope.review).success(function(data){
			$scope.review = {};
			$scope.reviewForm.$setPristine();
			$scope.reviewForm.$setUntouched();
			$scope.loadReviews(product);
		});
	};

	$scope.deleteReview = function(product, review) {
		$http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id).success(function(data){
			$scope.loadReviews(product);
		});
	};

	$scope.setRating = function(rating) {
		$scope.rating = parseInt(rating);
	};

	$scope.isRating = function(rating) {
		return $scope.rating === rating;
	}

}]);

app.controller('TabController', ['$scope', function($scope) {

	$scope.tab = 1;

	$scope.setTab = function(tab) {
		$scope.tab = tab;
	};

	$scope.isTab = function(tab) {
		return $scope.tab === tab;
	};

}]);

app.controller('GemsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {
	
	$scope.products = [];
	$scope.thisProduct = {};
	$scope.product = {};
	$scope.sortByOptions = ['Price (low to high)', 'Price (high to low)', 'Average Review (low to high)', 'Average Review (high to low)'];
	$scope.query = {name:'', minPrice:'', maxPrice:'', rating:''}

	$scope.getByQuery = function(query) {
		$http.get(baseUrl + '/gems?name=' + query.name + '&rating='+query.rating +'&minPrice=' + query.minPrice + '&maxPrice=' + query.maxPrice).success(function(data) {
			$scope.products = data;	
		});
	}

	$scope.getSortBy = function(option) {
		if (option === 'Price (low to high)')
			return 'price';
		if (option === 'Price (high to low)')
			return '-price';
		if (option === 'Average Review (low to high)')
			return 'gemReview.averageReview.averageReview';
		if (option === 'Average Review (high to low)')
			return '-gemReview.averageReview.averageReview';
		return '';
	};

	$scope.getAll = function() {
		$http.get(baseUrl + '/gems').success(function(data) {
			$scope.products = data;	
		});
	};

	$scope.addProduct = function() {
		$http.post(baseUrl + '/gems', $scope.product).success(function(data) {
			$scope.product = {};
			$scope.addProductForm.$setPristine();
			$scope.addProductForm.$setUntouched();
		});
	};

	$scope.updateProduct = function(product) {
		$http.put(baseUrl + '/gems/' + product.id, product).success(function(data) {
			$scope.getByQuery($scope.query);
		});
	}

	$scope.deleteProduct = function(product) {
		$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
			$scope.getByQuery($scope.query);
		});
	};

	$scope.addToCart = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/addToCart').success(function(data) {
			$scope.getByQuery($scope.query);
		});
	};

	$scope.checkout = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/checkout').success(function(data) {
			$scope.getByQuery($scope.query);
			$scope.displayMessage(product);
		});
	};

	$scope.displayMessage = function(product) {
		$scope.thisProduct = product;
		$scope.thisProduct['showMessage'] = true;
		$timeout(function() {
			$scope.thisProduct.showMessage = false;
		}, 10000);
	};

}]);

app.controller('ShoppingcartController', ['$scope', '$rootScope', '$http', '$timeout', function($scope, $rootScope, $http, $timeout) {

	$scope.productsInCart = [];
	$scope.thisProduct = {};

	$scope.getProductsInCart = function() {
		$http.get(baseUrl + '/gems/cart').success(function(data) {
			$scope.productsInCart = data;
		});
	}

	$scope.removeFromCart = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/removeFromCart').success(function(data) {
			$scope.getProductsInCart();
		});
	};

	$scope.checkout = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/checkout').success(function(data) {
			$scope.removeFromCart(product);
			$scope.displayMessage(product);
		});
	};

	$scope.displayMessage = function(product) {
		$scope.thisProduct = product;
		$scope.thisProduct['showMessage'] = true;
		$timeout(function() {
			$scope.thisProduct.showMessage = false;
		}, 10000);
	};

}]);