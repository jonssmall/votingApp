'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	title:  String,
	author: String,	
	options: [{ body: String, votes: Number }],		
	voters: [{ username: String, ipAddress: String }]
});

module.exports = mongoose.model('User', User);