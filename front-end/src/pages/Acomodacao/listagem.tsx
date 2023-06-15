import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../component/Header';
import { FiTrash2 } from "react-icons/fi";

export default function Acomodacoes() {
  const [acomodacoes, setAcomodacoes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/acomodacoes')
      .then((response) => setAcomodacoes(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id: string) => {
    axios.delete('http://localhost:3001/deletar/acomodacao', { data: { id } })
      .then((response) => {
        axios.get('http://localhost:3001/acomodacoes')
          .then((response) => setAcomodacoes(response.data))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  return (
    <><Header />
      <main>
        <h1>Acomodações</h1>

        <div className='container-table'>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Cama de solteiro</th>
                <th>Cama de casal</th>
                <th>Suíte</th>
                <th>Climatização</th>
                <th>Garagem</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              {acomodacoes.map((acomodacao: any) => (
                <tr key={acomodacao.id}>
                  <td data-label="Nome">{acomodacao.nome}</td>
                  <td data-label="Cama de solteiro">{acomodacao.cama_solteiro}</td>
                  <td data-label="Cama de casal">{acomodacao.cama_casal}</td>
                  <td data-label="Suíte">{acomodacao.suite}</td>
                  <td data-label="Climatização">{acomodacao.climatizacao ? 'Sim' : 'Não'}</td>
                  <td data-label="Garagem">{acomodacao.garagem}</td>
                  <td data-label="Excluir">
                    <FiTrash2 onClick={() => handleDelete(acomodacao.id)} />
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
