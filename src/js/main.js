import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, updateCartCount } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");

const listing = new ProductList("Tents", dataSource, element);

loadHeaderFooter();
setTimeout(updateCartCount, 100);

listing.init();