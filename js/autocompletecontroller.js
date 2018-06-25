app.controller("AutoCompleteController", AutoCompleteController);
function AutoCompleteController($log) {
	var self = this;
	self.isDisabled  = false;
	self.repos = loadAll();
	self.querySearch = querySearch;
	self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;

 	function querySearch (query) {
     var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos;
        return results;
    }

 	function searchTextChange(text) {
      	$log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }
    
	function loadAll() {
      var repos = [
        {
          'name'      : 'He Xuan',
          'sid'       : 'E123456',
          'deskId'    : 'D1',
        },
         {
          'name'      : 'Ma Hui',
          'sid'       : 'D565531',
          'deskId'    : 'R1',
        },
         {
          'name'      : 'Rob Baskerville',
          'sid'       : 'U123456',
          'deskId'    : 'P24',
        },
         {
          'name'      : 'Kavita',
          'sid'       : 'N123456',
          'deskId'    : 'P57',
        },
        {
          'name'      : 'Your location',
          'sid'       : 'D565532',
          'deskId'    : 'R3',
        }
      ];
      return repos.map( function (repo) {
        repo.value = repo.name.toUpperCase();
        return repo;
      });
    }

     function createFilterFor(query) {
      var lowercaseQuery = angular.toLowerCase(query);

      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };

    }
}



