import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conexao from "./db.js"; // continua conectando ao banco
import usuariosRoutes from "./routes/usuarios.js"; // importa as rotas

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Usa as rotas
app.use("/api", usuariosRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send("API está rodando!");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});