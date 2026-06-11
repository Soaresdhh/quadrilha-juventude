// =====================================
// CONFIGURAÇÃO
// =====================================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyVjqml7YJ0SX8RbOdUyvzAQtfmUNNRhnTTR2p-Gh_WWuKpujIkB-K2vKz9lDxTQDjrsw/exec";

// =====================================
// CONTAGEM REGRESSIVA
// =====================================
const dataEvento = new Date("July 11, 2026 19:30:00").getTime();

function atualizarContador(){
    const agora = new Date().getTime();
    const distancia = dataEvento - agora;

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const diasEl = document.getElementById("dias");

    if(diasEl){
        document.getElementById("dias").innerHTML = dias;
        document.getElementById("horas").innerHTML = horas;
        document.getElementById("minutos").innerHTML = minutos;
        document.getElementById("segundos").innerHTML = segundos;
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();

// =====================================
// MÁSCARA DE WHATSAPP
// =====================================
const telefone = document.getElementById("telefone");

if(telefone){
    telefone.addEventListener("input", function(e){
        let valor = e.target.value.replace(/\D/g,'');
        
        if(valor.length > 11) valor = valor.substring(0,11);
        
        if(valor.length > 10) valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        else if(valor.length > 6) valor = valor.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
        else if(valor.length > 2) valor = valor.replace(/(\d{2})(\d+)/, '($1) $2');
        
        e.target.value = valor;
    });
}

// =====================================
// ENVIO DO FORMULÁRIO
// =====================================
const formulario = document.getElementById("formInscricao");

if(formulario){
    formulario.addEventListener("submit", async function(event){
        event.preventDefault();

        const dados = {
            dupla: document.getElementById("dupla").value,
            participante1: document.getElementById("participante1").value,
            participante2: document.getElementById("participante2").value,
            telefone: document.getElementById("telefone").value,
            presenca: document.getElementById("presenca").value,
            data: new Date().toLocaleString("pt-BR")
        };

        try{
            const botao = formulario.querySelector("button");
            botao.disabled = true;
            botao.innerHTML = "Enviando inscrição...";

            // A MÁGICA ACONTECE AQUI (mode: "no-cors")
            await fetch(SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dados)
            });

            alert("🎉 Inscrição realizada com sucesso!");
            formulario.reset();
            botao.disabled = false;
            botao.innerHTML = "Confirmar Inscrição";

        } catch(error){
            alert("Erro ao enviar inscrição.");
            console.error(error);
            botao.disabled = false;
            botao.innerHTML = "Confirmar Inscrição";
        }
    });
}
