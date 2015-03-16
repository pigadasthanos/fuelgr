<?php
	//link_correction: Call to server for position correction station

	header("Content-type: text/xml; charset=utf-8");
	
		echo file_get_contents('https://deixto.gr/fuel/correction.php?dev='.$_GET['dev'].'&id='.$_GET['gsid'].'&lat='.$_GET['lat'].'&long='.$_GET['long'].'&date='.$_GET['date'].'');
	
?>