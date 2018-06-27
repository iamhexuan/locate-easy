app.directive("elMap", function() {
	return {
		restrict: "A",
		scope: false,
		controller: function($scope) {
			$scope.points = {};
			$scope.drawPath = drawPath;
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
					$scope.$apply();
				});
			}

			var line = new Path();
			function drawPath(path) {
				line.remove();
				line = new Path();
				line.strokeColor = "#3b8ac8";
				line.strokeWidth = 8;

				var i, position;
				for (i = 0; i < path.length; i++) {
					position = $scope.points[path[i]];
					line.add(
						new Point(position.position._x, position.position._y)
					);
				}

				roundCorners(line, 10);
			}

			function roundCorners(path, radius) {
				var segments = path.segments.slice(0);
				path.removeSegments();

				for (var i = 0, l = segments.length; i < l; i++) {
					var curPoint = segments[i].point;
					var nextPoint = segments[i + 1 == l ? 0 : i + 1].point;
					var prevPoint =
						segments[i - 1 < 0 ? segments.length - 1 : i - 1].point;
					var nextDelta = curPoint.subtract(nextPoint);
					var prevDelta = curPoint.subtract(prevPoint);

					nextDelta.length = radius;
					prevDelta.length = radius;

					path.add(
						new paper.Segment(
							curPoint.subtract(prevDelta),
							null,
							prevDelta.divide(2)
						)
					);

					path.add(
						new paper.Segment(
							curPoint.subtract(nextDelta),
							nextDelta.divide(2),
							null
						)
					);
				}
				path.closed = false;
				return path;
			}
		}
	};
});
