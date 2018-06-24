var app = angular.module("locateEasy", []);

app.controller("LandingController", ["$scope", function($scope) {}]);
app.directive("map", function() {
	return {
		restrict: "A",
		scope: false,
		controller: function($scope) {
			$scope.showPath = showPath;
			$scope.points = {};
			initPaper();
			initMap();

			function initPaper() {
				paper.install(window);
				paper.setup("myCanvas");
			}

			function initMap() {
				paper.project.importSVG("../../image/test.svg", function(item) {
					item.children["points"].children.forEach(function(child) {
						$scope.points[child.name] = child;
					});
				});
			}

			var path = new Path();
			function showPath(start, finish) {
				path.remove();
				path = new Path();
				path.strokeColor = "red";
				var navPath = findPath(start, finish).path;
				var i, position;
				for (i = 0; i < navPath.length; i++) {
					position = $scope.points[navPath[i]];
					path.add(
						new Point(position.position._x, position.position._y)
					);
				}
			}
		}
	};
});
