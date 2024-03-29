import mongoose from 'mongoose';


const dayValidator = function(v:number[]) {

    return Object.keys(v).length > 0 &&
        v.every(day => Number.isInteger(day)) &&
        v.every((day:number) => day > 0 && day < 6) && 
        Array.from(
            v.reduce( (acc: Map<number, number>, day:number) => 
                !acc.get(day) 
                    ? acc.set(day, 1) 
                    : acc.set(day, acc.get(day) + 1), 
                new Map()
            ).values()
        ).every(i => i === 1);
}

const scheduleSchema = new mongoose.Schema({
    days: {
        type: [Number],
        required: true,
        validate: {validator: dayValidator, message: "Days is required and must be unique integers bounded from 1 to 5 inclusive"},
    },
    time: {
        start: {
            type: Number,
            required: true
        },
        end: {
            type: Number,
            required: true
        }   
    },
    location: {
        lat: {
            type: mongoose.Types.Decimal128, 
            required: true
        }, 
        lng: {
            type: mongoose.Types.Decimal128, 
            required: true
        },
        radius: {type: Number, required: true}
    }
});

const SectionSchema = new mongoose.Schema({
    sectionId: {
        type: String,
        lowercase: true,
        required: true
    },
    courseName: {
        type: String,
        lowercase: true,
        required: true
    },
    lectureName: {
        type: String,
        lowercase: true,
        required: true
    },
    schedule: {
        type: scheduleSchema
    }
})

//Lecture Schema definition
const LectureSchema = new mongoose.Schema({
    // cmsc216-01
    lectureName: {
        type: String,
        lowercase: true,
        required: true
    },
    // cmsc216
    courseName: {
        type: String,
        lowercase: true,
        required: true
    },
    educators: [String],
    topics: [{date: Date, topicsCovered: [String]}],
    schedule: {
        type: scheduleSchema,
        required: true
    }
});
const LectureModel = mongoose.model('Lecture', LectureSchema);
const SectionModel = mongoose.model('Section', SectionSchema);
export {LectureModel, SectionModel, dayValidator}