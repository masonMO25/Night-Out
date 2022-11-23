// TODO: get event listeners hooked up
// TODO: get input values after click
// TODO: Fire off correct api responses depending on which button I clicked 
// TODO: Display data


let mapOptions = {
    center:[38.616207, -90.250379],
    zoom:13
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = new L.Marker([38.616207, -90.250379]);
marker.addTo(map);

const saveSearch = function(){
    localStorage.setItem("zipcode", zipcode);
};

const formSumbitHandler = function(event){
    event.preventDefault();
    let zip = zipInputEl.value.trim();
    if(/^\d{5}$/.test(zip)){      // Using a regular expression to validate that our zipcode is a zip code
        // TODO: Should we store our zipcode value in localStorage?
        getRestaurant(zip);
        zipcode.unshift({zip});
        zipInputEl.value = "";
    } else{
        alert("Please enter a zipcode");    // TODO: display some text near the submision form instead of using this. I'll look into it later.
    };
};
