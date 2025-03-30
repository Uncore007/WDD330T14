export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);

  return product;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback,
) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template; 
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  renderWithTemplate(headerTemplate, headerElement);

  displayBreadcrumb();

  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");
  renderWithTemplate(footerTemplate, footerElement);
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  const cartCount = Array.isArray(cartItems) ? cartItems.length : 0;
  
  // Find all cart count elements (some pages might have multiple instances)
  const cartCountElements = document.querySelectorAll("#cart-count");
  
  // Update all instances of the cart count
  cartCountElements.forEach(element => {
    element.textContent = cartCount;
  });
}

export function displayBreadcrumb() {
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    return;
  }
  
  const breadcrumb = document.createElement('div');
  breadcrumb.classList.add('breadcrumb');
  
  const header = document.querySelector('#main-header');
  
  if (header && header.parentNode) {
    header.parentNode.insertBefore(breadcrumb, header.nextSibling);
  }
  
  const path = window.location.pathname;
  
  if (path.includes('/product_listing/')) {
    const category = getParam('category');
    if (category) {
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
      
      const productList = document.querySelector('.product-list');
      const productCount = productList ? productList.children.length : 0;
      
      breadcrumb.innerHTML = `<a href="../index.html">Home</a> > ${formattedCategory} (${productCount} items)`;
    }
  } 
  else if (path.includes('/product_pages/')) {
    const productId = getParam('product');
    if (productId) {
      breadcrumb.innerHTML = `<a href="../index.html">Home</a> > <a href="../product_listing/index.html">Products</a>`;
    }
  }
  else if (path.includes('/cart/')) {
    breadcrumb.innerHTML = `<a href="../index.html">Home</a> > Cart`;
  }
  else if (path.includes('/checkout/')) {
    if (path.includes('/success.html')) {
      breadcrumb.innerHTML = `<a href="../index.html">Home</a> > <a href="../cart/index.html">Cart</a> > <a href="index.html">Checkout</a> > Order Complete`;
    } else {
      breadcrumb.innerHTML = `<a href="../index.html">Home</a> > <a href="../cart/index.html">Cart</a> > Checkout`;
    }
  }
}