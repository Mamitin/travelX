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

var city = "";

$("#add-city").on("click", function (event) {
    event.preventDefault();
    if ($("#city")[0].reportValidity()) {
        city = $("#city").val().trim();


        // queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&APPID=ad0f64f9a42308c19b2ba725fdc6802c"
        // $.ajax({
        //     url: queryUrl,
        //     method: "GET",
        // }).then(function (response) {
        //     for (var i = 0; i < response.list.length; i++){
        //     var iconCode = response.list[i].weather[0].icon;
        //     console.log(iconCode);
        //     // var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
        //     // var weatherLogo = $("<img>").attr("src", iconURL);
        //     // $(".icon").append(weatherLogo);

        //     }
        // });
    }

})


queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=san+francisco&APPID=ad0f64f9a42308c19b2ba725fdc6802c"
$.ajax({
    url: queryUrl,
    method: "GET",
}).then(function (response) {
    for (var i = 0; i < response.list.length; i= i+40){
    var iconCode = response.list[i].weather[0].icon;
    console.log(iconCode);
    var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
    var weatherLogo = $("<img>").attr("src", iconURL);
    $(".icon").append(weatherLogo);

    }
});

