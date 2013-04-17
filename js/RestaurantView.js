var RestaurantView = function(restaurant){
	this.render = function() {
	    this.el.html(RestaurantView.template(restaurant));
		return this;
	};
	
	//add location to the restaurant profile page
	this.addLocation = function(event) {
	    event.preventDefault();
	    console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error getting location');
	        });
	    return false;
	};
	
	this.showLocation = function(){
		var latitude = restaurant.latitude;
		var longitude = restaurant.longitude;
		//console.log(latitude +", "+longitude);
		var mapOptions = {
		    zoom: 8,
		    center: new google.maps.LatLng(-34.397, 150.644),
		    mapTypeId: google.maps.MapTypeId.ROADMAP
		  };
		  map = new google.maps.Map(document.getElementById('map-canvas'),
		      mapOptions);
	}
	
	this.addToContacts = function(event){
		event.preventDefault();
		    console.log('addToContacts');
		    if (!navigator.contacts) {
		        app.showAlert("Contacts API not supported", "Error");
		        return;
		    }
		    var contact = navigator.contacts.create();
		    contact.name = {givenName: restaurant.restaurantName};
		    var phoneNumbers = [];
		    phoneNumbers[0] = new ContactField('home', restaurant.phone, true); //preferred number
		    contact.phoneNumbers = phoneNumbers;
		    contact.save();
		    alert("contact saved");
			return false;
	};
	
	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
	    this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
		this.el.on('click', '.add-contact-btn', this.addToContacts);
		this.showLocation();
	};
	this.initialize();
}
RestaurantView.template = Handlebars.compile($("#restaurant-tpl").html());