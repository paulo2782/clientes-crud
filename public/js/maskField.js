$(function() {
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