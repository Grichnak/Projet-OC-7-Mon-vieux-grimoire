const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const { upload, resizeImage } = require('../middleware/multer-config')

const booksControllers = require('../controllers/books');

router.post('/', auth, multer, upload, resizeImage, booksControllers.createBook)
router.post('/:id/rating', auth, booksControllers.createRating)
router.put('/:id', auth, upload, resizeImage, booksControllers.modifyBook)
router.delete('/:id', auth, booksControllers.deleteBook)
router.get('/bestrating', booksControllers.getBestBooks)
router.get('/:id', booksControllers.getOneBook)
router.get('/', booksControllers.getAllBooks)

module.exports = router

