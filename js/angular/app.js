var app = angular.module("locateEasy", ["ngMaterial", "ngMessages"]);

app.controller("LandingController", [
  "$scope",
  function($scope) {
    $scope.landmarks = [
      { description: "He Xuan's Desk", locationId: "UIN1234", id: "D1" },
      {
        description: "Near Tina Wyer's Office",
        locationId: "UIN8888",
        id: "D2"
      },
      { description: "Near Breakout Area", locationId: null, id: "D3" },
      { description: "Ma Hui's Desk", locationId: "UIN5684", id: "D4" }
    ];
    $scope.findPath = findPath;
    $scope.repos = loadAll();
    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange = searchTextChange;

    function findPath(start, end) {
      var result = pathFinder.findPath(
        findIdByLocationId(start),
        findIdByLocationId(end)
      );
      $scope.distance = result.distance;
      $scope.drawPath(result.path);
    }

    function findIdByLocationId(locationId) {
      var value;
      Object.keys(idToLocationId).forEach(function(key) {
        if (
          idToLocationId.hasOwnProperty(key) &&
          idToLocationId[key] === locationId
        ) {
          value = key.toString();
        }
      });
      return value;
    }

    function querySearch(query) {
      var results = query
          ? $scope.repos.filter(createFilterFor(query))
          : $scope.repos,
        deferred;
      return results;
    }

    function searchTextChange(text) {
      console.log("Text changed to " + text);
    }

    function selectedItemChange(item) {
      if (
        $scope.selectedItem_end &&
        $scope.selectedItem_start &&
        $scope.selectedItem_start.locationId &&
        $scope.selectedItem_end.locationId
      ) {
        findPath(
          $scope.selectedItem_start.locationId,
          $scope.selectedItem_end.locationId
        );
      }
      // console.log("Item changed to " + JSON.stringify(item));
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return item.value.includes(lowercaseQuery);
      };
    }

    function loadAll() {
      var nearbyInfo = [{ P1: "Near Room 1" }, { P4: "Near Breakout Area" }];

      var repos = locationToIdMap;
      return repos.map(function(repo) {
        if (repo.name) {
          repo.value = repo.name.toLowerCase();
        }

        if (repo.sid) {
          repo.value = repo.value + repo.sid.toLowerCase();
        }

        if (repo.locationId) {
          repo.value = repo.value + repo.locationId.toLowerCase();
        }

        return repo;
      });
    }
  }
]);
