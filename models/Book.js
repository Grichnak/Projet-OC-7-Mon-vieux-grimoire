//Ce code définit un schéma de modèle pour les livres dans une base de données MongoDB en utilisant Mongoose. Le schéma inclut des informations telles que l'identifiant de l'utilisateur, le titre du livre, l'auteur, l'URL de l'image, l'année de publication, le genre, les évaluations, et la note moyenne. 

const mongoose = require('mongoose');

//Définition du schéma du livre :
const bookSchema = mongoose.Schema({

    userId: { type: String, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String, required: true },
            grade: { type: Number, required: true }
        }
    ],
    averageRating: { type: Number, required: true }
});

//Exportation du modèle de livre :
module.exports = mongoose.model('Book', bookSchema);