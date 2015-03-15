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
              if (countZeroResult != 0) {
                  alert("Υπάρχουν πρατήρια αλλά δεν έχουν θέση στο χάρτη παρακαλώ αν γνωρίζετε την τοποθεσίας τους τοποθετήστε τα κάνοντας κλικ  στο κουμπί με τα πρατήρια χωρίς θέση στο χάρτη.");
              } else {
                  alert("Δεν υπάρχουν πρατήρια καυσίμων παρακαλώ κάντε νέα αναζήτηση.");
              }
              zoomMyLocation();
          }
           $('.correction-brands').on('shown.bs.modal', function () {
              google.maps.event.trigger(map2, "resize");
              map2.fitBounds(bounds);
              map2.setZoom(zoomOverride);
          });
         this.center= map.getCenter();         
      }