const cards = document.querySelector('.cards');


let auth = 'Basic MTEzNTAzOjFRU0YzRQ=='
fetch('https://www.floristone.com/api/rest/flowershop/getproducts?category=v&count=12&start=1', {
    headers: {
      'Authorization': auth
    }
}).then(function (response) {
	if (response.ok) {
		return response.json();
	}
	else throw response;
}).then(function (data) {
	console.table(data);
	const products = data['PRODUCTS'];
	console.log(products)
	products.forEach(displayProducts);

}).catch(function (error) {
	console.warn(error);
});


function displayProducts(products) {
  // Create elements to add to the document
  let card = document.createElement('section');
  let h2 = document.createElement('h2');
  let h3 = document.createElement('h3');
  let portrait = document.createElement('img');
	
	// Build the image attributes by using the setAttribute method for the src, alt, and loading attribute values. (Fill in the blank with the appropriate variable).

  portrait.setAttribute('src', `${[products.SMALL]}`);
  portrait.setAttribute('alt', `Photo of ${['NAME']}`);
  portrait.setAttribute('loading', 'lazy');

  // Add the textContent property of the h2, h3, and h4 elements to contain the prophet's data.
  h2.textContent = `${[products.NAME]}`;
  h3.textContent = `${[products.DESCRIPTION]}`;

  // Add/append the section(card) with the h2, h3, and portrait element
  card.appendChild(h2);
	card.appendChild(portrait); 
  card.appendChild(h3);

  // Add/append the existing HTML div with the cards class with the section(card)
  cards.appendChild(card);
}


