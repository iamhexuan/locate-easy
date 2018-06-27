var app = angular.module("locateEasy", ["ngMaterial", "ngMessages"]);

app.controller("LandingController", [
  "$scope",
  function($scope) {
    $scope.landmarks = [
      { description: "He Xuan's Desk", locationId: "UIN1234" },
      { description: "Near Tina Wyer's Office", locationId: "UIN8888" },
      { description: "Near Breakout Area", locationId: null },
      { description: "Ma Hui's Desk", locationId: "UIN5684" }
    ];
    $scope.findPath = findPath;
    $scope.repos = loadAll();
    $scope.querySearch = querySearch;
    $scope.selectedItemChange = selectedItemChange;
    $scope.searchTextChange = searchTextChange;

    function findPath(start, end) {
      var result = pathFinder.findPath(start, end);
      $scope.distance = result.distance;
      $scope.drawPath(result.path);
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
      console.log("Item changed to " + JSON.stringify(item));
    }

    function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);

      return function filterFn(item) {
        return item.value.indexOf(lowercaseQuery) === 0;
      };
    }

    function loadAll() {
      //id --- internal reference ID
      //locationId ---- Room ID for rooms and Table Number for Desks
      var idToLocationId = {
        D1: "UID1111",
        R1: "UID2222",
        R2: "UID3333",
        D4: "UID4444"
      };

      var locationInfo = [
        {
          name: "He Xuan's Desk",
          sid: "E123456",
          locationId: "UID1111"
        },
        {
          name: "Ma Hui's Desk",
          sid: "D565531",
          locationId: "UID2222"
        },
        {
          name: "Breakout Area"
          sid: null,
          locationId: "UID3333"
        }
        {
          name: "Meeting Room 1"
          sid: null,
          locationId: "UID4444"
        }
      ];

      var nearbyInfo = [
        P1: "Near Room 1",
        P4: "Near Breakout Area"
      ];
      
      //--end
      var repos = [
        {
          name: "He Xuan",
          sid: "E123456",
          locationId: "D1"
        },
        {
          name: "Ma Hui",
          sid: "D565531",
          locationId: "R1"
        },
        {
          name: "Rob Baskerville",
          sid: "U123456",
          locationId: "P24"
        },
        {
          name: "Kavita",
          sid: "N123456",
          locationId: "P57"
        }
      ];
      return repos.map(function(repo) {
        repo.value = repo.name.toLowerCase();
        return repo;
      });
    }
  }
]);
