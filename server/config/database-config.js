const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    try {
        mongoose.connect(process.env.DB_CONNECTION_STRING, connectionParams);
        console.log('Connected to database successfully!');
    } catch (error) {
        console.log(error);
        console.log('Connection to database failed!');
    }
}