import axios from 'axios';

const RECORDS_API_BASE_URL = 'http://localhost:8080/api/v1/techstop/';

export async function sendEmail(cwid){

  return await axios.get(RECORDS_API_BASE_URL+"email/"+cwid);
}

export async function getPhoneRecords(c){

  return await axios.get(RECORDS_API_BASE_URL+"phones", {cancelToken: c.token});
}

export async function getStatus(c){

  return await axios.get(RECORDS_API_BASE_URL+"status", {cancelToken: c.token});
}

export async function getTime(c){

  return await axios.get(RECORDS_API_BASE_URL+"time", {cancelToken: c.token});
}

export async function getAllRequests(){

  return await axios.get(RECORDS_API_BASE_URL+"request");
}

export async function getRequestsbyCwid(cwid){

  return await axios.get(RECORDS_API_BASE_URL+"request/"+cwid);
}
       
export async function updateQuantity(amount){

  return await axios.patch(RECORDS_API_BASE_URL+"phones/"+amount)
}

export async function updateWaitTime(time){

  return await axios.patch(RECORDS_API_BASE_URL+"time/"+time)
}

export async function createRequest(request){

  return  await axios.post(RECORDS_API_BASE_URL,request)
}

