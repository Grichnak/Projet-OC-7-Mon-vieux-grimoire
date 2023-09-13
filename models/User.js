//Importation des modules nécessaires :
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Définition du schéma de l'utilisateur :
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

//Exportation du modèle d'utilisateur :
module.exports = mongoose.model('User', userSchema);