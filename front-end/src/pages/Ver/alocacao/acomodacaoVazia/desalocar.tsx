import { Button, Table } from 'react-bootstrap';
import NavBar_ from '../../../../component/Header'
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { LuClipboardX } from "react-icons/lu";

interface Cliente {
    id: string;
    cpf: string;
    nascimento: string;
    nome: string;
    nome_social: string;
    passaporte: string;
    titular: boolean;
}

function Desalocar() {
    const [clientesAlocados, setClientesAlocados] = useState<Cliente[]>([]);
    const [atualizarClientesAlocados, setAtualizarClientesAlocados] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/clientes-alocados")
            .then(response => {
                setClientesAlocados(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, [atualizarClientesAlocados]); // Adicione atualizarClientesAlocados como dependência

    function handleSubmit(clienteId: string) {
        Axios.post("http://localhost:3001/desalocar", {
            clienteId: clienteId
        })
            .then(response => {
                // Lógica a ser executada após a resposta da rota

                // Define o estado atualizarClientesAlocados como true
                setAtualizarClientesAlocados(true);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <section>
            <header>
                <NavBar_ />
            </header>
            <main>
                <div className='text'>
                    <h1 className="titles"> <strong> Desalocar cliente </strong> </h1>
                </div>
                <div className="tables">
                    <Table striped bordered hover variant="light">
                        <thead className="titles-table">
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Desalocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesAlocados.filter(cliente => cliente.titular).map(cliente => (
                                <tr key={cliente.id}>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>
                                        <Button
                                            className="cps"
                                            id="transparente"
                                            onClick={() => handleSubmit(cliente.id)}
                                        >
                                            <LuClipboardX color='black' size={28} />
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

export default Desalocar;
