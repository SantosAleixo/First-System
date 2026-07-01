const db = require("../db");
const bcrypt = require("bcryptjs");

const cadastrarCliente = async (req, res) => {
  const { nome, cpf, telefone, email, endereco, senha } = req.body;

  if (!senha) {
    return res.status(400).json({ erro: "Senha é obrigatória" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);
    const sql = "INSERT INTO clientes (nome, cpf, telefone, email, endereco, senha) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(sql, [nome, cpf, telefone, email, endereco, senhaHash], (err, result) => {
      if (err) return res.status(500).json({ erro: err.message });
      res.status(201).json({ mensagem: "✅ Cliente cadastrado!", id: result.insertId });
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao processar senha" });
  }
};

const loginCliente = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ erro: "Email e senha são obrigatórios" });
  }

  const sql = "SELECT * FROM clientes WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    if (results.length === 0) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const cliente = results[0];
    const senhaCorreta = await bcrypt.compare(senha, cliente.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    res.json({
      mensagem: "✅ Login realizado com sucesso!",
      cliente: { id: cliente.id, nome: cliente.nome, email: cliente.email },
    });
  });
};

//Listar os clientes
const listarClientes = (req, res) => {
  const sql = "SELECT id, nome, cpf, telefone, email, endereco FROM clientes";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(results);
  });
};

//Excluir os clientes
const excluirClientes = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM clientes WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "✅ Cliente excluído com sucesso" });
  });
};

//Alterar os dados do cliente
const alterarCliente = (req, res) => {
  const { id } = req.params;
  const { nome, cpf, telefone, email, endereco } = req.body;
  const sql = "UPDATE clientes SET nome=?, cpf=?, telefone=?, email=?, endereco=? WHERE id=?";
  db.query(sql, [nome, cpf, telefone, email, endereco, id], (err, result) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json({ mensagem: "✅ Cliente atualizado com sucesso" });
  });
};

module.exports = { cadastrarCliente, loginCliente, listarClientes, excluirClientes, alterarCliente };