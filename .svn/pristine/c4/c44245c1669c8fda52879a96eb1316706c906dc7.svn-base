import express from 'express';
import cookieSession from 'cookie-session';
import Keygrip from 'keygrip'
import dotenv from 'dotenv'
import crypto from 'crypto';
import CASAuthentication from 'express-cas-authentication';
import https from 'https';
import path from 'path';
import fs from 'fs';
let app = express();
app.use((req, res, next) => {
    console.log(req.method + " " + req.originalUrl)
    next()
})
var cas = new CASAuthentication({
    cas_url         : 'https://shib.idm.umd.edu/shibboleth-idp/profile/cas',
    service_url     : 'https://localhost:3000',
    cas_version     : '2.0'
});


// Initializing session secrets for secure cookies.
dotenv.config();
let secretKeys;
if (process.env.SECRET_SESSION){
    secretKeys = process.env.SECRET_SESSION.split("&")
} else secretKeys = [crypto.randomBytes(32).toString('base64')]

app.use(cookieSession({
    name: "session",
    keys: Keygrip(secretKeys),
    maxAge: 48 * 60 * 60 * 1000
}));


app.get("/api/list", cas.block, (req, res) => {
    res.json({message: "Success"})
})

https.createServer({
    key: fs.readFileSync(path.join(__dirname, "/certs/server.key")),
    cert: fs.readFileSync(path.join(__dirname, "/certs/server.cert"))
}, app).listen(3000, (err) => {
    if (err) console.error(err)
    else console.log("Server listening on https on port 3000");
})
