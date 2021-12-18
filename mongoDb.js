const { MongoClient } = require('mongodb');
require("dotenv").config();

const mongoDb = () => {
    const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.BD_PASS}@cluster0.wewoq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    return client;
};

module.exports = mongoDb;