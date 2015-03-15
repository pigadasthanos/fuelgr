   //*******Προβολη σε λιστα*******//
  function infowindowList(){    
        for (var i=0;i<objstation.ownerId.length;i++) {
                if(objstation.bool[i]==true){
                var satellite ='<img title="Τοποθεσία Πρατηρίου" src="img/info/Satellite-icon30.png"/>';
                }else{
                 var satellite =' ';
                }
                var ifo='<div id="infowindow-content" style="margin-left:-10px;">'+
                          '<div id="row"><div class="col-xs-2"><img title="'+objstation.ownerId[i]+'" src="img/logo2/'+objstation.brandId[i]+'.png"/></div>'+
                          '<div class="col-xs-10" style="margin-left:-3px;"><div class="fueltype">'+objstation.fuelType[i]+'</div></br>'+
                          '<div class="brand">'+objstation.brand[i]+'</div><div class="right '+objstation.priceColor[i]+'">'+objstation.price[i].toFixed(3)+'&euro;</div></div></div>'+
                          '<div id="row"><div class="col-xs-2"></br>'+satellite+'</div>'+
                          '<div class="col-xs-10" style="margin-left:-3px;"><div class="lastUpdate">Καταχωρήθηκε: '+objstation.lastUpdate[i].substring(0,16)+'</div>'+
                          '<div class="owner">'+objstation.owner[i]+'</div>'+
                          '<div class="address">'+objstation.address[i]+'</div>'+
                          '</div></div>'+
                        '</div>';
                if(objstation.bool[i]==true){
                      objstation.infowindow[i]='<div id="'+objstation.ownerId[i]+'" class="infowindow-list" data-dismiss="modal" style="cursor: pointer;" onclick="zoomMarker('+objstation.ownerId[i]+','+objstation.lat[i]+')">'+ifo+'</div>';  
                }else{
                  objstation.infowindow[i]='<div id="'+objstation.ownerId[i]+'" class="infowindow-list" >'+ifo+'</div>';
                }
      }
       x=document.getElementById("list");
      x.innerHTML=objstation.infowindow.join(""); 
  }