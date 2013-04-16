var RestaurantView = function(restaurant){
	this.render = function() {
	    this.el.html(RestaurantView.template(restaurant));
		return this;
	};
	
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
	
	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
	    this.el = $('<div/>');
		this.el.on('click', '.add-location-btn', this.addLocation);
	};
	this.initialize();
}
RestaurantView.template = Handlebars.compile($("#restaurant-tpl").html());