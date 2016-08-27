// FusionTableLayer implementation
// uses gmaps.js

// var map, infoWindow;
// var stanford;
//
// infoWindow = new google.maps.InfoWindow({});
// stanford = {lat:37.424106, lng:-122.166076};
// map = new GMaps({
//     el: '#map',
//     center: stanford,
//     mapTypeId: google.maps.MapTypeId.ROADMAP,
//     styles: map_style
// });
// map.loadFromFusionTables({
//     query: {
//         select: 'latitude',
//         from: '13s3r6cYLKPziKzrgGECmGlYr-gMEzOsY3NZ7Ph0M'
//     },
//     suppressInfoWindows: true,
//     styles: [{
//         where: 'ratio <= 30',
//         markerOptions: {
//             iconName: 'small_blue'
//         }
//     }, {
//         where: 'ratio > 30 AND ratio < 60',
//         markerOptions: {
//             iconName: 'small_yellow'
//         }
//     }, {
//         where: 'ratio >= 60',
//         markerOptions: {
//             iconName: 'small_red'
//         }
//     }],
//     events: {
//         click: function(point){
//             var row = point['row'];
//             infoWindow.setContent(content(row));
//             infoWindow.setPosition(new google.maps.LatLng(row['latitude']['value'],
//                 row['longitude']['value']));
//             infoWindow.open(map.map);
//         }
//     }
// });
//
// // HandleBars
// var infoWindowSource   = $("#infoWindow-template").html();
// var infoWindowTemplate = Handlebars.compile(infoWindowSource);
// // End HandleBars
//
// var content = function(row) {
//     var resources = row['resources']['value'].match(/\{(.*?)\}/g);
//     var resourceList = '';
//     for (var i = 0; i < resources.length; i++) {
//         var dict = JSON.parse(resources[i]);
//         if (dict['website'] != "NaN") {
//             resourceList = '<li class=\"window-clinic\"><a href=\"'
//                 + dict['website'] + "\">" + dict['name'] + "</a>" + "<br>"
//                 + dict['address'] + "</li>" + resourceList;
//         } else {
//             resourceList += "<li class=\"window-clinic\">" + dict['name'] + "<br>" + dict['address'] + "</li>";
//         }
//     }
//     var data = {resourceZip: row['zip']['value'],
//         resourceRatio: parseFloat(row['ratio']['value']).toFixed(2),
//         resourceList: resourceList};
//     return infoWindowTemplate(data);
// }
//
// spinner.stop();
// $('#overlay').hide();
//
// // infoWindow template modification
// // START INFOWINDOW CUSTOMIZE.
// // The google.maps.event.addListener() event expects
// // the creation of the infowindow HTML structure 'domready'
// // and before the opening of the infowindow, defined styles are applied.
// // *
// google.maps.event.addListener(infoWindow, 'domready', function() {
//
//     // Reference to the DIV that wraps the bottom of infowindow
//     var iwOuter = $('.gm-style-iw');
//
//     /* Since this div is in a position prior to .gm-div style-iw.
//      * We use jQuery and create a iwBackground variable,
//      * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
//     */
//     var iwBackground = iwOuter.prev();
//
//     // Removes background shadow DIV
//     iwBackground.children(':nth-child(2)').css({'display' : 'none'});
//
//     // Removes white background DIV
//     iwBackground.children(':nth-child(4)').css({'display' : 'none'});
//
//     // Moves the infowindow 115px to the right.
//     iwOuter.parent().parent().css({left: '115px'});
//
//     // Moves the shadow of the arrow 76px to the left margin.
//     iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
//
//     // Moves the arrow 76px to the left margin.
//     iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
//
//     // Changes the desired tail shadow color.
//     iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
//
//     // Reference to the div that groups the close button elements.
//     var iwCloseBtn = iwOuter.next();
//
//     // Apply the desired effect to the close button
//     iwCloseBtn.css({opacity: '1', right: '38px', top: '3px', 'border-radius': '13px'});
//
// });

// Manual fusion table query
// does not use gmaps.js

var map, info_window;
var infoWindowTemplate;

function fetch_data(data) {
    var rows = data['rows'];
    for (var i in rows) {
        var row = rows[i];
        var ratio = row[3];
        var fillColor;

        if (ratio <= 30) { // light blue
            fillColor = "#62B1F6";
        } else if (ratio <= 60) { // yellow-orange
            fillColor = "#FFCC00";
        } else { // orange-red
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
            title: row[0],
            position: new google.maps.LatLng({
                lat: parseFloat(row[1]),
                lng: parseFloat(row[2])
            })
        });

        var re = /(\{"website":\s".*?",\s"name":\s".*?",\s"phone":\s".*?",\s"address":\s".*?",\s"email":\s".*?",\s"description":\s".*?"})/g;
        var resources = row[4].match(re);
        var resourceList = '';
        for (var j in resources) {
            var dict = JSON.parse(resources[j]);
            if (dict['website'] != "NaN") {
                resourceList = '<li class=\"window-clinic\"><a href=\"'
                    + dict['website'] + "\">" + dict['name'] + "</a>" + "<br>"
                    + dict['address'] + "</li>" + resourceList;
            } else {
                resourceList += "<li class=\"window-clinic\">" + dict['name'] + "<br>" + dict['address'] + "</li>";
            }
        }
        var data = {resourceZip: row[0],
            resourceRatio: parseFloat(row[3]).toFixed(2),
            resourceList: resourceList};
        var content = infoWindowTemplate(data);

        google.maps.event.addListener(marker, 'click', (function(marker, content, info_window) {
            return function() {
                info_window.setContent(content);
                info_window.open(map, marker);
            };
        })(marker, content, info_window));
    }
}

function populate() {
    var api_key = 'AIzaSyDXTFFmLN74vFTFto8SiH7LUQ3TVvBwidI';
    var table_id = [
        '1BaIkXA46JUNZ7ScuLMwn_c_JjMC4GnfpQGgb97N1',
        '1CISToIW2iAsH2vXeEbXyPigMGN57T40QYaN4nteO'
    ];

    var query = [];
    var encoded_query = [];
    var url = [];
    for (var i in table_id) {
        query.push('SELECT * FROM ' + table_id[i]);
        encoded_query.push(encodeURIComponent(query[i]));
        url.push('https://www.googleapis.com/fusiontables/v2/query'
            + '?sql=' + encoded_query[i] + '&key=' + api_key + '&callback=?');

        $.ajax({
            url: url[i],
            dataType: 'jsonp',
            success: fetch_data
        });
    }
}

function init() {
    var stanford  = {lat:37.424106, lng:-122.166076};

    info_window = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById('map'), {
        center: stanford,
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: map_style
    });

    // HandleBars
    var infoWindowSource   = $("#infoWindow-template").html();
    infoWindowTemplate = Handlebars.compile(infoWindowSource);
    // End HandleBars

    populate();

    google.maps.event.addListener(info_window, 'domready', function() {

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

    google.maps.event.addDomListener(window, 'load', function(){
        spinner.stop();
        $('#overlay').hide();
    });
}
