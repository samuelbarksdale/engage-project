import mongoose, { Schema } from 'mongoose';

const AttendanceSchema = new Schema({
    did: {
        type: String,
        required: true,
    },
    lectureName: {
        type: String,
        required: true,
    }, 
    courseName: {
        type: String,
        required: true
    },
    sectionId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    format: {
       type: String,
       enum: ["LEC", "DIS"],
       required: true
    }
});

const AttendanceModel = mongoose.model('Attendance', AttendanceSchema);
export {AttendanceModel};