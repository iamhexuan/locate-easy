app.directive("elLandmarkMap", function() {
	return {
		restrict: "E",
		scope: {
			landmarks: "=",
			points: "="
		},
		templateUrl: "/js/angular/elLandmarkMapDirective/elLandmarkMap.html",
		controller: function($scope) {
			$scope.$watch("landmarks", function() {
				$("[data-toggle=popover]").popover();
			});
		}
	};
});
