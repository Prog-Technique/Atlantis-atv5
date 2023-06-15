import './ModalDelCliente.css';
import { Link } from "react-router-dom";
import Header from "../Header";
import { FiArrowLeft } from 'react-icons/fi';

export default function ModalDelTitular(){
    return(
        <><Header />
            <h1>Titulares</h1>
        <div className="modal">
            <div className="container">
                <div className="close">
                    <Link to="/titular">
                        <FiArrowLeft color="#000" size={25}/>
                    </Link>
                </div>

                <div className='conteudoModal'>
                    <p>Deseja deletar <b>Amanda Caires Pereira?</b></p>
                    <p className='aviso'>Esta ação não poderá ser desfeita!</p>

                    <div className='button-color' id='red'>
                        <Link to="/titular">
                            <button type="submit">DELETAR</button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </>
    )
}