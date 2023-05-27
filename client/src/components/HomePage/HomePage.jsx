import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCountries } from "../../redux/actions";
import Card from '../Card/CardCountry';

function Home(){
  const dispatch = useDispatch();
  const countries = useSelector(state => state.countries);
  const itemsPerpage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    dispatch(getAllCountries());
  },[dispatch]);

  //logica para obtener los paises para la pagina actual 
  const startIndex = (currentPage - 1) * itemsPerpage;
  const endIndex = currentPage + itemsPerpage;
  const currentCountries = countries.slice(startIndex, endIndex);

  return(
    <div>
      <h1>Home Page</h1>
      <div>
        {currentCountries.map((country) =>(
          <Card
            key={country.id}
            id={country.id}
            name={country.name}
            flag={country.flag}
            region={country.region}
          />
        ))}
      </div>
      <div>
        <button disabled={currentPage === 1} onClick={()=> setCurrentPage((prevPage) => prevPage -1)}>
          Previous
        </button>
        <button disabled={endIndex >= countries.length} onClick={()=> setCurrentPage((prevPage) => prevPage + 1)}>
          Next
        </button>
      </div>
    </div>
    
  )
}

export default Home;