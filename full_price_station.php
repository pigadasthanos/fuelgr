<?php 
	// link_gasstation_prices
	header("Content-type: text/xml; charset=utf-8");
	
		echo file_get_contents('link_gasstation_prices');
	
?>