angular.module('store')
	.service('ReviewService', ['$http', function($http) {
		return {
			loadReviews: function(product) {
				return $http.get(baseUrl + '/gems/' + product.id + '/reviews');	
			},
			addReview: function(product, review) {
				return $http.post(baseUrl + '/gems/' + product.id + '/reviews', review);	
			},
			deleteReview: function(product, review) {
				return $http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id);	
			}
		};
	}]);