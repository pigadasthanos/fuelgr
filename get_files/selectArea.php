    <div class="modal fade bs-example-modal-area"  tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content" >
          <?php include('get_files/get_countries.php'); ?>
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><span class="glyphicon glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
            <h4 class="modal-title" id="myModalLabel">Επιλέξτε Περιοχή</h4>
          </div>
          <div class="modal-body" style="text-align: center;">
            <form>
              <table>
                <tr>
                  <td><label>Επιλογή Νομού</label>
                       <select class="form-control" id="counties" name="counties" onChange="ajax_getMunicipalities(document.getElementById('counties').value);">
                       <?php load_options(-1); ?>
                       </select>
                  </td>
                </tr><br/>
                <tr>
                  <td id="combo2">
                       <!-- <select class="form-control input-lg" id="municipalities" name="municipalities"></select> -->
                  </td>
                </tr>
              </table>
            </form>
           
          </div>
          <div class="modal-footer" style="text-align: center;">
             <span class="glyphicon glyphicon-hand-up"></span> Επιλέξτε περιοχή
          </div>
        </div>
      </div>
    </div>