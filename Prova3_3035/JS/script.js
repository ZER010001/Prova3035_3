// Puxa os dados do localStorage
function getDataFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Salva os dados no localStorage
function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Cadastro de Clientes
document.addEventListener("DOMContentLoaded", function () {
    const formularioClientes = document.getElementById("formularioClientes");

    formularioClientes.addEventListener("submit", function (event) {
        event.preventDefault();

        const tutorNome = document.getElementById("tutorNome").value;
        const tutorCell = document.getElementById("tutorCell").value;
        const tutorEndereco = document.getElementById("tutorEndereco").value;
        const dataAtendimento = document.getElementById("dataAtendimento").value;
        const Nome = document.getElementById("animalNome").value;
        const Idade = document.getElementById("animalIdade").value;
        const Tamanho = document.getElementById("animalTamanho").value;

        const novoCliente = {
            tutorNome,
            tutorCell,
            tutorEndereco,
            dataAtendimento,
            Nome,
            Idade,
            Tamanho
        };

        const clientes = getDataFromLocalStorage("clientes") || [];
        clientes.push(novoCliente);

        saveDataToLocalStorage("clientes", clientes);

        alert("Cliente cadastrado com sucesso. \n Agradecemos a prefêrencia, estamos ansiosos para cuidar de seu Pet");

        formularioClientes.reset();
    });
});

// Mostra os clientes
document.addEventListener("DOMContentLoaded", function () {
    const listaClientes = document.getElementById("listaClientes");
    const modal = document.getElementById("modal");
    const modalContent = document.querySelector(".modal-content");
    const closeModalButton = document.querySelector(".close");

    const clientes = getDataFromLocalStorage("clientes") || [];

    function exibirInformacoesCliente(cliente) {
        modalContent.innerHTML = `
            <h2>Informações do Cliente</h2>
            <p><strong>Nome do Tutor:</strong> ${cliente.tutorNome}</p>
            <p><strong>Telefone:</strong> ${cliente.tutorCell}</p>
            <p><strong>Endereço:</strong> ${cliente.tutorEndereco}</p>
            <p><strong>Data do Atendimento:</strong> ${cliente.dataAtendimento}</p>
            <h2>Informações do Cachorro</h2>
            <p><strong>Nome:</strong> ${cliente.Nome}</p>
            <p><strong>Idade:</strong> ${cliente.Idade}</p>
            <p><strong>Porte:</strong> ${cliente.Tamanho}</p>
        `;
        modal.style.display = "block";
    }

    clientes.forEach(cliente => {
        const cardCliente = document.createElement("div");
        cardCliente.classList.add("card-cliente");

        cardCliente.innerHTML = `
            <h3>Nome do Cachorro: ${cliente.Nome}</h3>
            <p>Data do Atendimento: ${cliente.dataAtendimento}</p>
        `;

        cardCliente.addEventListener("click", () => {
            exibirInformacoesCliente(cliente);
        });

        listaClientes.appendChild(cardCliente);
    });

    closeModalButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", evento => {
        if (evento.target === modal) {
            modal.style.display = "none";
        }
    });
});

// Produtos
document.addEventListener("DOMContentLoaded", function () {
    const listaProdutos = document.getElementById("listaProdutos");
    const carrinho = document.getElementById("carrinho");

    const produtos = [
        { nome: "Ração para Cães", imagem: "/IMG/racao.jpeg", valor: 69.00 },
        { nome: "Bandana Pet", imagem: "/IMG/panodepescoco.jpg", valor: 9.00 },
        { nome: "Kit Bandana e Laco", imagem: "/IMG/kitbandanaelaco.jpg", valor: 38.00 },
        { nome: "Meias Pet", imagem: "/IMG/meias.jpg", valor: 10.00 },
        { nome: "Tapete Pet", imagem: "/IMG/tapete.jpg", valor: 320.00 },
        { nome: "Cabana Pet com Acessórios", imagem: "/IMG/cabana.jpg", valor: 180.00 }
    ];

    produtos.forEach(produto => {
        const cardProduto = document.createElement("div");
        cardProduto.classList.add("card-produto");

        cardProduto.innerHTML = `
        <img src="${produto.imagem}" alt="${produto.nome}" style="display: block; margin: 0 auto; max-width: 200px; max-height: 400px; object-fit: contain;">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.valor.toFixed(2)}</p>
            <button class="btn-adicionar" data-nome="${produto.nome}" data-valor="${produto.valor}">Adicionar ao Carrinho</button>
        `;

        cardProduto.querySelector(".btn-adicionar").addEventListener("click", function () {
            const nome = this.getAttribute("data-nome");
            const valor = parseFloat(this.getAttribute("data-valor"));

            const itemCarrinho = {
                nome,
                valor
            };

            const itensCarrinho = getDataFromLocalStorage("carrinho") || [];
            itensCarrinho.push(itemCarrinho);

            saveDataToLocalStorage("carrinho", itensCarrinho);

            alert("Produto adicionado ao carrinho!");

            atualizarCarrinho();
        });

        listaProdutos.appendChild(cardProduto);
    });

    function atualizarCarrinho() {
        const itensCarrinho = getDataFromLocalStorage("carrinho") || [];
        let total = 0;

        carrinho.innerHTML = "<h2>Carrinho de Compras</h2>";

        itensCarrinho.forEach(item => {
            total += item.valor;
            const itemCarrinho = document.createElement("div");
            itemCarrinho.classList.add("item-carrinho");
            itemCarrinho.innerHTML = `<p>${item.nome} - R$ ${item.valor.toFixed(2)}</p>`;
            carrinho.appendChild(itemCarrinho);
        });

        const totalCarrinho = document.createElement("div");
        totalCarrinho.classList.add("total-carrinho");
        totalCarrinho.innerHTML = `<p>Total: R$ ${total.toFixed(2)}</p>`;
        carrinho.appendChild(totalCarrinho);
    }

    atualizarCarrinho();
});
