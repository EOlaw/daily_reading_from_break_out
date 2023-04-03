const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');
const apis = require('./api/daily_reading')



//Set the view engine to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));


//configure app
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(__dirname + 'public/img')) //to load images



app.get('/', (req, res) => {
    res.render('welcome', {apis: req.body})
    const readings = apis.readings[0];
    console.log(readings)
})

const date = new Date();
console.log(date)


app.listen(3300, () => {
    console.log('listening on port http://localhost:3300')
})