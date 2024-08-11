let data = []; // Declaração global da variável data

let currentPage = 0;
const pageSize = 72;
let totalPages = 0; // Declaração de totalPages

const getData = async (page = 0, query = '') => {
    try {
        let url = `http://localhost:8080/api/examples?page=${page}&size=${pageSize}`;
        if (query) {
            url = `http://localhost:8080/api/examples/search?query=${query}&page=${page}&size=${pageSize}`;
        }
        const response = await axios.get(url);
        console.log(response);
        data = response.data.content; // Guardando os dados globalmente
        printData(data); // Chamada para imprimir dados iniciais

        // Atualizar totalPages e currentPage
        totalPages = response.data.totalPages;
        currentPage = response.data.number;

        // Atualizar a caixa de seleção de páginas
        updatePageSelector(totalPages);

    } catch (error) {
        console.log(error);
    };
};

const updatePageSelector = (total) => {
    const pageSelector = document.querySelector("#pageSelector");
    pageSelector.innerHTML = ''; // Limpa as opções atuais
    for (let i = 0; i < total; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = `${i + 1}`;
        pageSelector.appendChild(option);
    }
    pageSelector.value = currentPage; // Define a página atual como selecionada
}

document.querySelector("#pageSelector").addEventListener("change", (e) => {
    const selectedPage = e.target.value;
    getData(selectedPage);
});

document.querySelector("#next").addEventListener("click", () => {
    if (currentPage < totalPages - 1) {
        currentPage++;
        getData(currentPage);
    }
});

document.querySelector("#previous").addEventListener("click", () => {
    if (currentPage > 0) {
        currentPage--;
        getData(currentPage);
    }
});

// 2 - Imprimindo dados na tela

const container = document.querySelector("#user-container");

const printData = (dataToPrint) => {
    container.innerHTML = ""; // Limpa o container antes de imprimir novos dados

    dataToPrint.forEach((user) => {
        const div = document.createElement("div");

        const imgElement = document.createElement("img");
        imgElement.src = user.position;
        imgElement.alt = user.name;
        div.appendChild(imgElement);

        const nameElement = document.createElement("h2");
        nameElement.textContent = user.name;
        div.appendChild(nameElement);

        const ppg = document.createElement("h3");
        ppg.textContent = `R$ ${user.ppg}`; // Adiciona 'R$' antes do valor do produto
        div.appendChild(ppg);

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => {
            window.location.href = `edit.html?id=${user._id}`;
        });
        
        div.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", async () => {
            try {
                const response = await axios.delete(`http://localhost:8080/api/examples/${user._id}`);
                console.log(response);
                getData(currentPage); // Recarrega os dados da página atual após a exclusão
                alert("Produto excluído com sucesso!");
            } catch (error) {
                console.log(error);
                alert("Ocorreu um erro ao excluir o produto. Por favor, tente novamente.");
            }
        });
        div.appendChild(deleteButton);


        container.appendChild(div);
    });
}

getData(); // Carrega os dados na inicialização

// Script para barra de pesquisa

const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value.toLowerCase();
    console.log('Valor de busca:', search);
    console.log('Dados disponíveis:', data);
    const filteredUsers = data.filter(user => {
        return user.name.toLowerCase().includes(search);
    });
    getData(0, search); // Chama getData com a query de busca
    console.log('Usuários filtrados:', filteredUsers);
    printData(filteredUsers); // Chama printData com os dados filtrados
});
