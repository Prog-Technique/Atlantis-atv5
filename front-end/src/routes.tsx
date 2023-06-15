import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home';

import Clientes from './pages/Cliente/listagem';
import CadastrarClientes from './pages/Cliente/Cadastrar/titular';
import VerCliente from './pages/Cliente/VerEditar/titular';

import CadastrarAcomodacoes from './pages/Acomodacao/acomodacoes';
import Acomodacoes from './pages/Acomodacao/listagem';
import AcomodacaoVazia from './pages/Ver/alocacao/acomodacaoVazia';

import Alocar from './pages/Ver/alocacao/acomodacaoVazia/alocar';
import Desalocar from './pages/Ver/alocacao/acomodacaoVazia/desalocar';

import AddDependentes from './pages/Cliente/Cadastrar/dependente';
import EditarDependentes from './pages/Cliente/VerEditar/dependente';

import './index.css';

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/clientes' element={<Clientes/>}/>
                <Route path='/cadastrar/clientes' element={<CadastrarClientes/>}/>
                <Route path='/cadastrar/acomodacoes' element={<CadastrarAcomodacoes/>}/>
                <Route path='/cadastrar/dependentes' element={<AddDependentes/>}/>
                <Route path='/acomodacoes' element={<Acomodacoes/>}/>

                <Route path='/ver/cliente' element={<VerCliente/>}/>
                <Route path='/ver/dependentes' element={<EditarDependentes/>}/>
                <Route path='/alocar' element={<Alocar/>}/>
                <Route path='/acomodacoes_disponiveis' element={<AcomodacaoVazia/>}/>
                <Route path='/desalocar' element={<Desalocar/>}/>
            </Routes>
        </Router>
    );
}
