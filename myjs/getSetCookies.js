 function setCookies(municipalityID,brand,fuelType,days){
          // setCookie('countyId',countyId,cookieExpire);
          setCookie('municipalities',municipalityID,cookieExpire);
          setCookie('brands',brand,cookieExpire);
          setCookie('fueltypes',fuelType,cookieExpire);
          setCookie('days',days,cookieExpire);
 }


//*******Ελεγχος αν υπαρχουν cookies και περασμα των τιμων τους**********//
 function getCookies(){
            //****** δημιουργία deviceId αν δεν υπαρχει;
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
          // if(!getCookie('countyId')){
          //     countyFromCookies = getCookie('countyId');
              
          // }

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
          } 

          //--endif
}//**********Τελος function getCookies*******//