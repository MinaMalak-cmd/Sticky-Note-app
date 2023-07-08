import mongoose from "mongoose";

const connectDB = async () =>{
    return await mongoose.connect('mongodb://localhost:27017/UserPostWeek6')
    .then((res) => {
        console.log("🚀DB Connected .........")
    }).catch((err) => {
        console.log("🚀 ~ file: connection.js:6 ~.catch ~ err:", err)
    });
}

export default connectDB;