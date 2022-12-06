import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FcAssistant, FcIphone,FcClock } from "react-icons/fc";
import { IconContext } from "react-icons";
import { getPhoneRecords, getTime, getStatus } from './services/services';
import {useNavigate, Link} from 'react-router-dom';

function Home(props) {

    const[status, setStatus] = useState(()=> parseInt(0))
    const[phones, setPhones] = useState(0)
    const[phonesShared, setSharedPhones] = useState(0)
    const[time, setTime] = useState(0)

    const navigate = useNavigate()

    const handleReserve = (e)=>{
        
        navigate("/reserve")
    }

useEffect(()=>{
    const cancelToken =axios.CancelToken.source();

    const intervalId = setInterval(() => {

        // console.log("getting phones")
    
        getTime(cancelToken).then((res)=>{
            setTime(() => 
            res.data.map((d) => {
                return d.wait_time;
                })
            )
        })
    
    
        getStatus(cancelToken).then((res)=>{
    
        //    techs.current = res.data 
    
        //    console.log(techs.current.id)
    
        //   setStatus( techs.current.map((s)=>{
    
        //     return (s.online && )
        //    })
        //   )
         })
    
        getPhoneRecords(cancelToken).then((res)=>{
    
            setPhones(() => 
            res.data.map((d) => {
            return d.types === 'OTO'? d.qauntity: "";
            })
            )
    
            setSharedPhones(() => 
            res.data.map((d) => {
            return d.types === 'SHARED'? d.qauntity: "";
            })
            )
        }) 

    }, 3000);
    

    return() =>{
        console.log("cleaning up")
        cancelToken.cancel();
        clearInterval(intervalId);
    } 

},[])


    return (
           
        <div className='main-container container'>
            <div className='message-container'>
            <h5>WHAT'S HAPPENING </h5>
            <p>Thanks for stopping by the <b>Columbia Tech Stop</b> located in the Milstien building 2nd floor.
                Here you can find the current status of the availability of the techs on site and the 
                number of phones readily available for pickup. You can also use the reserve option to schedule a pickup for more than 5 employees.
            </p>
            </div>

            <div className='main'>

                <h5>TECHSTOP STATUS</h5>
                <section className='tech-status'>
                <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                <FcAssistant />
                </IconContext.Provider>
                <span>Techs on site</span>
                {status}
                </section>

                <section className='phone-status'>
                <IconContext.Provider value={{size: "2em", className: "global-class-name" }}>
                <FcIphone/>                
                </IconContext.Provider>
                <span>Assigned phones for pickup</span>
                 {phones}
                </section>

                <section className='phone-status'>
                <IconContext.Provider value={{size: "2em", className: "global-class-name" }}>
                <FcIphone/>                
                </IconContext.Provider>
                <span>Department shared phones for pickup</span>
                 {phonesShared}
                </section>
                
                <section className='phone-status'>
                <IconContext.Provider value={{ size: "2em", className: "global-class-name" }}>
                <div className='clock'>
                <FcClock/> 
                </div>              
                </IconContext.Provider>
                <span>Estimated wait time</span>
                 {time} min
                </section> 
            </div>

            <div className='message-container'>
            <h5>PHONE PICKUP</h5>
            <p>Click reserve to pickup more than <b>5</b> phones</p>
            <button type ='button' className='btn btn-danger' onClick={handleReserve}>Reserve</button>
            </div>
            <div className='message-container'>
            <h5>KNOWLEDGE CENTER </h5>
            <ul>
               <li> <Link>Help</Link></li>
                <li><Link>Tutorials</Link></li>
                <li> <Link>FAQ</Link></li>
                <li> <Link>Contact Us</Link></li>
            </ul>
            </div>
    </div>           
    );
}

export default Home;