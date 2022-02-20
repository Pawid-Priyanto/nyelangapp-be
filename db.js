const mongoose = require('mongoose');

const connecDB = () => {
    mongoose.connect('mongodb+srv://pawid:pawit123@cluster0.djiq9.mongodb.net/final-rent', {useUnifiedTopology: true, useNewUrlParser: true});

    const connection = mongoose.connection;
    connection.on('connected', () => {
        console.log('mongodb connection succesfull')
    })

    connection.on('error', () => {
        console.log('mongodb failed to connect')
    })
}

connecDB();

module.exports = mongoose