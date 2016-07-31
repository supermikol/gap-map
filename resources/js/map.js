// // // 501 Congress Ave, Austin, TX 78701, USA
// // // 501 Congress Ave, Austin, TX 78701, USA
// // var map, markers, search_markers, output, infowindow;
// //
// // function read_file(file) {
// //     var rawFile = new XMLHttpRequest();
// //     rawFile.open("GET", file, false);
// //     rawFile.onreadystatechange = function() {
// //         if (rawFile.readyState === 4) {
// //             if (rawFile.status === 200 || rawFile.status == 0) {
// //                 output = rawFile.responseText;
// //             }
// //         }
// //     }
// //     rawFile.send(null);
// // }
// //
// // // 50, 15
// // var mcOptions = {gridSize: 100, maxZoom: 15,
// //     imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'};
// // function populate_bounds() {
// //     var bounds = map.getBounds();
// //     for (var i = 0; i < markers.length; i++) {
// //         if (!bounds.contains(markers[i].getPosition())) {
// //             markers[i].setMap(null);
// //         } else if (markers[i].getMap() == null) {
// //             markers[i].setMap(map);
// //         }
// //     }
// //
// //     var marker_cluster = new MarkerClusterer(map, markers, mcOptions);
// // }
// //
// // function init() {
// //     map = new google.maps.Map(document.getElementById('map'), {
// //         center: {
// //             lat: 39.09024,
// //             lng: -96.712891
// //         },
// //         zoom: 5,
// //         mapTypeId: google.maps.MapTypeId.ROADMAP,
// //         styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
// //     });
// //
// //     infowindow = new google.maps.InfoWindow();
// //     markers = [];
// //
// //     var dot = {
// //         url: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
// //         scaledSize: new google.maps.Size(5, 5), // 15, 15
// //         origin: new google.maps.Point(0, 0),
// //         anchor: new google.maps.Point(0, 0)
// //     }
// //
// //     read_file('data.txt');
// //     var json_obj = JSON.parse(output);
// //     var count = 0;
// //     for (key in json_obj) {
// //         if (json_obj.hasOwnProperty(key)) {
// //             var data = json_obj[key];
// //
// //             var first_val = data[0];
// //             var content = first_val['message'];
// //             if (data.length != 1) {
// //                 content += '<hr>';
// //             }
// //             for (var i = 1; i < data.length; i++) {
// //                 content += data[i]['message'] + '<hr>'
// //             }
// //             var marker = new google.maps.Marker({
// //                 map: map,
// //                 icon: dot, // 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png',
// //                 // animation: google.maps.Animation.DROP,
// //                 title: 'test', // tup['name'],
// //                 position: new google.maps.LatLng({
// //                     lat: parseFloat(first_val['latitude']),
// //                     lng: parseFloat(first_val['longitude'])
// //                 })
// //             });
// //             content = '<div id=\"pop\">' + content + '</div>';
// //             google.maps.event.addListener(marker, 'click',
// //                 (function(marker, content, infowindow) {
// //                     return function() {
// //                         infowindow.setContent(content);
// //                         infowindow.open(map, marker);
// //                     };
// //                 })(marker, content, infowindow));
// //             markers.push(marker);
// //         }
// //     }
// //
// //     // Create the search box and link it to the UI element.
// //     var input = document.getElementById('pac-input');
// //     var searchBox = new google.maps.places.SearchBox(input);
// //     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
// //
// //     // Bias the SearchBox results towards current map's viewport.
// //     map.addListener('bounds_changed', function() {
// //         searchBox.setBounds(map.getBounds());
// //     });
// //
// //     search_markers = [];
// //     // Listen for the event fired when the user selects a prediction and retrieve
// //     // more details for that place.
// //     searchBox.addListener('places_changed', function() {
// //         var places = searchBox.getPlaces();
// //
// //         if (places.length == 0) {
// //             return;
// //         }
// //
// //         // Clear out the old markers.
// //         search_markers.forEach(function(marker) {
// //             marker.setMap(null);
// //         });
// //         search_markers = [];
// //
// //         // For each place, get the icon, name and location.
// //         var bounds = new google.maps.LatLngBounds();
// //         places.forEach(function(place) {
// //             if (!place.geometry) {
// //                 console.log("Returned place contains no geometry");
// //                 return;
// //             }
// //             var icon = {
// //                 // 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // place.icon,
// //                 url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
// //                 size: new google.maps.Size(71, 71),
// //                 origin: new google.maps.Point(0, 0),
// //                 anchor: new google.maps.Point(17, 34),
// //                 scaledSize: new google.maps.Size(35, 35)
// //             };
// //
// //             // Create a marker for each place.
// //             search_markers.push(new google.maps.Marker({
// //                 map: map,
// //                 icon: icon,
// //                 animation: google.maps.Animation.DROP,
// //                 title: place.name,
// //                 position: place.geometry.location
// //             }));
// //
// //             if (place.geometry.viewport) {
// //                 // Only geocodes have viewport.
// //                 bounds.union(place.geometry.viewport);
// //             } else {
// //                 bounds.extend(place.geometry.location);
// //             }
// //         });
// //         map.fitBounds(bounds);
// //     });
// //
// //     google.maps.event.addListener(map, 'bounds_changed', populate_bounds); // idle, drag
// // }
//
//
// // -------
// var infowindow;
// var output, json; // 0: people, 1: places
// var markers_array;
// var map;
//
// function read_file(file) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4) {
//             if (rawFile.status === 200 || rawFile.status == 0) {
//                 output.push(rawFile.responseText);
//             }
//         }
//     }
//     rawFile.send(null);
// }
//
// function populate_bounds() {
//     var mc_options = {gridSize: 100, maxZoom: 15, // 50, 15
//         imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'
//     };
//     var bounds = map.getBounds();
//
//     for (var i = 0; i < markers_array.length; i++) {
//         for (var j = 0; j < markers_array[i].length; j++) {
//             if (!bounds.contains(markers_array[i][j].getPosition())) {
//                 markers_array[i][j].setMap(null);
//             }
//             else if (markers_array[i][j].getMap() == null) {
//                 markers_array[i][j].setMap(map);
//             }
//         }
//         var marker_clusterer = new MarkerClusterer(map, markers, mc_options);
//     }
// }
//
// function init() {
//     // initialize variables
//     infowindow = new google.maps.InfoWindow();
//     markers_array = [];
//     marker_clusters = [];
//
//     output = [];
//     json = [];
//
//     var dot = {
//         url: 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png',
//         scaledSize: new google.maps.Size(5, 5), // 15, 15
//         origin: new google.maps.Point(0, 0),
//         anchor: new google.maps.Point(0, 0)
//     }
//
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: {
//             lat: 39.09024,
//             lng: -96.712891
//         },
//         zoom: 5,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
//     });
//
//     // read JSON data
//     // read_file('people.txt')
//     read_file('data.txt') // places.txt
//     for (var i = 0; i < output.length; i++) {
//         json.push(JSON.parse(output[i]));
//     }
//
//     // store data
//     var data, first_val, content, marker, markers;
//     for (var i = 0; i < json.length; i++) {
//         markers = [];
//         for (key in json[i]) {
//             if (json[i].hasOwnProperty(key)) {
//                 console.log('yeah');
//                 data = json[i][key];
//                 first_val = data[0];
//                 content = first_val['message'];
//                 if (data.length != 1) {
//                     content += '<hr>';
//                 }
//                 for (var i = 1; i < data.length; i++) {
//                     content += data[i]['message'] + '<hr>'
//                 }
//                 marker = new google.maps.Marker({
//                     map: map,
//                     icon: dot, // 'https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle.png',
//                     // animation: google.maps.Animation.DROP,
//                     title: 'test', // tup['name'],
//                     position: new google.maps.LatLng({
//                         lat: parseFloat(first_val['latitude']),
//                         lng: parseFloat(first_val['longitude'])
//                     })
//                 });
//                 content = '<div id=\"pop\">' + content + '</div>';
//                 google.maps.event.addListener(marker, 'click',
//                     (function(marker, content, infowindow) {
//                         return function() {
//                             infowindow.setContent(content);
//                             infowindow.open(map, marker);
//                         };
//                     })(marker, content, infowindow));
//             }
//             markers.push(marker);
//         }
//         markers_array.push(markers);
//     }
//
//     // Create the search box and link it to the UI element.
//     var input = document.getElementById('pac-input');
//     var searchBox = new google.maps.places.SearchBox(input);
//     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//     // Bias the SearchBox results towards current map's viewport.
//     map.addListener('bounds_changed', function() {
//         searchBox.setBounds(map.getBounds());
//     });
//
//     var search_markers = [];
//     // Listen for the event fired when the user selects a prediction and retrieve
//     // more details for that place.
//     searchBox.addListener('places_changed', function() {
//         var places = searchBox.getPlaces();
//
//         if (places.length == 0) {
//             return;
//         }
//
//         // Clear out the old markers.
//         search_markers.forEach(function(marker) {
//             marker.setMap(null);
//         });
//         search_markers = [];
//
//         // For each place, get the icon, name and location.
//         var bounds = new google.maps.LatLngBounds();
//         places.forEach(function(place) {
//             if (!place.geometry) {
//                 console.log("Returned place contains no geometry");
//                 return;
//             }
//             var icon = {
//                 // 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // place.icon,
//                 url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
//                 size: new google.maps.Size(71, 71),
//                 origin: new google.maps.Point(0, 0),
//                 anchor: new google.maps.Point(17, 34),
//                 scaledSize: new google.maps.Size(35, 35)
//             };
//
//             // Create a marker for each place.
//             search_markers.push(new google.maps.Marker({
//                 map: map,
//                 icon: icon,
//                 animation: google.maps.Animation.DROP,
//                 title: place.name,
//                 position: place.geometry.location
//             }));
//
//             if (place.geometry.viewport) {
//                 // Only geocodes have viewport.
//                 bounds.union(place.geometry.viewport);
//             } else {
//                 bounds.extend(place.geometry.location);
//             }
//         });
//         map.fitBounds(bounds);
//     });
//
//     google.maps.event.addListener(map, 'bounds_changed', populate_bounds); // idle, drag
// }

var map, infowindow;
var percent_colors;
var markers;

function component_to_hex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgb_to_hex(r, g, b) {
    return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
}

var color = function(percent) {
    for (var i = 1; i < percent_colors.length - 1; i++) {
        if (percent < percent_colors[i].percent) {
            break;
        }
    }
    var lower = percent_colors[i - 1];
    var upper = percent_colors[i];
    var range = upper.percent - lower.percent;
    var range_percent = (percent - lower.percent) / range;
    var percent_lower = 1 - range_percent;
    var percent_upper = range_percent;

    var color = {
        r: Math.floor(lower.color.r * percent_lower + upper.color.r * percent_upper),
        g: Math.floor(lower.color.g * percent_lower + upper.color.g * percent_upper),
        b: Math.floor(lower.color.b * percent_lower + upper.color.b * percent_upper)
    };
    return rgb_to_hex(color.r, color.g, color.b);
}

function populate_bounds() {
    var bounds = map.getBounds();
    for (var i = 0; i < markers.length; i++) {
        if (!bounds.contains(markers[i].getPosition())) {
            markers[i].setMap(null);
        } else if (markers[i].getMap() == null) {
            markers[i].setMap(map);
        }
    }
}

function init_populate() {
    // HandleBars
    var infoWindowSource   = $("#infoWindow-template").html();
    var infoWindowTemplate = Handlebars.compile(infoWindowSource);
    // End HandleBars

    for (key in json_obj) {
        if (json_obj.hasOwnProperty(key)) {
            var ratio = json_obj[key]['asd_to_clinic_ratio'];
            // var fillColor = color(json_obj[key]['normalize_ratio']);

            if (ratio <= 30) { // light blue
                fillColor = "#62B1F6";
            } else if (ratio > 30 && ratio <= 60) { // yellow-orange
                fillColor = "#FFCC00";
            } else { // orangered
                fillColor = "#FF4500";
            }

            var icon = {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#FFFFFF',
                fillOpacity: 1.0,
                scale: 6,
                strokeColor: fillColor,
                strokeWeight: 2
            };
            var marker = new google.maps.Marker({
                map: map,
                icon: icon, // change for gradient
                title: json_obj[key]['zip'],
                position: new google.maps.LatLng({
                    lat: parseFloat(json_obj[key]['latitude']),
                    lng: parseFloat(json_obj[key]['longitude'])
                })
            });

            var resourceList, clinic;
            var resourceList = "";
            for (var i = 0; i < json_obj[key]['clinics'].length; i++) {
                clinic = json_obj[key]['clinics'][i];
                resourceList += "<li class=\"window-clinic\"><a href=\""
                    + clinic['website'] + "\"" + clinic['name'] + "</a>"
                    + clinic['address'] + "</li>";
            }

            var data = {resourceZip: json_obj[key]['zip'], resourceRatio: json_obj[key]['asd_to_clinic_ratio'], resourceList: resourceList};
            var content    = infoWindowTemplate(data);

            google.maps.event.addListener(marker, 'click',
                (function(marker, content, infowindow) {
                return function() {
                    infowindow.setContent(content);
                    infowindow.open(map, marker);
                };
            })(marker, content, infowindow));
            markers.push(marker);
        }
    }
}

function init() {
    // initialize variables
    infowindow = new google.maps.InfoWindow();

    // green, yellow, red (minimize)
    percent_colors = [
        { percent: 0.0, color: { r: 0x00, g: 0xff, b: 0 } },
        { percent: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
        { percent: 1.0, color: { r: 0xff, g: 0x00, b: 0 } } ];
    markers = [];

    // initialize map
    var stanford = {lat:37.424106, lng:-122.166076};
    map = new google.maps.Map(document.getElementById('map'), {
        center: stanford,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_style
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    init_populate();

    // infoWindow template modification
    // START INFOWINDOW CUSTOMIZE.
    // The google.maps.event.addListener() event expects
    // the creation of the infowindow HTML structure 'domready'
    // and before the opening of the infowindow, defined styles are applied.
    // *
    google.maps.event.addListener(infowindow, 'domready', function() {

    // Reference to the DIV that wraps the bottom of infowindow
    var iwOuter = $('.gm-style-iw');

    /* Since this div is in a position prior to .gm-div style-iw.
     * We use jQuery and create a iwBackground variable,
     * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
    */
    var iwBackground = iwOuter.prev();

    // Removes background shadow DIV
    iwBackground.children(':nth-child(2)').css({'display' : 'none'});

    // Removes white background DIV
    iwBackground.children(':nth-child(4)').css({'display' : 'none'});

    // Moves the infowindow 115px to the right.
    iwOuter.parent().parent().css({left: '115px'});

    // Moves the shadow of the arrow 76px to the left margin.
    iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Moves the arrow 76px to the left margin.
    iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});

    // Changes the desired tail shadow color.
    iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

    // Reference to the div that groups the close button elements.
    var iwCloseBtn = iwOuter.next();

    // Apply the desired effect to the close button
    iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9'});

    // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
    if($('.iw-content').height() < 140){
      $('.iw-bottom-gradient').css({display: 'none'});
    }

    // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
    iwCloseBtn.mouseout(function(){
      $(this).css({opacity: '1'});
    });
    });

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });

    var search_markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function() {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        search_markers.forEach(function(marker) {
            marker.setMap(null);
        });
        search_markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                // 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png', // place.icon,
                url: 'https://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png',
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(35, 35)
            };

            // Create a marker for each place.
            search_markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                animation: google.maps.Animation.DROP,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
    google.maps.event.addListener(map, 'bounds_changed', populate_bounds); // idle, drag
}
