var app = angular.module('store', ['ngRoute', 'xeditable']);
var baseUrl = 'http://localhost:8080/gemstore/webapi';

app.controller('ReviewController', ['$scope', '$http', function($scope, $http) {
	$scope.review = {};
	$scope.reviews = [];
	$scope.averageReview = {};
	$scope.rating = 0;

	$scope.getReviews = function(product) {
		$scope.reviews = product.gemReview.reviews;
		$scope.averageReview = product.gemReview.averageReview;
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
		});
	};

	$scope.deleteReview = function(product, review) {
		$http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id).success(function(data){
			console.log('HTTP DELETE: ' + baseUrl + '/gems/' + product.id + '/reviews/' + review.id);
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

app.directive('addProductLivePreviewPanel', function() {
	return {
		restrict: 'E',
		templateUrl: '../html/add-product-live-preview-panel.html',
		controller: function(){
			this.tab = 1;

			this.setTab = function(tab) {
				this.tab = tab;
			};

			this.isTab = function(tab) {
				return this.tab === tab;
			};
		},
		controllerAs: 'panelCtrl'
	};
});

app.controller('GemsController', ['$scope', '$http', function($scope, $http) {
	
	$scope.products = [];
	$scope.product = { reviews:[] };

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
			$scope.getAll();
		});
	}

	$scope.deleteProduct = function(product) {
		$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
			console.log('HTTP DELETE: '+ baseUrl + '/gems/' + product.id);
			$scope.getAll();
		});
	};

	$scope.checkout = function(product) {
		product.quantity = product.quantity - 1;
		$scope.updateProduct(product);
	}

}]);