const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const connection = require('./database/connection');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);

//o celebrate valida, e ele sempre vem antes do metodo create pois no express tudo funciona por sequencia
//então posso fazer quantas coisas eu quiser, em rodem, e separando por virgula
routes.post('/ongs', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
        })
    }) , OngController.create);

routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({
            authorization: Joi.string().required(),
        }).unknown(),
    }), ProfileController.index);

routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number(),
        })
    }), IncidentController.index);

routes.post('/incidents', IncidentController.create);

routes.delete('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required(),
        })
    }), IncidentController.delete);

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

