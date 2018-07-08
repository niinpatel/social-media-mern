import config from "../config/config";
import app from "./express";
import mongoose from "mongoose";

mongoose.connect(config.mongoUri, {useNewUrlParser: true}, (err) => {
    if(err) console.log(err);
    console.log('Connected to Database')
});

app.listen(config.port, (err) => {
    if(err) console.log(err);
    console.log('Listening at %s', config.port )
});