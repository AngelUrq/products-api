const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerConfiguration = require('./swagger.json')

const config = require('./config')

require('./database')

// Settings
app.set('port', process.env.PORT || config.port)

// Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// Routes
app.use('/product-management/products', require('./routes/product.routes'))

// Swagger
const swaggerDocs = swaggerJsDoc(swaggerConfiguration)
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// Starting server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
