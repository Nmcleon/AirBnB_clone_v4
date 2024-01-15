/* API status */
$('document').ready(function () {
  /* JavaScript script (static/scripts/1-hbnb.js): */
  const amenitiesId = {};
  $('INPUT[type="checkbox"]').click(function () {
    if ($(this).prop('checked')) {
      amenitiesId[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenitiesId[$(this).attr('data-id')];
    }
    $('.amenities h4').text(Object.values(amenitiesId).join(', '));
  });
  /* Update the API entry point (api/v1/app.py) by replacing the current
  CORS CORS(app, origins="0.0.0.0") by CORS(app, resources={r"/api/v1/*": {"origins": "*"}}).
Change the route 1-hbnb to 2-hbnb in the file 2-hbnb.py (based on 1-hbnb.py)
Create a new template 2-hbnb.html (based on 1-hbnb.html) and update it
  */
  const callout = function () {
    $.ajax({
      type: 'get',
      url: `http://${window.location.hostname}:5001/api/v1/status/`,
      timeout: 5000,
      success: function (status) {
        if (status.status === 'OK') {
          $('DIV#api_status').addClass('available');
        } else {
          $('DIV#api_status').removeClass('available');
        }
      },
      error: function () {
        $('DIV#api_status').removeClass('available');
      },
      complete: function () {
        setTimeout(callout, 10000);
      }
    });
  };
  callout();
  /*
    Retrieve all places and create a articule tag
  */
  const getPlaces = function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: '{}',
      dataType: 'json',
      success: function (places) {
        $.each(places, function (index, place) {
          $('.places').append(
            '<article>' +
              '<div class="title_box">' +
              '<h2>' + place.name + '</h2>' +
              '<div class="price_by_night">' + place.price_by_night +
              '</div>' +
              '</div>' +
              '<div class="information">' +
              '<div class="max_guest">' +
              '<br />' + place.max_guest + ' Guests' +
              '</div>' +
              '<div class="number_rooms">' +
              '<br />' + place.number_rooms + ' Bedrooms' +
              '</div>' +
              '<div class="number_bathrooms">' +
              '<br />' + place.number_bathrooms + ' Bathroom' +
              '</div>' +
              '</div>' +
              '<div class="description">' + place.description +
              '</div>' +
              '</article>');
        });
      }
    });
  };
  getPlaces();
  /*
    Filter places by amenities
  */
  $('button').click(function () {
    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: 'http://localhost:5001/api/v1/places_search/',
      data: JSON.stringify({ amenities: Object.keys(amenitiesId) }),
      dataType: 'json',
      success: function (places) {
        $('.places').empty();
        $.each(places, function (index, place) {
          $('.places').append(
            '<article>' +
            '<div class="title_box">' +
            '<h2>' + place.name + '</h2>' +
            '<div class="price_by_night">' + '$' + place.price_by_night +
            '</div>' +
            '</div>' +
            '<div class="information">' +
            '<div class="max_guest">' +
            '<br />' + place.max_guest + ' Guests' +
            '</div>' +
            '<div class="number_rooms">' +
            '<br />' + place.number_rooms + ' Bedrooms' +
            '</div>' +
            '<div class="number_bathrooms">' +
            '<br />' + place.number_bathrooms + ' Bathroom' +
            '</div>' +
            '</div>' +
            '<div class="description">' + place.description +
            '</div>' +
            '</article>');
        });
      }
    });
  });
});
