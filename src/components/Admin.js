import React, { useState, useEffect, useRef, useMemo } from 'react';
import { updateQuantity, getPhoneRecords, createRequest, getAllRequests, updateWaitTime } from './services/services';
import {FcTabletAndroid} from "react-icons/fc";
import { IconContext } from "react-icons";
import axios from 'axios';
import Table from './Table/Table';


function Admin(props) {

const [inventoryPhonesOTO, setInOTO] = useState(()=>0)
const [inventoryPhonesShared, setInShared] = useState(()=>0)

const [reqlist, setReqlist] = useState(false)
const [requests, setRequests] = useState([])

const [option,setOption] = useState(()=>"")

const [oto, setOTO] = useState(()=> 0)
const [shared, setShared] = useState(()=> 0)
const [users, setUsers] = useState(()=> 0)

const handleOption =(e) =>{
    setOption(() => e.target.value)
}

const handleOTO =(e) =>{
    setOTO(() => e.target.value)  
}

const handleShared =(e) =>{
    setShared(() => e.target.value)  
}

const handleUsers =(e) =>{
    setUsers(() => e.target.value)  
}

const buttonClick =(e) =>{
    
   let sharedUpdate = inventoryPhonesShared[1]

   //e.preventDefault()

   console.log(e.target.name)

   if(e.target.name === 'otoSub') {
    
    let update = inventoryPhonesOTO[0]

    update = update -1;

    if (update < 0) update = 0;

    updateQuantity(`${update}/OTO`);

 } else if (e.target.name === 'otoAdd'){

    let update = inventoryPhonesOTO[0]

    update += 1;

    updateQuantity(`${update}/OTO`);
 }
   
switch(e.target.name){

    case'sharedSub':

    sharedUpdate = sharedUpdate -1;

    if (sharedUpdate < 0) sharedUpdate = 0;

    console.log(typeof(sharedUpdate))

    updateQuantity(`${sharedUpdate}/SHARED`);

break;

    case'sharedAdd':

    sharedUpdate = sharedUpdate + 1;

    console.log(typeof(sharedUpdate))

    updateQuantity(`${sharedUpdate}/SHARED`);

break;

default:break;

}
}

const buttonOK =  (e) =>{
    //e.preventDefault()
    switch(e.target.id){
        case "otobtn": updateQuantity(`${oto}/OTO`);
        setOTO("")
        break;
        case "sharedbtn": updateQuantity(`${shared}/SHARED`);
        setShared("")
        break;
        case "usersbtn": 
        users <= 3 ? updateWaitTime(15): updateWaitTime(users * 5);
        break
        default: break
    }
}

const getReq=(e)=>{

    reqlist?setReqlist(false): setReqlist(true);
     // {reqId, reqCwid, reqTypes, reqAmount, reqTime, reqDate}
    // const newArray = myArray.map(object => ({object.id, object.token, object.name}))
    console.log("clicking",e.target.name)
    // setRequests(requests.map(({reqId, reqCwid, reqTypes,reqAmount, reqTime,reqDate}) => ({reqId, reqCwid, reqTypes,reqAmount, reqTime,reqDate})));
   
}


useEffect(()=>{
    console.log("in effect")
    const cancelToken =axios.CancelToken.source();

    getAllRequests().then((res)=>{
    
        setRequests(res.data)

    })

    getPhoneRecords(cancelToken).then((res)=>{

        setInOTO(()=> res.data.map((d) => {
        return d.types === 'OTO'? d.qauntity: "";
        }))
        
        console.log(typeof(inventoryPhonesOTO))

        setInShared(()=> res.data.map((d) => {
        return d.types === 'SHARED'? d.qauntity: "";
        }))

    return() =>{
        console.log("cleaning up")
        cancelToken.cancel();
    } 
    
})},[])

    return (
<div className = 'main-admin-container container'>
    <div className = 'admin-box'>
        <section className='inventory'>
        <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
        <FcTabletAndroid />
        </IconContext.Provider>
        <label>SHARED:</label><b>{inventoryPhonesShared}</b>
        <label>OTO:</label><b>{inventoryPhonesOTO}</b>
        </section>
    <form className='form-group mb-2 admin-form'>
        <section>
       
            <label htmlFor="status">Set Availability:</label>
                <select name="status" onChange={handleOption} defaultValue= "" >
                    <option value="N/A"></option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="lunch">Lunch</option>
        </select>
        </section>
        <section>
            <h6>Enter Phones:</h6>
            <label htmlFor='otobtn' style = {{marginRight: "1.8em"}}>OTO</label>
            <input name = "onetoOne" placeholder = "" type="number" defaultValue={""} onChange={handleOTO} min={0}/>
            <button id = 'otobtn' type="submit" className="btn btn-danger" onClick={buttonOK}>OK</button>

            <button name='otoSub' onClick={buttonClick}type = "submit" className = "btn btn-primary" >-</button>
            <button name='otoAdd' onClick={buttonClick} type = "submit" className = "btn btn-primary ">+</button>
            <br></br>
            <label>SHARED</label>
            <input type="number" defaultValue={""} onChange={handleShared} min={0}/>
            <button id = 'sharedbtn' type="submit" className="btn btn-danger" onClick={buttonOK}>OK</button>
            <button name = "sharedSub" onClick={buttonClick} className = "btn btn-primary ">-</button>
            <button name = "sharedAdd"onClick={buttonClick} className = "btn btn-primary ">+</button>
        </section>

            <section>
                <label>Users in Line:</label>
                <input type="number" defaultValue={""} onChange={handleUsers} min={0}/>
                <button id ='usersbtn' type="submit" className="btn btn-danger " onClick={buttonOK}>OK</button>
                
        </section>
    </form>

            
        </div>

        
        <div className='notifications'>
            <input style={{width: 220, placeholder: "search"}}/>
            <button onClick={getReq}>Search</button>

            <div className='resultset'>
             {
                reqlist && <Table data={requests}/>
   
             }
            </div>
        
            </div> 

        </div>
    );
}

export default Admin;