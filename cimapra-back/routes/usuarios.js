import express from "express";
import conexao from "../db.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Criar usuário
router.post("/usuarios", async (req, res) => {
  try {
    const { nomeUsuario, senha, email, nomeCompleto } = req.body;
    const senhaHash = bcrypt.hashSync(senha, 10);

    const sql = "INSERT INTO usuarios (nomeUsuario, senhaHash, email, nomeCompleto) VALUES (?, ?, ?, ?)";
    await conexao.query(sql, [nomeUsuario, senhaHash, email, nomeCompleto]);

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


// Buscar todos
router.get("/usuarios", async (req, res) => {
  try {
    const [results] = await conexao.query("SELECT * FROM usuarios");
    res.json(results);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

// Login simples
router.post("/login", async (req, res) => {
  try {
    const { nomeUsuario, senha } = req.body;
    const [results] = await conexao.query("SELECT * FROM usuarios WHERE nomeUsuario = ?", [nomeUsuario]);

    if (results.length === 0 || !bcrypt.compareSync(senha, results[0].senhaHash)) {
      return res.status(401).json({ erro: "Usuário ou senha inválidos" });
    }

    const usuario = results[0];
    delete usuario.senhaHash; // remove a senha antes de enviar pro front

    res.json({ mensagem: "Login bem-sucedido", usuario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


// Deletar usuário por ID
router.delete("/usuarios/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const sql = "DELETE FROM usuarios WHERE id = ?";
    const [resultado] = await conexao.query(sql, [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário deletado com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});


export default router;
