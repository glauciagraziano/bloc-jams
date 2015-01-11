$(document).ready(function() {
  $('.hero-content h3').click(function() {
    var subText = $(this).text();
    $(this).text(subText + "!");
  });
  $('.hero-content h3').click(function() {
     console.log('Hover action triggered.');
     $(this).css('color','red');
  });
  $('.selling-points .point h5').click(function() {
    console.log('Click action triggered');
    $(this).css('font-size', '30px');
  });
  var onHoverAction = function(event) {
    console.log('Hover action triggered');
    $(this).animate({'margin-top':'10px'});
  };
  var offHoverAction = function(event) {
    console.log('Hover action triggered');
    $(this).animate({'margin-top':'0px'});
  };
  
  $('.selling-points .point').hover(onHoverAction, offHoverAction);
  $('.navbar-header').click(function() {
    console.log('Click action triggered');
    $(this).fadeOut("slow");
  });
});

