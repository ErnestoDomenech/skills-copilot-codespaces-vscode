//Create Web Server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Load comments.json
var comments = [];
fs.readFile('./comments.json', 'utf8', function (err, data) {
    if (err) throw err;
    comments = JSON.parse(data);
});

//Get comments
app.get('/comments', (req, res) => {
    res.send(comments);
});

//Post comments
app.post('/comments', (req, res) => {
    var comment = {
        id: comments.length + 1,
        name: req.body.name,
        comment: req.body.comment
    };
    comments.push(comment);
    res.send(comments);
});

//Delete comments
app.delete('/comments/:id', (req, res) => {
    var id = req.params.id;
    comments.splice(id - 1, 1);
    res.send(comments);
});

//Put comments
app.put('/comments/:id', (req, res) => {
    var id = req.params.id;
    comments[id - 1].name = req.body.name;
    comments[id - 1].comment = req.body.comment;
    res.send(comments);
});

//Listen
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

