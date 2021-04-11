var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    order = require(__dirname+'/src/models/orders'),
    ingredients = require(__dirname+'/src/models/ingredients'),
    registration = require(__dirname+'/src/models/registration'),
    jwt = require('jsonwebtoken'),
    app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect('mongodb://localhost/burgerApp', { useNewUrlParser: true });

app.post('/register', function(req, res) {
    new registration(req.body).save().then((resp) => {
        res.send({
            status: true
        })
    }, (err) => {
        console.log('Error: ' + err);
    })
});

app.post('/authenticate', function(req, res) {
    var token = jwt.sign({userName: req.body.email}, 'secret-key', {
        expiresIn: '1h'
    });

    if (req.body.email && req.body.password) {
        registration.find({email: req.body.email, password: req.body.password})
            .exec((err, userData) => {
                if(err) {
                    res.send({
                        error: 'Please enter valid credentials'
                    })
                } else {
                    if(userData.length > 0) {
                        res.send({
                            id: userData[0]._id,
                            isLoggedIn: true,
                            expiresIn: 3600,
                            token: token
                        })
                    } else {
                        res.send({
                            error: 'Please enter valid credentials'
                        })
                    }
                }
            })
    } else {
        res.send({
            error: 'Please enter valid credentials'
        })
    }
});

app.get('/ingredients', function(req, res) {
    ingredients.find({}, function (err, data) {
        if(err) {
            console.log('Error :' + err);
        }
        else {
            const newData = [];
            for(let i=0; i<data.length; i++) {
                const newObj = {};
                newObj.salad = data[i].salad;
                newObj.bacon = data[i].bacon;
                newObj.cheese = data[i].cheese;
                newObj.meat = data[i].meat;
                newData.push(newObj)
            }
            res.send({
                ingredients: newData
            })
        }
    })
});

app.use(function(req, res, next){
    const token = req.body.authtoken || req.query.authtoken || req.headers['authtoken'];

    jwt.verify(token, 'secret-key', function(err, decoded) {
        if(err) {
            res.send({
                err: true,
                msg: 'Invalid Request'
            })
        } else {
            req.decoded = decoded;
            next();
        }
    })
});

app.post('/orders', function (req, res) {
    new order(req.body).save().then((resp) => {
        res.send({
            status: resp
        })
    }, (err) => {
        console.log('Error : ' + err);
    })
});

app.get('/orders', function(req, res) {
    order.find({userId: req.query.orderBy}, function(err, data) {
        if(err) {
            console.log('Error : ' + err);
        } else {
            res.send({
                data: data
            })
        }
    })
});

app.listen('4000', function() {
    console.log('App is running @localhost:4000');
});
