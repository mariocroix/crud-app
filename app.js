const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const itemRoutes = require('./routes/itemRoutes');

const app = express();

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const MONGOURL = process.env.MONGO_URL;
mongoose.connect(MONGOURL, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

// Routes
app.use('/items', itemRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/items');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
