import React from 'react';

import { useNavigate } from 'react-router-dom';

function Redirect() {
    const Navigate = useNavigate();  

    const handleVolver = () => {
        Navigate('/'); // Redirige al inicio de la aplicación
    };

    return (
        <div>
            <h1>Página Errónea</h1>
            <p>La URL ingresada no coincide con ninguna página.</p>
            <button onClick={handleVolver}>Volver a la aplicación</button>
        </div>
    );
}

export default Redirect;