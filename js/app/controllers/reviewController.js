angular.module('store')
	.controller('ReviewController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
		$scope.review = {};
		$scope.reviews = [];
		$scope.averageReview = {};
		$scope.rating = 0;

		$scope.loading = DataFactory.getLoading();
		
		$scope.$watch(
			function() { return DataFactory.getLoading(); },
			function(newValue, oldValue) {
				$scope.loading = newValue;
		});

		$scope.getReviews = function(product) {
			if (product != null && product.gemReview != null) {
				$scope.reviews = product.gemReview.reviews;
				$scope.averageReview = product.gemReview.averageReview;
			}
		}

		$scope.loadReviews = function(product) {
			DataFactory.loadStart();
			$http.get(baseUrl + '/gems/' + product.id + '/reviews').success(function(data){
				$scope.reviews = data.reviews;
				$scope.averageReview = data.averageReview;
				DataFactory.loadEnd();
			});
		};

		$scope.addReview = function(product) {
			DataFactory.loadStart();
			$http.post(baseUrl + '/gems/' + product.id + '/reviews', $scope.review).success(function(data){
				$scope.review = {};
				$scope.reviewForm.$setPristine();
				$scope.reviewForm.$setUntouched();
				$scope.loadReviews(product);
				DataFactory.loadEnd();
			});
		};

		$scope.deleteReview = function(product, review) {
			DataFactory.loadStart();
			$http.delete(baseUrl + '/gems/' + product.id + '/reviews/' + review.id).success(function(data){
				$scope.loadReviews(product);
				DataFactory.loadEnd();
			});
		};

		$scope.setRating = function(rating) {
			$scope.rating = parseInt(rating);
		};

		$scope.isRating = function(rating) {
			return $scope.rating === rating;
		}

	}]);