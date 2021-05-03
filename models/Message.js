const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
    user:{
        type: String,
    },
    name:{
        type: String,
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
    
});

module.exports = Message = mongoose.model('message', MessagesSchema);