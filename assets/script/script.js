var searchRestaurant=document.getElementById("restaurant-search") 
var searchEvent=document.getElementById("event-search")

// TODO: get event listeners hooked up
// TODO: get input values after click
// TODO: Fire off correct api repsonses depending on which button I clicked 
// TODO: Display data

// Resturant API 
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1d4d2afd06msh8b774c1f4d35aa9p188f7djsn4373734bdfde',
		'X-RapidAPI-Host': 'restaurants-near-me-usa.p.rapidapi.com'
	}
};

fetch('https://restaurants-near-me-usa.p.rapidapi.com/restaurants/location/zipcode/63110/0', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));

    
searchRestaurant.addEventListener('click', function(ev) {
    ev.preventDefault()
    console.log("clicked on searchRestaurant");
    
});



