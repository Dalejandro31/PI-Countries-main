import style from './CardCountry.module.css';
import React from 'react';
import {  useNavigate } from 'react-router-dom';

function Card(props){
    const { id, name, flag, region,  } = props;
    const navigate = useNavigate();
    const handleImageClick = () => {
        navigate(`/detail/${id}`);
    };


    return(
        <div className={style.card}>
            <div className={style.CardInfo}>
                <div className={style.content}>
                    <p className={style.name}>{name}</p>
                    <p className={style.region}>{region}</p>
                </div>
            <img className={style.Cardimage} src={flag} alt={name} onClick={handleImageClick}/>
            </div>
        </div>
    )
}

export default Card;