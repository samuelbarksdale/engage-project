import { pathToFileURL } from "url";

export default {
    courseServiceUrl: `http://course:${process.env.COURSE_PORT}`,
    port: process.env.PORT || 8081,
    mongoUrl: `mongodb://mongo:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`,
    keyName: process.env.SERVER_KEY || path.join(__dirname, "../certs/server.key"),
    certName: process.env.SERVER_CERT || path.join(__dirname, "../certs/server.cert"),
    usehttps: process.env.USE_HTTPS || false
}