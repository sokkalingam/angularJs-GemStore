angular.module('store')
	.service('ShoppingCartService', ['$http', function($http) {
		return {
			getGemsInCart: function() {
				return $http.get(baseUrl + '/gems/cart');
			},
			removeFromCart: function(product) {
				return $http.post(baseUrl + '/gems/' + product.id + '/removeFromCart');
			}
		};
	}]);