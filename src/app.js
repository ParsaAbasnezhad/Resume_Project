const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: path.join(__dirname, 'views', 'partials'),
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});



module.exports = app;