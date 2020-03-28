const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection')

describe('ONG', () => {

    beforeEach(async () => {
        await connection.migrate.rollback(); //desfaça todas as migrations, ou seja, delete os registros e tabelas
        await connection.migrate.latest(); //recria elas novamente, para não deixar sempre um banco pesado
    });

    afterAll(async () =>{
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            //se precisar de um header, eu posso colocar .set('Authorization', 'idValidoOng') por exemplo
            .send({
                name: "APAD2",
                email: "contato@apad.com.br",
                whatsapp: "18999999999",
                city: "Bilac",
                uf: "SP"
            });
        
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});