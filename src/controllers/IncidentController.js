const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        const { page = 1 } = request.query;
        
        //busca numa query separada o tanto de registros que tem, para devolver ao front
        //e tornar mais facil o calculo de paginas ou exibir o total de registros
        const [count] = await connection('incidents') //ou count[0]
            .count();

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf'
            ]);
        
        response.header('X-Total-Count', count['count(*)']); //devolve no header da resposta, o total de registros

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        //request.headers //informações por exemplo da identificação do usuario, dados da localização, etc...
        const ong_id = request.headers.authorization;

        //const result = await....
        //const id = result[0]; 
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitted.'}) //401 erro não autorizado
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send(); //204 resposta de sucesso mas sem conteudo nenhum para retornar
    }
};