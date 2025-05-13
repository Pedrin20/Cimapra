import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado"); // ou use context, se estiver usando
    navigate("/login");
  };

  return (
    <div className="home-container">
      <nav className="navbar">
        <h1>Bem-vindo(a)!</h1>
        <button onClick={handleLogout}>Sair</button>
      </nav>
      <main className="conteudo">
        <h2>Dashboard do Funcionário</h2>
        <p>Aqui você pode ver informações ou acessar funcionalidades específicas.</p>
      </main>
    </div>
  );
}

export default Home;
