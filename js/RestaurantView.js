var RestaurantView = function(restaurant){
	this.render = function() {
	    this.el.html(RestaurantView.template(restaurant));
		//retrieve address and print on page from latitude & longitude
		if(restaurant.latitude && restaurant.longitude){
			this.googleMapFunctions = new GoogleMapsFunction().reverseGeocoder(restaurant.latitude, restaurant.longitude);
		}
		return this;
	};
	
	//add location to the restaurant profile page
	this.addLocation = function(event) {
	    event.preventDefault();
	    //console.log('addLocation');
	    navigator.geolocation.getCurrentPosition(
	        function(position) {
	            $('.location', this.el).html(position.coords.latitude + ',' + position.coords.longitude);
	        },
	        function() {
	            alert('Error getting location');
	        });
	    return false;
	};
	
	this.showLocation = function(event){
		event.preventDefault();
		var latitude = restaurant.latitude;
		var longitude = restaurant.longitude;
		
		if(latitude && longitude){
			this.googleMap = new GoogleMapsFunction().renderMap(restaurant);
		}else{
			//no location has been added for this entry
			alert("no location added, add now!")
		}
		
		
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
		this.el.on('click', '.showmap', this.showLocation);
		
	};
	
	this.initialize();
}
RestaurantView.template = Handlebars.compile($("#restaurant-tpl").html());
function toggleBounce() {

  if (marker.getAnimation() != null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
