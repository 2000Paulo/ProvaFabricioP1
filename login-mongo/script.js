
document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  // Obtém os valores dos campos de email e senha
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  // Constrói a URL da solicitação GET com os parâmetros de consulta
  const url = `http://localhost:3000/users?email=${encodeURIComponent(email)}&senha=${encodeURIComponent(senha)}`;

  try {
    // Faz a solicitação GET para o servidor
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Erro ao buscar usuário');
    }
    
    // Processa a resposta
    const data = await response.json();

    if ( data != undefined){
      window.location.href = "http://127.0.0.1:5000";
    }
  } catch (error) {
    console.error(error);
  }
});


