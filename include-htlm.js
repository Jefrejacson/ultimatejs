function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("include-html");
      if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /*remove the attribute, and call this function once more:*/
            elmnt.removeAttribute("include-html");
            includeHTML();
          }
        }      
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
      }
    }
  };
  includeHTML();

 // Cart functionality
let cart = [];

// Function to update the cart UI
function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; // Clear current items

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartItemsList.appendChild(li);
    });
}

// Event listener for adding products to the cart
document.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('add-to-cart-btn')) {
        const productBox = event.target.closest('.product-box');
        const productName = productBox.querySelector('h3').innerText;
        const productPrice = productBox.querySelector('.price').innerText;

        cart.push({ name: productName, price: productPrice });
        console.log('Product added to cart:', { name: productName, price: productPrice });
        alert(`Added to cart: ${productName} - ${productPrice}`);
        updateCartUI(); // Update the cart display
    }
});
