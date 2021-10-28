const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('admins'));

app.get('/', (req, res) => {
    res.send('Server Started')
})
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vm7xa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log("db connected");
  const productsCollection = client.db("trioxInt").collection("products");
  app.get('/allProducts', (req, res) => {
    productsCollection.find()
        .toArray((err, items) => {
            res.send(items)
        })
})
app.get('/product', (req, res) => {
    let query = parseInt(req.query.id);
    productsCollection.find({ product_id: query})
        .toArray((err, items) => {
            res.send(items)
        })
})
})












app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});