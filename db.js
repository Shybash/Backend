const  mongoose=require('mongoose');

module.exports=async  ()=>{
    
    try{
        console.log(process.env.DB);
        await mongoose.connect(process.env.DB,{
            useNewUrlParser:true,
            useUnifiedTopology:true });
        console.log(process.env.DB); 
        console.log("connected to database successfully");
    }catch(error){
        console.log(`could not connect database ${error}`);

    }
}