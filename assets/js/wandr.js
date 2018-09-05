/* globals $, AOS */
/* eslint semi: ["error", "always"] */

$.ajaxSetup({
  dataType: 'json'
});

$('.landing-down-arrow').on('click', function (event) {
  event.preventDefault();
  $('html, body').stop().animate({
    scrollTop: $('#about-us').offset().top
  }, 1000);
});

$('#signup-form').on('ajax:success', function () {
  $('#signup-form-message').addClass('panel-success').removeClass('hidden panel-danger').children().text('Thanks for signing up for Wandr!');
  setTimeout(function () {
    $('#signup-modal').modal('hide')
  }, 3000);
}).on('ajax:error', function (e, data) {
  $('#signup-form-message').addClass('panel-danger').removeClass('hidden panel-success').children().text('We had an error signing you up. Your email or home airport choice might be invalid. Keep in mind that the home airport needs to be a 3 letter code.');
})

(function () {
  if (!Array.from) { // polyfill
    Array.from = Array.prototype.slice.call;
  }

  // optimize resize

  window.addEventListener('resize', resizeThrottler, false);

  var resizeTimeout;

  function resizeThrottler () {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        setFeatureHeight();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  var textSnippets = $('.animated-text > .animated');
  var i = 0;

  var datalistSupported = !!(document.createElement('datalist') && window.HTMLDataListElement);
  var ua = navigator.userAgent;

  // Android does not have actual support
  var isAndroidBrowser = ua.match(/Android/) && !ua.match(/(Firefox|Chrome|Opera|OPR)/);
  if (!datalistSupported || isAndroidBrowser) {
    document.getElementById('airport-list').addEventListener('mousedown', function (e) {
      document.getElementById('airport').value = e.target.innerText.slice(-4, -1);
      // fucking polyfill
    });
  }

  var fadeIn = function () {
    var index = i % textSnippets.length;
    textSnippets.eq(index - 1).addClass('hidden').removeClass('fadeOutLeft');
    textSnippets.eq(index).addClass('fadeInRight').removeClass('hidden');
    setTimeout(fadeOut, 3000);
  };

  var fadeOut = function () {
    var index = i % textSnippets.length;
    textSnippets.eq(index).removeClass('fadeInRight').addClass('fadeOutLeft');
    i += 1;
    setTimeout(fadeIn, 1000);
  };

  var setFeatureHeight = function () {
    var features = Array.from(document.getElementsByClassName('feature'));
    features.forEach(function (el) {
      el.style = '';
    });
    var height = Math.max.apply(null, features.map(function (el) {
      return el.clientHeight;
    }));
    features.forEach(function (el) {
      el.style.height = height + 'px';
    });
  };

  window.onload = function () {
    $('[data-toggle="tooltip"]').tooltip();
    AOS.init({ disable: 'mobile' });
    setFeatureHeight();
    setTimeout(fadeOut, 3000);
  };
}());
