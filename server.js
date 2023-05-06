const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');
const fs = require('fs');



//Set the view engine to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));


//configure app
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/img', express.static(__dirname + 'public/img')) //to load images


app.get('/janay', (req, res) => {
    res.render('welcome')
})

//Making JSON file readable
const owner = JSON.parse(
    fs.readFileSync(`${__dirname}/api/owner.json`)
)
const readings = JSON.parse(
    fs.readFileSync(`${__dirname}/api/reading.json`)
)

app.get('/', (req, res) => {
    //console.log(readings[4])
    res.send(`
    <h1 style="text-align:center"> ${readings[0].title} </h1>
    <h2> Author: ${owner.author} </h2>
    <p>  <b> Quote by ${owner.author}: </b> "${readings[0].motivational} </p>
    <p>  <b> Quote by ${owner.author}: </b> "${readings[0].bibleChapter} </p>
    <p>  <b> Quote by ${owner.author}: </b> "${readings[0].reading} </p>
    `)
})




app.get('/api/v1/readings', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: readings.length,
        data: {
            readings
        }
    })
})
app.post('/api/v1/readings', (req, res) => {
    //console.log(req.body)
    const newId = readings[readings.length - 1].id + 1;
    const newReadings = Object.assign({ id: newId }, req.body);

    readings.push(newReadings);
    fs.writeFile(`${__dirname}/api/reading.json`, JSON.stringify(readings), err => {
        res.status(201).json({
            status: 'success',
            data: { 
                reading: newReadings
            }
        })
    })
})

app.get('/api/v1/readings/:id', (req, res, next) => {
    console.log(req.params)
    next()
})


const date = new Date();
console.log(date)


app.listen(4400, () => {
    console.log('listening on port http://localhost:4400')
})