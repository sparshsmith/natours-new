/*eslint-disable */

export const displayMap = locations => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3BhcnNoc21pdGgiLCJhIjoiY2x0dHNqeXIzMTN0ajJpcDc3Z3ZtYWNqYyJ9.mGABya5p9qwrIfIfomo1wA';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/sparshsmith/clttt7zw700ed01p7chg0gq49',
        scrollZoom: false
        // center: [-118.113491, 34.111745],
        // zoom: 8,
        // interactive: false
    })

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach(loc => {
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);

        // Add popup
        new mapboxgl.Popup({
            offset: 30
        })
            .setLngLat(loc.coordinates)
            .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
            .addTo(map);
        // Extend map bounds to include current locations
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
}

