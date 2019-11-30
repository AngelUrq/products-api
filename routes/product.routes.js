const express = require('express')
const router = express.Router()

const productController = require('../controllers/product.controller')

/**
 * @swagger
 * /product-management/products:
 *  get:
 *    description: Use to request products
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/', productController.getProducts)

/**
 * @swagger
 * /product-management/products/{id}:
 *  get:
 *    description: Use to request a product by ID
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get('/:id', productController.getProduct)

/**
 * @swagger
 * /product-management/products:
 *  post:
 *    description: Use to create a new product
 *    requestBody:
 *      description: Product object
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/product'
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.post('/', productController.createProduct)

/**
 * @swagger
 * /product-management/products:
 *  put:
 *    description: Use to update a product
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.put('/:id', productController.updateProduct)

/**
 * @swagger
 * /product-management/products:
 *  delete:
 *    description: Use to delete a product
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.delete('/:id', productController.deleteProduct)

module.exports = router
