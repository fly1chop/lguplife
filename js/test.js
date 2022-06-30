var numSlide = $('.slide > ul > li').length;
var slideNow = 1;
var slideNext = 0;
var slidePrev = 0;
var cardWidth = $('.slide > ul > li').outerWidth(true);
var barWidth = 0;
var boxWidth = 0;
var leftMax = 0;

$('.slide > ul > li').each(function(i) {
  $(this).css({'display': 'block', 'left': (cardWidth * i)+ 'px' });
  // barWidth += $(this).outerWidth(true);
})

showSlide(slideNow);

$('.slide p.control a.next').on('click', function() {
  if (slideNow === (numSlide)) {
    $('.slide > ul').css({'left': -(leftMax) + 'px', 'transition': 'left 0.3s'});
    $('.slide p.control a.next').css({'display': 'none'});
  } else {
    $('.slide p.control a.prev').css({'display': 'block'});
    $('.slide p.control a.next').css({'display': 'block'});
    showSlide(slideNext);
  }
})

$('.slide p.control a.prev').on('click', function() {
  if (slideNow === 1) {
    $('.slide p.control a.prev').css({'display': 'none'});
  } else {
    $('.slide p.control a.next').css({'display': 'block'});
    showSlide(slidePrev)
  }
})

function showSlide(n) {
  if (cardWidth >= leftMax) {cardWidth = leftMax}; 
  $('.slide > ul').css({'left': -(cardWidth * (n - 1)) + 'px', 'transition': 'left 0.3s'});
  $('.slide span.scroll-thumb').css({'left': ((100 / numSlide) * (n -1) + '%'), 'transition': 'left 0.3s'});
  slideNow = n;
  slidePrev = (n === 1) ? numSlide : (n - 1);
  slideNext = (n === numSlide) ? 1 : (n + 1);
}

// function showBanner(n, type) {
//   if (n > numBanner) n = numBanner;
//   if (type !== undefined && type === 'auto') {
//     if (bannerNow === numBanner && n === numBanner) n = 1;
//   }
//   offsetLeft = -$selector.find('.banner > li:eq(' + (n - 1) + ')').position().left;
//   if (offsetLeft <= offsetLeftMin) offsetLeft = offsetLeftMin;
//   $selector.find('.banner').css({'transition': 'left 0.3s', 'left': offsetLeft + 'px'});
//   bannerNow = n;
//   bannerPrev = (n === 1) ? 1 : (n - 1);
//   bannerNext = (n === numBanner) ? numBanner : (n + 1);
//   resetTimer();
//   // console.log(bannerPrev + ' / ' + bannerNow + ' / ' + bannerNext);
// }

setStatus();

function setStatus() {
  boxWidth = $('.slide > ul').innerWidth();
  barWidth = 0;
  $('.slide > ul > li').each(function(i) {
    barWidth += $(this).outerWidth(true);
  });
  leftMax = Math.abs(boxWidth - barWidth);
  $('.slide > ul').css({'width': (barWidth + 5) + 'px'});
  console.log(leftMax); //-1984

  //last
  $('.slide > li').each(function(i) {
    if (-$(this).position().left <= leftMax) {
      numSlide = i + 1;
      return false;
    }
  });

  if (numSlide < slideNow) slideNow = numSlide;
  showSlide(slideNow);
}

$(document).ready(function(){
  var list = $('ul.content-card > li');
  var numToShow = 4;
  var button = $('.more > a');
  var numInList = list.length;

  list.hide();

  if (numInList > numToShow) {button.css('visibility','visible');}
  list.slice(0, numToShow).show();
  button.on('click', function(){
    var showing = list.filter(':visible').length;
    list.slice(showing - 1, showing + numToShow).fadeIn();
    var nowShowing = list.filter(':visible').length;
    var contentBox = $('#main-visual div.content-box');
    if (nowShowing >= numInList) {
      button.css('visibility','collapse');
      contentBox.css({'padding-bottom': '400px'});
    }
  });
});

setHeaderDesign();
$(window).on('scroll', function() {
  setHeaderDesign();
});

function setHeaderDesign() {
  var scrollAmt = $(document).scrollTop();
  if (scrollAmt > 100) {
    $('#header').addClass('white');
  } else {
    $('#header').removeClass('white');
  }
}

/*
//headerScrollDesign
var header = document.getElementById('header');
// header.style.backgroundColor = 'red';
function headerScrollDesign(){
  var scrollNum = window.scroll(top);
  console.log(scrollNum);
}
headerScrollDesign()
*/