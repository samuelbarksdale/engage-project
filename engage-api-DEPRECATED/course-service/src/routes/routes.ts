import path from 'path';
import { UserModel, ClassModel } from '../schema';

export default {
    docs: async function(req, res) {
        return res.sendFile(path.join(__dirname, "../docs/index.html"))
    },
    nuke: async function(req, res) {
        await UserModel.collection.drop();
        await ClassModel.collection.drop();
        res.sendStatus(204);
    },
    export: async function(req, res) {
        return res.sendFile(path.join(__dirname, "../docs/index.html"))
    },
}



// //NOT UPDATED WITH CURRENT SCHEMA's
// app.delete('/courses/:id', async (req, res) => {
//     let roster: Array<string> = [];
//     Course.findOne({'id': req.params.id}, function(err, result) {
//         if (err) {
//             console.error(err);
//         } else if (result == null) {
//             console.log("Course id: " + req.params.id + " does not exist");
//             res.status(400);
//             return res.send("ERROR: course with id: " + req.params.id + " does not exist");
//         } else {   
//             console.log("Deleting course: " + req.params.id);
//             let sections: Array<string> = (result as any).sections;
//             for (var i = 0; i < sections.length; i++) {
//                 /*Section.findOne({id: sections[i]}, async function(err2, sect){
//                     if (err2) {
//                         console.error(err2);
//                         //res.status(400);
//                         return res.send("ERROR: database error");
//                     } else if (sect == null) {
//                         //res.status(400);
//                         return res.send("ERROR: database could not find section object");
//                     } else {
//                         let scheds: Array<string> = (sect as any).schedule;
//                         for (var j = 0; j < scheds.length; j++) {
//                             try {
//                                 let x = await Schedule.deleteOne({_id: scheds[j]}).exec();
//                             } catch (err3) {
//                                 console.error(err3);
//                                 //res.status(400);
//                                 return res.send("ERROR: could not delete schedule object");
//                             }
//                         }
//                         console.log("Deleted all schedules for section: " + sections[i].toString());
//                     }
//                 })*/
//                 Section.findOne({id: sections[i]}, async function(err2, sect){
//                     if(err2) return res.send("ERROR: section not found");
//                     roster = (sect as any).roster;
//                 });
//                 try {
//                     Section.deleteOne({id: sections[i]}).exec;
//                     console.log("Deleted section: " + sections[i]);
//                 } catch (err4) {
//                     console.error(err4);
//                     res.status(400);
//                     return res.send("ERROR: could not delete section object");
//                 }
//             }
//             Course.deleteOne({id: req.params.id}, async function(err5){
//                 if (err5) {
//                     console.error(err5);
//                     res.status(400);
//                     return res.send("ERROR: could not delete course object");
//                 } else {
//                     //delete the course object from classesCurrent from all users//_id: user._id
//                     /*for (var j = 0; j < roster.length; j++) {
//                         let result = await User.findByIdAndUpdate({_id: user._id}, {$pull: {classCurrent: {$elemMatch: {courseId}}}});
//                     }*/
//                     let r = await User.find({classesCurrent: { $elemMatch: {courseId: req.params.id}}}).exec();
//                     let c= (r as any);
//                     let c_ids: Array<mongoose.Schema.Types.ObjectId> = [];
//                     //console.log((c as any)[0].classesCurrent);
//                     for (var lol = 0; lol < c.length; lol++) {
//                         var filtered_array = (c as any)[lol].classesCurrent.filter(function(value, index, arr){
//                         return (value as any).courseId != req.params.id;
//                         });
//                         //console.log("Setting user: " + c[lol].uid + " classes to: " + filtered_array);

//                         let retu = await User.update(
//                             {$and: [{classesCurrent:{ $elemMatch: {courseId: req.params.id}}},{uid:c[lol].uid}]},
//                             {$set: {classesCurrent: filtered_array}},//classCurrent: [{ courseId: {$elemMatch: req.params.id}}]}},
//                             {multi: true}
//                             ).exec();
//                         console.log("Modified user: "+c[lol].uid+":"+retu);
//                     }
                    

//                     /*let retu = await User.update(
//                         {classesCurrent: { $elemMatch: {courseId: req.params.id}}},
//                         {$pull: {classesCurrent: {$elemMatch: {courseId:req.params.id}}}},//classCurrent: [{ courseId: {$elemMatch: req.params.id}}]}},
//                         {multi: true}
//                         ).exec();
//                     if (!retu) return res.send("ERROR deleting course from users");*/
//                     res.send("DELETED course: " + req.params.id);
//                 }
//             })
//         }
//     });
// })

// app.get('/courses', async (req, res) => {
//     let query = {};

//     let courses = await Course.find(query).exec();
//     if (!courses) return res.sendStatus(404);
//     return res.json(courses);
// })

// app.get('/courses/:id', async (req, res) => {
//     const {id} = req.params;
//     const course = await Course.findOne({id}).exec();
//     if (!course) return res.sendStatus(404);
//     return res.json(course);
// })

// //delete a user from a course
// app.delete('/courses/:id/students/:uid', async (req, res) => {
//     let courseId = req.params.id;
//     let uid = req.params.uid;

//     // find student. if no student 400
//     // if student classes not contain courseId 400
//     // remove obj from student classes
//     // take sectionId, remove student from that section
//     // 204
//     try{
//         let result = await User.findOne({uid}).exec();
//     } catch (err) {
//         console.error(err);
//         return res.status(400).json({message: "Student uid does not exist"});
//     }

