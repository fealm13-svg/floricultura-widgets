(function(){

  var PERIODOS=[
    {id:"m1",nome:"Manhã I",hora:"9:00 – 10:30",ini:9,fim:10.5,dias:[0,1,2,3,4,5,6]},
    {id:"m2",nome:"Manhã II",hora:"10:30 – 12:00",ini:10.5,fim:12,dias:[0,1,2,3,4,5,6]},
    {id:"t1",nome:"Tarde I",hora:"12:30 – 15:00",ini:12.5,fim:15,dias:[1,2,3,4,5]},
    {id:"t2",nome:"Tarde II",hora:"15:00 – 17:00",ini:15,fim:17,dias:[1,2,3,4,5],tolerancia:0.5}
  ];

  var MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var DIASLONG=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  var DIASABREV=["dom","seg","ter","qua","qui","sex","sáb"];

  var dataSel=null;
  var periodoSel=null;
  var agendamentoConfirmado=false;
  var mesAtual=new Date().getMonth();
  var anoAtual=new Date().getFullYear();

  function normalizar(t){
    return t.toLowerCase()
      .replace(/[áàãâä]/g,"a")
      .replace(/[éèêë]/g,"e")
      .replace(/[íìîï]/g,"i")
      .replace(/[óòõôö]/g,"o")
      .replace(/[úùûü]/g,"u")
      .replace(/[ç]/g,"c");
  }

  function nomeProdutoValido(nome){
    if(!nome)return false;
    if(nome.indexOf("--PRODUTO")!==-1)return false;
    if(nome==="Produto teste")return false;
    if(nome.trim()==="")return false;
    return true;
  }

  function isBotaoComprar(el){
    if(!el||!el.classList)return false;
    return el.classList.contains("botao-comprar")&&
           el.classList.contains("principal")&&
           el.classList.contains("grande");
  }

  function isCesta(){
    return window.location.href.indexOf("cesta")!==-1;
  }

  function hoje(){
    var d=new Date();d.setHours(0,0,0,0);return d;
  }

  function addDias(d,n){
    var r=new Date(d);r.setDate(r.getDate()+n);return r;
  }

  function minData(){
    var agora=new Date();
    var h=agora.getHours()+agora.getMinutes()/60;
    if(isCesta()){
      if(h>=18)return addDias(hoje(),2);
      return addDias(hoje(),1);
    }
    return hoje();
  }

  function diaDisponivel(d){
    var min=minData();min.setHours(0,0,0,0);
    var dd=new Date(d);dd.setHours(0,0,0,0);
    if(dd<min)return false;
    var max=addDias(hoje(),30);max.setHours(0,0,0,0);
    if(dd>max)return false;
    return true;
  }

  function periodosParaDia(d){
    var agora=new Date();
    var h=agora.getHours()+agora.getMinutes()/60;
    var dd=new Date(d);dd.setHours(0,0,0,0);
    var dow=dd.getDay();
    var isHoje=dd.getTime()===hoje().getTime();
    var isAmanha=dd.getTime()===addDias(hoje(),1).getTime();

    return PERIODOS.map(function(p){
      if(p.dias.indexOf(dow)===-1)return Object.assign({},p,{ok:false});
      if(isCesta()&&h>=18&&isAmanha){
        return Object.assign({},p,{ok:p.id==="m2"});
      }
      if(isHoje){
        if(p.tolerancia){
          return Object.assign({},p,{ok:h<=p.ini+p.tolerancia});
        }
        return Object.assign({},p,{ok:(p.ini-h)>=1});
      }
      return Object.assign({},p,{ok:true});
    });
  }

  function temPeriodoDisponivel(d){
    return diaDisponivel(d)&&periodosParaDia(d).some(function(p){return p.ok;});
  }

  function salvarSessao(){
    if(!dataSel||!periodoSel)return;
    var p=PERIODOS.find(function(x){return x.id===periodoSel;});
    try{
      var dados=JSON.parse(sessionStorage.getItem("fd_dados"))||{};
      dados.data_entrega=dataSel.toLocaleDateString("pt-BR");
      dados.periodo_entrega=p.nome+" ("+p.hora+")";
      dados._dataSel=dataSel.toISOString();
      dados._periodoSel=periodoSel;
      sessionStorage.setItem("fd_dados",JSON.stringify(dados));
    }catch(x){}
  }

  function restaurarSessao(){
    try{
      var dados=JSON.parse(sessionStorage.getItem("fd_dados"))||{};
      if(dados._dataSel&&dados._periodoSel){
        var d=new Date(dados._dataSel);
        if(temPeriodoDisponivel(d)){
          dataSel=d;
          periodoSel=dados._periodoSel;
          mesAtual=d.getMonth();
          anoAtual=d.getFullYear();
          return true;
        }
      }
    }catch(x){}
    return false;
  }

  function injetarCSS(){
    var css=[
      ".fda-bloco{background:#fff5e1;border:1.5px solid #e8c9a0;border-radius:10px;padding:20px 22px 16px;margin:22px 0 18px;font-family:inherit}",
      ".fda-bloco h3{color:#a91537;font-size:16px;margin:0 0 4px;font-weight:700}",
      ".fda-sub{color:#555;font-size:13px;margin:0 0 14px;line-height:1.5}",
      ".fda-btn-agendar{width:100%;background:#a91537;color:#fff;border:none;padding:11px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;margin-top:4px}",
      ".fda-btn-agendar:hover{background:#8a1029}",
      ".fda-resumo{background:#fff;border:1.5px solid #e8c9a0;border-radius:8px;padding:12px 14px;margin-top:10px}",
      ".fda-resumo-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px}",
      ".fda-resumo-item label{font-size:11px;color:#888;display:block;margin-bottom:2px}",
      ".fda-resumo-item strong{font-size:13px;color:#333;display:block}",
      ".fda-resumo-item span{font-size:11px;color:#888}",
      ".fda-aviso-frete{background:#f0f7ff;border-left:3px solid #378add;color:#185fa5;font-size:12px;padding:8px 10px;border-radius:0 6px 6px 0;margin-top:8px;line-height:1.5}",
      ".fda-btn-alterar{background:none;border:1px solid #a91537;color:#a91537;border-radius:6px;padding:6px 14px;font-size:12px;cursor:pointer;margin-top:8px}",
      ".fda-btn-alterar:hover{background:#fff0f3}",
      ".fda-erro{color:#c0392b;font-size:12px;margin-top:6px;display:none}",
      ".fda-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:99999;align-items:center;justify-content:center}",
      ".fda-overlay.ativo{display:flex}",
      ".fda-modal{background:#fff;border-radius:12px;width:90%;max-width:620px;overflow:hidden;max-height:90vh;overflow-y:auto}",
      ".fda-modal-header{padding:14px 18px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between}",
      ".fda-modal-header h4{font-size:15px;font-weight:600;color:#333;margin:0}",
      ".fda-modal-fechar{background:none;border:none;font-size:22px;color:#999;cursor:pointer;line-height:1}",
      ".fda-modal-body{display:grid;grid-template-columns:1fr 1fr;min-height:320px}",
      "@media(max-width:520px){.fda-modal-body{grid-template-columns:1fr}.fda-per-lado{border-left:none!important;border-top:1px solid #eee}}",
      ".fda-cal-lado{padding:14px}",
      ".fda-per-lado{padding:14px;border-left:1px solid #eee}",
      ".fda-cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}",
      ".fda-cal-nav span{font-size:13px;font-weight:600;color:#333}",
      ".fda-cal-nav button{background:none;border:1px solid #ddd;border-radius:6px;width:26px;height:26px;cursor:pointer;font-size:15px;color:#666;display:flex;align-items:center;justify-content:center}",
      ".fda-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}",
      ".fda-dow{font-size:10px;color:#aaa;text-align:center;padding:2px 0}",
      ".fda-day{font-size:12px;text-align:center;padding:6px 2px;border-radius:6px;cursor:default;border:none;background:none;width:100%;color:#ccc}",
      ".fda-day.disp{background:#e8f5f0;color:#0a5c3a;cursor:pointer}",
      ".fda-day.disp:hover{background:#c5e8d8}",
      ".fda-day.sel{background:#a91537;color:#fff}",
      ".fda-day.hoje-borda{outline:1.5px solid #a91537;outline-offset:-1px}",
      ".fda-legenda{display:flex;gap:10px;margin-top:8px;flex-wrap:wrap}",
      ".fda-leg{display:flex;align-items:center;gap:4px;font-size:10px;color:#888}",
      ".fda-leg-dot{width:10px;height:10px;border-radius:3px}",
      ".fda-per-titulo{font-size:12px;font-weight:600;color:#888;margin-bottom:10px}",
      ".fda-periodo{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e8c9a0;border-radius:7px;margin-bottom:8px;cursor:pointer}",
      ".fda-periodo:hover{border-color:#a91537}",
      ".fda-periodo.sel{border-color:#a91537;background:#fff5e1}",
      ".fda-periodo.bloq{opacity:.4;cursor:default;pointer-events:none}",
      ".fda-periodo input{accent-color:#a91537;width:14px;height:14px;flex-shrink:0}",
      ".fda-per-nome{font-size:13px;font-weight:600;color:#333}",
      ".fda-per-hora{font-size:11px;color:#888}",
      ".fda-modal-resumo{border-top:1px solid #eee;padding:12px 18px;display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".fda-modal-res-item label{font-size:11px;color:#888;display:flex;align-items:center;gap:4px;margin-bottom:2px}",
      ".fda-modal-res-item strong{font-size:13px;color:#333}",
      ".fda-modal-res-item small{font-size:11px;color:#aaa;display:block}",
      ".fda-btn-confirmar{width:calc(100% - 36px);margin:0 18px 16px;background:#a91537;color:#fff;border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}",
      ".fda-btn-confirmar:disabled{background:#ccc;cursor:default}",
      ".fda-btn-confirmar:not(:disabled):hover{background:#8a1029}"
    ].join("");
    var s=document.createElement("style");s.innerHTML=css;document.head.appendChild(s);
  }

  function montarBloco(){
    var div=document.createElement("div");
    div.id="fda-bloco";div.className="fda-bloco";
    div.innerHTML=[
      '<h3>&#128666; Agendar entrega</h3>',
      '<p class="fda-sub">Escolha a data e o período que preferir para receber seu pedido.</p>',
      '<button class="fda-btn-agendar" id="fda-btn-abrir">Escolher data e período</button>',
      '<div class="fda-erro" id="fda-erro-ag">Por favor, agende a entrega antes de continuar.</div>',
      '<div id="fda-resumo-box" style="display:none">',
        '<div class="fda-resumo">',
          '<div class="fda-resumo-grid">',
            '<div class="fda-resumo-item"><label>&#128197; Data escolhida</label><strong id="fda-res-data">—</strong><span id="fda-res-diasem"></span></div>',
            '<div class="fda-resumo-item"><label>&#128336; Período escolhido</label><strong id="fda-res-per">—</strong><span id="fda-res-hora"></span></div>',
          '</div>',
          '<div class="fda-aviso-frete">Consulte a disponibilidade de entrega para o seu bairro e o valor do frete no campo <strong>Calcule o frete</strong> abaixo.</div>',
          '<button class="fda-btn-alterar" id="fda-btn-alterar">Alterar agendamento</button>',
        '</div>',
      '</div>'
    ].join("");
    return div;
  }

  function montarModal(){
    var overlay=document.createElement("div");
    overlay.id="fda-overlay";overlay.className="fda-overlay";
    overlay.innerHTML=[
      '<div class="fda-modal" id="fda-modal">',
        '<div class="fda-modal-header"><h4>Escolha a data e o período de entrega</h4><button class="fda-modal-fechar" id="fda-fechar">&times;</button></div>',
        '<div class="fda-modal-body">',
          '<div class="fda-cal-lado">',
            '<div class="fda-cal-nav"><button id="fda-mes-ant">&#8249;</button><span id="fda-mes-titulo"></span><button id="fda-mes-prox">&#8250;</button></div>',
            '<div class="fda-cal-grid" id="fda-cal-grid"></div>',
            '<div class="fda-legenda">',
              '<div class="fda-leg"><div class="fda-leg-dot" style="background:#a91537"></div>Selecionado</div>',
              '<div class="fda-leg"><div class="fda-leg-dot" style="background:#e8f5f0;border:1px solid #c5e8d8"></div>Disponível</div>',
              '<div class="fda-leg"><div class="fda-leg-dot" style="background:#f0f0f0"></div>Indisponível</div>',
            '</div>',
          '</div>',
          '<div class="fda-per-lado">',
            '<div class="fda-per-titulo" id="fda-per-titulo">Selecione uma data</div>',
            '<div id="fda-periodos"></div>',
          '</div>',
        '</div>',
        '<div class="fda-modal-resumo">',
          '<div class="fda-modal-res-item"><label>&#128197; Data escolhida</label><strong id="fda-modal-data">—</strong><small id="fda-modal-diasem"></small></div>',
          '<div class="fda-modal-res-item"><label>&#128336; Período escolhido</label><strong id="fda-modal-per">—</strong><small id="fda-modal-hora"></small></div>',
        '</div>',
        '<button class="fda-btn-confirmar" id="fda-btn-confirmar" disabled>Confirmar</button>',
      '</div>'
    ].join("");
    document.body.appendChild(overlay);
    return overlay;
  }

  function renderCal(){
    var titulo=document.getElementById("fda-mes-titulo");
    if(titulo)titulo.textContent=MESES[mesAtual]+" "+anoAtual;
    var grid=document.getElementById("fda-cal-grid");
    if(!grid)return;
    grid.innerHTML="";
    DIASABREV.forEach(function(d){
      var el=document.createElement("div");el.className="fda-dow";el.textContent=d;grid.appendChild(el);
    });
    var primeiro=new Date(anoAtual,mesAtual,1).getDay();
    for(var i=0;i<primeiro;i++){
      var el=document.createElement("button");el.className="fda-day";grid.appendChild(el);
    }
    var totalDias=new Date(anoAtual,mesAtual+1,0).getDate();
    var hj=hoje();
    for(var d=1;d<=totalDias;d++){
      var dt=new Date(anoAtual,mesAtual,d);
      var btn=document.createElement("button");
      btn.textContent=d;
      var disp=temPeriodoDisponivel(dt);
      var isSel=dataSel&&dataSel.getDate()===d&&dataSel.getMonth()===mesAtual&&dataSel.getFullYear()===anoAtual;
      var isHj=dt.getTime()===hj.getTime();
      if(isSel)btn.className="fda-day sel";
      else if(disp)btn.className="fda-day disp";
      else btn.className="fda-day";
      if(isHj&&!isSel)btn.classList.add("hoje-borda");
      if(disp&&!isSel)(function(dt2){btn.onclick=function(){selecionarDia(dt2);};})(new Date(dt));
      grid.appendChild(btn);
    }
  }

  function selecionarDia(d){
    dataSel=d;periodoSel=null;
    renderCal();renderPeriodos();atualizarModalResumo();
  }

  function renderPeriodos(){
    var cont=document.getElementById("fda-periodos");
    var tit=document.getElementById("fda-per-titulo");
    if(!cont)return;
    cont.innerHTML="";
    if(!dataSel){if(tit)tit.textContent="Selecione uma data";return;}
    if(tit)tit.textContent="Períodos disponíveis";
    var pers=periodosParaDia(dataSel);
    pers.forEach(function(p){
      var div=document.createElement("div");
      div.className="fda-periodo"+(periodoSel===p.id?" sel":"")+(p.ok?"":" bloq");
      div.innerHTML='<input type="radio" name="fda-per"'+(periodoSel===p.id?" checked":"")+'/><div><div class="fda-per-nome">'+p.nome+'</div><div class="fda-per-hora">'+p.hora+'</div></div>';
      if(p.ok)div.onclick=function(){periodoSel=p.id;renderPeriodos();atualizarModalResumo();};
      cont.appendChild(div);
    });
  }

  function atualizarModalResumo(){
    var md=document.getElementById("fda-modal-data");
    var mds=document.getElementById("fda-modal-diasem");
    var mp=document.getElementById("fda-modal-per");
    var mh=document.getElementById("fda-modal-hora");
    var btn=document.getElementById("fda-btn-confirmar");
    if(dataSel){if(md)md.textContent=dataSel.toLocaleDateString("pt-BR");if(mds)mds.textContent=DIASLONG[dataSel.getDay()];}
    else{if(md)md.textContent="—";if(mds)mds.textContent="";}
    if(periodoSel){var p=PERIODOS.find(function(x){return x.id===periodoSel;});if(mp)mp.textContent=p.nome;if(mh)mh.textContent=p.hora;}
    else{if(mp)mp.textContent="—";if(mh)mh.textContent="";}
    if(btn)btn.disabled=!(dataSel&&periodoSel);
  }

  function abrirModal(){
    var overlay=document.getElementById("fda-overlay");
    if(overlay){overlay.classList.add("ativo");renderCal();renderPeriodos();atualizarModalResumo();}
  }

  function fecharModal(){
    var overlay=document.getElementById("fda-overlay");
    if(overlay)overlay.classList.remove("ativo");
  }

  function mostrarResumoNaPagina(){
    var p=PERIODOS.find(function(x){return x.id===periodoSel;});
    var rd=document.getElementById("fda-res-data");
    var rds=document.getElementById("fda-res-diasem");
    var rp=document.getElementById("fda-res-per");
    var rh=document.getElementById("fda-res-hora");
    if(rd)rd.textContent=dataSel.toLocaleDateString("pt-BR");
    if(rds)rds.textContent=DIASLONG[dataSel.getDay()];
    if(rp)rp.textContent=p.nome;
    if(rh)rh.textContent=p.hora;
    var btnAbrir=document.getElementById("fda-btn-abrir");
    var resumoBox=document.getElementById("fda-resumo-box");
    var erroAg=document.getElementById("fda-erro-ag");
    if(btnAbrir)btnAbrir.style.display="none";
    if(resumoBox)resumoBox.style.display="block";
    if(erroAg)erroAg.style.display="none";
  }

  function confirmarAgendamento(){
    if(!dataSel||!periodoSel)return;
    agendamentoConfirmado=true;
    salvarSessao();
    mostrarResumoNaPagina();
    fecharModal();
  }

  function init(){
    var isProd=document.body&&(
      document.body.classList.contains("pagina-produto")||
      document.querySelector(".produto")!==null
    );
    if(!isProd)return;
    if(window.location.href.indexOf("adicional")!==-1)return;

    var dow=new Date().getDay();
    if(dow===0||dow===6)return;

    var tentativas=0;
    function tentar(){
      tentativas++;
      var elNome=document.querySelector("h1.nome-produto")||document.querySelector(".nome-produto");
      var nomeProd=elNome?elNome.innerText.trim():"";
      if(!nomeProdutoValido(nomeProd)){
        if(tentativas<20)setTimeout(tentar,300);
        return;
      }
      if(normalizar(nomeProd).indexOf("adicional")===0)return;
      montar();
    }
    setTimeout(tentar,300);
  }

  function montar(){
    injetarCSS();
    var bloco=montarBloco();
    montarModal();

    var alvos=[".acoes-produto .comprar",".cep","#formCalcularCep",".acoes-produto",".produto .span6 .principal"];
    var ok=false;
    for(var i=0;i<alvos.length;i++){
      var a=document.querySelector(alvos[i]);
      if(a){a.parentNode.insertBefore(bloco,a);ok=true;break;}
    }
    if(!ok){var p=document.querySelector(".principal")||document.querySelector(".produto");if(p)p.appendChild(bloco);}

    var tinha=restaurarSessao();
    if(tinha){agendamentoConfirmado=true;mostrarResumoNaPagina();}

    document.getElementById("fda-btn-abrir").onclick=abrirModal;
    document.getElementById("fda-btn-alterar").onclick=function(){
      agendamentoConfirmado=false;
      var btnAbrir=document.getElementById("fda-btn-abrir");
      var resumoBox=document.getElementById("fda-resumo-box");
      if(btnAbrir)btnAbrir.style.display="block";
      if(resumoBox)resumoBox.style.display="none";
      abrirModal();
    };
    document.getElementById("fda-fechar").onclick=fecharModal;
    document.getElementById("fda-overlay").onclick=function(e){if(e.target===this)fecharModal();};
    document.getElementById("fda-mes-ant").onclick=function(){mesAtual--;if(mesAtual<0){mesAtual=11;anoAtual--;}renderCal();};
    document.getElementById("fda-mes-prox").onclick=function(){mesAtual++;if(mesAtual>11){mesAtual=0;anoAtual++;}renderCal();};
    document.getElementById("fda-btn-confirmar").onclick=confirmarAgendamento;

    document.addEventListener("click",function(e){
      var el=e.target;
      while(el&&el!==document){
        if(isBotaoComprar(el))break;
        el=el.parentNode;
      }
      if(!el||el===document||!isBotaoComprar(el))return;
      if(!agendamentoConfirmado){
        e.preventDefault();e.stopPropagation();
        var erroAg=document.getElementById("fda-erro-ag");
        if(erroAg)erroAg.style.display="block";
        document.getElementById("fda-bloco").scrollIntoView({behavior:"smooth",block:"center"});
        abrirModal();
      }
    },true);
  }

  if(document.readyState==="complete"){init();}
  else{window.addEventListener("load",init);}

})();
