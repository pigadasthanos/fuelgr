<div class="modal fade bs-example-modal-brands" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                <h4 class="modal-title" id="myModalLabel">Εταιρία </h4>
            </div>
            <div class="modal-body" style="padding-top: 30px;">
                <select class="selectpicker text-left"  name="brand[]" id="brand[]" data-actions-box="true" multiple="multiple" multiple data-selected-text-format="count>3" onChange="sendBrands(this)">
                <?php  
                    $cookiesBrands=split(",",$_COOKIE['brands']);
                   //  if($cookiesBrands[0]==0) {
                   //          $extra_attribute='selected="selected"';
                   //      }else{$extra_attribute='';}
             
                   // echo '<option class="" value="0" '.$extra_attribute.' > ΌΛΕΣ ΤΙΣ ΕΤΑΙΡΙΕΣ</option>';
                        $fuelcompsXML=simplexml_load_file("fuelcomps.xml");
                        $i=0;
                        $j=1;     
                       foreach($fuelcompsXML->RECORD as $brand){
                            if($brand->fuelCompID==$cookiesBrands[$i] || $cookiesBrands[0]==0){
                                $extra_attribute='selected="selected"';
                                $i=$i+1;
                            }else{$extra_attribute='';}
                            echo '<option value="'.$brand->fuelCompID.'" '.$extra_attribute.' data-content="<img style=\'width:20px; margin-left:20px; margin-right: 5px;\' src=\'img/logo/'.$j.'.png\'/></span><span style=\'\'>'.$brand->fuelCompName.'</span>" ></option>';
                            $j+=1;
                       }    
                        echo '</select>';
                ?>
            </div>
            <div class="modal-footer" style="text-align: center;">
                <span class="glyphicon glyphicon-hand-up"></span> Επιλέξτε εταιρεία καυσίμων
            </div>
        </div>
    </div>
</div><!-- Τελος Κουμπί Εταιρία -->

<script>
        function sendBrands(brand) {
            var values = [], i, j, cur;
            for (i = 0, j = brand.options.length; i < j; i++) {
                cur = brand.options[i];
                if (cur.selected) {values.push(encodeURIComponent(cur.value));}
            }
            if (values.length>=1 && values.length<j ){
                ajax_getGasStations(municipalitesFromCookies,values,fueltypeFromCookies,daysFromCookies);
            }
            else{
                if(!values.length){

                }else{
                    values = [0];  
                    ajax_getGasStations(municipalitesFromCookies,values,fueltypeFromCookies,daysFromCookies);
                }
            }
        }
</script>