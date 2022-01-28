const request = require('supertest');
let server;
const {Book} = require('../../../models/book');

describe('api/bookStore',()=>{
    beforeEach(()=>{
        server = require('../../../index');
    });
    afterEach(async()=>{
        await server.close();        
        await Book.collection.deleteMany({});
    });
    describe('GET /',()=>
        {
            it('/showBooks',async()=>{
            const res = await request(server).get('/api/bookStore/showBooks');
            expect(res.status).toBe(200);
            });

            it('showBooks2',async()=>{
                await Book.collection.insertMany([{name:'slsld',price:446},{name:'sjkdls',price:354}]);
                const res = await request(server).get('/api/bookStore/showBooks');
                expect(res.body.length).toBe(2);
            });
        
    });
})