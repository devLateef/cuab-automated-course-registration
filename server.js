const express = require('express');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();

const app = express();

const port = process.env.PORT

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('dashboard');
});

app.get('/coursereg', (req, res)=>{
    res.render('courseForm');
});

app.get('/coursemanager', (req, res)=>{
    res.render('coursemanager');
});


app.listen(port, ()=>{
    console.log(`App listening on port ${port}`);
})