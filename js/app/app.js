var app = angular.module('store', ['ngRoute', 'xeditable']);
var baseUrl = 'https://sokkalingam-gemstore.herokuapp.com/webapi';

app.controller('ReviewController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
	$scope.review = {};
	$scope.reviews = [];
	$scope.averageReview = {};
	$scope.rating = 0;

	$scope.loading = DataFactory.getLoading();
	
	$scope.$watch(
		function() { return DataFactory.getLoading(); },
		function(newValue, oldValue) {
			$scope.loading = newValue;
	});

	$scope.getReviews = function(product) {
		if (product != null && product.gemReview != null) {
			$scope.reviews = product.gemReview.reviews;
			$scope.averageReview = product.gemReview.averageReview;
		}
	}

	$scope.loadReviews = function(product) {
		DataFactory.loadStart();
		$http.get(baseUrl + '/gems/' + product.id + '/reviews').success(function(data){
			$scope.reviews = data.reviews;
			$scope.averageReview = data.averageReview;
			DataFactory.loadEnd();
		});
	};

	$scope.addReview = function(product) {
		DataFactory.loadStart();
		$http.post(baseUrl + '/gems/' + product.id + '/reviews', $scope.review).success(function(data){
			$scope.review = {};
			$scope.reviewForm.$setPristine();
			$scope.reviewForm.$setUntouched();
			$scope.loadReviews(product);
			DataFactory.loadEnd();
		});
	};

	$scope.deleteReview = function(product, review) {
		DataFactory.loadStart();
		$http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id).success(function(data){
			$scope.loadReviews(product);
			DataFactory.loadEnd();
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

app.controller('GemsController', ['$scope', '$http', '$timeout', 'DataFactory', function($scope, $http, $timeout, DataFactory) {
	
	$scope.products = [];
	$scope.thisProduct = {};
	$scope.product = {};
	$scope.sortByOptions = ['Price (low to high)', 'Price (high to low)', 'Average Review (low to high)', 'Average Review (high to low)'];
	$scope.query = {name:'', minPrice:'', maxPrice:'', rating:''}
	$scope.loading = DataFactory.getLoading();
	
	$scope.$watch(
		function() { return DataFactory.getLoading(); },
		function(newValue, oldValue) {
			$scope.loading = newValue;
	});

	$scope.getByQuery = function(query) {
		DataFactory.loadStart();
		$http.get(baseUrl + '/gems?name=' + query.name + '&rating='+query.rating +'&minPrice=' + query.minPrice + '&maxPrice=' + query.maxPrice).success(function(data) {
			$scope.products = data;
			DataFactory.loadEnd();
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
		DataFactory.loadStart();
		$http.get(baseUrl + '/gems').success(function(data) {
			$scope.products = data;
			DataFactory.loadEnd();
		});
	};

	$scope.addProduct = function() {
		DataFactory.loadStart();
		$http.post(baseUrl + '/gems', $scope.product).success(function(data) {
			$scope.product = {};
			$scope.addProductForm.$setPristine();
			$scope.addProductForm.$setUntouched();
			DataFactory.loadEnd();
		});
	};

	$scope.updateProduct = function(product) {
		DataFactory.loadStart();
		$http.put(baseUrl + '/gems/' + product.id, product).success(function(data) {
			$scope.getByQuery($scope.query);
			DataFactory.loadEnd();
		});
	}

	$scope.deleteProduct = function(product) {
		DataFactory.loadStart();
		$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
			$scope.getByQuery($scope.query);
			DataFactory.loadEnd();
		});
	};

	$scope.addToCart = function(product) {
		DataFactory.loadStart();
		$http.post(baseUrl + '/gems/' + product.id + '/addToCart').success(function(data) {
			$scope.getByQuery($scope.query);
			DataFactory.loadEnd();
		});
	};

	$scope.checkout = function(product) {
		DataFactory.loadStart();
		$http.post(baseUrl + '/gems/' + product.id + '/checkout').success(function(data) {
			$scope.getByQuery($scope.query);
			$scope.displayMessage(product);
			DataFactory.loadEnd();
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

app.controller('ShoppingcartController', ['$scope', '$rootScope', '$http', '$timeout', 'DataFactory', function($scope, $rootScope, $http, $timeout, DataFactory) {

	$scope.productsInCart = [];
	$scope.thisProduct = {};

	$scope.loading = DataFactory.getLoading();
	
	$scope.$watch(
		function() { return DataFactory.getLoading(); },
		function(newValue, oldValue) {
			$scope.loading = newValue;
	});

	$scope.getProductsInCart = function() {
		DataFactory.loadStart();
		$http.get(baseUrl + '/gems/cart').success(function(data) {
			$scope.productsInCart = data;
			DataFactory.loadEnd();
		});
	}

	$scope.removeFromCart = function(product) {
		DataFactory.loadStart();
		$http.post(baseUrl + '/gems/' + product.id + '/removeFromCart').success(function(data) {
			$scope.getProductsInCart();
			DataFactory.loadEnd();
		});
	};

	$scope.checkout = function(product) {
		DataFactory.loadStart();
		$http.post(baseUrl + '/gems/' + product.id + '/checkout').success(function(data) {
			$scope.removeFromCart(product);
			$scope.displayMessage(product);
			DataFactory.loadEnd();
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

app.factory('DataFactory', function() {
	var data = {
		loading:0
	};

	return {
		loadStart: function() {
			data.loading++;
			console.log('loadStart, value:' + data.loading);
		},
		loadEnd: function() {
			if (data.loading > 0)
				data.loading--;
			console.log('loadEnd, value:' + data.loading);
		},
		getLoading: function() {
			console.log('getLoading, value:' + data.loading);
			return data.loading;
		},
		setLoading: function(loading) {
			data.loading = loading;
		}
	};
});