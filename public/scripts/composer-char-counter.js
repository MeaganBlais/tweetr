const maxChar = 140;

// this needs to be a let since it is being reassigned in the function
let charRemaining = maxChar;

function getRemChar(totChar) {
  return maxChar - totChar;
}


function readyFn(jQuery) {
  // Code to run when the document is ready.
  $('.new-tweet').find('textarea').on('keypress', function(event) {
    // wrapping this is jQuery syntax $() allows for use of jQuery functions
    charRemaining = getRemChar($(this).val().length);

    // this uses jQuery to tranverse up the DOM tree
    let counter = $(this).siblings('.counter');

    counter.text(charRemaining);

    if (charRemaining < 0) {
      counter.addClass('over-char-limit');
    } else {
      counter.removeClass('over-char-limit');
    }
  });
}

$(document).ready(readyFn);
