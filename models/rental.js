const mongoose = require('mongoose');
const joi = require('joi');
const { date, func } = require('joi');

const rentalSchema = new mongoose.Schema({
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },

            price: {
                type: Number,
                required: true,
                min: 0,
                default: 0
            }
        }),
        required: true
    },

    user: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 50
            },

            email: {
                type: String,
                required: true,
                match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
                trim: true,
                lowercase: true
            }
        }),
        required: true
    },

    rentDate: {
        type: Date,
        default: new Date()
    },

    returnDate: {
        type: Date,
        default: null
    },

    rentCostTotal: {
        type: Number,
        default: null
    }
});

const Rental = mongoose.model('rental', rentalSchema);

function validateRental(rent) {
    let schema = joi.object({
        movie_id: joi.string().min(1).required(),
        user_id: joi.string().min(1).required()
    });
    return schema.validate(rent);
}

module.exports.Rental = Rental;
module.exports.validateRental = validateRental;