const Product = require('../models/product')

const productService = {}

productService.getProducts = (ids) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (ids) {
        let codeArray = ids.split(',')

        const products = await Product.find({
          'code': { $in: codeArray}
        })

        return resolve(products)
      } else {
        products = await Product.find()
        return resolve(products)
      }
    } catch (error) {
      return reject(error)
    }
  })
}

productService.getProduct = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = await Product.findOne({
        'code': code
      })
  
      if (product) {
        resolve(product)
      } else{
        resolve({})
      }
    } catch (error) {
      return reject(error)
    }
  })
}

productService.createProduct = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      let codeType = body.unit ? 'REF' : 'EMP'
  
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
  
      let product = new Product(body)
      product.code = codeType + '-' + String(lastNumber + 1)
  
      await product.save()
      resolve({
        message: 'Product saved'
      })
    } catch (error) {
      return reject(error)
    }
  })
}

productService.updateProduct = (code, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const product = {
        name: body.name,
        stock: body.stock
      }
  
      await Product.findOneAndUpdate( { 'code': code }, {
        $set: product
      })

      resolve(product)
    } catch (error) {
      reject(error)
    }
  })
}

productService.deleteProduct = (code) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.findOneAndDelete({ 'code': code })
      resolve({
        message: 'Product deleted'
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = productService
