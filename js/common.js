// common script

$(document).ready(function() {
  preventDefaultAnchor();
  setHeaderDesign();
  setViewMore('#main-visual');
  setViewMore('section.tip');
  setScrollTop();
  expandLNB();
  setPageScroll();
  setGNB();
  setSlide();
  filterFunction();
});

$(window).on('scroll', function() {
  setHeaderDesign();
  checkPageNow();
  setScrollBar();
});

// $(window).on('resize', function() {
//   setSlide();
// })

function preventDefaultAnchor() {
  $(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
  });
}

function setHeaderDesign() {
  var scrollAmt = $(document).scrollTop();
  // console.log(scrollAmt);
  if (scrollAmt < 100) {
    $('#header').removeClass('white');
    $('body.sub #header').removeClass('title');
    $('body.sub #header').addClass('dark');
  } else if (scrollAmt > 600) {
    $('div.util').addClass('on');
  } else {
    $('#header').addClass('white');
    $('body.sub #header').removeClass('dark');
    $('body.sub #header').addClass('title');
    $('div.util').removeClass('on');
  }
}

function setScrollTop() {
  $('a.go-top').click(function() {
    $('html').stop(true).animate({'scrollTop': '0'}, 500);
    $('.sub-menu > ul > li > ul > li > a').removeClass('on');
    $('.sub-menu > ul > li > ul > li > a:eq(0)').addClass('on');
  })
}

function setGNB() {
  $('#header > a.menu').on('click', function() {
    var scrollAmt = $(document).scrollTop();
    if ($(this).hasClass('close')) {
      if (scrollAmt > 100) {
        $('#header').addClass('white').addClass('title');
      };
      $('#gnb').removeClass('open');
      $(this).removeClass('close');
      $('#header').removeClass('menu');
      $('body').removeClass('no-scroll');
    } else {
      $('#gnb').addClass('open');
      $(this).addClass('close');
      $('#header').removeClass('title').removeClass('white').addClass('menu');
      $('body').addClass('no-scroll');
    }
  });
}

function expandLNB() {
  $('.sub-menu > ul > li > a').on('click', function() {
    $('.sub-menu').toggleClass('on');
  });
}

function setPageScroll() { 
  $('.sub-menu > ul > li > ul > li > a').on('click', function() {
    var index = $('.sub-menu > ul > li > ul > li').index($(this).parent());
    showPage(index + 1);
  });

  function showPage(n) {
    var scrollAmt = $('section.tit-0' + (n)).offset().top;
    $('html').stop(true).animate({'scrollTop': scrollAmt}, 500);
    $('.sub-menu > ul > li > ul > li > a').removeClass('on');
    $('.sub-menu > ul > li > ul > li > a:eq(' + (n - 1) + ')').addClass('on');
  }
}

function checkPageNow() {
  var scrollAmt = $(document).scrollTop();
  var n = 0;
  $('.blog .article section').each(function(i) {
    var min = $(this).offset().top - ($(window).height() / 2);
    var max = $(this).offset().top + $(this).outerHeight(true) - ($(window).height() / 2);
    if (scrollAmt > min && scrollAmt <= max) {
      n = i + 1;
      return false;
    } else {n = 1}
  });
  $('.sub-menu > ul > li > ul > li > a').removeClass('on');
  $('.sub-menu > ul > li > ul > li > a:eq(' + (n - 1) + ')').addClass('on');
}

function setScrollBar() {
  var scrollAmt = $(document).scrollTop();
  var height = document.body.scrollHeight - 1000;
  var widthVal = (scrollAmt * 100) / height;
  $('span.bar').css({'width': widthVal + '%'});
}

// function setPopup() {
//   var scrollAmt = $(document).scrollTop();
//   var elTop = $('div.end').offset().top - ($(window).height() / 3);
//   // console.log(scrollAmt, elTop);
//   if (scrollAmt > elTop) {
//     $('div.survey').addClass('on');
//     $('#layer-mask').addClass('on');
//     $('body').addClass('no-scroll');
//   }

//   $('.layer-popup > a.close').on('click', function() {
//     $('div.survey').removeClass('on');
//     $('#layer-mask').removeClass('on');
//     $('body').removeClass('no-scroll');
//   })
// }

