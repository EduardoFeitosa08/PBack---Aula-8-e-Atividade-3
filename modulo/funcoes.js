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
    //Padrão do JSON que será o retorno da função
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

    //Apaga um elemento existente no JSON
    // delete message.status
    
}

//Retorna dados do estado filtrando pela sigla
const getEstadoBySigla = function(sigla){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista'}
    //Criando o elemento estado
    message.estado = dados.listaDeEstados.estados.find(estado => estado.sigla === sigla) //Procurar o estado de acordo com a sigla digitada

    delete message.estado.cidades
    delete message.estado.capital_pais
    
    if(message.estado){
        return message
    }else{
        return MESSAGE_ERROR
    }
    
}

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function(sigla){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista'}

    message.estado = dados.listaDeEstados.estados.find(estado => estado.sigla === sigla)

    delete message.estado.regiao
    delete message.estado.cidades
    
    if(message.estado){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

//Retorna a lista de estados filtrando pela região
const getEstadosByRegiao = function(regiao){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista'}

    let regiaoCapitalizada = String(regiao).charAt(0).toUpperCase() + String(regiao).slice(1)

    message.regiao = regiaoCapitalizada
    message.estados = []
    dados.listaDeEstados.estados.forEach(function(item){
        if(item.regiao == regiaoCapitalizada){
            message.estados.push(item)
        }
    })
    message.estados.forEach(function(item2){
        let estadoIndex = message.estados.indexOf(item2)
        delete message.estados[estadoIndex].cidades
        delete message.estados[estadoIndex].capital_pais
    })

    if(message.estados || message.regiao){
        return message
    }else{
        return MESSAGE_ERROR
    }


}

//Retorna a lista de estados que formam a capital de um pais filtrando pelo Pais
const getEstadoIsCapitalByCountry = function(pais){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista'}

    let paisCapitalizado = String(pais).charAt(0).toUpperCase() + String(pais).slice(1)

    message.capitais = []
    dados.listaDeEstados.estados.forEach(function(item){
        if(item.capital_pais){
            message.capitais.push(item)
        }
    })
    message.capitais.forEach(function(item){
        delete item.cidades
        item.capital_atual = item.capital_pais.capital
        item.capital_pais_ano_inicio = item.capital_pais.ano_inicio
        item.capital_pais_ano_termino = item.capital_pais.ano_fim
        delete item.capital_pais
        
    })
    return message
}

//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function(sigla){

}

// console.log(getEstadoBySigla('SP'))
// console.log(getCapitalBySigla('AC'))
// console.log(getEstadosByRegiao('sul'))
console.log(getEstadoIsCapitalByCountry('Brasil'))

module.exports = {
    getAllEstados,
    getEstadoBySigla
}