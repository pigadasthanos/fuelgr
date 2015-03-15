  //*****Υπολογισμός μέσου όρου τιμής και απεικόνιση στο <div>*******//
      function MoPrice() {
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
            mo_price=sum_price/objstation.price.length;
            moprice=parseFloat(mo_price).toFixed(3);
            document.getElementById('minAverageMaxPrice').innerHTML='<div class="row minAverageMaxPrice collapse in">'+
                                                                    '<div class="imgBand" style=" margin-right:5px;"><img id="img" style=" padding:2px 0;" src="img/app logo/fuelGR-32.png"> '+objstation.ownerId.length+'</div>'+
                                                                    '<div class=" price_red" style="margin-right:10px;">max&nbsp'+maxPrice.price.toFixed(3)+'&euro;</div>'+
                                                                    '<div class="price_blue" style=" margin-right:10px;">MO&nbsp'+moprice+'&euro;</div>'+
                                                                    '<div class="price_green" style=" margin-right:5x;">min&nbsp'+minPrice.price.toFixed(3)+'&euro;</div>'+
                                                                    
                                                                    
                                                                '</div><button class="btn-default" data-toggle="collapse" data-target=".minAverageMaxPrice"><span class="glyphicon glyphicon-chevron-up"></span></button>';
                                                               
            if(countZeroResult==0){
              document.getElementById('messageArea').style.visibility = 'hidden';
            } else{ 
                document.getElementById('messageArea').style.visibility = 'visible';
                document.getElementById('messageArea').innerHTML='<div class="collapse in" id="collapseCor"><button class="btn-default size" style="background-color:#F68300; border-color: #F68300; color: #303030;"  data-toggle="modal" data-target=".correction-brands" onclick="mapOption2()">'+
                    +countZeroResult+' επιπλέον πρατήρι'+character+'</br>χωρίς θέση στο χάρτη</button></div><button class="btn-default size" style="background-color:#F68300; border-color: #F68300; color: #303030;" type="button" data-toggle="collapse" data-target="#collapseCor" title="επιπλέον πρατήρι'+character+'χωρίς θέση στο χάρτη">'+
                         '<span class="size glyphicon glyphicon-collapse-down"></span></button>';
            }
        
      }
  

        
 