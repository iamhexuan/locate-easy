var app = angular.module("locateEasy", ["ngMaterial", "ngMessages"]);

app.controller("LandingController", [
  "$scope",
  function($scope) {
    $scope.findPath = findPath;
    $scope.repos = loadAll();
    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange = searchTextChange;

    function findPath(start, end) {
      var result = pathFinder.findPath(
        doLookUp(idToLocationId, "locationId", "id", start),
        doLookUp(idToLocationId, "locationId", "id", end)
      );
      $scope.distance = result.distance;
      $scope.drawPath(result.path);
      $scope.landmarks = findLandmarks(result.path);
    }

    function doLookUp(jsonTable, lookUpField, returnField, lookUpValue) {
      for (var i = 0; i < jsonTable.length; i++) {
        if (jsonTable[i][lookUpField] == lookUpValue) {
          return jsonTable[i][returnField];
        }
      }
      return null;
    }

    function findLandmarks(mapPath) {
      var landMarks = {
        items: []
      };

      var tmpID = doLookUp(idToLocationId, "id", "locationId", mapPath[0]);

      landMarks.items.push({
        description: doLookUp(locationInfo, "locationId", "name", tmpID),
        locationId: doLookUp(locationInfo, "locationId", "locationId", tmpID),
        id: mapPath[0]
      });
      //Paths
      for (i = 1; i < mapPath.length - 1; i++) {
        pathAttribute = doLookUp(nearbyInfo, "id", "description", mapPath[i]);
        if (pathAttribute != null) {
          landMarks.items.push({
            description: pathAttribute,
            locationId: null,
            id: mapPath[i]
          });
        }
      }
      //End
      tmpID = doLookUp(
        idToLocationId,
        "id",
        "locationId",
        mapPath[mapPath.length - 1]
      );

      landMarks.items.push({
        description: doLookUp(locationInfo, "locationId", "name", tmpID),
        locationId: doLookUp(locationInfo, "locationId", "locationId", tmpID),
        id: mapPath[mapPath.length - 1]
      });

      return landMarks.items;
    }

    // function findIdByLocationId(locationId) {
    //   var value;
    //   Object.keys(idToLocationId).forEach(function(key) {
    //     if (
    //       idToLocationId.hasOwnProperty(key) &&
    //       idToLocationId[key] === locationId
    //     ) {
    //       value = key.toString();
    //     }
    //   });
    //   return value;
    // }

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
      var repos = locationInfo;
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
