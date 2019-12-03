const Product = require('../models/product')
const productController = {}

productController.getProducts = async (req, res) => {
  try {
    if (req.query.ids) {
      let codeArray = req.query.ids.split(',')

      const products = await Product.find({
        'code': { $in: codeArray}
      })

      res.json(products)
    } else {
      products = await Product.find()
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
    const product = await Product.findOne({
      'code': req.params.code
    })

    if (product) {
      res.json(product)
    } else{
      res.json({})
    }
  } catch (error) {
    res.status(404).json({
      message: error
    })
  }
}

productController.createProduct = async (req, res) => {
  try {
    let codeType = req.body.unit ? 'REF' : 'EMP'

    const lastProduct = await Product
      .findOne({
        'code': { $regex: codeType + '.*' }
      })
      .sort({
        'code':-1
      })
      .collation({
        locale: "en_US", 
        numericOrdering: true
      })

    const lastNumber = lastProduct ? Number(lastProduct.code.split('-')[1]) : 0

    let product = new Product(req.body)
    product.code = codeType + '-' + String(lastNumber + 1)

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
    const product = {
      name: req.body.name,
      stock: req.body.stock
    }

    await Product.findOneAndUpdate( { 'code': req.params.code }, {
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
    await Product.findOneAndDelete({ 'code': req.params.code })
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
