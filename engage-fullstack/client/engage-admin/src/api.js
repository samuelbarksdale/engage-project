import axios from 'axios';
import config from './config.js';


function handleResponse(res) {
    
    if (res.status < 300) return {data: res.data};
    else if (res.status < 500) return {error: res.data.message}
    else return {error: "Oops, an unexpected error occured!"}
}

async function getUser(did) {
    let res = await axios.get(config.backendUrl + "/user/"+ did);
    if (res.status < 300) {
        return res.data;
    }
}

async function getMe() {
    let res = await axios.get(config.backendUrl + "/me");
    return handleResponse(res);
}

async function getMyClasses() {
    let res = await axios.get(config.backendUrl + "/me/classes");
    return handleResponse(res);
}

async function getMyCourse() {
    let res = await axios.get(config.backendUrl + "/me/course");
    return handleResponse(res)
}

async function createCourse(body) {
    let res = await axios.post(config.backendUrl + "/classes", body);
    return handleResponse(res);
}

async function updateCourse(body) {
    let res = await axios.put(config.backendUrl + "/classes", body);
    if (res.status < 300) return true;
    console.log(res.data.message)
}

async function getAttendance() {
    let res = await axios.get(config.backendUrl + "/attendance");
    if (res.status < 300) return res.data;
    return false
}

async function createPoll(body) {
    let res = await axios.post(config.backendUrl + "/polls", body);
    if (res.status < 300) return res.data;
    return false
}

async function getPolls() {
    let res = await axios.get(config.backendUrl + "/polls");
    if (res.status < 300) return res.data;
    return false
}

async function getAttendanceByDid(did){
    let res = await axios.get(config.backendUrl + "/attendance/" + did);
    if (res.status < 300) return res.data;
    return false
}

async function getAbsences(){
    let res = await axios.get(config.backendUrl + "/absences");
    return handleResponse(res)
}

// async function getAbsencesFiles(body) {
//     let res = await axios.get(config.backendUrl + "/absences/" + body.absenceId + "/files/" + body.fileId)
//     if (res.status < 300) return res.data;
//     return false
// }

async function getAbsenceFiles(body) {
    let res = await axios.get(config.backendUrl + "/absences/" + body + "/files")
    if (res.status > 300) console.error(res.body)
    else return res.data 
    return [];
}




async function deleteCourse(course) {
    let res = await axios.delete(config.backendUrl + "/classes/" +course)
    return handleResponse(res);
}


async function createAbsenceRequest(body) {
    console.log("I AM HERE"); 
    let res = await axios.post(config.backendUrl + "/absences", body).then((response) => {
        return response; 
    })
    console.log("WHY ISNT THIS DISPLAYIN"); 
    return res;
}

async function deleteAbsences(){
    console.log("here"); 
    let res = await axios.delete(config.backendUrl + "/absences/delete")

    return handleResponse(res);
}

async function deleteSpecificRequest(id){
    let res = await axios.delete(config.backendUrl + `/absences/delete/${id}`)
    return handleResponse(res);
}

async function postAbsenceFile(absenceId, formData){
    let res = await axios.delete(config.backendUrl + `/absences/${absenceId}/files`, formData)
    return handleResponse(res);
}



export default {getUser, getMe, createCourse, getAttendance, 
    getMyClasses, createPoll, getPolls, getAttendanceByDid,
    getAbsences, getMyCourse, deleteCourse, createAbsenceRequest, deleteAbsences, deleteSpecificRequest, getAbsenceFiles,postAbsenceFile}

    
