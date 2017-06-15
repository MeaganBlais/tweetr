/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  function createTweetElement(tweetData) {

    //add escape() to each element that is not being tested elsewhere
    //take a tweet object and return a tweet article
    let html = `<article class = "user-tweets">
    <h1>${tweetData.user.name}</h1>
    <img src = "${tweetData.user.avatars.small}"/>
    <h2>${tweetData.user.handle}</h2>
    <p>${escape(tweetData.content.text)}</p>
    <footer>${tweetData.created_at}</footer>
    </article>`

    return html;
  }

  function renderTweets(tweets) {
    // console.log('test', $('textarea'));
    // $('#tweets-container').empty();
    //removes all child nodes of the matched elements from DOM
    $('#tweets-container').empty();
    // $('#tweets-container').html(''); //mentor suggestion ... find out if it's a better practice
    // loops through tweets
    for (tweet in tweets) {
      // calls createTweetElement for each tweet
      let tweetData = tweets[tweet];
      let $tweet = createTweetElement(tweetData);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
      // RESET FORM
      // let reset = $('textarea:reset')
    }
  }
  //renderTweets(text);

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // form submit handler
  $('.tweet-form').on('submit', function(event) {
    // console.log('data', data);
    event.preventDefault();

    function validateData(data) {
      // if (text === null || "") {
      // console.log('data', data)
      if (data.length > 140) {
        alert('tweet is too long');
        return false;
      } else if (data === null || data === '') {
        alert('please enter a tweet');
        return false;
      }
      // let noContent = (data === null || data === '')
      // let tooLong = data.length > 140
      // if (noContent || tooLong) { ... this should be a ternary ? :
      //   return false;

      return true;
    }

    let validTweet = validateData($(this).find('textarea').val());

    if (validTweet) {
      console.log('Button clicked, performing ajax call ...', $(this).serialize());
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: $(this).serialize(),
        success: function() {
          console.log('Success: ');
          loadTweets();
        }
      });
      $(this).find('textarea').val('');
      // $(this).find('counter').reset;
    }
  });

  (function loadTweets() {
    // fetching tweets from the host page
    // do not call the function ... simply pass it to the success param
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  })();

  // loadTweets();

  // (function IIFE(){
  //   //run this immediately
  //   console.log(IIFE)
  // })()

  $('button').click('button', function() {
    $('.new-tweet').toggle();
    $('.new-tweet textarea').focus();
  });







});
