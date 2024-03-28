const  mongoose=require('mongoose');

module.exports=async  ()=>{
    
    try{
        await mongoose.connect(process.env.DB,{
            useNewUrlParser:true,
            useUnifiedTopology:true });
        console.log("connected to database successfully");
    }catch(error){
        console.log(`could not connect database ${error}`);

    }
}