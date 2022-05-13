import React from "react";

function Login({history}){

    function passa(){
        
        history.push('/calendar')
    }

    return (
        <>
            <h1>Tela de Login V1</h1>
            <button onClick={() => {passa()}}>Login</button>
        </>
    );
}

export default Login;