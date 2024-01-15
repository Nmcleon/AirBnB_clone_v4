/* Select some Amenities to be comfortable! */
$('document').ready(function () {
   const amenitiesId = {};
   $('INPUT[type="checkbox"]').click(function () {
     if ($(this).prop('checked')) {
       amenitiesId[$(this).attr('data-id')] = $(this).attr('data-name');
     } else {
       delete amenitiesId[$(this).attr('data-id')];
     }
     $('.amenities h4').text(Object.values(amenitiesId).join(', '));
   });
 });
