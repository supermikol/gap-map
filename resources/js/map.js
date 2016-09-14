// FusionTableLayer implementation
// uses gmaps.js
var map, infoWindow;
var stanford;

infoWindow = new google.maps.InfoWindow({});
stanford = {lat:37.424106, lng:-122.166076};
map = new GMaps({
    el: '#map',
    center: stanford,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: map_style
});
map.loadFromFusionTables({
    query: {
        select: 'latitude',
        from: '13s3r6cYLKPziKzrgGECmGlYr-gMEzOsY3NZ7Ph0M'
    },
    suppressInfoWindows: true,
    styles: [{
        where: 'ratio <= 30',
        markerOptions: {
            iconName: 'small_blue'
        }
    }, {
        where: 'ratio > 30 AND ratio < 60',
        markerOptions: {
            iconName: 'small_yellow'
        }
    }, {
        where: 'ratio >= 60',
        markerOptions: {
            iconName: 'small_red'
        }
    }],
    events: {
        click: function(point){
            var row = point['row'];
            infoWindow.setContent(content(row));
            infoWindow.setPosition(new google.maps.LatLng(row['latitude']['value'],
                row['longitude']['value']));
            infoWindow.open(map.map);
        }
    }
});

// HandleBars
var infoWindowSource   = $("#infoWindow-template").html();
var infoWindowTemplate = Handlebars.compile(infoWindowSource);
// End HandleBars

var content = function(row) {
    var resources = row['resources']['value'].match(/\{(.*?)\}/g);
    var resourceList = '';
    for (var i = 0; i < resources.length; i++) {
        var dict = JSON.parse(resources[i]);
        if (dict['website'] != "NaN") {
            resourceList = '<li class=\"window-clinic\"><a href=\"'
                + dict['website'] + "\">" + dict['name'] + "</a>" + "<br>"
                + dict['address'] + "</li>" + resourceList;
        } else {
            resourceList += "<li class=\"window-clinic\">" + dict['name'] + "<br>" + dict['address'] + "</li>";
        }
    }
    var data = {resourceZip: row['zip']['value'],
        resourceRatio: parseFloat(row['ratio']['value']).toFixed(2),
        resourceList: resourceList};
    return infoWindowTemplate(data);
}

spinner.stop();
$('#overlay').hide();

// infoWindow template modification
// START INFOWINDOW CUSTOMIZE.
// The google.maps.event.addListener() event expects
// the creation of the infowindow HTML structure 'domready'
// and before the opening of the infowindow, defined styles are applied.
// *
google.maps.event.addListener(infoWindow, 'domready', function() {

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
    iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', 'border-radius': '13px'});

});

// Manual fusion table query
// does not use gmaps.js

// function init() {
//     var api_key = 'AIzaSyDXTFFmLN74vFTFto8SiH7LUQ3TVvBwidI'
//     var table_id = '13s3r6cYLKPziKzrgGECmGlYr-gMEzOsY3NZ7Ph0M'
//     var query = 'SELECT * FROM ' + table_id;
//     var encoded_query = encodeURIComponent(query);
//     var url = ['https://www.googleapis.com/fusiontables/v2/query'];
//     url.push('?sql=' + encoded_query);
//     url.push('&key=' + api_key);
//     url.push('&callback=?');
//
//     // Send the JSONP request using jQuery
//     $.ajax({
//         url: url.join(''),
//         dataType: 'jsonp',
//         success: onDataFetched
//     });
// }
//
// function onDataFetched(data) {
//     console.log(data);
// }

// ------------------------------------------------- //

// ratio <= 30, light blue: #62B1F6
// ratio > 30 && ratio < 60, yellow-orange: #FFCC00
// ratio >= 60, orange-red: #FF4500

// var icon = {
//     path: google.maps.SymbolPath.CIRCLE,
//     fillColor: '#FFFFFF',
//     fillOpacity: 1.0,
//     scale: 6,
//     strokeColor: fillColor,
//     strokeWeight: 2
// };

// // Create the search box and link it to the UI element.
// var input = document.getElementById('pac-input');
// var searchBox = new google.maps.places.SearchBox(input);
// map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

// ------------------------------------------------- //

