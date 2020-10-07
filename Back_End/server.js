const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const url = "mongodb+srv://kangkan:Pathsala@123@mygrocery-u9tcl.mongodb.net/test?retryWrites=true&w=majority";

const dbName = "Bizz2Credit_Database";

// function verifyToken(req,res,next){
//     if(!req.header.authorization){
//         res.status(401).send('Unauthorized request');
//     }
//     let token = req.header.authorization.split(' ')[1];
//     if(token =='null'){
//         return res.status(401).send('Unauthorized request');
//     }
//     let payload = jwt.verify(token,'secretkey');
//     if(!payload){
//         return res.status(401).send('unauthorized request');
//     }
//     req.userId = payload.subject;
//     next();
// }


router.post('/api/v1/users', cors(), async (req, res, next) => {
    try {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            let userdata = req.body;
            const collection = db.collection('userDetails');
            collection.insertOne(userdata, (err, results) => {
                if (err) {
                    console.log(err);
                } else {
                    let payload = { subject: results._id };
                    let token = jwt.sign(payload, 'secretkey')
                    res.status(200).send({ token, id: results._id });
                }
            })
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
});
router.post('/api/v1/session', cors(), async (req, res, next) => {
    try {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            let userdata = req.body;
            const collection = db.collection('sessionDetails');
            collection.insertOne(userdata, (err, results) => {
                if (err) {
                    console.log('Printing the error' + err);
                } else
                    if (!results) {
                        res.status(401).send('user not found');
                    } else
                        if (userdata.password != results.password) {
                            res.status(401).send('password doesnt match');
                        } else {
                            let payload = { subject: results._id };
                            console.log('printing the id' + results._id);
                            let token = jwt.sign(payload, 'secretkey');
                            res.status(200).send({ token, id: results._id });
                        }
            })
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
});


router.get('/api/v1/users', cors(), async (req, res, next) => {
    try {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            const db = client.db(dbName);
            const collection = db.collection('userDetails');
            collection.find({}).toArray(function (err, docs) {
                assert.equal(err, null);
                res.json(docs);
            });
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
});

router.put('/api/v1/users/:id', cors(), async (req, res, next) => {
    try {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            var item = req.body;
            delete item._id;
            const db = client.db(dbName);
            const collection = db.collection('userDetails');
            collection.insertOne(item, function (err, results) {
                assert.equal(err, null);
                res.json(results);
            });
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
})

router.delete('/api/v1/users/:id', cors(), async (req, res, next) => {
    try {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            var item = req.body;

            const db = client.db(dbName);
            const collection = db.collection('userDetails');
            collection.deleteOne(item, function (err, results) {
                assert.equal(err, null);
                res.json(results);
            });
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
})

router.delete('/api/v1/session', cors(), async (req, res, next) => {
    try {
        MongoClient.connect(url, function (err, client) {
            assert.equal(null, err);
            var item = req.body;

            const db = client.db(dbName);
            const collection = db.collection('sessionDetails');
            collection.deleteOne(item, function (err, results) {
                assert.equal(err, null);
                res.json(results);
            });
            client.close();
        });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;