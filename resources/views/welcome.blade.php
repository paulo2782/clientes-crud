<!doctype html>
<html lang="pt-br">
  <head>
    <title>Electra CRUD</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>


  </head>
  <body>
  <form id="crud_client">
    <nav class="nav justify-content-center bg-dark" style="color:white;padding:10px">
            <label>ELECTRA - CRUD</crud>
    </nav>    
    <div class="container" style="margin-top:80px">
    <!-- CARD CADASTRO DO CLIENTE -->
    <div class="row">
        <div class="col-lg-12">
            <!-- DIV DE MENSAGENS -->
            <div 
                class="alert alert-danger" 
                role="alert" 
                id="message" 
                style="display:none;position:fixed;margin-top:-70px">
            </div>
        </div>

        <div class="col-lg-12 cardNewClient">
        <div class="card">
           <div class="card-body">
                <h5 id="titleCardClient">Cadastro de Cliente</h5>
                Nome:
                <input 
                    type="text" 
                    id="nameClient" 
                    name="name"
                    class="form-control" 
                    placeholder="Nome do Cliente" 
                    autocomplete="off"
                />
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="radio" id="radio1" checked>
                    <label class="form-check-label">
                        Pessoa Física
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="radio" id="radio2" >
                    <label class="form-check-label">
                        Pessoa Jurídica
                    </label>
                </div>

                <label id="lbl_cpf_cnpj"> CPF </label>

                <input 
                    type="text" 
                    name="cpf_cnpj" 
                    id="cpf_cnpj" 
                    class="form-control" 
                    autocomplete="off" 
                    maxlength="18"
                />
                CEP:
                <input 
                    type="text" 
                    name="cep" 
                    id="cep" 
                    class="form-control" 
                    placeholder="CEP" 
                    autocomplete="off"
                />
                Endereço:
                <input 
                    type="text" 
                    name="address" 
                    id="address" 
                    class="form-control" 
                    placeholder="Endereço do Cliente" 
                    autocomplete="off"
                />
            </div>
            <input type="button" value="Salvar" class="btn btn-primary" id="btnSaveClient">
        </div>
        </div>
    </div>
  </form>

  <form id="crud_dependent" >
    <!-- CARD DEPENDENTES DO CLIENTE -->
    <div class="row">
        <div class="col-lg-12 cardNewDependent" style="display:none">
        <div class="card">
           <div class="card-body">
                <h5 id="titleCardDependent"></h5>
                <label class="form-label">Nome cliente:</label>
                <select class="form-control" name="clients_id" id="clients_id">
                </select>

                Nome:
                <input 
                    type="text" 
                    id="nameDependent" 
                    name="name"
                    class="form-control" 
                    placeholder="Nome do Dependente" 
                    autocomplete="off"
                />

                <label id="lbl_cpf_cnpj"> Idade: </label>

                <input 
                    type="number" 
                    name="age" 
                    id="age" 
                    class="form-control" 
                    min="0"
                    maxlength="3"
                />
                Data nascimento:
                <input 
                    type="date" 
                    name="date_birth" 
                    id="date_birth" 
                    class="form-control" 
                />
            </div>
            <input type="button" value="Salvar" class="btn btn-primary" id="btnSaveDependent">
        </div>

        </div>
    </div>
    <br>

    <input type="button" value="Novo Cliente" class="btn btn-primary" onclick="newClient()">
    <input type="button" value="Dependentes"  class="btn btn-warning" onclick="newDependent()">

    <table class="table table-bordered">
        <tr>
            <th>NOME</th>
            <th>CPF / CNPJ</th>
            <th>ENDEREÇO</th>
            <th>CEP</th>
            
        </tr>
    <tbody id="data_client">
    </tbody>
    </table>

    <!-- MODAL VISUALIZAR DEPENDENTES -->

    <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                    <div class="modal-header">
                            <h6 class="modal-title" id="titleModal"></h6>

                        </div>
                <div class="modal-body">
                    <div class="container-fluid" id="listDependents">
                        
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                </div>
            </div>
        </div>
    </div>
    


    <script>
        var modelId = document.getElementById('modelId');
    
        modelId.addEventListener('show.bs.modal', function (event) {
              // Button that triggered the modal
              let button = event.relatedTarget;
              // Extract info from data-bs-* attributes
              let recipient = button.getAttribute('data-bs-whatever');
    
            // Use above variables to manipulate the DOM
        });
    </script>
    
  </body>
</html>
</form>

<script src="{{asset('js/jquery.mask.min.js')}}"></script>
<!-- Requisições API -->
<script src="{{asset('js/crud.js')}}"></script>

<script>
$(function() {
    allClient();
    $('#cpf_cnpj').mask('999.999.999-99')
    $('#cep').mask('99.999-999')
    $('#radio1').change(function(e){
        $('#lbl_cpf_cnpj').html('CPF')
        $('#cpf_cnpj').val('')
        $('#cpf_cnpj').mask('999.999.999-99')
    })
    $('#radio2').change(function(e){
        $('#lbl_cpf_cnpj').html('CNPJ')
        $('#cpf_cnpj').val('')
        $('#cpf_cnpj').mask('99.999.999/9999-99')
    })
})    
</script>


