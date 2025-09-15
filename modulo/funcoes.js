/************************************************************************************
 * Objetivo: Arquivo responsavel pelas funções para criar a API de estados e cidades
 * Data: 15/09/2025
 * Autor: Eduardo Feitosa Batista
 * Versão: 1.0
 ***********************************************************************************/

//import do arquivo estados e cidade
const dados = require('./estados_cidades.js')

const MESSAGE_ERROR = {status: false, statuscode: 500, development: 'Eduardo Feitosa Batista'}

//Retorna a lista de estados
const getAllEstados = function(){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista', uf: []}


    dados.listaDeEstados.estados.forEach(function(item){
        message.uf.push(item.sigla)
    })

    //Adiciona um novo elemento no JSON
    message.quantidade = message.uf.length

    if(message.quantidade > 0){
        return message //Resultado Verdadeiro da API 200
    }else{
        return MESSAGE_ERROR //Resultado Falso da API 500
    }

    //Apaga um elemento exixstento no JSON
    // delete message.status
    
}

//Retorna dados do estado filtrando pela sigla
const getEstadoBySigla = function(sigla){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista', estado: {}}
    message.estado = dados.listaDeEstados.estados.find(estado => estado.sigla === sigla)

    return message
}

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function(sigla){

}

//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function(regiao){

}

//Retorna a lista de estados que formam a capital de um pais filtrando pelo Pais
const getEstadoIsCapitalByCountry = function(pais){

}

//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function(sigla){

}

console.log(getEstadoBySigla('AC'))


module.exports = {
    getAllEstados
}