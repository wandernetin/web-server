const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for express template
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');

// Setup handlebars engine and view locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Neto'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About!!',
        name: 'Neto'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!!',
        message: 'This is the help message.',
        name: 'Neto'
    });
})
 app.get('/weather', (req, res) => {
    res.send({
        location: 'Brisbane',
        forecast: 'Partly cloud'
    });
 });

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});