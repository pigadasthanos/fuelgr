<?php
	//link_correction: Call to server for position correction station

	header("Content-type: text/xml; charset=utf-8");
	
		echo file_get_contents('link_correction');
	
?>


