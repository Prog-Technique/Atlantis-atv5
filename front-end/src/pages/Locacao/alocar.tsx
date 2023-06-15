import Header from '../../component/Header';
import { useEffect, useState } from "react";
import Axios from "axios";
import { toast } from 'react-toastify';
import { MdLocationOn } from "react-icons/md";

interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    titular: boolean;
}

export default function Alocar() {
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
        window.location.href = '/acomodacoes_disponiveis'
    }

    return (
        <><Header />
            <main>
                <h1>Alocar cliente</h1>

                <div className='container-table'>
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>Alocar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientesTitulares.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td data-label="Nome">{cliente.nome}</td>
                                    <td data-label="CPF">{cliente.cpf}</td>
                                    <td data-label="Alocar">
                                        <MdLocationOn onClick={() => handleSubmit(cliente.id.toString())} />
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
