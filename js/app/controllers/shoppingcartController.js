angular.module('store')
	.controller('ShoppingcartController',
		['$scope', '$http', '$timeout', 'DataFactory', 'ShoppingCartService', 'GemService',
			function($scope, $http, $timeout, DataFactory, ShoppingCartService, GemService) {

				DataFactory.setTab(5);

				$scope.productsInCart = [];
				$scope.thisProduct = {};

				$scope.getProductsInCart = function() {
					DataFactory.loadStart();
					ShoppingCartService.getGemsInCart().success(function(data) {
						$scope.productsInCart = data;
						$scope.totalCart();
						DataFactory.loadEnd();
					});
				};

				$scope.removeFromCart = function(product) {
					DataFactory.loadStart();
					ShoppingCartService.removeFromCart(product).success(function(data) {
						$scope.getProductsInCart();
						DataFactory.loadEnd();
					});
				};

				$scope.checkout = function(product) {
					DataFactory.loadStart();
					GemService.checkout(product).success(function(data) {
						$scope.getProductsInCart();
						DataFactory.loadEnd();
						$scope.displayMessage(product);
					});
				};

				$scope.checkoutAll = function() {
					DataFactory.loadStart();
					GemService.checkoutAll($scope.productsInCart).success(function(data) {
						$scope.getProductsInCart();
						DataFactory.loadEnd();
						$scope.displayGroupMessage();
					});
				};

				$scope.totalCart = function() {
					$scope.itemCount = 0;
					$scope.totalAmount = 0;
					for (var i = 0; i < $scope.productsInCart.length; i++) {
						if (!$scope.productsInCart[i].soldOut) {
							$scope.itemCount++;
							$scope.totalAmount += $scope.productsInCart[i].price;
						}
					}
				}

				$scope.displayMessage = function(product) {
					$scope.thisProduct = product;
					$scope.thisProduct['showMessage'] = true;
					$timeout(function() {
						$scope.thisProduct.showMessage = false;
					}, 5000);
				};

				$scope.displayGroupMessage = function() {
					$scope.showGroupMessage = true;
					$timeout(function() {
						$scope.showGroupMessage = false;
					}, 5000);
				};
	}]);