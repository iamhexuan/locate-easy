var app = angular.module("locateEasy", []);

app.controller("LandingController", [
	"$scope",
	function($scope) {
		$scope.findPath = findPath;
		function findPath(start, end) {
			var result = pathFinder.findPath(start, end);
			$scope.distance = result.distance;
			$scope.drawPath(result.path);
		}
	}
]);
