const express = require("express")
const productController = require("../controllers/product.controller")
const router = express.Router()
const urlContain = require("../contains/url.contains")
const productContain = urlContain.URL_PRODUCT

const createProduct = router.post(productContain.CREATE_PRODUCT, productController.createProduct);
const getAllProduct = router.get(productContain.ALL_PRODUCT, productController.getAllProduct);
const deleteProductByCode = router.put(productContain.DELETE_PRODUCT_BYCODE, productController.deleteProductByCode);
const updateProductByCode = router.put(productContain.UPDATE_PRODUCT_BYCODE, productController.updateProductByCode);
const getSizeByCode = router.get(productContain.GET_SIZE_BYCODE, productController.getSizeByCode);
const getProductByCode = router.get(productContain.GET_PRODUCT_BYCODE, productController.getProductByCode);

module.exports = {
    createProduct,
    getAllProduct,
    deleteProductByCode,
    updateProductByCode,
    getSizeByCode,
    getProductByCode
}