import {IMeeting} from "..";
import {EMeetingAbsenceRequestStatus} from "./meeting-absence-request-status";

export interface IMeetingAbsenceRequest {
    meetingId: IMeeting['meetingId'];
    filePath: string;
    status: EMeetingAbsenceRequestStatus;
}