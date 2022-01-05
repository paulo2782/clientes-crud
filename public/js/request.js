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

// CLIENTES
// Todos Clientes
allClient = () => {
    $('#data_client').empty()
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8000/api/allClient",
        success: function (response) {
            
             response.forEach(i => {
                $('#data_client').append(
                    '<tr>'+
                    '<td>'+i.name+'</td>'+
                    '<td>'+i.cpf_cnpj+'</td>'+
                    '<td>'+i.address+'</td>'+
                    '<td>'+i.cep+'</td>'+
                    // Botão Update 
                    "<td><input type='button' "+
                        "value='Alterar' "+
                        "class='btn btn-warning form-control' "+
                        "title='Alterar Registro' "+
                        "onclick='updateClient(id="+i.id+")'> "+
                    "</td>"+
                    // Botão Delete 
                    "<td><input type='button' "+
                        "value='Excluir' "+
                        "class='btn btn-danger form-control' "+
                        "title='Excluir Registro' "+
                        "onclick='deleteClient(id="+i.id+")'> "+
                    "</td>"+
                    // Botão Modal Visualiza Dependetes 
                    "<td>"+
                    "<button type='button' class='btn btn-info' onclick='showDependents(id="+i.id+")' data-bs-toggle='modal' data-bs-target='#modelId'>"+
                    "Visualiza dependentes"+
                    "</button>"+
                    "</tr>"
                )
            });
        }
    });
}

// DIV CADASTRO DE CLIENTE
newClient = () => {
    $('#actionClient').val(0)
    $('#crud_client')[0].reset()
    $('#btnNewClient').prop('disabled',true)
    $('#btnNewDependent').prop('disabled',false)

    if($('.cardNewClient').is(':visible')){
        $('.cardNewClient').fadeOut(500)

    }else{
        $('#titleCardClient').html('Cadastro de Cliente')
        $('.cardNewClient').fadeIn(500)
        $('.cardNewDependent').hide()

    }
}


$('#btnSaveClient').click(function(){
    
    nameClient = $('#nameClient').val()
    cpf_cnpj   = $('#cpf_cnpj').val()
    cep        = $('#cep').val()
    address    = $('#address').val()

    //Mostra DIV Mensagem
    $('#message').show()
    $('#message').fadeOut(5000)

    // Validação campos do formulário client
    if(nameClient.length == 0){
        $('#message').html("Nome cliente não pode ser em branco.")
        return false;
    }
    if(cpf_cnpj.length == 0){
        $('#message').html("CPF ou CNPJ não pode ser em branco.")
        return false;
    }    
    if(cep.length == 0){
        $('#message').html("CEP não pode ser em branco.")
        return false;
    }    
    if(address.length == 0){
        $('#message').html("Endereço não pode ser em branco.")
        return false;
    }
    $('#message').html('')
    if($('#actionClient').val() == 0){
        if(confirm('Deseja salvar cliente?')){
            $.ajax({
                type:"POST",
                url: "http://127.0.0.1:8000/api/createClient",
                data: $('#crud_client').serialize(),
                success: function (response) {
                    $('#message').show()
                    $('#message').html(response.message)
                    allClient() 
                }
            })
        }
    }else{
        if(confirm('Confirmar alterar dados do cliente?')){
            let idClient = $('#client_id').val()
            $.ajax({
                type:"PUT",
                url: "http://127.0.0.1:8000/api/updateClient/"+idClient,
                data: $('#crud_client').serialize(),
                success: function (response) {
                    $('#message').show()
                    $('#message').html(response.message)
                    allClient() 
                }
            })

        }
    }   
})


updateClient = (id) => {
    $('#actionClient').val('1')
    $('#nameClient').focus()
    $('.cardNewDependent').hide()
    $('.cardNewClient').show()
    $('#titleCardClient').html('Alterar dados Cliente')
    $('#btnNewClient').prop('disabled',true)
    $('#btnNewDependent').prop('disabled',false)

    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8000/api/readClient/"+id,
        success: function (response) {
            console.log(response)
            $('#nameClient').val(response[0].name)
            iCPF_CNPJ = response[0].cpf_cnpj
            if(iCPF_CNPJ.length == 14){ 
                $('#radio1').trigger('click')
                
            }else{
                $('#radio2').trigger('click')
            }
            $('#client_id').val(response[0].id)
            $('#cpf_cnpj').val(response[0].cpf_cnpj)
            $('#cep').val(response[0].cep)
            $('#address').val(response[0].address)
        }    
    })
   
}

// Deletar Cliente
deleteClient = (id) => {
    if(confirm('Confirma excluir cliente?')) {
        $.ajax({
            type: "DELETE",
            url: "http://127.0.0.1:8000/api/deleteClient/"+id,
            success: function (response) {
                $('#message').show()
                $('#message').html(response.message)
                $('#message').fadeOut(5000)
                $('.cardNewDependent').hide()
                $('.cardNewClient').show()
                $('#btnNewClient').prop('disabled',true)
                $('#btnNewDependent').prop('disabled',false)
                        
                allClient() 
            }
        })
    }else{
        return false;
    }

}

// DEPENDENTES
// Novo Dependente

