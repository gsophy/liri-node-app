//dotenv allows us to load the twitter and spotify API modules.  
require("dotenv").config();
var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var transaction = process.argv[2];
var input = process.argv[3];

switch (transaction) {
    case "my-tweets":
        grabTweets()
        break;
    case "spotify-this-song":
        grabSpotify()
        break;
    case "movie-this":
        grabMovie()
        break;
    case "do-what-it-says":
        doAsTold()
        break;
}

function grabTweets() {

    var params = {
		screen_name: 'DoomsdayPantry',
        count: 20
    }

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if(error) { // if there IS an error
			console.log('Error occurred: ' + error);
		} else { // if there is NO error
	  	console.log("My 20 Most Recent Tweets");
	  	console.log("");

	  	for(var i = 0; i < tweets.length; i++) {
	  		console.log("( #" + (i + 1) + " )  " + tweets[i].text);
	  		console.log("Created:  " + tweets[i].created_at);
	  		console.log("");
	  	}
	  }
    });
}


function grabSpotify() {

    //This code will be used with doAsTold function

    // var noInput = fs.readFile("./random.txt", "utf8", function (error, data) {
    //     var dataArr = data.split(",");
    //     // console.log (noInput);
    //     console.log(dataArr);
    // });

    if (input === undefined) {
        input ="The Sign"
    }

        spotify.search({ type: 'track', query: input }, function(err, data) {
            if (err) {
                console.log('ERROR: ' + err);
                return; 
            } else {
                var songInfo = data.tracks.items[0];
                // var parseSongInfo = JSON.parse(data);
                // console.log(parseSongInfo);
                console.log(" " + " " + "SPOTIFY RESULTS: " + " " + " ")
                console.log("ARTIST:", songInfo.artists[0].name);
                console.log("SONG:", songInfo.name);
                console.log("ALBUM:", songInfo.album.name);
                console.log("PREVIEW:", songInfo.preview_url);
            };
        });
    }




function grabMovie() {
    if (input === undefined) {
        input ="Mr. Nobody"
    }
    
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + input , function(error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

    // Then log the body from the site!
    var movieData = JSON.parse(body);
    console.log(movieData);
    console.log(movieData.Title);
    console.log(movieData.Year);
    console.log(movieData.Ratings[1].Value);
    console.log(movieData.Country);
    console.log(movieData.Language);
    console.log(movieData.Plot);
    console.log(movieData.Actors);
  }
});

}

function doAsTold() {
    var noInput = fs.readFile("./random.txt", "utf8", function (error, data) {
        var dataArr = data.split(",");
        // console.log (noInput);
        //console.log(dataArr);
        transaction = dataArr[0]
        input = dataArr[1]
        switch (transaction) {
            case "my-tweets":
                grabTweets()
                break;
            case "spotify-this-song":
                grabSpotify()
                break;
            case "movie-this":
                grabMovie()
                break;
            case "do-what-it-says":
                doAsTold()
                break;
        }
    });
 }
