import mongoose from "mongoose";
import {ClassModel} from "../schema"


export default {
    
    list: async function(req, res) {
        let filter = {}
        filter = Object.assign(req.query, filter);
        let result = await ClassModel.find(filter).exec();
        return res.json(result)
    },
    create: async function(req, res) {
        const { 
            id,
            courseId,
            sections,
            educators,
            schedule
        } = req.body;

        let existing = await ClassModel.findOne({id}).exec();
        if (existing) return res.status(400).json({message: "A class with that id already exists"});

        try {
            // We can do some free validation with mongoose schemas
            let newClass = new ClassModel({id, courseId, sections, educators, schedule});
            let result = await newClass.save();
            
            return res.json(result);
        } catch (e) {
            console.error(e);
            return res.status(400).json({message: e.message});
        }
        
    },
            
    retrieve: async function(req, res) {
        let classId = req.params.id;
        let foundClass = ClassModel.findOne({classId}).exec();
        if (!foundClass) return res.status(404).message({message: "class not found"});
        return res.json(foundClass);
    },
    // Primary data upload
    ingest: async function(req, res) {
        
    }

}