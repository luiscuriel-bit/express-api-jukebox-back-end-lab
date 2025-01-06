require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require('cors');

const tracksController = require('./controllers/tracks');

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
    console.log((`Connected to MongoDB ${mongoose.connection.name}`));
});

app.use(cors());
app.use(express.json());
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use('/tracks', tracksController);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});