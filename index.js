
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
require('dotenv').config();
const connection=require("./db");
const studentRoutes=require('./routes/StudentRoutes');
const collegeRouters=require('./routes/CollegeRouter');

//middleware
app.use(express.json());
app.use(cors({origin:"*"}));
app.use(bodyParser.json());
//database connection
connection();

//Routes
app.use("/api",studentRoutes);
app.use("/api",collegeRouters);

const port=process.env.PORT || 4000;
app.listen(port,()=>{console.log(`server is running on ${port}`)});