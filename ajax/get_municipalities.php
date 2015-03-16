<?php

	$municipalitiesXml='../xml/municipalities.xml';

	if(file_exists($municipalitiesXml)){
		$xmlData = simplexml_load_file($municipalitiesXml);
			//print_r($xmlData);
		}else{
			exit('Faild to open municipalities.xml');
		}

	

	
		$countyId = $_GET['countyId'];
	 	$municipalityId=$_COOKIE['municipalities'];
	echo '</br><label>Επιλέξτε Δήμο</label>';
	echo '<select class="form-control" id="municipalities" name="municipalities"  onChange=" ajax_getGasStations(document.getElementById(\'municipalities\').value,brandsFromCookies,fueltypeFromCookies,daysFromCookies,countyFromCookies);">';
	echo '<option value="0">-- Επιλέξτε Δήμο/Κοινότητα --</option>'.'\r\n';

	foreach ($xmlData->RECORD as $municipalities) {
	 	# code...
	 		if ($municipalities->countyID==$countyId) {
	 				
	 			if ($municipalities->municipalityID==$municipalityId) {
	 				
	 				$extra_attribute=' selected="selected"';
	 			}else{
	 				$extra_attribute='';
	 			}
	 			//για κάθε record αποτελέσματοσ κάνε το ακόλουθο
			     echo '<option value="'.$municipalities->municipalityID.'" '.$extra_attribute.' >'.$municipalities->municipalityName.'</option>'.'\r\n';
	  			}      	
	}
	echo '</select>';
?>