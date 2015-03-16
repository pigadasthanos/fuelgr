
 <ul class="navbar-nav nav l2">
    <li class="l4 l1" >
      	<a class="buttons" tabindex="1" title="Σχετικά με το fuelGr" data-toggle="modal" data-target=".bs-example-modal-about">
              <span class="myglyphicon glyphicon glyphicon-info-sign"></span><br>
          <span id="area">Πληροφορίες</span></a>
    </li>
    <li class="" >
       <div id="memorandum">
        <!-- <h4 style="margin: -5px 0 -13px; text-align:center; font-weight: 800;">Υπόμνημα</h4><hr style=" width: 90%;"> -->
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right"><img src="img/info/min.png"/></div><div class="col-xs-9" style="line-height:115%;">Τιμή χαμηλότερη του μέσο όρο της περιοχής</div></div>
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right"><img src="img/info/mo.png"/></div><div class="col-xs-9" style="line-height:115%;">Τιμή κοντά στον μέσο όρο της περιοχής</div></div>
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right"><img src="img/info/max.png"/></div><div class="col-xs-9" style="line-height:115%;">Τιμή υψηλότερη του μέσο όρο της περιοχής</div></div>
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right" style="padding: 0px 8px;"><img style="height:25px;" src="img/euro30.png"/></div><div class="col-xs-9" style="line-height:115%;">Το φνηνότερο πρατήριο της περιοχής</div></div>
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right" style="padding: 0px 12px;"><img style="height:30px;" src="img/info/drop.png"/></div><div class="col-xs-9" style="line-height:115%;">Όλες οι τιμές καυσίμου του πρατηρίου</div></div>
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right" style="padding: 0px 14px;"><img style="height:30px;" src="img/info/street-view45.png"/></div><div class="col-xs-9" style="line-height:115%;">Εικόνα πρατηρίου απο StreetView</div></div>
              <div class="row" style="margin: 4px 0;"><div class="col-xs-3 text-right" style="padding: 0px 8px;"><img style="height:30px;" src="img/info/satellite-icon30.png"/></div><div class="col-xs-9" style="line-height:115%;">Το πρατήριο έχει θέση στον χάρτη</div></div></br>
      </div>
        <a class="buttons" id="pop1" tabindex="1" title="Υπόμνημα" data-container="body" data-animation="true" data-toggle="popover" data-trigger="focus" data-content="">
              <span class="myglyphicon glyphicon glyphicon-question-sign"></span><br>
          <span id="area">Υπόμνημα</span></a>
    </li>
    <li class="dropdown l1" >
        <a class="dropdown-toggle buttons" data-toggle="dropdown" title="Επιλογή Ζουμ">
           <span class="myglyphicon glyphicon glyphicon-search" ></span></br><span id="area">Zoom</span></a>
        <ul id="navbar" class="dropdown-menu" role="menu">
           	<li ><a role="menuitem" tabindex="-1" href="#" onclick="zoomMyLocation();" >Zoom στη θέση μου</a></li>
            <li ><a role="menuitem" tabindex="-1" href="#"  onclick="autoCenter();">Zoom στα πρατήρια</a></li>
        </ul>
    </li>
    <li id="buttonlist" class="" >
                     <a class="buttons" data-toggle="modal" data-target=".bs-example-modal-list" title="Λίστα Πρατηρίων" onclick="infowindowList()">
                        <span class="myglyphicon glyphicon glyphicon-th-list"></span>
                        <br><span id="area">Λίστα Πρατηρίων</a>
    </li>                    
 </ul>

 <script type="text/javascript">
      // $(document).ready(function(){
      //     $('#pop').popover({
      //         placement : 'top'
      //     });
      // });
       $(document).ready(function(){
      $("#pop").click(function(){
        $("#infoArea").slideToggle("slow");
      });
    });
       $(document).ready(function(){
      $("#pop1").click(function(){
        $("#memorandum").slideToggle("slow");
      });
    });
</script>  