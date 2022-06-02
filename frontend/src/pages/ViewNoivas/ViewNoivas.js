import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import {Button} from 'react-bootstrap'

import './style.css'

import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";


export default function ViewNoivas(){
    
    const [nome,setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [dia,setDia] = useState()
    const [mes,setMes] = useState()
    const [ano,setAno] = useState()
    const [cpf,setCpf] = useState()

    const notify = () => {
        toast("Atualizado com Sucesso",{type:"success"})
    };

    useEffect( () =>{
        async function loadInfo(){
            const cpf = localStorage.getItem("cpf_noiva")
            setCpf(cpf)
            const response = await api.post('/noiva/select',{cpf})
            setNome(response.data[0].nome)
            setDescricao(response.data[0].descricao)
            
            setDia(localStorage.getItem('dia'))
            setMes(localStorage.getItem('mes'))
            setAno(localStorage.getItem('ano'))

        }
        loadInfo()
    },[])

    async function update(cpf){
        const response = await api.put('/noiva/update',{"cpf_antigo":cpf,cpf,nome,descricao})
        console.log(response.data)
        notify();
    }

    async function deletar(cpf){
        //apaga a noiva naquele dia
        const response = await api.delete('/dia/delete/',{dia,mes,ano,cpf})
        
    }

    return(
        <div className="form">
            <h2>{dia}/{mes}/{ano}</h2>
            <br></br>
            <strong>CPF:</strong>
            <input className="form-input" value={cpf}></input>
            <strong>Nome:</strong>
            <input className="form-input" value={nome} onChange={event => setNome(event.target.value)}></input>
            <strong>Descrição:</strong>
            <input className="form-descricao" value={descricao} onChange={event => setDescricao(event.target.value)}></input>
            <div className="buttons">
            <Button className="button" variant="outline-danger" onClick={() => deletar(cpf)}>Excluir</Button>
            
            <Button variant="outline-success" onClick={() => update(cpf)}>Salvar</Button>
            </div>

            <ToastContainer position="top-center" newestOnTop/>
        </div>
    );
}