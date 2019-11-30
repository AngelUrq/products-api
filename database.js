const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.databaseURL , { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('err', err))

module.exports = mongoose
