app.directive("elTime", function() {
	//speed in meter per second
	const slowWalkSpeed = 1.4;
	const briskWalkSpeed = 2;
	return {
		restrict: "E",
		scope: {
			distance: "="
		},
		templateUrl: "/js/angular/elTimeDirective/elTime.html",
		controller: function($scope) {
			reset();

			$scope.$watch("distance", function(distance) {
				if (!distance) {
					reset();
				} else {
					$scope.slowWalkTime = Math.round(
						distance / slowWalkSpeed / 60
					);
					$scope.briskWalkTime = Math.round(
						distance / briskWalkSpeed / 60
					);
				}
			});

			function reset() {
				$scope.slowWalkTime = 0;
				$scope.briskWalkTime = 0;
			}
		}
	};
});
