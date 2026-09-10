// ==========================================
// CONSULTA DE ENDEREÇO
// ==========================================

const form = document.getElementById("formConsulta");
const mensagem = document.getElementById("mensagem");

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

    // Validação do CEP
    if (!/^\d{5}-?\d{3}$/.test(entrada)) {

        mensagem.textContent =
            "Informe um CEP com 8 números.";

        return;
    }

    // Validação da cidade
    if (!cidade) {

        mensagem.textContent =
            "Informe a cidade.";

        return;
    }

    // Remove o hífen
    const cep = entrada.replace("-", "");

    // Envia os dados para resultado.html
    const parametros = new URLSearchParams({
        cep: cep,
        cidade: cidade
    });

    window.location.href =
        `resultado.html?${parametros.toString()}`;

});


// ==========================================
// INSTALAÇÃO DO APLICATIVO
// ==========================================

let instalacaoPendente = null;

const btnInstalar =
    document.getElementById("btnInstalar");


// O navegador informa quando o aplicativo
// pode ser instalado
window.addEventListener(
    "beforeinstallprompt",
    (event) => {

        event.preventDefault();

        instalacaoPendente = event;

        console.log(
            "LocalizaCEP pode ser instalado."
        );
    }
);


// Clique no botão "Instalar APK"
btnInstalar.addEventListener(
    "click",
    async () => {

        // Se o navegador ainda não liberou
        // a instalação automática
        if (!instalacaoPendente) {

            alert(
                "A instalação automática não está disponível. " +
                "Abra o menu do navegador e escolha " +
                "'Instalar LocalizaCEP'."
            );

            return;
        }

        // Abre a janela de instalação
        instalacaoPendente.prompt();

        const resultado =
            await instalacaoPendente.userChoice;

        if (resultado.outcome === "accepted") {

            console.log(
                "LocalizaCEP instalado."
            );

        } else {

            console.log(
                "Instalação cancelada."
            );
        }

        instalacaoPendente = null;
    }
);


// Detecta quando a instalação terminou
window.addEventListener(
    "appinstalled",
    () => {

        console.log(
            "LocalizaCEP foi instalado com sucesso!"
        );

    }
);