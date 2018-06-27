    function doLookUp( jsonTable, lookUpField, returnField, lookUpValue){
    		for (var i=0 ; i < jsonTable.length ; i++)	{
    		    if (jsonTable[i][lookUpField] == lookUpValue) {
    		        return jsonTable[i][returnField];
    		    }
    		}
    		return null;
    }

   function landmarks(mapPath){

     var idToLocationId = [
       { id: "D1", locationId: "UID1111"},
       { id: "R1", locationId: "UID4444"},
       { id: "R2", locationId: "UID3333"},
       { id: "D34", locationId: "UID2222"}
     ];


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
         name: "Breakout Area",
         sid: null,
         locationId: "UID3333"
       },
       {
         name: "Meeting Room 1",
         sid: null,
         locationId: "UID4444"
       }
     ];

     var nearbyInfo = [
       {
         id: "P23",
         description: "Near Room 1"
       },
       {
         id: "P25",
         description: "Near Breakout Area"
       }
     ];

     var landMarks = {
         items: []
     };

     //Start
     tmpID = doLookUp(idToLocationId,"id", "locationId", mapPath[0]);
     
     landMarks.items.push({
        "description" : doLookUp(locationInfo,"locationId", "name", tmpID ),
        "locationId" : doLookUp(locationInfo,"locationId", "locationId", tmpID),
        "id" :  mapPath[0]
     });
     //Paths
     for (i = 1; i < mapPath.length -1; i++) {
        pathAttribute = doLookUp(nearbyInfo,"id", "description", mapPath[i]);
        if ( pathAttribute != null){
          landMarks.items.push({
             "description" : pathAttribute,
             "locationId" : null,
             "id" :  mapPath[i]
          });
        }
     }
     //End
     tmpID = doLookUp(idToLocationId,"id", "locationId", mapPath[mapPath.length-1]);

     landMarks.items.push({
        "description" : doLookUp(locationInfo,"locationId", "name", tmpID ),
        "locationId" : doLookUp(locationInfo,"locationId", "locationId", tmpID),
        "id" :  mapPath[0]
     });

     console.log (landMarks);

   }
