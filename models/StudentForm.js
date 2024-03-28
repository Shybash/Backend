const mongoose=require('mongoose');

const  StudentFormSchema=new mongoose.Schema({
    rollNum:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    club:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('studentForm',StudentFormSchema);