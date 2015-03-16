
 
      //Cookies Varibles
      var municipalitesFromCookies,daysFromCookies,brandsFromCookies,fueltypeFromCookies,
          fueltypeFromCookies,clientId,cookieExpire = 30;
      // object πρατηριου
      var objstation = {
                        markers:[],lat:[],lng:[],position:[],accuracyCoordinate:[],coordinates:[],
                        ownerId:[],owner:[],priceColor:[],price:[],brand:[],brandId:[],
                        fuelType:[],fueltypeId:"",
                        address:[],lastUpdate:[],infowintext:[],bool:[]
                      }

      var map = null,map2= null,center=null;   //gives access to the map object
      var corMarker,placeOwner;
      var curPosition,infowindow,curMarker;
      var panorama,panoramaPos;
      var bool=false,isDirty=false,boolLocation=false;
      var minPrice = {price:100.000,i:-1};
      var maxPrice ={price:0,i:-1};
      var sum_price=0,countZeroResult=0; 
      var cnt="",dd="";
      
      //*****Δημιουργία guid deviceId*******//
      function S4() {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      //*****Δημιουργία cookie*******//
      function setCookie(cname,cvalue,exdays){
          var d = new Date();
          d.setTime(d.getTime()+(exdays*24*60*60*1000));
          var expires = "expires="+d.toGMTString();
          document.cookie = cname + "=" + cvalue + "; " + expires;
      } 
      //*****ελέγχει αν υπάρχει cookie με αυτό το name και επιστρέφει την τιμή του cookie ***//
      function getCookie(cname) {
          var name = cname + "=";
          var ca = document.cookie.split(';');
          for(var i=0; i<ca.length; i++){
            var c = ca[i].trim();
            if (c.indexOf(name)==0){ 
              return c.substring(name.length,parseFloat(c.length));
            }
          }
          return "";
      } 
      //***Ίσως χρειαστεί αργότερα ****//
      // function checkCookie(){
      //     var username=getCookie("username");
      //     if (username!=""){alert("Welcome again " + username);}
      //     else{
      //       username = prompt("Please enter your name:","");
      //       if (username!="" && username!=null) { setCookie("username",username,365); }
      //     }
      // }
      //****************Aρχικοποιεί τα cookies**********// 
      function setCookies(municipalityID,brand,fuelType,days){
          // setCookie('countyId',countyId,cookieExpire);
          setCookie('municipalities',municipalityID,cookieExpire);
          setCookie('brands',brand,cookieExpire);
          setCookie('fueltypes',fuelType,cookieExpire);
          setCookie('days',days,cookieExpire);
      }

      //*******Ελεγχος αν υπάρχουν cookies και πέρασμα των τιμών τους**********//
      function getCookies(){
            //****** δημιουργία deviceId αν δεν υπάρχει;
          if(!getCookie('deviceId')){
              clientId =("web-"+S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
              setCookie('deviceId',clientId,cookieExpire);
            }else{clientId=getCookie('deviceId')}
          //if DAYS
          if(!getCookie('days') && !getCookie('fueltypes') && !getCookie('brands') && !getCookie('mylocation') && !getCookie('municipalities') && !getCookie('countyId')){
              document.getElementById('cookiesAlert').style.visibility = 'visible';
              $('.bs-example-modal-disclaimer').modal('show');
          }
          if(!getCookie('days')){
              daysFromCookies=5;
              setCookie('days',daysFromCookies,cookieExpire);
          }
          else{daysFromCookies = getCookie('days');}
          // if FUEL TYPES
          if(!getCookie('fueltypes')){
              fueltypeFromCookies=1;
              setCookie('fueltypes',fueltypeFromCookies,cookieExpire);
          }
          else{ fueltypeFromCookies = getCookie('fueltypes');}

          // if BRANDS
          if(!getCookie('brands')){
              brandsFromCookies=0;
              setCookie('brands',brandsFromCookies,cookieExpire);
          }
          else{brandsFromCookies = getCookie('brands');}
          if(!getCookie('mylocation')){
             // curPosition = curPosition = new google.maps.LatLng(39.6315214,22.4464073);
          }else{
              var values = getCookie('mylocation').split("(");
              var values2 = getCookie('mylocation').split(",");
              var lat = parseFloat(values[1]);
              var lng = parseFloat(values2[1]);
              curPosition =  new google.maps.LatLng(lat,lng); 
          }
          //************βρισκει αν υπαρχει cookies με επιλεγμενη περιοχη στο χρηστη και κανει απευθειας κλιση στον server******//
          if(getCookie('municipalities').substring(0,2)==getCookie('countyId').substring(0,2) && getCookie('municipalities').substring(0,2)!=0){
              municipalitesFromCookies = getCookie('municipalities');
              countyFromCookies=getCookie('countyId');
              ajax_getMunicipalities(countyFromCookies);
              ajax_getGasStations(municipalitesFromCookies,brandsFromCookies,fueltypeFromCookies,daysFromCookies,countyFromCookies);
          }else{
              municipalitesFromCookies=0;
              setCookie('municipalities',municipalitesFromCookies,cookieExpire);
              countyFromCookies=0;
              setCookie('countyId',countyFromCookies,cookieExpire);
          }//--endif
      }//**********Τελος function getCookies*******// 

     //****Δημιουργία κεντρικού χάρτη****/
      function mapOption(){
            if(municipalitesFromCookies==0 && !getCookie('mylocation')){    
                
                var initCenter = new google.maps.LatLng(39.6315214,22.4464073);     
                var mapOptions = {//create the map object
                  center:initCenter,
                  zoom:8,
                  scaleControl: true,
                  mapTypeControl: true,
                  mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, 
                    position:google.maps.ControlPosition.TOP_LEFT,
                  },
                  panControl: true,
                  panControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                  },
                  zoomControl: true,
                  zoomControlOptions: {
                    position: google.maps.ControlPosition.RIGHT_TOP
                  },
                  mapTypeId:google.maps.MapTypeId.ROADMAP
                };
             
           }else{
                  var mapOptions = {mapTypeControl: true,//create the map object
                                      
                                mapTypeControlOptions: {
                                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, 
                                  position:google.maps.ControlPosition.TOP_LEFT,
                                },
                                panControl: true,
                                panControlOptions: {
                                  position: google.maps.ControlPosition.RIGHT_TOP
                                },
                                zoomControl: true,
                                zoomControlOptions: {
                                  position: google.maps.ControlPosition.RIGHT_TOP
                                },
                                mapTypeId:google.maps.MapTypeId.ROADMAP};
           }
            map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);  
      }
      //****Δημιουργία χάρτη διόρθωσης****/
      function mapOption2(){
        infowindowsCor();   
        var mapOptions2 = {
              mapTypeControl: true,
              zoom:12,
              scaleControl: true,
              mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, 
                                  position:google.maps.ControlPosition.TOP_LEFT 
              },
              panControl: true,
              panControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
              },
              zoomControl: true,
              zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_TOP
              },
              mapTypeId:google.maps.MapTypeId.ROADMAP
            }
             //create the map2 object
             map2 = new google.maps.Map(document.getElementById("model-map"), mapOptions2);
      }

      // initializes the google map and marks the current position (if possible)
      function initialize() {
   
          // google.maps.visualRefresh = true;
          getCookies();
          mapOption();

          if(navigator.geolocation) {
            //define callback functions to handle succesful or failed current position estimation
            navigator.geolocation.getCurrentPosition(cbGetCurPosOK, cbGetCurPosFail);
          } else {
            //browser does not support geolocation  
            alert('Your browser doesn\'t support geolocation.')
          }
      
          // callback for successful getCurrentPosition 
          function cbGetCurPosOK(position) {
                
                //build a current position  
                  curPosition = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                   setCookie('mylocation',curPosition,cookieExpire);

                 if(municipalitesFromCookies==0){zoomMyLocation();}

          }

          // callback for failed getCurrentPosition 
          function cbGetCurPosFail(error) {
              switch(error.code) {
                case error.PERMISSION_DENIED:
                alert("User denied the request for Geolocation.");
                break;
                case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
                case error.TIMEOUT:
                alert("The request to get user location timed out.");
                break;
                case error.UNKNOWN_ERROR:
                alert("An unknown error occurred.")
                break;
              }
          }
      
      }//******Tελος function initialize******//
      //associate the initialize function with the load event of the page
      google.maps.event.addDomListener(window, 'load', initialize); 

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
      

      function initAJAX() {
          if (window.XMLHttpRequest) {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
            return xmlhttp;   
          }
          else if (window.ActiveXObject) {
            // code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            return xmlhttp; 
          }
          else {
            alert("Your browser does not support XMLHTTP!");
            return;
          }
      }
      //***** βρίσκει το κέντρο από το εμβαδών των markers ******// 
      function autoCenter() {
          if (objstation.markers.length) {
              //create a new viewport
              var bounds = new google.maps.LatLngBounds();
              //go through each marker and adjust the viewport's extends
              for (var i = 0; i < objstation.markers.length; i++) {
                  if(objstation.bool[i]){
                    bounds.extend(objstation.markers[i].position);
                  }
              }
              //fit these bounds to the map
              map.fitBounds(bounds);
              var zoomOverride = map.getZoom();
                 if(zoomOverride > 13) {
                zoomOverride = 13;
                  }
                map.setZoom(zoomOverride);
          }else {
              zoomMyLocation();
              if (countZeroResult != 0) {
                  alert("Υπάρχουν πρατήρια αλλά δεν έχουν θέση στο χάρτη παρακαλώ αν γνωρίζετε την τοποθεσίας τους τοποθετήστε τα κάνοντας κλικ  στο κουμπί με τα πρατήρια χωρίς θέση στο χάρτη.");
              } else {
                  alert("Δεν υπάρχουν πρατήρια καυσίμων παρακαλώ κάντε νέα αναζήτηση.");
              }
          }
          $('.correction-brands').on('shown.bs.modal', function () {
              google.maps.event.trigger(map2, "resize");
              map2.fitBounds(bounds);
              map2.setZoom(zoomOverride);
          });
         this.center= map.getCenter();         
      }
       
     //******** Γεμίζει ή αδειάζει τον χάρτη με τις πινέζες *****//
      function toggleAllMarkers(mapHandler) {
          for(var i=0; i < objstation.markers.length; i++){
            if(objstation.bool){ objstation.markers[i].setMap(mapHandler); }
          }
      }
      //********πάει στο marker και ανοίγει το infobox ******///
      function zoomMarker(ownerId,lat){
          for(var i=0;i<objstation.position.length;i++){    
              if(objstation.ownerId[i]==ownerId && objstation.lat[i]==lat){
                map.setZoom(13);
                map.setCenter(objstation.position[i]);
                infowindow.setContent(objstation.infowintext[i]);
                infowindow.open(map,objstation.markers[i]);
                break;
              }         
          }
      }
        //***********Δινει χρωμα στις τιμεσ αναλογα με τον μεσο ορο**************
      function setColorPrice(){
            for (var i = 0; i < objstation.price.length; i++) {
                
                  if(minPrice.price<=objstation.price[i] && (objstation.price[i]<=minPrice.price+0.15*(maxPrice.price-minPrice.price))){
                        // === τιμες κοντα στο ελαχιστο===
                        objstation.priceColor[i]='price_green';
                  }
                  else{
                      if (maxPrice.price>=objstation.price[i] && (objstation.price[i]>=maxPrice.price-0.15*(maxPrice.price-minPrice.price))){
                        // === τιμες κοντα στο μεγιστο===
                        
                        objstation.priceColor[i]='price_red';
                      }else{
                       // === τιμες κοντα στο μεσο ορο===
                      objstation.priceColor[i]='price_blue';
                      }  
                  }
            }
      }//***********ΤΕΛΟΣ function που δίνει χρωμα στις τιμές ανάλογα με τον μεσο ορο**************

        //*****Υπολογισμός μέσου όρου τιμής και απεικόνιση *******//
      function MoPrice() {
          var moprice=0;
          var character="α";
          if(countZeroResult==1){
            character="ο";
          }
          $('#minAverageMaxPrice').on('shown.bs.collapse', function () {
             $(this).parent("div").find(".glyphicon-chevron-down").removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
          });
          $('#minAverageMaxPrice').on('hidden.bs.collapse', function () {
             $(this).parent("div").find(".glyphicon-chevron-up").removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
          });
           $('#messageArea').on('hidden.bs.collapse', function () {
             $(this).parent("div").find(".glyphicon-collapse-down").removeClass("glyphicon-collapse-down").addClass("glyphicon-collapse-up");
          });
          $('#messageArea').on('shown.bs.collapse', function () {
             $(this).parent("div").find(".glyphicon-collapse-up").removeClass("glyphicon-collapse-up").addClass("glyphicon-collapse-down");
          });
          document.getElementById('minAverageMaxPrice').style.visibility = 'visible';
          moprice=sum_price/objstation.price.length;
          moprice=parseFloat(moprice).toFixed(3);
          document.getElementById('minAverageMaxPrice').innerHTML='<div class="minAverageMaxPrice collapse in"><table class="" style="width:100%;">'+
                                                                  '<tr  title="Δήμος '+dd+' , '+cnt+'"><td colspan="4" style="padding: 0 5px; max-width:15px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"><strong>Δ.'+dd+' , '+cnt+'</strong></td></tr>'+
                                                                  '<tr><td class="imgBand" style="white-space:nowrap; width:2px;"><img id="img" style="padding-bottom: 2px;" src="img/app logo/fuelGR-32.png"> '+objstation.ownerId.length+'</td>'+
                                                                  '<td class="price_red" >max&nbsp'+maxPrice.price.toFixed(3)+'&euro;</td>'+
                                                                  '<td class="price_blue" >MO&nbsp'+moprice+'&euro;</td>'+
                                                                  '<td class="price_green" >min&nbsp'+minPrice.price.toFixed(3)+'&euro;</td>'+
                                                                  '</tr></table>'+
                                                                  '</div><button class="btn-default" data-toggle="collapse" data-target=".minAverageMaxPrice"><span class="glyphicon glyphicon-chevron-up"></span></button>';
          if(countZeroResult==0){document.getElementById('messageArea').style.visibility = 'hidden';}
          else{ 
              document.getElementById('messageArea').style.visibility = 'visible';
              document.getElementById('messageArea').innerHTML='<div class="collapse in" id="collapseCor"><button class="btn-default size" style="background-color:#F68300; border-color: #F68300; color: #303030;"  data-toggle="modal" data-target=".correction-brands" onclick="mapOption2()">'+
                  +countZeroResult+' επιπλέον πρατήρι'+character+'</br>χωρίς θέση στο χάρτη</button></div><button class="btn-default size" style="background-color:#F68300; border-color: #F68300; color: #303030;" type="button" data-toggle="collapse" data-target="#collapseCor" title="επιπλέον πρατήρι'+character+'χωρίς θέση στο χάρτη">'+
                       '<span class="size glyphicon glyphicon-collapse-down"></span></button>';
          }
      }
  

      //*****Δημιουργία markers*****//
      function addMarker(){
          bool=true;
          infowindow = new google.maps.InfoWindow({ pixelOffset: new google.maps.Size(-1, 65)});
          for (var i = 0; i < objstation.price.length; i++){
              objstation.coordinates[i]=accuracyCoordinate(objstation.accuracyCoordinate[i]);
              objstation.bool[i]=true; 
              if(minPrice.price==objstation.price[i]){var imageMinPrice="<img id='imgeuro' src='img/euro30.png'>";}
              else{var imageMinPrice="";}
              if(objstation.accuracyCoordinate[i]=="ROOFTOP"){streetView='<img class="right btn" style="margin-top:-7px; height:40px;" src="img/info/street-view45.png" onclick="toggleStreetView('+i+')" title="Εικόνα πρατηρίου από StreetView"/>'; }
              else{streetView='<img class="right btn" style="margin-top:-7px; height:40px;" src="img/info/satellite-warning40.png" onclick="reportAnError('+i+')" title="Aναφορά Λάθους"/>'; }
              fuelprice=objstation.price[i].toFixed(3);
              allprice='<img src="img/info/drop.png" class="right btn" style="margin-top:-7px; height:40px;" data-toggle="modal" data-target=".bs-example-modal-allprice" title="Τιμές όλων των καυσίμων του πρατηρίου" onclick="callFullPriceStation('+i+')" />';
              objstation.infowintext[i] = '<div id="infowindow-content" style="height:auto; width:325px; overflow:hidden;">'+
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
                      map:map,
                      labelContent: '<div class="arrow_box '+objstation.priceColor[i]+'">'+fuelprice+'&euro;</div>'+imageMinPrice,
                      title: objstation.brand[i],
                      animation: google.maps.Animation.DROP,
                      draggable:false,
                      visible:true,
                      zIndex: -i,
                      labelAnchor: new google.maps.Point(20, 23),
                      labelStyle: {opacity: 1},
                      labelVisible: true,
                      icon: {url:'img/logo/'+objstation.brandId[i]+'.png',anchor: new google.maps.Point(19,63)}
                  });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                        return function() {
                            infowindow.setContent(objstation.infowintext[i]);
                            infowindow.open(map, marker,objstation.infowintext[i]);
                            }
                      })(marker, i));
                objstation.bool[i]=true;
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
                        icon: {url:'img/logo/'+objstation.brandId[i]+'.png',anchor: new google.maps.Point(19,63)}
                    });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(objstation.infowintext[i]);
                        infowindow.open(map2, marker,objstation.infowintext[i]);
                    }
                  })(marker, i));
                if(objstation.lat[i]==0){countZeroResult++;}
                objstation.bool[i]=false;
            }
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
      //****Δημιουργία panorama Street view*****//
      function toggleStreetView(i) {
              panoramaPos=i;

              panorama = map.getStreetView();
              var service = new google.maps.StreetViewService();
            service.getPanoramaByLocation(objstation.position[i], 50, showPanoData);
      }
      //****Έλεγχος αν υπάρχει στο location street view και εμφανιση αν υπάρχει//
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
      //****κλήση για αναφορά λάθους****//
      function reportAnError(i){
        if(confirm("Να σταλθεί αναφορά λάθους θέσης του πρατηρίου;")){
            callAlertCorrection("alert-"+clientId,objstation.ownerId[i],objstation.lat[i],objstation.lng[i]);
        }else{}
      }
      //****εφαρμογή κλήσης για αναφορά λάθους****//
      function callAlertCorrection(clientID,gsID,lat,lng){
        var xmlhttp = initAJAX();
          if (xmlhttp) {
              var dt = new Date();  //αποφυγή caching σελίδας
              var url= "ajax/call_alert_correction.php?dev="+clientID+"&gsid="+gsID+"&lat="+lat+"&long="+lng+"&date="+dt;
              xmlhttp.open("GET",url,true);   // true - asynchronous call
              xmlhttp.send(null);
                // callback function
              xmlhttp.onreadystatechange=function() {
                  if(xmlhttp.readyState==4 && xmlhttp.status==200) {
                      alert("Η αναφορά λάθους απεστάλη και θα ελεγχθεί από το fuelGR στις επόμενες ώρες.");
                  } //if
              } //callback
          }
      }

        //****λιστα διόρθωσης****//
      function infowindowsCor(){
          var infowindowsCor=[];
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

      //***********Δημιουργία Marker διόρθωσης***//
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
      //***δηαγραφή marker διόρθωσης
      function deletePlaceMarker(){
          if(corMarker){
           corMarker.setMap(null);
           corMarker=null;
           $('#saveButton').prop('disabled', true);
           isDirty=false;
          }
      }
      //****κλείσιμο modal διόρθωσης****//
      function closeCorection(){
          if(isDirty){
            if(confirm("Επιστροφή χωρίς αποστολή διόρθωσης;")){
              isDirty=false; $('#saveButton').prop('disabled', true); $('.correction-brands').modal('hide');}else{}
              }else{ isDirty=false; $('#saveButton').prop('disabled', true); $('.correction-brands').modal('hide');}
      }

      //****κλήση για διόρθωση marker****//    
      function correctionBrand(){
        if(isDirty){
          $('#saveButton').prop('disabled', true);
          callCorrection(clientId,objstation.ownerId[placeOwner],corMarker.getPosition().lat(),corMarker.getPosition().lng()) 
        }
        isDirty=false; 
      }
      //****εφαρμογή κλήσης για διόρθωση marker****/ 
      function callCorrection(clientID,gsID,lat,lng){
        var xmlhttp = initAJAX();
          if (xmlhttp) {
              var dt = new Date();  //αποφυγή caching σελίδας
              var url= "ajax/call_correction.php?dev="+clientID+"&gsid="+gsID+"&lat="+lat+"&long="+lng+"&date="+dt;
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
      //*******Μετακινιη  πρατηριου με ιδιο ownerId και διαφορετικη βενζινη και με ιδιο lat & lng.*******//
      function movePosition(lat,lng,ownerId){
          if(objstation.ownerId.length){
            for (var i = objstation.ownerId.length; i >= 0; i--) {
              
              if (objstation.ownerId[i]==ownerId || (objstation.lat[i]==lat && objstation.lng[i]==lng && lat!=0)){                  
                       lat=objstation.lat[i]+0.00008;
                       lng=objstation.lng[i]+0.00016;
                      objstation.lat[i]=parseFloat(lat);
                       objstation.lng[i]=parseFloat(lng);
              }
            }
          }
           var position = new google.maps.LatLng(lat,lng);
          return position;
      }
         //*******Προβολη σε λιστα*******//
      function infowindowList(){   
          var  infowindowList=[];
          for (var i=0;i<objstation.ownerId.length;i++) {
              if(objstation.bool[i]==true){
              var satellite ='<img title="Τοποθεσία Πρατηρίου" src="img/info/Satellite-icon30.png"/>';
              }else{var satellite =' '; }
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
                    infowindowList[i]='<div id="'+objstation.ownerId[i]+'" class="infowindow-list" data-dismiss="modal" style="cursor: pointer;" onclick="zoomMarker('+objstation.ownerId[i]+','+objstation.lat[i]+')">'+ifo+'</div>';  
              }else{ infowindowList[i]='<div id="'+objstation.ownerId[i]+'" class="infowindow-list" >'+ifo+'</div>'; }
          }
          var x=document.getElementById("list");
          x.innerHTML=infowindowList.join("");
      }

 //*********Διαγραφή πινεζας(marker) και επαναφορα τιμων στης μεταβλητες*******//
      function deleteMarkers() {
          toggleAllMarkers(null);
          objstation = {
                          markers:[],lat:[],lng:[],position:[],accuracyCoordinate:[],coordinates:[],
                          ownerId:[],owner:[],priceColor:[],price:[],brand:[],brandId:[],fuelType:[],
                          fueltypeId:"",address:[],lastUpdate:[],infowintext:[],bool:[]
                        };
          sum_price=0,countZeroResult=0;
          maxPrice ={price:0,i:-1};
          minPrice = {price:100.000,i:-1};
          countZeroResult=0;
          bool=false;
          cnt="",dd="";
          $('.bs-example-modal-area').modal('hide');
          $('.bs-example-modal-fueltypes').modal('hide');
          $('.bs-example-modal-days').modal('hide');
          $('body').click(function (event) {
              var clickover = $(event.target);
              var _opened = $(".navbar-collapse").hasClass("collapse in");
              if (_opened === true && !clickover.hasClass("navbar-toggle")) { CloseNav(); }
          });
          document.getElementById('buttonlist').style.visibility='hidden';
          document.getElementById('minAverageMaxPrice').style.visibility = 'hidden';
          document.getElementById('messageArea').style.visibility = 'hidden';

          function CloseNav() {
              $(".navbar-collapse").stop().css({ 'height': '1px' }).removeClass('in').addClass("collapse");
              $(".navbar-toggle").stop().removeClass('collapsed');
          }
      }

       //*** με βάση το νομό, μαζεύει τους δήμους/κοινότητες 
      function ajax_getMunicipalities(countyId) {
        //αν έχει επιλεγεί η ψευδοεπιλογή, άδειασε τη δεύτερη λίστα  
        if (countyId==-1) {
          document.getElementById('municipalities').innerHTML="";
          return;
        }
        setCookie('countyId',countyId,cookieExpire);
        var xmlhttp = initAJAX();
        if (xmlhttp) {
            //------- αρχικοποίηση bussy indicator -----------
            //document.getElementById('map_canvas').innerHTML="<img src='spinner.gif' class='spinner'/>";
          var d = new Date();  //αποφυγή caching σελίδας
          var url= "ajax/get_municipalities.php?countyId="+countyId+"&foo="+d; 
          xmlhttp.open("GET",url,true);   // true - asynchronous call
          xmlhttp.send(null);
            // callback function
          xmlhttp.onreadystatechange=function() {
          if(xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.getElementById('combo2').innerHTML=xmlhttp.responseText;
        
          } //if
          } //callback
        } //if
      } //function

      //****Εφαρμογή κλήσης για ολα τα πρατήρια της περιοχής******//
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
                  var url = "ajax/IAD_proxy.php?dev="+clientId+"&m="+m+"&f="+f+"&b="+b+"&d="+d+"&lat="+curPosition.lat()+"&long="+curPosition.lng()+"&date="+dt;
              }else{ var url = "ajax/IAD_proxy.php?dev="+clientId+"&m="+m+"&f="+f+"&b="+b+"&d="+d+"&date="+dt; }
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
                            dd=xmlDoc.documentElement.attributes.getNamedItem("mun").value;
                            var ownerId=parseInt(gasStationElements[i].attributes.getNamedItem("id").value);
                            for (j=0;j<gasStationElements[i].childNodes.length;j++) {
                                if (gasStationElements[i].childNodes[j].nodeType!=3) {
                                   switch (gasStationElements[i].childNodes[j].nodeName) {
                                  case 'ac':
                                    objstation.accuracyCoordinate[k] = gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim();
                                    break;
                                  case 'lt':
                                    if(objstation.accuracyCoordinate[k]!="ZERO_RESULTS" && objstation.accuracyCoordinate[k]!="GEOMETRIC_CENTER"){
                                    lat = parseFloat(gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim());
                                    break;
                                    }
                                    else{lat=0; break; }
                                  case 'lg':
                                    if(objstation.accuracyCoordinate[k]!="ZERO_RESULTS" && objstation.accuracyCoordinate[k]!="GEOMETRIC_CENTER"){
                                      log = parseFloat(gasStationElements[i].childNodes[j].childNodes[0].nodeValue.trim());
                                      break;
                                    }
                                    else{log=0; break;}
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
                            sum_price+=objstation.price[k];
                            objstation.position[k] = movePosition(lat,log,ownerId);
                            objstation.ownerId[k]=ownerId;
                            objstation.lat[k]=lat;
                            objstation.lng[k]=log;
                          } //if(gasStationElements[i].nodeType!=3)
                      } //for(gasStationElements.length)
                      setColorPrice();
                      addMarker();
                      MoPrice();
                      toggleAllMarkers(map);
                      autoCenter();
                      document.getElementById('map_canvas').style.visibility = 'visible';
                      spinner.stop();
                    } //ifreadyState
                  } 
              } // onreadystatechange callback
            } //if xmlhttp
          }//if !municipalitesFromCookies
      } // function ajax_getGasStations

      //****Εφαρμογή κλήσης για όλες τις τιμές του πρατηρίου******//
      function callFullPriceStation(i){
        var listFullPrice=[];
        var xmlhttp = initAJAX();
        var headerOwner='<img src="img/logo2/'+objstation.brandId[i]+'.png" style="margin-right: 10px; float:left;"/>'+
                                '<span class="">'+objstation.owner[i]+'</span></br><span class="">'+objstation.address[i]+'</span>';
        if (xmlhttp) {
            var dt = new Date();  //αποφυγή caching σελίδας
            var url= 'ajax/full_price_station.php?gsid='+objstation.ownerId[i]+'&date='+dt;
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
     