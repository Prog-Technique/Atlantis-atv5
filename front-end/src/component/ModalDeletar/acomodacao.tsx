import Header from "../Header";
import { Link } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

export default function ModalDelAcomodacao(){
    return(
        <><Header />
            <h1>Acomodações</h1>
        <div className="modal">
            <div className="container">
                <div className="close">
                    <Link to="/acomodacoes">
                        <FiArrowLeft color="#000" size={25}/>
                    </Link>
                </div>

                <div className='conteudoModal'>
                    <p>Deseja deletar <b>Casal Simples?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color' id="red">
                        <Link to="/acomodacoes">
                            <button type="submit">DELETAR</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </>
    )
}