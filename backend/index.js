const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

app.use("/empresas", require("./routes/empresas"));
app.use("/tecnicos", require("./routes/tecnicos"));
app.use("/ordens", require("./routes/ordens"));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
