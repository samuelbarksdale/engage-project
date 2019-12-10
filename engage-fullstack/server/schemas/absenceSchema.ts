import mongoose, { Mongoose } from 'mongoose';

const absenceSchema = new mongoose.Schema({
    files: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    status: {
        type: String,
        
    },
    uid: String,
    section_id: String,
    missed_days: {
        start: String,
        end: String,
    },
    type: {
        type: String,
        enum: [
            "illness",
            "religious",
            "military",
            "university",
            "external",
            "other"
        ],
        required: true
    },
    rationale: String,
    email: String,
    missed_assigments: String,
    isDeleted: Boolean 

}, {timestamps: { createdAt: 'created_at' }});

const AbsenceModel = mongoose.model('Absence', absenceSchema);
export {AbsenceModel}