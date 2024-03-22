const express = require("express");

const {home, getAllProducts, createProduct, updateProductByName, deleteProduct} = require("../controller/controller.js");

const router = express.Router();

router.get("/", home);

router.get("/products", getAllProducts);

router.post("/add", createProduct);

router.put("/products/:productName", updateProductByName);

router.delete("/products/:productId", deleteProduct);

module.exports = router;