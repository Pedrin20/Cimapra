import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <- IMPORTAÇÃO CORRETA
import bcrypt from 'bcryptjs';
import "../styles/App.css";

function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate(); // <- USO CORRETO

  const usuarioCadastrado = {
    nome: 'admin',
    senhaHash: bcrypt.hashSync('123456', 10),
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const senhaValida = bcrypt.compareSync(senha, usuarioCadastrado.senhaHash);
    if (usuario === usuarioCadastrado.nome && senhaValida) {
      setMensagem('Login bem-sucedido!');
    } else {
      setMensagem('Usuário ou senha inválidos.');
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
