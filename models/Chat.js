const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema({
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

    
});

module.exports = Chat = mongoose.model('chat', ChatSchema);