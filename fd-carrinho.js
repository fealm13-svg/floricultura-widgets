(function(){

  var CFG={
    emailjs_service_id:"service_8nyc25b",
    emailjs_template_id:"template_jaeoc5u",
    emailjs_public_key:"LZISdXcU2KCrtNwVd"
  };

  var PERIODOS_ENTREGA=[
    {id:"m1",nome:"Manhã I",hora:"9:00 – 10:30",ini:9,dias:[1,2,3,4,5]},
    {id:"m2",nome:"Manhã II",hora:"10:30 – 12:00",ini:10.5,dias:[1,2,3,4,5]},
    {id:"t1",nome:"Tarde I",hora:"12:30 – 15:00",ini:12.5,dias:[1,2,3,4,5]},
    {id:"t2",nome:"Tarde II",hora:"15:00 – 17:00",ini:15,dias:[1,2,3,4,5],tolerancia:0.5}
  ];

  var PERIODOS_RETIRADA=[];
  [8,9,10,11,12,13,14,15,16,17,18].forEach(function(h){
    PERIODOS_RETIRADA.push({id:"r"+h,nome:"Entre "+h+"h – "+(h+1)+"h",hora:h+":00 – "+(h+1)+":00",ini:h,dias:[1,2,3,4,5]});
  });
  [10,11,12,13].forEach(function(h){
    PERIODOS_RETIRADA.push({id:"rw"+h,nome:"Entre "+h+"h – "+(h+1)+"h",hora:h+":00 – "+(h+1)+":00",ini:h,dias:[6,0]});
  });

  var TERMOS={
    entrega:"Seu pedido será entregue dentro do período selecionado no momento da compra. Acompanhe as atualizações enviadas por e-mail. Em caso de qualquer imprevisto, nossa equipe de atendimento entrará em contato via WhatsApp. O motorista permanecerá no local por até 10 (dez) minutos. Caso a entrega não seja concluída nesse período, o pedido retornará à loja. Para um novo envio, será necessária a cobrança de uma nova taxa de entrega.",
    retirada:"Seu pedido estará disponível para retirada no período selecionado no momento da compra. Aguarde a confirmação enviada por e-mail ou WhatsApp. Em caso de qualquer imprevisto, nossa equipe de atendimento entrará em contato. A retirada deverá ser realizada dentro do período agendado. Recomendamos que compareça no horário escolhido para evitar espera. Caso o cliente não compareça para a retirada, o pedido permanecerá disponível na loja por tempo limitado, podendo haver perda da qualidade dos produtos perecíveis."
  };

  var MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var DIASLONG=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  var DIASABREV=["dom","seg","ter","qua","qui","sex","sáb"];

  var tipo="entrega";
  var dataSel=null,periodoSel=null,agConfirmado=false;
  var mesAtual=new Date().getMonth(),anoAtual=new Date().getFullYear();
  var semMensagem=false;

  function isCarrinho(){
    return window.location.href.indexOf("/carrinho")!==-1||
           document.body.classList.contains("pagina-carrinho")||
           document.querySelector(".carrinho-interno")!==null||
           document.querySelector(".cart-items")!==null;
  }

  function isBotaoFinalizar(el){
    if(!el||!el.classList)return false;
    var txt=(el.innerText||el.textContent||"").toLowerCase();
    return (
      el.classList.contains("finalizar")||
      el.classList.contains("btn-finalizar")||
      el.classList.contains("checkout")||
      txt.indexOf("finalizar")!==-1||
      txt.indexOf("checkout")!==-1
    );
  }

  function hoje(){var d=new Date();d.setHours(0,0,0,0);return d;}
  function addDias(d,n){var r=new Date(d);r.setDate(r.getDate()+n);return r;}
  function getPeriodos(){return tipo==="entrega"?PERIODOS_ENTREGA:PERIODOS_RETIRADA;}

  function isCesta(){
    var itens=document.querySelectorAll(".nome-produto,.product-name,.item-name");
    for(var i=0;i<itens.length;i++){
      if(itens[i].innerText&&itens[i].innerText.toLowerCase().indexOf("cesta")!==-1)return true;
    }
    return false;
  }

  function minData(){
    var h=new Date().getHours()+new Date().getMinutes()/60;
    if(isCesta()){
      if(h>=18)return addDias(hoje(),2);
      return addDias(hoje(),1);
    }
    return hoje();
  }

  function periodosParaDia(d){
    var h=new Date().getHours()+new Date().getMinutes()/60;
    var dd=new Date(d);dd.setHours(0,0,0,0);
    var isHoje=dd.getTime()===hoje().getTime();
    var isAmanha=dd.getTime()===addDias(hoje(),1).getTime();
    return getPeriodos().map(function(p){
      if(p.dias.indexOf(dd.getDay())===-1)return Object.assign({},p,{ok:false});
      if(isCesta()&&h>=18&&isAmanha)return Object.assign({},p,{ok:p.id==="m2"});
      if(isHoje){
        if(p.tolerancia)return Object.assign({},p,{ok:h<=p.ini+p.tolerancia});
        return Object.assign({},p,{ok:(p.ini-h)>=1});
      }
      return Object.assign({},p,{ok:true});
    });
  }

  function temDisp(d){
    var min=minData();min.setHours(0,0,0,0);
    var dd=new Date(d);dd.setHours(0,0,0,0);
    if(dd<min||dd>addDias(hoje(),30))return false;
    return periodosParaDia(d).some(function(p){return p.ok;});
  }

  function mascaraTel(el){
    var v=el.value.replace(/\D/g,"").substring(0,11);
    if(v.length<=2)v="("+v;
    else if(v.length<=6)v="("+v.substring(0,2)+") "+v.substring(2);
    else if(v.length<=10)v="("+v.substring(0,2)+") "+v.substring(2,6)+"-"+v.substring(6);
    else v="("+v.substring(0,2)+") "+v.substring(2,7)+"-"+v.substring(7);
    el.value=v;
  }

  function injetarCSS(){
    var css=[
      ".fdc-bloco{background:#f7f7f2;border:1.5px solid #e0d5c0;border-radius:10px;padding:20px 22px;margin:22px 0;font-family:inherit}",
      ".fdc-titulo{color:#a91537;font-size:16px;font-weight:700;margin-bottom:16px}",
      ".fdc-toggle{display:flex;margin-bottom:18px;border:1.5px solid #95a37b;border-radius:8px;overflow:hidden}",
      ".fdc-toggle-btn{flex:1;padding:10px;background:none;border:none;font-size:13px;font-weight:600;cursor:pointer;color:#95a37b;transition:all .2s}",
      ".fdc-toggle-btn.ativo{background:#95a37b;color:#2d3a20}",
      ".fdc-sec{font-size:13px;font-weight:700;color:#a91537;margin:16px 0 10px;padding-bottom:6px;border-bottom:1px solid #e0d5c0}",
      ".fdc-campo{margin-bottom:12px}",
      ".fdc-campo label{display:block;font-size:13px;font-weight:600;color:#444;margin-bottom:4px}",
      ".fdc-campo label small{font-weight:400;color:#888;font-size:11px;display:block;margin-top:1px}",
      ".fdc-campo input,.fdc-campo textarea{width:100%;box-sizing:border-box;border:1.5px solid #e0d5c0;border-radius:7px;padding:9px 12px;font-size:14px;font-family:inherit;background:#fff;color:#333;outline:none;transition:border-color .2s}",
      ".fdc-campo input:focus,.fdc-campo textarea:focus{border-color:#a91537}",
      ".fdc-campo input.fdc-err,.fdc-campo textarea.fdc-err{border-color:#c0392b;background:#fff8f8}",
      ".fdc-campo textarea{resize:vertical;min-height:90px}",
      ".fdc-campo textarea:disabled{background:#f5f5f5;color:#aaa;cursor:not-allowed}",
      ".fdc-grid{display:grid;grid-template-columns:2fr 1fr;gap:10px;margin-bottom:12px}",
      ".fdc-contador{text-align:right;font-size:11px;color:#aaa;margin-top:3px}",
      ".fdc-sem-msg{display:flex;align-items:center;gap:8px;font-size:12px;color:#666;cursor:pointer;margin-top:6px;user-select:none}",
      ".fdc-sem-msg input{accent-color:#95a37b;width:14px;height:14px;flex-shrink:0;cursor:pointer}",
      ".fdc-btn-ag{width:100%;background:#a91537;color:#fff;border:none;padding:11px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:10px}",
      ".fdc-btn-ag:hover{background:#8a1029}",
      ".fdc-resumo-ag{background:#fff;border:1.5px solid #e0d5c0;border-radius:8px;padding:12px 14px;margin-bottom:12px}",
      ".fdc-resumo-ag-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}",
      ".fdc-resumo-ag-item label{font-size:11px;color:#888;display:block;margin-bottom:2px}",
      ".fdc-resumo-ag-item strong{font-size:13px;color:#333;display:block}",
      ".fdc-resumo-ag-item span{font-size:11px;color:#888}",
      ".fdc-btn-alt{background:none;border:1px solid #a91537;color:#a91537;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer}",
      ".fdc-btn-alt:hover{background:#fff0f3}",
      ".fdc-aviso{background:#f0f7ff;border-left:3px solid #378add;color:#185fa5;font-size:12px;padding:8px 10px;border-radius:0 6px 6px 0;margin-bottom:14px;line-height:1.5}",
      ".fdc-termo-wrap{background:#fff;border:1.5px solid #e0d5c0;border-radius:8px;padding:12px 14px}",
      ".fdc-termo-txt{font-size:11px;color:#555;line-height:1.6;margin-bottom:10px;max-height:75px;overflow-y:auto}",
      ".fdc-termo-check{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#444;cursor:pointer}",
      ".fdc-termo-check input{margin-top:2px;accent-color:#a91537;width:14px;height:14px;flex-shrink:0}",
      ".fdc-status{margin-top:14px;background:#fff;border:1.5px solid #e0d5c0;border-radius:8px;padding:10px 14px}",
      ".fdc-status p{font-size:12px;color:#888;margin-bottom:6px}",
      ".fdc-status-items{display:flex;flex-wrap:wrap;gap:6px}",
      ".fdc-st{font-size:11px;padding:3px 10px;border-radius:20px;background:#efefef;color:#999}",
      ".fdc-st.ok{background:#e8f5f0;color:#0a5c3a}",
      ".fdc-erro-geral{color:#c0392b;font-size:12px;margin-top:8px;display:none;padding:8px 10px;background:#fde8e8;border-radius:6px;border-left:3px solid #c0392b}",

      // Modal
      ".fdc-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:99999;align-items:center;justify-content:center}",
      ".fdc-overlay.ativo{display:flex}",
      ".fdc-modal{background:#fff;border-radius:12px;width:90%;max-width:620px;overflow:hidden;max-height:90vh;overflow-y:auto}",
      ".fdc-modal-header{padding:14px 18px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:1}",
      ".fdc-modal-header h4{font-size:15px;font-weight:600;color:#333;margin:0}",
      ".fdc-modal-fechar{background:none;border:none;font-size:22px;color:#999;cursor:pointer;line-height:1}",
      ".fdc-modal-body{display:grid;grid-template-columns:1fr 1fr;min-height:300px}",
      "@media(max-width:520px){.fdc-modal-body{grid-template-columns:1fr}.fdc-per-lado{border-left:none!important;border-top:1px solid #eee}}",
      ".fdc-cal-lado{padding:14px}",
      ".fdc-per-lado{padding:14px;border-left:1px solid #eee}",
      ".fdc-cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}",
      ".fdc-cal-nav span{font-size:13px;font-weight:600;color:#333}",
      ".fdc-cal-nav button{background:none;border:1px solid #ddd;border-radius:6px;width:26px;height:26px;cursor:pointer;font-size:15px;color:#666;display:flex;align-items:center;justify-content:center}",
      ".fdc-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}",
      ".fdc-dow{font-size:10px;color:#aaa;text-align:center;padding:2px 0}",
      ".fdc-day{font-size:12px;text-align:center;padding:6px 2px;border-radius:6px;cursor:default;border:none;background:none;width:100%;color:#ccc}",
      ".fdc-day.disp{background:#e8f5f0;color:#0a5c3a;cursor:pointer}",
      ".fdc-day.disp:hover{background:#c5e8d8}",
      ".fdc-day.sel{background:#a91537;color:#fff}",
      ".fdc-day.hj{outline:1.5px solid #a91537;outline-offset:-1px}",
      ".fdc-legenda{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap}",
      ".fdc-leg{display:flex;align-items:center;gap:4px;font-size:10px;color:#888}",
      ".fdc-leg-dot{width:10px;height:10px;border-radius:3px}",
      ".fdc-per-titulo{font-size:12px;font-weight:600;color:#888;margin-bottom:10px}",
      ".fdc-periodo{display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid #e8c9a0;border-radius:7px;margin-bottom:8px;cursor:pointer}",
      ".fdc-periodo:hover{border-color:#a91537}",
      ".fdc-periodo.sel{border-color:#a91537;background:#fff5e1}",
      ".fdc-periodo.bloq{opacity:.4;cursor:default;pointer-events:none}",
      ".fdc-periodo input{accent-color:#a91537;width:14px;height:14px;flex-shrink:0}",
      ".fdc-per-nome{font-size:13px;font-weight:600;color:#333}",
      ".fdc-per-hora{font-size:11px;color:#888}",
      ".fdc-modal-resumo{border-top:1px solid #eee;padding:12px 18px;display:grid;grid-template-columns:1fr 1fr;gap:8px}",
      ".fdc-modal-res label{font-size:11px;color:#888;margin-bottom:2px;display:block}",
      ".fdc-modal-res strong{font-size:13px;color:#333}",
      ".fdc-modal-res small{font-size:11px;color:#aaa;display:block}",
      ".fdc-btn-conf{width:calc(100% - 36px);margin:0 18px 16px;background:#a91537;color:#fff;border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:600;cursor:pointer}",
      ".fdc-btn-conf:disabled{background:#ccc;cursor:default}",
      ".fdc-btn-conf:not(:disabled):hover{background:#8a1029}"
    ].join("");
    var s=document.createElement("style");s.innerHTML=css;document.head.appendChild(s);
  }

  function montarBloco(){
    var div=document.createElement("div");
    div.id="fdc-bloco";div.className="fdc-bloco";
    div.innerHTML=[
      '<div class="fdc-titulo">🌸 Dados do Pedido</div>',

      '<div class="fdc-toggle">',
        '<button class="fdc-toggle-btn ativo" id="fdc-btn-ent" onclick="fdcSetTipo(\'entrega\')">🚚 Entrega</button>',
        '<button class="fdc-toggle-btn" id="fdc-btn-ret" onclick="fdcSetTipo(\'retirada\')">🏪 Retirada na loja</button>',
      '</div>',

      '<div id="fdc-bloco-pres">',
        '<div class="fdc-sec">Presenteado</div>',
        '<div class="fdc-campo">',
          '<label>Nome completo de quem vai receber</label>',
          '<input type="text" id="fdc-nome" placeholder="Ex.: Maria da Silva" maxlength="80" oninput="fdcVerificar()"/>',
        '</div>',
        '<div class="fdc-campo">',
          '<label>WhatsApp de quem vai receber<small>Só entramos em contato se não conseguirmos falar com o comprador</small></label>',
          '<input type="tel" id="fdc-tel" placeholder="(11) 98765-4321" maxlength="15" oninput="fdcMascaraTel(this);fdcVerificar()"/>',
        '</div>',
      '</div>',

      '<div class="fdc-sec">Mensagem do Cartãozinho</div>',
      '<div class="fdc-campo">',
        '<textarea id="fdc-msg" maxlength="500" placeholder="Digite aqui sua mensagem de coração... não se esqueça de assinar a msg =)"></textarea>',
        '<div class="fdc-contador"><span id="fdc-faltam">500</span> caracteres restantes</div>',
      '</div>',
      '<label class="fdc-sem-msg"><input type="checkbox" id="fdc-sem-msg" onchange="fdcToggleSemMsg()"/> Sem mensagem de cartão</label>',

      '<div id="fdc-bloco-end">',
        '<div class="fdc-sec">Endereço de Entrega</div>',
        '<div class="fdc-campo"><label>Rua / Avenida</label><input type="text" id="fdc-rua" placeholder="Ex.: Al. Barão de Limeira" oninput="fdcVerificar()"/></div>',
        '<div class="fdc-grid">',
          '<div class="fdc-campo" style="margin-bottom:0"><label>Número</label><input type="text" id="fdc-num" placeholder="998" oninput="fdcVerificar()"/></div>',
          '<div class="fdc-campo" style="margin-bottom:0"><label>Complemento</label><input type="text" id="fdc-comp" placeholder="Apto, sala..."/></div>',
        '</div>',
        '<div class="fdc-campo" style="margin-top:12px"><label>Departamento / Ramal<small>Opcional — para endereços comerciais</small></label><input type="text" id="fdc-ramal" placeholder="Ex.: Depto. Financeiro, Ramal 204"/></div>',
        '<div class="fdc-aviso">Consulte a disponibilidade de entrega para o seu bairro e o valor do frete no campo <strong>Calcule o frete</strong> abaixo.</div>',
      '</div>',

      '<div class="fdc-sec">Agendamento</div>',
      '<button class="fdc-btn-ag" id="fdc-btn-ag" onclick="fdcAbrirModal()">📅 Escolher data e período</button>',
      '<div id="fdc-resumo-ag" style="display:none" class="fdc-resumo-ag">',
        '<div class="fdc-resumo-ag-grid">',
          '<div class="fdc-resumo-ag-item"><label>📅 Data</label><strong id="fdc-res-data">—</strong><span id="fdc-res-diasem"></span></div>',
          '<div class="fdc-resumo-ag-item"><label>🕐 Período</label><strong id="fdc-res-per">—</strong><span id="fdc-res-hora"></span></div>',
        '</div>',
        '<button class="fdc-btn-alt" onclick="fdcAlterar()">Alterar agendamento</button>',
      '</div>',

      '<div class="fdc-sec">Termos</div>',
      '<div class="fdc-termo-wrap">',
        '<div class="fdc-termo-txt" id="fdc-termo-txt">'+TERMOS.entrega+'</div>',
        '<label class="fdc-termo-check"><input type="checkbox" id="fdc-termo" onchange="fdcVerificar()"/> Estou ciente dos termos</label>',
      '</div>',

      '<div class="fdc-status">',
        '<p>Para finalizar, preencha todos os campos obrigatórios:</p>',
        '<div class="fdc-status-items">',
          '<div class="fdc-st" id="fdc-st-nome">Nome</div>',
          '<div class="fdc-st" id="fdc-st-tel">Telefone</div>',
          '<div class="fdc-st" id="fdc-st-end">Endereço</div>',
          '<div class="fdc-st" id="fdc-st-ag">Agendamento</div>',
          '<div class="fdc-st" id="fdc-st-termo">Termos</div>',
        '</div>',
      '</div>',

      '<div class="fdc-erro-geral" id="fdc-erro-geral">Por favor, preencha todos os campos obrigatórios antes de finalizar.</div>',
    ].join("");
    return div;
  }

  function montarModal(){
    var overlay=document.createElement("div");
    overlay.id="fdc-overlay";overlay.className="fdc-overlay";
    overlay.innerHTML=[
      '<div class="fdc-modal">',
        '<div class="fdc-modal-header">',
          '<h4 id="fdc-modal-titulo">Escolha a data e o período de entrega</h4>',
          '<button class="fdc-modal-fechar" onclick="fdcFecharModal()">&times;</button>',
        '</div>',
        '<div class="fdc-modal-body">',
          '<div class="fdc-cal-lado">',
            '<div class="fdc-cal-nav"><button onclick="fdcMudarMes(-1)">&#8249;</button><span id="fdc-mes-titulo"></span><button onclick="fdcMudarMes(1)">&#8250;</button></div>',
            '<div class="fdc-cal-grid" id="fdc-cal-grid"></div>',
            '<div class="fdc-legenda">',
              '<div class="fdc-leg"><div class="fdc-leg-dot" style="background:#a91537"></div>Selecionado</div>',
              '<div class="fdc-leg"><div class="fdc-leg-dot" style="background:#e8f5f0;border:1px solid #c5e8d8"></div>Disponível</div>',
              '<div class="fdc-leg"><div class="fdc-leg-dot" style="background:#f0f0f0"></div>Indisponível</div>',
            '</div>',
          '</div>',
          '<div class="fdc-per-lado">',
            '<div class="fdc-per-titulo" id="fdc-per-titulo">Selecione uma data</div>',
            '<div id="fdc-periodos"></div>',
          '</div>',
        '</div>',
        '<div class="fdc-modal-resumo">',
          '<div class="fdc-modal-res"><label>📅 Data escolhida</label><strong id="fdc-m-data">—</strong><small id="fdc-m-diasem"></small></div>',
          '<div class="fdc-modal-res"><label>🕐 Período escolhido</label><strong id="fdc-m-per">—</strong><small id="fdc-m-hora"></small></div>',
        '</div>',
        '<button class="fdc-btn-conf" id="fdc-btn-conf" disabled onclick="fdcConfirmar()">Confirmar</button>',
      '</div>'
    ].join("");
    document.body.appendChild(overlay);
    overlay.onclick=function(e){if(e.target===overlay)fdcFecharModal();};
  }

  // ── Funções globais (chamadas pelo onclick inline) ───────────────────
  window.fdcSetTipo=function(t){
    tipo=t;
    document.getElementById("fdc-btn-ent").className="fdc-toggle-btn"+(t==="entrega"?" ativo":"");
    document.getElementById("fdc-btn-ret").className="fdc-toggle-btn"+(t==="retirada"?" ativo":"");
    document.getElementById("fdc-bloco-pres").style.display=t==="entrega"?"block":"none";
    document.getElementById("fdc-bloco-end").style.display=t==="entrega"?"block":"none";
    document.getElementById("fdc-st-nome").style.display=t==="retirada"?"none":"inline-block";
    document.getElementById("fdc-st-tel").style.display=t==="retirada"?"none":"inline-block";
    document.getElementById("fdc-st-end").style.display=t==="retirada"?"none":"inline-block";
    document.getElementById("fdc-modal-titulo").textContent=t==="entrega"?"Escolha a data e o período de entrega":"Escolha a data e o período de retirada";
    document.getElementById("fdc-termo-txt").textContent=TERMOS[t];
    document.getElementById("fdc-termo").checked=false;
    dataSel=null;periodoSel=null;agConfirmado=false;
    document.getElementById("fdc-btn-ag").style.display="block";
    document.getElementById("fdc-resumo-ag").style.display="none";
    fdcVerificar();
  };

  window.fdcMascaraTel=function(el){
    var v=el.value.replace(/\D/g,"").substring(0,11);
    if(v.length<=2)v="("+v;
    else if(v.length<=6)v="("+v.substring(0,2)+") "+v.substring(2);
    else if(v.length<=10)v="("+v.substring(0,2)+") "+v.substring(2,6)+"-"+v.substring(6);
    else v="("+v.substring(0,2)+") "+v.substring(2,7)+"-"+v.substring(7);
    el.value=v;
  };

  window.fdcToggleSemMsg=function(){
    semMensagem=document.getElementById("fdc-sem-msg").checked;
    var txt=document.getElementById("fdc-msg");
    if(semMensagem){txt.value="";txt.disabled=true;}
    else{txt.disabled=false;txt.focus();}
  };

  window.fdcVerificar=function(){
    function st(id,ok){var e=document.getElementById(id);if(e)e.className="fdc-st"+(ok?" ok":"");}
    if(tipo==="entrega"){
      var nome=document.getElementById("fdc-nome").value.trim();
      var tel=document.getElementById("fdc-tel").value.trim();
      var rua=document.getElementById("fdc-rua").value.trim();
      var num=document.getElementById("fdc-num").value.trim();
      st("fdc-st-nome",!!nome);
      st("fdc-st-tel",tel.length>=14);
      st("fdc-st-end",!!(rua&&num));
    }
    st("fdc-st-ag",agConfirmado);
    st("fdc-st-termo",document.getElementById("fdc-termo").checked);
  };

  function tudo_valido(){
    var termo=document.getElementById("fdc-termo").checked;
    if(!agConfirmado||!termo)return false;
    if(tipo==="entrega"){
      var nome=document.getElementById("fdc-nome").value.trim();
      var tel=document.getElementById("fdc-tel").value.trim();
      var rua=document.getElementById("fdc-rua").value.trim();
      var num=document.getElementById("fdc-num").value.trim();
      if(!nome||tel.length<14||!rua||!num)return false;
    }
    return true;
  }

  window.fdcAbrirModal=function(){
    document.getElementById("fdc-overlay").classList.add("ativo");
    fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();
  };

  window.fdcFecharModal=function(){
    document.getElementById("fdc-overlay").classList.remove("ativo");
  };

  window.fdcMudarMes=function(d){
    mesAtual+=d;
    if(mesAtual<0){mesAtual=11;anoAtual--;}
    if(mesAtual>11){mesAtual=0;anoAtual++;}
    fdcRenderCal();
  };

  window.fdcConfirmar=function(){
    if(!dataSel||!periodoSel)return;
    agConfirmado=true;
    var p=getPeriodos().find(function(x){return x.id===periodoSel;});
    document.getElementById("fdc-res-data").textContent=dataSel.toLocaleDateString("pt-BR");
    document.getElementById("fdc-res-diasem").textContent=DIASLONG[dataSel.getDay()];
    document.getElementById("fdc-res-per").textContent=p.nome;
    document.getElementById("fdc-res-hora").textContent=p.hora;
    document.getElementById("fdc-btn-ag").style.display="none";
    document.getElementById("fdc-resumo-ag").style.display="block";
    fdcFecharModal();fdcVerificar();
  };

  window.fdcAlterar=function(){
    agConfirmado=false;
    document.getElementById("fdc-btn-ag").style.display="block";
    document.getElementById("fdc-resumo-ag").style.display="none";
    fdcAbrirModal();
  };

  function fdcRenderCal(){
    document.getElementById("fdc-mes-titulo").textContent=MESES[mesAtual]+" "+anoAtual;
    var grid=document.getElementById("fdc-cal-grid");grid.innerHTML="";
    DIASABREV.forEach(function(d){var e=document.createElement("div");e.className="fdc-dow";e.textContent=d;grid.appendChild(e);});
    var p=new Date(anoAtual,mesAtual,1).getDay();
    for(var i=0;i<p;i++){var e=document.createElement("button");e.className="fdc-day";grid.appendChild(e);}
    var tot=new Date(anoAtual,mesAtual+1,0).getDate();
    var hj=hoje();
    for(var d=1;d<=tot;d++){
      var dt=new Date(anoAtual,mesAtual,d);
      var b=document.createElement("button");b.textContent=d;
      var isSel=dataSel&&dataSel.getDate()===d&&dataSel.getMonth()===mesAtual&&dataSel.getFullYear()===anoAtual;
      var isHj=dt.getTime()===hj.getTime();
      b.className=isSel?"fdc-day sel":temDisp(dt)?"fdc-day disp":"fdc-day";
      if(isHj&&!isSel)b.classList.add("hj");
      if(temDisp(dt)&&!isSel)(function(dt2){b.onclick=function(){dataSel=dt2;periodoSel=null;fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();};})(new Date(dt));
      grid.appendChild(b);
    }
  }

  function fdcRenderPeriodos(){
    var c=document.getElementById("fdc-periodos"),t=document.getElementById("fdc-per-titulo");
    c.innerHTML="";
    if(!dataSel){t.textContent="Selecione uma data";return;}
    t.textContent="Períodos disponíveis";
    periodosParaDia(dataSel).forEach(function(p){
      var d=document.createElement("div");
      d.className="fdc-periodo"+(periodoSel===p.id?" sel":"")+(p.ok?"":" bloq");
      d.innerHTML='<input type="radio" name="fdc-per"'+(periodoSel===p.id?" checked":"")+'/><div><div class="fdc-per-nome">'+p.nome+'</div><div class="fdc-per-hora">'+p.hora+'</div></div>';
      if(p.ok)d.onclick=function(){periodoSel=p.id;fdcRenderPeriodos();fdcUpdRes();};
      c.appendChild(d);
    });
  }

  function fdcUpdRes(){
    var btn=document.getElementById("fdc-btn-conf");
    document.getElementById("fdc-m-data").textContent=dataSel?dataSel.toLocaleDateString("pt-BR"):"—";
    document.getElementById("fdc-m-diasem").textContent=dataSel?DIASLONG[dataSel.getDay()]:"";
    var p=periodoSel?getPeriodos().find(function(x){return x.id===periodoSel;}):null;
    document.getElementById("fdc-m-per").textContent=p?p.nome:"—";
    document.getElementById("fdc-m-hora").textContent=p?p.hora:"";
    btn.disabled=!(dataSel&&periodoSel);
  }

  function enviarEmail(){
    var p=periodoSel?getPeriodos().find(function(x){return x.id===periodoSel;}):null;
    var dados={
      tipo_pedido:tipo==="entrega"?"Entrega":"Retirada na loja",
      nome_presenteado:tipo==="entrega"?(document.getElementById("fdc-nome")||{}).value||"(não informado)":"(retirada na loja)",
      tel_presenteado:tipo==="entrega"?(document.getElementById("fdc-tel")||{}).value||"(não informado)":"(retirada na loja)",
      mensagem:semMensagem?"(sem mensagem de cartão)":((document.getElementById("fdc-msg")||{}).value||"(não informada)"),
      endereco:tipo==="entrega"?[
        (document.getElementById("fdc-rua")||{}).value||"",
        (document.getElementById("fdc-num")||{}).value||"",
        (document.getElementById("fdc-comp")||{}).value||"",
        (document.getElementById("fdc-ramal")||{}).value||""
      ].filter(Boolean).join(", "):"(retirada na loja)",
      data_entrega:dataSel?dataSel.toLocaleDateString("pt-BR"):"(não informado)",
      periodo_entrega:p?p.nome+" ("+p.hora+")":"(não informado)",
      data_hora:new Date().toLocaleString("pt-BR"),
      pagina:window.location.href
    };

    function send(){
      emailjs.init({publicKey:CFG.emailjs_public_key});
      emailjs.send(CFG.emailjs_service_id,CFG.emailjs_template_id,dados).then(function(){
        console.log("[FD] Email enviado.");
      },function(e){
        console.error("[FD] Erro:",e);
      });
    }
    if(typeof emailjs==="undefined"){
      var sc=document.createElement("script");
      sc.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      sc.onload=send;document.head.appendChild(sc);
    }else{send();}
  }

  function init(){
    if(!isCarrinho())return;

    injetarCSS();
    var bloco=montarBloco();
    montarModal();

    // Insere antes da tabela de produtos ou do botão finalizar
    var alvos=[
      ".carrinho-produtos",
      ".cart-items",
      "table.carrinho",
      ".finalizar-compra",
      ".cart-summary",
      "#conteudo-carrinho",
      ".conteiner-principal .conteiner"
    ];
    var ok=false;
    for(var i=0;i<alvos.length;i++){
      var a=document.querySelector(alvos[i]);
      if(a){a.parentNode.insertBefore(bloco,a);ok=true;break;}
    }
    if(!ok){
      var main=document.querySelector(".conteudo-principal")||document.querySelector("#corpo")||document.body;
      main.insertBefore(bloco,main.firstChild);
    }

    // Contador de caracteres
    document.getElementById("fdc-msg").addEventListener("input",function(){
      document.getElementById("fdc-faltam").textContent=500-this.value.length;
    });

    // Intercepta botão finalizar
    document.addEventListener("click",function(e){
      var el=e.target;
      while(el&&el!==document){
        if(isBotaoFinalizar(el))break;
        el=el.parentNode;
      }
      if(!el||el===document||!isBotaoFinalizar(el))return;
      if(!tudo_valido()){
        e.preventDefault();e.stopPropagation();
        var err=document.getElementById("fdc-erro-geral");
        if(err)err.style.display="block";
        document.getElementById("fdc-bloco").scrollIntoView({behavior:"smooth",block:"start"});
        fdcVerificar();
        return;
      }
      enviarEmail();
    },true);

    fdcVerificar();
  }

  if(document.readyState==="complete"){init();}
  else{window.addEventListener("load",init);}

})();
