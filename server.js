'use strict';

//Copied from the instructors code so we can try to understand what is happening.

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

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

app.listen(PORT, () => console.log(`listening on ${PORT}`));
