import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import NavBar_ from '../../../../component/Header';
import { LuCheck } from "react-icons/lu";

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

function AcomodacaoVazia() {
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

  const handleAclocar = (id: string) => {
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
    <section>
      <header>
        <NavBar_ />
      </header>
      <main>
        <div className='text'>
          <h1 className="titles"> <strong> Acomodação disponível </strong> </h1>
        </div>
        <div className="tables">
          <Table striped bordered hover variant="light">
            <thead className="titles-table">
              <tr>
                <th>Nome</th>
                <th>Cama de solteiro</th>
                <th>Cama casal</th>
                <th>Climatização</th>
                <th>Garagem</th>
                <th>Suite</th>
                <th>Acomodar</th>
              </tr>
            </thead>
            <tbody>
              {acomodacoes.map((acomodacao: any) => (
                <tr key={acomodacao.id}>
                  <td>{acomodacao.nome}</td>
                  <td>{acomodacao.cama_solteiro}</td>
                  <td>{acomodacao.cama_casal}</td>
                  <td>{acomodacao.climatizacao ? 'Sim' : 'Não'}</td>
                  <td>{acomodacao.garagem}</td>
                  <td>{acomodacao.suite}</td>
                  <td>
                    <Button
                      className="cps"
                      id="transparente"
                      onClick={() => handleAclocar(acomodacao.id)}
                    >
                      <LuCheck color='black' size={23}/>
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

export default AcomodacaoVazia;
