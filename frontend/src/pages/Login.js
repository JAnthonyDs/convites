import React from "react";
import {useNavigate} from 'react-router-dom'

function Login(){
    const navigate = useNavigate()

    function passa(){
        navigate('/calendar')
    }

    return (
        <>
            <h1>Tela de Login V1</h1>
            <button onClick={() => {passa()}}>Login</button>
        </>
    );
}

export default Login;