const mongoose = require('mongoose');

const personInfoSchema = new mongoose.Schema({
    userId:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required:true,
    },
    username:{
        type:String,
        required:true,
    },
    rollnum: { 
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