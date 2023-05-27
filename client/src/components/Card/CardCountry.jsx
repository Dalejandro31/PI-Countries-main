import style from './CardCountry.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

function Card(props){
    const { id, name, flag, region } = props;

    return(
        <div>
            <img className={style.Cardimage} src={flag} alt={name}/>
            <h3 className={style.name}>{name}</h3>
            <h3 className={style.nmae}>{region}</h3>
            <div><Link to={`/detail/${id}`}><button></button></Link></div>
            <></>
        </div>
    )
}

export default Card;