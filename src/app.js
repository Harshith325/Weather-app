const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to use
app.use(express.static(publicDirectoryPath))

app.get('', (req,res)=>{
    res.render('index',{
        name: 'Harshith',
        title: 'Weather'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About',
        name: 'Harshith'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title: 'Help',
        helpText: 'Helpful text',
        name: 'Harshith'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
           return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
               return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404page', {
        title : '404',
        errorMessage : 'Help article not found',
        name: 'Harshith'
    })
})

app.get('*', (req,res) =>{
    res.render('404page', {
        title: '404',
        errorMessage : 'My 404 page',
        name: 'Harshith'
    })
})

app.listen(port , () =>{
    console.log('Server is running')
})
