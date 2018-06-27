app.directive("elLandmarkList", function() {
	return {
		restrict: "E",
		scope: {
			landmarks: "="
		},
		templateUrl: "/js/angular/elLandmarkListDirective/elLandmarkList.html",
		controller: function($scope) {}
	};
});
