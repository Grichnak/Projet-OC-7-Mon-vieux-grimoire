const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user')

const app = express();

mongoose.connect('mongodb+srv://Marek-Dimitri:Marek94@cluster0-mon-vieux-grim.qv5znwk.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json()); //mets à disposition le contenu de toutes les requetes qui contiennet du JSON
app.use(bodyParser.json());

//les headers permettent: d'accéder à notre API depuis n'importe quelle origine ( via '*' ); d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ; d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).;




app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes)

module.exports = app;

