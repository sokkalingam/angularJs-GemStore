angular.module('store')
	.service('GemService', ['$http', function($http) {
		var gemsUrl = baseUrl + '/gems';
		return {
			getByQuery: function(query) {
				return $http.get(gemsUrl +'?name=' + query.name + '&rating='+query.rating +'&minPrice=' + query.minPrice + '&maxPrice=' + query.maxPrice);
			},
			getAll: function() {
				return $http.get(gemsUrl);
			},
			addProduct: function(product) {
				return $http.post(gemsUrl, product);	
			},
			updateProduct: function(product) {
				return $http.put(gemsUrl + '/' + product.id, product);
			},
			deleteProduct: function(product) {
				return $http.delete(gemsUrl + '/' + product.id);	
			},
			addToCart: function(product) {
				return $http.post(gemsUrl + '/' + product.id + '/addToCart');
			},
			checkout: function(product) {
				return $http.post(gemsUrl + '/' + product.id + '/checkout');
			},
			checkoutAll: function(products) {
				var queryParams = '';
				for (var product of products)
					queryParams += 'id=' + product.id + '&';
				return $http.post(gemsUrl + '/checkoutList?' + queryParams);
			}
		};
	}]);