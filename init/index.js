const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL= "mongodb+srv://pwagh020304:9ZDAYgFmysXJoLFf@cluster0.8gxf7cv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}


const initDB = async() => { 
    initData.data = initData.data.map((obj) => ({...obj , owner : "668e64ad842b2e82558f1685"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();
 