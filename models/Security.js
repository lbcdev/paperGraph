var mongoose = require('mongoose');

var SecuritySchema = new mongoose.Schema({
	mac: String,
	vendor: String,
	fqdn: String,
	ipv4: String
});

mongoose.model('Security', SecuritySchema);