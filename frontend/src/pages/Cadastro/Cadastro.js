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
        const veri_cadastro = await api.post('/noiva/select',{cpf});
        if(veri_cadastro.data.length == 1){
            //A noiva ja está no banco de noivas
            const respo = await api.post('/dia/insert',{dia,mes,ano,cpf})
        }else{
            const response = await api.post('/noiva/',{cpf,nome,descricao})
            const respo = await api.post('/dia/insert',{dia,mes,ano,cpf})
        }

        notify()
        
    }

    return(
        <div className="form">
            <h2>{dia}/{mes}/{ano}</h2>
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