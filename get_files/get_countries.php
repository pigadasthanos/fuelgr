<?php 


    function load_options ($selected){
      	$countriesXml = 'xml/counties.xml';

      	if(file_exists($countriesXml)){
      		$xmlData = simplexml_load_file($countriesXml);
      		//print_r($xmlData);
      	}else{
      		exit('Faild to open data.xml');
      	}
        if($_COOKIE['countyId']!=0 && $_COOKIE['municipalities']!=0){
          $selected=$_COOKIE['countyId'];
        }
      	if ($selected == -1){ 
          	$extra_attribute='selected="selected"';
        	}else{ 
        		$extra_attribute='';
          }
        //Γράφουμε τον HTML κώδικα της ψευδοεπιλογής
        echo '<option value="-1" '.$extra_attribute.'>-- Επιλέξτε Νομό --</option>';

        if($_COOKIE['countyId']==0){
          $selected=$_COOKIE['countyId'];
        }
        //Τώρα θα φτιάξουμε τα <options> που αντιστοιχούν στις
        //εγγραφές του πίνακα (ή view) $table (παράμετρος της συνάρτησης)

        foreach ($xmlData->RECORD as $counties) {
          	if ($counties->countyID==$selected){
          		$extra_attribute=' selected="selected"';
          	}      
              
            else {
            	$extra_attribute='';
            }
            //και τελικά γράφουμε το <option>
            echo '<option value="'.$counties->countyID.'"' .$extra_attribute.'>'.$counties->countyName.'</option>';
            echo '\r\n';
        

    	   }
    }
?>