  function InfowindowsCor(){
        for (var i =0; i<objstation.position.length ; i++) {
         if(!objstation.bool[i] && objstation.lat[i]==0){
                infowindowsCor[i]='<li id="event" class="event" style=""  onclick="placeMarker('+i+')">'+
                                    '<img class="corImg" src="img/logo2/'+objstation.brandId[i]+'.png"/>'+
                                    '<div class="corOwner" title="'+objstation.owner[i]+'">'+objstation.owner[i]+'</div>'+
                                    '<div class="corOwner" title="'+objstation.address[i]+'">'+objstation.address[i]+'</div></li>';
          }

        }
        var y=document.getElementById("Cor-info");
        y.innerHTML=infowindowsCor.join("");
        
  }

  //***********Δημιουργία Marker***//
  function placeMarker(i){
          placeOwner=i;
          image='<div>Hi</div';
          if(isDirty){
              if(confirm("Αλλαγή πρατηρίου χωρίς αποστολή διόρθωσης;")){
                  deletePlaceMarker();
                  corMarker = objstation.markers[i]
                  corMarker.setMap(map2);
                  corMarker.setPosition(map2.getCenter());
                  corMarker.setVisible(true);
                  google.maps.event.addListener(corMarker,'dragend', function() {
                    $('#saveButton').prop('disabled', false);
                    isDirty=true;
                  });

                  }else{}
                
          }else{ 
          deletePlaceMarker();
          corMarker = objstation.markers[i]
          corMarker.setMap(map2);
          corMarker.setPosition(map2.getCenter());
          corMarker.setVisible(true);
          google.maps.event.addListener(corMarker,'dragend', function() {
                  $('#saveButton').prop('disabled', false);
                  isDirty=true; 
          });
        }
  }

  function deletePlaceMarker(){
      if(corMarker){
       corMarker.setMap(null);
       corMarker=null;
       $('#saveButton').prop('disabled', true);
       isDirty=false;
      }
  }

  function closeCorection(){
      if(isDirty){
        if(confirm("Επιστροφή χωρίς αποστολή διόρθωσης;")){
          isDirty=false; $('#saveButton').prop('disabled', true); $('.correction-brands').modal('hide');}else{}
          }else{ isDirty=false; $('#saveButton').prop('disabled', true); $('.correction-brands').modal('hide');}

      }


  function correctionBrand(){
    if(isDirty){
      $('#saveButton').prop('disabled', true);
      callCorrection(clientId,objstation.ownerId[placeOwner],corMarker.getPosition().lat(),corMarker.getPosition().lng())
      
      
    }
    isDirty=false; 
  }
  
  function callCorrection(clientID,gsID,lat,lng){
    var xmlhttp = initAJAX();
      if (xmlhttp) {
          var dt = new Date();  //αποφυγή caching σελίδας
          var url= "callCorrection.php?dev="+clientID+"&gsid="+gsID+"&lat="+lat+"&long="+lng+"&date="+dt;
          xmlhttp.open("GET",url,true);   // true - asynchronous call
          xmlhttp.send(null);
            // callback function
          xmlhttp.onreadystatechange=function() {
              if(xmlhttp.readyState==4 && xmlhttp.status==200) {
                  alert("Η θέση που προτείνατε απεστάλη και θα ελεγχθεί από το fuelGR στις επόμενες ώρες.  Αν στείλετε πολλές διορθώσεις για το ίδιο πρατήριο μόνο η τελευταία θα ληφθεί υπόψη.");
              } //if
          } //callback

      }
    
  }

