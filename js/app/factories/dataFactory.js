/*
	DataFactory is used to share data across controllers
	using the 'data' object	
*/
angular.module('store')
	.factory('DataFactory', ['$localStorage', function($localStorage) {
		
		var data = {
			loading:0,
			tab: 2,
			auth: null
		};

		return {
			loadStart: function() {
				data.loading++;
			},
			loadEnd: function() {
				if (data.loading > 0)
					data.loading--;
			},
			getLoading: function() {
				return data.loading;
			},
			setLoading: function(loading) {
				data.loading = loading;
			},

			setUser: function(user) {
				$localStorage.user = user;
			},
			getUser: function() {
				return $localStorage.user;
			},

			setTab: function(tab) {
				data.tab = tab;
			},
			getTab: function() {
				return data.tab;
			},

			setAuth: function(auth) {
				data.auth = auth;
			},
			getAuth: function() {
				return data.auth;
			},


		};
	}]);