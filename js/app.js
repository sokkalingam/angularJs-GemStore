var app = angular.module('store', []);

app.directive('reviewForm', function() {
	return {
		restrict: 'E',
		templateUrl: '../html/review-form.html',
		controller: function() {
			this.review = {};
			this.addReview = function(product) {
				product.reviews.push(this.review);
				this.review = {};
			};
		},
		controllerAs: 'reviewCtrl'
	};
});

app.directive('productReview', function() {
	return {
		restrict: 'E',
		templateUrl: '../html/product-review.html'
	};
});

app.directive('productPanel', function() {
	return {
		restrict: 'E',
		templateUrl: '../html/product-panel.html',
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

app.directive('storeProduct', ['$http', function($http) {
	return {
		restrict: 'E',
		templateUrl: '../html/store-product.html',
		controller: function() {
			var store = this;
			store.products = [];
			store.getAll = function() {
				$http.get('http://localhost:8080/gemstore/webapi/gems').success(function(data) {
					console.log('HTTP GET: http://localhost:8080/gemstore/webapi/gems');
					store.products = data;	
				});
			};
			store.getAll();
			store.product = { reviews:[] };
			store.addProduct = function() {
				$http.post('http://localhost:8080/gemstore/webapi/gems', store.product).success(function(data) {
					console.log('HTTP POST: http://localhost:8080/gemstore/webapi/gems');
					store.product = { reviews: []};
					store.getAll();
				});
			};
			store.deleteProduct = function(product) {
				$http.delete('http://localhost:8080/gemstore/webapi/gems/' + product.id).success(function(data){
					console.log('HTTP DELETE: http://localhost:8080/gemstore/webapi/gems/' + product.id);
					store.getAll();
				});
			};
		},
		controllerAs:'storeCtrl'
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