import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData();
const productId = getParam("product");

if (productId) {
  const product = new ProductDetails(productId, dataSource);
  product.init();
} else {
  console.error("No product ID found in URL");
}
