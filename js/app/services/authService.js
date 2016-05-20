angular.module('store')
	.service('AuthService', ['$http', function($http) {
		return {
			authorize: function (token) {
				return $http.get(baseUrl + '/authorize/google?token=' + token);
			}
		};
	}]);