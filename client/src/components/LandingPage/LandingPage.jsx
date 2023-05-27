import style from './LandingPage.module.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Landing(){
    return(
        <div>
            <h1>Landing Page</h1>
            <Link to = '/home'><button type='submit' className=" ">Home Page</button></Link>
            <Link to = '/form'><button type='submit' className=" ">Form Page</button></Link>
            <Link to = '/Detail'><button type='submit' className=" ">Detail Page</button></Link>
        </div>
    );
};

export default Landing;