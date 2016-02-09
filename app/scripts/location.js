function initialize() {
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({
    'address': 'Mladost 1',
    'partialmatch': true
  }, geocodeResult);
}

function geocodeResult(results, status) {

  if (status == 'OK' && results.length > 0) {
    var latlng = new google.maps.LatLng(results[0].geometry.location.b, results[0].geometry.location.c);
    var myOptions = {
      zoom: 17,
      center: results[0].geometry.location,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("gmaps-container"), myOptions);
    var marker = new google.maps.Marker({
      position: results[0].geometry.location,
      map: map
    });

    var contentString = '<div id="et-gmaps-content">' +
      '<div id="bodyContent">' +
      '<p><a target="_blank" href="http://maps.google.com/maps?f=q&amp;source=s_q&amp;hl=en&amp;geocode=&amp;q=' + escape(results[0].formatted_address) + '&amp;ie=UTF8&amp;view=map">' + results[0].formatted_address + '</a>' +
      '</p>' +
      '</div>' +
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 100,
      maxHeight: 200
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker);
    });

    google.maps.event.trigger(marker, "click");

  } else {
    //alert("Geocode was not successful for the following reason: " + status);
  }
}
