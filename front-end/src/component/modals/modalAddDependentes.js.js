import './style.css';
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { Button } from 'react-bootstrap';

export default function ModalAddDepenentes({close}){
    const [nome, setNome] = useState('');
    const [nome_social, setNomeSocial] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [passaporte, setPassaporte] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        
        const dependenteData = {
          nome: nome,
          nomeSocial: nome_social,
          nascimento: data_nasc,
          cpf: cpf,
          passaporte: passaporte
        };

        localStorage.setItem("dependentes", [dependenteData])

        close()
    }

    return(
        <div className="modal">
            <div className="container">
                <button className="close" onClick={ close }>
                    ---
                </button>

                <main>
                    <div className='text'>
                    <h1 className='margin-titulo'><strong>Cadastro de Dependentes</strong></h1>
                    </div>
                    <div className="forms">
                    <form onSubmit={handleSubmit}>
                        <div className="field">
                        <label>Nome Completo:</label>
                        <input placeholder='Insira o nome completo' type="text" onChange={(e) => setNome(e.target.value)} />
                        </div>

                        <div className="campo-duplo">
                        <div className="field esquerda">
                            <label>Nome social:</label>
                            <input placeholder='Insira o nome social' type="text" onChange={(e) => setNomeSocial(e.target.value)} />
                        </div>
                        <div className="field direita">
                            <label>Nascimento:</label>
                            <input type="date" onChange={(e) => setData_nasc(e.target.value)} />
                        </div>
                        </div>

                        <div className="campo-duplo">
                        <div className="field esquerda">
                            <label>CPF:</label>
                            <input type="text" placeholder='XXX.XXX.XXX-XX' onChange={(e) => setCpf(e.target.value)} />
                        </div>
                        <div className="field direita">
                            <label>Passaporte:</label>
                            <input type="text" placeholder='XXX.XXX.XXX-XX' onChange={(e) => setPassaporte(e.target.value)} />
                        </div>
                        </div>

                        <div className="btns">
                            <Button className="add add-green" variant="outline-dark" type='submit'>Cadastrar</Button>{' '}
                        </div>
                    </form>
                    </div>
                </main>
            </div>
        </div>
    )
}