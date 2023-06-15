import Footer from "../../component/Footer";
import Header from "../../component/Header";
import '../style.css';

export default function Home() {
    return (
            <><Header />
                <div className="home">
                    <h1>Bem-vindos!</h1>
                    <span></span>
                    <h1>Relaxe e refresque-se</h1>
                </div>
                <Footer />
            </>
        );
    }
