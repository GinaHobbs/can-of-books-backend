'use strict';

const mongoose = require('mongoose');
const bookSchema = require('./BookSchema.js')

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  books: { type: Array, required: true }
})

// mongoose.model creates the actual collection the MongoDB database
                            // collection  // blueprint (aka schema)
module.exports = mongoose.model('users', userSchema);