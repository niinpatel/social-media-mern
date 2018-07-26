import mongoose, { mongo } from 'mongoose'

let postSchema = new mongoose.Schema({
    text: {
        type: String,
        required: 'Post cannot be empty'
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        text: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]
})

export default mongoose.model('Post', postSchema)