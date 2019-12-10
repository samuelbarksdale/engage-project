export enum EScheduleMeeting {
    lecture,
    discussion,
    other
}

export enum EDays {
    M,
    T,
    W,
    Th,
    F,
}

export interface ILocation {
    lat: number;
    long: number;
    radius: number;
}

export type IMeetingTime = number;


export interface IScheduleMeeting {
    _id: string;
    type: EScheduleMeeting;
    days: EDays[];
    start: IMeetingTime;
    end: IMeetingTime;
    location: ILocation;
}
