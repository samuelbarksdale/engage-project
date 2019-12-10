import express from 'express';
import MongoClient from 'mongodb';
import Routes from './routes'
import session from 'express-session'
import https from 'https'
import fs from 'fs'
import path from 'path'
import cas from 'connect-cas';
import cors from 'cors'

const mongoUrl = "mongodb://mongo:27017"
const port = process.env.PORT;
const app = express();
// middleware and authentication
app.use(express.json())
app.use(cors())
let routes;
let ctx;

// const option = {
//     key: fs.readFileSync(path.join(__dirname, 'ssl', "server.key")),
//     cert: fs.readFileSync(path.join(__dirname, 'ssl', "server.crt"))
// }

cas.configure({ 
    host: 'login.umd.edu',
    paths: {
        serviceValidate: "shibboleth-idp/profile/cas/serviceValidate",
        login: "shibboleth-idp/profile/cas/login"
    }
});
//console.log(cas.configure());
// app.use(session.cookieParser("something random"));
// app.use(session.cookieSession());



app.use( session( {
    secret: 'super secret key',
    resave: false,
    saveUninitialized: true

}))


connectToDatabase(mongoUrl).then((db) => {
    ctx = {...ctx, db}
    routes = Routes(app, ctx);
    app.listen(port, (err) => {
        if (err) console.error(err);
        console.log(`Server listening on port ${port}`);
    })
    // https.createServer(option, app).listen(8080, (err) => {
    //     if (err) console.error(err);
    //     console.log(`Server listening on port 3443`);
    // })
}).catch(err => console.error(err))

    


async function connectToDatabase(url) {
    try{
        const client = await new MongoClient(url, {autoReconnect: true, useNewUrlParser: true});
        let db =  client.db("absence-service");
        return Promise.resolve(db)
    } catch (e){
        console.error("Failed to connect to the mongodb instance")
        return Promise.reject(e)
    } 
}
