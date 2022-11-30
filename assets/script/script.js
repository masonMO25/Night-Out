// TODO: get event listeners hooked up
// TODO: get input values after click
// TODO: Fire off correct api responses depending on which button I clicked 
// TODO: Display data

// TODO: Apply the geolocation using the Geolocation API later.

/*
let mapOptions = {
    center: [38.630737,-90.199501],
    zoom: 13
};

let map = new L.map('map' , mapOptions);
*/

// Adds OpenStreetMap as a layer
/*
let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map.addLayer(layer);
*/

// Simplify our map construction
let map = new L.map('map',{
    center: [38.630737,-90.199501],
    zoom: 13
});

map.addLayer(new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}));

/* Wanted to use Awesome Markers (https://github.com/lennardv2/Leaflet.awesome-markers), 
 * but they stopped being "awesome" when they made their library proprietary.
 * So I'm using leaflet-color-markers instead.
 * https://github.com/pointhi/leaflet-color-markers
 * A local set of icons is now on the assets/image directory
 */

let markers = L.layerGroup();   // We need an object that will represent a layer
markers.addTo(map);


const redIcon = new L.Icon({
    iconUrl: './assets/image/leaflet-color-markers/marker-icon-red.png',
    shadowUrl: './assets/image/leaflet-color-markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
    iconUrl: './assets/image/leaflet-color-markers/marker-icon-green.png',
    shadowUrl: './assets/image/leaflet-color-markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const blueIcon = new L.Icon({
    iconUrl: './assets/image/leaflet-color-markers/marker-icon-blue.png',
    shadowUrl: './assets/image/leaflet-color-markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const goldIcon = new L.Icon({
    iconUrl: './assets/image/leaflet-color-markers/marker-icon-gold.png',
    shadowUrl: './assets/image/leaflet-color-markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// We need to remove this marker. We can still center the map over St. Louis though,
// At least until we get the Geolocation API set up.
/*
let marker = new L.Marker(mapOptions.center,{icon:redIcon});
marker.addTo(map);
*/

// Earlier I had stated that the locate wasn't working. It probably would have been helpful to state that Leaflet Locate (https://github.com/domoritz/leaflet-locatecontrol) was used.
L.control.locate().addTo(map);


const cityInput = document.querySelector("#city");
const stateInput = document.querySelector("#state");
// Somebody deleted this. I put it back. Have a better name for it too. --JC
const zipInput = document.querySelector("#zip");

// Note: Somebody forgot to add an argument. I fixed it. --JC
// TODO: What if we wanted to do a save search based on city and state or geocoordinates?
// We might want to redo this function
/*
const saveSearch = function(data){
    localStorage.setItem("data", data);
};
*/

// TODO: I think we should get rid of this function
const formSumbitHandler = function(event){
    event.preventDefault();
    let city = cityInput.value.trim();
    let state = stateInput.value;   // This doesn't need a trim
    let zip = zipInput.value.trim();
    let term = term.value.trim();

    let location="", zipCode="";
    if(city.length > 0 && state !== ""){
        location = `${city}, ${state}`;     // Do a location search
    }
    if(zip !== "" && /^\d{5}$/.test(zip)){
        zipCode = zip;                      // Do a zip code search
    }
    if(location !== "" || zipCode !== ""){
        localStorage.setItem("location",[location,zipCode].join(" ").trim());
    }else{
        let error1 = document.querySelector("#error1")
        error1.innerText = "Please enter a location";
        setTimeout(()=>{
            error1.innerText = "";
        },5000);    // Clear the error after about five seconds
    }
    if(term !== ""){
        localStorage.setItem("term",term);
    }else{
        let error2 = document.querySelector("#error2")
        error2.innerText = "Please enter a location";
        setTimeout(()=>{
            error1.innerText = "";
        },5000);    // Clear the error after about five seconds
    }
};

const restaurantQuery = document.querySelector("#restaurant-query");    // text field
const restaurantSearch = document.querySelector("#restaurant-search"); // button

restaurantSearch.disabled = true;   // If our zipInputEl and restaurantQuery are empty, prevent the restaurantSearch button from being active

/* Borrowed alot of this from https://stackoverflow.com/questions/72570359/cryptojs-javascript-aes-128-ecb-encrypt-decrypt
 * It needs tougher encryption
 */
function decrypt(input,key){
    key = CryptoJS.enc.Utf8.parse(key);
    let decrypted =  CryptoJS.AES.decrypt(
        {ciphertext: CryptoJS.enc.Hex.parse(input)}, 
        key, 
        {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.ZeroPadding });

    decrypted = decrypted.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

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

// TODO: Fix this!
cityInput.addEventListener("keyup", (ev) => {
    ev.preventDefault();
    /*
    restaurantSearch.disabled = (ev.target.value.length === 0 || restaurantQuery.value.length === 0);
    if(!restaurantSearch.disabled && ev.keyCode === 13){
        // TODO: Run our search
        findTheRestaurants();
    */
});

// TODO: Make sure stateInput is not the first item on the list
/*
stateInput.addEventListener()
*/


zipInput.addEventListener("keyup", (ev) => {
    ev.preventDefault();    // TODO: Remove this later when we use our form
    restaurantSearch.disabled = (ev.target.value.length === 0 || restaurantQuery.value.length === 0);
    if(!restaurantSearch.disabled && ev.keyCode === 13){
        // TODO: Run our search
        findTheRestaurants();

    }
});

restaurantQuery.addEventListener("keyup", (ev) => {
    ev.preventDefault();    // TODO: Remove this later when we use our form
    restaurantSearch.disabled = (zipInput.value.length === 0 || ev.target.value.length === 0);
    if(!restaurantSearch.disabled && ev.keyCode === 13){
        // TODO: Run our search
        findTheRestaurants();
    }
});

/*
restaurantSearch.addEventListener("click", (ev) => {
    ev.preventDefault();
    // TODO: Run our search
});
*/

// TODO: remove this later. It didn't work.
// https://stackoverflow.com/questions/31879576/what-is-the-most-elegant-way-to-insert-objects-between-array-elements
const interleave = (arr, thing) => [].concat(...arr.map(n => [n, thing])).slice(0, -1);

const findRestaurants = document.querySelector("#findRestaurants");     // get our form

function findTheRestaurants(){
    const data = new FormData(findRestaurants);     // Get our data from the form, the easy way
    localStorage.setItem("lastSearch", JSON.stringify([...data.entries()]));      // WE should use this instead.
    // TODO: later get this search with lastSearch
    // TODO: Queue a list of the last 10 searches
    // TODO: Purge those searches
    //console.log(JSON.stringify([...data.entries()]));

    let search_data = Object.fromEntries([...data.entries()]);
    console.log("search_data");
    console.log(search_data);
    let search_location = search_data.location;
    let search_term     = search_data.term;
    console.log(search_location,search_term);

    // What's going on here?
    // We are converting or data.entries() to an array
    // The array is filtered to remove any empty values
    // The remaining values are mapped into a key and a URL friendly string
    // Those strings are joined together with ampersands
    let urlParams = [...data.entries()]
                        .filter(([k,v]) => v !== "")
                        .map(([k,v]) => `${k}=${encodeURIComponent(v)}`)
                        .join("&");
    console.log(urlParams);

    // Since we can't use the Yelp API on the client side to do queries
    // We need ot use the cors-anywhere Heroku App to bypass the Yelp API
    let queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search";

    // Safely encrypted
    let yelp = [
        "9&m_Umgc=qYDqnGe",
        "85a178357012d575",
        "f706bd7174c112cb",
        "6428057d9307af6a",
        "55669123cf1f9822",
        "78343c1dfa132987",
        "ff59fc1fdb62831d",
        "b7df45d22c63d5e2",
        "09fd9b952d95be6a",
        "98e726d964f7af4f",
        "9859a24d809f5eab",
        "c72f8055fbeeecdf",
        "744cbcbe42844e80",
        "42eba6b0966a87de",
        "31f1eb067334bbd9",
        "2a5469037b78d052",
        "032bf2d44e031566"
    ];

    let pinky = yelp.shift();       // "Gee Brain, what do you want to do tonight?"
    let brain = yelp.join("");      // "The same thing we do every night, Pinky. Try to take over the world!"

    fetch([queryURL,urlParams].join("?"),{
        "method"  : "get",
        "mode" : "cors",            // Seems pretty obvious we should use this
        "headers" : {
            "accept" : "application/json",
            "x-requested-with" : "xmlhttprequest",
            "Access-Control-Allow-Origin" : "*",
            "Authorization" : `Bearer ${decrypt(brain,pinky)}`
        }
    }).then(res => res.text()).then((text) => {
        // Where the magic happens!
        const results = document.querySelector("#results"); // TODO: Move this to a global scope

        // Clear our results after every search
        if(results.hasChildNodes){
            while(results.lastElementChild){
                results.removeChild(results.lastElementChild);
            }
        }

        // TODO: If our map has markers, clear them out
        //if(map.hasLayer(markers))
        //if(markers !== undefined)
        if(markers.getLayers().length > 0){
            //map.removeLayer(markers);
            //map.addLayer()
            markers.clearLayers();
        }

        const search_header = document.createElement("h3");
        //const term = localStorage.getItem("term");
        //const location = localStorage.getItem("location");
        search_header.innerHTML = `Results for <strong>${search_data.term}</strong> in <strong>${search_data.location}</strong>:`;
        results.append(search_header,document.createElement("br"));
        //results.innerText = JSON.stringify(text,null,2);  // output some JSON Data
        const data = JSON.parse(text);

        mapOptions = {
            "center" : data.region.center,
            "zoom" : 13
        }
        //map.panTo(data.region.center);

        let here = new L.LatLng(data.region.center.latitude,data.region.center.longitude)
        map.panTo(here);
        /* The Red marker will show where you are. The green ones will show businesses */
        let marker = new L.Marker(here,{icon:greenIcon});
        //marker.addTo(map);
        marker.addTo(markers);

;

        let data_results = data.businesses.map(business => {
            const result = document.createElement("div");
            result.classList.add("result");
            const biz_name = document.createElement("p");
            biz_name.innerHTML = `<strong>${business.name}</strong>`;
            const biz_rate = document.createElement("p");
            biz_rate.innerHTML = `${business.rating} out of 5 stars`;
            const biz_address = document.createElement("p");
            biz_address.innerHTML = business.location.display_address.join("<br>");
            const biz_phone  = document.createElement("p");     // TODO: Try input tel later
            biz_phone.innerHTML = business.display_phone;
            biz_distance = document.createElement("p");
            // Distance is in meters, so we need to convert to miles
            const m_in_mi = 1609.34;
            biz_distance.innerHTML = `${Number.parseFloat(business.distance / m_in_mi).toFixed(2)} mi.`;

            result.append(
                biz_name,
                biz_rate,
                biz_address,
                biz_phone,
                biz_distance
            );
            //console.log(result);
            //results.append(result);
            
            let result_clone = result.cloneNode(true);      // DEEP CLONING! (Need this to prevent Leaflet from stealing the original copy)

            let biz_point = new L.latLng(business.coordinates.latitude,business.coordinates.longitude);
            let biz_marker = new L.Marker(biz_point,{
                icon:redIcon,
                title: business.name
            });
            biz_marker.bindPopup(result_clone);
            //biz_marker.addTo(map);
            biz_marker.addTo(markers);
            // let biz_markie = "OH SNAP!";

            return result;
        });

        // What does this line to?
        // Becauyse data_results is a NodeList, it needst to be converted into an Array with Array.from
        // .reduce is used to create a new array where a horizontal rule (hr) is between each item.
        // .slice removes the last element in the array that is a null instead of a horizontal rule element
        // .flat is added to flatten the array
        // On the next line, we can use a spread operator to append each element to the results element. 
        data_results = Array.from(data_results).reduce((arr, item) => arr.concat(item, document.createElement("hr")), []).slice(0,-1).flat();
        results.append(...data_results);

    }).catch((err) => {
        // Where the magic SHOULDN'T happen
        console.error("Error: ", err);
    });

}

restaurantSearch.addEventListener("click", (ev) => {
    ev.preventDefault();
    findTheRestaurants();    
});
