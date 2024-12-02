const mongoose = require('mongoose')

const mongooseURI = 'mongodb://localhost:27017/Blogging'

const connectToMongo = () =>{
    mongoose.connect(mongooseURI).then(() => console.log('Connected to Mongo Successfully')).catch((e)=> console.error(e.message))
}

module.exports = connectToMongo