import { Link } from "react-router-dom";
import Header from "../../component/Header";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import ModalDelTitular from '../../component/ModalDeletar/titular';
import './styles.css'

export default function Titular() {
    return (
        <><Header /><main>
            <h1>Titulares</h1>

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
                            <td data-label="Nome" className="largura-dobrada">Amanda Caires Pereira</td>
                            <td data-label="Visualizar/Editar">
                                <Link to="/editar_cliente/1"><FiEdit/></Link>
                            </td>
                            <td data-label="Excluir">
                                <Link to="/deletar_cliente/1"><FiTrash2/></Link>
                            </td>
                        </tr>

                        <tr>
                            <td data-label="Nome" className="largura-dobrada">Gabriel Noronha Silva</td>
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
