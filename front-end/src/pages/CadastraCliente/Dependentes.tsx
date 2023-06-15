import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import Header from "../../component/Header";
import { FiPlusCircle } from "react-icons/fi";

export default function Dependentes() {

    const [formValue, setFormValue] = useState([{ documento: "" }])

    let handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        let newFormValue = [...formValue];
        newFormValue[i] = { ...newFormValue[i], [e.target.name]: e.target.value };
        setFormValue(newFormValue);
    };

    let addFormField = () => {
        setFormValue([...formValue, { documento: "" }])
    }

    let removeFormField = (i: number) => {
        let newFormValue = [...formValue];
        newFormValue.splice(i, 1);
        setFormValue(newFormValue)
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

    const [formValue2, setFormValue2] = useState([{ telefone: "" }])

    let handleChange2 = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
        let newFormValue2 = [...formValue2];
        newFormValue2[i] = { ...newFormValue2[i], [e.target.name]: e.target.value };
        setFormValue2(newFormValue2);
    };

    let addFormField2 = () => {
        setFormValue2([...formValue2, { telefone: "" }])
    }

    let removeFormField2 = (i: number) => {
        let newFormValue2 = [...formValue2];
        newFormValue2.splice(i, 1);
        setFormValue2(newFormValue2)
    }

    return (
        <> <Header />
            <div className="onTop">
                <Link to="/cadastrar_cliente/documentos">
                    <FiArrowLeft size={25}/></Link>
                <h1>Cadastro de cliente</h1>
                <h2>Dados de dependentes</h2>
            </div>

            <div className="container">
            <div className="border">
                <form className="content">

                    <div className="input">
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" />
                    </div>

                    <div className="input">
                        <label htmlFor="social_name">Nome social</label>
                        <input id="social_name" type="text" />
                    </div>

                    <div className="input">
                        <label htmlFor="dataNasc">Data de nascimento</label>
                        <input id="dataNasc" type="date" />
                    </div>

                    <div className="input">
                        <label htmlFor="dataCad">Data de cadastro (hoje)</label>
                        <input id="dataCad" type="date" />
                    </div>

                </form>

                {formValue.map((e, index) => (
                    <>

                        <form className="content">

                            <div className="input">
                                <label htmlFor="tipo">Tipo de documento</label>
                                <select>
                                    <option>Selecione</option>
                                    <option>CPF</option>
                                    <option>RG</option>
                                    <option>Passaporte</option>
                                </select>
                            </div>

                            <div className="input">
                                <label htmlFor="numero">Número do documento</label>
                                <input id="numero" type="text" />
                            </div>

                            <div className="input">
                                <label htmlFor="dataexp">Data de expedição</label>
                                <input id="dataexp" type="date" />
                            </div>

                            {index ?
                                <button type="button" style={{ backgroundColor: "red" }} onClick={() => removeFormField(index)}>Deletar</button>
                                : null}

                            <FiPlusCircle size={25} className="plusCircle" onClick={() => addFormField()}/>

                        </form>

                    </>
                ))}

                <form className="content">

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
                </form>

                <form className="content">
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
                </form>

                <form className="content">
                    {formValue2.map((e, index) => (
                        <>

                            <div className="input">
                                <label htmlFor="telefone">Telefone</label>
                                <input id="telefone" type="tel" value={e.telefone} onChange={e => handleChange2(index, e)} />
                                {index ?
                                    <button type="button" style={{ backgroundColor: "red" }} onClick={() => removeFormField2(index)}>Deletar</button>
                                    : null}
                            </div>

                        </>
                    ))}

                    <FiPlusCircle size={25} className="plusCircle" onClick={() => addFormField2()}/>


                    <Link to="/">
                        <button type="submit">ENVIAR</button>
                    </Link>
                </form>
                </div>
            </div>
        </>
    )
}