const mongoose = require('mongoose');
const joi = require('joi');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0,
        default: 0
    },

    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 1
    }
});

const Movie = mongoose.model('movie', movieSchema);

function validateMovie(movie) {
    let schema = joi.object({
        title: joi.string().min(1).required(),
        price: joi.number().min(0).required(),
        stock: joi.number().min(1).required()
    });
    return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;