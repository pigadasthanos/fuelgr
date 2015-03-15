     //*********Διαγραφή πινεζας(marker) και επαναφορα τιμων στης μεταβλητες*******//
function deleteMarkers() {
        
         if (markerClusterer) {
          markerClusterer.clearMarkers();
        }
        toggleAllMarkers(null);
        objstation = {
                        markers:[],lat:[],lng:[],position:[],accuracyCoordinate:[],coordinates:[],
                        ownerId:[],owner:[],priceColor:[],price:[],brand:[],brandId:[],fuelType:[],
                        fueltypeId:"",address:[],lastUpdate:[],infowintext:[],infowindow:[],bool:[]
                      };
        center= null;
        map2=null;
        markers=[];
        corMarker;
        sum_price=0;
        maxPrice ={price:0,i:-1};
        minPrice = {price:100.000,i:-1};
        moprice=0;
        countZeroResult=0;
		bool=false;
        cnt="";
        dd="";
        infowindowsCor=[];
        listFullPrice=[];
        $('.bs-example-modal-area').modal('hide');
        $('.bs-example-modal-fueltypes').modal('hide');
        $('.bs-example-modal-days').modal('hide');
        $('body').click(function (event) {
            var clickover = $(event.target);
            var _opened = $(".navbar-collapse").hasClass("collapse in");
            if (_opened === true && !clickover.hasClass("navbar-toggle")) {
                CloseNav();
            }
        });
        document.getElementById('buttonlist').style.visibility='hidden';
        document.getElementById('minAverageMaxPrice').style.visibility = 'hidden';
        document.getElementById('messageArea').style.visibility = 'hidden';
}

 function CloseNav() {
                          $(".navbar-collapse").stop().css({ 'height': '1px' }).removeClass('in').addClass("collapse");
                          $(".navbar-toggle").stop().removeClass('collapsed');
      }

function clearClusters(e) {
        e.preventDefault();
        e.stopPropagation();
        markerClusterer.clearMarkers();
}