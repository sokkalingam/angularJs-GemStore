angular.module('store')
	.controller('GemsController', ['$scope', '$http', '$timeout', 'DataFactory', function($scope, $http, $timeout, DataFactory) {
		
		$scope.products = [];
		$scope.thisProduct = {};
		$scope.product = {};
		$scope.sortByOptions = ['Price (low to high)', 'Price (high to low)', 'Average Review (low to high)', 'Average Review (high to low)'];
		$scope.query = {name:'', minPrice:'', maxPrice:'', rating:''}
		$scope.loading = DataFactory.getLoading();
		
		$scope.$watch(
			function() { return DataFactory.getLoading(); },
			function(newValue, oldValue) {
				$scope.loading = newValue;
		});

		$scope.getByQuery = function(query) {
			DataFactory.loadStart();
			$http.get(baseUrl + '/gems?name=' + query.name + '&rating='+query.rating +'&minPrice=' + query.minPrice + '&maxPrice=' + query.maxPrice).success(function(data) {
				$scope.products = data;
				DataFactory.loadEnd();
			});
		}

		$scope.getSortBy = function(option) {
			if (option === 'Price (low to high)')
				return 'price';
			if (option === 'Price (high to low)')
				return '-price';
			if (option === 'Average Review (low to high)')
				return 'gemReview.averageReview.averageReview';
			if (option === 'Average Review (high to low)')
				return '-gemReview.averageReview.averageReview';
			return '';
		};

		$scope.getAll = function() {
			DataFactory.loadStart();
			$http.get(baseUrl + '/gems').success(function(data) {
				$scope.products = data;
				DataFactory.loadEnd();
			});
		};

		$scope.addProduct = function() {
			DataFactory.loadStart();
			$http.post(baseUrl + '/gems', $scope.product).success(function(data) {
				$scope.product = {};
				$scope.addProductForm.$setPristine();
				$scope.addProductForm.$setUntouched();
				DataFactory.loadEnd();
			});
		};

		$scope.updateProduct = function(product) {
			DataFactory.loadStart();
			$http.put(baseUrl + '/gems/' + product.id, product).success(function(data) {
				$scope.getByQuery($scope.query);
				DataFactory.loadEnd();
			});
		}

		$scope.deleteProduct = function(product) {
			DataFactory.loadStart();
			$http.delete(baseUrl + '/gems/' + product.id).success(function(data){
				$scope.getByQuery($scope.query);
				DataFactory.loadEnd();
			});
		};

		$scope.addToCart = function(product) {
			DataFactory.loadStart();
			$http.post(baseUrl + '/gems/' + product.id + '/addToCart').success(function(data) {
				$scope.getByQuery($scope.query);
				DataFactory.loadEnd();
			});
		};

		$scope.checkout = function(product) {
			DataFactory.loadStart();
			$http.post(baseUrl + '/gems/' + product.id + '/checkout').success(function(data) {
				$scope.getByQuery($scope.query);
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