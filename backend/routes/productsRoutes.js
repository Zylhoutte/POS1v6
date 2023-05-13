const express = require("express");
const {
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  updateProductQuantity,
} = require("../controllers/productController");

const router = express.Router();

router.get("/getproducts", getProduct);
router.post("/addproducts", addProduct);
router.put("/updateproducts", updateProduct);
router.post("/deleteproducts", deleteProduct);
router.patch("/updateproductquantity", updateProductQuantity);

module.exports = router;
