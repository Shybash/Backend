const Query=require("../models/Query");

const GetQuery=async(req,res)=>{

    try{

        const query= await Query.find();
        res.json(query);

    }catch(error){
        console.log("error fetching Student query ",error);
        res.status(500).json({message:"an error occured while fetching the StudentQuery"});
    }
}

module.exports=GetQuery;