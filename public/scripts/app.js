/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}
// =======================================
// <article class="user-tweets">
//   <header>
//     <img src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png">
//     <h1>Bill Fields</h1>
//     <h2>@MrFields</h2>
//   </header>
//     <!-- <p>"test"</p> -->
//   <footer>
//     10 days
//   </footer>
// </article>
// ===========================================



 function createTweetElement(tweetData) {

   //take a tweet object and return a tweet article

  let $html = `<article class = "user-tweets">
      <h1>${tweetData.user.name}</h1>
      <img src = "${tweetData.user.avatars.small}"/>
      <h2>${tweetData.user.handle}</h2>
      <p>${tweetData.content.text}</p>
      <footer>${tweetData.created_at}</footer>
      </article>`

  return $html

  // let newTweet = $('<article>').addClass('user-tweets');
      //append text to paragraph
  //  newTweet.append($('<h1>').text(tweetData.user.name));
  //  newTweet.append($('<img>').attr("src", tweetData.user.avatars.small));
  //  newTweet.append($('<h2>').text(tweetData.user.handle));
  //  newTweet.append($('<p>').text(tweetData.content.text));
  //  newTweet.append($('<footer>').text(tweetData.created_at));
  //  return newTweet;

 }
 var $tweet = createTweetElement(tweetData);
// createTweetElement(tweetData);


$(document).ready(function(){

  $('#tweets-container').append($tweet);

});


// function renderTweets(tweets) {
//   // loops through tweets
//     // calls createTweetElement for each tweet
//     // takes return value and appends it to the tweets container
// }
//
// function createTweetElement(tweet) {
//   var $tweet = $('<article>').addClass('tweet');
//   // ...
//   return $tweet;
// }
//
// renderTweets(data);
