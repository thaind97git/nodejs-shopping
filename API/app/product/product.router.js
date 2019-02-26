const express = require("express")
const productController = require("../product/product.controller")
const router = express.Router()
const urlContain = require("../../contains/url.contains")
const productContain = urlContain.URL_PRODUCT

router.post(productContain.CREATE_PRODUCT, productController.createProduct);
router.get(productContain.ALL_PRODUCT, productController.getAllProduct);
router.put(productContain.DELETE_PRODUCT_BYCODE, productController.deleteProductByCode);
router.put(productContain.UPDATE_PRODUCT_BYCODE, productController.updateProductByCode);
router.get(productContain.GET_SIZE_BYCODE, productController.getSizeByCode);
router.get(productContain.GET_PRODUCT_BYCODE, productController.getProductByCode);
router.get(productContain.GET_PRODUCT_ID, productController.getProductById);

module.exports = router;