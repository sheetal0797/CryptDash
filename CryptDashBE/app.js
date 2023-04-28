
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongoConfig = require("./config/mongo");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");


dotenv.config({path:'.env'});

const jwt = require("jsonwebtoken");
const JWT_SECRET = "asdfbnekejrljeillse123499&&dsfji@#jkjs?<>{})("

// const mongoUrl = "mongodb://localhost:27017/authentication"
mongoose.connect(mongoConfig.url, mongoConfig.configs).then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));

// mongoose.connect(mongoUrl,{ 
//     useNewUrlParser:true
// })
// .then(()=>{
//     console.log("connected to database");
// })
// .catch((e)=>console.log(e));


app.listen(5000, ()=> {
    console.log("Server Started");
})

require("./userDetails");

const User = mongoose.model("UserInfo");


app.post("/login-user", async(req, res)=>{
    const {email, password} = req.body;
    console.log(email);
    const user = await User.findOne({email});
    if(!user){
        return res.json({error: "User Not Found"});
    }
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({email: user.email}, JWT_SECRET, {
            expiresIn: 1000,
        });

        if(res.status(201)){
            return res.json({status:"ok", data: token});
        } else {
            return res.json({status: "error"});
        }
    }
    res.json({status:"error", error:"Invalid Password"});

});

app.post("/register", async(req, res)=>{
    const {email, password} = req.body;

    const encryptedPassword=await bcrypt.hash(password, 10);

    try{
        const oldUser = await User.findOne({email});
        if(oldUser){
            return res.send({error:"User Exists"});
        }
        await User.create({
            email:email,
            password:encryptedPassword,
        });
        res.send({status:"ok"});
    } catch(error){
        res.send({error:"Error while signing up"})
    }
});

app.post("/userData", async (req, res)=> {
    const {token} = req.body;
    try{
        const user = jwt.verify(token, JWT_SECRET, (err, res) => {
            if(err){
                return "token expired";
            }
            return res;
        });
        console.log(user);
        if(user=="token expired"){
            return res.send({status:"error", data: "token expired"});
        }

        const useremail = user.email;
        User.findOne({email: useremail})
            .then((data)=> {
                res.send({status:"ok", data:data});
            })
            .catch((error) => {
                res.send({status:"error", data:error});
            });

    } catch (error){}
});


app.post("/getwatchlist", async (req,res) => {
    const {email} = req.body;
    const user = await User.findOne({email});

    console.log(user);
    console.log(email);
    if(user.watchlist){
        return res.json({status:"ok", watchlist: user.watchlist});
    }
    else{
        return res.json({status:"not ok"});
    }
});

app.post("/setwatchlist", async (req,res) => {
    const {email, newwatchlist} = req.body;
    // const user = await User.findOne({email});
    // const newwatchlist = watchlist;
    console.log(newwatchlist);
    await User.findOneAndUpdate({email},
        {watchlist: newwatchlist}
    );
    return res.json({status:"ok"});
    // console.log(user);
    // console.log(email);
    // if(user.watchlist){
    //     return res.json({status:"ok", watchlist: user.watchlist});
    // }
    // else{
    //     return res.json({status:"not ok"});
    // }
});

