var app = angular.module('store', []);

app.controller('StoreController', function() {
	this.products = gems;
});

app.controller('PanelController', function(){
	this.tab = 1;
	
	this.setTab = function(tab) {
		this.tab = tab;
	};
	
	this.isTab = function(tab) {
		return this.tab === tab;
	};
});

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


// Test Data, later will come from backend service
var gems = [
		{
			name : 'American Diamond',
			price : 89.95,
			description : 'Shine bright like an American Diamond. Value for money, the looks that has no match.',
			url : "http://www.gemandmineralsociety.org/gem_png_by_doloresdevelde-d57p0sp[1].png",
			canPurchase : true,
			soldOut : false,
			specifications: "",
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
			url : "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR6fQe9z0ySHTIX8WzgucnSOwKqn7EuPhqzoTuYAu-5XMz-fY2H",
			canPurchase : true,
			soldOut : false,
			specifications: "",
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
			url : "http://www.belgium-diamonds.com/images/shape_large_princess.jpg",
			canPurchase : true,
			soldOut : false,
			specifications: "",
			reviews : []
		}];