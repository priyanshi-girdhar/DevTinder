const adminAuth=(req,res,next)=>
    {
        console.log("admin auth is getting checked");
        const token ="xyz";
        const isadminauth=(token==="xyz");
        if(isadminauth)
        {
           res.send("All data send"); 
          
        }
        else{
            next();
            //  res.status(401).send("unauthorised request")
        }
        

    };
    const Auth=(req,res,next)=>
        {
            console.log("admin auth is getting checked");
            const token ="xyz";
            const isadminauth=(token==="xyz");
            if(isadminauth)
            {
               res.send("All data send"); 
              
            }
            else{
                next();
                //  res.status(401).send("unauthorised request")
            }
            
    
        };
    

    module.exports = {
        adminAuth,
    } 