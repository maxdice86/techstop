import React from 'react';
import { useState, useEffect } from 'react';
import { sendEmail, getPhoneRecords, createRequest,getRequestsbyCwid} from './services/services';
import { Calendar } from 'react-calendar';
import {Link} from 'react-router-dom'
import {FcTabletAndroid} from "react-icons/fc";
import { IconContext } from "react-icons";
import axios from 'axios';
import {format} from 'date-fns'

function Reserve(props) {

let today = new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York'
  }).split(",")[0]

 today = format(new Date (today), 'yyyy-MM-dd')

//  const  formatDate = (date) => {

//     console.log(date)

//     let myArray = date.split("/");

//     myArray[0] = myArray.splice(1, 1, myArray[0])[0];

//    let arr =  myArray.map((val) => {

//         if (parseInt(val) < 10){

//             val = "0"+val
//         }
//         return val
//     })

//    return date = arr.reverse().join("-");

// }

const [cwid, setCwid] = useState(()=>{""})
const [type, setType] = useState(()=>{""})
const [amount, setAmount] = useState(()=>0)
const [time, setTime] = useState(()=>{""})
const [date, setDate] = useState(()=>today)

const [oto, setOTO] = useState(()=> "")
const [shared, setShared] = useState(()=> "")

const [request,setRequest] = useState({   
    id: "",
    reqAmount: "",
    reqCwid: "",
    reqDate: "",
    reqId: "",
    reqTime: "",
    reqTypes: ""
})

let [reqCreated,setReqCreated] = useState(()=>false)


const handleCwid =(e) =>{
    setCwid(() => e.target.value)
}

const handleType =(e) =>{

    setType(() => e.target.value)   
}

const handleTime=(e) =>{
    
    switch(e.target.value){
    
        case '11am-12pm':setTime(() => e.target.value)
        break
        case '12pm-1pm':setTime(() => e.target.value)
        break
        case '1pm-2pm': setTime(() => e.target.value)
        break
        case '2pm-3pm': setTime(() => e.target.value)
        break
        case '3pm-4pm': setTime(() => e.target.value)
        break
        case '4pm-5pm': setTime(() => e.target.value)
        break
        default: break

    }
    
}

const handleCalenderClick =(e) =>{

   let temp =  e.toLocaleString('en-US',{
        timeZone: 'America/New_York'
      }).split(",")[0]
      setDate( () => format(new Date (temp), 'yyyy-MM-dd'))
}

const handleAmount =(e) =>{
    setAmount(() => e.target.value)
}

const clearScreen = (e)=>{
    // console.log("request id is ", request.reqId)
    Array.from(e.target).forEach((e) => (e.value = ""))
}

const handleSubmit =(e) =>{
     e.preventDefault()
    const reserve = {cwid: cwid , types: type, amount: amount , pickup_time: time, dates: date}
    createRequest(reserve)
    setReqCreated(()=> true)
    clearScreen(e)
    sendEmail(cwid)
   
}

useEffect(()=>{

    const cancelToken = axios.CancelToken.source();

    const intervalId = setInterval(() => {

    if (reqCreated ) {
        getRequestsbyCwid(cwid).then((res)=>{
        setRequest(()=> res.data)
        // console.log("server data", res.data)
        }) 
    }

     getPhoneRecords(cancelToken).then((res)=>{

        setOTO((pre)=> res.data.map((d) => {
        return d.types === 'OTO'? d.qauntity: "";
        }))
        

        setShared((pre)=> res.data.map((d) => {
        return d.types === 'SHARED'? d.qauntity: "";
        })) 

    console.log("request is ",request)

    }, 3000);

    return() =>{

        console.log("cleaning up")
        cancelToken.cancel();
        clearInterval(intervalId);
    } 
    
})},[])

    return (
        <div className='main-res-container container'>
      <div className = " reserve-container card-body">
                            <form onSubmit={handleSubmit} onChange={() => setReqCreated(false)}>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Cwid:</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter cwid"
                                        name = "firstName"
                                        // className = "form-control"
                                        require
                                        onChange ={handleCwid}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Type:</label>
                                    <select onChange={handleType} defaultValue= "">
                                        <option> </option>
                                        <option  value = "SHARED">Shared</option>
                                        <option value = "OTO">Personal</option>
                                    </select>
                                </div>

                                <div className = "form-group mb-2">
                                    <label htmlFor ='clients' className = "form-label"> Amount :</label>
                                    <input
                                        type = "number"
                                        placeholder = "Enter amount"
                                        name = "clients"
                                        // className = "form-control"
                                        required
                                        min={0}
                                        onChange ={handleAmount}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Time:</label>
                                    <select  onChange ={handleTime} defaultValue= "">
                                        <option> </option>
                                        <option value = "11am-12pm">11am-12pm</option>
                                        <option value = "12pm-1pm">12pm-1pm</option>
                                        <option value = "1pm-2pm">1pm-2pm</option>
                                        <option value = "2pm-3pm">2pm-3pm</option>
                                        <option value = "3pm-4pm">3pm-4pm</option>
                                        <option value = "4pm-5pm">4pm-5pm</option>

                                    </select>
                                </div>

                                <div className = "form-group mb-2">
                                    <label htmlFor ='dates' className = "form-label"> Date :</label>
                                    <input
                                        type = "date"
                                        placeholder = "YYYY/MM/DD"
                                        name = "dates"
                                        // className = "form-control"
                                        value = {date}
                                        required
                                        min={today}
                                        onChange = {(e) => setDate(e.target.value)}
                                    >
                                    </input>
                                </div>
                                <section className='confrim'>
                                <Link id = 'cancel'to="/reserve" className="btn btn-danger" reloadDocument> Cancel </Link>
                                <button id = 'sub' className = "btn btn-success" type='submit'>Submit</button>
                                </section>
                            </form>

                        </div>

    <div className='calender-container'>
        <section className='inventory'>
      
        <IconContext.Provider value={{ size: "2em", className: "global-class-name tablet" }}>
        <FcTabletAndroid />
        </IconContext.Provider>
        <label>In Stock</label>
        <label>Shared:</label>{shared}
        <label>Personal:</label>{oto}
        </section>
                <Calendar minDate = {new Date() } onClickDay={handleCalenderClick} className= {"text-muted"}/>
    </div> 
        <section className='response-container'>
            <div className='message-container'>
            <h5>Request Status:</h5>
            {reqCreated && <p> Request created an email was sent to <b>{cwid}@nyp.org</b>. Reserve number <b>{request.reqId}</b>: </p> }
            </div>            
        </section>
    </div>
    );
}

export default Reserve;