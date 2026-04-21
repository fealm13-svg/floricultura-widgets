(function () {

  // ─────────────────────────────────────────────
  // CONFIGURAÇÃO — produtos complementares
  // ─────────────────────────────────────────────
  var TABS = [
    {
      id: "chocolates",
      label: "Chocolates",
      produtos: [
        { nome: "Ferrero Rocher 50g (4 un.)", preco: "28,00", url: "https://www.floriculturadias.com/adicional-caixa-ferrero-rocher-50g-4-unidades", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/272795208/51tuykmesml-_ac_uf1000-1000_ql80-atcgqz9sk1.png" },
        { nome: "Ferrero Rocher 100g (8 un.)", preco: "45,00", url: "https://www.floriculturadias.com/adicional-caixa-ferrero-rocher-100g-8-unidades", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/187411672/d48ec0941b8498eb1d0528a253dca6e1-oxmrvt.jpg" },
        { nome: "Ferrero Rocher 150g (12 un.)", preco: "70,00", url: "https://www.floriculturadias.com/adicional-caixa-ferrero-rocher-150g-12-unidades", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/383449936/remo-o-de-fundo-24-cchgwhmhvc.png" },
        { nome: "Lindt LINDOR 37g", preco: "32,00", url: "https://www.floriculturadias.com/adicional-chocolate-lindt-lindor-37g", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/275194824/224203-800-450-3xwc2wdfq1.png" },
        { nome: "Lindt LINDOR 75g", preco: "55,00", url: "https://www.floriculturadias.com/adicional-chocolate-lindt-lindor-75g", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/275196262/f5cf57d25f596bed9b37f326e1f66072-j68hok5nsv.jpg" }
      ]
    },
    {
      id: "cartoes",
      label: "Cartões",
      produtos: [
        { nome: "Cartão de Aniversário 11", preco: "10,00", url: "https://www.floriculturadias.com/adicional-cartao-de-aniversario-11", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399969300/mockup-cart-es-3-d0hxhh4kbf.png" },
        { nome: "Cartão de Amor 8", preco: "10,00", url: "https://www.floriculturadias.com/adicional-cartao-de-amor-8-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399970282/mockup-cart-es-5-xzpqinlraf.png" },
        { nome: "Cartão Aniversário 3 + Foto", preco: "12,00", url: "https://www.floriculturadias.com/adicional-cartao-de-aniversario-3-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399969157/mockup-cart-es-9-9trvcmg7bv.png" },
        { nome: "Cartão de Amor 5 + Foto", preco: "12,00", url: "https://www.floriculturadias.com/adicional-cartao-de-amor-5-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399970207/mockup-cart-es-1-ghfzyavt6y.png" },
        { nome: "Cartão Amizade 2 + Foto", preco: "12,00", url: "https://www.floriculturadias.com/adicional-cartao-amizade-2-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399970315/mockup-cart-es-7f5s1r4444.png" }
      ]
    },
    {
      id: "fotos",
      label: "Fotos",
      produtos: [
        { nome: "Polaroid 9x13cm", preco: "9,00", url: "https://www.floriculturadias.com/adicional-foto-estilo-polaroid-9x13cm", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399834007/c-pia-de-remo-o-de-fundo-2-rw7kjklee5.png" },
        { nome: "Foto Personalizada 10x15", preco: "10,00", url: "https://www.floriculturadias.com/adicional-foto-personalizada-10x15", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399832787/c-pia-de-remo-o-de-fundo-5-csa76kphfc.png" },
        { nome: "Polaroid 7,5x10cm (2 un.)", preco: "15,00", url: "https://www.floriculturadias.com/adicional-duas-fotos-estilo-polaroid-75x10cm", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399770557/c-pia-de-remo-o-de-fundo-3-1lam27stm2.png" },
        { nome: "Porta-Retrato + Foto 10x15", preco: "35,00", url: "https://www.floriculturadias.com/adicional-porta-retrato-10x15-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/353041395/porta-retrato-kjlzw1y5jh.png" }
      ]
    },
    {
      id: "pelucias",
      label: "Pelúcias",
      produtos: [
        { nome: "Almofada Emoji 28cm", preco: "35,00", url: "https://www.floriculturadias.com/almofada-emoji-28cm-olhos-apaixonados", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/209580347/olhos1-phicpm.jpg" },
        { nome: "Urso com Laço Médio", preco: "55,00", url: "https://www.floriculturadias.com/adicional-urso-de-pelucia-articulado-com-laco-medio", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/278799398/urso-la-o-m-dio-a-631m2v0fkd.png" },
        { nome: "Urso com Laço Grande", preco: "65,00", url: "https://www.floriculturadias.com/adicional-urso-de-pelucia-articulado-com-laco-grande", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/278445583/urso-grande-doce-de-leite-a-j6c945cigv.png" }
      ]
    },
    {
      id: "canecas",
      label: "Canecas",
      produtos: [
        { nome: "Caneca Pessoas Incríveis", preco: "35,00", url: "https://www.floriculturadias.com/adicional-caneca-de-porcelana-310ml-pessoas-incriveis", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/301618819/design-sem-nome-18-vilgs7w44l.png" },
        { nome: "Caneca Te Amo Hoje e Sempre", preco: "35,00", url: "https://www.floriculturadias.com/adicional-caneca-de-porcelana-310ml-te-amo-hoje-e-sempre", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/377093955/design-sem-nome-22-3o9wyiksih.png" },
        { nome: "Caneca Parabéns!", preco: "35,00", url: "https://www.floriculturadias.com/caneca-de-porcelana-310ml-parabens", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/206620740/picwish-17-fikcks.jpg" },
        { nome: "Caneca Café e Gratidão", preco: "35,00", url: "https://www.floriculturadias.com/caneca-de-porcelana-310ml-cafe-e-gratidao", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/210426058/design-sem-nome--12--fzy0f3at2e.png" },
        { nome: "Caneca Mundo de Chocolate", preco: "35,00", url: "https://www.floriculturadias.com/caneca-de-porcelana-310ml-mundo-de-chocolate", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/206098079/design-sem-nome-17-qg4jiblflm.png" }
      ]
    }
  ];

  // ─────────────────────────────────────────────
  // CONFIGURAÇÃO — regras de tags
  // ─────────────────────────────────────────────
  // Ordem importa: regras mais específicas (duas palavras) vêm primeiro
  var REGRAS_TAGS = [
    {
      teste: function (t) { return contemPalavra(t, "caneca") && contemPersonalizada(t); },
      cor: "#d72e4e", texto: "1 Dia Útil",
      tooltip: "Necessário pedir com 1 dia de antecedência"
    },
    {
      teste: function (t) { return contemPalavra(t, "kit") && contemPersonalizada(t); },
      cor: "#d72e4e", texto: "1 Dia Útil",
      tooltip: "Necessário pedir com 1 dia de antecedência"
    },
    {
      teste: function (t) { return contemPalavra(t, "cesta"); },
      cor: "#d72e4e", texto: "1 Dia Útil",
      tooltip: "Necessário pedir com 1 dia de antecedência"
    },
    {
      teste: function (t) { return contemPalavra(t, "arranjo") || contemPalavra(t, "buquê") || contemPalavra(t, "buque") || contemPalavra(t, "kit"); },
      cor: "#72cd41", texto: "Pronta Entrega",
      tooltip: "Disponível para agendamento no mesmo dia"
    }
  ];

  function contemPalavra(titulo, palavra) {
    return titulo.toLowerCase().indexOf(palavra.toLowerCase()) !== -1;
  }

  function contemPersonalizada(titulo) {
    var t = titulo.toLowerCase();
    return t.indexOf("personalizada") !== -1 || t.indexOf("personalizado") !== -1;
  }

  function getRegra(titulo) {
    for (var i = 0; i < REGRAS_TAGS.length; i++) {
      if (REGRAS_TAGS[i].teste(titulo)) return REGRAS_TAGS[i];
    }
    return null;
  }

  // ─────────────────────────────────────────────
  // CSS GLOBAL
  // ─────────────────────────────────────────────
  function injetarCSS() {
    if (document.getElementById("fd-adicionais-css")) return;
    var s = document.createElement("style");
    s.id = "fd-adicionais-css";
    s.innerHTML = [
      ".fd-tag{position:absolute;top:8px;left:8px;z-index:10;font-size:9px;font-weight:600;color:#fff;padding:2px 6px;border-radius:3px;cursor:default;white-space:nowrap;line-height:1.4;}",
      ".fd-tag-wrap{position:relative;display:inline-block;}",
      ".fd-tooltip{display:none;position:absolute;top:calc(100% + 5px);left:0;background:#222;color:#fff;font-size:11px;padding:5px 10px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none;line-height:1.4;}",
      ".fd-tag-wrap:hover .fd-tooltip{display:block;}",

      /* Garante posição relativa nos cards de listagem */
      ".produto-imagem,.item-imagem,.produto-item .imagem,.listagem-item .imagem{position:relative!important;}",

      /* ── Seção de complementos ── */
      "#fd-complementos{margin:28px 0 20px;font-family:inherit;}",
      "#fd-complementos .fd-comp-titulo{font-size:15px;font-weight:600;color:#333;margin-bottom:12px;}",
      "#fd-complementos .fd-tabs{display:flex;gap:4px;flex-wrap:wrap;border-bottom:1px solid #e0e0e0;margin-bottom:14px;}",
      "#fd-complementos .fd-tab{background:none;border:none;border-bottom:2px solid transparent;padding:7px 13px;font-size:13px;color:#666;cursor:pointer;margin-bottom:-1px;transition:color .15s,border-color .15s;}",
      "#fd-complementos .fd-tab.ativo{color:#a91537;border-bottom-color:#a91537;font-weight:600;}",
      "#fd-complementos .fd-tab:hover:not(.ativo){color:#a91537;}",
      "#fd-complementos .fd-panel{display:none;}",
      "#fd-complementos .fd-panel.ativo{display:block;}",
      "#fd-complementos .fd-cards-scroll{display:flex;gap:10px;overflow-x:auto;padding-bottom:8px;-webkit-overflow-scrolling:touch;scrollbar-width:none;}",
      "#fd-complementos .fd-cards-scroll::-webkit-scrollbar{display:none;}",
      "#fd-complementos .fd-card{border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;text-decoration:none;display:block;flex:0 0 140px;transition:border-color .15s,box-shadow .15s;}",
      "#fd-complementos .fd-card:hover{border-color:#a91537;box-shadow:0 2px 8px rgba(169,21,55,.12);}",
      "#fd-complementos .fd-card img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;}",
      "#fd-complementos .fd-card-info{padding:7px 8px;}",
      "#fd-complementos .fd-card-nome{font-size:11px;color:#333;line-height:1.35;margin-bottom:4px;}",
      "#fd-complementos .fd-card-preco{font-size:12px;color:#a91537;font-weight:600;}",
      "#fd-complementos .fd-card-preco.fd-carregando{color:#aaa;font-weight:400;font-size:11px;}"
    ].join("");
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────
  // MÓDULO 1 — TAGS NOS CARDS DE LISTAGEM
  // ─────────────────────────────────────────────
  function aplicarTagsListagem() {
    // Seletor real do tema: div.listagem-item
    var cards = Array.prototype.slice.call(document.querySelectorAll("div.listagem-item"));
    if (!cards.length) return;

    cards.forEach(function (card) {
      if (card.querySelector(".fd-tag")) return;

      // Nome do produto: div.info-produto ou qualquer link/texto com nome
      var nomeEl = card.querySelector(".info-produto .nome-produto, .nome-produto, .info-produto a");
      var titulo = nomeEl ? (nomeEl.innerText || nomeEl.textContent || "").trim() : "";
      if (!titulo) return;

      var regra = getRegra(titulo);
      if (!regra) return;

      // Container da imagem: div.imagem-produto (não forçar position — o tema já trata)
      var imgWrap = card.querySelector(".imagem-produto");
      if (!imgWrap) return;
      imgWrap.style.position = "relative";

      var wrap = document.createElement("span");
      wrap.className = "fd-tag-wrap";
      var tag = document.createElement("span");
      tag.className = "fd-tag";
      tag.style.background = regra.cor;
      tag.textContent = regra.texto;
      var tip = document.createElement("span");
      tip.className = "fd-tooltip";
      tip.textContent = regra.tooltip;
      wrap.appendChild(tag);
      wrap.appendChild(tip);
      imgWrap.appendChild(wrap);
    });
  }

  // ─────────────────────────────────────────────
  // MÓDULO 2 — TAG NA PÁGINA DO PRODUTO
  // ─────────────────────────────────────────────
  function aplicarTagProduto() {
    // Seletor real do tema: div.conteiner-imagem
    var imgWrap = document.querySelector(".conteiner-imagem");
    if (!imgWrap) return;
    if (imgWrap.querySelector(".fd-tag")) return;

    // Título: h1 dentro de span12.produto
    var tituloEl = document.querySelector(".span12.produto h1, .info-principal-produto h1, h1.titulo");
    if (!tituloEl) return;
    var titulo = (tituloEl.innerText || tituloEl.textContent || "").trim();
    var regra = getRegra(titulo);
    if (!regra) return;

    // conteiner-imagem já tem position relativa no tema — não forçar
    var wrap = document.createElement("span");
    wrap.className = "fd-tag-wrap";
    var tag = document.createElement("span");
    tag.className = "fd-tag";
    tag.style.background = regra.cor;
    tag.style.fontSize = "11px";
    tag.style.padding = "3px 9px";
    tag.textContent = regra.texto;
    var tip = document.createElement("span");
    tip.className = "fd-tooltip";
    tip.textContent = regra.tooltip;
    wrap.appendChild(tag);
    wrap.appendChild(tip);
    imgWrap.appendChild(wrap);
  }

  // ─────────────────────────────────────────────
  // MÓDULO 3 — SEÇÃO DE COMPLEMENTOS (página produto)
  // ─────────────────────────────────────────────
  function construirComplementos() {
    // Detecta página de produto pelo seletor real do tema
    var isProduto = !!(document.querySelector(".abas-custom") || document.querySelector("div#descricao"));
    if (!isProduto) return;
    if (document.getElementById("fd-complementos")) return;

    // Ponto de inserção: após div.abas-custom (bloco das abas Descrição/Avaliações)
    var ancora = document.querySelector(".abas-custom");
    if (!ancora) return;

    var secao = document.createElement("div");
    secao.id = "fd-complementos";

    var titulo = document.createElement("p");
    titulo.className = "fd-comp-titulo";
    titulo.textContent = "Complete seu presente \uD83C\uDF80";
    secao.appendChild(titulo);

    var tabsEl = document.createElement("div");
    tabsEl.className = "fd-tabs";
    secao.appendChild(tabsEl); // tabs entram na secao ANTES dos painéis

    var panelEls = []; // coleta painéis separadamente para inserir depois

    TABS.forEach(function (tab, idx) {
      // Tab button
      var btn = document.createElement("button");
      btn.className = "fd-tab" + (idx === 0 ? " ativo" : "");
      btn.textContent = tab.label;
      btn.setAttribute("data-tab", tab.id);
      btn.addEventListener("click", function () {
        document.querySelectorAll("#fd-complementos .fd-tab").forEach(function (b) { b.classList.remove("ativo"); });
        document.querySelectorAll("#fd-complementos .fd-panel").forEach(function (p) { p.classList.remove("ativo"); });
        btn.classList.add("ativo");
        document.getElementById("fd-panel-" + tab.id).classList.add("ativo");
      });
      tabsEl.appendChild(btn);

      // Painel com scroll horizontal
      var panel = document.createElement("div");
      panel.className = "fd-panel" + (idx === 0 ? " ativo" : "");
      panel.id = "fd-panel-" + tab.id;

      var scroll = document.createElement("div");
      scroll.className = "fd-cards-scroll";

      tab.produtos.forEach(function (prod) {
        var card = document.createElement("a");
        card.className = "fd-card";
        card.href = prod.url;

        var img = document.createElement("img");
        img.src = prod.img;
        img.alt = prod.nome;
        img.loading = "lazy";

        var info = document.createElement("div");
        info.className = "fd-card-info";

        var nome = document.createElement("div");
        nome.className = "fd-card-nome";
        nome.textContent = prod.nome;

        var preco = document.createElement("div");
        preco.className = "fd-card-preco";
        preco.textContent = "R$ " + prod.preco;

        info.appendChild(nome);
        info.appendChild(preco);
        card.appendChild(img);
        card.appendChild(info);
        scroll.appendChild(card);
      });

      panel.appendChild(scroll);
      panelEls.push(panel);
    });

    // Adiciona todos os painéis APÓS as tabs
    panelEls.forEach(function (p) { secao.appendChild(p); });

    ancora.insertAdjacentElement("afterend", secao);
  }

  // ─────────────────────────────────────────────
  // INIT
  // ─────────────────────────────────────────────
  function init() {
    injetarCSS();
    aplicarTagsListagem();
    aplicarTagProduto();
    construirComplementos();
  }

  // Aguarda DOM pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Observer para páginas com carregamento dinâmico (SPA / infinite scroll)
  if (window.MutationObserver) {
    var debounce = null;
    var observer = new MutationObserver(function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () {
        aplicarTagsListagem();
        aplicarTagProduto();
        construirComplementos();
      }, 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

})();
