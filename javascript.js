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

createWeatherCard("San Francisco");
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
        var weatherCard = '<div class="card" style="width: 18rem;" class="weather-card">' +
            '<div class="card-body">' +
            '<div class="icon"><img src="' + iconURL + '"></div>' +
            '<div class="degrees">' + temp + " &deg;F" + '</div>' +
            '<h5 class="card-title" class="city-name">' + city + '</h5>' +
            '<div>' + weatherMain + ": " + weatherDescription + '</div>' +
            '</div>' +
            '</div>';
        $("#top-container").append(weatherCard);
    });
    console.log(iconCode)
    console.log(weatherMain)
    console.log(weatherDescription)
    console.log(temp)
}

