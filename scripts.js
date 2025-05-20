// Função para alternar exibição do saldo
function toggleSaldo() {
  const saldoElement = document.getElementById("saldo");
  const saldoVisivel = "R$ 5.000,00"; // Exemplo de valor fixo
  const saldoOculto = "R$ ****";

  saldoElement.textContent = saldoElement.textContent === saldoOculto 
    ? saldoVisivel
    : saldoOculto;
}

// Função para adicionar notificações dinâmicas
function addNotification(message, type = 'info') {
  const notificationList = document.querySelector('.notificacoes ul');
  if (!notificationList) return;
  const newNotification = document.createElement('li');
  newNotification.innerHTML = `<i class="fas fa-${type === 'error' ? 'times-circle' : 'bell'}"></i> ${message}`;
  newNotification.classList.add('show');

  // Adicionar notificação
  notificationList.insertBefore(newNotification, notificationList.firstChild);

  // Remover notificação após 5 segundos
  setTimeout(() => {
    newNotification.classList.remove('show');
    setTimeout(() => newNotification.remove(), 500);
  }, 5000);
}

// Função para validação e envio de Pix
document.getElementById("form-pix")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const chavePix = document.getElementById("pix-key").value.trim();
  const valorPix = parseFloat(document.getElementById("pix-value").value.trim());

  if (!chavePix || isNaN(valorPix) || valorPix <= 0) {
    addNotification("Por favor, insira uma chave Pix válida e um valor positivo.", "error");
    return;
  }

  addNotification(`Pagamento via Pix concluído! Chave: ${chavePix}, Valor: R$ ${valorPix.toFixed(2)}`, "success");
  document.getElementById("pix-key").value = "";
  document.getElementById("pix-value").value = "";
});

// Função para validação e envio de pagamento do Cartão
document.getElementById("form-cartao")?.addEventListener("submit", function (e) {
  e.preventDefault();

  const valorCartao = parseFloat(document.getElementById("cartao-value").value.trim());

  if (isNaN(valorCartao) || valorCartao <= 0) {
    addNotification("Por favor, insira um valor positivo para a fatura.", "error");
    return;
  }

  addNotification(`Pagamento da fatura concluído! Valor: R$ ${valorCartao.toFixed(2)}`, "success");
  document.getElementById("cartao-value").value = "";
});

// Tudo em um único bloco DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  // Notificação inicial
  addNotification("Bem-vindo ao Banco Malveder!");

  // Gráfico
  const ctx = document.getElementById("grafico")?.getContext("2d");
  if (ctx) {
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
        datasets: [
          {
            label: "Saldo (R$)",
            data: [5000, 5200, 5300, 5400, 5500],
            borderColor: "#007BFF",
            backgroundColor: "rgba(0, 123, 255, 0.2)",
            fill: true,
          },
          {
            label: "Despesas (R$)",
            data: [1000, 1200, 1100, 1300, 1400],
            borderColor: "#f44336",
            backgroundColor: "rgba(244, 67, 54, 0.2)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 2000,
          easing: "easeInOutQuart",
        },
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Mês",
            },
          },
          y: {
            title: {
              display: true,
              text: "Valor (R$)",
            },
          },
        },
      },
    });
  }

  // Botão para abrir/fechar a sidebar de ações de conta
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar-acoes');
  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('open');
    });
  }
});