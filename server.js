const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('dashboard');
});

app.get('/coursereg', (req, res)=>{
    res.render('courseForm');
})


app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})