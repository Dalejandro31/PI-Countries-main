import style from './LandingPage.module.css';
import React from 'react';
import { Link } from 'react-router-dom';


function Landing(){
    return(
        <div className={style.contenedorPadre}>
            <div className={style.contenedorDescription}>
                <h1>Bienvenidos a mi proyecto Conutries, dale click al boton Home para empezar!.</h1>
            </div>
            <Link to = '/home'><button type='submit' className={style.buttonHome}>Home Page</button></Link>
        </div>
    );
};

export default Landing;