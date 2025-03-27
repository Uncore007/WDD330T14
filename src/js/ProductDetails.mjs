import { getLocalStorage, setLocalStorage, updateCartCount } from "./utils.mjs";

function productDetailsTemplate(product) {
  // Calculate discount based on SuggestedRetailPrice vs FinalPrice
  let discountPercentage = 0;
  let discountElement = '';
  
  if (product.SuggestedRetailPrice && product.SuggestedRetailPrice > product.FinalPrice) {
    discountPercentage = Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100);
    discountElement = `
      <div class="discount-badge">
        ${discountPercentage}% OFF
      </div>
    `;
  }

  return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <div class="product-image-container">
      <img
        class="divider"
        src="${product.Images.PrimaryLarge}"
        alt="${product.NameWithoutBrand}"
      />
      ${discountElement}
    </div>
    <div class="product-price">
      ${discountPercentage > 0 ? 
        `<p class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</p>` : 
        ''
      }
      <p class="product-card__price${discountPercentage > 0 ? ' discounted' : ''}">$${product.FinalPrice}</p>
    </div>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // once we have the product details we can render out the HTML
    this.renderProductDetails("main");
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    // Get current cart or initialize empty array if it doesn't exist
    let cart = getLocalStorage("so-cart");
    
    // If cart doesn't exist or isn't an array, initialize it
    if (!cart || !Array.isArray(cart)) {
      cart = [];
    }
    
    // Add the current product to the cart array
    cart.push(this.product);
    
    // Save the updated cart back to localStorage
    setLocalStorage("so-cart", cart);
    
    // Update the cart count display
    updateCartCount();
  }
  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}