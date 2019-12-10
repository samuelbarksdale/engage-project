let MongoClient = require("mongodb")
async function connectToDatabase(url) {
    try{
        const client = await new MongoClient(url, {autoReconnect: true, useNewUrlParser: true});
        return Promise.resolve(client)
    } catch (e){
        console.error("Failed to connect to the mongodb instance")
        return Promise.reject(e)
    } 
}

async function seeder() {

    let client = await connectToDatabase('mongodb://localhost:27017');
    try {
        let dbCourse = client.db("course-service");
        let dbAttendance = client.db("attendance-service");
        let dbAbsence = client.db("absence-service");
        let dbPolling = client.db("polling-service");
        await dbCourse.dropDatabase();
        await dbAttendance.dropDatabase();
        await dbPolling.dropDatabase();
        await dbAbsence.dropDatabase();

        let schedule = {
            days: [2, 4, 5],
            timeStart: 19.0,
            timeEd: 20.0,
            location: {
                lat: 38.9892543,
                long: -76.9510169,
                radius: 90
            }
        }

        let section = {
            id: 'CMSC216-0101',
            roster: ['stu', 'dent'],
            schedule: schedule
        }

        await dbCourse.collection('section').insertOne(section);

        let sec = await dbCourse.collection('section').find().toArray();

        console.log(sec);

        let course = {
            id: 'CMSC216',
            educators: ['lherman'],
            semester: 'fall2019',
            topics: [{
                date: Date(1970,1,1,19,0,0,0),
                topicsCovered: ['pointers']
            }],
            sctions: ['CMSC216-0101'],
            schedule: schedule
        }

        await dbCourse.collection('course').insertOne(course);

        let cou = await dbCourse.collection('course').find().toArray();

        console.log(cou);

        let educator = {
            name: "Larry Herman",
            uid: "lherman",
            type: 2,
            classesCurrent: [{
                courseId: 'CMSC216',
                sectionId: 'CMSC216-0101'
            }]
        }

        let student1 = {
            name: "student1",
            uid: "stu",
            type: 1,
            classesCurrent: [{
                courseId: 'CMSC216',
                sectionId: 'CMSC216-0101'
            }]
        }

        let student2 = {
            name: "student2",
            uid: "dent",
            type: 1,
            classesCurrent: [{
                courseId: 'CMSC216',
                sectionId: 'CMSC216-0101'
            }]
        }

        await dbCourse.collection('user').insertOne(educator);
        await dbCourse.collection('user').insertOne(student1);
        await dbCourse.collection('user').insertOne(student2);

        let usrs = await dbCourse.collection('user').find().toArray();

        console.log(usrs);

        let pollChoice = {
            course_id: 'CMSC216',
            status: 'open',
            creator: 'lherman',
            question: 'have you studied?',
            type: 'choice',
            choices: [ 
                {
                    choice: 'yes',
                    choice_id: '0',
                    votes: 0,
                    voters: []
                },
                {
                    choice: 'no',
                    choice_id: '1',
                    votes: 0,
                    voters: []
                }
            ]
        }

        let pollText = {
            course_id: 'CMSC216',
            status: 'open',
            creator: 'lherman',
            question: 'have you studied?',
            type: 'text',
            text_answers: [{
                uid: '',
                answer: ''
            }]
        }

        await dbPolling.collection('polls').insertOne(pollChoice);
        await dbPolling.collection('polls').insertOne(pollText);

        let absence1 = {
            id: "1",
            uid: "stu",
            section_id: "CMSC435-0101",
            missed_days: {
                start: Date(1970,1,1,19,0,0,0),
                end: Date(1970,1,1,19,0,0,0)
            },
            type: "death",
            rationale: "hackathon"
        }

        await dbAbsence.collection('absence').insertOne(absence1);
        // await dbCourse.deleteOne({_id:'5dd73e3992d54e2dc0a6ebf9'});
        // await dbCourse.deleteOne({_id:'5dd73e3992d54e2dc0a6ebfa'});
        // await dbPolling.deleteOne({_id:'5dd737dd8b09dd6fcc0632b2'});
        // await dbPolling.deleteOne({_id:'5dd73e3992d54e2dc0a6ebff'});
        // await dbCourse.deleteOne({_id: '5dd73e3992d54e2dc0a6ebfb'});
        // await dbCourse.deleteOne({_id: '5dd73e3992d54e2dc0a6ebfc'});
        // await dbCourse.deleteOne({_id: '5dd73e3992d54e2dc0a6ebfd'});
        let secs = await dbCourse.collection('section').find().toArray();
        let cours = await dbCourse.collection('course').find().toArray();
        let users = await dbCourse.collection('user').find().toArray();
        let polls = await dbPolling.collection('polls').find().toArray();
        let absence = await dbAbsence.collection('absence').find().toArray();
        console.log(users, secs, cours, polls, absence);

        let now = new Date();
        const time = now.getTime();

        let attendaceLog = {
            uid: 'stu',
            timestamp: time,
            section_id: 'CMSC216-0101',
            type: "LEC"
        }

        let attendaceLog2 = {
            uid: 'bischoff',
            timestamp: time,
            section_id: 'CMSC216-0101',
            type: "LEC"
        }

        let attendaceLog3 = {
            uid: 'bischoff',
            timestamp: time,
            section_id: 'CMSC216-0101',
            type: "LEC"
        }

        await dbAttendance.collection('attendance').insertOne(attendaceLog);
        await dbAttendance.collection('attendance').insertOne(attendaceLog2);
        await dbAttendance.collection('attendance').insertOne(attendaceLog3);
        let attended = await dbAttendance.collection('attendance').find().toArray();
        console.log(attended);

        
    } catch(e) {
        console.error(e)
    } finally {
        client.close();
    }
}

seeder();