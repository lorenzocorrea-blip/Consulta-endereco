const form = document.getElementById("formConsulta");
const mensagem = document.getElementById("mensagem");
const btnInstalar = document.getElementById("btnInstalar");

let instalacaoPendente = null;

// Chrome disponibilizou a instalação
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();

    instalacaoPendente = event;

    btnInstalar.disabled = false;
    btnInstalar.textContent = "Instalar aplicativo";

    console.log("INSTALAÇÃO DISPONÍVEL");
});

// Clique no botão
btnInstalar.addEventListener("click", async () => {

    if (!instalacaoPendente) {
        mensagem.textContent =
            "O navegador ainda não disponibilizou a instalação.";
        console.log("beforeinstallprompt NÃO foi disparado.");
        return;
    }

    instalacaoPendente.prompt();

    const escolha = await instalacaoPendente.userChoice;

    console.log("Resultado:", escolha.outcome);

    instalacaoPendente = null;
});


// ================================
// CONSULTA DO CEP
// ================================

form.addEventListener("submit", (event) => {

    event.preventDefault();

    const entrada = document
        .getElementById("cep")
        .value
        .trim();

    const cidade = document
        .getElementById("cidade")
        .value
        .trim()
        .replace(/\s+/g, " ");

    mensagem.textContent = "";

    if (!/^\d{5}-?\d{3}$/.test(entrada)) {
        mensagem.textContent =
            "Informe um CEP com 8 números.";
        return;
    }

    if (!cidade) {
        mensagem.textContent =
            "Informe a cidade.";
        return;
    }

    const cep = entrada.replace("-", "");

    const parametros = new URLSearchParams({
        cep: cep,
        cidade: cidade
    });

    window.location.href =
        `resultado.html?${parametros.toString()}`;
});