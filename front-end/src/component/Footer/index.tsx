import { Link } from 'react-router-dom';
import './style.css';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='blue'>
                    <div>
                    <p>Horário de Funcionamento</p>
                    <p>Terça a Domingo</p>
                    <p>Das 9:00 às 17:00 horas</p>
                    <p></p>
                </div>
                <div>
                    <p>Contato</p>
                    <p>(12) 99191-2112</p>
                </div>
            </div>

            <div className='white'>
                <p>Site desenvolvido por</p>
                <p>Ocean Solutions</p>
            </div>
        </div>
        );
    }