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
    message.estado = dados.listaDeEstados.estados.find(estado => estado.sigla === String(sigla).toUpperCase()) //Procurar o estado de acordo com a sigla digitada

    if(message.estado){
        message.estado.uf = message.estado.sigla
        message.estado.descricao = message.estado.nome
        message.estado.capital1 = message.estado.capital
        message.estado.regiao1 = message.estado.regiao

        delete message.estado.sigla
        delete message.estado.nome
        delete message.estado.capital
        delete message.estado.regiao

        message.estado.capital = message.estado.capital1
        message.estado.regiao = message.estado.regiao1

        delete message.estado.capital1
        delete message.estado.regiao1

        delete message.estado.cidades
        delete message.estado.capital_pais
    }else{
        return MESSAGE_ERROR
    }
    
    if(message.estado){
        return message
    }else{
        return MESSAGE_ERROR
    }
    
}

//Retorna a capital do estado filtrando pela sigla
const getCapitalBySigla = function(sigla){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista'}

    message.estado = dados.listaDeEstados.estados.find(estado => estado.sigla === String(sigla).toUpperCase())

    if(message.estado){
        message.estado.uf = message.estado.sigla
        message.estado.descricao = message.estado.nome
        message.estado.capital1 = message.estado.capital

        delete message.estado.sigla
        delete message.estado.nome
        delete message.estado.capital

        message.estado.capital = message.estado.capital1

        delete message.estado.capital1

        delete message.estado.regiao
        delete message.estado.cidades
        delete message.estado.capital_pais
    }else{
        return MESSAGE_ERROR
    }
    
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
    let regiaoUpperCase = String(regiao).toUpperCase()

    message.regiao = regiaoUpperCase
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
        delete message.estados[estadoIndex].regiao
        delete message.estados[estadoIndex].capital

        message.estados[estadoIndex].uf = message.estados[estadoIndex].sigla
        message.estados[estadoIndex].descricao = message.estados[estadoIndex].nome
        
        delete message.estados[estadoIndex].sigla
        delete message.estados[estadoIndex].nome

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

    message.capitais = []
    dados.listaDeEstados.estados.forEach(function(item){
        if(item.capital_pais){
            message.capitais.push(item)
        }
    })
    message.capitais.forEach(function(item){
        delete item.cidades
        item.capital_atual = item.capital_pais.capital
        item.uf = item.sigla
        item.descricao = item.nome
        item.capital1 = item.capital
        item.regiao1 = item.regiao

        delete item.capital
        delete item.regiao

        item.capital = item.capital1
        item.regiao = item.regiao1

        delete item.capital1
        delete item.regiao1
        
        item.capital_pais_ano_inicio = item.capital_pais.ano_inicio
        item.capital_pais_ano_termino = item.capital_pais.ano_fim
        delete item.sigla
        delete item.nome
        delete item.capital_pais
        
    })
    if(message.capitais){
        return message
    }else{
        return MESSAGE_ERROR
    }
}

//Retorna as cidades existentes em um estado, filtrando pela sigla
const getCidadesBySigla = function(sigla){
    let message = {status: true, statuscode: 200, development: 'Eduardo Feitosa Batista'}

    message.listaDeCidades = dados.listaDeEstados.estados.find(estado => estado.sigla === String(sigla).toUpperCase())
    message.listaDeCidades.cidade = []
    
    delete message.listaDeCidades.capital
    delete message.listaDeCidades.regiao
    delete message.listaDeCidades.capital_pais

    message.listaDeCidades.cidades.forEach(function(item){
        let cidade = item.nome
        message.listaDeCidades.cidade.push(cidade)
    })
    message.listaDeCidades.uf = message.listaDeCidades.sigla
    message.listaDeCidades.descricao = message.listaDeCidades.nome
    message.listaDeCidades.quantidade_cidades = message.listaDeCidades.cidades.length
    delete message.listaDeCidades.cidades
    delete message.listaDeCidades.sigla
    delete message.listaDeCidades.nome

    message.listaDeCidades.cidades = message.listaDeCidades.cidade
    
    delete message.listaDeCidades.cidade

    if(message.listaDeCidades){
        return message
    }else{
        return MESSAGE_ERRORs
    }

}
// console.log(getAllEstados())
// console.log(getEstadoBySigla('sp'))
// console.log(getCapitalBySigla('ac'))
// console.log(getEstadosByRegiao('sul'))
// console.log(getEstadoIsCapitalByCountry('Brasil'))
// console.log(getCidadesBySigla('ac'))


module.exports = {
    getAllEstados,
    getEstadoBySigla,
    getCapitalBySigla,
    getEstadosByRegiao,
    getEstadoIsCapitalByCountry,
    getCidadesBySigla
}