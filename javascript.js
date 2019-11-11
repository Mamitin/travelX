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

function createWeatherCard(city) {
    queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&APPID=ad0f64f9a42308c19b2ba725fdc6802c"
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        var iconCode = response.weather[0].icon;
        var weatherMain = response.weather[0].main;
        var weatherDescription = response.weather[0].description;
        var temp = Math.round(response.main.temp);
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        var weatherCard = "<div class='card' style='width: 18rem;' class='weather-card' data-city='" + city + "'>" +
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

$(document).on("click", ".card", function () {
    city = $(this).attr("data-city"),
        queryUrl = "https://api.unsplash.com/search/photos?page=1&query=" + city + "&per_page=15&client_id=1fe059d9563f81ba0606c1b4cc67ce6907170487254d42e8874bf0748145d74b"
    $.ajax({
        url: queryUrl,
        method: "GET",
    }).then(function (response) {
        $("#photo-container").empty();
        var photoArray = response.results;
        for (var i = 0; i < photoArray.length; i++) {
            var imageUrl = photoArray[i].urls.small;
            var attributionUrl = photoArray[i].links.html;
            var link = $("<a>").attr("href", attributionUrl);
            var image = $("<img>").attr("src", imageUrl);
            link.append(image);
            $("#photo-container").append(link);
            $("#photo-container").justifiedGallery();
        }
    })
});


