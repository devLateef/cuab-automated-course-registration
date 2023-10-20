const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'courseForm.html'));
})
app.listen(3000, ()=>{
    console.log('App listening on port 3000');
})