      function zoomMarker(ownerId,lat){
          
          for(var i=0;i<objstation.position.length;i++){
               
                if(objstation.ownerId[i]==ownerId && objstation.lat[i]==lat){
                  
//                   $('#myModal').on('hidden.bs-example-modal-list', function () {
//     // do something…
// })
                   // $('.bs-example-modal-list').modal('hide');
                  map.setZoom(13);
                  map.setCenter(objstation.position[i]);
                  infowindow.setContent(infowintext[i]);
                  infowindow.open(map,objstation.markers[i],infowintext[i]);
                  break;
               }         
           }
      }