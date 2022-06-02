import { useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import './Calendar.css';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Table} from 'react-bootstrap'
import {Button} from 'react-bootstrap'

import {useNavigate} from 'react-router-dom'

import { ToastContainer, toast, TypeOptions } from "react-toastify";
import "react-toastify/ReactToastify.min.css";


function App() {

  const [dia,setDia] = useState(0);
  const [mes,setMes] = useState(-1);
  const [ano,setAno] = useState(0);
  const [noivas,setNoivas] = useState([]);
  const [veri_user,setVeri_user] = useState(localStorage.getItem("acess"))

  const notify = () => {
    toast("Selecione um dia!!",{type:"warning"})
  };
  
  const navigate = useNavigate()
  
  useEffect(() => {
    async function loadNoivas(){
      setNoivas([])
      const response = await api.post('/dia',{dia,mes,ano})
      setNoivas(response.data)
    }
    loadNoivas();
  },[dia])

  
  async function loadInfo(cpf){
    const response = await api.post('/noiva/select',{cpf})
    console.log(response.data)
    localStorage.setItem('cpf_noiva',cpf)
    localStorage.setItem('dia',dia)
    localStorage.setItem('mes',mes)
    localStorage.setItem('ano',ano)

    navigate('/noiva')
    
  }

  async function cadastro(){
    if(dia == 0){
      notify()
    }else{
      localStorage.setItem('dia',dia)
    localStorage.setItem('mes',mes)
    localStorage.setItem('ano',ano)
    navigate('/cadastro')
    }
    
  }

  return (
    <div className="App">
      <Calendar onClickDay={(value) => setDia(value.getDate(),
      setMes(value.getMonth()),
      setAno(value.getFullYear()))
    } 
    />
    <h1>{dia}/{mes+1}/{ano}</h1>
    
    <Button variant='outline-success' onClick={() => cadastro()}>Cadastrar noiva nesse dia</Button>  
    

   

   <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>CPF</th>
        <th>Nome</th>
        <th> </th>
    </tr>
  </thead>
  <tbody>
    {noivas.map((noiva,index) => (
      <tr key={noiva.cpf}>
        <td>{index} </td>
        <td>{noiva.cpf}</td>
        <td>{noiva.nome}</td>
        <td><Button variant="outline-primary" onClick={() => loadInfo(noiva.cpf)}>Ver informações</Button></td>
        
      </tr>
      
    ))}
      
    </tbody>
   </Table>
   <ToastContainer position="top-center" newestOnTop/>
    
    </div>
  );
}

export default App;