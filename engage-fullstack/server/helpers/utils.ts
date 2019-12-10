
const distance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (f) => {
        return f * (Math.PI/180)
    }
    let R = 6371e3; // meters
    lat1 = toRadians(lat1);
    lat2 = toRadians(lat2);
    lng1 = toRadians(lng1);
    lng2  = toRadians(lng2);

    let phi = toRadians((lat2-lat1));
    let lam = toRadians((lng2-lng1));
    let a = Math.sin(phi/2) * Math.sin(phi/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(lam/2) * Math.sin(lam/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d;
}

const parseTime = (time:string) => {
    let re = /^(\d?\d):(\d\d)$/
    let res = time.match(re);
    return stdTime(parseInt(res[1]), parseInt(res[2]));
}

const stdTime = (hour:number, min:number) => {
    let std = new Date(70, 0, 1);
    return std.setHours(hour, min);
}

const padWithZero = (str, times) => {
    let re = /(\d+)([A-Za-z]+)?/
    if (!str) return '';
    let matches = str.toString().match(re);
    let digits = matches[1];
    let letterCode = matches[2] || ''
	return digits.padStart(times, "0") + letterCode
}

export {distance, stdTime, parseTime, padWithZero};