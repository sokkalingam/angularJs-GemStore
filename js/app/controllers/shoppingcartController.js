angular.module('store')
	.controller('ShoppingcartController', ['$scope', '$http', '$timeout', 'DataFactory', function($scope, $http, $timeout, DataFactory) {

		$scope.productsInCart = [];
		$scope.thisProduct = {};

		$scope.loading = DataFactory.getLoading();
		
		$scope.$watch(
			function() { return DataFactory.getLoading(); },
			function(newValue, oldValue) {
				$scope.loading = newValue;
		});

		$scope.getProductsInCart = function() {
			DataFactory.loadStart();
			$http.get(baseUrl + '/gems/cart').success(function(data) {
				$scope.productsInCart = data;
				DataFactory.loadEnd();
			});
		}

		$scope.removeFromCart = function(product) {
			DataFactory.loadStart();
			$http.post(baseUrl + '/gems/' + product.id + '/removeFromCart').success(function(data) {
				$scope.getProductsInCart();
				DataFactory.loadEnd();
			});
		};

		$scope.checkout = function(product) {
			DataFactory.loadStart();
			$http.post(baseUrl + '/gems/' + product.id + '/checkout').success(function(data) {
				$scope.removeFromCart(product);
				$scope.displayMessage(product);
				DataFactory.loadEnd();
			});
		};

		$scope.displayMessage = function(product) {
			$scope.thisProduct = product;
			$scope.thisProduct['showMessage'] = true;
			$timeout(function() {
				$scope.thisProduct.showMessage = false;
			}, 5000);
		};

	}]);