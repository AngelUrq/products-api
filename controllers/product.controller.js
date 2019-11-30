const Product = require('../models/product')
const productController = {}

productController.getProducts = async (req, res) => {
  try {
    if (req.query.ids) {
      let idArray = req.query.ids.split(',')
    } else {
      const products = await Product.find()
      res.json(products)
    }
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

productController.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json({
      product
    })
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

productController.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body)

    await product.save()
    res.json({
      status: 'Product saved'
    })
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

productController.updateProduct = async (req, res) => {
  try {
    const { id } = req.params
    const product = {
      name: req.body.name,
      stock: req.body.stock
    }
    await Product.findByIdAndUpdate(id, {
      $set: product
    })
    res.json({
      status: 'Product updated'
    })
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

productController.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({
      status: 'Product deleted'
    })
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

module.exports = productController
