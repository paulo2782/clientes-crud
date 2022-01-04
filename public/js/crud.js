
allClient = () => {
    $.ajax({
        type: "get",
        url: "http://127.0.0.1:8000/api/allClient",
        success: function (response) {
            response.forEach(i => {
                $('#data_client').html(
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
                    "</td>"
                )
                    
            });
        }
    });
}

newClient = () => {
    if($('.cardNewClient').is(':visible')){
        $('.cardNewClient').fadeOut(1000)
    }else{
        $('.cardNewClient').fadeIn(1000)
    }

}

saveClient = () => {
    if(confirm('Deseja salvar cliente?')) {
        alert('Registro Salvo.')
    }else{
        return false;
    }
}

updateClient = (id) => {
    if(confirm('Deseja atualizar dados do cliente?')) {
        alert('Registro Atualizado.')
    }else{
        return false;
    }
}
deleteClient = (id) => {
    if(confirm('Confirma excluir cliente?')) {
        alert('Registro excluído.')
    }else{
        return false;
    }

}
