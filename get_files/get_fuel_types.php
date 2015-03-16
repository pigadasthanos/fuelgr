  

      <div class="modal fade bs-example-modal-fueltypes" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
              <h4 class="modal-title" id="myModalLabel">Καύσιμα </h4>
            </div>
            <div class="modal-body" style="text-align:center; padding-top: 30px;">
                <div class="combo2">
                    <?php

                        $fueltypes=array("Αμόλυβδη 95","Αμόλυβδη 100","Super","Diesel Κίνησης","Diesel Θέρμανσης","Υγραέριο Κίνησης","Diesel Θέρμανσης κατ\'οίκον");
                        if(!isset($_COOKIE['fueltypes'])){
                          $cookiesFueltypes=1;
                        }else{
                            $cookiesFueltypes=$_COOKIE['fueltypes'];
                        } 
                        echo'<label>Επιλογή τύπου καυσίμου </label>';
                        echo '<select class="form-control" name="fuelType1" id="fuelType1" onChange="ajax_getGasStations(municipalitesFromCookies,brandsFromCookies,document.getElementById(\'fuelType1\').value,daysFromCookies,countyFromCookies);" >';
                       
                        for ($i=1; $i <8 ; $i++) {
                            if ($cookiesFueltypes==$i) {
                               $extra_attribute='selected="selected"';
                            }else{ 
                                $extra_attribute='';
                            }
                            echo '<option value="'.($i).'" '.$extra_attribute.' >'.$fueltypes[$i-1].'</option>';  
                        }
                        echo '</select>';
                        ?>
                </div>

            </div>
            <div class="modal-footer" style="text-align: center;">
            <span class="glyphicon glyphicon-hand-up"></span> Επιλέξτε τύπο καυσίμου
            </div>
          </div>
        </div>
      </div>