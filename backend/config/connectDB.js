const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        constconnect = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected`);
    } catch (error){
        console.log(error);
        process.exit(1);
    }
};


module.exports = connectDB;



// Use this block of code in server.js  to connect to mongoDB and start the server


// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


// const startServer = async () => {
//     try {
//         await connectDB();
//         app.listen(PORT, () => {
//             console.log(`Server running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.log(error)
//     }
// }

// startServer();