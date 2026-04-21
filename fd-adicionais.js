(function () {

  // ─────────────────────────────────────────────
  // CONFIGURAÇÃO — produtos complementares
  // ─────────────────────────────────────────────
  var TABS = [
    {
      id: "chocolates",
      label: "Chocolates",
      produtos: [
        { nome: "Ferrero Rocher 50g (4 un.)", url: "https://www.floriculturadias.com/adicional-caixa-ferrero-rocher-50g-4-unidades", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/272795208/51tuykmesml-_ac_uf1000-1000_ql80-atcgqz9sk1.png", id: "272795208" },
        { nome: "Ferrero Rocher 100g (8 un.)", url: "https://www.floriculturadias.com/adicional-caixa-ferrero-rocher-100g-8-unidades", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/187411672/d48ec0941b8498eb1d0528a253dca6e1-oxmrvt.jpg", id: "187411672" },
        { nome: "Ferrero Rocher 150g (12 un.)", url: "https://www.floriculturadias.com/adicional-caixa-ferrero-rocher-150g-12-unidades", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/383449936/remo-o-de-fundo-24-cchgwhmhvc.png", id: "383449936" },
        { nome: "Lindt LINDOR 37g", url: "https://www.floriculturadias.com/adicional-chocolate-lindt-lindor-37g", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/275194824/224203-800-450-3xwc2wdfq1.png", id: "275194824" },
        { nome: "Lindt LINDOR 75g", url: "https://www.floriculturadias.com/adicional-chocolate-lindt-lindor-75g", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/275196262/f5cf57d25f596bed9b37f326e1f66072-j68hok5nsv.jpg", id: "275196262" }
      ]
    },
    {
      id: "cartoes",
      label: "Cartões",
      produtos: [
        { nome: "Cartão de Aniversário 11", url: "https://www.floriculturadias.com/adicional-cartao-de-aniversario-11", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399969300/mockup-cart-es-3-d0hxhh4kbf.png", id: "399969300" },
        { nome: "Cartão de Amor 8", url: "https://www.floriculturadias.com/adicional-cartao-de-amor-8-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399970282/mockup-cart-es-5-xzpqinlraf.png", id: "399970282" },
        { nome: "Cartão Aniversário 3 + Foto", url: "https://www.floriculturadias.com/adicional-cartao-de-aniversario-3-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399969157/mockup-cart-es-9-9trvcmg7bv.png", id: "399969157" },
        { nome: "Cartão de Amor 5 + Foto", url: "https://www.floriculturadias.com/adicional-cartao-de-amor-5-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399970207/mockup-cart-es-1-ghfzyavt6y.png", id: "399970207" },
        { nome: "Cartão Amizade 2 + Foto", url: "https://www.floriculturadias.com/adicional-cartao-amizade-2-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399970315/mockup-cart-es-7f5s1r4444.png", id: "399970315" }
      ]
    },
    {
      id: "fotos",
      label: "Fotos",
      produtos: [
        { nome: "Polaroid 9x13cm", url: "https://www.floriculturadias.com/adicional-foto-estilo-polaroid-9x13cm", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399834007/c-pia-de-remo-o-de-fundo-2-rw7kjklee5.png", id: "399834007" },
        { nome: "Foto Personalizada 10x15", url: "https://www.floriculturadias.com/adicional-foto-personalizada-10x15", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399832787/c-pia-de-remo-o-de-fundo-5-csa76kphfc.png", id: "399832787" },
        { nome: "Polaroid 7,5x10cm (2 un.)", url: "https://www.floriculturadias.com/adicional-duas-fotos-estilo-polaroid-75x10cm", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/399770557/c-pia-de-remo-o-de-fundo-3-1lam27stm2.png", id: "399770557" },
        { nome: "Porta-Retrato + Foto 10x15", url: "https://www.floriculturadias.com/adicional-porta-retrato-10x15-com-foto-personalizada", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/353041395/porta-retrato-kjlzw1y5jh.png", id: "353041395" }
      ]
    },
    {
      id: "pelucias",
      label: "Pelúcias",
      produtos: [
        { nome: "Almofada Emoji 28cm", url: "https://www.floriculturadias.com/almofada-emoji-28cm-olhos-apaixonados", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/209580347/olhos1-phicpm.jpg", id: "209580347" },
        { nome: "Urso com Laço Médio", url: "https://www.floriculturadias.com/adicional-urso-de-pelucia-articulado-com-laco-medio", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/278799398/urso-la-o-m-dio-a-631m2v0fkd.png", id: "278799398" },
        { nome: "Urso com Laço Grande", url: "https://www.floriculturadias.com/adicional-urso-de-pelucia-articulado-com-laco-grande", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/278445583/urso-grande-doce-de-leite-a-j6c945cigv.png", id: "278445583" }
      ]
    },
    {
      id: "canecas",
      label: "Canecas",
      produtos: [
        { nome: "Caneca Pessoas Incríveis", url: "https://www.floriculturadias.com/adicional-caneca-de-porcelana-310ml-pessoas-incriveis", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/301618819/design-sem-nome-18-vilgs7w44l.png", id: "301618819" },
        { nome: "Caneca Te Amo Hoje e Sempre", url: "https://www.floriculturadias.com/adicional-caneca-de-porcelana-310ml-te-amo-hoje-e-sempre", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/377093955/design-sem-nome-22-3o9wyiksih.png", id: "377093955" },
        { nome: "Caneca Parabéns!", url: "https://www.floriculturadias.com/caneca-de-porcelana-310ml-parabens", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/206620740/picwish-17-fikcks.jpg", id: "206620740" },
        { nome: "Caneca Café e Gratidão", url: "https://www.floriculturadias.com/caneca-de-porcelana-310ml-cafe-e-gratidao", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/210426058/design-sem-nome--12--fzy0f3at2e.png", id: "210426058" },
        { nome: "Caneca Mundo de Chocolate", url: "https://www.floriculturadias.com/caneca-de-porcelana-310ml-mundo-de-chocolate", img: "https://cdn.awsli.com.br/1000x1000/2498/2498336/produto/206098079/design-sem-nome-17-qg4jiblflm.png", id: "206098079" }
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
      ".fd-tag{position:absolute;top:8px;left:8px;z-index:10;font-size:11px;font-weight:600;color:#fff;padding:3px 9px;border-radius:4px;cursor:default;white-space:nowrap;line-height:1.4;}",
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
      "#fd-complementos .fd-panel.ativo{display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:10px;}",
      "#fd-complementos .fd-card{border:1px solid #e8e8e8;border-radius:6px;overflow:hidden;text-decoration:none;display:block;transition:border-color .15s,box-shadow .15s;}",
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
    // Seletores comuns da Loja Integrada para cards de produto na listagem
    var seletoresCard = [
      ".produto-item",
      ".listagem-item",
      ".item-produto",
      ".product-item"
    ];
    var seletoresNome = [
      ".nome-produto",
      ".produto-nome",
      ".item-nome",
      ".product-name",
      "h2.nome",
      "h3.nome",
      ".nome a"
    ];
    var seletoresImagem = [
      ".produto-imagem",
      ".item-imagem",
      ".imagem",
      ".product-image",
      ".foto-produto"
    ];

    var cards = [];
    for (var i = 0; i < seletoresCard.length; i++) {
      var found = document.querySelectorAll(seletoresCard[i]);
      if (found.length > 0) { cards = Array.prototype.slice.call(found); break; }
    }
    if (!cards.length) return;

    cards.forEach(function (card) {
      if (card.querySelector(".fd-tag")) return; // já processado

      var titulo = "";
      for (var j = 0; j < seletoresNome.length; j++) {
        var el = card.querySelector(seletoresNome[j]);
        if (el) { titulo = (el.innerText || el.textContent || "").trim(); break; }
      }
      if (!titulo) return;

      var regra = getRegra(titulo);
      if (!regra) return;

      var imgWrap = null;
      for (var k = 0; k < seletoresImagem.length; k++) {
        imgWrap = card.querySelector(seletoresImagem[k]);
        if (imgWrap) break;
      }
      // fallback: primeiro elemento com posição relativa ou a própria âncora
      if (!imgWrap) imgWrap = card.querySelector("a") || card;

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
    // Pega o título do produto
    var tituloEl = document.querySelector("h1.nome-produto,h1.product-name,h1.titulo-produto,.pagina-produto h1,.produto-detalhe h1");
    if (!tituloEl) return;
    var titulo = (tituloEl.innerText || tituloEl.textContent || "").trim();
    var regra = getRegra(titulo);
    if (!regra) return;

    // Tenta encontrar o container da imagem principal
    var seletoresImg = [
      ".foto-produto-principal",
      ".produto-imagem-principal",
      ".product-main-image",
      ".imagem-principal",
      "#imagem-produto",
      ".galeria-produto .ativa",
      ".produto-foto"
    ];
    var imgWrap = null;
    for (var i = 0; i < seletoresImg.length; i++) {
      imgWrap = document.querySelector(seletoresImg[i]);
      if (imgWrap) break;
    }
    if (!imgWrap) return;
    if (imgWrap.querySelector(".fd-tag")) return;

    imgWrap.style.position = "relative";
    var wrap = document.createElement("span");
    wrap.className = "fd-tag-wrap";
    var tag = document.createElement("span");
    tag.className = "fd-tag";
    tag.style.background = regra.cor;
    tag.style.fontSize = "13px";
    tag.style.padding = "5px 12px";
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
  function buscarPreco(id, el) {
    fetch("https://www.floriculturadias.com/api/v1/products/" + id + "/")
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var preco = d && d.price ? parseFloat(d.price) : null;
        if (!preco && d && d.variations && d.variations.length) {
          preco = parseFloat(d.variations[0].price);
        }
        if (preco && preco > 0) {
          el.textContent = "R$ " + preco.toFixed(2).replace(".", ",");
          el.classList.remove("fd-carregando");
        } else {
          el.textContent = "";
        }
      })
      .catch(function () { el.textContent = ""; });
  }

  function construirComplementos() {
    // Detecta página de produto
    var isProduto = !!(
      document.querySelector(".pagina-produto") ||
      document.querySelector(".produto-detalhe") ||
      document.querySelector(".product-detail") ||
      document.querySelector("#produto-detalhe") ||
      (window.location.pathname.indexOf("/produto") !== -1) ||
      (window.location.pathname.replace(/\/$/, "").split("/").length === 2 &&
       window.location.pathname.indexOf("/categoria") === -1 &&
       window.location.pathname.indexOf("/busca") === -1 &&
       window.location.pathname !== "/")
    );
    if (!isProduto) return;
    if (document.getElementById("fd-complementos")) return;

    // Ponto de inserção: após a descrição do produto
    var ancora = document.querySelector(
      ".descricao-produto,.product-description,.produto-descricao,#descricao-produto,.description-product"
    );
    if (!ancora) {
      // fallback: após o formulário de compra
      ancora = document.querySelector("form.produto-compra,form.buy-form,.produto-form,#form-produto");
    }
    if (!ancora) return;

    var secao = document.createElement("div");
    secao.id = "fd-complementos";

    var titulo = document.createElement("p");
    titulo.className = "fd-comp-titulo";
    titulo.textContent = "Complete seu presente \uD83C\uDF80";
    secao.appendChild(titulo);

    var tabsEl = document.createElement("div");
    tabsEl.className = "fd-tabs";

    var paineis = [];

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

      // Painel
      var panel = document.createElement("div");
      panel.className = "fd-panel" + (idx === 0 ? " ativo" : "");
      panel.id = "fd-panel-" + tab.id;

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
        preco.className = "fd-card-preco fd-carregando";
        preco.textContent = "carregando...";
        preco.id = "fd-preco-" + prod.id;

        info.appendChild(nome);
        info.appendChild(preco);
        card.appendChild(img);
        card.appendChild(info);
        panel.appendChild(card);

        paineis.push({ id: prod.id, el: preco });
      });

      secao.appendChild(tabsEl);
      secao.appendChild(panel);
    });

    ancora.insertAdjacentElement("afterend", secao);

    // Busca preços via API (todos de uma vez, com pequeno delay entre eles)
    paineis.forEach(function (p, i) {
      setTimeout(function () { buscarPreco(p.id, p.el); }, i * 120);
    });
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
