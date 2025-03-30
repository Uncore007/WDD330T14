import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();
setTimeout(updateCartCount, 100);

const category = getParam("category");
const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);

document.querySelector("#category-title").textContent = category;

listing.init().then(() => {
  // Update breadcrumb with correct product count after products are loaded
  const productList = document.querySelector('.product-list');
  const productCount = productList ? productList.children.length : 0;
  
  const breadcrumb = document.querySelector('.breadcrumb');
  if (breadcrumb) {
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
    breadcrumb.innerHTML = `<a href="../index.html">Home</a> > ${formattedCategory} (${productCount} items)`;
  }
});