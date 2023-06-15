import { Button } from 'react-bootstrap';
import Header from '../../../component/Header';
import React, { useEffect, useState } from "react";
import { GrFormAdd } from "react-icons/gr";

export default function EditarDependentes() {

  const [dependentes, setDependentes] = useState([{}]);

  let addDependente = () => {
    setDependentes([...dependentes, {}])
  }

  useEffect(() => {
    if (localStorage.getItem("cliente") !== null) {
      const cliente = JSON.parse(localStorage.getItem("cliente"));
      setDependentes(cliente.dependentes)
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    var cliente = JSON.parse(localStorage.getItem("cliente"))
    cliente.dependentes = dependentes
    localStorage.setItem("cliente", JSON.stringify(cliente));
    window.location.href = '/cadastrar/clientes'
  }
  
  return (
    <section>
      <header>
        <Header />
      </header>
      <main>
        <div className='text'>
          <h1 className='margin-titulo'><strong>Ver e ou editar dependentes</strong></h1>
        </div>
        <div className="forms">
          <form onSubmit={handleSubmit}>
            {dependentes.map((dependente, index) => (
              <div key={index}>
                <div className="field">
                  <label>Nome Completo:</label>
                  <input
                    placeholder='Insira o nome completo'
                    type="text"
                    value={dependente.nome}
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nome = e.target.value;
                      setDependentes(newDependentes);
                    }}
                    required
                  />
                </div>

                <div className="campo-duplo">
                  <div className="field esquerda">
                    <label>Nome social:</label>
                    <input
                      placeholder='Insira o nome social'
                      type="text"
                      value={dependente.nome_social}
                      onChange={(e) => {
                        const newDependentes = [...dependentes];
                        newDependentes[index].nomeSocial = e.target.value;
                        setDependentes(newDependentes);
                      }}
                      required
                    />
                  </div>
                  <div className="field direita">
                    <label>Nascimento:</label>
                    <input
                      type="date"
                      value={dependente.nascimento}
                      onChange={(e) => {
                        const newDependentes = [...dependentes];
                        newDependentes[index].nascimento = e.target.value;
                        setDependentes(newDependentes);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="campo-duplo">
                  <div className="field esquerda">
                    <label>CPF:</label>
                    <input
                      type="text"
                      placeholder='XXX.XXX.XXX-XX'
                      value={dependente.cpf}
                      onChange={(e) => {
                        const newDependentes = [...dependentes];
                        newDependentes[index].cpf = e.target.value;
                        setDependentes(newDependentes);
                      }}
                      required
                    />
                  </div>
                  <div className="field direita">
                    <label>Passaporte:</label>
                    <input
                      type="text"
                      placeholder='XXX.XXX.XXX-XX'
                      value={dependente.passaporte}
                      onChange={(e) => {
                        const newDependentes = [...dependentes];
                        newDependentes[index].passaporte = e.target.value;
                        setDependentes(newDependentes);
                      }}
                      required
                    />
                  </div>
                </div>
                <br></br>
                <br></br>
              </div>
            ))}
            <div className="btns">
                <Button className="add add-green" variant="outline-dark"  type="button" onClick={() => window.location.href = '/ver/cliente'}>Voltar</Button>
              <Button className="add add-green" variant="outline-dark" type="button" onClick={() => addDependente()}><GrFormAdd color='black' size={23}/> Dependentes</Button>
              <Button className="add add-green" variant="outline-dark" type='submit'>Cadastrar dependentes</Button>{' '}
            </div>
          </form>
        </div>
      </main>
    </section>
  )
}