//     try{
//         let result = await Course.findOne({courseId}).exec();
//     } catch (err) {
//         console.error(err);
//         return res.status(400).json({message: "Course id does not exist"});
//     }

//     try {
//         let r = await Section.find({roster: uid}).exec();
//         let c = (r as any);
//         //console.log(c);
//         for (var lol = 0; lol < c.length; lol++) {
//             var filtered_array = (c as any)[lol].roster.filter(function(value, index, arr){
//                 return value != req.params.uid;
//             });
//             //console.log("Setting user: " + c[lol].uid + " classes to: " + filtered_array);

//             let retu = await Section.update(
//                 {$and: [{roster:uid},{id:c[lol].id}]},
//                 {$set: {roster: filtered_array}},//classCurrent: [{ courseId: {$elemMatch: req.params.id}}]}},
//                 {multi: true}
//                 ).exec();
//             //console.log("Modified Section: "+c[lol].uid+":"+retu.toString());
//         }
//         //: "+uid+"from course: "+courseId});
//         /*let user = await User.findOne({uid}).exec();
//         if (!user) return res.status(400).json({message: "Student by that uid does not exist"});
//         let classObj = user.classesCurrent.find((ele, index) => {
//             return ele.courseId === courseId;
//         });
//         if (!classObj) return res.status(404).json({message: "Student not enrolled in provided course"})
//         let result = await User.findByIdAndUpdate({_id: user._id}, {$pull: {classCurrent: {$elemMatch: {courseId}}}}).exec();
        
//         await Section.findOneAndUpdate(
//             {id: classObj.sectionId}, 
//             {$pull: {roster: uid}}
//         ).exec();*/
//     } catch (e) {
//         console.error(e);
//         return res.sendStatus(500);
//     }
//     //return res.send("Deleted user from course");
//     return res.sendStatus(204).json({message:"Deleted user"});
// })

// app.get('/courses/:id/students', async (req, res) => {
//     const {id} = req.params;
//     console.log(id);
//     let users = await User.find({'classesCurrent': { $elemMatch: {courseId: id}}}).exec();
//     if (!users) return res.status(404)
//     return res.json(users);
// })

// //User Service Endpionts
// // Create a student inside a class
// app.post('/courses/:id/students', async (req, res) => {
//     const courseId = req.params.id
//     const {uid, sectionId, name} = req.body;

//     try {
//         let user = await User.findOne({uid}).exec();
//         if (!user) {
//             let _id = new mongoose.mongo.ObjectID()
//             let newUser = new User({
//                 _id,
//                 name,
//                 uid, 
//                 classesCurrent: [{sectionId, courseId}],
//                 type: 1
//             });
//             user = await newUser.save();
//         } else {
//             let newClass = {
//                 courseId: courseId,
//                 sectionId: sectionId
//             }
//             user = await User.findOneAndUpdate(
//                 {$and: [{uid: (user as any).uid},{classesCurrent: {$not:{ $elemMatch: {courseId: courseId}}}}]},
//                 {$addToSet: {classesCurrent: newClass}},
//                 {new: true}).exec();
//         }
//         let section = await Section.findOneAndUpdate(
//             {id: sectionId},
//             {$addToSet: {roster: uid}}, 
//             {new: true})
//         .exec();
//         if (!section) {
//             return res.status(400).json({message: "invalid sectionId"});
//         }
//         return res.json(user);
//     } catch(e) {
//         console.error(e)
//         return res.sendStatus(500);
//     }
// }) 

// app.post('/users', async (req, res) => {
//     let {uid, classesCurrent } = req.body;
//     let user = await User.findOne({uid}).exec();
//     if (user) return res.json(user);

//     //Create User Document for MongoDB
//     let newId = new mongoose.mongo.ObjectId();//for testing only: '123456789ABCDEFFAAAABBBC'
//     let newUser = new User({
//         _id: newId,
//         name: req.body.name,
//         uid: req.body.uid,
//         classesCurrent: req.body.classesCurrent
//     });
//     //Save Document
//     newUser.save(function (err, newUser) {
//         if (err) {
//             console.error(err);
//             return res.status(500);
//         } else {
//             return res.json(newUser);
//         }
//     });          
// })


// app.get('/users/:uid', (req, res) => {
//     console.log("uid: " + req.params.uid);
//     User.findOne({'uid': req.params.uid}, function(err, user) {
//         if (err) {
//             return console.error(err);
//         } else if (user == null) {
//             return res.status(404).send("User does not exist");
//         } else {
//             console.log(user);
//             return res.json(user);
//         }
//     })
// })

// app.get('/users', async (req, res) => {
//     // type == 1 is student; type == 2 is educator (Larry and TAs)
//     let {type} = req.query;
//     let query = {};
//     if (type) query.type = type;
//     try {
//         let users = await User.find(query).exec();
//         return res.json(users);
//     } catch(e) {
//         console.error(e);
//         return res.sendStatus(500);
//     }
    
// });

// app.delete('/users/:uid', (req, res) => {
//     let {uid} = req.params;
//     User.deleteOne({uid}, function(err) {
//         if (err) {
//             return console.error(err);
//         }
//         return res.sendStatus(204);
//     })
// })


// app.get('/sections', async (req, res) => {
//     let query = req.query;
//     let filter = Object.assign({},query);
//     try {
//         let sections = await Section.find(filter).exec();
//         return res.json(sections);
//     } catch (e) {
//         console.error(e);
//         return res.sendStatus(500);
//     }
    
// })