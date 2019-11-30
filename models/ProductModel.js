/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       code:
 *         type: string
 *       name:
 *         type: string
 *       stock:
 *         type: integer
 */

module.exports = (sequelize, type) => sequelize.define('product', {
  code: type.STRING,
  name: type.STRING,
  stock: type.INTEGER,
});
