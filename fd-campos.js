(function(){
  var CFG={
    emailjs_service_id:"service_8nyc25b",
    emailjs_template_id:"template_jaeoc5u",
    emailjs_public_key:"LZISdXcU2KCrtNwVd",
    limite:320,
    palavras:["buque","buquê","kit","cesta","arranjo","orquidea","orquídea"]
  };

  function normalizar(t){
    return t.toLowerCase()
      .replace(/[áàãâä]/g,"a")
      .replace(/[éèêë]/g,"e")
      .replace(/[íìîï]/g,"i")
      .replace(/[óòõôö]/g,"o")
      .replace(/[úùûü]/g,"u")
      .replace(/[ç]/g,"c");
  }

  function init(){
    // Só roda em páginas de produto
    var isProd=document.body&&(
      document.body.classList.contains("pagina-produto")||
      document.querySelector(".produto")!==null
    );
    if(!isProd)return;

    // Verifica nome do produto — ignora templates não substituídos
    var elNomeProd=document.querySelector(".nome-produto");
    var nomeProd=elNomeProd?elNomeProd.innerText.trim():"";
    if(!nomeProd||nomeProd.indexOf("--PRODUTO")!==-1||nomeProd==="Produto teste")return;

    var nomeNorm=normalizar(nomeProd);
    var exibir=CFG.palavras.some(function(p){return nomeNorm.indexOf(normalizar(p))!==-1;});
    if(!exibir)return;

    // CSS
    var css=[
      ".fd{background:#fff5e1;border:1.5px solid #e8c9a0;border-radius:10px;padding:20px 22px 16px;margin:22px 0 18px;font-family:inherit}",
      ".fd h3{color:#a91537;font-size:16px;margin:0 0 12px;font-weight:700}",
      ".fdc{margin-bottom:14px}",
      ".fdc label{display:block;font-size:13px;font-weight:600;color:#444;margin-bottom:5px}",
      ".fdc label small{font-weight:400;color:#888;font-size:11px;display:block;margin-top:2px}",
      ".fdc input,.fdc textarea{width:100%;box-sizing:border-box;border:1.5px solid #e8c9a0;border-radius:7px;padding:9px 12px;font-size:14px;font-family:inherit;background:#fff;color:#333;outline:none;transition:border-color .2s}",
      ".fdc input:focus,.fdc textarea:focus{border-color:#a91537}",
      ".fdc input.fd-erro,.fdc textarea.fd-erro{border-color:#c0392b;background:#fff8f8}",
      ".fdc textarea{resize:vertical;min-height:110px}",
      ".fdct{text-align:right;font-size:11px;color:#aaa;margin-top:3px}",
      ".fd-msg-erro{color:#c0392b;font-size:12px;margin-top:4px;display:none}",
      ".fdae{background:#fff8e1;border-left:3px solid #f0a500;color:#7a5200;font-size:12px;padding:6px 10px;border-radius:0 5px 5px 0;margin-top:5px;display:none}"
    ].join("");
    var s=document.createElement("style");
    s.innerHTML=css;
    document.head.appendChild(s);

    // Recupera dados salvos anteriormente
    var salvo={};
    try{salvo=JSON.parse(sessionStorage.getItem("fd_dados"))||{};}catch(x){}

    var html=[
      '<div class="fd" id="fd-bloco">',
      '<h3>&#128140; Personalizar meu pedido</h3>',

      '<div class="fdc">',
      '<label>Nome de quem vai receber o presente</label>',
      '<input type="text" id="fd-nome" placeholder="Ex.: Maria da Silva" maxlength="80" value="'+(salvo.nome||"")+'"/>',
      '<div class="fd-msg-erro" id="fd-erro-nome">Por favor, informe o nome de quem vai receber.</div>',
      '</div>',

      '<div class="fdc">',
      '<label>Telefone de quem vai receber<small>Só usamos se não conseguirmos falar com você</small></label>',
      '<input type="tel" id="fd-tel" placeholder="Ex.: (11) 98765-4321" maxlength="20" value="'+(salvo.tel||"")+'"/>',
      '<div class="fd-msg-erro" id="fd-erro-tel">Por favor, informe o telefone de quem vai receber.</div>',
      '</div>',

      '<div class="fdc">',
      '<label>Mensagem para o cartãozinho<small>Até 8 linhas, sem emojis</small></label>',
      '<textarea id="fd-msg" placeholder="Digite aqui sua mensagem de coração..." maxlength="'+CFG.limite+'">'+(salvo.msg||"")+'</textarea>',
      '<div class="fdae" id="fd-ae">Por favor, remova os emojis. Nossos cartões são escritos à mão e emojis não ficam legíveis.</div>',
      '<div class="fdct"><span id="fd-cc">'+(salvo.msg?salvo.msg.length:0)+'</span>/'+CFG.limite+' caracteres</div>',
      '</div>',

      '</div>'
    ].join("");

    var bloco=document.createElement("div");
    bloco.innerHTML=html;
    var alvos=[".acoes-produto .comprar",".cep","#formCalcularCep",".acoes-produto",".produto .span6 .principal"];
    var ok=false;
    for(var i=0;i<alvos.length;i++){
      var a=document.querySelector(alvos[i]);
      if(a){a.parentNode.insertBefore(bloco,a);ok=true;break;}
    }
    if(!ok){var p=document.querySelector(".principal")||document.querySelector(".produto");if(p)p.appendChild(bloco);}

    var txt=document.getElementById("fd-msg");
    var cc=document.getElementById("fd-cc");
    var ae=document.getElementById("fd-ae");
    var er=/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{1F100}-\u{1F2FF}\u{1F900}-\u{1F9FF}]/u;

    if(txt){
      txt.addEventListener("input",function(){
        cc.textContent=this.value.length;
        ae.style.display=er.test(this.value)?"block":"none";
      });
    }

    function dados(){
      return{
        nome:(document.getElementById("fd-nome")||{}).value||"",
        tel:(document.getElementById("fd-tel")||{}).value||"",
        msg:(document.getElementById("fd-msg")||{}).value||"",
        produto:nomeProd||document.title,
        pagina:window.location.href,
        hora:new Date().toLocaleString("pt-BR")
      };
    }

    function validar(d){
      var ok=true;
      var inNome=document.getElementById("fd-nome");
      var erNome=document.getElementById("fd-erro-nome");
      if(!d.nome.trim()){
        inNome.classList.add("fd-erro");
        erNome.style.display="block";
        ok=false;
      }else{
        inNome.classList.remove("fd-erro");
        erNome.style.display="none";
      }
      var inTel=document.getElementById("fd-tel");
      var erTel=document.getElementById("fd-erro-tel");
      if(!d.tel.trim()){
        inTel.classList.add("fd-erro");
        erTel.style.display="block";
        ok=false;
      }else{
        inTel.classList.remove("fd-erro");
        erTel.style.display="none";
      }
      if(er.test(d.msg)){
        ae.style.display="block";
        ok=false;
      }
      return ok;
    }

    function enviar(d){
      function send(){
        emailjs.init({publicKey:CFG.emailjs_public_key});
        emailjs.send(CFG.emailjs_service_id,CFG.emailjs_template_id,{
          produto:d.produto,
          nome_presenteado:d.nome||"(não informado)",
          tel_presenteado:d.tel||"(não informado)",
          mensagem:d.msg||"(não informada)",
          data_hora:d.hora,
          pagina:d.pagina
        }).then(function(){
          console.log("[FD] Email enviado.");
        },function(e){
          console.error("[FD] Erro:",e);
        });
      }
      if(typeof emailjs==="undefined"){
        var sc=document.createElement("script");
        sc.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        sc.onload=send;
        document.head.appendChild(sc);
      }else{send();}
    }

    document.addEventListener("click",function(e){
      var el=e.target;
      var isC=(
        el.classList.contains("botao-comprar")||
        el.classList.contains("btn-comprar")||
        (el.getAttribute&&(el.getAttribute("href")||"").indexOf("/carrinho/produto/")!==-1)||
        (el.innerText&&el.innerText.toLowerCase().indexOf("comprar")!==-1)
      );
      if(!isC)return;
      var d=dados();
      try{sessionStorage.setItem("fd_dados",JSON.stringify(d));}catch(x){}
      if(!validar(d)){
        e.preventDefault();e.stopPropagation();
        document.getElementById("fd-bloco").scrollIntoView({behavior:"smooth",block:"center"});
        return;
      }
      enviar(d);
    },true);
  }

  // Aguarda a página carregar completamente antes de executar
  if(document.readyState==="complete"){
    setTimeout(init,500);
  }else{
    window.addEventListener("load",function(){
      setTimeout(init,500);
    });
  }

})();
