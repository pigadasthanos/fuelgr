<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />    
    <meta name="viewport" content="width=device-width, initial-scale=1">
<!--     <link href="css/bootstrap.min.css" rel="stylesheet" type="text/css"> -->
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css">
    <link href="css/fuelGr.css" rel="stylesheet" type="text/css">
    <link href="css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href="css/social-buttons-3.css" rel="stylesheet" type="text/css">
    <link rel="icon" type="image/png" href="img/app logo/fuelGR-16.png"/> <!-- =====favIcon=== -->
    <!-- Bootstrap -->

    <title>fuelGr - Πρατήρια Καυσίμων</title>

  </head>

  <body>

  
      <?php include('header.php'); ?>
      <div id="container">
        <div id="containerMap"> <!-- container -->
            <div id="cookiesAlert" class="alert alert-info alert-dismissible" role="alert">
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span class="glyphicon glyphicon-remove-circle"></span></button>
                Τα cookie μάς βοηθούν να σας παρέχουμε τις υπηρεσίες μας. Εφόσον χρησιμοποιείτε τις υπηρεσίες μας, συμφωνείτε με τη χρήση των cookie από εμάς.
            </div>
            <div id="map_canvas"></div><!-- /map-canvas -->
            <div id="spinner" class="spinner" ></div>     
            <div id="messageArea"></div>
            <div id="win"></div>
            <div class="logoArea"><img src="img/powered-by-deixto-for-light-background-black.png" /></div>
            <div id="minAverageMaxPrice"></div>
            
            <?php include('shared/allFuelPrices.php'); ?>
            <?php include('shared/correction_brands.php'); ?><!-- Κουμπί Διορθωσης Βενζινάδικου-->
            <?php include('get_files/selectArea.php'); ?><!-- Κουμπί Επιλογή Περιοχής -->
            <?php include('get_files/get_fuel_types.php'); ?><!-- Κουμπί Τύπου καυσίμου -->
            <?php include('get_files/get_brands.php'); ?><!-- Κουμπί Εταιρία -->
            <?php include('get_files/get_oldness.php'); ?> <!-- Κουμπί Παλαιότητα -->
            <?php include('shared/stationList.php'); ?><!-- Κουμπί Λίστα Πρατηρίων --> 
            <?php include('about/about.php'); ?><!-- Κουμπί Λίστα Πρατηρίων -->   
            <?php include('about/disclaimer.php'); ?><!-- Κουμπί Αποποίηση Ευθυνών -->     
        </div> <!-- /containerMap -->
        <?php include('footer.php'); ?><!-- Navbar -->
      </div><!-- /container -->
    </body><!-- /body -->
</html>