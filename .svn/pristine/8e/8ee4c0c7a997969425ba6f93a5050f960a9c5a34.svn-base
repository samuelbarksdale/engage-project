
import _ from 'lodash';
import config from './config';
import axios from 'axios';

import {isEducator, getUser, distance} from './utils'
import fs from 'fs';
import moment from 'moment';
import json2csv from 'json2csv';

export default function Routes(app, ctx) {
    const LEC = 'LEC';
    const DIS = 'DIS';
    const OTH = 'OTH';

    async function serveDocs(req, res) {
        let options = {
            root: path.join(__dirname, "../docs"),
        }
        res.sendFile('./index.html', options)
    }

    async function getAttendance(req, res) {
        const query = {};
        // try {
        //     check = await isEducator(req.body.uid);
        // } catch (e) {
        //     return res.status(400).json({message: e.message})
        // }
        

        const {uid, sectionId, courseId, type, start, end} = req.query
        const timestamp = {};

        if (uid) query = Object.assign(query, {uid})
        if (sectionId) query = Object.assign(query, {sectionId: sectionId.toLowerCase()})
        if (courseId) query = Object.assign(query, {courseId: courseId.toLowerCase()})
        if (type) quey = Object.assign(query, {type: type.toLowerCase()})
        if (start) timestamp["$gte"] = Date.parse(start);
        if (end) timestamp["$lte"] = Date.parse(end);
        if (!_.isEmpty(timestamp)) query = Object.assign(query, {timestamp})
        console.log(query)
        try {
            let result = await ctx.db.collection('attendance').find(query)
            // Pagination and sort will happen here
            const results = await result.toArray();
            return res.json(results);
        } catch (e) {
            console.error(e)
            return res.status(500).end();
        }
 
    }

    async function logAttendance(req, res) {
        const {uid, sectionId, type, location} = req.body;
        if (!uid|| !sectionId || !type) return res.status(400).json({message: "Must provide uid, sectionId, and type in body"})
        if (type != LEC && type != DIS && type != OTH) return res.status(400).end()

        
        try {
            let user = await getUser(uid);
            let classObj = user.classesCurrent.find(c => {
                return c.sectionId === sectionId;
            })
            if (!classObj) throw new Error("Provided user not in provided section");
        }
        catch(e) {
            return res.status(400).json({message: e.message})
        }
            
        try { 
            let endpoint = "";
            if (type === LEC) endpoint = `/courses/${classObj.courseId}`
            else if (type === DIS) endpoint = `/sections/${classObj.sectionId}`
            let response = await axios.get(config.courseServiceUrl + endpoint);


            let now = new Date(), cStart = new Date(), cEnd = new Date();
            let {days, timeStart, timeEnd} = response.data.schedule;
            let hourmin = /^(\d+):(\d\d)$/;
            timeStart = timeStart.match(hourmin).slice(1);
            timeEnd = timeEnd.match(hourmin).slice(1);
            cStart.setHours(time[0], time[1]);
            cEnd.setHours(time[0], time[1]);
            if (now < cStart || now > cEnd || days.includes(now.getDay())) res.status(400).json({message: "Specified class is not in session"})

            let courseLocation = response.data.schedule.location;
            let radius = courseLocation.radius;
            // Apply the haversine distance formula
            let clng = parseFloat(courseLocation.lng);
            let cLong = parseFloat(courseLocation.long);
            let slng = parseFloat(location.lng);
            let sLong = parseFloat(location.long);
            let dist = distance(clng, cLong, slng, sLong);
            if (dist > radius) return res.sendStatus(400).json({message: "Location does not meet bounds"});

            let courseId = classObj.courseId;
            
            const timestamp = now.getTime();
            const log = {
                "uid": uid,
                "timestamp": timestamp,
                "sectionId": sectionId,
                "courseId": courseId,
                "type": type
            };
            try {
                let result = await ctx.db.collection("attendance").insertOne(log);
                let newLog = result.ops;
                return res.json(newLog);
            } catch (e) {
                console.error(e)
                return res.status(500).end()
            }
        
        } catch(e) {
            console.error(e)
            res.sendStatus(500);
        }


    }

    async function deleteAttendance(req, res) {
        let {courseId} = req.body;
        let filter = {};
        if (courseId) filter = Object.assign(filter, {courseId})
        try {
            await ctx.db.collection("attendance").deleteMany(filter);
            res.status(204).end()
        } catch(e) {
            console.error(e)
            res.status(500).end();
        }
    }

    async function attendance2csv(req, res) {
        await ctx.db.collection('attendance').find({}, (err, attendance) => {
            if (err) {
                return res.status(500).json({err});
            } else {
                let csv;
                const fields = ['uid','course_id', 'section_id', 'timestamp', 'meeting_type']
                try {
                    csv = json2csv(attendance, {fields});
                } catch (err) {
                    return res.status(500).json({err})
                }
                const dateTime = moment().format('YYYYMMDDhhmmss'); //sets name of the file as the date it was created
                const filePath = path.join(__dirname, "../public", "exports", "csv-" + dateTime + ".csv");
                fs.writeFile(filePath, csv, (err) => {
                    if (err) {
                        return res.json(err).status(500);
                    } else {
                        setTimeout(() => {
                            fs.unlinkSync(filePath); // delete file after 30 sec
                        }, 30000)
                        return res.json("/exports/csv-" + dateTime + ".csv")
                    }
                })
            }
        })
    }

    app.get('/', serveDocs);
    app.route('/attendance')
        .get(getAttendance)
        .post(logAttendance)
        .delete(deleteAttendance)
    app.get('/export', attendance2csv)
}

