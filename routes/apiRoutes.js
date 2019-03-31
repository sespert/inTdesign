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

module.exports = function (app) {

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

    app.get("/api/yelp/:specificId", function (somereq, res) {

        var businessId = somereq.params.specificId;
        console.log("**************************************************************", businessId);


        var options = {
            method: 'GET',
            url: 'https://api.yelp.com/v3/businesses/' + businessId,
            headers:
            {
                'Postman-Token': 'b525b890-02bf-4927-bf25-c92ceffc66aa',
                'cache-control': 'no-cache',
                Authorization: 'Bearer ' + yelpKey
            }
        };

        request(options, function (error, response, data) {
            if (error) throw new Error(error);
            var dataObject = JSON.parse(data);
            // console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",dataObject);
            var request = require("request");

            var options = {
                method: 'POST',
                url: 'http://localhost:3000/api/addBusiness',
                headers:
                {
                    'Postman-Token': '5fc7f30d-3b0c-4e09-bd84-a3dfc140903f',
                    'cache-control': 'no-cache',
                    'Content-Type': 'application/json'
                },
                body: dataObject,
                // {
                //     userName: 'Another business',
                //     yelpId: '123456',
                //     address: '8800 NW 77 ST, Miami, Fl 33166',
                //     phone: '+7861231234',
                //     email: 'albert@einstein.com',
                //     logo: 'some image that we need to figure out how to save',
                //     coordinates: '[25.3685, 36.2145687]',
                //     rating: '$$$$',
                //     pictures: '[https://i.pinimg.com/236x/12/ce/a7/12cea7ff405601b2dc8db28943ad129e--mexicans-hot-dog.jpg, https://www.101dogbreeds.com/wp-content/uploads/2014/10/Chiweenie-Pictures.jpg, https://i0.wp.com/puppytoob.com/wp-content/uploads/2015/04/chiweenie-puppies-1.jpg?]',
                //     schedule: '[{array: of, many:objecte}]',
                //     services: 'Menu.pdf',
                //     aboutUs: 'aboutUs.pdf',
                //     businessType: 1,
                //     modules: '[1,2,3,5]'
                // },
                json: true
            };

            request(options, function (error, response, body) {
                
                if (error) throw new Error(error);

                console.log(body);
            });



            res.json(data);
        });


    })

    app.post("/api/addBusiness", function (req, res) {
        var newBusiness = req.body;
        var coord = [newBusiness.coordinates.latitude, newBusiness.coordinates.longitude];
        console.log("--------------------------------------------------",newBusiness.hours[0].open);
        
        
        db.users.create({
            userName: newBusiness.name,
            yelpId: newBusiness.id,
            address: newBusiness.location.display_address.toString(),
            phone: newBusiness.phone,
            // email: newBusiness.email,
            // logo: newBusiness.logo,
            coordinates: coord.toString(),
            rating: newBusiness.rating,
            pictures: newBusiness.photos.toString(),
            schedule: newBusiness.hours[0].open.toString(),
            // services: newBusiness.schedule,
            // aboutUs: newBusiness.aboutUs,
            businessType: 1,
            modules: "[1,2,3,4]"
        }).then(function (data) {
            res.json(data);
        });

    });
};
