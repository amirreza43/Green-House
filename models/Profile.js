const mongoose = require('mongoose');


//name, dob, current job, experiences, school, about me, email, 
const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    name:{
        type: String
    },
    lastName:{
      type: String
        },
    dob:{
        type: String
    },
    location:{
        type: String
    },
    aboutMe:{
        type: String
    },
    contact:{
      type: String
    },
    experience: [
        {
            title:{
                type:String,
                required: true
            },
            company:{
                type: String,
                required: true
            },
            location:{
                type: String
            },
            from:{
                type: Date
            },
            to:{
                type: Date,
            },
            to:{
                type: Boolean,
                default: false
            },
            description:{
                type: String,
            }
        }
    ],
    education: [
        {
          school: {
            type: String,
            required: true
          },
          degree: {
            type: String,
            required: true
          },
          fieldofstudy: {
            type: String,
            required: true
          },
          from: {
            type: Date,
            required: true
          },
          to: {
            type: Date
          },
          current: {
            type: Boolean,
            default: false
          },
          description: {
            type: String
          }
        }
      ],
      social: {
        youtube: {
          type: String
        },
        twitter: {
          type: String
        },
        facebook: {
          type: String
        },
        linkedin: {
          type: String
        },
        instagram: {
          type: String
        }
      },
      date: {
        type: Date,
        default: Date.now
      }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);