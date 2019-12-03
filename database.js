const mongoose = require('mongoose')
const config = require('./config')

mongoose.set('useFindAndModify', false);
mongoose.connect(config.databaseURL , { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('Database is connected'))
    .catch(err => console.log('err', err))

module.exports = mongoose
