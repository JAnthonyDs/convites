import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import {Button} from 'react-bootstrap'

import './style.css'

import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function CadastroNoivas(){
    
    const [nome,setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [dia,setDia] = useState()
    const [mes,setMes] = useState()
    const [ano,setAno] = useState()
    const [cpf,setCpf] = useState()
    const [tipo,setTipo] = useState('entrega')
    const [foto,setFoto] = useState('null.png')

    useEffect( () =>{
        async function loadInfo(){
            
            setDia(localStorage.getItem('dia'))
            setMes(localStorage.getItem('mes'))
            setAno(localStorage.getItem('ano'))

        }
        loadInfo()
    },[])

    const notify = () => {
        toast("Cadastrada com sucesso!!",{type:"success"})
      };

    async function cadastrar(){
        //verificar cadastro de noiva na banco
        
        const res = await api.post('/noiva',{cpf,nome,descricao,tipo,foto,dia,mes,ano})

        notify()
        
    }

    return(
        <div className="form">
            <h2>{dia}/{Number(mes)+1}/{ano}</h2>
            <br></br>
            <strong>CPF:</strong>
            <input className="form-input" onChange={event => setCpf(event.target.value)}></input>
            <strong>Nome:</strong>
            <input className="form-input" onChange={event => setNome(event.target.value)}></input>
            <strong>Descrição:</strong>
            <input className="form-descricao" onChange={event => setDescricao(event.target.value)}></input>
            <div className="buttons">
            
            
            <Button variant="outline-success" onClick={() => cadastrar()}>Cadastrar</Button>
            </div>

            <ToastContainer position="top-center" newestOnTop/>
        </div>
    );
}