const express = require("express");
const router = express.Router();
const { cadastrarCliente, loginCliente, listarClientes, excluirClientes, alterarCliente } = require("../controllers/clienteController");

router.post("/", cadastrarCliente);
router.post("/login", loginCliente);
router.get("/", listarClientes);
router.delete("/:id", excluirClientes);
router.put("/:id", alterarCliente);

module.exports = router;