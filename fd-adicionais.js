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
      teste: function (t) { return contemPalavra(t, "importadas"); },
      cor: "#f3e52e", corTexto: "#d72e4e", borda: "#d72e4e",
      texto: "Rosas Importadas",
      tooltip: "Rosas Colombianas Premium"
    },
    {
      teste: function (t) { return contemPalavra(t, "adicional"); },
      cor: "#036bfc", texto: "Produto Adicional",
      tooltip: "Esse produto não é vendido separadamente"
    },
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
      ".fd-tag-wrap{position:absolute;top:8px;left:8px;z-index:10;display:block;}",
      ".fd-tooltip{display:none;position:absolute;top:calc(100% + 5px);left:0;background:#222;color:#fff;font-size:11px;padding:5px 10px;border-radius:4px;white-space:nowrap;z-index:100;pointer-events:none;line-height:1.4;}",
      ".fd-tag-wrap:hover .fd-tooltip{display:block;}",
      ".fd-tag{font-size:9px;font-weight:600;color:#fff;padding:2px 6px;border-radius:3px;cursor:default;white-space:nowrap;line-height:1.4;display:inline-block;}",

      /* Garante position relativa no container da imagem do produto */
      ".conteiner-imagem{position:relative!important;}",

      /* Fix campo de busca mobile */
      "@media(max-width:767px){.inferior.row-fluid{position:relative!important;z-index:1;min-height:50px;}.busca.borda-alpha{position:relative!important;width:100%!important;top:auto!important;left:auto!important;}}",

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

  // Aplica cor de fundo, cor de texto e borda opcional na tag
  function aplicarEstiloTag(tag, regra) {
    tag.style.background = regra.cor;
    if (regra.corTexto) tag.style.color = regra.corTexto;
    if (regra.borda) tag.style.border = "1px solid " + regra.borda;
    tag.textContent = regra.texto;
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
      aplicarEstiloTag(tag, regra);
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

    // Força position relative inline para garantir que o absolute da tag funcione
    imgWrap.style.position = "relative";
    var wrap = document.createElement("span");
    wrap.className = "fd-tag-wrap";
    var tag = document.createElement("span");
    tag.className = "fd-tag";
    aplicarEstiloTag(tag, regra);
    tag.style.fontSize = "11px";
    tag.style.padding = "3px 9px";
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
  // MÓDULO 5 — PERSONALIZADOR DE FOTOS V2
  // Regras:
  //   • nome com "foto" + "polaroid" => personalizador Polaroid
  //   • número associado a fotos/polaroids (ou "un.") => fotos por unidade
  //   • nome com apenas "foto" => upload simples 10x15
  //   • nada é enviado ao Cloudinary nesta página
  //   • personalizações ficam no IndexedDB até o checkout
  // ─────────────────────────────────────────────
  var FD_FOTO_DB = "fd_fotos_db_v1";
  var FD_FOTO_STORE = "personalizacoes";
  var FD_FOTO_MODULE_READY = false;
  var FD_FOTO_QTY_TIMER = null;

  var FD_FONTES = {
    "Dancing Script": { base:120, min:72, weight:600 },
    "Cormorant Garamond": { base:110, min:66, weight:600 },
    "Special Elite": { base:92, min:58, weight:400 },
    "Libre Baskerville": { base:88, min:56, weight:700 },
    "Montserrat": { base:90, min:56, weight:600 }
  };

  var FD_NUMEROS_PT = {
    "uma":1,"um":1,"duas":2,"dois":2,"tres":3,"três":3,"quatro":4,
    "cinco":5,"seis":6,"sete":7,"oito":8,"nove":9,"dez":10,"onze":11,"doze":12
  };

  function fdFotoTexto(el){
    return el ? (el.innerText||el.textContent||"").replace(/\s+/g," ").trim() : "";
  }

  // Aceita "foto" e "fotos" como palavras completas, sem ativar em trechos
  // de outras palavras (por exemplo, "fotografia").
  function fdFotoTemPalavraFoto(titulo){
    return /(^|[^a-zà-ÿ0-9])fotos?(?=$|[^a-zà-ÿ0-9])/i.test(titulo||"");
  }

  function fdFotoTitulo(){
    // Procura somente o título do produto exibido na página. A implementação
    // anterior varria todos os H1 e preferia qualquer texto com "foto" — por
    // exemplo, um produto recomendado — mesmo quando o produto atual não era
    // uma foto.
    var containers=[".info-principal-produto",".produto-principal",".span12.produto",".pagina-produto .produto"];
    var sels=["h1[itemprop='name']","h1",".nome-produto",".titulo-produto"];
    for(var i=0;i<containers.length;i++){
      var main=document.querySelector(containers[i]);
      if(!main)continue;
      for(var j=0;j<sels.length;j++){
        var el=main.querySelector(sels[j]),txt=fdFotoTexto(el);
        if(txt)return txt;
      }
    }
    var fallback=document.querySelector("h1[itemprop='name'], h1.titulo");
    return fdFotoTexto(fallback);
  }

  function fdFotoTipo(titulo){
    var t=(titulo||"").toLowerCase();
    var temFoto=fdFotoTemPalavraFoto(titulo);
    var temPolaroid=t.indexOf("polaroid")!==-1;
    if(temFoto&&temPolaroid)return "polaroid";
    if(temFoto)return "foto10x15";
    return null;
  }

  function fdFotoTemEditor10x15(titulo){
    var t=(titulo||"").toLowerCase().replace(/\s+/g,"");
    return t.indexOf("10x15")!==-1;
  }

  function fdFotoExtrairQuantidade(texto){
    var t=(texto||"").toLowerCase();
    var m=t.match(/\b(\d+)\s*(?:fotos?|polaroids?)\b/i);
    if(m)return Math.max(1,Math.min(12,parseInt(m[1],10)));
    m=t.match(/\b(\d+)\s*(?:un|unid|unidades?)\.?\b/i);
    if(m)return Math.max(1,Math.min(12,parseInt(m[1],10)));
    var words=Object.keys(FD_NUMEROS_PT);
    for(var i=0;i<words.length;i++){
      var re=new RegExp("\\b"+words[i]+"\\s*(?:fotos?|polaroids?)\\b","i");
      if(re.test(t))return FD_NUMEROS_PT[words[i]];
    }
    return 1;
  }

  function fdFotoQuantidadePorUnidade(titulo){
    return fdFotoExtrairQuantidade(titulo);
  }

  function fdFotoQuantidadeProduto(){
    var sels=["#quantidade","input[name='quantity']","input[name='qty']","input[name='qtd']","input[name='quantidade']","input[data-quantity]",".quantidade input",".quantity input",".qtd input",".quantidade-produto input",".produto-quantidade input",".js-quantity",".js-product-quantity",".quantity-input","#product-quantity","input.quantidade","input.input-small"];
    for(var i=0;i<sels.length;i++){
      var els=document.querySelectorAll(sels[i]);
      for(var j=0;j<els.length;j++){
        var el=els[j],r=el.getBoundingClientRect?el.getBoundingClientRect():null;
        if(r&&(r.width===0||r.height===0))continue;
        var n=parseInt(el.value,10);if(n>0&&n<=999)return n;
      }
    }
    var nums=document.querySelectorAll("input[type='number']");
    for(var k=0;k<nums.length;k++){
      var e=nums[k],rr=e.getBoundingClientRect?e.getBoundingClientRect():null;
      if(rr&&(rr.width===0||rr.height===0))continue;
      var key=((e.id||"")+" "+(e.name||"")+" "+(e.className||"")).toLowerCase();
      if(/cep|frete|parcel|price|preco|valor/.test(key))continue;
      var q=parseInt(e.value,10);if(q>0&&q<=999)return q;
    }
    return 1;
  }

  function fdFotoEsc(v){return String(v).replace(/[&<>\"']/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m];});}

  function fdFotoGerarProtocolo(){
    var p=null;
    try{p=sessionStorage.getItem("fdc_protocolo");}catch(e){}
    if(p)return p;
    var d=new Date();
    p="FD-"+d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")+"-"+String(d.getHours()).padStart(2,"0")+String(d.getMinutes()).padStart(2,"0");
    try{sessionStorage.setItem("fdc_protocolo",p);}catch(e){}
    return p;
  }

  function fdFotoDB(){
    return new Promise(function(resolve,reject){
      var r=indexedDB.open(FD_FOTO_DB,1);
      r.onupgradeneeded=function(){
        var db=r.result;
        if(!db.objectStoreNames.contains(FD_FOTO_STORE))db.createObjectStore(FD_FOTO_STORE,{keyPath:"id"});
      };
      r.onsuccess=function(){resolve(r.result);};
      r.onerror=function(){reject(r.error||new Error("Não foi possível abrir o armazenamento local."));};
    });
  }

  function fdFotoDBPut(obj){
    return fdFotoDB().then(function(db){return new Promise(function(resolve,reject){
      var tx=db.transaction(FD_FOTO_STORE,"readwrite");
      tx.objectStore(FD_FOTO_STORE).put(obj);
      tx.oncomplete=function(){db.close();resolve();};
      tx.onerror=function(){db.close();reject(tx.error||new Error("Falha ao guardar a personalização."));};
    });});
  }

  function fdFotoGetPendingIds(){try{return JSON.parse(sessionStorage.getItem("fd_fotos_pendentes")||"[]");}catch(e){return [];}}
  function fdFotoSetPendingIds(ids){try{sessionStorage.setItem("fd_fotos_pendentes",JSON.stringify(ids));}catch(e){}}
  function fdFotoAddPendingId(id){var a=fdFotoGetPendingIds();if(a.indexOf(id)===-1)a.push(id);fdFotoSetPendingIds(a);}
  function fdFotoAddPendingGroup(group){
    try{
      var a=JSON.parse(sessionStorage.getItem("fd_fotos_grupos_atuais")||"[]");
      if(a.indexOf(group)===-1)a.push(group);
      sessionStorage.setItem("fd_fotos_grupos_atuais",JSON.stringify(a));
      sessionStorage.setItem("fd_fotos_grupo_atual",group);
    }catch(e){}
  }

  function fdFotoEstadoVazio(){
    return {blob:null,fileName:"",xNorm:0,yNorm:0,scale:1,orientation:"vertical",ins:false,text:"",font:"Dancing Script",fontScale:.75};
  }

  function fdFotoQuantidadeTotal(tipo,titulo){
    return tipo==="polaroid" ? fdFotoQuantidadePorUnidade(titulo)*fdFotoQuantidadeProduto() : fdFotoQuantidadeProduto();
  }

    var FD_FONT_CSS_ID="fd-foto-google-fonts";
  function fdFotoGarantirFontes(){
    if(!document.getElementById(FD_FONT_CSS_ID)){
      var l=document.createElement("link");
      l.id=FD_FONT_CSS_ID;
      l.rel="stylesheet";
      l.href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Dancing+Script:wght@500;600;700&family=Libre+Baskerville:wght@400;700&family=Montserrat:wght@500;600&family=Special+Elite&display=swap";
      document.head.appendChild(l);
    }
    return new Promise(function(resolve){
      var tentativas=0;
      function done(){
        if(document.fonts&&document.fonts.ready){
          document.fonts.ready.then(function(){resolve();}).catch(function(){resolve();});
        }else{
          resolve();
        }
      }
      (function check(){
        if(document.fonts && document.fonts.check('20px "Dancing Script"')){
          done();
          return;
        }
        tentativas++;
        if(tentativas>=30){done();return;}
        setTimeout(check,100);
      })();
    });
  }

  async function fdFotoCarregarFonte(font){
    await fdFotoGarantirFontes();
    if(document.fonts&&document.fonts.load){
      try{
        await document.fonts.load("600 120px \"" + font + "\"");
      }catch(e){}
    }
  }

  function fdFotoAdaptiveSize(text,font,scale,maxWidth){
    var f=FD_FONTES[font]||FD_FONTES["Dancing Script"];
    var probe=document.createElement("span");
    probe.style.position="fixed";probe.style.visibility="hidden";probe.style.whiteSpace="nowrap";probe.style.left="-99999px";probe.style.top="-99999px";
    probe.style.fontFamily='"'+font+'"';probe.style.fontWeight=f.weight;probe.textContent=text||"";
    document.body.appendChild(probe);
    var size=f.base*(scale||.75);
    while(size>24){probe.style.fontSize=size+"px";if(probe.getBoundingClientRect().width<=maxWidth)break;size-=1;}
    document.body.removeChild(probe);
    return Math.max(24,size);
  }

  function fdFotoCSS(){
    if(document.getElementById("fd-foto-css"))return;
    var s=document.createElement("style");s.id="fd-foto-css";s.innerHTML=[
      "#fd-foto-personalizador{margin:22px 0;padding:18px;border:1px solid #e4e0de;border-radius:12px;background:#fff;position:relative;z-index:5}",
      "#fd-foto-personalizador .fdp-title{font-size:16px;font-weight:800;color:#a91537;margin:0 0 5px}",
      "#fd-foto-personalizador .fdp-sub{font-size:12px;color:#777;margin-bottom:14px}",
      "#fd-foto-personalizador .fdp-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}",
      "#fd-foto-personalizador .fdp-item{border:1px solid #e5e0de;border-radius:9px;padding:12px}",
      "#fd-foto-personalizador .fdp-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px;font-size:13px;font-weight:800}",
      "#fd-foto-personalizador .fdp-upload{border:2px dashed #d95d78;background:#fffafb;border-radius:9px;padding:14px;text-align:center}",
      "#fd-foto-personalizador input[type=file]{display:none}",
      "#fd-foto-personalizador .fdp-file{font-size:12px;font-weight:700;color:#444;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:9px}",
      "#fd-foto-personalizador .fdp-btn{border-radius:8px;padding:9px 12px;font-weight:800;cursor:pointer;background:#fff;border:1px solid #a91537;color:#a91537}",
      "#fd-foto-personalizador .fdp-btn-main{background:#a91537;color:#fff}",
      "#fd-foto-personalizador .fdp-actions{display:flex;gap:7px;justify-content:center;flex-wrap:wrap}",
      "#fd-foto-personalizador .fdp-mini{display:none;margin-top:10px;padding:8px;border-radius:8px;background:#fafafa;text-align:center}",
      "#fd-foto-personalizador .fdp-mini img{max-width:130px;max-height:160px;display:block;margin:auto}",
      "#fd-foto-personalizador .fdp-ok{color:#217448;font-size:12px;font-weight:700}",
      ".fdp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:999999;display:none;align-items:center;justify-content:center;padding:14px}",
      ".fdp-overlay.open{display:flex}",
      ".fdp-editor{width:min(980px,100%);max-height:95vh;overflow:auto;background:#fff;border-radius:15px;box-shadow:0 20px 70px #0007}",
      ".fdp-head{position:sticky;top:0;z-index:3;background:#fff;border-bottom:1px solid #eee;padding:14px 17px;font-weight:800;display:flex;justify-content:space-between;align-items:center}",
      ".fdp-body{display:grid;grid-template-columns:minmax(300px,1fr) 340px;gap:20px;padding:18px}",
      ".fdp-stagearea{background:#f5f5f5;border-radius:12px;padding:18px;display:flex;justify-content:center;align-items:center;min-height:560px}",
      ".fdp-stage{width:min(380px,72vw);background:#fff;padding:10px 10px 19px;box-shadow:0 10px 28px #0002}",
      ".fdp-photo{position:relative;overflow:hidden;background:#ddd;touch-action:none;user-select:none;cursor:grab}",
      ".fdp-photo-polaroid{aspect-ratio:3/3.5}",
      ".fdp-photo-10x15{aspect-ratio:2/3}",
      ".fdp-photo-10x15.fdp-orient-horizontal{aspect-ratio:3/2}",
      ".fdp-photo img{position:absolute;left:50%;top:50%;max-width:none;pointer-events:none;user-select:none;transform-origin:center}",
      ".fdp-caption{height:62px;display:flex;align-items:center;justify-content:center;text-align:center;padding:0 9px;line-height:1;white-space:nowrap;overflow:visible;width:100%}",
      ".fdp-orient-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:15px}",
      ".fdp-orient{border:1px solid #ddd;background:#fff;border-radius:8px;padding:10px 8px;font-weight:800;cursor:pointer;color:#333}",
      ".fdp-orient small{display:block;font-size:10px;font-weight:400;color:#777;margin-top:3px}",
      ".fdp-orient.sel{border-color:#a91537;color:#a91537;box-shadow:0 0 0 2px #a9153715}",
      "#fd-foto-personalizador .fdp-upload .fdp-btn-main{display:inline-flex;align-items:center;justify-content:center;min-width:150px;max-width:100%;white-space:nowrap}",
      ".fdp-lab{font-size:13px;font-weight:800;margin:0 0 7px}",
      ".fdp-zoom{display:flex;align-items:center;gap:9px}.fdp-zoom input{flex:1}.fdp-pct{width:48px;text-align:right;font-size:12px;color:#666}",
      ".fdp-text{width:100%;border:1px solid #ccc;border-radius:8px;padding:10px 11px}",
      ".fdp-fonts{display:grid;grid-template-columns:1fr 1fr;gap:7px}.fdp-font{border:1px solid #ddd!important;background:#fff!important;border-radius:8px;padding:8px 9px!important;cursor:pointer}.fdp-font.sel{border-color:#a91537!important;color:#a91537!important;font-weight:800}",
      ".fdp-foot{position:sticky;bottom:0;background:#fff;border-top:1px solid #eee;padding:13px 17px;display:flex;justify-content:flex-end;gap:9px}",
      ".fdp-small{font-size:11px;color:#777;line-height:1.4}",
      "@media(max-width:800px){#fd-foto-personalizador .fdp-grid,.fdp-body{grid-template-columns:1fr}.fdp-stagearea{min-height:390px}.fdp-stage{width:min(345px,82vw)}}"
    ].join("");
    document.head.appendChild(s);
  }

  function fdFotoCriarUI(titulo,tipo){
    if(document.getElementById("fd-foto-personalizador"))return;
    fdFotoCSS();
    var box=document.createElement("div");box.id="fd-foto-personalizador";
    var editor10=fdFotoTemEditor10x15(titulo);
    box.innerHTML=(tipo==="polaroid"?
      '<div class="fdp-title">Personalize suas fotos Polaroid</div><div class="fdp-sub">Ajuste cada foto como quiser antes de adicionar ao carrinho.</div>':
      (editor10?
        '<div class="fdp-title">Personalize sua foto 10x15</div><div class="fdp-sub">Escolha a orientação e ajuste o enquadramento antes de adicionar ao carrinho.</div>':
        '<div class="fdp-title">Envie sua foto</div><div class="fdp-sub">Envie uma foto JPG ou PNG para este produto.</div>'))+
      '<div class="fdp-grid" id="fdp-grid"></div>';
    var anchor=document.querySelector(".produto-comprar, .acao-produto, .acoes-produto, .info-principal-produto")||document.querySelector(".produto")||document.querySelector("main");
    if(anchor)anchor.parentNode.insertBefore(box,anchor);
  }

  function fdFotoAbrirEditor(state,index,onApply,onCancel,modo){
    var is10x15=modo==="foto10x15";
    var overlay=document.createElement("div");
    overlay.className="fdp-overlay open";
    overlay.id="fdp-editor-overlay";

    var polaroidFonts =
      '<div id="fdp-font-block" style="display:none;margin-top:15px"><p class="fdp-lab">Fonte</p><div class="fdp-fonts">'+
      Object.keys(FD_FONTES).map(function(f,idx){
        var nomes=["Manuscrita","Elegante","Jornal","Clássica","Moderna"];
        var familias=["Dancing Script","Cormorant Garamond","Special Elite","Libre Baskerville","Montserrat"];
        return '<button type="button" class="fdp-font" data-font="'+f+'" style="font-family:\''+familias[idx]+'\',sans-serif;">'+nomes[idx]+'</button>';
      }).join("")+
      '</div><p class="fdp-lab" style="margin-top:14px">Tamanho da inscrição</p>'+
      '<div class="fdp-zoom"><button type="button" id="fdp-font-minus" class="fdp-btn">−</button>'+
      '<input id="fdp-font-size" type="range" min="50" max="150" value="75">'+
      '<button type="button" id="fdp-font-plus" class="fdp-btn">+</button>'+
      '<span class="fdp-pct" id="fdp-font-pct">75%</span></div></div>';

    var controls10 =
      '<p class="fdp-lab">Orientação da impressão</p>'+
      '<div class="fdp-orient-grid">'+
      '<button type="button" class="fdp-orient sel" data-orient="vertical">Vertical<small>10 × 15 cm</small></button>'+
      '<button type="button" class="fdp-orient" data-orient="horizontal">Horizontal<small>15 × 10 cm</small></button>'+
      '</div>';

    var controlsPol =
      '<div style="height:16px"></div><p class="fdp-lab">Inscrição na borda</p>'+
      '<label style="font-size:13px;font-weight:700;display:flex;gap:8px;align-items:center"><input id="fdp-ins" type="checkbox"> Adicionar inscrição</label>'+
      '<input id="fdp-text" class="fdp-text" maxlength="20" placeholder="Ex.: FELIZ DIA DAS MÃES" style="display:none;margin-top:8px">'+
      '<div id="fdp-count" style="display:none;text-align:right;font-size:11px;color:#777">0/20</div>'+polaroidFonts;

    overlay.innerHTML =
      '<div class="fdp-editor">'+
        '<div class="fdp-head"><span>Ajuste da Foto '+index+'</span><button type="button" id="fdp-close" class="fdp-btn">×</button></div>'+
        '<div class="fdp-body">'+
          '<div class="fdp-stagearea"><div>'+
            '<div class="fdp-stage">'+
              '<div class="fdp-photo '+(is10x15?'fdp-photo-10x15 fdp-orient-vertical':'fdp-photo-polaroid')+'" id="fdp-stage"><img id="fdp-stage-img"></div>'+
              (is10x15?'':'<div class="fdp-caption" id="fdp-caption"></div>')+
            '</div>'+
            '<div class="fdp-small" style="text-align:center;margin-top:8px">Arraste com mouse ou dedo. No celular, use dois dedos para ampliar ou reduzir.</div>'+
          '</div></div>'+
          '<div>'+
            '<div style="background:#faf5f7;border-radius:9px;padding:11px;font-size:12px;line-height:1.5;color:#555;margin-bottom:14px"><b>Como ajustar:</b><br>• arraste para posicionar<br>• pinça para zoom<br>• use o controle para ajuste fino.</div>'+
            (is10x15?controls10:controlsPol)+
            '<p class="fdp-lab" style="margin-top:16px">Zoom da foto</p>'+
            '<div class="fdp-zoom"><input id="fdp-zoom" type="range" min="1" max="3.2" step=".01" value="1"><span class="fdp-pct" id="fdp-zoom-pct">100%</span></div>'+
          '</div>'+
        '</div>'+
        '<div class="fdp-foot"><button type="button" id="fdp-cancel" class="fdp-btn">Cancelar</button><button type="button" id="fdp-apply" class="fdp-btn fdp-btn-main">✓ Confirmar esta foto</button></div>'+
      '</div>';

    document.body.appendChild(overlay);

    var draft=Object.assign(fdFotoEstadoVazio(),state);
    if(!draft.orientation)draft.orientation="vertical";
    var img=overlay.querySelector("#fdp-stage-img");
    var stage=overlay.querySelector("#fdp-stage");
    var caption=overlay.querySelector("#fdp-caption");
    var objectUrl=URL.createObjectURL(state.blob);
    img.src=objectUrl;

    var pts={},drag=null,pinch=null;

    function setOrientation(){
      if(!is10x15)return;
      overlay.querySelectorAll(".fdp-orient").forEach(function(b){
        b.classList.toggle("sel",b.dataset.orient===draft.orientation);
      });
      stage.classList.toggle("fdp-orient-horizontal",draft.orientation==="horizontal");
      stage.classList.toggle("fdp-orient-vertical",draft.orientation!=="horizontal");
      stage.style.aspectRatio=draft.orientation==="horizontal"?"3/2":"2/3";
      setTimeout(fit,30);
    }
    function fit(){
      if(!img.naturalWidth)return;
      var r=Math.max(stage.clientWidth/img.naturalWidth,stage.clientHeight/img.naturalHeight);
      draft.baseW=img.naturalWidth*r;draft.baseH=img.naturalHeight*r;
      transform();
      if(caption)captionRender();
    }
    function transform(){
      img.style.width=draft.baseW+"px";img.style.height=draft.baseH+"px";
      img.style.transform='translate(calc(-50% + '+(draft.xNorm||0)*stage.clientWidth+'px),calc(-50% + '+(draft.yNorm||0)*stage.clientHeight+'px)) scale('+(draft.scale||1)+')';
      overlay.querySelector("#fdp-zoom-pct").textContent=Math.round((draft.scale||1)*100)+"%";
    }
    function capSize(){return fdFotoAdaptiveSize(draft.text||"",draft.font,draft.fontScale||.75,(caption?.clientWidth||300)-18);}
    function captionRender(){
      if(!caption)return;
      var on=draft.ins,text=draft.text||"";
      caption.textContent=on?text:"";
      caption.style.fontFamily='"'+draft.font+'"';
      caption.style.fontWeight=(FD_FONTES[draft.font]||FD_FONTES["Dancing Script"]).weight;
      var px=on?capSize():0;
      caption.style.fontSize=px?px+"px":"0px";
      draft.captionRatio=px?px/Math.max(1,caption.clientWidth):0;
    }

    if(is10x15){
      overlay.querySelectorAll(".fdp-orient").forEach(function(b){
        b.addEventListener("click",function(){
          draft.orientation=b.dataset.orient;
          setOrientation();
        });
      });
    }else{
      overlay.querySelector("#fdp-ins").checked=!!draft.ins;
      overlay.querySelector("#fdp-text").value=draft.text||"";
      overlay.querySelector("#fdp-font-size").value=Math.round((draft.fontScale||.75)*100);
      overlay.querySelector("#fdp-font-pct").textContent=Math.round((draft.fontScale||.75)*100)+"%";

      function toggle(){
        var on=overlay.querySelector("#fdp-ins").checked;
        draft.ins=on;
        overlay.querySelector("#fdp-text").style.display=on?"block":"none";
        overlay.querySelector("#fdp-count").style.display=on?"block":"none";
        overlay.querySelector("#fdp-font-block").style.display=on?"block":"none";
        captionRender();
      }
      overlay.querySelector("#fdp-ins").addEventListener("change",toggle);
      overlay.querySelector("#fdp-text").addEventListener("input",function(){
        draft.text=this.value.slice(0,20);this.value=draft.text;
        overlay.querySelector("#fdp-count").textContent=draft.text.length+"/20";
        captionRender();
      });
      overlay.querySelectorAll(".fdp-font").forEach(function(b){
        b.addEventListener("click",async function(){
          draft.font=b.dataset.font;
          overlay.querySelectorAll(".fdp-font").forEach(function(x){x.classList.toggle("sel",x===b);});
          await fdFotoCarregarFonte(draft.font);
          captionRender();
        });
      });
      overlay.querySelector("#fdp-font-size").addEventListener("input",function(){
        draft.fontScale=parseInt(this.value,10)/100;
        overlay.querySelector("#fdp-font-pct").textContent=this.value+"%";
        captionRender();
      });
      overlay.querySelector("#fdp-font-minus").addEventListener("click",function(){
        var el=overlay.querySelector("#fdp-font-size");el.value=Math.max(50,parseInt(el.value,10)-5);el.dispatchEvent(new Event("input"));
      });
      overlay.querySelector("#fdp-font-plus").addEventListener("click",function(){
        var el=overlay.querySelector("#fdp-font-size");el.value=Math.min(150,parseInt(el.value,10)+5);el.dispatchEvent(new Event("input"));
      });
      toggle();
    }

    overlay.querySelector("#fdp-zoom").addEventListener("input",function(){
      draft.scale=parseFloat(this.value);transform();
    });

    stage.addEventListener("pointerdown",function(e){
      pts[e.pointerId]={x:e.clientX,y:e.clientY};stage.setPointerCapture(e.pointerId);
      var ids=Object.keys(pts);
      if(e.pointerType==="touch"&&ids.length===2){
        var a=pts[ids[0]],b=pts[ids[1]];
        pinch={dist:Math.hypot(b.x-a.x,b.y-a.y),scale:draft.scale};
        drag=null;
      }else{
        drag={id:e.pointerId,x:e.clientX,y:e.clientY,ox:draft.xNorm||0,oy:draft.yNorm||0};
      }
    });
    stage.addEventListener("pointermove",function(e){
      if(pts[e.pointerId])pts[e.pointerId]={x:e.clientX,y:e.clientY};
      var ids=Object.keys(pts);
      if(ids.length===2&&pinch){
        var a=pts[ids[0]],b=pts[ids[1]],dist=Math.hypot(b.x-a.x,b.y-a.y);
        draft.scale=Math.min(3.2,Math.max(1,pinch.scale*dist/pinch.dist));
        overlay.querySelector("#fdp-zoom").value=draft.scale;transform();return;
      }
      if(drag&&drag.id===e.pointerId){
        draft.xNorm=(drag.ox||0)+(e.clientX-drag.x)/Math.max(1,stage.clientWidth);
        draft.yNorm=(drag.oy||0)+(e.clientY-drag.y)/Math.max(1,stage.clientHeight);
        transform();
      }
    });
    function end(e){
      delete pts[e.pointerId];
      if(Object.keys(pts).length<2)pinch=null;
      if(drag&&drag.id===e.pointerId)drag=null;
    }
    stage.addEventListener("pointerup",end);
    stage.addEventListener("pointercancel",end);
    stage.addEventListener("wheel",function(e){
      e.preventDefault();
      draft.scale=Math.min(3.2,Math.max(1,draft.scale+(e.deltaY<0?.08:-.08)));
      overlay.querySelector("#fdp-zoom").value=draft.scale;transform();
    },{passive:false});

    function closeEditor(accepted){
      URL.revokeObjectURL(objectUrl);overlay.remove();
      if(accepted)onApply(draft);else if(onCancel)onCancel();
    }
    overlay.querySelector("#fdp-close").onclick=overlay.querySelector("#fdp-cancel").onclick=function(){closeEditor(false);};
    overlay.querySelector("#fdp-apply").onclick=function(){closeEditor(true);};

    setOrientation();
    if(!is10x15)fdFotoCarregarFonte(draft.font).then(function(){captionRender();});
    setTimeout(fit,80);
  }


  function fdFotoIniciarPersonalizador(){
    if(FD_FOTO_MODULE_READY)return;
    var titulo=fdFotoTitulo(),tipo=fdFotoTipo(titulo),editor10x15=fdFotoTemEditor10x15(titulo);if(!tipo)return;
    FD_FOTO_MODULE_READY=true;
    fdFotoCriarUI(titulo,tipo);
    var states=[];

    function targetTotal(){return fdFotoQuantidadeTotal(tipo,titulo);}
    function ajustarStates(total){
      while(states.length<total)states.push(fdFotoEstadoVazio());
      if(states.length>total)states.length=total;
    }
    function refresh(i){
      var s=states[i-1], selected=document.getElementById("fdp-selected-"+i),add=document.getElementById("fdp-add-"+i),name=document.getElementById("fdp-name-"+i),status=document.getElementById("fdp-status-"+i),mini=document.getElementById("fdp-mini-"+i),edit=document.getElementById("fdp-edit-"+i),rem=document.getElementById("fdp-remove-"+i);
      if(!selected)return;
      if(s.blob){
        selected.style.display="block";add.style.display="none";name.textContent=s.fileName||"Foto selecionada";status.textContent="✓ pronta";
        var usaEditor=(tipo==="polaroid" || editor10x15);
        if(edit)edit.style.display=usaEditor?"inline-block":"none";
        if(rem)rem.textContent="Trocar foto";
        if(!usaEditor){
          mini.style.display="block";
          mini.innerHTML='<div style="font-size:11px;color:#666;margin-bottom:4px">Prévia</div><img src="'+URL.createObjectURL(s.blob)+'">';
        }else{
          mini.style.display="none";
        }
      }else{
        selected.style.display="none";add.style.display="inline-block";status.textContent="";mini.style.display="none";
      }
    }
    function bindCardEvents(){
      var total=states.length;
      for(let i=1;i<=total;i++)(function(idx){
        var input=document.getElementById("fdp-file-"+idx),add=document.getElementById("fdp-add-"+idx),edit=document.getElementById("fdp-edit-"+idx),rem=document.getElementById("fdp-remove-"+idx);
        add.onclick=function(){input.click();};
        input.onchange=function(){
          var f=input.files&&input.files[0];if(!f)return;
          if(!/^image\/(jpeg|png)$/.test(f.type)){alert("Escolha uma imagem JPG ou PNG.");return;}
          if(f.size>10*1024*1024){alert("A imagem deve ter no máximo 10 MB.");return;}
          var s=states[idx-1]=fdFotoEstadoVazio();s.blob=f;s.fileName=f.name;refresh(idx);
          if(tipo==="polaroid" || editor10x15)edit.click();
        };
        if(edit)edit.onclick=function(){if(states[idx-1]&&states[idx-1].blob&&(tipo==="polaroid" || editor10x15))fdFotoAbrirEditor(states[idx-1],idx,function(d){states[idx-1]=d;refresh(idx);},function(){},editor10x15?"foto10x15":"polaroid");};
        if(rem)rem.onclick=function(){input.click();};
        refresh(idx);
      })(i);
    }
    function renderCards(){
      var grid=document.getElementById("fdp-grid");if(!grid)return;
      ajustarStates(targetTotal());
      grid.innerHTML="";
      for(var i=1;i<=states.length;i++){
        var item=document.createElement("div");item.className="fdp-item";item.id="fdp-item-"+i;
        item.innerHTML='<div class="fdp-top"><span>Foto '+i+'</span><span class="fdp-ok" id="fdp-status-'+i+'"></span></div>'+
          '<div class="fdp-upload"><input id="fdp-file-'+i+'" type="file" accept="image/jpeg,image/png">'+
          '<button type="button" class="fdp-btn fdp-btn-main" id="fdp-add-'+i+'">Escolher foto</button><div class="fdp-small" style="margin-top:7px">JPG ou PNG • até 10 MB</div>'+
          '<div id="fdp-selected-'+i+'" style="display:none;margin-top:10px"><div class="fdp-file" id="fdp-name-'+i+'"></div><div class="fdp-actions">'+
          ((tipo==="polaroid" || editor10x15)?'<button type="button" class="fdp-btn" id="fdp-edit-'+i+'">Ajustar foto</button>':'')+
          '<button type="button" class="fdp-btn" id="fdp-remove-'+i+'">Trocar foto</button></div></div><div class="fdp-mini" id="fdp-mini-'+i+'"></div></div></div>';
        grid.appendChild(item);
      }
      bindCardEvents();
    }
    function todosProntos(){for(var i=0;i<states.length;i++)if(!states[i].blob)return false;return true;}

    function fdFotoGerar10x15Final(s){
      return new Promise(function(resolve,reject){
        if(!s||!s.blob){reject(new Error("Foto não encontrada."));return;}
        var W=s.orientation==="horizontal"?1772:1181;
        var H=s.orientation==="horizontal"?1181:1772;
        var c=document.createElement("canvas");c.width=W;c.height=H;
        var ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);
        var url=URL.createObjectURL(s.blob),img=new Image();
        img.onload=function(){
          try{
            var cover=Math.max(W/img.naturalWidth,H/img.naturalHeight);
            var dw=img.naturalWidth*cover*(s.scale||1);
            var dh=img.naturalHeight*cover*(s.scale||1);
            var dx=W/2+(s.xNorm||0)*W-dw/2;
            var dy=H/2+(s.yNorm||0)*H-dh/2;
            ctx.save();ctx.beginPath();ctx.rect(0,0,W,H);ctx.clip();ctx.drawImage(img,dx,dy,dw,dh);ctx.restore();
            URL.revokeObjectURL(url);
            c.toBlob(function(blob){blob?resolve(blob):reject(new Error("Falha ao gerar a foto 10x15."));},"image/jpeg",0.95);
          }catch(e){URL.revokeObjectURL(url);reject(e);}
        };
        img.onerror=function(){URL.revokeObjectURL(url);reject(new Error("Falha ao carregar a foto."));};
        img.src=url;
      });
    }

    function gravarNoDB(){
      var protocol=fdFotoGerarProtocolo(),group="fdg-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),perUnit=(tipo==="polaroid"?fdFotoQuantidadePorUnidade(titulo):1),promises=[];
      fdFotoAddPendingGroup(group);
      states.forEach(function(s,idx){
        var id=group+"-"+(idx+1);
        var recordBase={id:id,protocolo:protocol,produto:titulo,tipo:tipo,unidade:Math.floor(idx/perUnit)+1,foto:(idx%perUnit)+1,blob:s.blob,fileName:s.fileName||"foto",xNorm:s.xNorm||0,yNorm:s.yNorm||0,scale:s.scale||1,orientation:s.orientation||"vertical",ins:!!s.ins,text:s.text||"",font:s.font||"Dancing Script",fontScale:s.fontScale||.75,captionRatio:s.captionRatio||0,createdAt:Date.now(),ttl:Date.now()+6*60*60*1000};
        var p=(editor10x15?fdFotoGerar10x15Final(s).then(function(finalBlob){
          recordBase.blob=finalBlob;
          recordBase.fileName=(s.fileName||"foto").replace(/\.[^.]+$/,"")+".jpg";
          return recordBase;
        }):Promise.resolve(recordBase));
        promises.push(p.then(function(record){return fdFotoDBPut(record);}).then(function(){fdFotoAddPendingId(id);}));
      });
      return Promise.all(promises);
    }

    ajustarStates(targetTotal());renderCards();

    // Atualiza a quantidade de cards quando o cliente muda a quantidade do produto.
    var lastQty=fdFotoQuantidadeProduto();
    if(FD_FOTO_QTY_TIMER)clearInterval(FD_FOTO_QTY_TIMER);
    FD_FOTO_QTY_TIMER=setInterval(function(){
      var q=fdFotoQuantidadeProduto();
      if(q!==lastQty){lastQty=q;renderCards();}
    },500);

    var buySelectors=[".botao-comprar", ".botao.principal", ".adicionar-carrinho", "#btn-comprar", ".btn-comprar", "button[type='submit']", "input[type='submit']"];
    document.addEventListener("click",function(ev){
      var el=ev.target;while(el&&el!==document.body&&!(el.matches&&buySelectors.some(function(s){try{return el.matches(s);}catch(e){return false;}})))el=el.parentElement;
      if(!el||el===document.body)return;
      if(!todosProntos()){ev.preventDefault();ev.stopPropagation();alert("Adicione todas as fotos antes de adicionar o produto ao carrinho.");return;}
      if(el.dataset.fdPersonalizacaoOk==="1")return;
      ev.preventDefault();ev.stopPropagation();el.dataset.fdPersonalizacaoOk="1";
      gravarNoDB().then(function(){el.click();}).catch(function(e){el.dataset.fdPersonalizacaoOk="";alert("Não foi possível guardar as fotos antes de adicionar o produto ao carrinho. Tente novamente.");console.error(e);});
    },true);

    window.FD_FOTO_PERSONALIZADOR={titulo:titulo,tipo:tipo,getTotal:function(){return states.length;},estaPronto:todosProntos};
  }

  // ─────────────────────────────────────────────
  // MÓDULO — PERSONALIZAÇÕES DE PRODUTOS E KITS
  // ─────────────────────────────────────────────
  // O produto é identificado por uma regra explícita. Assim, palavras como
  // "caneca" ou "polaroid" não ativam campos em produtos que não precisam
  // deles. Novos produtos podem ser cadastrados nesta lista.
  var FD_PERSONALIZACAO_CONFIGS=[
    {id:"kit-vermont",match:function(t){return t.indexOf("kit vermont")!==-1;},titulo:"Personalize seu Kit Vermont",campos:[
      {id:"nome",tipo:"texto",rotulo:"Nome para a caneca",max:20,obrigatorio:true},
      {id:"foto",tipo:"foto",rotulo:"Foto para a Polaroid",obrigatorio:true}
    ]},
    {id:"bubble",match:function(t){return /(^| )bubble( |$)/.test(t);},titulo:"Personalize seu Bubble",campos:[
      {id:"frase",tipo:"select",rotulo:"Frase da ocasião",obrigatorio:true,opcoes:["Feliz aniversário","Eu te amo","Parabéns","Dia das Mães","Dia dos Pais","Hoje é seu dia","Boa sorte","Melhoras","Obrigado(a)","Bem-vindo(a)","Você é especial","Outra frase"],livre:"fraseLivre",maxLivre:25},
      {id:"nome",tipo:"texto",rotulo:"Nome da pessoa presenteada",max:15,obrigatorio:true},
      {id:"cor",tipo:"select",rotulo:"Cor do balão interno",obrigatorio:true,opcoes:["Rosa","Azul","Vermelho","Dourado","Preto"]}
    ]},
    {id:"caneca-foto",match:function(t){return t.indexOf("caneca")!==-1&&fdPersonalizacaoTemPalavra(t,"foto");},titulo:"Personalize sua caneca",campos:[
      {id:"foto",tipo:"foto",rotulo:"Foto para a caneca",obrigatorio:true}
    ]},
    {id:"caneca-nome",match:function(t){return t.indexOf("caneca")!==-1&&!fdPersonalizacaoTemPalavra(t,"foto")&&(t.indexOf("personaliz")!==-1||t.indexOf("com nome")!==-1);},titulo:"Personalize sua caneca",campos:[
      {id:"nome",tipo:"texto",rotulo:"Nome para a caneca",max:20,obrigatorio:true}
    ]},
    {id:"copo-450ml",match:function(t){return t.indexOf("copo")!==-1&&t.indexOf("450")!==-1;},titulo:"Personalize seu copo 450 ml",campos:[
      {id:"nome",tipo:"texto",rotulo:"Nome para o copo",max:20,obrigatorio:true}
    ]}
  ];
  var FD_PERSONALIZACAO_MODULE_READY=false;
  var FD_PERSONALIZACAO_QTY_TIMER=null;

  function fdPersonalizacaoNormalizar(v){
    var s=String(v||"").toLowerCase().replace(/\u00a0/g," ");
    try{s=s.normalize("NFD").replace(/[\u0300-\u036f]/g,"");}catch(e){}
    return s.replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();
  }
  function fdPersonalizacaoTemPalavra(t,p){return new RegExp("(^| )"+p+"s?( |$)","i").test(t||"");}
  function fdPersonalizacaoConfig(titulo){
    var t=fdPersonalizacaoNormalizar(titulo);
    for(var i=0;i<FD_PERSONALIZACAO_CONFIGS.length;i++)if(FD_PERSONALIZACAO_CONFIGS[i].match(t))return FD_PERSONALIZACAO_CONFIGS[i];
    return null;
  }
  function fdPersonalizacaoCSS(){
    if(document.getElementById("fd-personalizacao-css"))return;
    var s=document.createElement("style");s.id="fd-personalizacao-css";s.innerHTML=[
      "#fd-personalizacao-produto{margin:22px 0;padding:18px;border:1px solid #e4e0de;border-radius:12px;background:#fff;position:relative;z-index:5;font-family:'Helvetica Neue',Arial,sans-serif}",
      "#fd-personalizacao-produto .fdg-title{font-family:Georgia,'Times New Roman',serif;font-size:18px;font-weight:700;color:#a91537;margin:0 0 5px}",
      "#fd-personalizacao-produto .fdg-sub{font-size:12px;color:#777;margin:0 0 15px}",
      "#fd-personalizacao-produto .fdg-unit{border-top:1px solid #eee;padding-top:14px;margin-top:14px}",
      "#fd-personalizacao-produto .fdg-unit-title{font-family:Georgia,'Times New Roman',serif;font-size:14px;font-weight:700;color:#444;margin:0 0 11px}",
      "#fd-personalizacao-produto .fdg-label{display:block;font-size:13px;font-weight:700;color:#333;margin:10px 0 6px}",
      "#fd-personalizacao-produto .fdg-input,#fd-personalizacao-produto .fdg-select{width:100%;border:1px solid #ccc;border-radius:8px;padding:10px 11px;background:#fff;color:#333;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px}",
      "#fd-personalizacao-produto .fdg-upload{border:2px dashed #d95d78;background:#fffafb;border-radius:9px;padding:12px}",
      "#fd-personalizacao-produto .fdg-upload input{font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;max-width:100%}",
      "#fd-personalizacao-produto .fdg-file{font-size:12px;color:#555;margin-top:7px;overflow-wrap:anywhere}",
      "#fd-personalizacao-produto .fdg-summary{margin-top:15px;padding:11px;border-radius:8px;background:#faf6f7;font-size:12px;color:#555;line-height:1.5}",
      "#fd-personalizacao-produto .fdg-status{min-height:18px;margin-top:8px;font-size:12px;font-weight:700;color:#a91537}",
      "#fd-personalizacao-produto .fdg-status.ok{color:#217448}",
      "#fd-personalizacao-produto .fdg-note{font-size:11px;color:#777;margin-top:10px;line-height:1.4}",
      "#fd-personalizacao-produto .fdg-custom{display:none;margin-top:7px}",
      "#fd-personalizacao-produto .fdg-custom.visible{display:block}"
    ].join("");document.head.appendChild(s);
  }

  function fdPersonalizacaoIniciar(){
    if(FD_PERSONALIZACAO_MODULE_READY)return;
    var titulo=fdFotoTitulo(),config=fdPersonalizacaoConfig(titulo);
    if(!config)return;
    FD_PERSONALIZACAO_MODULE_READY=true;
    fdPersonalizacaoCSS();
    var box=document.createElement("section");box.id="fd-personalizacao-produto";
    var anchor=document.querySelector(".produto-comprar, .acao-produto, .acoes-produto, .info-principal-produto")||document.querySelector(".produto")||document.querySelector("main");
    if(!anchor){FD_PERSONALIZACAO_MODULE_READY=false;return;}
    anchor.parentNode.insertBefore(box,anchor);
    var estados=[];
    function quantidade(){return Math.max(1,fdFotoQuantidadeProduto());}
    function ajustarEstados(q){while(estados.length<q)estados.push({});if(estados.length>q)estados.length=q;}
    function idCampo(u,id){return "fdg-"+u+"-"+id;}
    function campoMarkup(field,u,state){
      var id=idCampo(u,field.id),html='<label class="fdg-label" for="'+id+'">'+fdFotoEsc(field.rotulo)+(field.obrigatorio?' *':'')+'</label>';
      if(field.tipo==="texto"){
        html+='<input class="fdg-input" id="'+id+'" data-fd-unit="'+u+'" data-fd-field="'+field.id+'" type="text" maxlength="'+field.max+'" autocomplete="off">';
      }else if(field.tipo==="select"){
        html+='<select class="fdg-select" id="'+id+'" data-fd-unit="'+u+'" data-fd-field="'+field.id+'"><option value="">Selecione uma opção</option>';
        field.opcoes.forEach(function(op){html+='<option value="'+fdFotoEsc(op)+'">'+fdFotoEsc(op)+'</option>';});
        html+='</select>';
        if(field.livre)html+='<div class="fdg-custom" id="'+idCampo(u,field.livre)+'-wrap"><input class="fdg-input" id="'+idCampo(u,field.livre)+'" data-fd-unit="'+u+'" data-fd-field="'+field.livre+'" type="text" maxlength="'+field.maxLivre+'" placeholder="Digite sua frase (até '+field.maxLivre+' caracteres)"></div>';
      }else if(field.tipo==="foto"){
        html+='<div class="fdg-upload"><input id="'+id+'" data-fd-unit="'+u+'" data-fd-field="'+field.id+'" type="file" accept="image/jpeg,image/png"><div class="fdg-file" id="'+id+'-name">JPG ou PNG · até 10 MB</div></div>';
      }
      return html;
    }
    function render(){
      ajustarEstados(quantidade());
      var html='<div class="fdg-title">'+fdFotoEsc(config.titulo)+'</div><p class="fdg-sub">Preencha os dados de personalização antes de adicionar o produto ao carrinho.</p>';
      estados.forEach(function(state,u){
        html+=(estados.length>1?'<div class="fdg-unit"><div class="fdg-unit-title">Unidade '+(u+1)+'</div>':'');
        config.campos.forEach(function(field){html+=campoMarkup(field,u,state);});
        if(estados.length>1)html+='</div>';
      });
      html+='<div class="fdg-summary" id="fdg-summary"></div><div class="fdg-status" id="fdg-status" aria-live="polite"></div><div class="fdg-note">A prévia, quando exibida, é ilustrativa. A arte final será preparada pela nossa equipe.</div>';
      box.innerHTML=html;
      estados.forEach(function(state,u){
        config.campos.forEach(function(field){
          var el=box.querySelector("[data-fd-unit='"+u+"'][data-fd-field='"+field.id+"']");
          if(!el)return;
          if(field.tipo!=="foto")el.value=state[field.id]||"";
          else if(state[field.id])box.querySelector("#"+idCampo(u,field.id)+"-name").textContent=state[field.id].name;
          el.addEventListener(field.tipo==="foto"?"change":(field.tipo==="select"?"change":"input"),function(){
            if(field.tipo==="foto"){
              var f=el.files&&el.files[0];
              if(!f)return;
              if(!/^image\/(jpeg|png)$/.test(f.type)){alert("Escolha uma imagem JPG ou PNG.");el.value="";return;}
              if(f.size>10*1024*1024){alert("A imagem deve ter no máximo 10 MB.");el.value="";return;}
              state[field.id]=f;box.querySelector("#"+idCampo(u,field.id)+"-name").textContent=f.name;
            }else state[field.id]=el.value;
            atualizar();
          });
          if(field.livre){
            var livreEl=box.querySelector("[data-fd-unit='"+u+"'][data-fd-field='"+field.livre+"']");
            if(livreEl){
              livreEl.value=state[field.livre]||"";
              livreEl.addEventListener("input",function(){state[field.livre]=livreEl.value;atualizar();});
            }
          }
        });
      });
      atualizar();
    }
    function validar(){
      for(var u=0;u<estados.length;u++){
        var state=estados[u];
        for(var i=0;i<config.campos.length;i++){
          var f=config.campos[i];
          if(!f.obrigatorio)continue;
          if(f.tipo==="foto"&&!state[f.id])return false;
          if(f.tipo!=="foto"&&!String(state[f.id]||"").trim())return false;
          if(f.livre&&state[f.id]==="Outra frase"&&!String(state[f.livre]||"").trim())return false;
        }
      }
      return true;
    }
    function resumo(){
      var linhas=[];
      estados.forEach(function(state,u){
        var p=[];
        config.campos.forEach(function(f){
          var val=state[f.id];
          if(f.livre&&val==="Outra frase")val=state[f.livre]||"Outra frase";
          if(f.tipo==="foto")p.push(f.rotulo+": "+(val?val.name:"não enviada"));
          else if(val)p.push(f.rotulo+": "+val);
        });
        linhas.push((estados.length>1?"Unidade "+(u+1)+" — ":"")+p.join(" · "));
      });
      return linhas.join("<br>");
    }
    function atualizar(){
      var ok=validar(),sum=box.querySelector("#fdg-summary"),status=box.querySelector("#fdg-status");
      if(sum)sum.innerHTML="<strong>Resumo:</strong><br>"+resumo();
      if(status){status.textContent=ok?"Personalização preenchida. Você já pode adicionar o produto.":"Preencha todos os campos obrigatórios para continuar.";status.classList.toggle("ok",ok);}
      config.campos.forEach(function(f){
        if(!f.livre)return;
        estados.forEach(function(state,u){var wrap=box.querySelector("#"+idCampo(u,f.livre)+"-wrap");if(wrap)wrap.classList.toggle("visible",state[f.id]==="Outra frase");});
      });
    }
    function gravar(){
      var protocol=fdFotoGerarProtocolo(),group="fdg-"+Date.now()+"-"+Math.random().toString(36).slice(2,8),promises=[];
      fdFotoAddPendingGroup(group);
      estados.forEach(function(state,u){
        var fotoField=config.campos.find(function(f){return f.tipo==="foto";}),foto=fotoField?state[fotoField.id]:null;
        var frase=state.frase==="Outra frase"?(state.fraseLivre||""):(state.frase||"");
        var id=group+"-"+(u+1),record={id:id,protocolo:protocol,produto:titulo,tipo:"custom",fdPersonalizacao:true,personalizacaoId:config.id,unidade:u+1,foto:foto?1:0,blob:foto||null,fileName:foto?foto.name:"",nome:state.nome||"",frase:frase,cor:state.cor||"",createdAt:Date.now(),ttl:Date.now()+6*60*60*1000};
        promises.push(fdFotoDBPut(record).then(function(){fdFotoAddPendingId(id);}));
      });
      return Promise.all(promises);
    }
    render();
    if(FD_PERSONALIZACAO_QTY_TIMER)clearInterval(FD_PERSONALIZACAO_QTY_TIMER);
    var ultimaQuantidade=quantidade();
    FD_PERSONALIZACAO_QTY_TIMER=setInterval(function(){var q=quantidade();if(q!==ultimaQuantidade){ultimaQuantidade=q;render();}},500);
    var buySelectors=[".botao-comprar",".botao.principal",".adicionar-carrinho","#btn-comprar",".btn-comprar","button[type='submit']","input[type='submit']"];
    document.addEventListener("click",function(ev){
      var el=ev.target;while(el&&el!==document.body&&!(el.matches&&buySelectors.some(function(s){try{return el.matches(s);}catch(e){return false;}})))el=el.parentElement;
      if(!el||el===document.body)return;
      if(!validar()){ev.preventDefault();ev.stopPropagation();alert("Preencha toda a personalização antes de adicionar o produto ao carrinho.");return;}
      if(el.dataset.fdPersonalizacaoGenericaOk==="1")return;
      ev.preventDefault();ev.stopPropagation();el.dataset.fdPersonalizacaoGenericaOk="1";
      gravar().then(function(){el.click();}).catch(function(e){el.dataset.fdPersonalizacaoGenericaOk="";alert("Não foi possível guardar a personalização. Tente novamente.");console.error(e);});
    },true);
    window.FD_PERSONALIZACAO={produto:titulo,config:config.id,pronto:validar};
  }

  function iniciarModuloPersonalizacao(){
    var tentativas=0,timer=setInterval(function(){
      tentativas++;
      var tt=fdFotoTitulo();
      if(fdPersonalizacaoConfig(tt)&&document.querySelector(".abas-custom, .info-principal-produto, .produto")){
        clearInterval(timer);fdPersonalizacaoIniciar();
      }else if(tentativas>40)clearInterval(timer);
    },300);
  }

  function iniciarModuloFotos(){
    var tentativas=0;
    var timer=setInterval(function(){
      tentativas++;
      var tt=fdFotoTitulo();
      if(fdFotoTemPalavraFoto(tt)&&!fdPersonalizacaoConfig(tt)&&document.querySelector(".abas-custom, .info-principal-produto, .produto")){
        clearInterval(timer);fdFotoIniciarPersonalizador();
      }else if(tentativas>40){clearInterval(timer);}
    },300);
  }

  // ─────────────────────────────────────────────
  // MÓDULO 4 — SUBSTITUIR MENSAGENS DE FRETE
  // ─────────────────────────────────────────────
  function corrigirMensagensFrete() {
    document.querySelectorAll("*").forEach(function (el) {
      if (el.children.length > 0) return;
      var txt = el.textContent.trim();
      if (txt === "Frete Grátis") {
        el.textContent = "Entrega Grátis - Agendamento na tela de checkout";
      } else if (txt === "Não foram encontradas formas de envio para o CEP informado.") {
        el.textContent = "Desculpe, não realizamos entregas para este CEP. Entre em contato pelo WhatsApp caso queira comprar para retirar em nossa loja física.";
      } else if (txt === "* Este prazo de entrega está considerando a disponibilidade do produto + prazo de entrega.") {
        el.textContent = "Adicione o produto ao carrinho e escolha o melhor horário para entrega ou retirada.";
      }
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
    corrigirMensagensFrete();
    iniciarModuloPersonalizacao();
    iniciarModuloFotos();
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
        corrigirMensagensFrete();
        iniciarModuloPersonalizacao();
        iniciarModuloFotos();
      }, 400);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  fdFotoGarantirFontes();
})();
