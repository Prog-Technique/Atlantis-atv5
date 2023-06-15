import { useEffect, useState } from "react";
import Header from '../../../component/Header';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

export default function VerEditarDependente() {

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
    window.location.href = '/cadastrar_titular'
  }

  return (
    <> <Header />
      <div className="onTop">
        <Link to="/ver_editar_titular">
          <FiArrowLeft size={25} /></Link>
        <h1>Ver/Editar dependente</h1>
      </div>

      <div className="container">
        <form className="border" onSubmit={handleSubmit}>
          <div className="content">
            {dependentes.map((dependente, index) => (
              
              <div key={index}>
                <div className="input">
                  <label>Nome</label>
                  <input type="text" value={dependente.nome} required
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nome = e.target.value;
                      setDependentes(newDependentes);
                    }} />
                </div>

                <div className="input">
                  <label>Nome social</label>
                  <input type="text" value={dependente.nome_social} required
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nomeSocial = e.target.value;
                      setDependentes(newDependentes);
                    }} />
                </div>
                <div className="input">
                  <label>Data de nascimento</label>
                  <input type="date" value={dependente.nascimento} required
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].nascimento = e.target.value;
                      setDependentes(newDependentes);
                    }} />
                </div>

                <div className="input">
                  <label>CPF</label>
                  <input type="text" value={dependente.cpf} required
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].cpf = e.target.value;
                      setDependentes(newDependentes);
                    }} />
                </div>
                <div className="input">
                  <label>Passaporte</label>
                  <input type="text" value={dependente.passaporte} required
                    onChange={(e) => {
                      const newDependentes = [...dependentes];
                      newDependentes[index].passaporte = e.target.value;
                      setDependentes(newDependentes);
                    }} />
                </div>
              </div>
            ))}
            
              <button type="button" onClick={() => addDependente()}>Adicionar outro</button>
              <button type='submit'>SALVAR</button>
            
          </div>

        </form>
      </div>
    </>
  )
}