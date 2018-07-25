import config from "../config/config";
import app from "./express";
import './dbconnect';

app.listen(config.port, (err) => {
    if (err) console.log(err);
    console.log('Listening at %s', config.port)
});
