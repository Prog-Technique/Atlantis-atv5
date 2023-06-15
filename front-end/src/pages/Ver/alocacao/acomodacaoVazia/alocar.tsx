import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/Header';
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import { RiHome4Line } from "react-icons/ri";

interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    titular: boolean;
}

function Alocar() {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await Axios.get('http://localhost:3001/clientes-nao-alocados');
                setClientes(response.data);
            } catch (error) {
                toast.error('Erro ao carregar os clientes.');
            }
        };

        fetchClientes();
    }, []);

    const clientesTitulares = clientes.filter(cliente => cliente.titular);

    function handleSubmit(id: string) {
        localStorage.setItem("id_cliente", id);
        window.location.href = '/amodacoes_disponiveis'
    }

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className='text'>
                    <h1 className="titles"> <strong> Alocar cliente </strong> </h1>
                </div>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead  className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Alocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesTitulares.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>
                                        <Button
                                        className="cps"
                                        id="transparente"
                                        onClick={() => handleSubmit(cliente.id.toString())}
                                        >
                                            <RiHome4Line color='black' size={28}/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </main>
        </section>
    );
}

export default Alocar;
