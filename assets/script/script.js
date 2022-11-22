// TODO: get event listeners hooked up
// TODO: get input values after click
// TODO: Fire off correct api repsonses depending on which button I clicked 
// TODO: Display data

var zipInputEl = document.querySelector("#zip");
var zipcode = [];

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
 
getRestaurant();

var formSumbitHandler = function(event){
    event.preventDefault();
    var zip = zipInputEl.value.trim();
    if(zip){
        getRestaurant(zip);
        zipcode.unshift({zip});
        zipInputEl.value = "";
    } else{
        alert("Please enter a zipcode");
    };
};

var saveSearch = function(){
    localStorage.setItem("zipcode", zipcode);
};