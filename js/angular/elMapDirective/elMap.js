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
				});
			}

			var line = new Path();
			function drawPath(path) {
				line.remove();
				line = new Path();
				line.strokeColor = "red";

				var i, position;
				for (i = 0; i < path.length; i++) {
					position = $scope.points[path[i]];
					line.add(
						new Point(position.position._x, position.position._y)
					);
				}
			}
		}
	};
});
