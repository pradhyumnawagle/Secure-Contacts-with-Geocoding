var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var async = require('async');
var url = "mongodb://localhost:27017/CMPS369";

exports.establishConnection = function(){
    MongoClient.connect(url, function(err, db){
        if (err){
            console.error(err);
            return;
        }
        console.log("Connection established!!!");

        database = db.db("CMPS369");
        database.createCollection('contacts', function(err,res){
			if (err){
				console.log(err);
				return;
			}
			else {
				console.log("Collection created!!!");
				contacts = database.collection('contacts');
			}
		});
	});
 }

exports.addContact = function(contact){
    	database.collection('contacts').insertOne({
            firstName: contact['firstName'],
            lastName: contact['lastName'],
            prefix: contact['prefix'],
            street: contact['street'],
            city: contact['city'],
            state: contact['state'],
            zip: contact['zip'],
            phone: contact['phone'],
            email: contact['email'],
            contactbyMail: contact['contactbymail'],
            contactbyEmail: contact['contactbyemail'],
            contactbyPhone: contact['contactbyphone'],
            longitude: contact['longitude'],
            latitude: contact['latitude']
        }, function(err, result){
            console.log('ID returned: '+ result.insertedId);
        })
}

exports.getAllContacts = function(){
    return contacts;
}

exports.updateContact = function(contact,callback){
    console.log("ID of the user:" + contact.id);
    database.collection('contacts').updateOne({"_id" : ObjectId(contact.id)}, {
        $set : {
            prefix: contact.prefix,
            firstName: contact.firstName,
            lastName: contact.lastName,
            street: contact.street,
            city: contact.city,
            state: contact.state,
            zip: contact.zip,
            phone: contact.phone,
            email: contact.email,
            contactbyMail: contact.contactbymail,
            contactbyEmail: contact.contactbyemail,
            contactbyPhone: contact.contactbyphone,
            longitude: contact.longitude,
            latitude: contact.latitude
        }

    }, function(err, result){
        if(err){
            console.log(err);
        }
        else {
          callback &&   callback();
        }
    });
}

exports.deleteContact = function(contact, callback){
    database.collection('contacts').deleteOne({"_id": ObjectId(contact)}, 
        function (err, result) {
            callback && callback(err,result);
        }
    )
};

