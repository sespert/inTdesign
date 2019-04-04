var axios = require("axios");
var request = require("request");
var http = require("https");
var keys = require("./keys");
var yelp = require("yelp-fusion");
var yelpKey = '6mOLysbB4TWzxVVj53g49Xjlq-pH4r8wrkdguf3gUtdl9irTVoT4EKJWjhCmdT2_yV558KNdUkDQDmKugwWExwEbdO9jYg2yQanVWmxULR4naCadfCBuSU79TWyWXHYx';
// keys.apiKey;
var client = yelp.client(yelpKey);
var db = require("../models");
console.log(yelpKey);

module.exports = function (app) {

    app.get("/api/yelp/:businessName/:city", function (req, res) {
        var name = req.params.businessName;
        
        var city = req.params.city;
        
        client.search({
            term: name,
            location: city
        }).then(response => {
            
            var results = response.jsonBody.businesses;
            
            res.json(results);


        }).catch(error => { console.log(error) });
    });

    app.get("/api/yelp/:specificId", function (somereq, res) {
        console.log("-------",somereq.headers.host);

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
            res.send(data);
           
        });


    })

    app.post("/api/addBusiness", function (req, res) {
        var newBusiness = req.body;
        console.log(newBusiness);
        console.log(newBusiness.rating);
        
        var coord = [newBusiness.coordinates.latitude, newBusiness.coordinates.longitude];
        var hours = [];
        var hoursArr = "No hours provided";
        if (newBusiness.hours){
            hoursArr = newBusiness.hours[0].open;
               
            console.log("--------------------------------------------------",hoursArr);

            for (var i = 0; i < hoursArr.length; i++){
                var day=[];
                console.log("hours array",hoursArr[i].day);
                switch(hoursArr[i].day) {
                    case "0":
                        day = "Mon: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                        console.log("monday");
                        break;
                    case "1":
                        day = "Tue: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                    break;
                    case "2":
                        day = "Wed: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                        break;
                    case "3":
                        day = "Thu: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                        break;
                    case "4":
                        day = "Fri: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                        break;
                    case "5":
                        day = "Sat: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                        break;
                    case "6":
                        day = "Sun: " + hoursArr[i].start + " to " + hoursArr[i].end;
                        hours.push(day);
                        break;
                }
            };
        };
        console.log(hours);
        
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
            schedule: hours.toString(),
            // services: newBusiness.schedule,
            // aboutUs: newBusiness.aboutUs,
            businessType: 1,
            modules: "[1,2,3,4]"
        }).then(function (data) {
            res.json(data);
            // console.log("***********************************", data);

        });

    });
};
