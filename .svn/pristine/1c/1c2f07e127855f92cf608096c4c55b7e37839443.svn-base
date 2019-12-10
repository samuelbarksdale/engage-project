import {IMeetingAbsenceRequest} from "./models/class/meeting/meeting-absence-request";
import {IMeeting} from "./models/class/meeting";

export interface IAbsenceApi {

    uploadAbsenceFile(file: any): string;

    createAbsenceRequest(absenceRequest: IMeetingAbsenceRequest): void;

    updateAbsenceRequest(absenceRequest: IMeetingAbsenceRequest): void;

    cancelAbsenceRequest(meetingId: IMeeting['meetingId']): void;

    approveAbsenceRequest(meetingId: IMeeting['meetingId']): void;
}