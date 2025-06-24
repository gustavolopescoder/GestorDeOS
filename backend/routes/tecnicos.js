const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM tecnicos");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { nome, telefone, email } = req.body;
  const result = await db.query(
    "INSERT INTO tecnicos (nome, telefone, email) VALUES ($1, $2, $3) RETURNING *",
    [nome, telefone, email]
  );
  res.status(201).json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM tecnicos WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Técnico não encontrado" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Erro ao deletar técnico:", err);
    res.status(500).json({ error: "Erro ao excluir técnico" });
  }
});

module.exports = router;
