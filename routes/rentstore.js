require('express-async-errors');
const { Rental, validateRental } = require('../models/rental');
const { User } = require('../models/user');
const { Movie } = require('../models/movie');
const auth = require('../Middleware/auth');
const { mongoose, isValidObjectId } = require('mongoose');
const router = require('express').Router();

router.get('/', auth, async (req, res) => {
    let results = await Rental.find({});
    res.status(200).send(results);
});

router.post('/', auth, async (req, res) => {
    let { error } = validateRental(req.body);
    if (error) {
        res.status(400).send(`kindly check the request : ${error}`);
        return;
    }

    if (!isValidObjectId(req.body.user_id) || !isValidObjectId(req.body.movie_id)) {
        res.status(400).send(`kindly check the request : ${error}`);
        return;
    }

    const userR = await User.findById(req.body.user_id);
    if (!userR)
        return res.status(404).send('user does not exists');


    const movieR = await Movie.findById(req.body.movie_id);
    if (!movieR)
        return res.status(404).send('user does not exists');

    const session = await Rental.startSession();
    session.startTransaction();

    const rental = new Rental({
        movie: {
            _id: movieR._id,
            title: movieR.title,
            price: movieR.price,
        },

        user: {
            _id: userR._id,
            name: userR.name,
            email: userR.email
        }
        });
    const result = await rental.save();
    const mov = await Movie.updateOne({ _id: movieR._id }, { $inc: { stock: -1 } });
    res.send(result);
});

module.exports = router;
