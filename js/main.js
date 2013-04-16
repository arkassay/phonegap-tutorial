var app = {
	
	showAlert: function (message, title) {
	    if (navigator.notification) {
	        navigator.notification.alert(message, null, title, 'OK');
	    } else {
	        alert(title ? (title + ": " + message) : message);
	    }
	},
	registerEvents: function() {
	    var self = this;
	    // Check of browser supports touch events...
	    if (document.documentElement.hasOwnProperty('ontouchstart')) {
	        // ... if yes: register touch event listener to change the "selected" state of the item
	        $('body').on('touchstart', 'a', function(event) {
	            $(event.target).addClass('tappable-active');
	        });
	        $('body').on('touchend', 'a', function(event) {
	            $(event.target).removeClass('tappable-active');
	        });
	    } else {
	        // ... if not: register mouse events instead
	        $('body').on('mousedown', 'a', function(event) {
				console.log('mousedown');
	            $(event.target).addClass('tappable-active');
	        });
	        $('body').on('mouseup', 'a', function(event) {
	            $(event.target).removeClass('tappable-active');
	        });
	    }
		//event listener to URL hash tag changes
		$(window).on('hashchange', $.proxy(this.route, this));
	},
	route: function() {
	    var hash = window.location.hash;
	    //no hash, display home view
		if (!hash) {
	        $('body').html(new HomeView(this.store).render().el);
	        return;
	    }
		//hash, render the view and pass teh correct data
	    var match = hash.match(app.detailsURL);
	    if (match) {
	        this.store.findById(Number(match[1]), function(restaurant) {
	            $('body').html(new RestaurantView(restaurant).render().el);
	        });
	    }
	},
    initialize: function() {
        var self = this;
		//regular expression to match restaurant details urls
		this.detailsURL = /^#restaurants\/(\d{1,})/;
		//events to listen to
		this.registerEvents();
		this.store = new RestaurantStore(function() {
		    //figure out the view to display
			self.route();
		});
	}

};

app.initialize();