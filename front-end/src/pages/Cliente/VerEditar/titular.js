import { useState, useEffect } from "react";
import Axios from "axios";
import Header from '../../../component/Header'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";

export default function VerEditarTitular() {
  const [nome, setNome] = useState('');
  const [nome_social, setNomeSocial] = useState('');
  const [data_nasc, setData_nasc] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [bairro, setBairro] = useState('');
  const [numero, setNumero] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [pais, setPais] = useState('');
  const [cpf, setCpf] = useState('');
  const [passaporte, setPassaporte] = useState('');

  const [dependentes, setDependentes] = useState([{}]);
  const [rgs, setRgs] = useState([{}]);
  const [telefones, setTelefones] = useState([{}]);

  const idCliente = localStorage.getItem("id_cliente");

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await Axios.put('http://localhost:3001/cliente', {
          id: idCliente
        });
        const clienteData = response.data;
        console.log(clienteData);
        setNome(clienteData.nome);
        setNomeSocial(clienteData.nome_social);
        setData_nasc(clienteData.nascimento);
        setCpf(clienteData.cpf);
        setPassaporte(clienteData.passaporte);
        setRgs(clienteData.rgs);
        setTelefones(clienteData.telefones);
        setRua(clienteData.endereco.locadouro);
        setCidade(clienteData.endereco.cidade);
        setEstado(clienteData.endereco.estado);
        setPais(clienteData.endereco.pais);
        setBairro(clienteData.endereco.bairro);
        setNumero(clienteData.endereco.numero);
        setCep(clienteData.endereco.cep);
        setDependentes(clienteData.dependentes)
      } catch (error) {
        console.log(error);
      }
    };

    fetchCliente();
  }, []);

  let addFormRg = () => {
    setRgs([...rgs, {}])
  }

  let addFormTelefone = () => {
    setTelefones([...telefones, {}])
  }

  function handleSubmit(e) {
    e.preventDefault();

    const clienteData = {
      id: idCliente,
      nome: nome,
      nomeSocial: nome_social,
      nascimento: data_nasc,
      cpf: cpf,
      passaporte: passaporte,
      rgs: rgs.map((rg) => ({ id: rg.id, numero: rg.numero, emissao: rg.emissao })),
      telefones: telefones.map((telefone) => ({ id: telefone.id, ddd: telefone.ddd, numero: telefone.numero })),
      dependentes: dependentes,
      endereco: {
        cep: cep,
        numero: numero,
        locadouro: rua,
        cidade: cidade,
        estado: estado,
        pais: pais,
        bairro: bairro
      }
    };


    Axios.put("http://localhost:3001/atualizar/cliente", clienteData)
      .then((res) => {
        console.log(res);
        localStorage.removeItem("cliente")
        window.location.reload()
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function addDependentes() {
    const clienteData = {
      nome: nome,
      nomeSocial: nome_social,
      nascimento: data_nasc,
      cpf: cpf,
      passaporte: passaporte,
      rgs: rgs.map((rg) => ({ numero: rg.numero, emissao: rg.emissao })),
      telefones: telefones.map((telefone) => ({ ddd: telefone.ddd, numero: telefone.numero })),
      dependentes: dependentes,
      endereco: {
        cep: cep,
        numero: numero,
        locadouro: rua,
        cidade: cidade,
        estado: estado,
        pais: pais,
        bairro: bairro
      }
    };

    localStorage.setItem("cliente", JSON.stringify(clienteData))

    window.location.href = '/ver_editar_dependente'
  }


  const buscarEndereco = async () => {
    try {
      const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { logradouro, bairro, localidade, uf, pais: enderecoPais, cep: enderecoCep } = response.data;

      setRua(logradouro || '');
      setBairro(bairro || '');
      setCidade(localidade || '');
      setEstado(uf || '');
      setPais(enderecoPais || '');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao buscar o endereço. Verifique o CEP informado.');
    }
  };


  return (
    <> <Header />
      <div className="onTop">
        <Link to="/clientes">
          <FiArrowLeft size={25} /></Link>
        <h1>Ver/Editar titular</h1>
      </div>

      <div className="container">
        <form className="border" onSubmit={handleSubmit}>
          <div className="content">

            <div className="input">
              <label>Nome</label>
              <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
            </div>

            <div className="input">
              <label>Nome social</label>
              <input type="text" value={nome_social} onChange={(e) => setNomeSocial(e.target.value)} required />
            </div>
            <div className="input">
              <label>Nascimento</label>
              <input type="date" value={data_nasc} onChange={(e) => setData_nasc(e.target.value)} required />
            </div>

            {telefones.map((telefone, index) => (
              <div className="input" key={index}>
                <label>Telefone</label>
                <input type="text" value={telefone.numero} required
                  onChange={(e) => {
                    const newTelefones = [...telefones];
                    newTelefones[index].numero = e.target.value;
                    setTelefones(newTelefones);
                  }} />
              </div>
            ))}

            <FiPlusCircle size={25} className="plusCircle"
              onClick={() => addFormTelefone()} />
            </div>

            <div className="content">
            <div className="input">
              <label>CPF</label>
              <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} required />
            </div>
            <div className="input">
              <label>Passaporte</label>
              <input type="text" value={passaporte} onChange={(e) => setPassaporte(e.target.value)} required />
            </div>

            {rgs.map((rg, index) => (
              <div key={index}>
                <div className="input">
                  <label>RG</label>
                  <input type="text" value={rg.numero} required
                    onChange={(e) => {
                      const newRgs = [...rgs];
                      newRgs[index].numero = e.target.value;
                      setRgs(newRgs);
                    }} />
                </div>

                <div className="input">
                  <label>Data de emissão</label>
                  <input type="date" value={rg.emissao} required
                    onChange={(e) => {
                      const newRgs = [...rgs];
                      newRgs[index].emissao = e.target.value;
                      setRgs(newRgs);
                    }} />
                </div>
              </div>
            ))}

            <FiPlusCircle size={25} className="plusCircle"
              onClick={() => addFormRg()} />
            
            </div>

            <div className="content">
            <div className="input ">
              <label>CEP</label>
              <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} onBlur={buscarEndereco} required />
            </div>

            <div className="input">
              <label>Número</label>
              <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} required />
            </div>

            <div className="input">
              <label>Logradouro</label>
              <input type="text" value={rua} onChange={(e) => setRua(e.target.value)} required />
            </div>

            <div className="input">
              <label>Bairro</label>
              <input type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
            </div>
            </div>

            <div className="content">
            <div className="input">
              <label>Cidade</label>
              <input type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
            </div>

            <div className="input">
              <label>Estado</label>
              <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} required />
            </div>
            <div className="input">
              <label>País</label>
              <input type="text" value={pais} onChange={(e) => setPais(e.target.value)} required />
            </div>

            <button type='button' onClick={() => addDependentes()}>Ver/Editar dependente(s)</button>
            <button type='submit'>SALVAR</button>
            </div>

        </form>
      </div>
    </>
  )
}