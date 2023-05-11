const express = require('express');
const path = require('path');
const app = express();
const ejsMate = require('ejs-mate');
const morgan = require('morgan');

const readingRouter = require('./routes/readingRoutes')
const userRouter = require('./routes/userRoutes')


//Set the view engine to ejs
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})



app.get('/', (req, res) => {
    const time = req.requestTime
    console.log(time)
    res.render('welcome')
})

app.use('/api/v1/readings', readingRouter)
app.use('/api/v1/users', userRouter)

module.exports = app;