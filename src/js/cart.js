import { getLocalStorage, loadHeaderFooter, updateCartCount } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  console.log(cartItems);
  
  if (!cartItems) {
    document.querySelector(".product-list").innerHTML = `<li class="cart-card divider">
      <p class="empty-cart">Your cart is empty</p>
    </li>`;
    return;
  }
  
  // Make sure cartItems is an array before calling map
  const itemsArray = Array.isArray(cartItems) ? cartItems : [];
  console.log(itemsArray.length);
  
  const htmlItems = itemsArray.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  
  // Add cart total
  displayCartTotal(itemsArray);
}

function displayCartTotal(cartItems) {
  // Calculate the total price
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.FinalPrice), 0);
  
  // Create HTML for the total
  const totalHtml = `
    <div class="cart-total">
      <p class="cart-total__label">Total:</p>
      <p class="cart-total__amount">$${total.toFixed(2)}</p>
    </div>
  `;
  
  // Add the total after the product list
  const productList = document.querySelector(".product-list");
  productList.insertAdjacentHTML("afterend", totalHtml);
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
// Update cart count when page loads
setTimeout(updateCartCount, 100); // Small timeout to ensure header has loaded
