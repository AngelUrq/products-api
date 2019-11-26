const mongoose = require('mongoose')
const URI = 'mongodb://localhost/stockDB'

mongoose.connect(URI , { useUnifiedTopology: true, useNewUrlParser: true })
    .then(db => console.log('DB is connected'))
    .catch(err => console.log('err', err))

module.exports = mongoose
