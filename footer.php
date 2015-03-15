  <nav class="navbar navbar-inverse navbar-fixed-bottom" role="navigation"><!-- navbar -->
      <div class="container-fluid"><!-- container-fluid -->
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
             <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                  <span class="sr-only">Toggle navigation</span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="http://fuelgr.deixto.com/" title="fuelGr"><img src="img/app logo/fuelGR-32.png"/></a> 
              <?php include('shared/zoomButton.php'); ?><!-- Κουμπί zoom-->

                 
              
          </div>
         
          <!-- Collect the nav links, forms, and other content for toggling -->
          <div class="navbar-collapse collapse" >
            <ul class="navbar-nav nav navbar-right">
                  <li class="">
                      <a class="buttons" data-toggle="modal" data-target=".bs-example-modal-area" title="Περιοχή" >
                        <span class="myglyphicon glyphicon glyphicon-globe"></span><br><span >Περιοχή</span>
                      </a>
                  </li>
                  <li class="">
                  <a class="buttons" data-toggle="modal" data-target=".bs-example-modal-fueltypes" title="Καύσιμο">
                    <span class="myglyphicon glyphicon glyphicon-tint"></span><br>Καύσιμο
                  </a>
                  </li>
                  <li class="">
                  <a class="buttons" data-toggle="modal" data-target=".bs-example-modal-brands" title="Εταιρία"><span class="myglyphicon glyphicon glyphicon-tags"></span><br>Εταιρία</a>
                  </li>
                  <li class="">
                  <a class="buttons" data-toggle="modal" data-target=".bs-example-modal-days" title="Παλαιότητα"><span class="myglyphicon glyphicon glyphicon-calendar"></span><br>Παλαιότητα</a>
                </li>
            </ul> 
          </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
  </nav><!-- /.navbar -->

