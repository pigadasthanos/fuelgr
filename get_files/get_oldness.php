       

        <div class="modal fade bs-example-modal-days" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                        <h4 class="modal-title" id="myModalLabel">Παλαιότητα </h4>
                    </div>
                    <div class="modal-body" style="text-align:center;  padding-top: 30px;">
                        <div class="combo2">
                            <?php
                                    if(!isset($_COOKIE['days'])){
                                        $cookiesDays=5;
                                    }else{
                                    $cookiesDays=$_COOKIE['days'];
                                    }
                                    echo '<select class="form-control" name="days" id="days" onChange="ajax_getGasStations(municipalitesFromCookies,brandsFromCookies,fueltypeFromCookies,document.getElementById(\'days\').value,countyFromCookies); ">';
                                    if(!isset($cookiesDays)) {
                                            $extra_attribute='selected="selected"';
                                    }else{ 
                                            $extra_attribute='';
                                    }
                                    echo '<option value="1" '.$extra_attribute.'>Καταχωρημένες χθές-σήμερα</option>';
                                    for ($i=2; $i <8 ; $i++) {
                                        if ($cookiesDays==$i) {
                                           $extra_attribute='selected="selected"';
                                        }else{ 
                                            $extra_attribute='';
                                        }
                                        echo '<option value="'.($i).'" '.$extra_attribute.'>Τιμές έως '.($i).' ημέρες παλιές</option>';
                                    }
                                    if($cookiesDays==15){
                                            $extra_attribute='selected="selected"';
                                    }else{ 
                                            $extra_attribute='';
                                    }echo '<option value="15" '.$extra_attribute.'>Τιμές έως 15 ημέρες παλιές</option>';
                                    if($cookiesDays>=16){
                                            $extra_attribute='selected="selected"';
                                    }else{ 
                                            $extra_attribute='';
                                    }
                                    echo '<option value="30" '.$extra_attribute.'>Τιμές έως 30 ημέρες παλιές</option>';

                                    echo '</select>';
                           ?>
                        </div>
                    </div>
                    <div class="modal-footer" style="text-align: center;">
                        <span class="glyphicon glyphicon-hand-up"></span> Επιλέξτε την παλαιότητα των τιμών καυσίμου.
                    </div>
                </div>
            </div>
        </div><!-- Τελος Κουμπί Παλαιότητα -->