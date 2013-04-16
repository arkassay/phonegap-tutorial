var HomeView = function(store){
 	
	this.render = function() {
	    this.el.html(HomeView.template());
		return this;
	};
	
	this.findByName = function() {
	    console.log('find by name');
		store.findByName($('.search-key').val(), function(restaurants) {
	        $('.restaurant-list').html(HomeView.liTemplate(restaurants));
	        if (self.iscroll) {
	            console.log('Refresh iScroll');
	            self.iscroll.refresh();
	        } else {
	            console.log('New iScroll');
	            self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
	        }
	    });
	};
	
	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
	    this.el = $('<div id="homePage" />');
	    this.el.on('keyup', '.search-key', this.findByName);
	};
	this.initialize();
}
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#restaurant-li-tpl").html());