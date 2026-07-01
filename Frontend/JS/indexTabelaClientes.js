const tabela = document.getElementById("tabela");
const API_URL = "http://localhost:3000/clientes";

// Carrega os clientes do banco quando a página abre
async function carregarClientes() {
    try {
        const response = await fetch(API_URL);
        const clientes = await response.json();

        const tbody = tabela.querySelector("tbody");
        tbody.innerHTML = "";

        clientes.forEach((cliente) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
        <th>${cliente.nome}</th>
        <td>${cliente.cpf}</td>
        <td>${cliente.telefone}</td>
        <td>${cliente.email}</td>
        <td>${cliente.endereco}</td>
        <td><button class="excluir" data-id="${cliente.id}">Excluir</button></td>
        <td><button class="editar" data-id="${cliente.id}">Editar User</button></td>
      `;
            tbody.appendChild(linha);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

// Excluir cliente do banco
tabela.addEventListener("click", async function (e) {
    const id = e.target.dataset.id;
    
    if (e.target.classList.contains("excluir")) {
        if (!confirm("Tem certeza que deseja excluir esse cliente?")) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            const data = await response.json();
            console.log(data);

            e.target.closest("tr").remove(); // remove da tela só depois de confirmar no banco
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
            alert("Erro ao excluir cliente");
        }
    }

    // EDITAR
    if (e.target.classList.contains("editar")) {
        const linha = e.target.closest("tr");
        const celulas = linha.querySelectorAll("th, td");

        const nomeAtual = celulas[0].textContent.trim();
        const cpfAtual = celulas[1].textContent.trim();
        const telefoneAtual = celulas[2].textContent.trim();
        const emailAtual = celulas[3].textContent.trim();
        const enderecoAtual = celulas[4].textContent.trim();

        const nome = prompt("Nome:", nomeAtual);
        if (nome === null) return; // cancelou

        const cpf = prompt("CPF:", cpfAtual);
        if (cpf === null) return;

        const telefone = prompt("Telefone:", telefoneAtual);
        if (telefone === null) return;

        const email = prompt("E-mail:", emailAtual);
        if (email === null) return;

        const endereco = prompt("Endereço:", enderecoAtual);
        if (endereco === null) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, cpf, telefone, email, endereco }),
            });

            const data = await response.json();

            if (!response.ok) {
                alert("Erro ao atualizar: " + data.erro);
                return;
            }

            carregarClientes(); // recarrega a tabela com os dados atualizados
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            alert("Erro ao atualizar cliente");
        }
    }
});

// Carrega a tabela assim que o script é executado
carregarClientes();