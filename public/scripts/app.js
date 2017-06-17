/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  function createTweetElement(tweetData) {

    //add escape() to each element that needs to be tested
    //take a tweet object and return a tweet article
    let html = `<article class = "user-tweets">
    <img src = "${tweetData.user.avatars.small}"/>
    <h1>${tweetData.user.name}</h1>
    <h2>${tweetData.user.handle}</h2>
    <p>${escape(tweetData.content.text)}</p>

    <footer class="tweet-foot">
    <span class="tweet-time">${timeDiff(Date.now(),tweetData.created_at)}</span>
    <div class="icons">
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
    </article>`

    return html;
  }

  function renderTweets(tweets) {
    //removes all child nodes of the matched elements from DOM
    // $('#tweets-container').html(''); //mentor suggestion ... can be used to send relevant msg
    $('#tweets-container').empty();
    // loops through tweets
    for (tweet in tweets) {
      // calls createTweetElement for each tweet
      let tweetData = tweets[tweet];
      let $tweet = createTweetElement(tweetData);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // form submit handler
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();

    function validateData(data) {
      if (data.length > 140) {
        alert('tweet is too long');
        return false;
      } else if (data === null || data === '') {
        alert('please enter a tweet');
        return false;
      }
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
      $(this).find('.counter').html(140);
    }
  });

  function loadTweets() {
    // fetching tweets from the host page
    // do not call the function ... simply pass it to the success param
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: renderTweets
    });
  };
  loadTweets();

  $('button').click('button', function() {
    $('.new-tweet').slideToggle('slow');
    $('.new-tweet textarea').focus();
  });

  function timeDiff(now, posted) {
    let msPerMin = 60 * 1000;
    let msPerHr = msPerMin * 60;
    let msPerDay = msPerHr * 24;
    let msPerMth = msPerDay * 30;
    let msPerYr = msPerDay * 365;
    let elapsed = now - posted;
    if (elapsed < msPerMin) {
      return Math.round(elapsed/1000) + ' seconds ago';
    }
    else if (elapsed < msPerHr) {
      return Math.round(elapsed/msPerMin) + ' minutes ago';
    }
    else if (elapsed < msPerDay ) {
      return Math.round(elapsed/msPerHr ) + ' hours ago';
    }
    else if (elapsed < msPerMth) {
      return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';
    }
    else if (elapsed < msPerYr) {
      return 'approximately ' + Math.round(elapsed/msPerMth) + ' months ago';
    }
    else {
      return 'approximately ' + Math.round(elapsed/msPerYr ) + ' years ago';
    }
  }
});
