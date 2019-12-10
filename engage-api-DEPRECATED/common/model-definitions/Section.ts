import {ISchedule} from "./Course";
import {IEducator, IStudents} from "./User";

export type IRoaster = IStudents['uid'][];

export interface ISection {
    _id: string;
    name: string;
    ta: IEducator['uid'][];
    roster: IRoaster;
    schedule: ISchedule;
}