window.showPath = showPath;

var positions = {};
paper.project.importSVG("test.svg", function(item) {
	item.children["positions"].children.forEach(function(child) {
		positions[child.name] = child;
	});

	// start();
});

var path = new Path();

function showPath(start, finish) {
	path.remove();
	path = new Path();
	path.strokeColor = "red";
	var navPath = findPath(start, finish).path;
	var i, position;
	for (i = 0; i < navPath.length; i++) {
		position = positions[navPath[i]];
		path.add(new Point(position.position._x, position.position._y));
	}
}

$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

});
