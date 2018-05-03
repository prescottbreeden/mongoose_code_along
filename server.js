// dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const server = require('http');

const app = express();

// setup
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.static(path.join(__dirname, "./bower_components")));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Mongoose setup
var url = 'mongodb://localhost:27017/basic_mongoose_app';
mongoose.connect(url)

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})
mongoose.model('User', UserSchema);
var User = mongoose.model('User');

// routes
app.get('/', function(req, res) {
    res.render('index');
})

app.post('/user', function(req, res) {
    console.log("POST DATA", req.body);

    var user = new User({name: req.body.name, age: req.body.age});
    console.log(user);

    user.save(function(err) {
        if(err) {
            console.log('something went wrong')
        } else {
            console.log('successfully added a user!')
            res.redirect('/');
        }
    })
})

app.listen(8000, function() {
    console.log("Power Overwhelming...")
})
