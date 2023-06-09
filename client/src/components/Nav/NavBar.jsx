import style from './NavBar.module.css';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getCountryName} from '../../redux/actions';

function NavBar({currentPage, setCurrentPage}){
    const dispatch = useDispatch();
    const [countryName, setCountryName] = useState({countryValue:''});
    const handleSearch = (e) => {
        setCountryName({countryValue: e.target.value})
    }
    const onSearch = () =>{
        dispatch(getCountryName(countryName.countryValue));
        setCurrentPage(1);
    }
    return(
        <div className={style.contenedorNav}>
            <Link to='/'><button className={style.butonNav}>Landing Page</button></Link>
            <Link to='/form'><button className={style.butonNav}>Form Page</button></Link>
            <div className={style.searchContainer}>
                <input className={style.inputSearch} type='text' value={countryName.countryValue} onChange={(e) => handleSearch(e)} placeholder='Country...' />
                <button className={style.butonSearch} onClick={onSearch}>SEARCH</button>
            </div>
        </div> 
    );
};

export default NavBar;