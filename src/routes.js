const express = require('express');

const connection = require('./database/connection');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;

//codigos comentados como exemplos e devem ficar em cima do module exports junto com as rotas
// routes.post('/users', (request, response) =>{
//     console.log('teste');
//     //const params = request.query; //Query Params
//     //const id = request.params;  //Route Params
//     const body = request.body;  //Request Body
    
//     //console.log(params);
//     //console.log(id);
//     console.log(body);

//     return response.json({
//         evento: 'Semana OmniStack 11.0',
//         aluno: 'Vitor Fornazieri Rodrigues'
//         //,parametrorecebido: params.name
//     });  
// });

