// Variável global para armazenar o total acumulado
let totalGeral = 0;

function adicionar() {
    let Produto = document.getElementById('produto').value;
    let nomeProduto = Produto.split("-")[0].trim();
    let valorProduto = Produto.split('R$')[1].trim();
    let quantidadeProduto = document.getElementById('quantidade').value;
    let preco = parseInt(quantidadeProduto) * parseFloat(valorProduto);
    let carrinho = document.getElementById('lista-produtos');
    let precoTotal = document.getElementById('valor-total');
    
    // Soma o novo preço ao total geral (acumula em vez de sobrescrever)
    totalGeral += preco;
    
    precoTotal.innerHTML = `<p class="carrinho__total">
        Total: <span class="texto-azul" id="valor-total">${totalGeral.toFixed(2)}</span>
      </p>`
    
    // Modificação: adiciona o preço no último span para permitir recalcular em somarCarrinho() e inclui botão remover
    carrinho.innerHTML = carrinho.innerHTML +  `<section class="carrinho__produtos__produto">
          <span class="texto-azul">${quantidadeProduto }x</span> ${Produto} <span class="texto-azul">${preco.toFixed(2)}</span>
          <button onclick="removerProduto(this)">Remover</button>
        </section>`
    
    console.log('produto:', nomeProduto, 'quantidade:', quantidadeProduto, 'preço:', preco);
    console.log('Produto adicionado com sucesso!');
}   

function limpar() {
    document.getElementById('lista-produtos').innerHTML = '';
    totalGeral = 0;
    document.getElementById('valor-total').textContent = '0.00';
}

function removerProduto(button) {
    button.closest('.carrinho__produtos__produto').remove();
    somarCarrinho();
}

function somarCarrinho() {
    // Recalcula o total percorrendo os itens do carrinho
    let itens = document.querySelectorAll('.carrinho__produtos__produto');
    totalGeral = 0;  // Reseta para recalcular do zero
    
    itens.forEach(item => {
        // Extrai o preço do último span (texto-azul) de cada item
        let precoTexto = item.querySelector('.texto-azul:last-child').textContent;
        totalGeral += parseFloat(precoTexto);
    });
    
    // Atualiza o total no HTML
    document.getElementById('valor-total').textContent = totalGeral.toFixed(2);
}
