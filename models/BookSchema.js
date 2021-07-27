'use strict';

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true }
})

// mongoose.model creates the actual collection the MongoDB database
                            // collection  // blueprint (aka schema)
module.exports = mongoose.model('books', bookSchema);