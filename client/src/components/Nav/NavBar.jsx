import style from './NavBar.module.css';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {getCountryName} from '../../redux/actions';

function NavBar(){
    const dispatch = useDispatch();
    const [countryName, setCountryName] = useState({countryValue:''});
    const handleSearch = (e) => {
        setCountryName({countryValue: e.target.value})
    }
    const onSearch = () =>{
        dispatch(getCountryName(countryName.countryValue));
    }
    return(
        <div className={style.contenedorNav}>
            <Link to='/'>Landing Page</Link>
            <Link to='/form'>Form Page</Link>
            <div className={style.searchContainer}>
                <input className={style.inputSearch} type='text' value={countryName.countryValue} onChange={(e) => handleSearch(e)} placeholder='Country...' />
                <button className={style.butonSearch} onClick={onSearch}>SEARCH</button>
            </div>
        </div> 
    );
};

export default NavBar;