var express = require('express');
var router = express.Router();
var util = require('../utils/mongoutil');

var trackerUser = "System";


/* GET list of Activities */
router.get('/list', function(req, res) {
    var db = req.db;
    var collection = db.get('activities');

    // User Id from session and passed thru Query param for now
    var requestedUserID = req.query.userId;

    // Get all the System activities and User created activities (Custom activity) 
    collection.find({ $or : [{"createdBy" : trackerUser }, {"createdBy" : requestedUserID}]},{},function(e,docs){

        res.json(docs);
    });
});


/* GET Activity details */
router.get('/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('activities');

    var actvityId = req.params.id;

    collection.find({"_id" : actvityId },{},function(e,docs){

        res.json(docs);
    });
});


/*
 * POST to add an activity
 */
router.post('/addactivity', function(req, res) {
    var db = req.db;
    var collection = db.get('activities');

    // Generate an ID for Activity object from utils
    var activityUUID = util.generateID();

    var activityObj = req.body;

    activityObj._id =  activityUUID.toString();

    collection.insert(activityObj, function(err, result){
        res.send(
            (err === null) ? { "result": true } : { "result" : false, msg: err }
        );
    });

});


/*
 * Put to Update an Acticity.
 */
router.put('/updateactivity/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('activities');

    var activityObj = req.body;
    var activityToUpdate = req.params.id;

    collection.update({"_id" : activityToUpdate} , {$set: activityObj} , function(err, result){
        res.send(
            (err === null) ? { "result" : true } : { "result" : false,  msg: err }
        );
    });
});


/*
 * DELETE to delete an activity.
 */
router.delete('/deleteactivity/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('activities');
    var activityToDelete = req.params.id;
    collection.remove({ '_id' : activityToDelete }, function(err) {
        res.send((err === null) ? { "result" :  true } : { "result" : false, msg:'error: ' + err });
    });
});


module.exports = router;
