const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxMovieId: { type: String }
 });
 
 module.exports = mongoose.model('Sequence', sequenceSchema);