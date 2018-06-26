var app = angular.module("locateEasy", ['ngMaterial', 'ngMessages']);

app.controller("LandingController", [
	"$scope",
	function($scope) {
		$scope.findPath = findPath;
		$scope.repos = loadAll();
		$scope.querySearch   = querySearch;
    	$scope.selectedItemChange = selectedItemChange;
    	$scope.searchTextChange   = searchTextChange;

		function findPath(start, end) {
			var result = pathFinder.findPath(start, end);
			$scope.distance = result.distance;
			$scope.drawPath(result.path);
		}

	function querySearch (query) {
      	var results = query ? $scope.repos.filter(createFilterFor(query)) : $scope.repos,
          	deferred; 
      	return results;
    }
	
	function searchTextChange(text) {
      console.log('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      console.log('Item changed to ' + JSON.stringify(item));
    }
	
	function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }

	function loadAll() {
      var repos = [
        {
          'name'      : 'He Xuan',
          'sid'       : 'E123456',
          'locationId'    : 'D1',
        },
         {
          'name'      : 'Ma Hui',
          'sid'       : 'D565531',
          'locationId'    : 'R1',
        },
         {
          'name'      : 'Rob Baskerville',
          'sid'       : 'U123456',
          'locationId'    : 'P24',
        },
         {
          'name'      : 'Kavita',
          'sid'       : 'N123456',
          'locationId'    : 'P57',
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }
	}
]);
