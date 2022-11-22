// TODO: get event listeners hooked up
// TODO: get input values after click
// TODO: Fire off correct api responses depending on which button I clicked 
// TODO: Display data


const zipInputEl = document.querySelector("#zip");
let zipcode = [];

// TODO: Should this function be asynchronous? --J.C.
function getRestaurant() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1d4d2afd06msh8b774c1f4d35aa9p188f7djsn4373734bdfde',
            'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
        }
    };

    fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/63125/0', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
};
 
getRestaurant();    // TODO: Why do we need to run this the first time?

const saveSearch = function(){
    localStorage.setItem("zipcode", zipcode);
};

const formSumbitHandler = function(event){
    event.preventDefault();
    let zip = zipInputEl.value.trim();
    if(/^\d{5}$/.test(zip)){      // Using a regular expression to validate tha our zipcode is a zip code
        // TODO: Should we store our zipcode value in localStorage?
        getRestaurant(zip);
        zipcode.unshift({zip});
        zipInputEl.value = "";
    } else{
        alert("Please enter a zipcode");    // TODO: display some text near the submision form instead of using this. I'll look into it later.
    };
};
