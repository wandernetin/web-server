const path = require('path');
const express = require('express');

const app = express();

const viewsPath = path.join(__dirname, '../template');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Neto'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About!!',
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!!',
        message: 'This is the help message.'
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