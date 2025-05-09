import { useState } from 'react';
import bcrypt from 'bcryptjs';
import { Link } from 'react-router-dom';
import axios from "axios";

function Cadastro() {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();
    const senhaHash = bcrypt.hashSync(senha, 10);
    const novoUsuario = { nomeUsuario, senhaHash, email, nomeCompleto };
    console.log('Usuário cadastrado:', novoUsuario);
    setMensagem('Cadastro realizado com sucesso!');
    setNomeUsuario('');
    setSenha('');
    setEmail('');
    setNomeCompleto('');
  };

  const handleCadastroteste = async () => {
    try {
      const resposta = await axios.post("http://localhost:3306/api/usuarios", {
        nomeUsuario: "pedro",
        senha: "123456",
        email: "pedro@email.com",
        nomeCompleto: "Pedro Henrique"
      });
      console.log(resposta.data);
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);
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
