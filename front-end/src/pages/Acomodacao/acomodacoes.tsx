import Header from '../../component/Header'
import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

export default function CadastrarAcomodacoes() {
  const [nome, setNome] = useState('');
  const [suite, setSuite] = useState('');
  const [solteiro, setSolteiro] = useState('');
  const [casal, setCasal] = useState('');
  const [climatizacao, setClimatizacao] = useState('');
  const [garagem, setGaragem] = useState('');

  let clearAreas = () => {
    setNome('')
    setSuite('')
    setSolteiro('')
    setCasal('')
    setGaragem('')
    setClimatizacao('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const data = {
      nome: nome,
      cama_solteiro: solteiro,
      cama_casal: casal,
      suite: suite,
      climatizacao: climatizacao,
      garagem: garagem,
      disponivel: true
    };

    axios.post('http://localhost:3001/adicionar/acomodacao', data)
      .then(response => {
        toast.success('Cadastro feito com sucesso!');
        clearAreas();
      })
      .catch(error => {
        toast.error('Erro ao cadastrar acomodação.');
        console.error(error);
      });
  }


  return (
    <> <Header />
    <div className='onTop'>
      <h1>Cadastro de acomodação</h1>
    </div>

      <div className="container">
        <form className="border" onSubmit={handleSubmit}>
          <div className="content">

            <div className="input">
              <label>Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="input">
              <label>Camas de solteiro</label>
              <input type="number" value={solteiro} onChange={(e) => setSolteiro(e.target.value)} />
            </div>

            <div className="input">
              <label>Camas de casal</label>
              <input type="number" value={casal} onChange={(e) => setCasal(e.target.value)} />
            </div>

            <div className="input">
              <label>Suite</label>
              <input type="text" value={suite} onChange={(e) => setSuite(e.target.value)} />
            </div>

            <div className="input">
              <label>climatizacao</label>
              <input placeholder='True | False' type="boolean" value={climatizacao}
              onChange={(e) => setClimatizacao(e.target.value)} />
            </div>
            <div className="input">
              <label>Garagem</label>
              <input type="number" value={garagem} onChange={(e) => setGaragem(e.target.value)} />
            </div>

            <button type='submit'>ENVIAR</button>

          </div>
        </form>
      </div>
    </>
  )
}