import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import Card from '../Card/CardCountry';

function Home(){
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);

  useEffect(()=>{
    dispatch(getAllCountries());
  },[dispatch]);

  return(
    <div>
      <h1>Home Page</h1>
      <div>
        {countries.map((country) =>(
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flag={country.flag}
            region={country.region}
          />
        ))}
      </div>
    </div>
    
  )
}

export default Home;