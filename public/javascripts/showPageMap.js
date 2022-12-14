// const campground = require("../../models/campground");

mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
    projection: 'globe' // display the map as a 3D globe
});

// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());

map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

const marker1 = new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(new mapboxgl.Popup()
        .setHTML(`<h5>${campground.title}</h5><p>${campground.location}</p>`)) // add popup
    .addTo(map);