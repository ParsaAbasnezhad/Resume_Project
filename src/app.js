const express = require('express');
const connectDB = require('./cofig/db')
const projectRouter = require('./routers/project');
const exchangesRouter = require('./routers/exchanges');
const chatRouter = require('./routers/chat');
const createProjectRouter = require('./routers/create-projects');
const { engine } = require('express-handlebars');
const path = require('path');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: path.join(__dirname, 'views', 'partials'),
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

connectDB();


app.get('/', (req, res) => {
    res.render('home');
});

app.use('/projects', projectRouter);
app.use('/', chatRouter);
app.use('/', createProjectRouter)
app.use('/exchange', exchangesRouter);


module.exports = app;