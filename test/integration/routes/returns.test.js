const { Rental } = require('../../../models/rental');
const { User } = require('../../../models/User');
const mongoose = require('mongoose');
const request = require('supertest');

let server;

describe('GET /rentals', () => {
    let user_id = mongoose.Types.ObjectId();
    let movie_id = mongoose.Types.ObjectId();
    let rental;
    beforeEach(async() => {
        server = require('../../../index');

        rental = new Rental({
            user :{
                _id : user_id,
                email : 'sajal.soni4@gmail.com',
                name : 'sajal'
            },
            movie : {
                _id : movie_id,
                title: 'kal ho na ho',
                price : 33,
                stock : 33
            }
        });

        await rental.save();
    });

    afterEach(async() => {
        await server.close();
        await Rental.collection.deleteMany({});
    });

    afterAll(async()=>{ 
        await mongoose.connection.close();
    });


    it('should return 404',async()=>{
        const res = await request(server)
                    .post('/api/returns/')
                    .send({user_id,movie_id});

        expect(res.status).toBe(404);
    })
    it('should return 400 if userid not provided',async()=>{
        const token = new User().generateAuth();

        const res = await request(server)
                    .post('/api/returns/')
                    .set('x-auth-token',token)
                    .send({movie_id});

        expect(res.status).toBe(400);
    });

    it('should return 400 if movie id not provided',async()=>{
        const token = new User().generateAuth();

        const res = await request(server)
                    .post('/api/returns/')
                    .set('x-auth-token',token)
                    .send({user_id});

        expect(res.status).toBe(400);
    })
})