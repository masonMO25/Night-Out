// TODO: get event listeners hooked up
// TODO: get input values after click
// TODO: Fire off correct api responses depending on which button I clicked 
// TODO: Display data

// TODO: Apply the geolocation using the Geolocation API later.
let mapOptions = {
    center:[38.616207, -90.250379],
    zoom:13
}

let map = new L.map('map' , mapOptions);

// TODO: Fill in this later.
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

//let marker = new L.Marker([38.616207, -90.250379]);
let marker = new L.Marker(mapOptions.center);
marker.addTo(map);

// Somebody deleted this. I put it back. Have a better name for it too. --JC
const zipInput = document.querySelector("#zip");

// Note: Somebody forgot to add an argument. I fixed it. --JC
const saveSearch = function(zipcode){
    localStorage.setItem("zipcode", zipcode);
};

const formSumbitHandler = function(event){
    event.preventDefault();
    let zip = zipInput.value.trim();
    if(/^\d{5}$/.test(zip)){      // Using a regular expression to validate that our zipcode is a zip code
        // TODO: See if we can store city and state in local storage as an alternate to local storage. Yelp API could help with that.
        getRestaurant(zip);
        //localStorage.setItem("zip",zip);    // Zip code is stored in local storage! Good Work! --JC
        saveSearch(zip);                      // What good is having the function if we don't use it?! --JC
        /*
        zipcode.unshift({zip});     // TODO: What was this for?
        zipInputEl.value = "";
        */
    } else{
        alert("Please enter a zipcode");    // TODO: display some text near the submission form instead of using this. I'll look into it later.
    };
};

const restaurantQuery = document.querySelector("#restaurant-query");    // text field
const restaurantSearch = document.querySelector("#restaurant-search"); // button

restaurantSearch.disabled = true;   // If our zipInputEl and restaurantQuery are empty, prevent the restaurantSearch button from being active

/**
 * A crash course in boolean
 * Let a = zipInputEl.value.length === 0
 * let b = restaurantQuery.value.length === 0
 * let c = restaurantSearch.disabled
 * 
 * Here's a truth table.
 *     a || b = c
 * true  || true  = true
 * true  || false = true
 * false || true  = true
 * false || false = false
 * 
 */

zipInput.addEventListener("keyup", (ev) => {
    ev.preventDefault();    // TODO: Remove this later when we use our form
    restaurantSearch.disabled = (ev.target.value.length === 0 || restaurantQuery.value.length === 0);
    if(!restaurantSearch.disabled && ev.keyCode === 13){
        // TODO: Run our search

    }
});

restaurantQuery.addEventListener("keyup", (ev) => {
    ev.preventDefault();    // TODO: Remove this later when we use our form
    restaurantSearch.disabled = (zipInput.value.length === 0 || ev.target.value.length === 0);
    if(!restaurantSearch.disabled && ev.keyCode === 13){
        // TODO: Run our search
    }
});

restaurantSearch.addEventListener("click", (ev) => {
    ev.preventDefault();    // TODO: Remove this later when we use our form
    // TODO: Run our search
});
