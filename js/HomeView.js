var HomeView = function(store){
 	
	this.render = function() {
	    this.el.html(HomeView.template());
		return this;
	};
	
	this.findByKey = function() {
		if($('.searchByName').hasClass('on')){
			store.findByName($('.search-key').val(), displayResults);
		}
		else{
			store.findByCity($('.search-key').val(), displayResults)
		}
		
	};	
	
	//not used anymore (findByKey and displayResults resplaced)
	this.findByCity = function() {
	    console.log('find by city');
		store.findByCity($('.search-key').val(), function(restaurants) {
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
	
	this.filterClick = function(event){
		event.preventDefault();
		$('.filter').removeClass('on');
		$(this).addClass('on');
		
	};
	
	this.initialize = function() {
		// Define a div wrapper for the view. The div wrapper is used to attach events.
	    this.el = $('<div id="homePage" />');
	    this.el.on('keyup', '.search-key', this.findByKey);
		this.el.on('click', '.filter', this.filterClick);
	};
	this.initialize();
}
HomeView.template = Handlebars.compile($("#home-tpl").html());
HomeView.liTemplate = Handlebars.compile($("#restaurant-li-tpl").html());

var displayResults = function(restaurants) {
    $('.restaurant-list').html(HomeView.liTemplate(restaurants));
    if (self.iscroll) {
        console.log('Refresh iScroll');
        self.iscroll.refresh();
    } else {
        console.log('New iScroll');
        self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
    }
}