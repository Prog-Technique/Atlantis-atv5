import { Link } from "react-router-dom";
import Header from "../../component/Header";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import './styles.css'

export default function Dependente() {
    return (
        <><Header /><main>
            <h1>Dependentes</h1>

            <div className='container-table'>
                <table>
                    <thead>
                        <tr>
                            <th scope="col" className="largura-dobrada">Nome</th>
                            <th scope="col">Visualizar/Editar</th>
                            <th scope="col">Excluir</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td data-label="Nome" className="largura-dobrada">Caio Gomes Lima</td>
                            <td data-label="Visualizar/Editar">
                                <Link to="#"><FiEdit/></Link>
                            </td>
                            <td data-label="Excluir">
                                <Link to="#"><FiTrash2/></Link>
                            </td>
                        </tr>

                        <tr>
                            <td data-label="Nome" className="largura-dobrada">Gabriel Moreira Galvão</td>
                            <td data-label="Visualizar/Editar">
                                <Link to="#"><FiEdit/></Link>
                            </td>
                            <td data-label="Excluir">
                                <Link to="#"><FiTrash2/></Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </main></>
    );
}
