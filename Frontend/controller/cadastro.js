window.cadastrarCliente = async function () {
  const nome = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const email = document.getElementById("email").value;
  const endereco = document.getElementById("endereco").value;
  const senha = document.getElementById("campoSenhaCadastro").value;
  const mensagem = document.getElementById("mensagem");

  mensagem.textContent = "";
  mensagem.className = "";

  try {
    const response = await fetch("http://localhost:3000/clientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, cpf, telefone, email, endereco, senha }),
    });

    const text = await response.text();
    console.log("RESPOSTA:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      mensagem.textContent = "❌ Erro no servidor (não retornou JSON)";
      mensagem.className = "erro";
      return;
    }

    if (response.ok) {
      mensagem.textContent = "✅ Cliente cadastrado com sucesso!";
      mensagem.className = "sucesso";
      console.log(data);
    } else {
      mensagem.textContent = "❌ Erro ao cadastrar: " + data.erro;
      mensagem.className = "erro";
    }
  } catch (error) {
    mensagem.textContent = "❌ Erro de conexão com o servidor";
    mensagem.className = "erro";
    console.error(error);
  }
};