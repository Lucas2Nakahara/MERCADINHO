const usuarioAtual = localStorage.getItem("logado");
if (!usuarioAtual) {
    alert("Você precisa estar logado!");
    window.location.href = "index.html";
}

let carrinho = JSON.parse(localStorage.getItem("carrinho_" + usuarioAtual)) || [];

function carregarProdutos() {
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(produtos => {
        const divProdutos = document.getElementById("produtos");

        produtos.forEach(produto => {
        const card = document.createElement("div");
        card.className = "produto";
        card.innerHTML = `
            <img src="${produto.image}" width="100"><br>
            <strong>${produto.title}</strong><br>
            <b>R$ ${produto.price.toFixed(2)}</b><br>
            <button onclick="adicionar(${produto.id}, '${produto.title}', ${produto.price})">Adicionar</button>
        `;
        divProdutos.appendChild(card);
        });
    });
}

function adicionar(id, nome, preco) {
    carrinho.push({ id, nome, preco });
    salvarCarrinho();
    atualizarCarrinho();
}

function remover(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const div = document.getElementById("carrinho");
    div.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, i) => {
    total += item.preco;
    const linha = document.createElement("div");
    linha.innerHTML = `${item.nome} - R$ ${item.preco.toFixed(2)} <button onclick="remover(${i})">Remover</button>`;
    div.appendChild(linha);
    });

    document.getElementById("total").innerText = total.toFixed(2);
}

function salvarCarrinho() {
    localStorage.setItem("carrinho_" + usuarioAtual, JSON.stringify(carrinho));
}

function finalizarCompra() {
    if (carrinho.length === 0) {
    alert("Carrinho está vazio.");
    return;
    }

    alert("Compra finalizada com sucesso!");
    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();
}

function sair() {
    localStorage.removeItem("logado");
    window.location.href = "index.html";
}

carregarProdutos();
atualizarCarrinho();
