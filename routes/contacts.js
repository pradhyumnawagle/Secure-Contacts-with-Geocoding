var express = require('express');
var router = express.Router();

var database = require('./database')

var map = require('mapbox');
var token = 'pk.eyJ1IjoicHdhZ2xlIiwiYSI6ImNrM2R5ZDNyNDEyMzQzcHBic2lhNmdmbTIifQ.xrRwOUm9iPUDGFgl1YqiAg';
var mapClient = new map(token);

var ensureLoggedIn = function(req, res, next) {
	if ( req.user ) {
		next();
	}
	else {
		res.redirect("/login");
	}
}


router.get('/',ensureLoggedIn, function(req,res){
	database.getAllContacts().find().toArray(function(err,result){
		if(!err){
			res.render('contacts', {contacts: result});
		}
	});
});


module.exports=router;