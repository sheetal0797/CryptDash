const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema({
    email: {type:String, unique:true},
    password: String,
    watchlist: {
        type: [String],
        // default:["bitcoin","ethereum"],
    },
},
{
    collection: "UserInfo",
}
);

mongoose.model("UserInfo", UserDetailsSchema);