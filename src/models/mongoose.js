var mongoose = require('mongoose')
let url = process.env.MONGODB_URI;
mongoose.db = mongoose.createConnection(url);
module.exports = mongoose;