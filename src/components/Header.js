import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {useNavigate} from 'react-router-dom';

function Header(props) {

const navigate = useNavigate()

const handleLogin = (e)=>{
    
    navigate("/admin")
}
    return (
        <div className='header'>
            <header className="presby ">
                <img id='logo' src ="./red_logo.png" width={320} height={64} alt = "logo"></img>
                <div className='welcome'>
                         <h1 id='TS'>WELCOME TO TECHSTOP</h1>
                         <button type ='button' id = 'login' onClick={handleLogin}><FaUserAlt/>Admin</button>
                </div>
            </header>
            
        </div>
    );
}

export default Header;