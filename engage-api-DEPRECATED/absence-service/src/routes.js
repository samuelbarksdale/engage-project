import path from 'path';
import _ from 'lodash';
import multer from 'multer';
import {GridFSBucket, ObjectID} from 'mongodb';
import {Readable} from 'stream';
import cas from 'connect-cas';

const coursePORT = process.env.COURSE_PORT
const courseServiceUrl = `http://course:${coursePORT}`;

// async function getUser(uid) {
//     const endpoint = `/users/${uid}`;
//     try {
//         let user = await axios.get(courseServiceUrl + endpoint);
//         return user.data;
//     } catch (e) {
//         if(e.response.status === 404) throw new Error("The uid does not refer to an existing user");
//         throw new Error("Internal Server Error")
//     }
// }
// async function isEducator(uid, user={}) {
//     if (Object.keys(user).length === 0) {
//         user = await getUser(uid);
//     }
        
//     return user.type === 2;
// }

export default async function Routes(app, ctx) {
    const Upload = multer({storage: multer.memoryStorage()});
    const MAX_IMAGES = 4;

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

    async function uploadFileHelper(files) {
        const bucket = new GridFSBucket(ctx.db);
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

    async function removeFilesHelper(files) {
        const bucket = new GridFSBucket(ctx.db);
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


    // var cas = new CASAuthentication({
    //     cas_url     : 'https://shib.idm.umd.edu/shibboleth-idp/profile/cas/',
    //     service_url : 'https://localhost:8080',
    //     cas_version : '2.0',
    //     session_name: 'cas_user',
    //     session_info: 'user_info'
    // })

    async function serveDocs(req, res) {
        let options = {
            root: path.join(__dirname, "../docs"),
        }
        console.log(req.session);
        res.sendFile('./output.html', options)
        
    }

    // Methods for /absences route

    async function getAbsences(req, res){
        // console.log("In getAbsence")
        // console.log(req.session)
        const validParams = ["course_id", "section_id", "uid", "type", "missed", "status"];
        const params = req.query
        const filter = {};
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
            let reportCursor = await ctx.db.collection('absences').find(filter)
            const reports = await reportCursor.toArray();
            return res.json(reports);
        } catch (e){
            console.error(e)
            return res.status(500).end();
        }

    }

    async function deleteAbsences(req, res) {
        let isEducatorResponse = await isEducator(req.body.uid);
        if (!isEducatorResponse) res.status(401).end();
        
        try {
            await ctx.db.collection("absences").deleteMany({});
            res.status(204).end()
        } catch(e) {
            console.error(e)
            res.status(500).end();
        }
    }

    // Methods for /absence/:id route

    async function getAbsence(req, res) {
        const{ id } = req.params
        try {
            const _id = new ObjectID(id)
            const filter = {};
            filter.id = _id;
            // let isEducator = await isEducator(req.body.uid);
            // if (!isEducator) filter.uid = req.body.uid;
            try {       
                let result = await ctx.db.collection('absences').findOne({filter})
                if (result) return res.json(result);
                else return res.sendStatus(404).end();
            } catch (e) {
                console.error(e)
                return res.sendStatus(500).end();
            }
        } catch(e) {
            return res.status(400).send('Invalid id format').end()
        }
    }

    async function deleteAbsence(req, res) {
        // let isEducator = await isEducator(req.body.uid);
        // if (!isEducator) res.status(400).end();
        const{ id } = req.params;
        try {
            const _id = new ObjectID(id);
            
            try {
                let result = await ctx.db.collection('absences').findOneAndDelete({_id});
                if (result.value){
                    if (result.value.files) await removeFilesHelper(result.value.files);
                    res.sendStatus(204);
                }
                else res.sendStatus(404).end()
            } catch (e) {
                console.error(e)
                return res.status(500).end();
            }
        } catch(e) {
            res.status(400).send("Invalid id format")
        } 
    }

    async function updateAbsence(req, res) {
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
            let newReport = await ctx.db.collection("absences").findOneAndUpdate({_id}, updatePayload, {returnOriginal: false});
            if (!newReport.value) return res.send(404).json({message: "An absence report by that id does not exist"});
            res.status(200).json(newReport.value);
        } catch (e) {
            console.error(e)
            res.sendStatus(500);
        }
        
    }

    async function createAbsenceReport(req, res) {
        console.log("in create absence");
        const files = req.files;
        let form;
        try {
            console.log(req.body);
            form = JSON.parse(req.body.form)
        } catch(e) {
            console.error(e)
            return res.sendStatus(400).end()
        }
        const now = new Date();
        const absenceObj = {
            "files": [],
            "status": Status.Pending,
            "created_at": now.getTime()
        }
        const absenceMandatory = {
            "uid": "",
            "section_id": "",
            "missed_days": {
                "start": "",
                "end": "",
            },
            "type": "",
            "rationale": "",
        }
    // NEED TO CHECK IF STUDENT IS IN COURSE THEY CLAIM
        try {
            Object.keys(absenceMandatory).forEach(k => {
                if (form.hasOwnProperty(k)) {
                    if (k == "section_id" || k == "type") absenceObj[k] = form[k].toLowerCase();
                    else absenceObj[k] = form[k];
                } else {
                    throw new Error(`missing json key ${k}`)
                }
            })
            const startEpoch = Date.parse(absenceObj.missed_days.start);
            const endEpoch = Date.parse(absenceObj.missed_days.end);
            if (startEpoch == NaN || endEpoch == NaN || startEpoch > endEpoch) {
                throw new Error("Invalid date format")
            }
            absenceObj.missed_days.start = startEpoch;
            absenceObj.missed_days.end = endEpoch;
            if (!Object.values(AbsenceType).includes(absenceObj.type)) {
                throw new Error("Invalid absence type")
            }
            const re = /^(\w+)-/;
            let course_id = re.exec(absenceObj.section_id)[1]
            absenceObj.course_id = course_id;
        } catch (e) {
            return res.status(400).send(e.message).end();
        }
    
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
            let result = await ctx.db.collection("absences").insertOne(absenceObj)
            return res.status(201).json(result.ops);
        } catch (e) {
            console.error(e);
            return res.sendStatus(500).end();
        }
    }

    async function getFiles(req, res) {
        const { id } = req.params;
        try {
            const _id = new ObjectID(id);
            try {
                let report = await ctx.db.collection('absences').findOne({_id})
                if (!report) {
                    return res.status(404).json({message: "No absence report exists with that id"});
                }

                let metadata = await ctx.db.collection('fs.files').find({
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
    }

    async function fetchFile(req, res) {
        const { id, fileId } = req.params;
        let _id, _fileId;
        try {
            _id = new ObjectID(id);
            _fileId = new ObjectID(fileId)
        } catch(e) {
            return res.status(400).json({message: "Invalid id format"})
        }

        let report = await ctx.db.collection("absences").findOne({_id});
        if (!report) {
            return res.status(404).json({message: "An absence object by that id does not exist"})
        }

        if (!report.files.some((storedFileId) => storedFileId.equals(_fileId))) {
            return res.status(404).json({message: "Absence object specified does not contain any file by that id"});
        }

        res.set("Content-Type", "image/jpeg")
        const bucket = new GridFSBucket(ctx.db);
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
    }

    async function uploadFiles(req, res) {
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
            let report = await ctx.db.collection("absences").findOne({_id});
            if (!report) res.send(404).json({message: "An absence report with the id does not exist"})
            if (report.files.length > 0) await removeFilesHelper(report.files);

            let fileIds = await uploadFileHelper(files);
            let result = await ctx.db.collection("absences").updateOne({_id}, {$set: {files: fileIds}});
            res.json(Object.assign(report, {files: fileIds}))
        } catch (e) {
            console.error(e)
            res.sendStatus(500);
        }
    }


    app.get('/', serveDocs);
    app.route('/absences')
        .get(cas.serviceValidate(), getAbsences)
        .delete(deleteAbsences)
        .post(Upload.array('files', MAX_IMAGES), createAbsenceReport)
    app.route('/absences/:id')
        .get(getAbsence)
        .put(updateAbsence)
        .delete(deleteAbsence)
    app.route('/absences/:id/files')
        .get(getFiles)
        .post(Upload.array('files',MAX_IMAGES), uploadFiles)
    app.route('/absences/:id/files/:fileId')
        .get(fetchFile)
    app.get('/login', function(req, res) {
        return res.redirect('/');
    });

}