function setViewMore(selector) {
  var $selector = $(selector);
  var list = $selector.find('ul.content-card > li');
  var numToShow = 4;
  var button = $selector.find('.more > a');
  var numInList = list.length;
  
  list.hide();

  if (numInList > numToShow) {button.css('visibility', 'visible');}
  list.slice(0, numToShow).show();
  button.on('click', function() {
    var showing = list.filter(':visible').length;
    list.slice(showing - 1, showing + numToShow).fadeIn();
    var nowShowing = list.filter(':visible').length;
    if (nowShowing >= numInList) {
      button.css('visibility', 'hidden');
      $selector.find('.isNext').css('margin-top','100px');
    }
  });
}

function setSlide() {
  var numSlide = $('.slide > ul > li').length;
  var slideNow = 1;
  var slideNext = 0;
  var slidePrev = 0;
  var cardWidth = $('.slide > ul > li').outerWidth(true);
  var barWidth = 0;
  var boxWidth = 0;
  var leftMax = 0;
  var startX = 0;
  var deltaX = 0;
  var offsetX = 0;
  var isBlocked = false;

  $(window).on('resize', function() {
    cardWidth = $('.slide > ul > li').outerWidth(true);
    // console.log(cardWidth);
    $('.slide > ul > li').each(function(i) {
      $(this).css({'display': 'block', 'left': (cardWidth * i)+ 'px' });
    });
    showSlide(1);
    $('.slide p.control a.next').css({'display': 'block'});
    var windowWidth = $(window).width();
    if (windowWidth <= 575) {
      $('.features').addClass('mob');
    } else {
      $('.features').removeClass('mob');
    }
  })
    

  $('.slide > ul > li').each(function(i) {
    $(this).css({'display': 'block', 'left': (cardWidth * i)+ 'px' });
  });

  setStatus();

  $('.slide p.control a.next').on('click', function() {
    if (slideNow === (numSlide)) {
      $('.slide > ul').css({'left': -(leftMax - cardWidth) + 'px', 'transition': 'left 0.3s'});
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

  $('.slide > ul').on('mousedown', function(e) {
    var windowWidth = $(window).width();
    if (windowWidth <= 575) {
      e.preventDefault();
      startX = e.clientX;
      offsetX = $(this).position().left;

      $(document).on('mousemove', function(e) {
        deltaX = e.clientX - startX;
        if ((slideNow === 1 && deltaX > 0) || (slideNow === numSlide && deltaX < 0)) {
          deltaX = detlaX / 20;
        }
        if (Math.abs(deltaX) > 5) {isBlocked = true;} else {isBlocked = false};
        $('.slide > ul').css({'left': (offsetX + deltaX) + 'px'});
      });

      $(document).on('mouseup', function(e) {
        $(document).off('mousemove mouseup');
        if (deltaX < -50 && slideNow !== numSlide) {
          showSlide(slideNext);
        } else if (deltaX > 50 && slideNow !== 1) {
          showSlide(slidePrev);
        } else {
          showSlide(slideNow);
        }
        deltaX = 0;
      });
    }
  })

  function showSlide(n) {
    if (cardWidth >= leftMax) {cardWidth = leftMax};
    // console.log(cardWidth);
    $('.slide > ul').css({'left': -(cardWidth * (n - 1)) + 'px', 'transition': 'left 0.3s'});
    $('.slide span.scroll-thumb').css({'left': ((100 / numSlide) * (n -1) + '%'), 'transition': 'left 0.3s'});
    slideNow = n;
    slidePrev = (n === 1) ? numSlide : (n - 1);
    slideNext = (n === numSlide) ? 1 : (n + 1);
  }

  function setStatus() {
    boxWidth = $('.slide > ul').innerWidth();
    barWidth = 0;
    $('.slide > ul > li').each(function(i) {
      barWidth += $(this).outerWidth(true);
    });
    leftMax = Math.abs(boxWidth - barWidth);
    $('.slide > ul').css({'width': (barWidth + 5) + 'px'});
    // console.log(leftMax); //-1984

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
}

function filterFunction() {
  var item = document.getElementById('selectBox').value;

  $('section.tip ul.content-card > li').each(function(i) {
    var className = $(this).attr('class');
    
    if (item === className) {
      $('section.tip ul.content-card > li').hide();
      $('section.tip ul.content-card > li.'+ className).show();
    } else if (item === 'all') {
      $('section.tip ul.content-card > li').show();
    }; 
  });
}










