const productService = require('../services/product.service')

const productController = {}

productController.getProducts = async (req, res) => {
  productService.getProducts(req.params.ids)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json({
        code: 500,
        message: error.message
      })
    })
}

productController.getProduct = async (req, res) => {
  productService.getProduct(req.params.code)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json({
        code: 500,
        message: error.message
      })
    })
}

productController.createProduct = async (req, res) => {
  productService.createProduct(req.body)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json({
        code: 500,
        message: error.message
      })
    })
}

productController.updateProduct = async (req, res) => {
  productService.updateProduct(req.params.code, req.body)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json({
        code: 500,
        message: error.message
      })
    })
}

productController.deleteProduct = async (req, res) => {
  productService.deleteProduct(req.params.code)
    .then(response => {
      res.json(response)
    })
    .catch(error => {
      res.json({
        code: 500,
        message: error.message
      })
    })
}

module.exports = productController
