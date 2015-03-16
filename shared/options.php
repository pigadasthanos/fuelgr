
 <ul class="navbar-nav nav l2">
    <li class="l4 l1" >
      <div id="infoArea">
        
              <!-- <h4 style="margin: -10px 0 -15px; text-align:center; font-weight: 800;">Συντελεστές</h4><hr> -->
              <div class="row" style="margin:2px;">
                  <div class="col-xs-6"><img src="img/app logo/fuelGR-128.png"/></div>
                  <div class="col-xs-6"><img src="img/powered-by-deixto-for-light-background72.png"/></div>
              </div>
              <div class="row" style="margin:2px;">
                <div class="text-right" style="float:left; width:70px;">Σχεδίαση:</div>
                <div class="text-left" style="float:right; width:140px;"> Πηγαδάς Αθανάσιος <a href="http://www.researchgate.net/profile/Fotis_Kokkoras">Κόκκορας Φώτης</a></div>
              </div>
              <div class="row" style="margin:2px;">
                <div class="text-right" style="float:left; width:70px;">Υλοποίηση:</div>
                <div class="text-left" style="float:right; width:140px;"> Πηγαδάς Αθανάσιος</div>
              </div>
              <div class="row" style="margin:2px;">
                <div class="text-right" style="float:left; width:70px;">Δεδομένα:</div>
                <div class="text-left" style="float:right; width:140px;">DEiXTo team <a href="http://deixto.com/">(http://deixto.com/)</a> fuelGR API</div>
              </div>
              <div class="row" style="margin:2px;">
                <div><a href="http://sakelab.teilar.gr/">SAKE Lab</a>-<a href="http://www.cs.teilar.gr/CS/Home.jsp">Τμ. Μηχ.Πληροφορικής</a>–<a href="http://www.teilar.gr/">ΤΕΙ Θεσσαλίας</a></div>
              </div>
              <div class="row">
                      <div class="col-xs-4 col-xs-offset-2"><a class="btn btn-twitter" href="https://twitter.com/fuelgr" style="width:30px; height:30px;"><em class="fa fa-twitter"></em></a></div>
                      <div class="col-xs-4"><a class="btn btn-facebook" href="https://www.facebook.com/fuelgr" style="width:30px; height:30px;"><em class="fa fa-facebook"></em></a></div>
              </div>
              <div class="row" style="margin:2px;">
                <button class="btn btn-default" data-toggle="modal" data-target=".bs-example-modal-disclaimer" title="Αποποίηση Ευθυνών">Αποποίηση Ευθυνών</button>
              </div>
      </div>
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