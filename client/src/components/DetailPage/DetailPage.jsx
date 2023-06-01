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
        <div>
            {
                selector.hasOwnProperty('name')?(
                    <div>
                        <h1>Detail</h1>
                        <Link to = '/home'><button type='submit' className=" ">Home Page</button></Link>
                        <Link to = '/form'><button type='submit' className=" ">Form Page</button></Link>
                        <Link to = '/'><button type='submit' className=" ">Landing Page</button></Link>
                        <div>
                        <img className="" src={selector.flag} alt={selector.name}/>
                        </div>
                        <div>
                            <h2>Name: </h2>
                            <p>{selector.name}</p>
                            <h2>Continent: </h2>
                            <p>{selector.region}</p>
                            <h2>Capital</h2>
                            <p>{selector.capital}</p>
                            <h2>Subregion: </h2>
                            <p>{selector.subregion}</p>
                            <h2>Area</h2>
                            <p>{selector.area}</p>
                            <h2>Population: </h2>
                            <p>{selector.population}</p>
                            <h2>Activity: </h2>
                            <ul>
                            {selector.activities.map((activity) => (
                                <li key={activity.id}>{activity.name}</li>
                            ))}
                            </ul>
                            
                            
                        </div>


                    </div>
                ) : undefined
            }
            
        </div>
    )
}

export default Detail;