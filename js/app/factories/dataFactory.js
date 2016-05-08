/*
	DataFactory is used to share data across controllers
	using the 'data' object	
*/
angular.module('store')
	.factory('DataFactory', function() {
		var data = {
			loading:0,
			user: null
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
				data.user = user;
			},
			getUser: function() {
				return data.user;
			}
		};
	});