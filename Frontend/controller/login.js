window.loginCliente = async function () {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const mensagem = document.getElementById("mensagemDate");

  mensagem.textContent = "";
  mensagem.className = "";

  try {
    const response = await fetch("http://localhost:3000/clientes/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, senha }),
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
      mensagem.textContent = "✅ Login realizado com sucesso!";
      mensagem.className = "sucesso";
      console.log(data.cliente);
      // futuramente: redirecionar ou salvar dados do cliente
    } else {
      mensagem.textContent = "❌ " + data.erro;
      mensagem.className = "erro";
    }
  } catch (error) {
    mensagem.textContent = "❌ Erro de conexão com o servidor";
    mensagem.className = "erro";
    console.error(error);
  }
};