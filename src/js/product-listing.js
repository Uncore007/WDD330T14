import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount, getParam } from "./utils.mjs";

// Get the category from URL parameter
const category = getParam("category");
// Capitalize the first letter for display
const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
// Update the category title
document.querySelector(".category-title").textContent = categoryName;

const dataSource = new ProductData(category);
const element = document.querySelector(".product-list");

const listing = new ProductList(category, dataSource, element);

loadHeaderFooter();
setTimeout(updateCartCount, 100);

listing.init();