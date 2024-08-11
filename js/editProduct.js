document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    try {
        // Buscar os dados do produto pelo ID
        const response = await axios.get(`http://localhost:8080/api/examples/${productId}`);
        const product = response.data;

        // Preencher o formulário com os dados do produto
        document.querySelector("#name").value = product.name;
        document.querySelector("#position").value = product.position;
        document.querySelector("#ppg").value = product.ppg;
        document.querySelector("#status").value = product.status;
    } catch (error) {
        console.log(error);
    }

    // Lógica para salvar as alterações
    document.querySelector("#edit-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        const updatedProduct = {
            name: document.querySelector("#name").value,
            position: document.querySelector("#position").value,
            ppg: document.querySelector("#ppg").value,
            status: document.querySelector("#status").value
        };

        console.log("Produto Atualizado:", updatedProduct); // Verifique os valores aqui

        try {
            const response = await axios.put(`http://localhost:8080/api/examples/${productId}`, updatedProduct);
            console.log(response.data);
            alert("Produto atualizado com sucesso!");
            window.location.href = "index.html"; // Redirecionar para a página principal após a edição
        } catch (error) {
            console.log(error);
        }
    });

});
