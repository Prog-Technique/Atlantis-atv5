import { Link } from "react-router-dom";
import Header from "../../component/Header";
import { FiEdit, FiTrash2 } from "react-icons/fi";

export default function Acomodacoes() {
    return (
        <><Header />
            <main>
                <h1>Acomodações</h1>

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
                                <td data-label="Nome" className="largura-dobrada">Casal Simples</td>
                                <td data-label="Visualizar/Editar">
                                    <Link to="/ver_editar_acomodacao"><FiEdit /></Link>
                                </td>
                                <td data-label="Excluir">
                                    <Link to="/deletar_acomodacao"><FiTrash2 /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Nome" className="largura-dobrada">Familia Simples</td>
                                <td data-label="Visualizar/Editar">
                                    <Link to="#"><FiEdit /></Link>
                                </td>
                                <td data-label="Excluir">
                                    <Link to="#"><FiTrash2 /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Nome" className="largura-dobrada">Familia Mais</td>
                                <td data-label="Visualizar/Editar">
                                    <Link to="#"><FiEdit /></Link>
                                </td>
                                <td data-label="Excluir">
                                    <Link to="#"><FiTrash2 /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Nome" className="largura-dobrada">Familia Super</td>
                                <td data-label="Visualizar/Editar">
                                    <Link to="#"><FiEdit /></Link>
                                </td>
                                <td data-label="Excluir">
                                    <Link to="#"><FiTrash2 /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Nome" className="largura-dobrada">Solteiro Simples</td>
                                <td data-label="Visualizar/Editar">
                                    <Link to="#"><FiEdit /></Link>
                                </td>
                                <td data-label="Excluir">
                                    <Link to="#"><FiTrash2 /></Link>
                                </td>
                            </tr>
                            <tr>
                                <td data-label="Nome" className="largura-dobrada">Solteiro Mais</td>
                                <td data-label="Visualizar/Editar">
                                    <Link to="#"><FiEdit /></Link>
                                </td>
                                <td data-label="Excluir">
                                    <Link to="#"><FiTrash2 /></Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    );
}