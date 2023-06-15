import React, { useEffect, useState } from "react";
import Header from "../../../component/Header";
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default function AddDependentes() {

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
    <> <Header />
      <div className="onTop">
        <Link to="/cadastrar/clientes">
          <FiArrowLeft size={25} /></Link>
        <h1>Cadastro de cliente</h1>
        <h2>Dados do dependente</h2>
      </div>

      <div className="container">
        <form className="border" onSubmit={handleSubmit}>
          <div className="content">

            {dependentes.map((dependente, index) => (
              <div key={index}>
                <div className="input">
                  <label>Nome</label>
                  <input type="text" value={dependente.nome}
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nome = e.target.value;
                      setDependentes(newDependentes);
                    }} required />
                </div>

                <div className="input">
                  <label>Nome social</label>
                  <input type="text"
                    value={dependente.nomeSocial}
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nomeSocial = e.target.value;
                      setDependentes(newDependentes);
                    }} required />
                </div>
                <div className="input">
                  <label>Data de nascimento</label>
                  <input type="date"
                    value={dependente.nascimento}
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nascimento = e.target.value;
                      setDependentes(newDependentes);
                    }} required />
                </div>

                <div className="input">
                  <label>CPF</label>
                  <input type="text"
                    value={dependente.cpf}
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].cpf = e.target.value;
                      setDependentes(newDependentes);
                    }} required />
                </div>
                <div className="input">
                  <label>Passaporte</label>
                  <input type="text" value={dependente.passaporte}
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].passaporte = e.target.value;
                      setDependentes(newDependentes);
                    }} required />
                </div>

              </div>
            ))}

            <button type="button" onClick={() => addDependente()}>Cadastrar outro</button>
            <button type="submit">ENVIAR</button>
            
          </div>
        </form>
      </div>
    </>
  )
}