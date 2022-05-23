import * as React from 'react';
import {useState} from 'react';

import api from '../../services/api'

import {useNavigate} from 'react-router-dom'

import './login.css'

export default function SignIn() {
    const [login,setLogin] = useState()
    const [senha,setSenha] = useState()

    const navigate = useNavigate()

    async function handleSubmit(event){
        

        const response = await  api.post('/login',{login,senha})

        if(response.data.length === 1){
            navigate('/calendar')
        }
        console.log(response)
        
    };

  return (
    <div className='body'>
      <main className='form-signin w-100 m-auto'>
        
        <h1 className='h1'>Login</h1>

        <div className='form-floating'>
          <input type="email" className='form-control' id="floatingInput" placeholder="name@example.com"
          onChange={event => setLogin(event.target.value)}
          ></input>
          <label >Login</label>
        </div>

        <div className="form-floating">
        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
        onChange={event => setSenha(event.target.value)}
        ></input>
        <label >Senha</label>
        <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={() => handleSubmit()}>Acessar</button>

        <div className='checkbox mb-3'>
          <label>
            
          </label>
        </div>

        <p className="mt-5 mb-3 text-muted">&copy; Convites Store</p>
      </div>
      
      </main>
    </div>
  );
}
