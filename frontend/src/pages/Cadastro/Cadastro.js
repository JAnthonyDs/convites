import React from "react";
import { useState, useEffect } from "react";
import api from "../../services/api";
import { Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

import './style.css'

import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";

export default function CadastroNoivas() {

    const [nome, setNome] = useState()
    const [descricao, setDescricao] = useState()
    const [dia, setDia] = useState()
    const [mes, setMes] = useState()
    const [ano, setAno] = useState()
    const [cpf, setCpf] = useState()
    const [tipo, setTipo] = useState(null)
    const [foto, setFoto] = useState(null)

    useEffect(() => {
        async function loadInfo() {
            setDia(localStorage.getItem('dia'))
            setMes(localStorage.getItem('mes'))
            setAno(localStorage.getItem('ano'))
        }
        loadInfo()
    }, [])

    const notify = () => {
        toast("Cadastrada com sucesso!!", { type: "success" })
    };

    async function cadastrar() {
        //console.log(foto)
        const data = new FormData()
        data.append('foto',foto)
        data.append('cpf',cpf)
        data.append('nome',nome)
        data.append('descricao',descricao)
        data.append('tipo',tipo)
        data.append('dia',dia)
        data.append('mes',mes)
        data.append('ano',ano)

        const res = await api.post('/noiva', data)
        
        notify()
    }

    return (
        <div className="main">
            <div className="data">
                <h2>{dia}/{Number(mes) + 1}/{ano}</h2>
            </div>
            <div className="formulario">
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>CPF</Form.Label>
                        <Form.Control type="email" placeholder="" onChange={e => setCpf(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control type="text" placeholder="" onChange={e => setNome(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            placeholder=""
                            style={{ height: '100px' }}
                            onChange={e => setDescricao(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={e => setTipo(e.target.value)}>
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

                    <Button variant="outline-success" onClick={() => cadastrar()}>Cadastrar</Button>
                </Form>
            </div>
        </div>
    );
}