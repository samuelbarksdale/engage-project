import mongoose from 'mongoose';


const sectionIdValidator = function(v: string) {
    return /^\d{4}$/.test(v);
}
const Enrolled = new mongoose.Schema({
    classId: {
        type: String,
        lowercase: true,
        required: true
    },
    sectionId: {
        type: String,
        required: true,
        validate: {
            validator: sectionIdValidator
        }
    },
    courseId: {
        type: String,
        lowercase: true,
        required: true
    },
    semsester: String
});
const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        lowercase: true,
        required: true
    },
    name: String,
    authority: {
        type: String,
        enum: ["STUDENT", "ADMIN"],
        required: true
    },
    classes: [Enrolled]
});

const timeValidator = function(v: string) {
    return /^\d+:\d\d$/.test(v);
}
const dayValidator = function(v:number[]) {
    console.log(v)
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
            type: String,
            validate: {validator: timeValidator, message: "Time must be in format 00:00"},
            required: true
        },
        end: {
            type: String,
            validate: {validator: timeValidator, message: "Time must be in format 00:00"},
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


const sectionSchema = new mongoose.Schema({
    id: {
        type: String,
        requried: true,
        validate: {
            validator: sectionIdValidator,
            message: "Section must be a four digit code."
        }
    },
    roster: [String]
});

//Class Schema definition

const ClassSchema = new mongoose.Schema({
    id: String,
    courseId: String,
    educators: [String],
    semester: String,
    topics: [{date: Date, topicsCovered: [String]}],
    sections: {
        type: [sectionSchema],
        required: true
    },
    schedule: {
        type: scheduleSchema
    }
});

const SectionModel = mongoose.model('Section', sectionSchema);
const ClassModel = mongoose.model('Class', ClassSchema);
const UserModel = mongoose.model('User', userSchema);
export {UserModel, SectionModel, ClassModel}