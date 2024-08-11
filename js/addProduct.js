console.log("Script addProduct.js carregado");

// Adicionar produto
const addProductForm = document.querySelector("#addProductForm");

addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Formulário enviado"); // Adicionar log para verificar se o evento está sendo acionado
    const name = document.querySelector("#addProductName").value;
    const position = document.querySelector("#addProductPosition").value;
    const ppg = document.querySelector("#addProductPpg").value;
    const status = document.querySelector("#addProductStatus").value;

    try {
        const response = await axios.post("http://localhost:8080/api/examples", { name, position, ppg, status });
        console.log(response.data);
        alert("Produto cadastrado com sucesso!");
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar produto!");
        window.location.href = "index.html";
    }
});