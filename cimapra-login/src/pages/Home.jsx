import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <div className="logo">Cimapra</div>

          <div 
            className={`header-card ${activeDropdown === 'geradora' ? 'active' : ''}`}
            onClick={() => toggleDropdown('geradora')}
          >
            <span>Geradora</span>
            <div className="dropdown-content">
              <a href="#cadastro-geradora">Cadastro</a>
              <a href="#relatorio-geradora">Relatórios</a>
              <a href="#config-geradora">Consultas</a>
            </div>
          </div>

          <div 
            className={`header-card ${activeDropdown === 'cliente' ? 'active' : ''}`}
            onClick={() => toggleDropdown('cliente')}
          > 
            <span>Cliente</span>
            <div className="dropdown-content">
              <a href="#cadastroCliente">Cadastrar</a>
              <a href="#relatorioCliente">Relatorio</a>
              <a href="#geraCliente">Gera rateio</a>
              <a href="#configCliente">Consultar</a>
              <a href="#tabelaCliente">Tabela Basica Grupo Economico</a>
            </div>
          </div>

          <div 
            className={`header-card ${activeDropdown === 'faturamento' ? 'active' : ''}`}
            onClick={() => toggleDropdown('faturamento')}
          > 
            <span>Faturamento</span>
            <div className="dropdown-content">
              <a href="#importacaoFatura">Importação</a>
              <a href="#ajusteFatura">Ajuste de Fatura</a>
              <a href="#calculoFatura">Calculo mensal</a>
              <a href="#relatorioFatura">Relatorio</a>
            </div>
          </div>

          <div 
            className={`header-card ${activeDropdown === 'rateioInterno' ? 'active' : ''}`}
            onClick={() => toggleDropdown('rateioInterno')}
          > 
            <span>Rateio interno</span>
            <div className="dropdown-content">
              <a href="#importacaoRateioIn">Importação</a>
              <a href="#encerramentoRateioIn">Encerramento</a>
              <a href="#saidaRateio">Historico de saída</a>
              <a href="#config-geradora">Relatorio de Historico de saida e entrada</a>
            </div>
          </div>

          <div 
            className={`header-card ${activeDropdown === 'rateioEquatorial' ? 'active' : ''}`}
            onClick={() => toggleDropdown('rateioEquatorial')}
          > 
            <span>Rateio Equatorial</span>
            <div className="dropdown-content">
              <a href="#importacaoRateioEn">Importação</a>
              <a href="#planilhaEn">Planilha</a>
            </div>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Sair →
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <section className="welcome-section">
          <h1>Bem-vindo ao Painel de Controle</h1>
          <p>Gerencie seus dados de forma eficiente.</p>
        </section>
      </main>

      {/* FOOTER FIXO NA BASE */}
      <footer className="footer">
        <div className="footer-content">
          <p>© 2025 Cimapra</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;