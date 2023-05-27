import React from "react";
import style from './Detail.module.css';
import { Link } from "react-router-dom";


function Detail(){
    return(
        <div>
            <h1>Detail</h1> 
            <Link to = '/home'><button type='submit' className=" ">Home Page</button></Link>
            <Link to = '/form'><button type='submit' className=" ">Form Page</button></Link>
            <Link to = '/'><button type='submit' className=" ">Landing Page</button></Link>
        </div>
    )
}

export default Detail;