/* File: ./assets/script/maptest.js */

// Map at the center of London!
const map = L.map('map').setView([38.7012,-90.3623], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);