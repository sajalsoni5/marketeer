const mongoose = require('mongoose');
const joi = require('joi');

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    genre:{
        type:String,
        enum:['science','fiction','Novel','Romance','History','Maths','motivational']
        },
    author:String,
    publishYear:{
        type:Number,
        min:0,
        max:new Date().getFullYear()
    }
    
});

const Book = mongoose.model('BookStore',bookSchema);

function bookValidator(book){
    let schema = joi.object({
        name:joi.string().min(2).required(),
        price:joi.number().min(0).required(),
        author:joi.string().min(2),
        publishYear:joi.number().min(0),
        genre:joi.string().min(2)
    });
    return schema.validate(book);
}

module.exports.Book = Book;
module.exports.bookValidator = bookValidator;