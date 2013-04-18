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
	
	this.renderMap = function(restaurant){
		var map;
		latitude = restaurant.latitude;
		longitude = restaurant.longitude;
		var restaurantMarker = new google.maps.LatLng(latitude,longitude);
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
	}
	
	this.initialize = function(){
		console.log("initializing googlemapsfunction");
	}
	//this.initialize();

}