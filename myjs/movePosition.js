      //*******Μετακινιη  πρατηριου με ιδιο ownerId και διαφορετικη βενζινη και με ιδιο lat & lng.*******//
      function movePosition(lat,lng,ownerId){
          var booleann=false;
          var lat1=lat,lng1=lng;

          if(objstation.ownerId.length){
            for (var i = 0; i < objstation.ownerId.length-1; i++) {
              
              if (objstation.ownerId[i]==ownerId && (objstation.lat[i]==lat && objstation.lng[i]==lng)){
                  
                    

                       lat1=lat+0.00010;
                       lng1=lng+0.00020;
                       
                      objstation.lat[i]=lat1;
                       objstation.lng[i]=lng1;
                      
                    
                 booleann=true;
              }
            }
          }
           var position = new google.maps.LatLng(lat1,lng1);
          return position;
        
      }