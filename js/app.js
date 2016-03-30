var app = angular.module('store', ['ngRoute']);
var baseUrl = 'http://localhost:8080/gemstore/webapi';

app.controller('ReviewController', ['$http', function($http) {
	var ctrl = this;
	ctrl.review = {};
	ctrl.reviews = [];
	ctrl.loadReviews = function(product) {
		$http.get(baseUrl + '/gems/' + product.id + '/reviews').success(function(data){
			console.log('HTTP GET: ' + baseUrl + '/gems/' + product.id + '/reviews');
			ctrl.reviews = data;
		});
	};
	ctrl.addReview = function(product) {
		$http.post(baseUrl + '/gems/' + product.id + '/reviews', ctrl.review).success(function(data){
			console.log('HTTP POST: ' + baseUrl + '/gems/' + product.id + '/reviews');
			ctrl.review = {};
			ctrl.loadReviews(product);
		});
	};
	ctrl.deleteReview = function(product, review) {
		$http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id).success(function(data){
			console.log('HTTP DELETE: ' + baseUrl + '/gems/' + product.id + '/reviews');
			ctrl.loadReviews(product);
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

app.controller('GemsController', ['$http', function($http) {
	var store = this;
	store.products = [];
	store.getAll = function() {
		$http.get(baseUrl + '/gems').success(function(data) {
			console.log('HTTP GET: ' + baseUrl + '/gems');
			store.products = data;	
		});
	};
	store.getAll();
	store.product = { reviews:[] };
	store.addProduct = function() {
		$http.post(baseUrl + '/gems', store.product).success(function(data) {
			console.log('HTTP POST: ' + baseUrl + '/gems');
			store.product = { reviews: [] };
		});
	};
	store.deleteProduct = function(product) {
		$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
			console.log('HTTP DELETE: '+ baseUrl + '/gems/' + product.id);
			store.getAll();
		});
	};
}]);


// Test Data, later will come from backend service
var gems = [
{
	name : 'American Diamond',
	price : 89.95,
	description : 'Shine bright like an American Diamond. Value for money, the looks that has no match.',
	quantity: 10,
	canPurchase : true,
	soldOut : false,
	specifications: "Here are some",
	image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR6fQe9z0ySHTIX8WzgucnSOwKqn7EuPhqzoTuYAu-5XMz-fY2H",
	reviews : [{
		stars: 5,
		body: "Awesome",
		author:"Sokkalingam"
	}, {
		stars: 4,
		body: "Very Good",
		author:"Subramanian"
	}]
},
{
	name : 'African Diamond',
	price : 199,
	description : 'Shine bright like an African Diamond. Diamond as the way they were born',
	quantity: 10,
	canPurchase : true,
	soldOut : false,
	specifications: "Top notch",
	image : "http://www.belgium-diamonds.com/images/shape_large_princess.jpg",
	reviews : [{
		stars: 5,
		body: "Awesome",
		author:"Brahmi"
	}, {
		stars: 4,
		body: "Very Good",
		author:"Reddy"
	}]
},
{
	name : 'Belgium Diamond',
	price : 129.95,
	description : 'Shine bright like an Belgium Diamond. Diamond the Belgium way',
	quantity: 10,
	canPurchase : true,
	soldOut : false,
	specifications: "Take it and go, take it and go",
	image : "http://www.gemandmineralsociety.org/gem_png_by_doloresdevelde-d57p0sp[1].png",
	reviews : []
}];