newDependent = () => {
    $('#actionDependent').val(0)
    $('#crud_dependent')[0].reset()

    $('#btnNewClient').prop('disabled',false)
    $('#btnNewDependent').prop('disabled',true)

    if($('.cardNewDependent').is(':visible')){
        $('.cardNewDependent').fadeOut(500)
    }else{
        $('#titleCardDependent').html('Cadastro de Dependente')
        $('.cardNewDependent').fadeIn(500)
        $('.cardNewClient').hide()
    }
    // Carrega Select Option Cliente
    loadSelectClient()
}

// Carrega Select Option Cliente
loadSelectClient = () => {
    $('#clients_id').empty()
    
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8000/api/allClient",
        success: function (response) {
            response.forEach(i => {
                $('#clients_id').append("<option value='"+i.id+"'>"+i.name+"</option>")
            })
        }    
    })

}

//Editar dependentes
editDependents = (id) => {
    $('#actionDependent').val(1)
    $('#titleCardDependent').html('Alterar Dados do Dependente')

    $('.cardNewDependent').show()
    $('.cardNewClient').hide()
    $('.modal').modal('hide')
    $('#clients_id').html('')
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8000/api/allClient",
        success: function (response) {
            response.forEach(i => {
                $('#clients_id').append("<option value='"+i.id+"'>"+i.name+"</option>")
            })
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:8000/api/readDependent/"+id,
                success: function (response) {
                    $('#clients_id').val(response[0].clients_id)
                    $('#nameDependent').val(response[0].name)
                    $('#age').val(response[0].age)
                    $('#date_birth').val(response[0].date_birth)
                    $('#dependent_id').val(response[0].id)
                }    
            })
                        
        }
    })
}

     

// Lista dependente pelo ID
showDependents = (id) => {
    $('#listDependents').html('')
    $.ajax({
        type:"GET",
        url: "http://127.0.0.1:8000/api/allDepentsClient/"+id,
        success: function (response) {
            if(response.length > 0){
                $('#listDependents').html('<h6>Dependentes do Cliente: '+response[0].name_client+'</h6>')
                response.forEach(i => {
                    $('#listDependents').append(
                    "Nome: "+i.name+" - Idade: "+i.age+" anos - "+
                    "<input type='button' "+
                    "class='btn btn-primary' "+
                    "onclick='editDependents("+i.dependent_id+")' "+
                    "data-dismiss='modal'"+
                    "value='Editar'>"+
                    " "+
                    "<input type='button' "+
                    "class='btn btn-danger' "+
                    "onclick='deleteDependents("+i.dependent_id+")' "+
                    "data-dismiss='modal'"+
                    "value='Excluir'"+
                    "<br><hr>")
                })
            }
            
        }
    })
}

// Excluir dependente
deleteDependents = (id) => {
    $.ajax({
        type:"DELETE",
        url: "http://127.0.0.1:8000/api/deleteDependent/"+id,
        success: function (response) {
            $('#message').show()
            $('#message').html(response.message)
            $('#message').fadeOut(5000)
            $('.modal').modal('hide');
            
        }
    })

}

// EVENTOS BOTOES 
// BOTAO SALVAR DEPENDENTE
$('#btnSaveDependent').click(function(e){
    nameDependent = $('#nameDependent').val()
    age           = $('#age').val()
    date_birth    = $('#date_birth').val()
 
    //Mostra DIV Mensagem
    $('#message').show()
    $('#message').fadeOut(5000)

    // Validação campos do formulário
    if(nameDependent.length == 0){
        $('#message').html("Nome dependente não pode ser em branco.")
        return false;
    } 
    if(age.length == 0){
        $('#message').html("Idade não pode ser vazio.")
        return false;
    } 
    if(date_birth.length == 0){
        $('#message').html("Data nascimento não pode ser vazio.")
        return false;
    } 
    
    if($('#actionDependent').val() == 0){
        if(confirm('Deseja salvar dependente?')){
            $('#message').html('')
            $.ajax({
                type:"POST",
                url: "http://127.0.0.1:8000/api/createDependent",
                data: $('#crud_dependent').serialize(),
                success: function (response) {
                    $('#message').show()
                    $('#message').html(response.message)
                    $('#crud_dependent')[0].reset()
                }
            })
        }
    }else{
        
        if(confirm('Confirmar alterar dados do dependente?')){
            let idDependent = $('#dependent_id').val()
            $.ajax({
                type:"PUT",
                url: "http://127.0.0.1:8000/api/updateDependent/"+idDependent,
                data: $('#crud_dependent').serialize(),
                success: function (response) {
                    console.log(response)
                    $('#message').show()
                    $('#message').html(response.message)
                    $('#crud_dependent')[0].reset()
                }
            })

        }
    }
})

// EVENTO CLICK BOTÃO CRIAR NOVO CLIENTE
$('#btnCreateClient').click(function(e){
    $('#crud_client')[0].reset()
    $('#nameClient').focus()
    $('#titleCardClient').html('Cadastro de Cliente')
    $('#actionClient').val('0')
})

// EVENTO CLICK BOTÃO CRIAR NOVO DEPENDENTE
$('#btnCreateDependent').click(function(e){
    $('#crud_dependent')[0].reset()
    $('#nameDependent').focus()
    $('#titleCardDependent').html('Cadastro de Dependente')
    $('#actionDependent').val('0')
})
