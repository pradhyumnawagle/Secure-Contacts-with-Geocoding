var mapClient;
var token = 'pk.eyJ1IjoicHdhZ2xlIiwiYSI6ImNrM2R5ZDNyNDEyMzQzcHBic2lhNmdmbTIifQ.xrRwOUm9iPUDGFgl1YqiAg'


const mapInit = () => {
	 mapClient = L.map('mapid').setView([51.505, -0.09], 13);
  	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: token
	}).addTo(mapClient);
}

$(document).ready(function () {
	$("#update_page").hide();
	$("#create_user").hide();
	mapInit();

	var data = document.getElementById("contactstable");
	//console.log("id" + data['id']);

	for(var i=1;i<data.rows.length;i+=1){

		var userInfo;
		var contact = data.rows[i];
		cells = contact.cells.length;

		var name = contact.cells[1].innerHTML;
		var address = contact.cells[2].innerHTML + contact.cells[3].innerHTML;
		var lat = contact.cells[7].innerHTML;
		var long = contact.cells[8].innerHTML;
		//console.log(address);
		var info = name + " " + address;
		var number = contact.cells[4].innerHTML;
		//onsole.log("PhoneUp" + number);


		L.mapbox.accessToken = token; 
		var mark = L.marker([lat, long]).addTo(mapClient)
		mark.bindPopup(info);
		mark.on('mouseover', function (e) {
			     this.openPopup();
	    });
	    mark.on('mouseout', function (e) {
	        this.closePopup();
	    });
		
		}
		
	
	$("#contactstable").on("click","tr", function() {
			var lat = $(this).data("latitude");
			var lng = $(this).data("longitude");
	        mapClient.flyTo([lat,lng]);
	});		
 

	$("#contactstable").on("click", "#updatecontact", function(){
    
    	//var data = $(this).parent();
    	//data = data.parent();
    	//data = data.data('details');

    	//console.log(data.firstName);
    	//console.log("updatecontact");
    	$("#create_user").hide();
    	mask(false,true);
    	//console.log(info.firstName);
	    var id=$(this).data("id");
	  //  console.log("ID: " + id);
	    var prefix = $(this).data("prefix");
	    console.log("Prefix: " + prefix);
	    var firstName = $(this).data("firstname");
	    console.log("FirstName: " + firstName);
	    var lastName = $(this).data("lastname");
	    console.log("LastName: " + lastName);
	    var street= $(this).data("street");
	    var city= $(this).data("city");
	    var state=$(this).data("state");
	    var zip = $(this).data("zip");
	    var phone = $(this).data("phone");
	    var email=$(this).data("email");
	    var contactbyPhone=$(this).data("contactbyphone");
	    var contactbyEmail=$(this).data("contactbyemail");
	    var contactbyMail=$(this).data("contactbymail");
	   console.log("phone, email, mail " + contactbyPhone + contactbyEmail + contactbyMail );
		    
	    //$('#firstName').val(firstName);
	    //$('#lastName').val(lastName);
	    //console.log(firstName);

	    $('#update_page input[name=firstName]').val(firstName);
	    $('#update_page input[name=lastName').val(lastName);
	    $('#update_page input[name=street]').val(street);
	    $('#update_page input[name=city]').val(city);
	    $('#update_page select[name=state]').val(state).attr('selected', 'selected');
	    $('#update_page input[name=zip]').val(zip);
	    $('#update_page input[name=phone]').val(phone);
	    $('#update_page input[name=email]').val(email);
	    $('#update_page input[name=id]').val(id);

	    if (prefix == "Mr.") $('#update_page input[name="prefix"][value="Mr."]').prop('checked', true);
	    if (prefix == "Mrs.") $('#update_page input[name="prefix"][value="Mrs."]').prop('checked', true);
	    if (prefix == "Ms.") $('#update_page input[name="prefix"][value="Ms."]').prop('checked', true);
	    if (prefix == "Dr.")  $('#update_page input[name="prefix"][value="Dr."]').prop('checked', true);

	    
	    if (contactbyMail == "Yes") $('#update_page input[name="mailCB"][value="mail"]').prop('checked', true);
	    if (contactbyPhone == "Yes")$('#update_page input[name="phoneCB"][value="phone"]').prop('checked', true);
	    if (contactbyEmail == "Yes") $('#update_page input[name="emailCB"][value="email"]').prop('checked', true);

	});



	$("#search").on("keyup", function(){
    var value = $(this).val().toLowerCase();
    $("#contactstablebody tr").filter(function(){
      $(this).toggle($(this).text().toLowerCase().indexOf(value)>-1)
    });
  });

	$("#contactstable").on("click", "#deletecontact", function(){
	  
	  var id  = $(this).data("id");
	  console.log(id);
	  var name = $(this).data("firstName");
	  var lat = $(this).data("latitude");
	  var lon = $(this).data("longitude");
	  var phone = $(this).data("phone");
	  console.log("Phone" + phone);

	  var location="lat"+"lon";

	  $.post('/delete', {id : id});
	  $(this).parent().parent().remove();
  	});
  

});


function mask(contacts, update){
   contacts? $('#display_allcontacts').show() : $('#display_allcontacts').hide();
  update? $('#update_page').show() : $('#update_page').hide();

 }