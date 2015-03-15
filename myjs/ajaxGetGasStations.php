  <script> //θελει ξεκαθαρισμα
  var script = '<script type="text/javascript" src="js/markerclusterer';
      if (document.location.search.indexOf('compiled') !== -1) {
        script += '_packed';
      }
      script += '.js"><' + '/script>';
      document.write(script);
      function ajax_getGasStations(municipalityID,brand,fuelType,days,countyId) {
            

            municipalitesFromCookies= municipalityID;
            brandsFromCookies = brand;
            fueltypeFromCookies= fuelType;
            daysFromCookies= days;
            //Set Cookies
            setCookies(municipalityID,brand,fuelType,days);
            //---End Cookies---
            deleteMarkers();    
            if(municipalitesFromCookies!=0){
              // //Εμφάνιση το κουμπί (προβολή σε λίστα)//
              document.getElementById('buttonlist').style.visibility='visible';
             // ****** αποκρυψη χάρτη και εμφάνηση spinner******
              var target = document.getElementById('spinner');
              var spinner = new Spinner().spin();
              target.appendChild(spinner.el);
              

              var xmlhttp = initAJAX();
              if (xmlhttp) {
                  //------- αρχικοποίηση bussy indicator -----------

                var f = fuelType;
                var b = brand;
                var m = municipalityID;
                var d = days;
                var dt = new Date().toLocaleString(); //αποφυγή caching σελίδας
                if(curPosition){
                    var url = "IAD_proxy.php?dev="+clientId+"&m="+m+"&f="+f+"&b="+b+"&d="+d+"&lat="+curPosition.lat()+"&long="+curPosition.lng()+"&date="+dt;
                }else{
                    var url = "IAD_proxy.php?dev="+clientId+"&m="+m+"&f="+f+"&b="+b+"&d="+d+"&date="+dt;
                }
                xmlhttp.open("GET",url,true);   //asynchronous call
                xmlhttp.send(null);

                // callback function
                xmlhttp.onreadystatechange=function() {

                  
                  if(xmlhttp.readyState==4 && xmlhttp.status==200) {
                    xmlDoc=xmlhttp.responseXML;
                    
                    if(xmlDoc==null || xmlDoc.documentElement.childNodes.length<=2){
                        document.getElementById('map_canvas').style.visibility = 'visible';
                        spinner.stop();
                        if(d>=1 && d<=7){
                            alert("Δεν βρέθηκαν πρατήρια με ενημερωμένες τιμές παρακαλώ κάντε νέα αναζήτηση με μεγαλύτερη παλαιότητα!");
                            zoomMyLocation();                                                              
                        }else{
                            alert("Δεν βρέθηκαν πρατήρια παρακαλώ κάντε νέα αναζήτηση!");
                            zoomMyLocation(); 
                        } 
                    }else{
                        gasStationElements=xmlDoc.documentElement.childNodes;
                        var k=-1;
                        for (i=0;i<gasStationElements.length;i++) {
                          
                          if (gasStationElements[i].nodeType!=3) {
                              k++;
                              cnt=xmlDoc.documentElement.attributes.getNamedItem("cnt").value;

                              objstation.ownerId[k]=parseInt(gasStationElements[i].attributes.getNamedItem("id").value);
                              dd=gasStationElements[i].attributes.getNamedItem("dd").value;
                              for (j=0;j<gasStationElements[i].childNodes.length;j++) {
                                  if (gasStationElements[i].childNodes[j].nodeType!=3) {
                                     switch (gasStationElements[i].childNodes[j].nodeName) {
                                    case 'ac':
                                      objstation.accuracyCoordinate[k] = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                      break;
                                    case 'lt':
                                      if(objstation.accuracyCoordinate[k]!="ZERO_RESULTS" && objstation.accuracyCoordinate[k]!="GEOMETRIC_CENTER"){
                                      lat = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                      break;
                                      }
                                      else{
                                        lat=0;
                                        break;
                                      }
                                    case 'lg':
                                      if(objstation.accuracyCoordinate[k]!="ZERO_RESULTS" && objstation.accuracyCoordinate[k]!="GEOMETRIC_CENTER"){
                                        log = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                        break;
                                      }
                                      else{
                                        log=0;
                                        break;
                                      }
                                    case 'pr':
                                      objstation.price[k] =parseFloat(gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim());
                                      break;
                                    case 'br':
                                      objstation.brand[k] = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                      objstation.brandId[k]=gasStationElements[i].childNodes[j].attributes.getNamedItem("id").value;
                                      if(objstation.brandId[k]==1){objstation.brand[k]='ΑΠ';}
                                      if(objstation.brandId[k]==7){objstation.brand[k]='AEGEAN';}
                                      
                                      break;
                                    case 'ft':
                                      objstation.fuelType[k]= gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();;
                                      objstation.fueltypeId =gasStationElements[i].childNodes[j].attributes.getNamedItem("id").value;
                                      break;
                                    case 'ad':
                                      objstation.address[k] = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();;
                                      break;
                                    case 'ow':
                                      objstation.owner[k] = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();;
                                      break;
                                    case 'dt':
                                      objstation.lastUpdate[k] = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();;
                                      break;

                                  } //switch
                                }else{
                                      
                                } //if (gasStationElements[i].childNodes[j].nodeType!=3)
                              } //for

                            
                              if(objstation.price[k]<minPrice.price){
                                minPrice.price=objstation.price[k];
                                minPrice.i=k;
                              }
                              if(objstation.price[k]>maxPrice.price){
                                maxPrice.price=objstation.price[k];
                                maxPrice.i=k;
                              }
                              objstation.lat[k]=parseFloat(lat);
                              objstation.lng[k]=parseFloat(log);
                              sum_price+=objstation.price[k];
                              objstation.position[k] = movePosition(objstation.lat[k],objstation.lng[k],objstation.ownerId[k]);
                            } //if(gasStationElements[i].nodeType!=3)

                        } //for(gasStationElements.length)
                        setColorPrice();
                        addMarker();
                        MoPrice();
                        toggleAllMarkers(map);
                        autoCenter();
                          // // group markers zoom 
                         // markerClusterer = new MarkerClusterer(map, objstation.markers, {
                         //      averageCenter: true,
                         //      gridSize: 100, maxZoom: 12,zoomOnClick:true
                         //    });
                         
                        document.getElementById('map_canvas').style.visibility = 'visible';
                        spinner.stop();
                      } //ifreadyState
                    } 
                } // onreadystatechange callback
              } //if xmlhttp
            }//if !municipalitesFromCookies
      } // function ajax_getGasStations
</script> 