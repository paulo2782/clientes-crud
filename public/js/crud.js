// CLIENTES
// Todos Clientes
allClient = () => {
    $('#data_client').empty()
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8000/api/allClient",
        success: function (response) {
            console.log(response)
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

    // Validação campos do formulário
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

    if(confirm('Deseja salvar cliente?')){
        $('#message').html('')
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
})

updateClient = (id) => {
    if(confirm('Deseja atualizar dados do cliente?')) {
        alert('Registro Atualizado.')
    }else{
        return false;
    }
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
    if($('.cardNewDependent').is(':visible')){
        $('.cardNewDependent').fadeOut(500)
    }else{
        $('#titleCardDependent').html('Cadastro de Dependente')
        $('.cardNewDependent').fadeIn(500)
        $('.cardNewClient').hide()
    }

    // Carrega Select Option Cliente
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

showDependents = (id) => {
    $('#listDependents').html('')
    $.ajax({
        type:"GET",
        url: "http://127.0.0.1:8000/api/allDepentsClient/"+id,
        success: function (response) {
            
            $('#listDependents').html('<h6>Dependentes do Cliente: '+response[0].name_client+'</h6>')
            response.forEach(i => {
                $('#listDependents').append("Nome: "+i.name+" - Idade: "+i.age+" anos<br>")
            })
            
        }
    })
}

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
    

    if(confirm('Deseja salvar dependente?')){
        $('#message').html('')
        $.ajax({
            type:"POST",
            url: "http://127.0.0.1:8000/api/createDependent",
            data: $('#crud_dependent').serialize(),
            success: function (response) {
                $('#message').show()
                $('#message').html(response.message)
                allClient() 
            }
        })
        
    }
})

 
