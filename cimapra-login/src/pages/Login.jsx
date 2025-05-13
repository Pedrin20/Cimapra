import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 

function Login() {
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

      console.log(resposta.data);
      setMensagem("Login bem-sucedido!");

      // Armazenar usuário no localStorage
      localStorage.setItem("usuarioLogado", JSON.stringify(resposta.data.usuario));

      // Redireciona para a home
      navigate("/home");
    } catch (erro) {
      console.error("Erro ao fazer login:", erro.response?.data || erro.message);
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
    </div>
  );
}

export default Login;
