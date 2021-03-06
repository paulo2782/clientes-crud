<!doctype html>
<html lang="pt-br">
  <head>
      @include('bootstrap')
  </head>
  <body>
      @include('top')
  <form id="crud_client">
    <div class="container" style="margin-top:100px">
    <input 
        type="button" 
        value="Cliente" 
        class="btn btn-primary" 
        onclick="newClient()" 
        id="btnNewClient" 
        disabled
    />
    <input 
        type="button" 
        value="Dependentes"  
        class="btn btn-primary" 
        onclick="newDependent()" 
        id="btnNewDependent" 
    />
    <!-- CARD CADASTRO DO CLIENTE -->
    <div class="row">
    
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
            <div class="row">            
            <div class="col-lg-6">
                <input 
                    type="button" 
                    value="Novo" 
                    class="btn btn-primary form-control" 
                    id="btnCreateClient"
                />            
            </div>
            <div class="col-lg-6">
                <input 
                    type="button" 
                    value="Salvar" 
                    class="btn btn-primary form-control" 
                    id="btnSaveClient"
                />
            </div>
            <input type="hidden" id="actionClient" value="0">
            <input type="hidden" id="client_id">
            </div>
        </div>
        </div>
    </div>
  </form>

  <!-- CARD DEPENDENTES DO CLIENTE -->
  <form id="crud_dependent">
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
                    step="1"
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
            <div class="row">            
            <div class="col-lg-6">
                <input 
                    type="button" 
                    value="Novo" 
                    class="btn btn-primary form-control" 
                    id="btnCreateDependent"
                />            
            </div>
            <div class="col-lg-6">
                <input 
                    type="button" 
                    value="Salvar" 
                    class="btn btn-primary form-control" 
                    id="btnSaveDependent"
                />
            </div>
            <input type="hidden" id="actionDependent" value="0">
            <input type="hidden" id="dependent_id">
            
         </div>
        </div>
    </div>
    
    <!-- DIV DE MENSAGENS -->
    <div class="col-lg-12">
        <div 
            class="alert alert-danger" 
            role="alert" 
            id="message" 
            style="display:none;margin-top:-500px;text-align:center">
        </div>
    </div>    

    <div class="container" style="margin-top:30px">
        <h6 id="total">Total de Clientes:</h6>
        <div class="table-responsive form-control">
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
        </div>
    </div>

    <!-- MODAL VISUALIZAR DEPENDENTES -->

    <div class="modal fade" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
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
</div>
</div>
<!-- @include('footer')  -->
</body>
</html>
</form>

<script src="{{asset('js/jquery.mask.min.js')}}"></script>
<!-- Requisições API -->
<script src="{{asset('js/request.js')}}"></script>
<!-- Mascara dos campos -->
<script src="{{asset('js/maskField.js')}}"></script>

 


