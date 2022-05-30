import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import {Button} from 'react-bootstrap'

import './style.css'

export default function ViewNoivas(){
    
    const [nome,setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [dia,setDia] = useState()
    const [mes,setMes] = useState()
    const [ano,setAno] = useState()
    const [cpf,setCpf] = useState()

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
    }

    async function deletar(cpf){
        const response = await api.delete('/dia/delete',{"dia":dia,"mes":mes,"ano":ano,"cpf":cpf})
        console.log(response.data)
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
            <Button className="button" variant="outline-danger" onClick={() => deletar(cpf)}>Deletar</Button>
            
            <Button variant="outline-success" onClick={() => update(cpf)}>Salvar</Button>
            </div>
        </div>
    );
}