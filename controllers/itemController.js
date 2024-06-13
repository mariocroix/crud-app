const Item = require('../models/Item');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.render('index', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.showNewItemForm = (req, res) => {
    res.render('new');
};

exports.createItem = async (req, res) => {
    try {
        const newItem = new Item({
            name: req.body.name,
            description: req.body.description
        });
        await newItem.save();
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.showEditItemForm = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            res.render('edit', { item });
        } else {
            res.redirect('/items');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            item.name = req.body.name;
            item.description = req.body.description;
            await item.save();
            res.redirect('/items');
        } else {
            res.redirect('/items');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.redirect('/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
