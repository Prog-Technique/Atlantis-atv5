import { Button } from 'react-bootstrap';
import NavBar_ from '../../component/Header'
import React, { useState } from "react";
import { toast } from 'react-toastify';
import axios from 'axios';

function CadastrarAcomodacoes() {
    const [nome, setNome] = useState('');
    const [suite, setSuite] = useState('');
    const [solteiro, setSolteiro] = useState('');
    const [casal, setCasal] = useState('');
    const [Climatização,setClimatizacao] = useState('');
    const [garagem,setGaragem] = useState('');
  
    let clearAreas = () => {
      setNome('')
      setSuite('')
      setSolteiro('')
      setCasal('')
      setGaragem('')
      setClimatizacao('')
    }

    function handleSubmit() {
      const data = {
        nome: nome,
        cama_solteiro: solteiro,
        cama_casal: casal,
        suite: suite,
        climatizacao: Climatização,
        garagem: garagem
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
    <section>
      <header>
        <NavBar_ />
      </header>
      <main>
        <div className='text'>
          <h1 className='margin-titulo'><strong>Cadastro de Acomodações</strong></h1>
        </div>
        <div className="forms">
          <form>
            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Nome:</label>
                <input placeholder='Insira o nome da acomodação' type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
              </div>
              <div className="field direita">
                <label>Suite:</label>
                <input placeholder='Número da suite' type="text" value={suite} onChange={(e) => setSuite(e.target.value)} />
              </div>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                <label>Camas de solteiro:</label>
                <input placeholder='Quantia de camas de solteiro' type="number" onChange={(e) => setSolteiro(e.target.value)} />
              </div>
              <div className="field direita">
                <label>Camas de casal:</label>
                <input placeholder='Quantia de camas de casal' type="number" onChange={(e) => setCasal(e.target.value)} />
              </div>
            </div>

            <div className="campo-duplo">
              <div className="field esquerda">
                  <label>Climatização:</label>
                  <input placeholder='true/false' type="boolean" onChange={(e) => setClimatizacao(e.target.value)} />
              </div>
              <div className="field direita">
                  <label>Garagem:</label>
                  <input placeholder='Número de vagas' type="number" onChange={(e) => setGaragem(e.target.value)} />
              </div>
            </div>

            <div className="btns">
              <Button className="add add-green" variant="outline-dark" type='submit' onClick={() => handleSubmit()}>Cadastrar</Button>{' '}
            </div>
          </form>
        </div>
      </main>
    </section>
  );
}

export default CadastrarAcomodacoes;
