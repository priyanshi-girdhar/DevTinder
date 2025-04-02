const mongoose =require("mongoose");

const connectdb=async()=>{
await mongoose.connect(
    "mongodb+srv://nodejs:DPEtKZfe0Dg2Fv2u@practicenodejs.guqgp.mongodb.net/devTinder"
);
};
module.exports=connectdb; 
connectdb()
.then(()=>
{
    console.log("database connection successfully");

}).catch((err)=>{
    console.error("database connection is not successfull")


});
