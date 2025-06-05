import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

function Login({ setUsuarioLogado }) { // Recebe a prop aqui
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post("http://localhost:3000/api/login", {
        nomeUsuario: usuario,
        senha: senha
      });

      localStorage.setItem("usuarioLogado", JSON.stringify(resposta.data.usuario));
      setUsuarioLogado(true);  // Atualiza o estado para true
      navigate("/home");       // Redireciona para home
    } catch (erro) {
      setMensagem("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Nome de Usuário:</label>
          <input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit">Entrar</button>
      </form>

      {mensagem && <p>{mensagem}</p>}

      <p>Não tem uma conta?</p>
      <button onClick={() => navigate('/cadastro')}>Cadastro</button>
    </div>
  );
}

export default Login;