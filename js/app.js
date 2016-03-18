var app = angular.module('store', []);

app.controller('StoreController', function() {
	this.product = gem;
});

// Test Data, later will come from backend service
var gem = {
		 name: 'American Diamond',
		 price: 89.95,
		 description: 'Shine bright like an American Diamond. Value for money, the looks that has no match.',
		 url: "http://www.gemandmineralsociety.org/gem_png_by_doloresdevelde-d57p0sp[1].png"
		};