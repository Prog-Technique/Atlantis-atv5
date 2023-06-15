import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/home';

import Clientes from './pages/Cliente/listagem';
import CadastraTitular from './pages/Cliente/Cadastrar/titular';
import VerEditarTitular from './pages/Cliente/VerEditar/titular';

import CadastraDependentes from './pages/Cliente/Cadastrar/dependente';
import VerEditarDependente from './pages/Cliente/VerEditar/dependente';

import CadastrarAcomodacoes from './pages/Acomodacao/acomodacoes';
import Acomodacoes from './pages/Acomodacao/listagem';

import Alocar from './pages/Locacao/alocar';
import Desalocar from './pages/Locacao/desalocar';
import AcomodacaoVazia from './pages/Locacao';

import './index.css';

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/clientes' element={<Clientes/>}/>
                <Route path='/cadastrar_titular' element={<CadastraTitular/>}/>
                <Route path='/cadastrar_acomodacao' element={<CadastrarAcomodacoes/>}/>
                <Route path='/cadastrar_dependente' element={<CadastraDependentes/>}/>
                <Route path='/acomodacoes' element={<Acomodacoes/>}/>

                <Route path='/ver_editar_titular' element={<VerEditarTitular/>}/>
                <Route path='/ver_editar_dependente' element={<VerEditarDependente/>}/>
                <Route path='/alocar' element={<Alocar/>}/>
                <Route path='/acomodacoes_disponiveis' element={<AcomodacaoVazia/>}/>
                <Route path='/desalocar' element={<Desalocar/>}/>
            </Routes>
        </Router>
    );
}
