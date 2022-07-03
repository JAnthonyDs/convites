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
    const [id,setId] = useState()

    const notify = () => {
        toast("Atualizado com Sucesso",{type:"success"})
    };

    useEffect( () =>{
        async function loadInfo(){
            const id = localStorage.getItem("id_noiva")
            setId(id)
            const response = await api.get(`/noiva/${id}`)

            setCpf(response.data.cpf)
            setNome(response.data.nome)
            setDescricao(response.data.descricao)
            //console.log(response.data.descricao)
            setDia(localStorage.getItem('dia'))
            setMes(localStorage.getItem('mes'))
            setAno(localStorage.getItem('ano'))

        }
        loadInfo()
    },[])

    async function update(cpf){
        const response = await api.put(`/noiva/${id}`,{cpf,nome,descricao})
        console.log(response.data)
        notify();
    }

    async function deletar(id){
        //apaga a noiva naquele dia
        const dia_id = await api.get(`/dia/${dia}/${mes}/${ano}`)
        const response = await api.delete(`/noiva/${id}/${dia_id.data}`)

        alert("Noiva excluída com sucesso!")
        
    }

    return(
        <div className="form">
            <h2>{dia}/{mes}/{ano}</h2>
            <br></br>
            <strong>CPF:</strong>
            <input className="form-input" value={id} onChange= {event => setCpf(event.target.value)}></input>
            <strong>Nome:</strong>
            <input className="form-input" value={nome} onChange={event => setNome(event.target.value)}></input>
            <strong>Descrição:</strong>
            <input className="form-descricao" value={descricao} onChange={event => setDescricao(event.target.value)}></input>
            <div className="buttons">
            <Button className="button" variant="outline-danger" onClick={() => deletar(id)}>Excluir</Button>
            
            <Button variant="outline-success" onClick={() => update(id)}>Salvar</Button>
            </div>

            <ToastContainer position="top-center" newestOnTop/>
        </div>
    );
}