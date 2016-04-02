var app = angular.module('store', ['ngRoute']);
var baseUrl = 'http://localhost:8080/gemstore/webapi';

app.controller('ReviewController', ['$scope', '$http', function($scope, $http) {
	$scope.review = {};
	$scope.reviews = [];
	$scope.loadReviews = function(product) {
		$http.get(baseUrl + '/gems/' + product.id + '/reviews').success(function(data){
			console.log('HTTP GET: ' + baseUrl + '/gems/' + product.id + '/reviews');
			$scope.reviews = data;
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
			console.log('HTTP DELETE: ' + baseUrl + '/gems/' + product.id + '/reviews');
			$scope.loadReviews(product);
		});
	};
}]);

app.controller('GemPanelController', function() {
	var panelCtrl = this;
	panelCtrl.tab = 1;

	panelCtrl.setTab = function(tab) {
		panelCtrl.tab = tab;
	};

	panelCtrl.isTab = function(tab) {
		return panelCtrl.tab === tab;
	};
});

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
		});
	};

	$scope.deleteProduct = function(product) {
		$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
			console.log('HTTP DELETE: '+ baseUrl + '/gems/' + product.id);
			$scope.getAll();
		});
	};

}]);