import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../component/Header';
import { GrMapLocation } from "react-icons/gr";

interface Acomodacao {
    id: string;
    cama_casal: number;
    cama_solteiro: number;
    climatizacao: boolean;
    disponivel: boolean;
    garagem: number;
    nome: string;
    suite: number;
  }

  export default function AcomodacaoVazia() {
    const [acomodacoes, setAcomodacoes] = useState<Acomodacao[]>([]);

  useEffect(() => {
    axios.get<Acomodacao[]>('http://localhost:3001/acomodacoes')
      .then((response) => {
        const acomodacoesDisponiveis = response.data.filter((acomodacao) => acomodacao.disponivel);
        setAcomodacoes(acomodacoesDisponiveis);
      })
      .catch((error) => console.log(error));
  }, []);

  const id_cliente = localStorage.getItem("id_cliente");

  const handleAlocar = (id: string) => {
    const data = {
      clienteId: id_cliente,
      acomodacaoId: id
    };

    axios.post('http://localhost:3001/alocar', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      window.location.href = '/alocar'
  };

  return (
    <><Header />
      <main>
        <h1>Acomodações disponível</h1>

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
                <th>Alocar</th>
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
                  <td data-label="Alocar">
                    <GrMapLocation onClick={() => handleAlocar(acomodacao.id)} />
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
