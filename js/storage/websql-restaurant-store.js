var WebSqlRestaurantStore = function(successCallback, errorCallback) {

    this.initializeDatabase = function(successCallback, errorCallback) {
        var self = this;
        this.db = window.openDatabase("restaurantDB", "1.0", "restaurant Demo DB", 200000);
        this.db.transaction(
                function(tx) {
                    self.createTable(tx);
                    self.addSampleData(tx);
                },
                function(error) {
                    console.log('Transaction error: ' + error);
                    if (errorCallback) errorCallback();
                },
                function() {
                    console.log('Transaction success');
                    if (successCallback) successCallback();
                }
        )
    }

    this.createTable = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS restaurant');
        var sql = "CREATE TABLE IF NOT EXISTS restaurant ( " +
            "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "restaurantName VARCHAR(50), " +
            "city VARCHAR(50), " +
            "phone VARCHAR(50), " +
            "email VARCHAR(50), " + 
			"latitude FLOAT(10), " + 
			"longitude FLOAT(10), " + 
			"rating INTEGER, " + 
			"description TEXT)";
        
			tx.executeSql(sql, null,
                function() {
                    console.log('Create table success');
                },
                function(tx, error) {
                    alert('Create table error: ' + error.message);
                });
    }

    this.addSampleData = function(tx, restaurants) {
        var restaurants = [
                {"id": 1, "restaurantName": "Bistango", "city":"New York, NY", "phone":"212-999-8887", "email":"info@bistango.com", "latitude":40.742585, "longitude":-73.9802, "rating":5, "description":"This restaurant offers the option to get anything on the menu either GF or not. Get great italian food gf: ravioli's, pizza, pasta, bread, and more! "},
	            {"id": 2, "restaurantName": "Eataly", "city":"New York, NY", "phone":"212-999-8887", "email":"info@eataly.com", "latitude":40.74196, "longitude":-73.989608, "rating":2, "description":"Lots of appetizers that are GF naturally. No specialty GF food."},
	            {"id": 3, "restaurantName": "Mozzerellis", "city":"New York, NY", "phone":"212-999-8887", "email":"info@mozzerellis.com", "latitude":40.740492, "longitude":-73.987371, "rating":5, "description":"Lot's of gourmet GF pizza options! They also make GF wraps and sandwiches, and sell many GF baked goods! Very good!"},
				{"id": 4, "restaurantName": "Hale and Hearty", "city":"New York, NY", "phone":"212-999-8887", "email":"info@haleandhearty.com", "latitude":40.740492, "longitude":-73.987371, "rating":5, "description":"Most of their soups are GF as long as they do not contain noodles, barley, etc."},            
				{"id": 5, "restaurantName": "Barbuonia", "city":"New York, NY", "phone":"212-999-8887", "email":"info@barbuonia.com", "latitude":40.738327, "longitude":-73.987808, "rating":4, "description":"Lots of naturally GF items, no specialty GF breads or other products."},
				{"id": 6, "restaurantName": "Potbellys", "city":"New York, NY", "phone":"212-999-8887", "email":"info@potbellys.com", "latitude":null, "longitude":null, "rating":2, "description":"Most of the salad dressings are GF"},
				{"id": 7, "restaurantName": "Chipotle", "city":"New York, NY", "phone":"212-999-8887", "email":"info@chipotle.com", "latitude":null, "longitude":null, "rating":4, "description":"Pretty much everything is GF at Chipotle except the flour tortilla's. You can check out allergen information on their website."},
				{"id": 8, "restaurantName": "Rhong Tiam", "city":"New York, NY", "phone":"212-999-8887", "email":"info@rhongtiam.com", "latitude":null, "longitude":null, "rating":5, "description":"Most of the menu is GF! Pad Thai, Pad See Lew, and so many more thai options."},
            ];
        var l = restaurants.length;
        var sql = "INSERT OR REPLACE INTO restaurant " +
            "(id, restaurantName, city, phone, email, latitude, longitude, rating, description) " +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var e;
        for (var i = 0; i < l; i++) {
            e = restaurants[i];
            tx.executeSql(sql, [e.id, e.restaurantName, e.city, e.phone, e.email, e.latitude, e.longitude, e.rating, e.description],
                    function() {
                        console.log('INSERT success');
                    },
                    function(tx, error) {
                        alert('INSERT error: ' + error.message);
                    });
        }
    }

    this.findByName = function(searchKey, callback) {
        this.db.transaction(
            function(tx) {
				var sql = "SELECT e.id, e.restaurantName " +
                    "FROM restaurant e " +
                    "WHERE e.restaurantName LIKE ? " +
                    "GROUP BY e.id ORDER BY e.restaurantName";


                

                tx.executeSql(sql, ['%' + searchKey + '%'], function(tx, results) {
                    var len = results.rows.length,
                        restaurants = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        restaurants[i] = results.rows.item(i);
                    }
                    callback(restaurants);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    }

    this.findById = function(id, callback) {
        this.db.transaction(
            function(tx) {
				var sql = "SELECT e.id, e.restaurantName, e.city, e.phone, e.email, e.latitude, e.longitude, e.rating, e.description " +
                    "FROM restaurant e " +
                    "WHERE e.id=:id";

                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
    };

	this.findByCity = function(city, callback) {
		this.db.transaction(
            function(tx) {
				var sql = "SELECT e.id, e.city, e.restaurantName " +
                    "FROM restaurant e " +
                    "WHERE e.city LIKE ? " +
                    "GROUP BY e.id ORDER BY e.restaurantName";


                

                tx.executeSql(sql, ['%' + city + '%'], function(tx, results) {
                    var len = results.rows.length,
                        restaurants = [],
                        i = 0;
                    for (; i < len; i = i + 1) {
                        restaurants[i] = results.rows.item(i);
                    }
                    callback(restaurants);
                });
            },
            function(error) {
                alert("Transaction Error: " + error.message);
            }
        );
	};

    this.initializeDatabase(successCallback, errorCallback);

}
