const Book = require('../models/Book');
const fs = require('fs');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${res.locals.newName}`
    });
    book.save()
        .then(() => { res.status(201).json({ message: 'Livre enregistré' }) })
        .catch(error => { res.status(400).json({ error }) });
};

exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${res.locals.newName}`
    } : { ...req.body };

    delete bookObject._userId;
    Book.findOne({ _id: req.params.id })
        .then((book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifié' }))
                    .catch(error => res.status(401).json({ error }));
            }
        }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Non autorisé' })
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Livre supprimé' }) })
                        .catch(error => res.status(401).json({ error }));
                })
            };
        })
        .catch(error => {
            res.status(500).json({ error })
        });
};

exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => res.status(200).json(book))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
};

exports.getBestRatingBooks = (req, res, next) => {
    Book.find().sort({ averageRating: -1 })
        .then(books => res.status(200).json([books[0], books[1], books[2]]))
        .catch(error => res.status(400).json({ error }));
};

exports.postRatingBook = (req, res, next) => {
    const ratingObject = req.body;
    ratingObject.grade = ratingObject.rating;
    delete ratingObject.rating;

    Book.findOne({ _id: req.params.id })
        .then(book => {
            const userHaveNotRated = book.ratings.every(rating => rating.userId !== req.auth.userId)
            if (userHaveNotRated === false) {
                res.status(401).json({ message: "Livre déjà évalué par l'utilisateur" });
                return
            } else {
                Book.findOneAndUpdate({ _id: req.params.id }, { $push: { ratings: ratingObject } })
                    .then((book) => {
                        let averageRates = 0;
                        for (i = 0; i < book.ratings.length; i++) {
                            averageRates += book.ratings[i].grade;
                        };

                        averageRates /= book.ratings.length;
                        Math.round(averageRates);

                        Book.findOneAndUpdate({ _id: req.params.id }, { $set: { averageRating: averageRates }, _id: req.params.id }, { new: true })
                            .then((book) => res.status(201).json(book))
                            .catch(error => res.status(401).json({ error }));
                    })
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));

};