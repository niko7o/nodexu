const mongoose = require('mongoose');

const DB_NAME = 'nodexu'
const MONGODB_URI = `mongodb://127.0.0.1:27017/${DB_NAME}`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.info(`Successfully connected to: ${MONGODB_URI}`)
    })
    .catch(error => {
        console.error('Database connection error:', error);
    });
