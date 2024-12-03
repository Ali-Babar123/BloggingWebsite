const mongoose = require('mongoose')

const mongooseURI = process.env.MONGO_URL

const connectToMongo = () =>{
    mongoose.connect(mongooseURI).then(() => console.log('Connected to Mongo Successfully')).catch((e)=> console.error(e.message))
}

module.exports = connectToMongo