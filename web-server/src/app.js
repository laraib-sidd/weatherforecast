const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');

// Intialising Express app
const app = express()

// Setting up file paths
const filePath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname, '../Templates/partials')

// Setting up handlebars
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setting up static globalPath
app.use(express.static(filePath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main Page'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help"
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: "Help Article not found",
    })
})

app.get('/weather', (req, res) => {
    const {
        address
    } = req.query;
    if (!address) {
        return res.send({
            error: "Provide a address string to process the result"
        })
    }
    forecast.fetchData(address, (err, {
        weather,
        location
    } = {}) => {
        if (err) {
            res.send({
                error: err
            })
        } else {
            res.send({
                weather,
                location
            })
        }
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: "Page not found"
    })
})


app.listen(3003, () => {
    console.log('The server is running on 3002');
})