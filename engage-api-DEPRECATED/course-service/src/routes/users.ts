import mongoose from 'mongoose';
import { UserModel, ClassModel } from '../schema';

export default {
    list: async function(req, res) {
        let courseId = req.params.id;
        try {
            let users = await UserModel.find({
                "classes": {$elemMatch: {courseId}}
            }, {}).exec();
            res.json(users);
        } catch (e) {
            console.error(e);
            res.sendStatus(e);
        }
        
    },
    listAll: async function(req, res) {
        let {courseId, classId, sectionId} = req.query;
        
        let filter = {};
        if (courseId) filter = Object.assign(filter, {courseId});
        if (classId) filter = Object.assign(filter, {classId});
        if (sectionId) filter = Object.assign(filter, {sectionId})

        try {
            let users = await UserModel.find({
                "classes": {
                    $elemMatch: { filter }
                }
            }).exec();
 
            return res.json(users);
        } catch (e) {
            console.error(e);
            return res.sendStatus(500);
        }
    },
    retrieve: async function(req, res) {
        let uid = req.params.id;
        try {
            let user = await UserModel.findOne({uid}).exec();
            return res.json(user);
        } catch (e) {
            return res.setStatus(500);
        }
    },
    remove: async function(req, res) {

    },
    
    create: async function(req, res) {

    }

}