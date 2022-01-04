<!doctype html>
<html lang="pt-br">
  <head>
    <title>Title</title>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  </head>
  <body>
    <!-- Bootstrap JavaScript Libraries -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>

    <!-- Requisições API -->
    <script src="{{asset('js/crud.js')}}"></script>

    <nav class="nav justify-content-center bg-default">
      <a class="nav-link active" href="#">ELECTRA - CRUD</a>
      <a class="nav-link" href="#">Clientes</a>
    </nav>    

    <div class="container">
        <div class="row">
        <div class="col-lg-12 cardNewClient" style="display:none">
        <div class="card">
           <div class="card-body">
                Nome:
                <input type="text" id="name" class="form-control" placeholder="Nome do Cliente" autocomplete="off">
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
                <input type="text" id="cpf_cnpj" class="form-control" autocomplete="off" maxlength="18">
                CEP:
                <input type="text" id="cep" class="form-control" placeholder="CEP" autocomplete="off">
                Endereço:
                <input type="text" id="address" class="form-control" placeholder="Endereço do Cliente" autocomplete="off">
            </div>
            <input type="button" value="Salvar" class="btn btn-primary" onclick="saveClient()">
        </div>

        </div>
        </div>
        <br>
        <input type="button" value="Novo Cliente" class="btn btn-primary" onclick="newClient()">
        <table class="table table-bordered">
            <tr>
                <th>NOME</th>
                <th>CPF_CNPJ</th>
                <th>ENDEREÇO</th>
                <th>CEP</th>
                <th></th>
                <th></th>
            </tr>
        <tbody id="data_client">
        
        </tbody>
    </table>
  </body>
</html>

<script src="{{asset('js/jquery.mask.min.js')}}"></script>
<script>
allClient();
$('#cpf_cnpj').mask('999.999.999-99')
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
</script>


