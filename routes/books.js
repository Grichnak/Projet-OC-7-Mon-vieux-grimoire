//Importation des modules nécessaires :
const express = require('express');
const router = express.Router();

const booksCtrl = require('../controllers/books');

//Définition des routes :
router.post('/', auth, multer, booksCtrl.createBook); //création de livre
router.get('/', booksCtrl.getAllBooks); //liste de tous les livres
router.get('/bestrating', booksCtrl.getBestBooks); //liste des meilleurs livres par notation
router.get('/:id', booksCtrl.getOneBook); //obtention d'un livre par son ID
router.put('/:id', auth, multer, booksCtrl.modifyBook); //modification d'un livre par son ID
router.delete('/:id', auth, booksCtrl.deleteBook); //suppression d'un livre par son ID
router.post('/:id/rating', auth, booksCtrl.ratingBook); //notation d'un livre par son ID

//Exportation du routeur :
module.exports = router;