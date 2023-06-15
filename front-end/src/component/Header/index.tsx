import { Link } from 'react-router-dom';
import './style.css';

export default function Header() {
    return (
        <header>
        <div className='logo'>
        <Link to="/">
            <p>Atlantis</p>
        </Link>
        </div>

        <ul className="nav-links">
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="hamburger">&#9776;</label>

            <div className="menu">

                <li className="services">
                    <Link to="#" className="dropdownTitle">Cadastrar</Link>
                    <ul className="dropdown">
                        <li><Link to="/cadastrar_cliente">Cliente</Link></li>
                        <li><Link to="/cadastrar_acomodacao">Acomodação</Link></li>
                        <li><Link to="/vincular">Vinculação</Link></li>
                    </ul>
                </li>
                <li className="services">
                    <Link to="#" className="dropdownTitle">Listagens</Link>
                    <ul className="dropdown">
                        <li><Link to="/titular">Titulares</Link></li>
                        <li><Link to="/dependente">Dependentes</Link></li>
                        <li><Link to="/acomodacoes">Acomodações</Link></li>
                    </ul>
                </li>
            </div>

        </ul>
    </header>
        );
    }