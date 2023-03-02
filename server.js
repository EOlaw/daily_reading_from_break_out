const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('WELCOME')
})

app.listen(3300, () => {
    console.log('listening on port http://localhost:3300')
})