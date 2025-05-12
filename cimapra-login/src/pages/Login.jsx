import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../styles/App.css";
import axios from 'axios'; 

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // <- USO CORRETO

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const resposta = await axios.post("http://localhost:3000/api/login", {
      nomeUsuario: usuario,
      senha: senha
    });
    console.log(resposta.data);
    setMensagem("Login bem-sucedido!");
    // Exemplo: navega para uma página protegida
    // navigate("/dashboard");
  } catch (erro) {
    console.error("Erro ao fazer login:", erro.response?.data || erro.message);
    setMensagem("Usuário ou senha inválidos.");
  }
};

const irParaCadastro = () => {
  navigate("/cadastro");
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
      <br/>
      <button onClick={irParaCadastro}>Cadastrar</button>
    </div>
  );
}

export default Login;
