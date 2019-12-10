import {IMeetingAttendance} from "./models/class/meeting/meeting-attendance";
import {IMeeting} from "./models/class/meeting";

export interface IAttendanceApi {
    attendMeeting(meetingId: IMeeting['meetingId']): void;

    getClassAttendanceRecords(): IMeetingAttendance[];
}