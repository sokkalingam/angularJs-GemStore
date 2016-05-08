angular.module('store')
	.controller('ReviewController',
		['$scope', '$http', 'DataFactory', 'ReviewService',
			function($scope, $http, DataFactory, ReviewService) {
				$scope.review = {};
				$scope.reviews = [];
				$scope.averageReview = {};
				$scope.rating = 0;

				$scope.getReviews = function(product) {
					if (product != null && product.gemReview != null) {
						$scope.reviews = product.gemReview.reviews;
						$scope.averageReview = product.gemReview.averageReview;
					}
				}

				$scope.loadReviews = function(product) {
					DataFactory.loadStart();
					ReviewService.loadReviews(product).success(function(data){
						$scope.reviews = data.reviews;
						$scope.averageReview = data.averageReview;
						DataFactory.loadEnd();
					});
				};

				$scope.addReview = function(product) {
					DataFactory.loadStart();
					ReviewService.addReview(product, $scope.review).success(function(data){
						$scope.review = {};
						$scope.reviewForm.$setPristine();
						$scope.reviewForm.$setUntouched();
						$scope.loadReviews(product);
						DataFactory.loadEnd();
					});
				};

				$scope.deleteReview = function(product, review) {
					DataFactory.loadStart();
					ReviewService.deleteReview(product, review).success(function(data){
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