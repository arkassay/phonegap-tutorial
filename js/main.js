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
		    var self = this;
			var hash = window.location.hash;
		    //no hash, display home view
			if (!hash) {
		        if (this.homePage) {
					this.slidePage(this.homePage);
				} else {
				    this.homePage = new HomeView(this.store).render();
				    this.slidePage(this.homePage);
				}
				return;
		    }
			//hash, render the view and pass teh correct data
		    var match = hash.match(this.detailsURL);
		    if (match) {
		        this.store.findById(Number(match[1]), function(restaurant) {
					self.slidePage(new RestaurantView(restaurant).render());
				});
		    }
		},
	slidePage: function(page) {

	    var currentPageDest,
	        self = this;

	    // If there is no current page (app just started) -> No transition: Position new page in the view port
	    if (!this.currentPage) {
	        $(page.el).attr('class', 'page stage-center');
	        $('body').append(page.el);
	        this.currentPage = page;
	        return;
	    }

	    // Cleaning up: remove old pages that were moved out of the viewport
	    $('.stage-right, .stage-left').not('#homePage').remove();

	    if (page === app.homePage) {
	        // Always apply a Back transition (slide from left) when we go back to the search page
	        $(page.el).attr('class', 'page stage-left');
	        currentPageDest = "stage-right";
	    } else {
	        // Forward transition (slide from right)
	        $(page.el).attr('class', 'page stage-right');
	        currentPageDest = "stage-left";
	    }

	    $('body').append(page.el);

	    // Wait until the new page has been added to the DOM...
	    setTimeout(function() {
	        // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
	        $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
	        // Slide in the new page
	        $(page.el).attr('class', 'page stage-center transition');
	        self.currentPage = page;
	    });

	},
	
    initialize: function() {
        var self = this;
		//regular expression to match restaurant details urls
		this.detailsURL = /^#restaurants\/(\d{1,})/;
		//events to listen to
		this.registerEvents();
		this.store = new WebSqlRestaurantStore(function() {
		    //figure out the view to display
			self.route();
		});
		this.googlemapfunctions = new GoogleMapsFunction();
	}

};

app.initialize();