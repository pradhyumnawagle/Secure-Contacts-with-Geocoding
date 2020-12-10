var express = require('express');
var router = express.Router();

var database = require('./database')

var map = require('mapbox');
var token = 'pk.eyJ1IjoicHdhZ2xlIiwiYSI6ImNrM2R5ZDNyNDEyMzQzcHBic2lhNmdmbTIifQ.xrRwOUm9iPUDGFgl1YqiAg';
var mapClient = new map(token);


router.get("/", function(req,res){
	res.render("mailer",{});
});

router.get("/mailer", function(req,res){
	res.render("mailer",{});
});

var ensureLoggedIn = function(req, res, next) {
    if ( req.user ) {
        next();
    }
    else {
        res.redirect("/login");
    }
}


router.post('/mailer',function(req,res){
	var userInfo =new Object();
    	userInfo.prefix = req.body.prefix;
    	userInfo.firstName = req.body.firstName;
    	userInfo.lastName = req.body.lastName;
    	userInfo.street = req.body.street;
    	userInfo.city = req.body.city;
    	userInfo.state = req.body.state;
    	userInfo.zip = req.body.zip;
    	userInfo.phone = req.body.phone;
    	userInfo.email = req.body.email;
    	if(req.body.anyCB != "any"){
    		if(req.body.phoneCB !="phone"){
    			userInfo.contactbyphone = "No";
    		} else{
    			userInfo.contactbyphone = "Yes";
    		}
    		if(req.body.mailCB !="mail"){
    			userInfo.contactbymail = "No";
    		} else{
    			userInfo.contactbymail = "Yes";
    		}
    		if(req.body.emailCB !="email"){
    			userInfo.contactbyemail = "No";
    		} else{
    			userInfo.contactbyemail = "Yes";
    		}

    	} else{
    		userInfo.contactbyphone = "Yes";
    		userInfo.contactbymail = "Yes";
    		userInfo.contactbyemail = "Yes";
    	}   

    var address = userInfo.street+", "+userInfo.city+", "+userInfo.state+" "+userInfo.zip;	
    mapClient.geocodeForward(address,function(err,info,res){
    	var long = info.features[0].center[0];
        var lat = info.features[0].center[1];
        userInfo.longitude = long;
        userInfo.latitude = lat;

        database.addContact(userInfo);
    	console.log("Contact added!!" + userInfo.firstName);
    });    
    res.render('thankyou',{user:userInfo});

});

router.post("/update",ensureLoggedIn, function(req,res){

        console.log("UPDATE REQUEST!!");
        var userInfo =new Object();
        userInfo.id = req.body.id;
        userInfo.prefix = req.body.prefix;
        userInfo.firstName = req.body.firstName;
        userInfo.lastName = req.body.lastName;
        userInfo.street = req.body.street;
        userInfo.city = req.body.city;
        userInfo.state = req.body.state;
        userInfo.zip = req.body.zip;
        userInfo.phone = req.body.phone;
        userInfo.email = req.body.email;
        if(req.body.anyCB != "any"){
            if(req.body.phoneCB !="phone"){
                userInfo.contactbyphone = "No";
            } else{
                userInfo.contactbyphone = "Yes";
            }
            if(req.body.mailCB !="mail"){
                userInfo.contactbymail = "No";
            } else{
                userInfo.contactbymail = "Yes";
            }
            if(req.body.emailCB !="email"){
                userInfo.contactbyemail = "No";
            } else{
                userInfo.contactbyemail = "Yes";
            }

        } else{
            userInfo.contactbyphone = "Yes";
            userInfo.contactbymail = "Yes";
            userInfo.contactbyemail = "Yes";
        }   
        console.log("phone, email, mail " + userInfo.contactbyphone + userInfo.contactbyemail + userInfo.contactbyMail );
    var address = userInfo.street+", "+userInfo.city+", "+userInfo.state+" "+userInfo.zip;  
    mapClient.geocodeForward(address,function(err,info,res){
        var long = info.features[0].center[0];
        var lat = info.features[0].center[1];
        userInfo.longitude = long;
        userInfo.latitude = lat;
        console.log("Contact id: " + userInfo.id);
        database.updateContact(userInfo);
        //console.log("Contact added!!" + userInfo.firstName);
    });    
    res.render('thankyou',{user:userInfo});       

 });

router.post('/create',ensureLoggedIn,  function(req,res){
    
var userInfo =new Object();
        userInfo.prefix = req.body.prefix;
        userInfo.firstName = req.body.firstName;
        userInfo.lastName = req.body.lastName;
        userInfo.street = req.body.street;
        userInfo.city = req.body.city;
        userInfo.state = req.body.state;
        userInfo.zip = req.body.zip;
        userInfo.phone = req.body.phone;
        userInfo.email = req.body.email;
        if(req.body.anyCB != "any"){
            if(req.body.phoneCB !="phone"){
                userInfo.contactbyphone = "No";
            } else{
                userInfo.contactbyphone = "Yes";
            }
            if(req.body.mailCB !="mail"){
                userInfo.contactbymail = "No";
            } else{
                userInfo.contactbymail = "Yes";
            }
            if(req.body.emailCB !="email"){
                userInfo.contactbyemail = "No";
            } else{
                userInfo.contactbyemail = "Yes";
            }

        } else{
            userInfo.contactbyphone = "Yes";
            userInfo.contactbymail = "Yes";
            userInfo.contactbyemail = "Yes";
        }   

    var address = userInfo.street+", "+userInfo.city+", "+userInfo.state+" "+userInfo.zip;  
    mapClient.geocodeForward(address,function(err,info,res){
        var long = info.features[0].center[0];
        var lat = info.features[0].center[1];
        userInfo.longitude = long;
        userInfo.latitude = lat;

        database.addContact(userInfo);
        console.log("Contact added!!" + userInfo.firstName);
    });    
    res.render('contacts',{contacts:userInfo});

});

router.post('/delete',ensureLoggedIn,  function(req,res){
	console.log("id: " + req.body.id);
    database.deleteContact(req.body.id,function(err,result){
        if(err) console.log("Delete Error!!");
        else res.end();
    });
});

router.get('/logout', function (req, res){
    req.logout();
    res.redirect('/logout');
});



module.exports = router;