'use strict';

//Copied from the instructors code so we can try to understand what is happening.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require('mongoose');
const UserParent = require('./models/User.js');
const BookSchemaParent = require('./models/BookSchema.js');

// these are default options, just use them do not read into them
const mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true }

mongoose.connect('mongodb://localhost:27017/db-name', mongooseOptions)

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3002;

const client = jwksClient({
  jwksUri: 'https://dev-pj8m-sfw.us.auth0.com/.well-known/jwks.json'
});

function getKey(header, callback){
  client.getSigningKey(header.kid, function(err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

// TODO: build out auth response functionality
app.get('/test', (req, res) => {
  // req.headers.headers.authorization = 'Bearer '
  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, getKey, {}, function(err, user) {
    if (err) {
      res.send('invalid token - you cannot access this route');
    } else {
      res.json({ 'token': token })
    }
  });
});


//------------------------------------//
// * Models
//------------------------------------//
let book1 = new BookSchemaParent({ name: 'Book1', description: 'book', status: 'status'})
book1.save();
let Gina = new UserParent({ email: 'ginamariehobbs@gmail.com', books: [ book1 ]})
Gina.save();

app.get('/books', (req, res) => {
  // check the database then do a res.send of what's in there.
  UserParent.find({})
    .then(users => {
      res.send(users)
    })
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
