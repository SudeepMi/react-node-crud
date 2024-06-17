const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genreId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },
  image: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
