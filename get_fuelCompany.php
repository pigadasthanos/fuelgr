<?php 


  function loadCompany (){
  	$fuelcompsXml = 'fuelcomps.xml';

  	if(file_exists($countriesXml)){
  		$xmlData = simplexml_load_file($fuelcompsXml);
  		//print_r($xmlData);
  	}else{
  		exit('Faild to open data.xml');
  	}

  	// if ($selected == -1) 
   //    	$extra_attribute='selected="selected"';
   //  	else 
   //  		$extra_attribute='';
   //  //Γράφουμε τον HTML κώδικα της ψευδοεπιλογής
   //  echo '<option value="-1" '.$extra_attribute.'>-- Επιλέξτε Νομό --</option>';


   //  //Τώρα θα φτιάξουμε τα <options> που αντιστοιχούν στις
   //  //εγγραφές του πίνακα (ή view) $table (παράμετρος της συνάρτησης)
    $extra_attribute='selected';
    echo '<select class="form-control input-lg" id="fuelCompany" name="fuelCompany" onChange="">';
    foreach ($xmlData->RECORD as $fuelcomps) {
    	
        
        //και τελικά γράφουμε το <option>
        // echo '<input type="checkbox" value="'.$fuelcomps->fuelCompID.'"'.$extra_attribute.'>'.$fuelcomps->fuelCompName.'</input>';
        
        echo '<option value="'.$fuelcomps->fuelCompID.'"'.$extra_attribute.'>'.$fuelcomps->fuelCompName.'</option>'."\r\n";
  	}
    echo '</select>';
      
  }
?>