
function getCityIdZomato(city){
    var queryUrl = 'https://developers.zomato.com/api/v2.1/cities?q=' + city + '&apikey=ea3fd0e211714b973a2d1cd42ad5d892';
    $.ajax({
        url: queryUrl,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        var result = response.location_suggestions[0].id;
        var queryFoodUrl = 'https://developers.zomato.com/api/v2.1/cuisines?city_id='+result+'&apikey=ea3fd0e211714b973a2d1cd42ad5d892';
        $.ajax({
            url:queryFoodUrl,
            method: 'GET'
        }).then(function(resp){
            console.log(resp);
        })
    })
};

function searchCity(city){

    var queryNewsUrl = "https://newsapi.org/v2/everything?q=" + city + "&language=en&pageSize=10&sortBY=relevancy&apiKey=cd225c64e7e444f8ae8da4c61d6720bb";
    $.ajax({
        url: queryNewsUrl,
        method: 'GET'
    }).then(function(response){
    console.log(response);
    $('#citySearch').empty();
    $('#cardNews').empty();
    var results = response.articles;
    for( var i = 0; i < results.length; i++)
    {
        var cardDiv = $('<div>');
        cardDiv.attr('class', 'card-deck');
        var cardBod = $('<div>').attr('class', 'card-body');
        var cardNews = $('<div>');
        cardNews.attr('id', 'cardNews');
        cardNews.attr('class', 'card');
        cardNews.attr('style', 'display: none')

        var articleTitle = $('<h5>').text(results[i].title);
        articleTitle.attr('class', 'card-title');
        var articleImage = $('<img>').attr('src', results[i].urlToImage);
        articleImage.attr('class', 'crops');
        var arcticleDescr = $('<p>').text(results[i].description);
        arcticleDescr.attr('class', 'card-text');
        cardBod.append(articleTitle);
        cardBod.append(articleImage);
        cardBod.append(arcticleDescr);

        cardDiv.append(cardBod);

        $('#cardNews').append(cardDiv);
        

    }
    });
    var queryEventFulURL= 'https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?app_key=Q3jJHSfwVkN3HPQf&location='+city;
    $.ajax({
        url:queryEventFulURL,
        method:'GET'
    }).then(function(response){
        console.log(response);
    })
    var queryEventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city="+ city + "&apikey=68qaNTMZ1pS3QGSRjs5LgY6eUWnDdFw8";
    $.ajax({
        url: queryEventUrl,
        method: 'GET'
    }).then(function(response){
        console.log(response)
        $('#citySearch').empty();
        $('#cardEvent').empty();
        var results = response._embedded.events;
        for(var i = 0; i < results.length; i++)
        {
            var cardDiv = $('<div>');
            cardDiv.attr('class', 'card-deck');
            var cardBod = $('<div>').attr('class', 'card-body');
            var cardEvent = $('<div>');
            cardEvent.attr('id', 'cardEvent');
            cardEvent.attr('class', 'card');
            cardEvent.attr('style', 'display: none')

            var articleTitle = $('<h5>').text(results[i].name + ' at the ' + results[i]._embedded.venues[0].name);
            articleTitle.attr('class', 'card-title');
            var articleLink = $('<a>');
            articleLink.attr('href', results[i].url)
            var articleImage = $('<img>').attr('src', results[i].images[0].url);
            articleImage.attr('class', 'crops');
            $(articleImage).wrap(articleLink);
            var articleTix =$('<p>').text('Tickets: '+results[i].url);
            var articleDate = $('<p>').text('Date:  ' + results[i].dates.start.localDate);
            articleDate.attr('class', 'card-text');
            var articleTime = $('<p>').text('Time:  ' + results[i].dates.start.localTime);
            articleDate.attr('class', 'card-text');
            $(articleImage).wrap(articleLink).parent();
            cardBod.append(articleTitle);
            cardBod.append(articleLink);
            cardBod.append(articleImage);
            cardBod.append(articleDate);
            cardBod.append(articleTime);
            cardBod.append(articleTix);
            
         
            cardDiv.append(cardBod);
            $('#cardEvent').append(cardDiv);
        };
    });
    var queryBarsURL = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=bars+in+' + city + '&key=AIzaSyBXuHCkDlWbDeYf14omiDbuUuoKOJcB1ZE';
    $.ajax({
        url: queryBarsURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        $('#citySearch').empty();
        $('#cardBars').empty();

        var result = response.results;
        for(var i = 0; i < result.length; i++) 
        {
            var cardDiv = $('<div>');
            cardDiv.attr('class', 'card-deck');
            var cardBod = $('<div>').attr('class', 'card-body');
            var cardBars = $('<div>');
            cardBars.attr('id', 'cardBars');
            cardBars.attr('class', 'card');
            cardBars.attr('style', 'display: none');

            var articleTitle = $('<h5>').text(result[i].name);
            articleTitle.attr('class', 'card-title');
            // var articleImage = $('<img>').attr('src', results[i].photoReference);
            // articleImage.attr('class', 'crops');
            var arcticleAd = $('<p>').text('Location: '+result[i].formatted_address);
            arcticleAd.attr('class', 'card-text');
            var arcticleHours = $('<p>').text('Opening Hours: '+result[i].opening_hours);
            arcticleHours.attr('class', 'card-text');
            var arcticleRating = $('<p>').text('Rating: '+result[i].rating);
            arcticleRating.attr('class', 'card-text');
            cardBod.append(articleTitle);
            // cardBod.append(articleImage);
            cardBod.append(arcticleAd);
            cardBod.append(arcticleHours);
            cardBod.append(arcticleRating);
    
            cardDiv.append(cardBod);
    
            $('#cardBars').append(cardDiv);
        };
    });
    var queryWeatherURL = 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=ce9fe19960370db09d5357b624a4fef9';
    $.ajax({
        url: queryWeatherURL,
        method: 'GET'
    }).then(function(response){
        console.log(response);
        
    })
    // var queryPhotoURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&" + photoreference + "&key=AIzaSyBXuHCkDlWbDeYf14omiDbuUuoKOJcB1ZE"
};

