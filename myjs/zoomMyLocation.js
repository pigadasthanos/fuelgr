      function zoomMyLocation(){
                
                if(curPosition){
                    if(!boolLocation){
                       
                        boolLocation=true;
                        //build a marker and associate it with the current position
                        curMarker = new google.maps.Marker({position: curPosition,
                                                      draggable:true,
                                                      animation: google.maps.Animation.DROP,
                                          icon: {url:'img/info/location50.png',size: new google.maps.Size(28, 50),
                                         }
                                  });
                        //place the marker on the map
                          curMarker.setMap(map);
                        //build an infowindow and associate it with the current position
                        var infowindow = new google.maps.InfoWindow({map: map,
                                                                 position: curPosition,
                                                                 disableAutoPan:true,
                                                                  content: '<div id="mylocation">Βρίσκεστε Εδώ!</div'
                        });
                    
                    //associate clicks on the marker with the infowindow
                    google.maps.event.addListener(curMarker,'click',function(){infowindow.setOptions({pixelOffset: new google.maps.Size(0,50)}); infowindow.open(map,curMarker);});
                    google.maps.event.addListener(curMarker,
                                                  'dragend',
                                                  function(){
                                                        if(confirm("Αλλάξατε την τοποθεσία σας θέλετε να αποθηκευτεί;")){
                                                                      alert("Η τοποθεσία σας άλλαξε!");
                                                                          curPosition=curMarker.getPosition();
                                                                          setCookie('mylocation',curPosition,cookieExpire);
                                                                        }else{curMarker.setPosition(curPosition);}
                                                                      
                                                        
                                                                               
                    });
                    }
                  // center the map on it
                  map.setCenter(curPosition);
                  map.setZoom(13);
                }else{
                  alert("Επιλέξτε γνωστοποίηση τοποθεσίας");
                }
      } 