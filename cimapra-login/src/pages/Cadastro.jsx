import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

function Cadastro() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = async (e) => {
  e.preventDefault();
  try {
    const resposta = await axios.post("http://localhost:3000/api/usuarios", {
      nomeUsuario,
      senha,
      email,
      nomeCompleto
    });
    console.log(resposta.data);
    setMensagem("Cadastro realizado com sucesso!");
    setNomeUsuario('');
    setSenha('');
    setEmail('');
    setNomeCompleto('');
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro.response?.data || erro.message);
    setMensagem("Erro ao cadastrar usuário.");
  }
};


  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form onSubmit={handleCadastro}>
        <div>
          <label>Nome de Usuário:</label>
          <input type="text" value={nomeUsuario} onChange={(e) => setNomeUsuario(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Nome Completo:</label>
          <input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
      <p>Já tem conta? <Link to="/login">Fazer login</Link></p>
    </div>
  );
}

export default Cadastro;
