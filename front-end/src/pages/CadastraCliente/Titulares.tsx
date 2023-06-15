import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Axios from "axios";
import Header from "../../component/Header";
import { toast } from 'react-toastify';
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";

export default function Titulares() {

    const [nome, setNome] = useState('');
    const [nome_social, setNomeSocial] = useState('');
    const [data_nasc, setData_nasc] = useState('');
    const [data_cadastro, setData_cadastro] = useState('');

    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [pais, setPais] = useState('');

    const [dependentes, setDependentes] = useState([{}]);
    const [docs, setDocs] = useState([{ tipo: "", numero: "", emissao: "" }]);

    const [telefones, setTelefones] = useState([{ numero: "" }]);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("cliente") !== null) {
            const cliente = JSON.parse(localStorage.getItem("cliente") || "");
            setNome(cliente.nome);
            setNomeSocial(cliente.nomeSocial);
            setData_nasc(cliente.nascimento);
            setData_cadastro(cliente.cadastro);

            setDocs(cliente.docs);
            setTelefones(cliente.telefones);

            setCep(cliente.cep);
            setRua(cliente.rua);
            setBairro(cliente.bairro);
            setNumero(cliente.numero);
            setCidade(cliente.cidade);
            setEstado(cliente.estado);
            setPais(cliente.pais);

            setDependentes(cliente.dependentes)
            var endereco = cliente.endereco
            setCep(endereco.cep)
            setNumero(endereco.numero)
            setRua(endereco.locadouro)
            setCidade(endereco.cidade)
            setEstado(endereco.estado)
            setPais(endereco.pais)
            setBairro(endereco.bairro)
        }
    }, []);


    let addFormDoc = () => { setDocs([...docs, { tipo: "", numero: "", emissao: "" }]) };


    let addFormTelefone = () => { setTelefones([...telefones, { numero: "" }]) };


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const clienteData = {
            nome: nome, nomeSocial: nome_social,
            nascimento: data_nasc, cadastro: data_cadastro,
            docs: docs.map((doc) => ({ tipo: doc.tipo, numero: doc.numero, emissao: doc.emissao })),
            telefones: telefones.map((telefone) => ({ numero: telefone.numero })),
            dependentes: dependentes,
            endereco: {
                cep: cep, numero: numero,
                locadouro: rua, cidade: cidade,
                estado: estado, pais: pais,
                bairro: bairro
            }
        };

        console.log(clienteData);


        Axios.post("http://localhost:3001/adicionar/cliente", clienteData)
            .then((res) => {
                console.log(res);
                localStorage.removeItem("cliente")
            })
            .catch((error) => {
                console.log(error);
            });

        
            window.location.reload()
            toast.success("Cliente adicionado!")
    }

    function addDependentes() {
        const clienteData = {
            nome: nome, nomeSocial: nome_social,
            nascimento: data_nasc, cadastro: data_cadastro,
            docs: docs.map((doc) => ({ tipo: doc.tipo, numero: doc.numero, emissao: doc.emissao })),
            telefones: telefones.map((telefone) => ({ numero: telefone.numero })),
            dependentes: dependentes,
            endereco: {
                cep: cep, numero: numero,
                locadouro: rua, cidade: cidade,
                estado: estado, pais: pais,
                bairro: bairro
            }
        };

        localStorage.setItem("cliente", JSON.stringify(clienteData))

        navigate('/cadastrar_cliente/dependentes')
    }

    // ---------------------------------------------

    interface Address {
        cep: string; rua: string; bairro: string;
        cidade: string; estado: string; pais: string;
    }

    const [address, setAddress] = useState<Address>({
        cep: '', rua: '', bairro: '',
        cidade: '', estado: '', pais: ''
    });

    const handleChangeCep = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleCep = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const cep = e.target.value.replace(/\D/g, '');

        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                const { logradouro, bairro, localidade, uf, pais } = data;

                setAddress({
                    ...address, cep, rua: logradouro,
                    bairro, cidade: localidade, estado: uf,
                    pais: pais || 'Brasil'
                });
            } catch (error) {
                console.error('Erro ao buscar CEP:', error);
            }
        } else {
            setAddress({ ...address, cep: e.target.value });
        }
    };

    //   ------------------------------------------


    return (
        <> <Header />
            <div className="onTop">
                <Link to="/">
                    <FiArrowLeft size={25} /></Link>
                <h1>Cadastro de cliente</h1>
                <h2>Dados do titular</h2>
            </div>

            <div className="container">
                <form className="border" onSubmit={handleSubmit}>
                    <div className="content">

                        <div className="input">
                            <label htmlFor="name">Nome</label>
                            <input id="name" type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>

                        <div className="input">
                            <label htmlFor="social_name">Nome social</label>
                            <input id="social_name" type="text" value={nome_social} onChange={(e) => setNomeSocial(e.target.value)} required />
                        </div>

                        <div className="input">
                            <label htmlFor="dataNasc">Data de nascimento</label>
                            <input id="dataNasc" type="date" value={data_nasc} onChange={(e) => setData_nasc(e.target.value)} required />
                        </div>

                        <div className="input">
                            <label htmlFor="dataCad">Data de cadastro (hoje)</label>
                            <input id="dataCad" type="date" value={data_cadastro} onChange={(e) => setData_cadastro(e.target.value)} required />
                        </div>

                    </div>

                    {docs.map((doc, index) => (
                        <div className="content" key={index}>

                            <div className="input">
                                <label htmlFor="tipo">Tipo de documento</label>
                                <input id="tipo" type="text" value={doc.tipo} required
                                    onChange={(e) => {
                                        const newDocs = [...docs];
                                        newDocs[index].tipo = e.target.value;
                                        setDocs(newDocs);
                                    }} />
                            </div>

                            <div className="input">
                                <label htmlFor="numero">Número do documento</label>
                                <input id="numero" type="text" value={doc.numero} required
                                    onChange={(e) => {
                                        const newDocs = [...docs];
                                        newDocs[index].numero = e.target.value;
                                        setDocs(newDocs);
                                    }} />
                            </div>

                            <div className="input">
                                <label htmlFor="dataemissao">Data de emissão</label>
                                <input id="dataemissao" type="date"
                                    value={doc.emissao}
                                    onChange={(e) => {
                                        const newDocs = [...docs];
                                        newDocs[index].emissao = e.target.value;
                                        setDocs(newDocs);
                                    }}
                                    required
                                />
                            </div>
                            <FiPlusCircle size={25} className="plusCircle"
                                onClick={() => addFormDoc()} />
                        </div>
                    ))}

                    <div className="content">

                        <div className="input">
                            <label htmlFor="cep">CEP</label>
                            <input id="cep" type="text" value={address.cep} onChange={handleCep} />
                        </div>

                        <div className="input">
                            <label htmlFor="rua">Rua</label>
                            <input id="rua" type="text" value={address.rua} onChange={handleCep} />
                        </div>

                        <div className="input">
                            <label htmlFor="bairro">Bairro</label>
                            <input id="bairro" type="txt" value={address.bairro} onChange={handleCep} />
                        </div>

                        <div className="input">
                            <label htmlFor="numero">Número</label>
                            <input id="numero" type="txt" />
                        </div>
                    </div>

                    <div className="content">
                        <div className="input">
                            <label htmlFor="cidade">Cidade</label>
                            <input id="cidade" type="txt" value={address.cidade} onChange={handleCep} />
                        </div>

                        <div className="input">
                            <label htmlFor="estado">Estado</label>
                            <input id="estado" type="txt" value={address.estado} onChange={handleCep} />
                        </div>

                        <div className="input">
                            <label htmlFor="pais">Pais</label>
                            <input id="pais" type="txt" value={address.pais} onChange={handleCep} />
                        </div>

                        <div className="input">
                            <label htmlFor="complemento">Complemento</label>
                            <input id="complemento" type="txt" />
                        </div>
                    </div>

                    <div className="content">

                        {telefones.map((telefone, index) => (
                            <div className="content" key={index}>
                                <div className="input">
                                    <label htmlFor="telefone">Telefone</label>
                                    <input id="telefone" type="text" required
                                        value={telefone.numero} onChange={(e) => {
                                            const newTelefones = [...telefones];
                                            newTelefones[index].numero = e.target.value;
                                            setTelefones(newTelefones);
                                        }} />
                                </div>

                                <FiPlusCircle size={25} className="plusCircle" onClick={() => addFormTelefone()} />
                            </div>

                        ))}

                        <button type="submit" onClick={handleSubmit}>ENVIAR</button>

                    </div>
                </form>
            </div>
        </>
    )
}