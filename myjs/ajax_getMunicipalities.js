   // με βάση το νομό, μαζεύει τους δήμους/κοινότητες 
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
            var url= "get_municipalities.php?countyId="+countyId+"&foo="+d; 
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