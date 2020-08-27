// quick search regex
var qsRegex;

// init Isotope
var $grid = $('.grid').isotope({
  itemSelector: '.grid__item',
  layoutMode: 'fitRows',
  filter: function() {
    return qsRegex ? $(this).text().match(qsRegex) : true;
  }
});

// use value of search field to filter
var $quicksearch = $('.quicksearch').keyup(debounce(function() {
  qsRegex = new RegExp($quicksearch.val(), 'gi');
  $grid.isotope();
}, 200));

// debounce so filtering doesn't happen every millisecond
function debounce(fn, threshold) {
  var timeout;
  threshold = threshold || 200;
  return function debounced(){
    clearTimeout(timeout);
    var args = arguments;
    var _this = this;
    function delayed() {
      fn.apply(_this, args);
	    checkResults();
    }
    timeout = setTimeout(delayed, threshold);
    var tabEvent = args[0].originalEvent.key;
    if (($('.qs-clear').length === 0) && (tabEvent !== "Tab")){
      if (tabEvent !== "Shift"){
        $('.qs-container').append('<div class="qs-clear" title="Clear search" alt="clear search" >&times;</div>');
      }
    } else if ($('.quicksearch').val() === '') {
      $('.qs-clear').remove();
    }
  };
}


// function to check if filters have some results
function checkResults(){
  var visibleItemsCount = $grid.data('isotope').filteredItems.length;
  if( visibleItemsCount > 0 ){
    $('.no-results-hidden').hide();
  }
  else{
    $('.no-results-hidden').fadeIn(350);
  }
}

// clear the quicksearch with x click 
var $quicksearchEmpty = $(document).on('click', '.qs-clear', debounce(function() {
  qsRegex = new RegExp( $quicksearchEmpty.val(), 'gi');
  $('.qs-clear').remove();
  $('.quicksearch').val('');
  $grid.isotope();
}, 200));

