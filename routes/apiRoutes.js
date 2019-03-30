var axios = require("axios");
var request = require("request");
var http = require("https");
var keys = require("./keys");
var yelp = require("yelp-fusion");
// var yelpKey="6mOLysbB4TWzxVVj53g49Xjlq-pH4r8wrkdguf3gUtdl9irTVoT4EKJWjhCmdT2_yV558KNdUkDQDmKugwWExwEbdO9jYg2yQanVWmxULR4naCadfCBuSU79TWyWXHYx";
var yelpKey = keys.apiKey;
var client = yelp.client(yelpKey);
var db = require("../models");
console.log(yelpKey);

module.exports = function (app, db) {

    app.get("/api/yelp/:businessName/:city", function (req, res) {
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
            console.log("Yelp results", results);
            res.json(results);


        }).catch(error => { console.log(error) });
    });

    app.get("/api/yelp/specific", function(somereq,res) {
        console.log("**************************************************************");
        

        var options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/DgSSKOt1tQsbgtANVDJduw',
            headers:
            {
                'Postman-Token': 'b525b890-02bf-4927-bf25-c92ceffc66aa',
                'cache-control': 'no-cache',
                Authorization: 'Bearer 6mOLysbB4TWzxVVj53g49Xjlq-pH4r8wrkdguf3gUtdl9irTVoT4EKJWjhCmdT2_yV558KNdUkDQDmKugwWExwEbdO9jYg2yQanVWmxULR4naCadfCBuSU79TWyWXHYx'
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(body);
            res.json(body);
        });


    })

    // app.get("/api/yelp/specific/:id", function (somereq, res) {
    //     // var id = somereq.params.id;
    //     console.log("*************************************************************************************************************************");
    //     // console.log(id);



    //     // var options = {
    //     //     "method": "GET",
    //     //     "hostname": [
    //     //         "api",
    //     //         "yelp",
    //     //         "com"
    //     //     ],
    //     //     "path": [
    //     //         "v3",
    //     //         "businesses",
    //     //         id
    //     //     ],
    //     //     "headers": {
    //     //         "Authorization": "Bearer " + yelpKey,
    //     //         "cache-control": "no-cache",
    //     //         "Postman-Token": "03a1e968-9abe-4f52-94ed-8c85aa00e3de"
    //     //     }
    //     // };

    //     // var req = http.request(options, function (res) {
    //     //     var chunks = [];

    //     //     res.on("data", function (chunk) {
    //     //         chunks.push(chunk);
    //     //     });

    //     //     res.on("end", function () {
    //     //         var body = Buffer.concat(chunks);
    //     //         console.log(body.toString());
    //     //     });
    //     // });

    //     // req.end();



    //     // axios({
    //     //     "async": true,
    //     //     "crossDomain": true,
    //     //     "url": "https://api.yelp.com/v3/businesses/"+id,
    //     //     "method": "GET",
    //     //     "headers": {
    //     //       "Authorization": "Bearer "+yelpKey,
    //     //       "cache-control": "no-cache",
    //     //       "Postman-Token": "a7fe5c74-f993-4ad1-a73a-aa8b8121ad16"
    //     //     }
    //     // }).then(function(response){
    //     //     console.log(response);
    //     // });

    //     // var settings = {
    //     //     "async": true,
    //     //     "crossDomain": true,
    //     //     "url": "https://api.yelp.com/v3/businesses/"+id,
    //     //     "method": "GET",
    //     //     "headers": {
    //     //       "Authorization": "Bearer "+yelpKey,
    //     //       "cache-control": "no-cache",
    //     //       "Postman-Token": "a7fe5c74-f993-4ad1-a73a-aa8b8121ad16"
    //     //     }
    //     // }          

    //     // client.phoneSearch({
    //     //     phone:"+17865429654",
    //     //     location:"Miami"
    //     // }).then(response => {
    //     //     // console.log(name, city);
    //     //     var results = response.jsonBody.businesses;
    //     //     // for (var i = 0; i < results.length; i++){
    //     //     //     console.log("name: " + results[i].name + " | address: " + results[i].location.display_address + " id: " + results[i].id);
    //     //     // }
    //     //     console.log("Yelp results", results);
    //     //     // res.json(results);
    //     //     console.log("*************************************************************************************************************************");

    //     // }).catch(error => {console.log(error)});
    // });
};
