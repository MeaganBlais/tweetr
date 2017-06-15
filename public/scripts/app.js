/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
 // Fake data taken from tweets.json
 var data = [
   {
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
       "text": "<script>alert('uh oh!');</script>"
     },
     "created_at": 1461116232227
   },
   {
     "user": {
       "name": "Descartes",
       "avatars": {
         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
       },
       "handle": "@rd" },
     "content": {
       "text": "Je pense , donc je suis"
     },
     "created_at": 1461113959088
   },
   {
     "user": {
       "name": "Johann von Goethe",
       "avatars": {
         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
       },
       "handle": "@johann49"
     },
     "content": {
       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
     },
     "created_at": 1461113796368
   }
 ];

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

 //add escape() to each element that is not being tested elsewhere

// createTweetElement(tweetData);

// $(document).ready(function(){
//   $('#tweets-container').append($tweet);
// });

$(document).ready(function(){
  function createTweetElement(tweetData) {

    //take a tweet object and return a tweet article
   let $html = `<article class = "user-tweets">
       <h1>${tweetData.user.name}</h1>
       <img src = "${tweetData.user.avatars.small}"/>
       <h2>${tweetData.user.handle}</h2>
       <p>${escape(tweetData.content.text)}</p>
       <footer>${tweetData.created_at}</footer>
       </article>`

   return $html
  }

  function renderTweets(tweets) {
    // $('#tweets-container').empty(); //removes all child nodes of the matched elements from DOM
    // loops through tweets
    for (tweet in tweets) {
      // calls createTweetElement for each tweet
      let tweetData = tweets[tweet];
      let $tweet = createTweetElement(tweetData);
      // takes return value and appends it to the tweets container
      $('#tweets-container').append($tweet)
    }
  }
  renderTweets(data);

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  $('.tweet-form').on('submit', function(event) {
    console.log('shutest');
    event.preventDefault()

        console.log('Button clicked, performing ajax call ...', $(this).serialize());
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $(this).serialize(),
          success: function (morePostsHtml) {
            console.log('Success: ', morePostsHtml);
          }
        });
      });
});
