require('express-async-errors');
const { Clothe, validate } = require('../models/clothe');
const router = require('express').Router();
const _ = require('lodash');
const { isValidObjectId } = require('mongoose');
const auth = require('../Middleware/auth')
const admin = require('../Middleware/admin')

router.get('/', auth, (req, res) => {

    res.send("Welcome to the Fashion Store");
});


router.post('/additem', async (req, res) => {
    let { error } = validate(req.body);
    if (error) {
        res.send(`Please provide the correct info: ${error}`);
        return;
    }

    const Garment = new Clothe(_.pick(req.body, ['itemName', 'price', 'Brand', 'fabric']));
    let result = await Garment.save();
    res.status(200).send(result);
})

router.get('/fashionShow', async (req, res) => {

    const clothes = await Clothe.find();
    res.status(200).send(clothes);
});

router.put('/updItem/:id', async (req, res) => {

    if (!isValidObjectId(req.params.id))
        return res.status(400).send("Not a valid id");

    const clothes = await Clothe.findById(req.params.id);

    if (!clothes) {
        res.status(404).send(`item not found${req.params.id}`);
        return;
    }
    clothes.price = req.body.price;
    await clothes.save();
    res.status(200).send(`saved the Item  , ${JSON.stringify(_.pick(clothes, ["itemName", "price", "Brand"]))}`);
});

router.delete('/deleteItem/:id', [auth, admin], async (req, res) => {
    if (!isValidObjectId(req.params.id))
        return res.status(400).send("Not a Valid product");

    const clothes = await Clothe.findById(req.params.id);

    if (!clothes)
        return res.status(404).send("Item not found");

    await Clothe.deleteOne({ _id: req.params.id });
    res.status(200).send("ITEM is deleted");
});
module.exports = router;