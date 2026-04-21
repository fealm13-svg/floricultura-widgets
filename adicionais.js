(function () {

  const CONFIG = {
    categorias: {
      chocolates: '/destaque-chocolates',
      cartoes: '/destaque-cartoes',
      fotos: '/destaque-fotos',
      pelucias: '/destaque-pelucias',
      canecas: '/destaque-canecas'
    },
    limite: 5
  };

  function injectCSS() {
    const css = `
    .box-adicionais {
      margin-top: 40px;
      font-family: inherit;
    }

    .box-adicionais h3 {
      font-size: 20px;
      margin-bottom: 15px;
      font-weight: 600;
    }

    .abas {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      margin-bottom: 20px;
    }

    .aba-btn {
      border: 1px solid #ddd;
      background: #fff;
      padding: 8px 14px;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      white-space: nowrap;
      transition: 0.2s;
    }

    .aba-btn.active {
      background: #111;
      color: #fff;
      border-color: #111;
    }

    .aba-content {
      display: none;
      grid-template-columns: repeat(5, 1fr);
      gap: 15px;
    }

    .aba-content.active {
      display: grid;
    }

    .produto-extra {
      border: 1px solid #eee;
      border-radius: 10px;
      padding: 10px;
      background: #fff;
      transition: 0.2s;
    }

    .produto-extra:hover {
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }

    .produto-extra img {
      width: 100%;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .produto-extra p {
      font-size: 13px;
      margin: 5px 0;
      height: 34px;
      overflow: hidden;
    }

    .produto-extra span {
      font-weight: bold;
      font-size: 14px;
      color: #000;
    }

    @media (max-width: 768px) {
      .aba-content {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    `;

    const style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }

  function injectHTML() {
    const html = `
      <div class="box-adicionais">
        <h3>Complete seu presente 🎁</h3>

        <div class="abas">
          <button class="aba-btn active" data-aba="chocolates">Chocolates</button>
          <button class="aba-btn" data-aba="cartoes">Cartões Prontos</button>
          <button class="aba-btn" data-aba="fotos">Fotos Personalizadas</button>
          <button class="aba-btn" data-aba="pelucias">Pelúcias</button>
          <button class="aba-btn" data-aba="canecas">Canecas</button>
        </div>

        <div id="chocolates" class="aba-content active"></div>
        <div id="cartoes" class="aba-content"></div>
        <div id="fotos" class="aba-content"></div>
        <div id="pelucias" class="aba-content"></div>
        <div id="canecas" class="aba-content"></div>
      </div>
    `;

    const descricao = document.querySelector('.descricao-produto, .product-description');

    if (descricao) {
      descricao.insertAdjacentHTML('afterend', html);
    }
  }

  function setupTabs() {
    document.querySelectorAll('.aba-btn').forEach(btn => {
      btn.addEventListener('click', () => {

        document.querySelectorAll('.aba-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.aba-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(btn.dataset.aba).classList.add('active');

      });
    });
  }

  async function carregarProdutos(categoria, containerId) {
    try {
      const res = await fetch(CONFIG.categorias[categoria]);
      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const produtos = doc.querySelectorAll('.listagem-item');
      const container = document.getElementById(containerId);

      produtos.forEach((produto, index) => {
        if (index >= CONFIG.limite) return;

        const link = produto.querySelector('.produto-sobrepor')?.href || '#';
        const img = produto.querySelector('.imagem-produto img')?.src || '';
        const nome = produto.querySelector('.info-produto')?.innerText || '';
        const preco = produto.querySelector('.preco-promocional, .preco-venda')?.innerText || '';

        container.innerHTML += `
          <div class="produto-extra">
            <a href="${link}">
              <img src="${img}">
              <p>${nome}</p>
              <span>${preco}</span>
            </a>
          </div>
        `;
      });

    } catch (e) {
      console.error('Erro ao carregar produtos', e);
    }
  }

  function init() {
    injectCSS();
    injectHTML();
    setupTabs();

    carregarProdutos('chocolates', 'chocolates');
    carregarProdutos('cartoes', 'cartoes');
    carregarProdutos('fotos', 'fotos');
    carregarProdutos('pelucias', 'pelucias');
    carregarProdutos('canecas', 'canecas');
  }

  window.addEventListener('load', init);

})();
