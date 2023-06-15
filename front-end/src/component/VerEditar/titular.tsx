import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Header from "../Header";
import { FiArrowLeft, FiPlusCircle } from "react-icons/fi";

export default function EditarCliente() {

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
                <Link to="/titular">
                    <FiArrowLeft size={25}/></Link>
                <h1>Visualizar/Editar</h1>
                <h2>Cliente: Amanda</h2>
            </div>

            <div className="container">
                
            <div className="border">
                <form className="content">

                    <div className="input">
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" placeholder="Amanda" />
                    </div>

                    <div className="input">
                        <label htmlFor="social_name">Nome social</label>
                        <input id="social_name" type="text" placeholder="Dika" />
                    </div>

                    <div className="input">
                        <label htmlFor="dataNasc">Data de nascimento</label>
                        <input id="dataNasc" type="date" value="2003-10-01" />
                    </div>

                    <div className="input">
                        <label htmlFor="dataCad">Data de cadastro (hoje)</label>
                        <input id="dataCad" type="date" value="2023-03-03" />
                    </div>

                </form>

                {formValue.map((e, index) => (
                    <>

                        <form className="content">

                            <div className="input">
                                <label htmlFor="tipo">Tipo de documento</label>
                                <select className="opcoes">
                                    <option>CPF</option>
                                    <option>RG</option>
                                    <option>Passaporte</option>
                                </select>
                            </div>

                            <div className="input">
                                <label htmlFor="numero">Número do documento</label>
                                <input id="numero" type="text" placeholder="461.715.496-55" />
                            </div>

                            <div className="input">
                                <label htmlFor="dataexp">Data de expedição</label>
                                <input id="dataexp" type="date" value="2011-03-07" />
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
                        <input id="cep" type="text" placeholder="12235820" onChange={handleCep} />
                    </div>

                    <div className="input">
                        <label htmlFor="rua">Rua</label>
                        <input id="rua" type="text" placeholder="Rua Treze" onChange={handleCep} />
                    </div>

                    <div className="input">
                        <label htmlFor="bairro">Bairro</label>
                        <input id="bairro" type="txt" placeholder="Parque Industrial" onChange={handleCep} />
                    </div>

                    <div className="input">
                        <label htmlFor="numero">Número</label>
                        <input id="numero" type="txt" placeholder="231" />
                    </div>
                </form>

                <form className="content">
                    <div className="input">
                        <label htmlFor="cidade">Cidade</label>
                        <input id="cidade" type="txt" placeholder="São José dos Campos" onChange={handleCep} />
                    </div>

                    <div className="input">
                        <label htmlFor="estado">Estado</label>
                        <input id="estado" type="txt" placeholder="SP" onChange={handleCep} />
                    </div>

                    <div className="input">
                        <label htmlFor="pais">Pais</label>
                        <input id="pais" type="txt" placeholder="Brasil" onChange={handleCep} />
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
                                <input id="telefone" type="tel" placeholder="(12) 99191-2428" onChange={e => handleChange2(index, e)} />
                                {index ?
                                    <button type="button" style={{ backgroundColor: "red" }} onClick={() => removeFormField2(index)}>Deletar</button>
                                    : null}
                            </div>

                        </>
                    ))}

                    <FiPlusCircle size={25} className="plusCircle" onClick={() => addFormField2()}/>

                    <div className='button-color' id="green">
                        <Link to="/titular">
                            <button type="submit">ENVIAR</button>
                        </Link>
                    </div>

                </form>
            </div>
            </div>
        </>
    )
}