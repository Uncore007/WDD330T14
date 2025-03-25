// import { getLocalStorage } from "./utils.mjs";
// import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();
// Aquí iría el código existente para la funcionalidad del carrito

// function renderCartContents() {
//   // Obtener los items del carrito
//   let cartItems = getLocalStorage("so-cart");

//   // Verificar que cartItems sea un array
//   console.log("Tipo de cartItems:", typeof cartItems, cartItems);

//   // Si no es un array o es null/undefined, crear un array vacío
//   if (!Array.isArray(cartItems)) {
//     console.warn("cartItems no es un array, estableciendo a un array vacío");
//     cartItems = [];
//   }

//   if (cartItems.length === 0) {
//     document.querySelector(".product-list").innerHTML =
//       "<p>Your cart is empty</p>";
//     return;
//   }

//   // Ahora podemos usar map con seguridad
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }
// function renderCartContents() {
//   const cartItems = getLocalStorage("so-cart") || [];
  
//   // Verifica si hay elementos en el carrito
//   if (cartItems.length === 0) {
//     document.querySelector(".product-list").innerHTML = '<p>Your cart is empty</p>';
//     return;
//   }
  
//   const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//   document.querySelector(".product-list").innerHTML = htmlItems.join("");
// }

// function cartItemTemplate(item) {
//   const newItem = `<li class="cart-card divider">
//   <a href="#" class="cart-card__image">
//     <img
//       src="${item.Images.PrimaryMedium}"
//       alt="${item.Name}"
//     />
//   </a>
//   <a href="#">
//     <h2 class="card__name">${item.Name}</h2>
//   </a>
//   <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//   <p class="cart-card__quantity">qty: 1</p>
//   <p class="cart-card__price">$${item.FinalPrice}</p>
// </li>`;

//   return newItem;
// }

// renderCartContents();
import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";


function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  
  // Verifica si hay elementos en el carrito
  if (!cartItems || cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML = '<p>Your cart is empty</p>';
    return;
  }
  
  console.log("Contenido del carrito:", cartItems);
  
  try {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
  } catch (error) {
    console.error("Error al renderizar el carrito:", error);
    document.querySelector(".product-list").innerHTML = '<p>Error al mostrar los productos del carrito</p>';
  }
}

function cartItemTemplate(item) {
  console.log("Procesando item:", item);
  
  try {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimaryMedium}"
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
  } catch (error) {
    console.error("Error al generar la plantilla para el ítem:", item, error);
    return `<li class="cart-card divider">Error al mostrar el producto</li>`;
  }
}
loadHeaderFooter();

renderCartContents();