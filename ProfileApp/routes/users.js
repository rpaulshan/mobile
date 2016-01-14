var express = require('express');
var router = express.Router();
var util = require('../utils/mongoutil');

/* GET users listing. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({},{},function(e,docs){

        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('users');

    // Generate an ID for User object from utils
    var userUUID = util.generateID();

    var userObj = req.body;
    //console.log("User Obj : " + JSON.stringify(req.body));
    userObj._id =  userUUID.toString();

    collection.insert(userObj, function(err, result){
        res.send(
            (err === null) ? { "result": true } : { "result" : false, msg: err }
        );
    });

});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('users');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { "result" :  true } : { "result" : false, msg:'error: ' + err });
    });
});

/*
 * Put to updateuser.
 */
router.put('/updateuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('users');

    var userObj = req.body;
    var userToUpdate = req.params.id;

    collection.update({"_id" : userToUpdate} , {$set: userObj} , function(err, result){
        res.send(
            (err === null) ? { "result" : true } : { "result" : false,  msg: err }
        );
    });
});


module.exports = router;

