function addMarker(){
            bool=true;
              infowindow = new google.maps.InfoWindow({ pixelOffset: new google.maps.Size(-1, 65)});
              
               
            for (var i = 0; i < objstation.price.length; i++){
              objstation.coordinates[i]=accuracyCoordinate(objstation.accuracyCoordinate[i]);
              objstation.bool[i]=true; 
              if(minPrice.price==objstation.price[i]){var imageMinPrice="<img id='imgeuro' src='img/euro30.png'>";}
              else{var imageMinPrice="";}
              if(objstation.accuracyCoordinate[i]=="ROOFTOP"){
                  streetView='<img class="right btn" style="margin-top:-7px;" src="img/info/streetView40.png" onclick="toggleStreetView('+i+')" title="Εικόνα πρατηρίου από StreetView"/>';
              }else{
                streetView='<img class="right btn" style="margin-top:-7px;" src="img/info/satellite-warning40.png" onclick="reportAnError('+i+')" title="Aναφορά Λάθους"/>';
              }

              fuelprice=objstation.price[i].toFixed(3);
              allprice='<img src="img/info/drop40.png" class="right btn" style="margin-top:-7px;" data-toggle="modal" data-target=".bs-example-modal-allprice" title="Τιμές όλων των καυσίμων του πρατηρίου" onclick="callFullPriceStation('+i+')" />';
              infowintext[i] =
                        '<div id="infowindow-content" style="width:310px; overflow:hidden;">'+
                          '<div id="row"><div class="col-xs-2" style="padding:0px"><img title="'+objstation.ownerId[i]+'" src="img/logo2/'+objstation.brandId[i]+'.png"/></div>'+
                          '<div class="col-xs-10"><div class="fueltype">'+objstation.fuelType[i]+'</div>'+
                          '</br><div class="brand">'+objstation.brand[i]+'</div></div></div>'+
                          '<div id="row"><div class="col-xs-12" style="padding:0px"><div class="lastUpdate">Καταχωρήθηκε: '+objstation.lastUpdate[i].substring(0,16)+'</div>'+
                          '<div style="margin-top:-7px;" class="right '+objstation.priceColor[i]+'">'+fuelprice+'&euro;</div>'+
                          '<div class="owner">'+objstation.owner[i]+'</div>'+allprice+streetView+
                          '<div class="address">'+objstation.address[i]+'</div>'+
                          '<div >Ακρίβεια Συντεταγμένων : '+objstation.coordinates[i]+'</div></div>'+
                        '</div>';
            if(objstation.accuracyCoordinate[i]!="ZERO_RESULTS" && objstation.accuracyCoordinate[i]!="GEOMETRIC_CENTER"){
              // ===Δημιουργία marker μαζι με label για της τιμες===
              var marker = new MarkerWithLabel({
                    position: objstation.position[i],
                    labelContent: '<div class="arrow_box '+objstation.priceColor[i]+'">'+fuelprice+'&euro;</div>'+imageMinPrice,
                    title: objstation.brand[i],
                    animation: google.maps.Animation.DROP,
                    draggable:true,
                    visible:true,
                    zIndex: -i,
                    labelAnchor: new google.maps.Point(20, 23),
                    labelStyle: {opacity: 1},
                    labelVisible: true,
                    icon: {url:'img/logo40/'+objstation.brandId[i]+'.png',anchor: new google.maps.Point(19,63)}
                });
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                      return function() {
                          
                          infowindow.setContent(infowintext[i]);
                          infowindow.open(map, marker,infowintext[i]);
                      }
                    })(marker, i));
              objstation.bool[i]=true;
              markers.push(marker);
            }else{  //*** πρατήρια χωρίς θέση στον χάρτη ***//
              // ***Δημιουργία marker μαζι με label για της τιμες***
                        var marker = new MarkerWithLabel({
                        position: objstation.position[i],
                        map:map2,
                        labelContent: '<div class="arrow_box '+objstation.priceColor[i]+'">'+fuelprice+'&euro;</div>'+imageMinPrice,
                        title: objstation.brand[i]+'-('+objstation.ownerId[i]+')',
                        animation: google.maps.Animation.DROP,
                        draggable:true,
                        visible:false,
                        zIndex: i,
                        labelAnchor: new google.maps.Point(20, 23),
                        labelStyle: {opacity: 1},
                        labelVisible: true,
                        icon: {url:'img/logo40/'+objstation.brandId[i]+'.png',anchor: new google.maps.Point(19,63)}
                    });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        
                        infowindow.setContent(infowintext[i]);
                        infowindow.open(map2, marker,infowintext[i]);
                    }
                  })(marker, i));
                if(objstation.lat[i]==0){countZeroResult++;}
                objstation.bool[i]=false;
              }
             
                
                // google.maps.event.addListener(marker,'click',(function(marker, i) {
                //         return function() {
                //            panorama.setPosition(objstation.position[i]);
                //            panorama.setVisible(false);

                          
                //         }
                //     })(marker, i));

            // *****Γεμιζει των πινακα markers[] *****
          objstation.markers.push(marker);
        }
}
function accuracyCoordinate(accuracyCoordinate){
   //********switch για την ακριβεια συντεταγμενων του πρατηριου
    switch (accuracyCoordinate) {
          case 'ZERO_RESULTS':
            var coordinates="Χωρίς θέση στο χάρτη";
            break;
          case 'GEOMETRIC_CENTER':
            var coordinates="Κακή";
            break;
          case 'RANGE_INTERPOLATED':
            var coordinates="Μέτρια";
            break;
          case 'APPROXIMATE':
            var coordinates="Καλή";
            break;
          case 'ROOFTOP':
            var coordinates="Πολύ Καλή";
            break;
    } //switch
    return coordinates;
}
function toggleStreetView(i) {
        panoramaPos=i;

        panorama = map.getStreetView();
        var service = new google.maps.StreetViewService();
      service.getPanoramaByLocation(objstation.position[i], 50, showPanoData);
}
function showPanoData(panoData, status) {
    if (status != google.maps.StreetViewStatus.OK) {
    alert("Δεν υπάρχει StreetView σε αυτή την τοποθεσία");
    return;
    }
    var heading = google.maps.geometry.spherical.computeHeading(panoData.location.latLng,objstation.position[panoramaPos]);
    var panoOptions = {
          position:objstation.position[panoramaPos],
          addressControl: true,
          linksControl: true,
          panControl: true,
          pov: {
            heading: heading,
            pitch: 1,
            zoom: 1
          },
          visible:false,
          enableCloseButton: true,
        };
    panorama.setOptions(panoOptions);
    panorama.setVisible(true);
}

