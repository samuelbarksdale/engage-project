import {IEducator, IStudents} from "./User";
import {ISection} from "./Section";
import {IScheduleMeeting} from "./ScheduleMeeting";

export type ISemester = string;
export type ITopicNames = string;

export interface ITopic {
    date: Date;
    topicsCovered: ITopicNames[];
}

export type ISchedule = IScheduleMeeting['_id'][]

export interface ICourse {
    id: string;
    educators: IEducator['uid'][];
    semester: ISemester;
    topics: ITopic[];
    sections: ISection['_id'][];
    schedule: IScheduleMeeting
}
