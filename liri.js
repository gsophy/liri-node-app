require("dotenv").config();
var keys = require('./keys.js');
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var transaction = process.argv[2];
//var input = process.argv[3];

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
    client.get('favorites/list', function(error, tweets, response) {
        if(error) throw error;
        console.log(tweets);  // The favorites.
        console.log(response);  // Raw response object.
      });

}

// function grabSpotify() {
//     //spotify.getArtist

// }

function grabMovie() {
    request("http://www.omdbapi.com/?apikey=trilogy&", function(error, response, body) {

  // If the request was successful...
  if (!error && response.statusCode === 200) {

    // Then log the body from the site!
    console.log(body);
  }
});

}

function doAsTold() {

}