import express from 'express';
import MongoClient from 'mongodb';
import Routes from './routes'
import cors from 'cors';
import config from './config';
import https from 'https';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import Keygrip from 'keygrip';
import cookieSession from 'cookie-session'

const mongoUrl = config.mongoUrl;
const port = config.port;
const usehttps = config.usehttps;
const keyName = config.keyName;
const certName = config.certName;

// middleware and authentication
const app = express();
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    // request logger
    console.log(req.method + " " + req.originalUrl)
    next()
})

let secretKeys;
// Cookie hash secret to prevent or at least reduce the possibility for cookie hijacking.
if (process.env.SECRET_SESSION){
    secretKeys = process.env.SECRET_SESSION.split("&")
} else secretKeys = [crypto.randomBytes(32).toString('base64')]

app.use(cookieSession({
    secure: false,
    keys: Keygrip(secretKeys),
    maxAge: 48 * 60 * 60 * 1000
}));

let ctx;

connectToDatabase(mongoUrl).then((db) => {
        ctx = {...ctx, db}
        let routes = Routes(app, ctx);
        if (usehttps) {
            https.createServer({
                key: fs.readFileSync(path.join(__dirname, `../certs/${keyName}`)),
                cert: fs.readFileSync(path.join(__dirname, `../certs/${certName}`))
            }, app).listen(port, (err) => {
                if (err) console.error(err);
                console.log(`Server listening over https on port ${port}`)
            })
        } else {
            app.listen(port, (err) => {
                if (err) console.error(err);
                console.log(`Server listening over http on port ${port}`);
            })
        }
        
    }).catch(err => console.error(err))


async function connectToDatabase(url) {
    try{
        const client = await new MongoClient(url, {autoReconnect: true, useNewUrlParser: true});
        let db =  client.db("attendance-service");
        return Promise.resolve(db)
    } catch (e){
        console.error("Failed to connect to the mongodb instance")
        return Promise.reject(e)
    } 
}
