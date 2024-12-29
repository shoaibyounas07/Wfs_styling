 // Function to add WFS Layer with configurable options
 function addWfsLayer({ wfsUrl, layerName, fieldName, color, fillOpacity }) {
    var wfsParams = {
        service: 'WFS',
        version: '2.0.0',
        request: 'GetFeature',
        typename: layerName,
        outputFormat: 'application/json',
        srsname: 'EPSG:4326'
    };

    var queryString = new URLSearchParams(wfsParams).toString();
    var fullWfsUrl = wfsUrl + '?' + queryString;

    fetch(fullWfsUrl)
        .then(response => response.json())
        .then(data => {
            var geoJsonLayer = L.geoJSON(data, {
                style: {
                    color: color,
                    weight: 1,
                    fillOpacity: fillOpacity
                },
                onEachFeature: function (feature, layer) {
                    // Bind popups with the selected field name
                    var fieldValue = feature.properties[fieldName];
                    layer.bindPopup(`<b>${fieldName}:</b> ${fieldValue}`);
                }
            });
            geoJsonLayer.addTo(map);
        })
        .catch(error => console.error('Error loading WFS layer:', error));
}