// var map, infowindow;
// var percent_colors;
// var markers;
//
//
//
// function component_to_hex(c) {
//     var hex = c.toString(16);
//     return hex.length == 1 ? "0" + hex : hex;
// }
//
// function rgb_to_hex(r, g, b) {
//     return "#" + component_to_hex(r) + component_to_hex(g) + component_to_hex(b);
// }
//
// var color = function(percent) {
//     for (var i = 1; i < percent_colors.length - 1; i++) {
//         if (percent < percent_colors[i].percent) {
//             break;
//         }
//     }
//     var lower = percent_colors[i - 1];
//     var upper = percent_colors[i];
//     var range = upper.percent - lower.percent;
//     var range_percent = (percent - lower.percent) / range;
//     var percent_lower = 1 - range_percent;
//     var percent_upper = range_percent;
//
//     var color = {
//         r: Math.floor(lower.color.r * percent_lower + upper.color.r * percent_upper),
//         g: Math.floor(lower.color.g * percent_lower + upper.color.g * percent_upper),
//         b: Math.floor(lower.color.b * percent_lower + upper.color.b * percent_upper)
//     };
//     return rgb_to_hex(color.r, color.g, color.b);
// }
//
// function populate_bounds() {
//     var bounds = map.getBounds();
//     for (var i = 0; i < markers.length; i++) {
//         if (!bounds.contains(markers[i].getPosition())) {
//             markers[i].setMap(null);
//         } else if (markers[i].getMap() == null) {
//             markers[i].setMap(map);
//         }
//     }
// }
//
// function init_populate() {
//
//     // HandleBars
//     var infoWindowSource   = $("#infoWindow-template").html();
//     var infoWindowTemplate = Handlebars.compile(infoWindowSource);
//     // End HandleBars
//
//     for (key in json_obj) {
//         if (json_obj.hasOwnProperty(key)) {
//             var resourceRatio = parseFloat(json_obj[key]['ratio']).toFixed(2);
//             // var fillColor = color(json_obj[key]['normalize_ratio']);
//
//             if (resourceRatio <= 30) { // light blue
//                 fillColor = "#62B1F6";
//             } else if (resourceRatio <= 60) { // yellow-orange
//                 fillColor = "#FFCC00";
//             } else { // orange-red
//                 fillColor = "#FF4500";
//             }
//
//             var icon = {
//                 path: google.maps.SymbolPath.CIRCLE,
//                 fillColor: '#FFFFFF',
//                 fillOpacity: 1.0,
//                 scale: 6,
//                 strokeColor: fillColor,
//                 strokeWeight: 2
//             };
//             var marker = new google.maps.Marker({
//                 map: map,
//                 icon: icon, // change for gradient
//                 title: json_obj[key]['zip'],
//                 position: new google.maps.LatLng({
//                     lat: parseFloat(json_obj[key]['latitude']),
//                     lng: parseFloat(json_obj[key]['longitude'])
//                 })
//             });
//
//             var resourceList, clinic;
//             var resourceList = "";
//             for (var i = 0; i < json_obj[key]['clinics'].length; i++) {
//                 clinic = json_obj[key]['clinics'][i];
//                 // console.log(clinic['website']);
//                 if (clinic['website']) {
//                     resourceList = "<li class=\"window-clinic\"><a href=\""
//                         + clinic['website'] + "\">" + clinic['name'] + "</a>" + "<br>" + clinic['address'] + "</li>" + resourceList;
//
//                 } else {
//                     resourceList += "<li class=\"window-clinic\">" + clinic['name'] + "<br>" + clinic['address'] + "</li>";
//                 }
//             }
//
//             var data = {resourceZip: json_obj[key]['zip'], resourceRatio: resourceRatio, resourceList: resourceList};
//             var content    = infoWindowTemplate(data);
//
//             google.maps.event.addListener(marker, 'click',
//                 (function(marker, content, infowindow) {
//                 return function() {
//                     infowindow.setContent(content);
//                     infowindow.open(map, marker);
//                 };
//             })(marker, content, infowindow));
//             markers.push(marker);
//         }
//     }
// }
//
// function init() {
//     // initialize variables
//     infowindow = new google.maps.InfoWindow();
//
//     // green, yellow, red (minimize)
//     percent_colors = [
//         { percent: 0.0, color: { r: 0x00, g: 0xff, b: 0 } },
//         { percent: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
//         { percent: 1.0, color: { r: 0xff, g: 0x00, b: 0 } } ];
//     markers = [];
//
//     // initialize map
//     var stanford = {lat:37.424106, lng:-122.166076};
//     map = new google.maps.Map(document.getElementById('map'), {
//         center: stanford,
//         zoom: 12,
//         mapTypeId: google.maps.MapTypeId.ROADMAP,
//         styles: map_style
//     });
//
//     // // Create the search box and link it to the UI element.
//     // var input = document.getElementById('pac-input');
//     // var searchBox = new google.maps.places.SearchBox(input);
//     // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
//
//     init_populate();
//     spinner.stop();
//     $('#overlay').hide();
//
//     // infoWindow template modification
//     // START INFOWINDOW CUSTOMIZE.
//     // The google.maps.event.addListener() event expects
//     // the creation of the infowindow HTML structure 'domready'
//     // and before the opening of the infowindow, defined styles are applied.
//     // *
//
//     google.maps.event.addListener(infowindow, 'domready', function() {
//
//         // Reference to the DIV that wraps the bottom of infowindow
//         var iwOuter = $('.gm-style-iw');
//
//         /* Since this div is in a position prior to .gm-div style-iw.
//          * We use jQuery and create a iwBackground variable,
//          * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
//         */
//         var iwBackground = iwOuter.prev();
//
//         // Removes background shadow DIV
//         iwBackground.children(':nth-child(2)').css({'display' : 'none'});
//
//         // Removes white background DIV
//         iwBackground.children(':nth-child(4)').css({'display' : 'none'});
//
//         // Moves the infowindow 115px to the right.
//         iwOuter.parent().parent().css({left: '115px'});
//
//         // Moves the shadow of the arrow 76px to the left margin.
//         iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
//
//         // Moves the arrow 76px to the left margin.
//         iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
//
//         // Changes the desired tail shadow color.
//         iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
//
//         // Reference to the div that groups the close button elements.
//         var iwCloseBtn = iwOuter.next();
//
//         // Apply the desired effect to the close button
//         iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', 'border-radius': '13px'});
//
//     });
//
//     google.maps.event.addListener(map, 'bounds_changed', populate_bounds); // idle, drag
// }
