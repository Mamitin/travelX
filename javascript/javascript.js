// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCnj1-16_cCbBQxBMm6QEnZmGe5XpbOJ8s",
    authDomain: "travelx-d1b19.firebaseapp.com",
    databaseURL: "https://travelx-d1b19.firebaseio.com",
    projectId: "travelx-d1b19",
    storageBucket: "travelx-d1b19.appspot.com",
    messagingSenderId: "119514909713",
    appId: "1:119514909713:web:934ab8a71f9a7dcbbff5b0",
    measurementId: "G-2JQ0YCVH1N"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var cities = [];

$("#add-city").on("click", function (event) {
    event.preventDefault();

    if ($("#city")[0].reportValidity()) {
        var city = $("#city").val().trim();

        if (!cities.includes(city.toLowerCase())) {
            cities.push(city);

            createWeatherCard(city);
        }
        $("#city").val("");
    }
})


database.ref().on("child_added", function (snapshot) {
    var city = snapshot.val();

    cities.push(city.toLowerCase());

    createWeatherCard(city);
});


function createWeatherCard(city) {
    queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=ad0f64f9a42308c19b2ba725fdc6802c";
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        var iconCode = response.weather[0].icon;
        var weatherMain = response.weather[0].main;
        var weatherDescription = response.weather[0].description;
        var temp = Math.round(response.main.temp);
        var iconURL = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var weatherCard = "<div class='card weather-card' style='width: 18rem;' data-toggle='tooltip' data-placement='top' title='Click card for more information about the city' data-city='" + city + "'>" +
            "<div class='card-body'>" +
            "<div class='icon'><img src='" + iconURL + "'></div>" +
            "<div class='degrees'>" + temp + " &deg;F" + "</div>" +
            "<h5 class='card-title city-name ellipsis'>" + city + "</h5>" +
            "<div>" + weatherMain + ": " + weatherDescription + "</div>" +
            "</div>" +
            "</div>";
        $('.weather-card').tooltip();
        $("#top-container").append(weatherCard);

    });
}

var photosIsLoading = false;
var yelpIsLoading = false;

$(document).on("click", ".weather-card", function (event) {
    event.preventDefault();

    $("html, body").animate({
        scrollTop: $("#photos").offset().top
    }, 800, function () {
    });

    var city = $(this).attr("data-city");

    if (!photosIsLoading && !yelpIsLoading) {
        $("#photo-container").empty();
        $("#activities-container").empty();

        photosIsLoading = true;
        yelpIsLoading = true;

        // Unsplash API 
        var queryUrl = "https://api.unsplash.com/search/photos?page=1&query=" + city + "&per_page=10&client_id=1fe059d9563f81ba0606c1b4cc67ce6907170487254d42e8874bf0748145d74b";
        $.ajax({
            url: queryUrl,
            method: "GET",
        }).then(function (response) {
            var photoArray = response.results;
            for (var i = 0; i < photoArray.length; i++) {
                var imageUrl = photoArray[i].urls.small;
                var attributionUrl = photoArray[i].links.html;
                var link = $("<a>").attr("href", attributionUrl);
                var image = $("<img>").attr("src", imageUrl);
                link.append(image);
                $("#photo-container").append(link);
                $("#photo-container").justifiedGallery({
                    rowHeight: 200,
                    lastRow: "hide",
                    margins: 5,
                    border: 30,
                });
            }
            photosIsLoading = false;
        })

        // Yelp API
        jQuery.ajaxPrefilter(function (options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });


        $.ajax({
            "url": "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + city + "&limit=6",
            "method": "GET",
            "headers": {
                "Authorization": "Bearer jx1SEtsblr1yJ82sPA12K2KeN8DJtiecuNYIv5jHFIqbt0etlByOQwWjc-3k80nhLKmyolJ4rfSaMcobdrepcwCjE8mQoMC6HHIkGxRoNCoh1S3-n6OUbiJSqtW1XXYx",
            }
        }).then(function (response) {
            for (var i = 0; i < response.businesses.length; i++) {
                var url = $("<a>").attr("href", response.businesses[i].url).attr("target", "_blank").addClass("restaurant-link");
                var business = $("<div>").addClass("card").attr("style", "width: 18rem;");
                var name = $("<h5>").addClass("name ellipsis").text(response.businesses[i].name);
                var details = $("<div>")
                var phone = $("<p>").attr("class", "phone").text(response.businesses[i].phone);
                var image = $("<img>").attr("src", response.businesses[i].image_url).addClass("card-img-top restaurant-image");
                var location = $("<p>").addClass("address ellipsis").text(response.businesses[i].location.address1 + ", " + response.businesses[i].location.city + ", " + response.businesses[i].location.zip_code);
                business.append(image);
                details.append(name);
                details.append(phone);
                details.append(location);
                business.append(details);

                url.append(business);

                $("#activities-container").append(url);
            }

            yelpIsLoading = false;
        })

    }

});




