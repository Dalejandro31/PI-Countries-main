import React from "react";
import style from './Home.module.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector }  from 'react-redux';
import { useEffect, useState } from "react";
import {getAllCountries} from '../../redux/actions';
import Card from '../Card/CardCountry.jsx'


function Home(){
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries)
    const [ /*ordered*/, setOrdered] = useState('');
    const [currentPage, setCurrenPage] = useState(1);
    const [elementsPage, /*setElemenPage*/ ] = useState(10);

    const indexOfLastElement = currentPage * elementsPage
    const indexOfFirstElement = indexOfLastElement - elementsPage
    const currentElements = allCountries.slice(indexOfFirstElement, indexOfLastElement)

    const paginationButtonNext = (e) => {
        e.preventDefault();
        setCurrenPage(currentPage + 1);
    };

    const paginationButtonPrev = (e) => {
        e.preventDefault();
        setCurrenPage(currentPage - 1);
    };

    const handlePageCh = (pageNumber) =>{
        setCurrenPage(pageNumber);
    };

    useEffect(()=>{
        dispatch(getAllCountries());
    },[allCountries]);

    const handleCountries = (e) =>{
        e.preventDefault();
        dispatch(getAllCountries(e.target.value));
        setOrdered(`order ${e.target.value}`)
    }
    return(
        <div>
            <h1>Home Page</h1>  
            <Link to = '/form'><button type='submit' className=" ">Form Page</button></Link>
            <Link to = '/'><button type='submit' className=" ">Landing Page</button></Link>
            <Link to = '/detail'><button type='submit' className=" ">Detail Page</button></Link>

            <div className={style.cardHome}>
                {
                    currentElements.map((country) =>{
                        return(
                            <Card
                                key={country.id}
                                id={country.name}
                                image={country.flag}
                                continents={country.region}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;