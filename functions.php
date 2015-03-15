
 <script>
      //Cookies Varibles
      var municipalitesFromCookies;
      var daysFromCookies;
      var brandsFromCookies;
      var fueltypeFromCookies;
      var countyFromCookies;
      var cookieExpire = 30;
      var shell=3;// το id των πρατηριων shell 
      // object πρατηριου
      var objstation = {
                        markers:[],lat:[],lng:[],position:[],accuracyCoordinate:[],coordinates:[],
                        ownerId:[],owner:[],priceColor:[],
                        price:[],brand:[],brandId:[],
                        fuelType:[],fueltypeId:"",
                        address:[],lastUpdate:[],infowintext:[],infowindow:[],bool:[]
                      }

      var map = null;   //gives access to the map object
      var map2= null; 
      var map3= null;  //gives access to the map object
      var center= null;
      var placeOwner;
      var curPosition ;
      var panorama;
      var infowindow;
      var infowintext = [];
      var infowindowsCor = [];
      var listFullPrice=[];
      var markers=[];
      var markerClusterer;
      var GeoMarker;
      var curMarker;
      var corMarker;
      var bool=false;
      var isDirty=false;
      var boolLocation=false;
      var minPrice = {price:100.000,i:-1}
      var maxPrice ={price:0,i:-1};
      var sum_price=0;
      var moprice=0;
      var countZeroResult=0;
      var cnt="";
      var dd="";
      var clientId;
      var panoramaPos;

      function S4() {
          return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
 
     
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

      function mapOption2(){
        InfowindowsCor();   
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
       

      function mapOtions3(){
          var initCenter = new google.maps.LatLng(39.6315214,22.4464073); 
         var mapOptions3 = {
              mapTypeControl: true,
              zoom:8,
              scaleControl: true,
              mapTypeControlOptions: {
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
             //create the map3 object
             map3 = new google.maps.Map(document.getElementById("panorama"), mapOptions3);
            
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
       

      function toggleAllMarkers(mapHandler) {
          
              for(var i=0; i < objstation.markers.length; i++){
                if(objstation.bool){
                  objstation.markers[i].setMap(mapHandler);
                }
              }
              
         
      }

 </script>
