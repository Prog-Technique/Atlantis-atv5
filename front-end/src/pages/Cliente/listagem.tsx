import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../component/Header';
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface Cliente {
  id: string;
  nome: string;
  titular: boolean;
}

export default function Clientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/clientes')
      .then(response => {
        setClientes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  function removerCliente(id: string) {
    axios
      .delete(`http://localhost:3001/deletar/cliente`, { data: { id } })
      .then(() => {
            axios
        .get('http://localhost:3001/clientes')
        .then(response => {
            setClientes(response.data);
        })
        .catch(error => {
            console.log(error);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  function verCliente(id: string) {
    localStorage.setItem("id_cliente", id);
    window.location.href = '/ver_editar_titular'
  }

  return (
    <><Header /><main>
            <h1>Clientes</h1>

            <div className='container-table'>
          {clientes.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th scope="col" className="largura-dobrada">Nome</th>
                  <th scope="col">Ver/Editar</th>
                  <th scope="col">Excluir</th>
                </tr>
              </thead>

              <tbody>
              {clientes
                  .filter(cliente => cliente.titular)
                  .map(cliente => (
                    <tr key={cliente.id}>
                      <td data-label="Nome" className="largura-dobrada">{cliente.nome}</td>
                      <td data-label="Visualizar/Editar">
                          <FiEdit onClick={() => verCliente(cliente.id)} />
                      </td>
                      <td data-label="Excluir">
                          <FiTrash2 onClick={() => removerCliente(cliente.id)}/>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <h3>Não há clientes cadastrados no momento!</h3>
          )}
        </div>
      </main>
      </>
  );
}