const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String, required: true },
    year: { type: String },
    imageUrl: { type: String },
    description: { type: String }
 });
 
 module.exports = mongoose.model('Movie', movieSchema);