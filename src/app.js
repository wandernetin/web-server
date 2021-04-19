const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

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
    var city = req.query.address;
    if (!city) {
        return res.send({
            error: "You must provide an address."
        });
    }
    geocode(city, (error, { center, place_name } = {}) => {
        if (error)
            return res.send({
                error: error
            });
        forecast(center[1], center[0], (errorForecast, { weather_descriptions, temperature, feelslike, precip } = {}) => {
            if (errorForecast)
                return res.send({
                    error: errorForecast
                });
            res.send({
                location: place_name,
                forecast: weather_descriptions[0],
                temperature: 'It is currently ' + temperature + ' degrees out.',
                feelslike: 'It feel likes ' + feelslike + ' degrees.',
                precip: 'There is a ' + precip + '% chance of rain.'
            });
        });
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Page not found.',
        name: 'Neto'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});