import express from "express";
import conexao from "../db.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Criar usuário
router.post("/usuarios", (req, res) => {
  const { nomeUsuario, senha, email, nomeCompleto } = req.body;
  const senhaHash = bcrypt.hashSync(senha, 10);

  const sql = "INSERT INTO usuarios (nomeUsuario, senhaHash, email, nomeCompleto) VALUES (?, ?, ?, ?)";
  conexao.query(sql, [nomeUsuario, senhaHash, email, nomeCompleto], (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
});

// Buscar todos
router.get("/usuarios", (req, res) => {
  conexao.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
});

// Login simples
router.post("/login", (req, res) => {
  const { nomeUsuario, senha } = req.body;

  conexao.query("SELECT * FROM usuarios WHERE nomeUsuario = ?", [nomeUsuario], (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    if (results.length === 0) return res.status(401).json({ erro: "Usuário não encontrado" });

    const usuario = results[0];
    const senhaValida = bcrypt.compareSync(senha, usuario.senhaHash);
    if (!senhaValida) return res.status(401).json({ erro: "Senha inválida" });

    res.json({ mensagem: "Login bem-sucedido", usuario });
  });
});

export default router;
