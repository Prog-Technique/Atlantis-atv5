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
                    <Link to="#" className="dropdownTitle">Cliente</Link>
                    <ul className="dropdown">
                        <li><Link to="/cadastrar_titular">Cadastrar</Link></li>
                        <li><Link to="/clientes">Listagem</Link></li>
                    </ul>
                </li>
                <li className="services">
                    <Link to="#" className="dropdownTitle">Acomodação</Link>
                    <ul className="dropdown">
                        <li><Link to="/cadastrar_acomodacao">Cadastrar</Link></li>
                        <li><Link to="/acomodacoes">Listagem</Link></li>
                    </ul>
                </li>
                <li className="services">
                    <Link to="#" className="dropdownTitle">Locação</Link>
                    <ul className="dropdown">
                        <li><Link to="/alocar">Alocar cliente</Link></li>
                        <li><Link to="/desalocar">Desalocar cliente</Link></li>
                    </ul>
                </li>
            </div>

        </ul>
    </header>
        );
    }