var app = angular.module('store', ['ngRoute', 'xeditable']);
var baseUrl = 'http://localhost:8080/gemstore/webapi';

app.controller('ReviewController', ['$scope', '$http', function($scope, $http) {
	$scope.review = {};
	$scope.reviews = [];
	$scope.averageReview = {};
	$scope.rating = 0;

	$scope.getReviews = function(product) {
		if (product.gemReview != null) {
			$scope.reviews = product.gemReview.reviews;
			$scope.averageReview = product.gemReview.averageReview;
		}
	}

	$scope.loadReviews = function(product) {
		$http.get(baseUrl + '/gems/' + product.id + '/reviews').success(function(data){
			console.log('HTTP GET: ' + baseUrl + '/gems/' + product.id + '/reviews');
			$scope.reviews = data.reviews;
			$scope.averageReview = data.averageReview;
		});
	};

	$scope.addReview = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/reviews', $scope.review).success(function(data){
			console.log('HTTP POST: ' + baseUrl + '/gems/' + product.id + '/reviews');
			$scope.review = {};
			$scope.reviewForm.$setPristine();
			$scope.reviewForm.$setUntouched();
			$scope.loadReviews(product);
			$scope.$emit('getProducts');
		});
	};

	$scope.deleteReview = function(product, review) {
		$http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id).success(function(data){
			console.log('HTTP DELETE: ' + baseUrl + '/gems/' + product.id + '/reviews/' + review.id);
			$scope.loadReviews(product);
			$scope.$emit('getProducts');
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
	$scope.product = { reviews:[] };
	$scope.sortByOptions = ['Price (low to high)', 'Price (high to low)', 'Average Review (low to high)', 'Average Review (high to low)'];
	$scope.query = {name:'', minPrice:'', maxPrice:'', rating:''}

	$scope.getByQuery = function(query) {
		$http.get(baseUrl + '/gems?name=' + query.name + '&rating='+query.rating +'&minPrice=' + query.minPrice + '&maxPrice=' + query.maxPrice).success(function(data) {
			console.log('HTTP GET: ' + baseUrl + '/gems?name=' + query.name + '&rating='+query.rating +'&minPrice=' + query.minPrice + '&maxPrice=' + query.maxPrice);
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
			console.log('HTTP GET: ' + baseUrl + '/gems');
			$scope.products = data;	
		});
	};

	$scope.addProduct = function() {
		$http.post(baseUrl + '/gems', $scope.product).success(function(data) {
			console.log('HTTP POST: ' + baseUrl + '/gems');
			$scope.product = { reviews: [] };
			$scope.addProductForm.$setPristine();
			$scope.addProductForm.$setUntouched();
		});
	};

	$scope.updateProduct = function(product) {
		$http.put(baseUrl + '/gems/' + product.id, product).success(function(data) {
			console.log('HTTP PUT: ' + baseUrl + '/gems/' + product.id);
			$scope.getByQuery($scope.query);
		});
	}

	$scope.deleteProduct = function(product) {
		$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
			console.log('HTTP DELETE: '+ baseUrl + '/gems/' + product.id);
			$scope.getByQuery($scope.query);
		});
	};

	$scope.checkout = function(product) {
		product.quantity = product.quantity - 1;
		$scope.updateProduct(product);
		$scope.displayMessage(product);
	};

	$scope.displayMessage = function(product) {
		$scope.showMessage = true;
		$timeout(function() {
			$scope.showMessage = false;
		}, 5000);
	};

	$scope.$on('getProducts', function() {
		console.log('$on getProducts');
		$scope.getByQuery($scope.query);
	});

}]);