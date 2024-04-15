const mongoose = require('mongoose');

const personInfoSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    rollNumber: { 
        type: String, 
        required: true
     },
    imageName: {
        type:String,
    },
  created: { type: Date, default: Date.now }
});
let StdInfo=mongoose.model('StdInfo',personInfoSchema);

 module.exports=StdInfo;