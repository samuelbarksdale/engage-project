// import path from 'path';
import _ from 'lodash';
import mongoose from 'mongoose';
import {Readable} from 'stream';
import {AbsenceModel} from '../schemas/absenceSchema';

const Status = {
        Approved: "approved",
        Rejected: "rejected",
        Pending: "pending"
}

const AbsenceType = {
        Illness: "illness",
        Religious: "religious",
        Military: "military",
        University: "university",
        External: "external",
        Other: "other"
}

const GridFSBucket = mongoose.mongo.GridFSBucket;
const ObjectID = mongoose.mongo.ObjectID;

async function removeFilesHelper(files) {
    const bucket = new GridFSBucket(mongoose.connection.db);
    await Promise.all(files.map((id) => {
        return new Promise((resolve, reject) => {
            bucket.delete(id, (err) => {
                if (err) reject(err);
                resolve(true);
            });
        }); 
    }));
    return true; 
}

async function uploadFileHelper(files) {
    const bucket = new GridFSBucket(mongoose.connection.db);

    let ids = await Promise.all(files.map((file) => {
        let options = {
            content_type: file.mimetype
        }
        let readStream = new Readable();
        readStream.push(file.buffer);
        readStream.push(null);
        
        return new Promise((resolve, reject) => {
            let writeStream = bucket.openUploadStream(file.originalname, options);
            readStream.pipe(writeStream)
                .on('finish', function() {
                    resolve(writeStream.id)
                })
                .on('error', function(e) {
                    reject(e)
                }).id
        }); 
    }));
    return ids;  
}

