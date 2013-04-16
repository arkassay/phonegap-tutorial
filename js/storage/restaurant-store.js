var RestaurantStore = function(successCallback, errorCallback) {

    this.findByName = function(searchKey, callback) {
        var restaurants = this.restaurants.filter(function(element) {
            return element.restaurantName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
        });
        callLater(callback, restaurants);
    }

    this.findById = function(id, callback) {
        var restaurants = this.restaurants;
        var restaurant = null;
        var l = restaurants.length;
        for (var i=0; i < l; i++) {
            if (restaurants[i].id === id) {
                restaurant = restaurants[i];
                break;
            }
        }
        callLater(callback, restaurant);
    }

    // Used to simulate async calls. This is done to provide a consistent interface with stores (like WebSqlStore)
    // that use async data access APIs
    var callLater = function(callback, data) {
        if (callback) {
            setTimeout(function() {
                callback(data);
            });
        }
    }

    this.restaurants = [
            {"id": 1, "restaurantName": "Bistango", "city":"New York, NY", "phone":"212-999-8887", "email":"info@bistango.com"},
            {"id": 2, "restaurantName": "Eataly", "city":"New York, NY", "phone":"212-999-8887", "email":"info@eataly.com"},
            {"id": 3, "restaurantName": "Mozzerellis", "city":"New York, NY", "phone":"212-999-8887", "email":"info@mozzerellis.com"},
			{"id": 4, "restaurantName": "Hale and Hearty", "city":"New York, NY", "phone":"212-999-8887", "email":"info@haleandhearty.com"},            
			{"id": 5, "restaurantName": "Barbuonia", "city":"New York, NY", "phone":"212-999-8887", "email":"info@barbuonia.com"},
			{"id": 6, "restaurantName": "Potbellys", "city":"New York, NY", "phone":"212-999-8887", "email":"info@potbellys.com"},
			{"id": 7, "restaurantName": "Chipotle", "city":"New York, NY", "phone":"212-999-8887", "email":"info@chipotle.com"},
			{"id": 8, "restaurantName": "Rhong Tiam", "city":"New York, NY", "phone":"212-999-8887", "email":"info@rhongtiam.com"},
        ];

    callLater(successCallback);

}