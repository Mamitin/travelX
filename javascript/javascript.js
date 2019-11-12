//HTML
// Search bar with our name KLMS Travel at the top
// A card with the weather, city and the icon
// Be able to click on the card 
// After clicking on the card pictures and events will display



//JS

// Use firebase authenication
// event listener for user input link to firebase 
// Validate search bar
// Use AJAX call for weather API in a card- look at GIPHY HW
// on click on card 
// AJAX call to photo API/ AJAX call for activities API
// display images with photo display library

$("#add-city").on("click", function (event) {
    event.preventDefault();
    if ($("#city")[0].reportValidity()) {
        var city = $("#city").val().trim();

        createWeatherCard(city);
    }
})

createWeatherCard("Miami");
createWeatherCard("Paris");
createWeatherCard("New York");
createWeatherCard("Sydney");
createWeatherCard("Hong Kong");
createWeatherCard("Rio de Janeiro");

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
        var weatherCard = "<div class='card weather-card' style='width: 18rem;' data-city='" + city + "'>" +
            "<div class='card-body'>" +
            "<div class='icon'><img src='" + iconURL + "'></div>" +
            "<div class='degrees'>" + temp + " &deg;F" + "</div>" +
            "<h5 class='card-title city-name'>" + city + "</h5>" +
            "<div>" + weatherMain + ": " + weatherDescription + "</div>" +
            "</div>" +
            "</div>";
        $("#top-container").append(weatherCard);
    });
}

$(document).on("click", ".weather-card", function () {
    var city = $(this).attr("data-city");

    $("#photo-container").empty();
    $("#activities-container").empty();

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
                margins: 5,
            });
        }
    })

    // Yelp API
    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });


    $.ajax({
        "url": "https://api.yelp.com/v3/businesses/search?term=restaurants&location=" + city + "&limit=3",
        "method": "GET",
        "headers": {
            "Authorization": "Bearer jx1SEtsblr1yJ82sPA12K2KeN8DJtiecuNYIv5jHFIqbt0etlByOQwWjc-3k80nhLKmyolJ4rfSaMcobdrepcwCjE8mQoMC6HHIkGxRoNCoh1S3-n6OUbiJSqtW1XXYx",
        }
    }).then(function (response) {
        for (var i = 0; i < response.businesses.length; i++) {
            var business = $("<div>").addClass("card").attr("style", "width: 18rem;")
            var name = $("<h5>").attr("class", "name").text(response.businesses[i].name);
            var details = $("<div>")
            var phone = $("<p>").attr("class", "phone").text(response.businesses[i].phone);
            var image = $("<img>").attr("src", response.businesses[i].image_url).addClass("card-img-top restaurant-image");
            var location = $("<p>").attr("class", "address").text(response.businesses[i].location.address1 + ", " + response.businesses[i].location.city + ", " + response.businesses[i].location.zip_code);
            business.append(image);
            details.append(name);
            details.append(phone);
            details.append(location);
            business.append(details);
            $("#activities-container").append(business);
        }
    })
});


