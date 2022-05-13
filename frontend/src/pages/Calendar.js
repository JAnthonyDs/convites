import { useState, useEffect } from 'react';
import './App.css';
import Calendar from 'react-calendar';
import './Calendar.css';
import api from '../services/api';

function App() {

  const [dia,setDia] = useState();
  const [mes,setMes] = useState();
  const [ano,setAno] = useState();
  const [noivas,setNoivas] = useState([]);
  
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
    
  }

  return (
    <div className="App">
      <Calendar onClickDay={(value) => setDia(value.getDate(),
      setMes(value.getMonth()),
      setAno(value.getFullYear()))
    }
      
    />
    <h1>{dia}/{mes+1}/{ano}</h1>
    
    <h2 className='noiva-list'>
      {noivas.length? 
      noivas.map(noiva => (
        <strong key={noiva.cpf}>{noiva.nome}  
        <br></br>
        <button className='button-3' onClick={() => loadInfo(noiva.cpf)}>Ver info de {noiva.nome}</button>
        <br></br>
        </strong>
        
        
      )): <strong>Nenhuma noiva cadastrada nesse dia. <br></br></strong>
      }
      
    </h2>
    </div>
  );
}

export default App;