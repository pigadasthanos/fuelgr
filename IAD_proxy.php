<?php
	// Call to bring stations depending on the region
	// link_with_lat
	// link_with_not_lat
	header("Content-type: text/xml; charset=utf-8");
	if(isset($_GET['lat'])){
		echo file_get_contents('link_with_lat');
	}
	else{
		echo file_get_contents('link_with_not_lat');
	}
?>