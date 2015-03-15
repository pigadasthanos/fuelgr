
		<label>Επιλογή τύπου καυσίμου </label>
		  <select class="form-control" name="fuelType" id="fuelType" onChange="ajax_getGasStations(document.getElementById('municipalities').value,0,document.getElementById('fuelType').value,5);" >
		          <option value="1">Αμόλυβδη 9</option>
		          <option value="2">Αμόλυβδη 100</option>
		          <option value="3">Super</option>
		          <option value="4">Diesel Κίνησης</option>
		          <option value="5">Diesel Θέρμανσης</option>
		          <option value="6">Υγραέριο Κίνησης</option>
		          <option value="7">Diesel Θέρμανσης κατ'οίκον</option>
		  </select>
