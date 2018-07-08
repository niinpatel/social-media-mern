import mongoose from "mongoose";
import config from "../config/config";

export default mongoose.connect(config.mongoUri, {useNewUrlParser: true}, (err) => {
    if(err) console.log(err);
    console.log('Connected to Database')
});
