import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
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
    const [tipo,setTipo] = useState()
    const [foto,setFoto] = useState()
    
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
            setTipo(response.data.tipo)
            setFoto(response.data.foto[0])

            //console.log(response.data.descricao)
            setDia(localStorage.getItem('dia'))
            setMes(localStorage.getItem('mes'))
            setAno(localStorage.getItem('ano'))

            //alert(foto)

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
        <div className="main">
            <div className="data">
                <h2>{dia}/{Number(mes) + 1}/{ano}</h2>
            </div>
            <div className="formulario">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control type="email" placeholder="" value={cpf} onChange={e => setCpf(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="" value={nome} onChange={e => setNome(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            style={{ height: '100px' }}
                            onChange={e => setDescricao(e.target.value)}
                            value={descricao}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select aria-label="Default select example" value={tipo} onChange={e => setTipo(e.target.value)}>
                            <option>Selecionar</option>
                            <option value="Design">Desing</option>
                            <option value="Entrega">Entrega</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Foto</Form.Label>
                        <br></br>
                        <input type="file" onChange={e => setFoto(e.target.files[0])}/>
                    </Form.Group>

                    <img src={`http://localhost:3333/files/${foto}`} alt="foto" width="150" height="150" ></img>    

                    <Button variant="outline-success">Cadastrar</Button>
                    <Button variant="outline-danger" onClick={() => deletar(id)}>Deletar</Button>
                </Form>
            </div>
        </div>
    );
}