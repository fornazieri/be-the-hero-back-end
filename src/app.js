const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); //sempre antes das rotas, estou falando para o express pegar o json do corpo
//e converter em objeto javascript
app.use(routes); //sempre abaixo do use express json
//Rota / Recurso
//resources é por exemplo /user /abc etc...

app.use(errors());

/*
Metodos HTTP:

GET   : Buscar uma informação do back-end (quando da enter no navegador por exemplo, é um get)
POST  : Criar uma informação no back-end
PUT   : Alterar uma informação no back-end
DELETE: Deletar uma informação no back-end
*/

/*
Tipos de Parametros:

Query Params: Parâmetros nomeados enviados na rota após "?" e geralmente servem para filtros, paginação, 
    e são concatenados com "&" (/users?page=2&name=Vitor&idade=25)
Route Params: Parâmetros utilizados para identificar recursos (/users/:id)
Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
*/

/*
SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft Sel Server, Firebird
NoSQL: MongoDB, CouchDB
*/

/*
Driver: SELECT * FROM users
Query Builder: table(users).select('*').where()
*/



//app.listen(3333);
module.exports = app;