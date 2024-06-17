const express = require('express');
const router = express.Router();
const Genre = require('../models/genre');

// Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a genre
router.post('/', async (req, res) => {
  const genre = new Genre({
    name: req.body.name
  });

  try {
    const newGenre = await genre.save();
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single genre
router.get('/:id', getGenre, (req, res) => {
  res.json(res.genre);
});

// Update a genre
router.put('/:id', async (req, res) => {
 

  try {
    const genre = await Genre.findById(req.params.id);
    genre.name = req.body.name;
    const updatedGenre = await genre.save();
    res.json(updatedGenre);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a genre
router.delete('/:id', async (req, res) => {
  try {
    await Genre.deleteOne({_id: req.params.id})
    res.json({ message: 'Deleted Genre' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a genre by ID
async function getGenre(req, res, next) {
  let genre;
  try {
    genre = await Genre.findById(req.params.id);
    if (genre == null) {
      return res.status(404).json({ message: 'Cannot find genre' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.genre = genre;
  next();
}

module.exports = router;
