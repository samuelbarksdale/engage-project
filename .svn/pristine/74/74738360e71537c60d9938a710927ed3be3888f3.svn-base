import {AttendanceModel} from '../schemas/attendSchema';
import {UserModel} from '../schemas/userSchema';
import {LectureModel, SectionModel} from '../schemas/classSchema';
import {distance, stdTime} from '../helpers/utils';
import ServerError from '../helpers/ServerError';
import {parseTime} from '../helpers/utils';
import _ from 'lodash';

export default {
    list: async function(req, res) {
        const {did, sectionId, courseId, start, end} = req.query
        let timestamp:any = {};
        let query = {};

        if (did) query = Object.assign(query, {did})
        if (sectionId) query = Object.assign(query, {sectionId: sectionId.toLowerCase()})
        if (courseId) query = Object.assign(query, {courseId: courseId.toLowerCase()})
        if (start) timestamp["$gte"] = Date.parse(start);
        if (end) timestamp["$lte"] = Date.parse(end);
        if (!_.isEmpty(timestamp)) query = Object.assign(query, {timestamp})


        try {
            let results = await AttendanceModel.find(query).exec()
            return res.json(results);
        } catch (e) {
            console.error(e)
            return res.status(500).end();
        }
    },
    create: async function(req, res) {
        const did = req.session.cas.user;
        const {location} = req.body;
        
        try {
            let today = new Date();
            let early = 10*60*1000; // 10 mintues
            let user:Object = await UserModel.findOne({did}).exec();
       
            let userLecture = await LectureModel.findOne({courseName: user.courses}).exec();
            let userSection = await SectionModel.findOne({sectionId: user.sections}).exec();
            
            let now = stdTime(today.getHours(), today.getMinutes());
    
            const timeChallenge = ({schedule}) => {
                return (
                    schedule.days.includes(today.getDay()) &&
                    (schedule.time.start - early) < now &&
                    (schedule.time.end) > now
                )
            }

            let foundPossibleCheckIn = null;
            if (timeChallenge(userLecture)) foundPossibleCheckIn = {location: userLecture.schedule.location, type: "LEC"};
            else if (timeChallenge(userSection)) foundPossibleCheckIn = {location: userSection.schedule.location, type: "DIS"};
            
            if (!foundPossibleCheckIn) throw new ServerError("You cannot check in to a class right now", 400);
            
            let cmpToLoc = foundPossibleCheckIn.location;
            let radius = cmpToLoc.radius;
            // Apply the haversine distance formula
            let clat = parseFloat(cmpToLoc.lat.$numberDecimal);
            let clng = parseFloat(cmpToLoc.lng.$numberDecimal);
            let slat = parseFloat(location.lat);
            let slng = parseFloat(location.lng);
            let dist = distance(clat, clng, slat, slng);
            if (dist > radius) 
                return res.sendStatus(400).json({message: "You are not in range of the geofence! If you think this is not the case, please see your educator"});
            let newLog = new AttendanceModel({
                did,
                lectureName: userSection.lectureName,
                courseName: userSection.courseName,
                sectionId: userSection.sectionId,
                timestamp: today.getTime(),
                format: foundPossibleCheckIn.type
            })

            newLog = await newLog.save();
            return res.json(newLog);
        } catch(e) {
            if (e instanceof ServerError) return res.status(400).json({message: e.message})
            else {
                console.error(e)
                return res.status(500)
            }
        }
    },
    delete: async function(req, res) {
        let {courseId} = req.body;
        let filter = {};
        if (courseId) filter = Object.assign(filter, {courseId})
        try {
            await AttendanceModel.deleteMany(filter);
            res.sendStatus(204)
        } catch(e) {
            console.error(e)
            res.status(500).end();
        }
    }
}