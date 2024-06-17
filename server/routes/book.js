const express = require('express');
const router = express.Router();
const Book = require('../models/book');

/**
 * @dev get all books
 */
router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('genreId');
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


/**
 * @dev add new book
 */
router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name,
        genreId: req.body.genreId,
        image: req.body.image
    });

    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

/**
 * @dev get single book
 */
router.get('/:id', getBook, (req, res) => {
    res.json(res.book);
});


router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        book.name = req.body.name;
        book.genreId = req.body.genreId;
        book.image = req.body.image;
        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Book.deleteOne({_id: req.params.id});
        res.json({ message: 'Deleted Book' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getBook(req, res, next) {
    let book;
    try {
        book = await Book.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Cannot find book' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.book = book;
    next();
}

module.exports = router;
