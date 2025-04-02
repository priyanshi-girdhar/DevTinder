const mongoose=require('mongoose');
const { isLowercase } = require('validator');
const { default: isEmail } = require('validator/lib/isEmail');
const validator=require("validator");
const userschema=mongoose.Schema(
    {
        firstName:
        {
            type:String
        },
        lastName:
        {   
            type:String
        },
        emailId:
        {
            type:String,
            lowercase:true,
            required:true,
            unique:true,
            trim:true,
            validate(value){
                if(!validator.isEmail(value))
                throw new Error("invaild email address",+value)
                {

                }
            }

        },
        password:
        {
            type:String
            
        },
        age:
        {
            type:Number
            
                
        },
        gender:
        {
            type:String,
            validate(value)
            {
                if(!["male","female","other"].includes(value))
                {
                    throw new Error("Gneder data is not valid");
                }
            },
        }},
        {
            timestamps:true, 
        }

    );
   
const userModel=mongoose.model("User",userschema);
module.exports=userModel;
