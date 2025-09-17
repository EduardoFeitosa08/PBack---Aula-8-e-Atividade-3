/************************************************************************************
 * Objetivo: API responsavel em criar endPoints referente estados e cidades
 * Data: 15/09/2025
 * Autor: Eduardo Feitosa Batista
 * Versão: 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 *      express     - npm install express       --save Instala as dependencias para criar uma API
 *      cors        - npm install cors          --save Instala as dependencias para configurar as permissões de uma API
 *      body-parser - npm install body-parser   --save Instala as dependencias para receber os tipos de dados via POST ou PUT
 ***********************************************************************************/

//Import das dependencias 
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Import do arquivo de funções
const dados = require('./modulo/funcoes.js')

/*Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta 
            * em execução local podemos definir uma porta livre*/
const PORT = process.PORT || 8080

//Instancia na classe express
const app = express()

//Configurações do CORS
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')//De onde virá a requisição, o * significa qualquer um, ou qualquer ip
    response.header('Acess-Control-Allow-Methods', 'GET')//Metodos (Verbos) do protocolo HTTP que estão permitidos

    app.use(cors())
    next() //Próximo, para que o app carregue esse header e continue para as próximas
})

//Request -> Recebe os dados
//Response -> Envia os dados

//EndPoints
app.get('/v1/estados', function(request, response){
    let estados = dados.getAllEstados()
    
    response.status(estados.statuscode)
    response.json(estados)
})

app.get('/v1/estado/:uf', function(request, response){
    let sigla = request.params.uf
    let estado = dados.getEstadoBySigla(sigla)
    
    response.status(estado.statuscode)
    response.json(estado)
})

//Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})