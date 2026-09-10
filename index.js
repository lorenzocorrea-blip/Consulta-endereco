// ============================================
// CONSULTA DE CEP
// ============================================

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

    // Verifica se o CEP possui o formato correto
    if (!/^\d{5}-?\d{3}$/.test(entrada)) {

        mensagem.textContent =
            "Informe um CEP com 8 números.";

        return;
    }

    // Verifica se a cidade foi preenchida
    if (!cidade) {

        mensagem.textContent =
            "Informe a cidade.";

        return;
    }

    // Remove o hífen do CEP
    const cep = entrada.replace("-", "");

    // Envia CEP e cidade para a página de resultado
    const parametros = new URLSearchParams({
        cep: cep,
        cidade: cidade
    });

    window.location.href =
        `resultado.html?${parametros.toString()}`;
});


// ============================================
// INSTALAÇÃO DO APLICATIVO (PWA)
// ============================================

let instalacaoPendente = null;

const btnInstalar =
    document.getElementById("btnInstalar");


// O navegador avisa quando o aplicativo
// pode ser instalado
window.addEventListener(
    "beforeinstallprompt",
    (event) => {

        event.preventDefault();

        instalacaoPendente = event;

        // Mostra o botão
        btnInstalar.hidden = false;

        console.log(
            "Aplicativo pronto para instalação."
        );
    }
);


// Quando o usuário clicar em "Instalar APK"
btnInstalar.addEventListener(
    "click",
    async () => {

        if (!instalacaoPendente) {
            return;
        }

        // Abre a janela de instalação
        instalacaoPendente.prompt();

        // Descobre se o usuário aceitou
        const resultado =
            await instalacaoPendente.userChoice;

        if (resultado.outcome === "accepted") {

            console.log(
                "Aplicativo instalado."
            );

            btnInstalar.hidden = true;

        } else {

            console.log(
                "Instalação cancelada."
            );
        }

        // Limpa o evento
        instalacaoPendente = null;
    }
);


// Detecta quando o aplicativo foi instalado
window.addEventListener(
    "appinstalled",
    () => {

        console.log(
            "LocalizaCEP foi instalado!"
        );

        btnInstalar.hidden = true;
    }
);