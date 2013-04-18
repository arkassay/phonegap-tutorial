var GoogleMapsFunction = function(){
	
	//latitude, longitude from address
	this.geocoder = function(address){
		console.log('inside geocoder: '+address);
	};
	
	//Address lookup from latitude, longitude
	//https://developers.google.com/maps/documentation/javascript/geocoding?hl=en#ReverseGeocoding
	this.reverseGeocoder = function(lati, lngi){
		var geocoder;
		geocoder = new google.maps.Geocoder();
		var latlng = new google.maps.LatLng(lati, lngi);
		geocoder.geocode({'latLng': latlng}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			if (results[0]) {
				var	address = results[0].formatted_address;
				$('.location').append(address);
		    }
		    } else {
		        alert("Geocoder failed due to: " + status);
		    }
		});
		
	};
	
	this.initialize = function(){
		console.log("initializing googlemapsfunction");
	}
	//this.initialize();

}