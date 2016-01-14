var crypto = require('crypto');

module.exports = {
	generateID : function () {
    	// Generate an ID for User object
    	var userUUID = crypto.createHash('md5').update(Math.random().toString()).digest('hex').substring(0, 24);
    	console.log("UUID for Mongo: " + userUUID);

    	return userUUID;
    }

};