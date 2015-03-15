 function callFullPriceStation(i){
    var xmlhttp = initAJAX();
     var headerOwner='<img src="img/logo2/'+objstation.brandId[i]+'.png" style="margin-right: 10px; float:left;"/>'+
                            '<span class="">'+objstation.owner[i]+'</span></br><span class="">'+objstation.address[i]+'</span>';
      if (xmlhttp) {
          var dt = new Date();  //αποφυγή caching σελίδας
          var url= 'full_price_station.php?gsid='+objstation.ownerId[i]+'&date='+dt;
          xmlhttp.open("GET",url,true);   // true - asynchronous call
          xmlhttp.send(null);
            // callback function
          xmlhttp.onreadystatechange=function() {
              if(xmlhttp.readyState==4 && xmlhttp.status==200) {
                   xmlDoc=xmlhttp.responseXML;
                    fullPriceStationElements=xmlDoc.documentElement.childNodes;
                    for (i=0;i<fullPriceStationElements.length;i++) {                               
                              if (fullPriceStationElements[i].nodeType!=3) {
                                 type=parseFloat(fullPriceStationElements[i].attributes.getNamedItem("type").value);
                                for (j=0;j<fullPriceStationElements[i].childNodes.length;j++) {
                                  if (fullPriceStationElements[i].childNodes[j].nodeType!=3) {
                                    switch (fullPriceStationElements[i].childNodes[j].nodeName) {
                                      case 'fn':
                                       var fn= fullPriceStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                     
                                        break;
                                      case 'pr':
                                       var price = parseFloat(fullPriceStationElements[i].childNodes[j].childNodes[0].nodeValue.trim()).toFixed(3);
                                        break;
                                      case 'du':
                                        var  du = fullPriceStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                          break;
                                        
                                    } //switch 
                                  }//if 
                                }//***for fullPriceStationElements[i].childNodes.length
                                switch (type) {
                                      case 1:
                                        var  color='background-color:#ffe4c4; ';
                                        break;
                                      case 2:
                                        var  color='ackground-color:#f9fbdc; ';
                                        break;
                                      case 3:
                                        var  color='background-color:#5cb85c; ';
                                        break;
                                      case  4:
                                        var  color='background-color:#ffe4c4; ';
                                        break;
                                      case 5:
                                        var  color='background-color:#ffae92; ';
                                        break;
                                      case 6:
                                        var  color='background-color:#f9fbdc; ';
                                        break;
                                      case 7:
                                        var  color='background-color:#ffae92; ';
                                        break;
                                } //switch

                                 listFullPrice[i]='<li class="infowindow-list" style="'+color+' width:250px; height:80px; padding: 2px 5px;">'+
                                    '<img src="img/app logo/fuelGR-32.png" style="display:inline; float:left;"/><span class="leftFn" title="'+fn+'">'+fn+'</span><span class="lastUpdate" style="float:left;">Καταχωρήθηκε:</span><span class="right">'+price+'&euro;</span><span class="lastUpdate" style="float:left;">'+du+'</span></li>';

                                
                              }//if
                    }//for fullPriceStationElements.length
                    var y=document.getElementById("allprice");
                    y.innerHTML=listFullPrice.join("");
                    var x=document.getElementById("headerOwner");
                    x.innerHTML=headerOwner;
               } //if
          } //callback

      }//if xmlhttp.readyState==4 && xmlhttp.status==200
    
  }