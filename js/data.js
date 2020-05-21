//Jquery extract URL parameters
$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results == null) {
        return null;
    } else {
        return decodeURI(results[1]) || 0;
    }
}


//Check for valid token.  If invalid Error
if ($.urlParam('token') === 'UrIuk2Re5uG9Xvj8ewtA') {

    //Check for null or blank parameters.  If null Error
    if ($.urlParam('lat') !== null && $.urlParam('lat') !== '' && $.urlParam('lon') !== null && $.urlParam('lon') !== '' && $.urlParam('address') !== null && $.urlParam('address') !== '' && $.urlParam('token') !== null && $.urlParam('token') !== '' && $.urlParam('service') !== null && $.urlParam('service') !== '') {

        //Assign URL parameters to variables.
        var lat = $.urlParam('lat');

        var lon = $.urlParam('lon');

        var address = decodeURIComponent($.urlParam('address'));

        var service = $.urlParam('service');

        //Continental US Bounding Box
        top = 49.3457868;
        left = -124.7844079;
        right = -66.9513812;
        bottom = 24.7433195;

        if (bottom <= lat && lat <= top && left <= lon && lon <= right) {

            if (service == 'Green') {
                var icon = new L.Icon({
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
            } else if (service == 'Yellow') {

                var icon = new L.Icon({
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
            } else {

                var icon = new L.Icon({
                    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });
            }

            var roads = L.gridLayer.googleMutant({
                type: 'roadmap' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
            });

            var satellite = L.gridLayer.googleMutant({
                type: 'satellite' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
            });

            var hybrid = L.gridLayer.googleMutant({
                type: 'hybrid' // valid values are 'roadmap', 'satellite', 'terrain' and 'hybrid'
            });


            var overlays = {
                "Sprint": L.tileLayer.wms('http://fgi-swift.frontiergeotek.com/geoserver/altice/wms?', {
                    layers: 'altice:SprintLTE1900',
                    format: 'image/png',
                    transparent: true,
                    opacity: 0.5
                })
            };

            var baseLayers = {
                "Google Roads": roads,
                "Satellite": satellite,
                "Hybrid": hybrid
            };


            var mymap = L.map('mapid', {
                zoomControl: false,
                layers: [roads]
            }).setView([lat, lon], 14);

            L.control.layers(baseLayers, overlays).addTo(mymap);

            overlays.Sprint.addTo(mymap);

            var popup1 = new L.Popup({
                'autoClose': false
            }).setContent(address);

            L.marker([lat, lon], {
                icon: icon
            }).addTo(mymap).bindPopup(popup1).openPopup();

            mymap._handlers.forEach(function(handler) {
                handler.disable();

            });

            //end of bounding box check
        } else {
            $(document).ready(function() {
                url = "400.html";
                $(location).attr("href", url);
            });
        }


        //End of Null Parameter check
    } else {
        $(document).ready(function() {
            url = "400.html";
            $(location).attr("href", url);
        });
    }

    // End of Token check
} else {
    $(document).ready(function() {
        url = "400.html";
        $(location).attr("href", url);
    });
}