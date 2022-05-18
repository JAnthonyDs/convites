import React from 'react';
import { BrowserRouter as Router, Route,Routes} from 'react-router-dom'

import Calendar from './pages/Calendario/Calendar';
import Login from './pages/Login/Login';

export default function Rotas(){
    return(
        <Router>    
            <Routes>    
                <Route path='/' exact element={<Login/>}/>
                <Route path='/calendar' element={<Calendar/>}/>
            </Routes>
        </Router>
    );
}