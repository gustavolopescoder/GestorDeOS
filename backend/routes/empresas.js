const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM empresas");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { nome, cnpj, endereco } = req.body;
  const result = await db.query(
    "INSERT INTO empresas (nome, cnpj, endereco) VALUES ($1, $2, $3) RETURNING *",
    [nome, cnpj, endereco]
  );
  res.status(201).json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM empresas WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar empresa:", err);
    if (err.code === "23503") {
      // Erro de restrição de chave estrangeira no PostgreSQL
      return res
        .status(409)
        .json({
          error:
            "Não é possível excluir a empresa pois existem registros relacionados",
        });
    }
    res.status(500).json({ error: "Erro ao excluir empresa" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM empresas WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Empresa não encontrada" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Erro ao buscar empresa:", err);
    res.status(500).json({ error: "Erro ao buscar empresa" });
  }
});

module.exports = router;
