//Importation des modules nécessaires :
const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/books');

//Définition des routes :
router.post('/', auth, multer.imageUploader.single('image'), multer.imgResize, booksControllers.createBook);
router.put('/:id', auth, multer.imageUploader.single('image'), multer.imgResize, booksControllers.modifyBook);
router.delete('/:id', auth, booksControllers.deleteBook);
router.get('/bestrating', booksControllers.getBestRatingBooks);
router.get('/:id', booksControllers.getOneBook);
router.get('/', booksControllers.getAllBooks);
router.post('/:id/rating', auth, booksControllers.postRatingBook);

//Exportation du routeur :
module.exports = router;