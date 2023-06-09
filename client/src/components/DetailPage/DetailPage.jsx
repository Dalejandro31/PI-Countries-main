import React from "react";
import style from './Detail.module.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountryDetail } from "../../redux/actions";
import { Link } from "react-router-dom";


function Detail(){
    const {id} = useParams();
    const selector = useSelector(state => state.countryDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetail(id));
    },[dispatch,id])

    return(
        <div className={style.contenedorPadre}>
            {selector.hasOwnProperty('name') ? (
                <div className={style.contenedorHijo}>
                    <div>
                        <h1>Informacion Detallada del Pais</h1>
                        <Link to='/home'><button className={style.buttonDetail} type='submit'>Home Page</button></Link>
                    </div>
                    <div className={style.divImagen}>
                        <img className={style.image} src={selector.flag} alt={selector.name} />
                    </div>
                    <div className={style.divDescription}>
                        <div className={style.contSpan}>
                            <span className={style.label}>Name:</span>
                            <span className={style.label}>{selector.name}</span>
                        </div>
                        <div className={style.contSpan}>
                            <span className={style.label}>Continent:</span>
                            <span className={style.label}>{selector.region}</span>
                        </div>
                        <div className={style.contSpan}>
                            <span className={style.label}>Capital:</span>
                            <span className={style.label}>{selector.capital}</span>
                        </div>
                        <div className={style.contSpan}>
                            <span className={style.label}>Subregion:</span>
                            <span className={style.label}>{selector.subregion}</span>
                        </div>
                        <div className={style.contSpan}>
                            <span className={style.label}>Area:</span>
                            <span className={style.label}>{selector.area}</span>
                        </div>
                        <div className={style.contSpan}>
                            <span className={style.label}>Population:</span>
                            <span className={style.label}>{selector.population}</span>
                        </div>
                    </div>
                    
                    <h1>Activity:</h1>
                    <div className={style.divDescription}>
                        {selector.activities.map((activity) => (
                            <div className={style.activityItem} key={activity.id}>
                                <div className={style.contSpan}>
                                    <span className={style.label}>Name: </span>
                                    <span className={style.label}>{activity.name}</span>
                                </div>
                                <div className={style.contSpan}>
                                    <span className={style.label}>Difficulty: </span>
                                    <span className={style.label}>{activity.difficulty}</span>
                                </div>
                                <div className={style.contSpan}>
                                    <span className={style.label}>Duration: </span>
                                    <span className={style.label}>{activity.duration} Horas</span>
                                </div>
                                <div className={style.contSpan}>
                                    <span className={style.label}>Season: </span>
                                    <span className={style.label}>{activity.season}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : undefined}
        </div>
    )
}

export default Detail;