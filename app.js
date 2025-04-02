const express = require("express");
const connectdb = require("./src/config/database");
const app = express();
const User = require("./src/models/user");
const bcrypt = require("bcrypt");
const { validateSignUpData } = require("./src/utils/validation ");
const cookieParser = require("cookie-parser");
app.use(express.json());
// app.use(cookieParser());

app.post("/signup", async (req, res) => {
  // {
  //     firstname:"Priya",
  //     lastname:"Girdhar",
  //     emailId:"priyanshi1@appinventiv.com",
  //     password:"priy@nshi22"
  // });
  //creating a new instance of the user
  try {
    validateSignUpData(req);
    const { emailId, password, firstName, lastName } = req.body;
    const orgPassword= req.body.password;
    console.log("password"+orgPassword);
    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);
    const user = new User({ emailId, passwordHash, firstName, lastName });
    await user.save();

    res.send("user added successfully");
  } catch (err) {
    // console.log(err.message);
    res.status(400).send("error  saving  the user" + err.message);
  }
  // const user=new User(userObj);
});
app.post("/login", async (req, res) => {
  // try{
  const { emailId, password } = req.body;
  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    throw new Error("emailid is not present ");
  }
  console.log(user.password);

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    res.send("Login successful!!");
  } else {
    throw new Error("Password is not correct");
  }
  // }
  // catch(err)
  // {
  //     res.status(400).send("Error :"+ err.message);
  // }
});
app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.send("reading cookies");
});
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    console.log(userEmail);
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("sometime went wrong ");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send("user has been deleted");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId });
    res.send("user has been update");
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

connectdb()
  .then(() => {
    console.log("database connection succesfully");
    app.listen(3000, () => {
      console.log("hello");
    });
  })
  .catch((err) => {
    console.error("database connection is not successfull");
  });

console.log("starting a new project");
// const {adminAuth}=require("./middleware/auth");

// app.use("/admin",adminAuth);
//  app.get("/user",userAuth,(req,res)=>
// {
//     res.send("user data send");
// })
// // app.get("/admin/getAllData",(req,res,next)=>
// // {
// //     const token ="xyz";
// //     const isadminauth=token==="xyz";
// //     if(isadminauth)
// //     {
// //        res.send("All data send");
// //     }
// //     else{
// //         res.status(401).send("unauthorised request")
// //         next();
// //     }
// // });
// app.get("/user",(req,res)=>
// {

//     res.send("user data send ");

// })
// app.get("/admin/getAllData",(req,res)=>
//     {

//            res.send("All data send");

//     });
//     app.get("/admin/deleteduser",(req,res)=>
//         {

//                res.send("Deleted user");

//         });

// // app.use("/user", (req, res, next) => {
// //     console.log("hello1");
// //     // res.send("hello from server");
// //     next();//next hm isliye add kr rhe h kyuki send k bad vo next pr  nhi jata hai
// //     //usko next pr bhejnne k liye next used kiya hai
// // }, (req, res) => {        //route handler
// //     console.log("hello2");
// //     res.send("second response");
// // }
// // );

// // app.get("/user",(req,res)=>  // /ab?c ->b is optinal
// //                              // /ab+c ->abbbbbbbbbbc b is repeative
// //                              // /ab*cd  ->anything in between
// //  {
// //     res.send("hello from server");
// // });
// // app.post("/user",(req,res)=>
// //     {
// //         res.send("hello from server");
// //     });

// // app.delete("/user",(req,res)=>
// //         {
// //             res.send("hello from server");
// //         });
