import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Sozinhos/home';

import Titulares from './pages/CadastraCliente/Titulares';
import Dependentes from './pages/CadastraCliente/Dependentes';

import Acomodacao from './pages/Sozinhos/cadastraAcomodacao';
import VinculaHospedeQuarto from './pages/Sozinhos/vincula';

import Titular from './pages/Listagens/listaTitular';
import EditarCliente from './component/VerEditar/titular';
import ModalDelTitular from './component/ModalDeletar/titular';

import Dependente from './pages/Listagens/listaDependentes';
import Acomodacoes from './pages/Listagens/acomodacoes';
import VerEditarAcomodacao from './component/VerEditar/acomodacao';
import ModalDelAcomodacao from './component/ModalDeletar/acomodacao';

import './index.css';

export default function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/cadastrar_cliente' element={<Titulares />} />
                <Route path='/cadastrar_cliente/dependentes' element={<Dependentes />} />
                
                <Route path='/cadastrar_acomodacao' element={<Acomodacao />} />
                <Route path='/vincular' element={<VinculaHospedeQuarto />} />

                <Route path='/titular' element={<Titular />} />
                <Route path='/editar_cliente/1' element={<EditarCliente />} />
                <Route path='/deletar_cliente/1' element={<ModalDelTitular />} />
                
                <Route path='/dependente' element={<Dependente />} />
                
                <Route path='/acomodacoes' element={<Acomodacoes />} />
                <Route path='/ver_editar_acomodacao' element={<VerEditarAcomodacao />} />
                <Route path='/deletar_acomodacao' element={<ModalDelAcomodacao />} />
                
            </Routes>
        </Router>
    );
}