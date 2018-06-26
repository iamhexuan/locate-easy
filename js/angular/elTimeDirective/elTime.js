app.directive("ecTime", function() {
	const slowWalkSpeed = 1;
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
					$scope.slowWalkTime = distance / slowWalkSpeed;
					$scope.briskWalkTime = distance / briskWalkSpeed;
				}
			});

			function reset() {
				$scope.slowWalkTime = 0;
				$scope.briskWalkTime = 0;
			}
		}
	};
});

