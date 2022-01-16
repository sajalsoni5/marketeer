const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');

describe('generateAuth',()=>{
    // it('should return auth token',()=>{
    //     const payload = {_id: new mongoose.Types.ObjectId().toHexString(),age:22,email:'hello@gamil.com',password:'23412312343',isAdmin:true};
    //     const user = new User(payload);
    //     const token = user.generateAuth();
    //     const decoded = jwt.verify(token,config.get('private'));
    //     console.log(decoded);
    //     expect(decoded).toMatchObject(payload);
    // });

    it('should match object',()=>{
        const oo = {
            _id :new mongoose.Types.ObjectId().toHexString(),
            age:22,
            email:'hello@gamil.com',password:'23412312343',
            isAdmin:true
        };

        expect({age:22,isAdmin:true}).toMatchObject(oo);
    })
});
