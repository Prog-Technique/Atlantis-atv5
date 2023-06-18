import Header from '../../component/Header'
import { useState, useEffect } from "react";
import Axios from "axios";
import { MdLocationOff } from "react-icons/md";

interface Cliente {
    id: string;
    cpf: string;
    nascimento: string;
    nome: string;
    nome_social: string;
    passaporte: string;
    titular: boolean;
}

export default function Desalocar() {
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
        <><Header />
            <main>
                <h1>Desalocar cliente</h1>

                <div className='container-table'>
                    <table>
                        <thead>
                            <tr>
                                <th className="largura-dobrada">Nome</th>
                                <th>CPF</th>
                                <th>Desalocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesAlocados.filter(cliente => cliente.titular).map(cliente => (
                                <tr key={cliente.id}>
                                    <td data-label="Nome" className="largura-dobrada">{cliente.nome}</td>
                                    <td data-label="CPF">{cliente.cpf}</td>
                                    <td data-label="Desalocar">
                                        <MdLocationOff onClick={() => handleSubmit(cliente.id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}
