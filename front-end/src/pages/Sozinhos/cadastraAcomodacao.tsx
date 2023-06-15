import Header from "../../component/Header";
import { Link } from 'react-router-dom';
import '../style.css';

export default function Acomodacao() {
    return (
        <><Header />
        
            <div className="container">
                <div className="border">
                <form className="content">

                    <div className="input">
                        <label htmlFor="name">Nome da Acomodação</label>
                        <input id="name" type="text" />
                    </div>

                    <div className="input">
                        <label htmlFor="solteiro">Quantidade de leitos para solteiros</label>
                        <input id="solteiro" type="number" />
                    </div>

                    <div className="input">
                        <label htmlFor="casal">Quantidade de leitos para casais</label>
                        <input id="casal" type="number" />
                    </div>

                    <div className="input">
                        <label htmlFor="suite">Quantidade de suítes</label>
                        <input id="suite" type="number" />
                    </div>

                    <div className="input">
                        <label htmlFor="clima">Climatização</label>
                        <input id="clima" type="text" />
                    </div>

                    <div className="input">
                        <label htmlFor="garagem">Quantidade de garagens disponíveis</label>
                        <input id="garagem" type="number" />
                    </div>

                    <Link to="/">
                        <button type="submit">ENVIAR</button>
                    </Link>
                </form>
                </div>
            </div>
        </>
    )
}