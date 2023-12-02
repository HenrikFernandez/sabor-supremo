const precos = {
    'chocolate gourmet': 3.00,
    'prestigio gourmet': 3.00,
    'morango gourmet': 3.00,
    'oreo gourmet': 3.00,
    'maracuja gourmet': 3.00,
    'maracuja': 1.00,
    'morango': 1.00,
    'chocolate': 1.00,
    // Adicione outros sabores e seus preços aqui...
  };
  
  let totalCompra = 0;
let carrinho = [];

function adicionarAoCarrinho(edindin) {
  const itemExistente = carrinho.find(item => item.nome === dindin);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    const novoItem = {
      nome: dindin,
      quantidade: 1,
      preco: precos[dindin]
    };
    carrinho.push(novoItem);
  }

  atualizarCarrinho();
  atualizarTotalCompra();
}

function removerDoCarrinho(item) {
  const itemExistente = carrinho.find(cartItem => cartItem.nome === item.nome);

  if (itemExistente) {
    if (itemExistente.quantidade > 1) {
      itemExistente.quantidade--;
    } else {
      const index = carrinho.indexOf(item);
      carrinho.splice(index, 1);
    }

    atualizarCarrinho();
    atualizarTotalCompra();
  }
}

function exibirItemCarrinho(item) {
  const carrinhoLista = document.getElementById('carrinho-lista');
  const novoItem = document.createElement('li');

  const spanEmpada = document.createElement('span');
  const textoCompleto = `${item.nome} - Quantidade: ${item.quantidade}`;
  const textoSimplificado = `${item.nome} - Qtd: ${item.quantidade}`;

  spanEmpada.textContent = isMobileDevice() ? textoSimplificado : textoCompleto;
  novoItem.appendChild(spanEmpada);

  const botaoRemover = document.createElement('button');
  botaoRemover.textContent = 'Remover';
  botaoRemover.classList.add('remove-button');
  botaoRemover.onclick = function() {
    removerDoCarrinho(item);
  };

  novoItem.appendChild(botaoRemover);
  carrinhoLista.appendChild(novoItem);
}

function isMobileDevice() {
  return window.innerWidth <= 768; // Considerando que 768px seja o limite para dispositivos móveis
}
function atualizarCarrinho() {
  const carrinhoLista = document.getElementById('carrinho-lista');
  carrinhoLista.innerHTML = '';

  carrinho.forEach(item => {
    exibirItemCarrinho(item);
  });
}

function atualizarTotalCompra() {
  totalCompra = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);

  const totalElement = document.getElementById('total');
  totalElement.textContent = totalCompra.toFixed(2);
}

function enviarPedidoWhatsApp() {
  const numeroWhatsApp = '92993706807';
  let mensagem = 'Gostaria de fazer um pedido: ';

  carrinho.forEach(item => {
    mensagem += `${item.nome} - Quantidade: ${item.quantidade}, `;
  });

  mensagem += `Total: R$ ${totalCompra.toFixed(2)}.`;

  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  window.open(url, '_blank');
} 
  
  