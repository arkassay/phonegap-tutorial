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
		var restaurantMarker = new google.maps.LatLng(latitude,longitude);
		
		if(latitude && longitude){
			var map;
			var mapOptions = {
			    zoom: 8,
			    center: restaurantMarker,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
			map = new google.maps.Map(document.getElementById('map-canvas'),
			      mapOptions);
			var contentString = '<div id="content">'+
				      '<div id="siteNotice">'+
				      '</div>'+
				      '<h1 id="firstHeading" class="firstHeading">'+ restaurant.restaurantName +'</h1>'+
				      '<div id="bodyContent">'+
				      '<p>Phone Number: '+restaurant.phone+'</p>'+
					  '<p>Phone Number: '+restaurant.email+'</p>'+
				      '</div>'+
				      '</div>';

		    var infowindow = new google.maps.InfoWindow({
				  content: contentString
			});
			
			//create restaurant marker
			marker = new google.maps.Marker({
				 map:map,
				 draggable:true,
				 animation: google.maps.Animation.DROP,
				 position: restaurantMarker
			});
			//google.maps.event.addListener(marker, 'mouseover', toggleBounce);
			//google.maps.event.addListener(marker, 'mouseout', toggleBounce);
			google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(map,marker);
			  });
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
