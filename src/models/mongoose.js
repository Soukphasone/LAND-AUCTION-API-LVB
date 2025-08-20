const mongoose = require('mongoose')
let url = process.env.MONGODB_URI;
mongoose.db = mongoose.createConnection(url,  { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = mongoose;