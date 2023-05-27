import React from "react";
import style from './Form.module.css';
import { Link } from 'react-router-dom';


function Form(){
    return(
        <div>
            <h1>Form</h1>
            <Link to = '/home'><button type='submit' className=" ">Home Page</button></Link>
            <Link to = '/'><button type='submit' className=" ">Landing Page</button></Link>
            <Link to = '/detail'><button type='submit' className=" ">Detail Page</button></Link>
        </div>
    )
}

export default Form;