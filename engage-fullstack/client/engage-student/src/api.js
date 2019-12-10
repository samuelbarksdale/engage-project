import axios from 'axios';
import config from './config.js';


function handleResponse(res) {
    if (res.status < 300) return {data: res.data};
    else if (res.status < 500) return {error: res.data.message}
    else return {error: "Oops, an unexpected error occured!"}
}

async function checkin(coords) {
    let body = {location: {lat: coords.latitude, lng: coords.longitude}};
    let res = await axios.post(config.backendUrl + "/attendance", body);

    return handleResponse(res);
}


async function getMe() {
    let res = await axios.get(config.backendUrl + "/me");
    console.log(res)
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

async function getAbsences(){
    let res = await axios.get(config.backendUrl + "/absences");
    if (res.status < 300) return res.data;
    return false
}


async function createAbsenceRequest(body) {
    let res = await axios.post(config.backendUrl + "/absences", body)
    return handleResponse(res);
}

async function deleteAbsences(){
    let res = await axios.delete(config.backendUrl + "/absences/delete")

    return handleResponse(res);
}

async function deleteSpecificRequest(id){
    let res = await axios.delete(config.backendUrl + `/absences/delete/${id}`)
    return handleResponse(res);
}

async function postAbsenceFile(absenceId, formData){
    console.log(absenceId); 
    let res = await axios.post(config.backendUrl + `/absences/${absenceId.data}/files`, formData)
    return handleResponse(res);
}


export default {
    getMe, 
    getAttendance, 
    getAbsences, 
    getMyCourse, 
    createAbsenceRequest, 
    deleteAbsences, 
    deleteSpecificRequest,
    checkin,
    postAbsenceFile
}