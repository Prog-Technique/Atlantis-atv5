import Header from "../Header";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

export default function VerEditarAcomodacao() {
    return (
        <><Header />

            <div className="onTop">
                <Link to="/acomodacoes">
                    <FiArrowLeft size={30} /></Link>
            </div>

            <div className="container">
                <div className="border" style={{marginTop: "20px"}}>
                    <form className="content">

                        <div className="input">
                            <label htmlFor="name">Nome da Acomodação</label>
                            <input id="name" type="text" placeholder="Casal Simples" />
                        </div>

                        <div className="input">
                            <label htmlFor="solteiro">Quantidade de leitos para solteiros</label>
                            <input id="solteiro" type="number" placeholder="0" />
                        </div>

                        <div className="input">
                            <label htmlFor="casal">Quantidade de leitos para casais</label>
                            <input id="casal" type="number" placeholder="1" />
                        </div>

                        <div className="input">
                            <label htmlFor="suite">Quantidade de suítes</label>
                            <input id="suite" type="number" placeholder="1" />
                        </div>

                        <div className="input">
                            <label htmlFor="clima">Climatização</label>
                            <input id="clima" type="text" placeholder="SIM" />
                        </div>

                        <div className="input">
                            <label htmlFor="garagem">Quantidade de garagens disponíveis</label>
                            <input id="garagem" type="number" placeholder="1" />
                        </div>

                        <div className='button-color' id="green">
                            <Link to="/acomodacoes">
                                <button type="submit">ENVIAR</button>
                            </Link>
                        </div>    
                    </form>
                </div>
            </div>
        </>
    )
}