$('#submitBtn').on('click',function(event){
    event.preventDefault();
    var inputCity = $('#citySearch').val().trim();
    getCityIdZomato(inputCity)
    searchCity(inputCity)
    ;
});


$("#currentWbtn").on("click",function() {
    $("#currentWeather").toggle();
});
$('#cityWbtn').on('click',function() {
    $('#cityWeather').toggle();
});

$("#daily").click(function() {
    $("#cardNews").toggle();
});
$("#weekly").click(function() {
    $("#cardEvent").toggle();
});
// $("#").click(function() {
//     $("#cardFood").toggle();
// });
// $("#myBtn").click(function(){
//     $("#myModal").modal();
// });

    
var config = {
            apiKey: "AIzaSyCEswMS_pidVQbZ3f4ijKpEcgWRlJHLBPU",
            authDomain: "cityfo-2b4f6.firebaseapp.com",
            databaseURL: "https://cityfo-2b4f6.firebaseio.com",
            projectId: "cityfo-2b4f6",
            storageBucket: "cityfo-2b4f6.appspot.com",
            messagingSenderId: "990324702599"
        };

        
          firebase.initializeApp(config);
        
          var database = firebase.database();
          var searchInput = "";
        
          $('#submitBtn').on('click',function(event)
        {
            event.preventDefault();
            searchInput = $('#citySearch').val().trim();
        
            database.ref().set({
                searchInput: searchInput
            });
        });

         database.ref().on("value", function(snapshot){
            console.log(snapshot.val().searchInput);
            
            $('.firebase').text(snapshot.val().searchInput);
        
        },function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
          }); 

         

        
// function login()
// {
//   function newLoginHappened(user)
//   {
//       if(user) {
//           //user signed in
//           app(user);
//       } else {
//           var provider = new firebase.auth.GoogleAuthProvider();
//           firebase.auth().signInWithRedirect(provider);
//       }
//   }
//   firebase.auth().onAuthStateChanged(newLoginHappened);
// }
// function app()
// {
//     //user.displayName
//     //user.email
//     //user.photoURL
//     //user.uid
//   document.getElementById('clientName').innerHTML= user.displayName;
// }
// window.onload = login;
    



 


