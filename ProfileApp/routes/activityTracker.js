var express = require("express");
var router = express.Router();
var util = require('../utils/mongoutil');


/*
* Get a Activity Tracker for an id
*/
router.get('/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('activityTrackers');

    var actvityTrackerId = req.params.id;

    collection.find({"_id" : actvityTrackerId },{},function(e,docs){
        res.json(docs);
    });

});



/*
 * POST to add an activity tracker
 */
 router.post('/addactivitytracker', function(req, res) {

 	var db = req.db;
 	var collection = db.get("activityTrackers");

 	// Generate an ID for Activity Tracker object from utils
    var activityTrackerUUID = util.generateID();

    var activityTrackerObj = req.body;
    activityTrackerObj._id = activityTrackerUUID.toString();

	collection.insert(activityTrackerObj, function(err, result){
        res.send(
            (err === null) ? { "result": true } : { "result" : false, msg: err }
        );
    });
 });


/*
 * Put to Update an Acticity Tracker.
 */
router.put('/updateactivitytracker/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('activityTrackers');

    var activityTrackerObj = req.body;
    var activityTrackerToUpdate = req.params.id;

    collection.update({"_id" : activityTrackerToUpdate} , {$set: activityTrackerObj} , function(err, result){
        res.send(
            (err === null) ? { "result" : true } : { "result" : false,  msg: err }
        );
    });
});


/*
 * DELETE to delete an activity Tracker.
 */
router.delete('/deleteactivitytracker/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('activityTrackers');
    var activityTrackerToDelete = req.params.id;
    collection.remove({ '_id' : activityTrackerToDelete }, function(err) {
        res.send((err === null) ? { "result" :  true } : { "result" : false, msg:'error: ' + err });
    });
});


module.exports = router;