export default {
    // Methods for /absences route
    getAbsences: async function (req, res){
        const validParams = ["course_id", "section_id", "uid", "type", "missed", "status"];
        const params = req.query
        const filter = {isDeleted: false};
        try {
            validParams.map(async (param) => {
                if (params.hasOwnProperty(param)) {
                    let value = params[param]
                    if (param == "missed") {
                        let day = Date.parse(value);
                        if (day == NaN) throw new Error("Invalid query: missed")
                        value = {"missed_days": {"start": {$gte: day}, "end": {$lte:  day}}};
                    } else if (param == "type") {
                        value = value.toLowerCase();
                        if (!Object.values(AbsenceType).includes(value)) throw new Error("Invalid query: type")
                    } else if (param == "status") {
                        value = value.toLowerCase();
                        if (!Object.values(Status).includes(value)) throw new Error("Invalid query: status")
                    }
    
                    filter[param] = value;
                }
                // let isEducator = await isEducator(req.body.uid);
                // if (!isEducator) filter.uid = req.body.uid;

            });
        } catch (e) {
            res.status(400).json({message: e.message})
        }

        try {
            let reports = await AbsenceModel.find(filter).exec();
            return res.json(reports);
        } catch (e){
            console.error(e)
            return res.status(500).end();
        }

    },

    deleteAbsences: async function (req, res) {
        // let isEducator = await isEducator(req.body.uid);
        // if (!isEducator) res.status(401).end();
        
        try {
            await AbsenceModel.deleteMany({});
            res.status(204).end()
        } catch(e) {
            console.error(e)
            res.status(500).end();
        }
    },

    // Methods for /absence/:id route

    getAbsenceId: async function (req, res) {
        const{ id } = req.params
        
        try {       
            let result = await AbsenceModel.findById({_id: id}).exec()

            if (result) return res.json(result);
            else return res.sendStatus(404).end();
        } catch (e) {
            console.error(e)
            return res.sendStatus(500).end();
        
        } 
    },

    deleteAbsence: async function (req, res) {
        // let isEducator = await isEducator(req.body.uid);
        // if (!isEducator) res.status(400).end();
        const{ id } = req.params;
        try {
            const _id = new ObjectID(id);
            
            try {
                let result = await AbsenceModel.findOne({_id});
                result.isDeleted = true; 
                result.save(); 
                
            } catch (e) {
                console.error(e)
                return res.status(500).end();
            }
        } catch(e) {
            res.status(400).send("Invalid id format")
        } 
    },

    updateAbsence: async function (req, res) {
        // let isEducator = await isEducator(req.body.uid);
        // if (!isEducator) res.status(400).end();
        let {status, rationale, type} = req.body;
        let { id } = req.params;
        let updatePayload = {};
        let _id;
        try {
            if (typeof type == "string" && Object.values(AbsenceType).includes(type.toLowerCase())){
                updatePayload.type = type.toLowerCase();
             }
             if (typeof rationale == "string") {
                 updatePayload.rationale = rationale;
             }
             if (typeof status == "string" && Object.values(Status).includes(status.toLowerCase())) {
                 updatePayload.status = status.toLowerCase();
             }
             _id = new ObjectID(id);
        } catch(e) {
            return res.status(400).json({message: e.message})
        }
        updatePayload = (!_.isEmpty(updatePayload)) ? {$set: updatePayload} : {} 
        try {
            let newReport = await AbsenceModel.findOneAndUpdate({_id}, updatePayload, {new: true});
            if (!newReport) return res.send(404).json({message: "An absence report by that id does not exist"});
            res.status(200).json(newReport);
        } catch (e) {
            console.error(e)
            res.sendStatus(500);
        }
        
    },

    createAbsenceReport: async function (req, res) {
        const files = req.files;

        
       
        //console.log("PRINTING OUT THE BODY");  
        //return res.send(req.body["uid"]); 
        let form;
        try {
        
            form = req.body
            console.log(form); 
        } catch(e) {
            console.error(e)
            return res.sendStatus(400).json({message: "Invalid JSON in form key: " + e.message})
        }

        const absenceObj = {
            "files": [],
            "status": Status.Pending
        }
        const absenceMandatory = {
            "uid": "",
            "section_id": "",
            "missed_days": {
                "start": "",
                "end": ""
            },
            "type": "",
            "rationale": "",
            "email": "",
            "missed_assignments": "",
            "isDeleted": ""
        }
        
     

    //NEED TO CHECK IF STUDENT IS IN COURSE THEY CLAIM
        try {
            Object.keys(absenceMandatory).forEach(k => {
                if (form.hasOwnProperty(k)) {
                    if (k == "section_id" || k == "type") absenceObj[k] = form[k].toLowerCase();
                    else absenceObj[k] = form[k];
                } else {
                    throw new Error(`missing json key ${k}`)
                }
            })
            console.log(JSON.stringify(absenceObj)); 
            const startEpoch = Date.parse(absenceObj.missed_days.start);
            const endEpoch = Date.parse(absenceObj.missed_days.end);
            if (startEpoch == NaN || endEpoch == NaN || startEpoch > endEpoch) {
                throw new Error("Invalid date format")
            }
            console.log("Here after Date Validation"); 
            absenceObj.missed_days.start = absenceObj.missed_days.start.split('T')[0];
            absenceObj.missed_days.end = absenceObj.missed_days.end.split('T')[0];
            if (!Object.values(AbsenceType).includes(absenceObj.type)) {
                throw new Error("Invalid absence type")
            }
            //return res.send(absenceObj); 
            
            const re = /^(\w+)-/;
            let course_id = re.exec(absenceObj.section_id)[1]
           // return res.send(course_id); 
            absenceObj.course_id = course_id;
        } catch (e) {
            return res.status(400).send(e.message).end();
        }

        console.log("HERE"); 
        
        if (files) {
            try {
                let ids = await uploadFileHelper(files);
                absenceObj.files = ids;    
            } catch(e) {
                console.error(e)
                return res.sendStatus(500).end()
            }
        }
        
        try {
            console.log("Here is the absence object" + JSON.stringify(absenceObj)); 
            let result = new AbsenceModel(absenceObj); 
            console.log("Object after making it an AbsenceModel" + JSON.stringify(result)); 
            await result.save(); 
            return res.send(result._id);
        } catch (e) {
            console.error(e);
            return res.sendStatus(500).end();
        }
        
    },

    getFiles: async function (req, res) {
        const { id } = req.params;
        try {
            const _id = new ObjectID(id);
            try {
                let report = await mongoose.connection.db.collection('absences').findOne({_id})
                if (!report) {
                    return res.status(404).json({message: "No absence report exists with that id"});
                }

                let metadata = await mongoose.connection.db.collection('fs.files').find({
                    _id: {
                        $in: report.files.map(id => new ObjectID(id))
                    }
                })
                metadata = await metadata.toArray();
                res.status(200).json(metadata)
            } catch (e) {
                console.error(e)
                return res.sendStatus(500).end()
            }
          } catch(err) {
            return res.status(400).send("Invalid id format"); 
          }
    },

    fetchFile: async function (req, res) {
        const { id, fileId } = req.params;
        let _id, _fileId;
        try {
            _id = new ObjectID(id);
            _fileId = new ObjectID(fileId)
        } catch(e) {
            return res.status(400).json({message: "Invalid id format"})
        }

        let report = await mongoose.connection.db.collection("absences").findOne({_id});
        if (!report) {
            return res.status(404).json({message: "An absence object by that id does not exist"})
        }

        if (!report.files.some((storedFileId) => storedFileId.equals(_fileId))) {
            return res.status(404).json({message: "Absence object specified does not contain any file by that id"});
        }

        res.set("Content-Type", "image/jpeg")
        const bucket = new GridFSBucket(mongoose.connection.db);
        let buffers = []
        let downloadStream = bucket.openDownloadStream(_fileId)
        downloadStream.on('data', (chunk) => {
            buffers.push(chunk);
        }).on('error', (e) => {
            console.error(e)
           return res.sendStatus(500);
        }).on('end', () => {
            let buffer = Buffer.concat(buffers);
            res.send(buffer);
        });
    },

    uploadFiles: async function (req, res) {
        console.log("I AM HERE UPLOADING FILES"); 
        let _id = req.params.id;
        try {
            _id = new ObjectID(_id);
        } catch (e) {
            res.status(400).json({message: "Invalid id format"});
        }

        let files = req.files;
        if (!files) {
            res.status(400).json({message: "No files were present to upload"});
        }

        try {
            let report = await mongoose.connection.db.collection("absences").findOne({_id});
            if (!report) res.send(404).json({message: "An absence report with the id does not exist"})
            if (report.files.length > 0) await removeFilesHelper(report.files);

            let fileIds = await uploadFileHelper(files);
            let result = await mongoose.connection.db.collection("absences").updateOne({_id}, {$set: {files: fileIds}});
            res.json(Object.assign(report, {files: fileIds}))
        } catch (e) {
            console.error(e)
            res.sendStatus(500);
        }
    }
}