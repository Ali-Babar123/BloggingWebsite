const mongoose = require('mongoose')
const {Schema} = mongoose;

const BlogSchema = new Schema({
    authorId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        // required: true
    },
    content:{
        type: Schema.Types.Mixed,
        // required: true
    },
    author: {
        type: String,
        // required: true
    },
    category: {
        type: String,
        // required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    image:
    {
        type: String,
    }
})
module.exports = mongoose.model('blogs', BlogSchema)