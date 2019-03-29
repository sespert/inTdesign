
var keys = require("./keys");
var yelp = require("yelp-fusion");
// var yelpKey="6mOLysbB4TWzxVVj53g49Xjlq-pH4r8wrkdguf3gUtdl9irTVoT4EKJWjhCmdT2_yV558KNdUkDQDmKugwWExwEbdO9jYg2yQanVWmxULR4naCadfCBuSU79TWyWXHYx";
var yelpKey = keys.apiKey;
var client = yelp.client(yelpKey);
var db = require("../models");
console.log(yelpKey);
module.exports = function(app, db) {
    app.get("/api/yelp/:businessName/:city", function(req, res) {
        var name = req.params.businessName;
        // var city = "miami";
        var city = req.params.city;
        // console.log(name, city);

        client.search({
            term: name,
            location: city
        }).then(response => {
            console.log(name, city);
            var results = response.jsonBody.businesses;
            // for (var i = 0; i < results.length; i++){
            //     console.log("name: " + results[i].name + " | address: " + results[i].location.display_address + " id: " + results[i].id);
            // }
            console.log(results);
            res.render("index", {business : results});
            
        })
        // .catch(error => {console.log(error)});
        
    });
};