function reportAnError(i){
  if(confirm("Να σταλθεί αναφορά λάθους θέσης του πρατηρίου;"+i)){
      callAlertCorrection(clientId,objstation.ownerId[i],objstation.lat[i],objstation.lng[i]);
  }else{}
}

function callAlertCorrection(clientID,gsID,lat,lng){

  alert("alert-"+clientID+gsID+lat+lng);
    // var xmlhttp = initAJAX();
    //   if (xmlhttp) {
    //       var dt = new Date();  //αποφυγή caching σελίδας
    //       var url= "callCorrection.php?dev="+clientID+"&gsid="+gsID+"&lat="+lat+"&long="+lng+"&date="+dt;
    //       xmlhttp.open("GET",url,true);   // true - asynchronous call
    //       xmlhttp.send(null);
    //         // callback function
    //       xmlhttp.onreadystatechange=function() {
    //           if(xmlhttp.readyState==4 && xmlhttp.status==200) {
    //               alert("Η θέση που προτείνατε απεστάλη και θα ελεγχθεί από το fuelGR στις επόμενες ώρες.  Αν στείλετε πολλές διορθώσεις για το ίδιο πρατήριο μόνο η τελευταία θα ληφθεί υπόψη.");
    //           } //if
    //       } //callback

    //   }
    
  }