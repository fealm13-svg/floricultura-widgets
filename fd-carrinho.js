(function(){

  if(window.location.pathname.indexOf("/carrinho")===-1)return;

  var CFG={
    emailjs_service_id:"service_8nyc25b",
    emailjs_template_id:"template_jaeoc5u",
    emailjs_public_key:"LZISdXcU2KCrtNwVd"
  };

  // ── Dia dos Namorados ────────────────────────────────────────────────
  var _nam=(typeof window.FD_CONFIG==="object"&&window.FD_CONFIG&&window.FD_CONFIG.namorados)||{};
  var DATA_NAMORADOS=_nam.data||"2026-06-12";
  var URL_NAMORADOS="https://www.floriculturadias.com/dia-dos-namorados-2026";
  var _NAM_ENTREGA_OK=_nam.entrega_disponivel!==undefined?_nam.entrega_disponivel:true;
  var _NAM_RETIRADA_OK=_nam.retirada_disponivel!==undefined?_nam.retirada_disponivel:true;
  var LIMITE_ENTREGA_NAMORADOS=new Date(2026,5,10,23,59,59);
  var LIMITE_RETIRADA_NAMORADOS=new Date(2026,5,11,14,59,59);

  // Faixas de CEP para entrega no DIA 12/06 (restrita)
  var FAIXAS_CEP_NAMORADOS=[
    [1100000,1109999],[1110000,1135050],[1135050,1136050],
    [1150011,1153050],[1154000,1160000],
    [1200000,1206010],[1207000,1213010],[1214000,1217020],
    [1218000,1218999],[1219000,1233070],[1234000,1244030]
  ];

  // Lista de produtos liberados para o dia 12 (Dia dos Namorados)
  var PRODUTOS_NAMORADOS=[
    "ADICIONAL - Lata Coração Lindt 50g",
    "Arranjo Corvelle - 6 Rosas IMPORTADAS + Vaso de Vidro",
    "Arranjo Elysée",
    "Arranjo Loures",
    "Arranjo Rougelle - 24 Rosas Nacionais",
    "Buquê Abrantes M",
    "Buquê Abrantes P",
    "Buquê Alverca",
    "Buquê Ardens - 15 Rosas Nacionais",
    "Buquê Aruna - Rosas IMPORTADAS e Astromelias",
    "Buquê Auraviva",
    "Buquê Aveiro - 12 Rosas Nacionais",
    "Buquê Belladore - 9 Rosas Nacionais",
    "Buquê Carmora - 9 Rosas IMPORTADAS",
    "Buquê Floravelle",
    "Buquê Gandra",
    "Buquê Higienópolis",
    "Buquê Mini Aveiro - 6 Rosas Nacionais",
    "Buquê Mini Carmora - 6 Rosas IMPORTADAS",
    "Buquê Raiara",
    "Buquê Ravenna - 24 Rosas IMPORTADAS",
    "Buquê Vértice - 3 Rosas IMPORTADAS e Astromelias",
    "Buquê Volcania - 12 Rosas IMPORTADAS",
    "Cesta Bellarouge - Queijo e Vinho",
    "Kit Alenquer",
    "Kit Alentejo",
    "Kit Alvalade",
    "Kit Amália",
    "Kit Amarielle - Buquê 12 Rosas Nacionais + Ferrero Rocher",
    "Kit Aurora",
    "Kit Blue & Gold - Buquê Mix Azul + Ferrero Rocher 100g",
    "Kit Bom Retiro - Rosas IMPORTADAS + Urso Articulado com Laço",
    "Kit Cartagena - Rosas IMPORTADAS + Ferrero Rocher 100g",
    "Kit Delavie - 9 Rosas IMPORTADAS + Ferrero Rocher 100g",
    "Kit Dolce Passione",
    "Kit Faro",
    "Kit Grand Allure",
    "Kit Itacolomi",
    "Kit Lancaster",
    "Kit Lovelle",
    "Kit Mariza - Rosas IMPORTADAS + Ferrero Rocher 100g",
    "Kit Mirandela",
    "Kit Noely - Buquê 9 Rosas Nacionais + Urso de Pelúcia",
    "Kit Noêmia",
    "Kit Paredes - Buquê com 6 Rosas Nacionais + Chocolate Ferrero Rocher",
    "Kit Petit d'Élise",
    "Kit Portalegre - Buquê de 6 Rosas IMPORTADAS + Chococard Te Amo",
    "Kit Valadares",
    "Kit Viana do Castelo",
    "Mini Orquídea Phalaenopsis (Cor Aleatória)",
    "Orquídea Phalaenopsis Cascata",
    "Orquídea Phalaenopsis Cascata - 2 unidades no cesto",
    "Orquídea Phalaenopsis Cascata - Vaso de Vidro",
    "Orquídea Phalaenopsis Cascata 2 Hastes - Rosa e Branca",
    "Orquídea Phalaenopsis Cascata em Aquário"
  ];

  function carrinhoEhNamorados(){
    var itens=lerItensCarrinhoArray();
    if(itens.length===0)return false;
    for(var i=0;i<itens.length;i++){
      var nome=itens[i].trim();
      if(nome.toUpperCase().indexOf("ADICIONAL")!==-1)continue;
      var ok=false;
      for(var j=0;j<PRODUTOS_NAMORADOS.length;j++){
        if(nome===PRODUTOS_NAMORADOS[j]){ok=true;break;}
      }
      if(!ok)return false;
    }
    return true;
  }

  var FAIXAS_CEP=[
    [1032000,1033050],[1036000,1048000],[1100000,1109999],[1110000,1135050],
    [1135050,1136050],[1137000,1138800],[1139000,1150010],[1150011,1153050],
    [1154000,1160000],[1200000,1206010],[1207000,1213010],[1214000,1217020],
    [1218000,1218999],[1219000,1233070],[1234000,1244030],[2500000,2517999],
    [5000000,5001099],[5001150,5020000]
  ];

  // Faixas de CEP com trânsito intenso após as 15h
  // (Tarde III bloqueada para estes CEPs quando o cliente acessar após esse horário)
  var FAIXAS_CEP_TRANSITO=[
    [1100000,1109999],   // 3
    [1110000,1135050],   // 4
    [1135050,1136050],   // 5
    [1137000,1138800],   // 6
    [1139000,1150010],   // 7
    [1234000,1244030],   // 15
    [2500000,2517999],   // 16
    [5000000,5001099],   // 17
    [5001150,5020000]    // 18
  ];
  var HORA_BLOQUEIO_TRANSITO=15; // hora a partir da qual bloqueia Tarde III

  // Faixas de CEP com antecedência reduzida (entregas no mesmo dia)
  var FAIXAS_CEP_15MIN=[
    [1150011,1153050],
    [1200000,1206010],
    [1207000,1213010]
  ];
  var FAIXAS_CEP_30MIN=[
    [1154000,1160000],
    [1214000,1217020],
    [1218000,1218999],
    [1219000,1233070],
    [1234000,1244030]
  ];

  // Retorna a antecedência (em minutos) baseada no CEP atual
  function antecedenciaMinutosCep(){
    var cepEl=document.getElementById("fdc-cep");
    if(!cepEl||!cepEl.value)return 60;
    var n=cepNoFormato(cepEl.value);
    if(String(n).length<7)return 60;
    var i;
    for(i=0;i<FAIXAS_CEP_15MIN.length;i++){
      if(n>=FAIXAS_CEP_15MIN[i][0]&&n<=FAIXAS_CEP_15MIN[i][1])return 15;
    }
    for(i=0;i<FAIXAS_CEP_30MIN.length;i++){
      if(n>=FAIXAS_CEP_30MIN[i][0]&&n<=FAIXAS_CEP_30MIN[i][1])return 30;
    }
    return 60;
  }

  function cepNoFormato(cep){
    var n=parseInt(cep.replace(/\D/g,""),10);
    return isNaN(n)?0:n;
  }

  function cepValido(cep){
    var n=cepNoFormato(cep);
    if(String(n).length<7)return false;
    for(var i=0;i<FAIXAS_CEP.length;i++){
      if(n>=FAIXAS_CEP[i][0]&&n<=FAIXAS_CEP[i][1])return true;
    }
    return false;
  }

  // Verifica se o CEP é atendido especificamente no dia 12
  function cepValidoNamorados(cep){
    var n=cepNoFormato(cep);
    if(String(n).length<7)return false;
    for(var i=0;i<FAIXAS_CEP_NAMORADOS.length;i++){
      if(n>=FAIXAS_CEP_NAMORADOS[i][0]&&n<=FAIXAS_CEP_NAMORADOS[i][1])return true;
    }
    return false;
  }

  // Verifica se o CEP está em região com trânsito intenso
  function cepComTransito(cep){
    var n=cepNoFormato(cep);
    if(String(n).length<7)return false;
    for(var i=0;i<FAIXAS_CEP_TRANSITO.length;i++){
      if(n>=FAIXAS_CEP_TRANSITO[i][0]&&n<=FAIXAS_CEP_TRANSITO[i][1])return true;
    }
    return false;
  }

  var FERIADOS=[
    "2026-05-01","2026-05-09","2026-05-10","2026-06-04","2026-06-13","2026-06-14","2026-07-09","2026-09-07",
    "2026-10-12","2026-11-02","2026-11-15","2026-11-20","2026-12-25"
  ];

  var DATA_BLOQUEIO_MANHA=null;
  var HORA_LIBERA_ENTREGA_DIA10=13;
  var HORA_LIBERA_RETIRADA_DIA10=11;

  var PERIODOS_ESGOTADOS_ENTREGA={};

  // Dias com fechamento antecipado (funcionamento até hora especificada)
  // Bloqueia entregas/retiradas após a hora informada
  var FECHAMENTO_ANTECIPADO={};

  function dateToStr(d){
    return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
  }

  function isFeriado(d){
    return FERIADOS.indexOf(dateToStr(d))!==-1;
  }

  function isDiaNamorados(d){
    return dateToStr(d)===DATA_NAMORADOS;
  }

  function entregaNamoradosDisponivel(){
    return _NAM_ENTREGA_OK;
  }

  function retiradaNamoradosDisponivel(){
    return _NAM_RETIRADA_OK;
  }

  var ENTREGA_NAMORADOS=[
    {id:"n_m1",nome:"Manhã I",hora:"8:00 – 10:00",ini:8,fim:10},
    {id:"n_m2",nome:"Manhã II",hora:"10:00 – 12:00",ini:10,fim:12},
    {id:"n_t1",nome:"Tarde I",hora:"12:30 – 14:00",ini:12.5,fim:14},
    {id:"n_t2",nome:"Tarde II",hora:"14:00 – 15:30",ini:14,fim:15.5},
    {id:"n_t3",nome:"Tarde III",hora:"15:30 – 17:00",ini:15.5,fim:17}
  ];

  // Retirada específica para o dia 12 (sem 8-9h, 13-14h e 16-17h)
  var RETIRADA_NAMORADOS=[];
  [9,10,11,12,14,15,17,18].forEach(function(h){
    RETIRADA_NAMORADOS.push({id:"rn"+h,nome:"Entre "+h+"h – "+(h+1)+"h",hora:h+":00 – "+(h+1)+":00",ini:h,fim:h+1});
  });

  var ENTREGA_HOJE=[
    {id:"m1",nome:"Manhã I",hora:"9:00 – 10:30",ini:9,fim:10.5},
    {id:"m2",nome:"Manhã II",hora:"10:30 – 12:00",ini:10.5,fim:12},
    {id:"t1",nome:"Tarde I",hora:"12:30 – 14:00",ini:12.5,fim:14},
    {id:"t2",nome:"Tarde II",hora:"14:00 – 15:30",ini:14,fim:15.5},
    {id:"t3",nome:"Tarde III",hora:"15:30 – 17:00",ini:15.5,fim:17,tolerancia:0.5}
  ];

  var ENTREGA_FUTURO=[
    {id:"e9",nome:"Entre 9h – 10h",hora:"9:00 – 10:00",ini:9,fim:10},
    {id:"e10",nome:"Entre 10h – 11h",hora:"10:00 – 11:00",ini:10,fim:11},
    {id:"e11",nome:"Entre 11h – 12h",hora:"11:00 – 12:00",ini:11,fim:12},
    {id:"e13",nome:"Entre 13h – 14h",hora:"13:00 – 14:00",ini:13,fim:14},
    {id:"e14",nome:"Entre 14h – 15h",hora:"14:00 – 15:00",ini:14,fim:15},
    {id:"e15",nome:"Entre 15h – 16h",hora:"15:00 – 16:00",ini:15,fim:16},
    {id:"e16",nome:"Entre 16h – 17h",hora:"16:00 – 17:00",ini:16,fim:17}
  ];

  var ENTREGA_FDS=[
    {id:"m1",nome:"Manhã I",hora:"9:00 – 10:30",ini:9,fim:10.5},
    {id:"m2",nome:"Manhã II",hora:"10:30 – 12:00",ini:10.5,fim:12}
  ];

  var RETIRADA_SEMANA=[];
  [8,9,10,11,12,13,14,15,16,17,18].forEach(function(h){
    RETIRADA_SEMANA.push({id:"rs"+h,nome:"Entre "+h+"h – "+(h+1)+"h",hora:h+":00 – "+(h+1)+":00",ini:h,fim:h+1});
  });
  var RETIRADA_SAB=[];
  [9,10,11,12,13,14,15].forEach(function(h){
    RETIRADA_SAB.push({id:"rsab"+h,nome:"Entre "+h+"h – "+(h+1)+"h",hora:h+":00 – "+(h+1)+":00",ini:h,fim:h+1});
  });
  var RETIRADA_DOM=[];
  [9,10,11,12].forEach(function(h){
    RETIRADA_DOM.push({id:"rdom"+h,nome:"Entre "+h+"h – "+(h+1)+"h",hora:h+":00 – "+(h+1)+":00",ini:h,fim:h+1});
  });

  var TERMOS={
    entrega:[
      "No momento do pagamento, preencha os dados de entrega de forma completa e correta. Informações incompletas ou incorretas podem comprometer a realização da entrega.",
      "Seu pedido será entregue dentro do período selecionado no momento da compra. Acompanhe as atualizações enviadas por e-mail.",
      "Para garantir o cumprimento do horário escolhido, pedimos que o pagamento seja efetivado em até 15 minutos após o agendamento. Caso o pagamento ocorra depois desse prazo, o horário de entrega poderá ser reagendado pelo mesmo intervalo de atraso, já que a produção só inicia após a confirmação.",
      "O motorista permanecerá no local por até 10 (dez) minutos. Caso a entrega não seja concluída nesse período, o pedido retornará à loja.",
      "Para um novo envio, será necessária a cobrança de uma nova taxa de entrega."
    ],
    retirada:[
      "Seu pedido estará disponível para retirada no período selecionado no momento da compra. Aguarde a confirmação enviada por e-mail ou WhatsApp.",
      "Em caso de qualquer imprevisto, nossa equipe de atendimento entrará em contato.",
      "Para garantir o cumprimento do horário escolhido, pedimos que o pagamento seja efetivado em até 15 minutos após o agendamento. Caso o pagamento ocorra depois desse prazo, o horário de retirada poderá ser reagendado pelo mesmo intervalo de atraso, já que a produção só inicia após a confirmação.",
      "A retirada deverá ser realizada dentro do período agendado. Recomendamos que compareça no horário escolhido para evitar espera.",
      "Caso o cliente não compareça para a retirada, o pedido permanecerá disponível na loja por tempo limitado, podendo haver perda da qualidade dos produtos perecíveis."
    ]
  };

  var MESES=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  var DIASLONG=["domingo","segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"];
  var DIASABREV=["dom","seg","ter","qua","qui","sex","sáb"];

  var tipo="entrega";
  var dataSel=null,periodoSel=null,agConfirmado=false,termoAceito=false;
  var mesAtual=new Date().getMonth(),anoAtual=new Date().getFullYear();
  var semMensagem=false;
  var cepOk=false;
  var cepValidoDia12=false; // se o CEP atual também é válido no dia 12

  function hoje(){var d=new Date();d.setHours(0,0,0,0);return d;}
  function addDias(d,n){var r=new Date(d);r.setDate(r.getDate()+n);return r;}

  function getPeriodosParaDow(dow, dt){
    if(dt&&isDiaNamorados(dt)){
      if(tipo==="entrega")return ENTREGA_NAMORADOS;
      return RETIRADA_NAMORADOS;
    }
    if(tipo==="entrega"){
      if(dow===0||dow===6)return ENTREGA_FDS;
      if(dt){
        var dd=new Date(dt);dd.setHours(0,0,0,0);
        if(dd.getTime()===hoje().getTime())return ENTREGA_HOJE;
      }
      return ENTREGA_FUTURO;
    }else{
      if(dow===6)return RETIRADA_SAB;
      if(dow===0)return RETIRADA_DOM;
      return RETIRADA_SEMANA;
    }
  }

  function isCesta(){
    var itens=document.querySelectorAll(".nome-produto,.product-name,.item-name");
    for(var i=0;i<itens.length;i++){
      if(itens[i].innerText&&itens[i].innerText.toLowerCase().indexOf("cesta")!==-1)return true;
    }
    return false;
  }

  function periodoMinimoCesta(){
    var h=new Date().getHours()+new Date().getMinutes()/60;
    if(tipo==="entrega"){
      if(h>=22)return "e13";
      if(h>=18)return "e9";
      return null;
    }
    if(h>=22)return "rs13";
    if(h>=18)return "rs9";
    return null;
  }

  function fdsDisponivel(dataAlvo){
    var agora=new Date();
    var dow=agora.getDay();
    var h=agora.getHours()+agora.getMinutes()/60;
    var hj=hoje();
    var diasParaSabado=(6-hj.getDay()+7)%7;
    if(hj.getDay()===6)diasParaSabado=0;
    var sabadoCorrente=addDias(hj,diasParaSabado);
    var domingoCorrente=addDias(sabadoCorrente,1);
    var ddAlvo=new Date(dataAlvo);ddAlvo.setHours(0,0,0,0);
    var isFdsCorrente=(ddAlvo.getTime()===sabadoCorrente.getTime()||ddAlvo.getTime()===domingoCorrente.getTime());
    if(isFdsCorrente){
      if(dow===5&&h>=17)return false;
      if(dow===6||dow===0)return false;
    }
    return true;
  }

  function minData(){
    if(isCesta())return addDias(hoje(),1);
    return hoje();
  }

  function periodosParaDia(d){
    var h=new Date().getHours()+new Date().getMinutes()/60;
    var dd=new Date(d);dd.setHours(0,0,0,0);
    var isHoje=dd.getTime()===hoje().getTime();
    var isAmanha=dd.getTime()===addDias(hoje(),1).getTime();
    var isBloqueioManha=(dateToStr(dd)===DATA_BLOQUEIO_MANHA);
    var cesta=isCesta();
    var lista=getPeriodosParaDow(dd.getDay(), dd);
    var ordemFuturo=["e9","e10","e11","e13","e14","e15","e16"];
    var ordemRetirada=["rs8","rs9","rs10","rs11","rs12","rs13","rs14","rs15","rs16","rs17","rs18"];

    return lista.map(function(p){
      // Bloqueios globais que afetam a data inteira
      // 1. Data fora do range válido (passado ou além de 30 dias)
      var minD=minData();minD.setHours(0,0,0,0);
      var maxD=addDias(hoje(),30);maxD.setHours(0,0,0,0);
      if(dd<minD||dd>maxD)return Object.assign({},p,{ok:false});
      // 2. Feriado
      if(isFeriado(dd))return Object.assign({},p,{ok:false});
      // 3. Fim de semana corrente bloqueado (sexta após 17h ou sáb/dom)
      var dow=dd.getDay();
      if((dow===0||dow===6)&&!fdsDisponivel(dd)){
        return Object.assign({},p,{ok:false});
      }
      // 4. Dia dos Namorados — bloqueios específicos
      if(isDiaNamorados(dd)){
        if(tipo==="entrega"&&!entregaNamoradosDisponivel())return Object.assign({},p,{ok:false});
        if(tipo==="retirada"&&!retiradaNamoradosDisponivel())return Object.assign({},p,{ok:false});
      }
      // Períodos específicos esgotados em data definida (só entrega)
      if(tipo==="entrega"){
        var esgotados=PERIODOS_ESGOTADOS_ENTREGA[dateToStr(dd)];
        if(esgotados&&esgotados.indexOf(p.id)!==-1){
          return Object.assign({},p,{ok:false});
        }
      }
      // Fechamento antecipado: bloqueia períodos que terminem após a hora limite
      var horaFechamento=FECHAMENTO_ANTECIPADO[dateToStr(dd)];
      if(horaFechamento&&p.fim>horaFechamento){
        return Object.assign({},p,{ok:false});
      }
      // Trânsito intenso: bloqueia Tarde III (t3) hoje após 15h se CEP problemático
      if(isHoje&&tipo==="entrega"&&p.id==="t3"&&h>=HORA_BLOQUEIO_TRANSITO){
        var cepAtual=(document.getElementById("fdc-cep")||{}).value||"";
        if(cepAtual&&cepComTransito(cepAtual)){
          return Object.assign({},p,{ok:false});
        }
      }
      // Bloqueio da manhã no dia 10/06
      if(isBloqueioManha){
        var horaLimite=tipo==="entrega"?HORA_LIBERA_ENTREGA_DIA10:HORA_LIBERA_RETIRADA_DIA10;
        if(p.ini<horaLimite)return Object.assign({},p,{ok:false});
      }
      if(cesta&&isAmanha){
        var minPer=periodoMinimoCesta();
        if(minPer){
          var ordem;
          if(tipo==="entrega")ordem=ordemFuturo;
          else ordem=ordemRetirada;
          var idxMin=ordem.indexOf(minPer);
          var idxP=ordem.indexOf(p.id);
          if(idxMin===-1||idxP===-1)return Object.assign({},p,{ok:true});
          return Object.assign({},p,{ok:idxP>=idxMin});
        }
        return Object.assign({},p,{ok:true});
      }
      if(isHoje){
        if(p.tolerancia)return Object.assign({},p,{ok:h<=p.ini+p.tolerancia});
        // Antecedência variável por CEP (só em entrega)
        var antecHoras=1;
        if(tipo==="entrega"){
          antecHoras=antecedenciaMinutosCep()/60;
        }
        return Object.assign({},p,{ok:(p.ini-h)>=antecHoras});
      }
      return Object.assign({},p,{ok:true});
    });
  }

  function temDisp(d){
    var min=minData();min.setHours(0,0,0,0);
    var dd=new Date(d);dd.setHours(0,0,0,0);
    if(dd<min||dd>addDias(hoje(),30))return false;
    if(isFeriado(dd))return false;
    var dow=dd.getDay();
    if(dow===0||dow===6){
      if(!fdsDisponivel(dd))return false;
    }
    if(isDiaNamorados(dd)){
      if(tipo==="entrega"&&!entregaNamoradosDisponivel())return false;
      if(tipo==="retirada"&&!retiradaNamoradosDisponivel())return false;
    }
    return periodosParaDia(d).some(function(p){return p.ok;});
  }

  function tudo_valido(){
    if(!agConfirmado||!termoAceito)return false;
    if(tipo==="entrega"){
      if(!cepOk)return false;
      var nome=(document.getElementById("fdc-nome")||{}).value||"";
      var tel=(document.getElementById("fdc-tel")||{}).value||"";
      if(!nome.trim()||tel.trim().length<14)return false;
    }
    return true;
  }

  function lerItensCarrinhoArray(){
    var itens=[];
    var seletores=[".nome-produto",".cart-item-name",".product-name","td.nome a"];
    for(var i=0;i<seletores.length;i++){
      var els=document.querySelectorAll(seletores[i]);
      if(els.length>0){
        els.forEach(function(el){
          var txt=(el.innerText||el.textContent||"").trim();
          if(txt&&txt.indexOf("--PRODUTO")===-1&&itens.indexOf(txt)===-1)itens.push(txt);
        });
        if(itens.length>0)break;
      }
    }
    return itens;
  }

  function lerItensCarrinho(){
    var itens=lerItensCarrinhoArray();
    return itens.length>0?itens.join("\n"):"(não identificado)";
  }

  function salvarSessao(){
    try{
      sessionStorage.setItem("fdc_carrinho",JSON.stringify({
        tipo:tipo,
        cep:(document.getElementById("fdc-cep")||{}).value||"",
        nome:(document.getElementById("fdc-nome")||{}).value||"",
        tel:(document.getElementById("fdc-tel")||{}).value||"",
        msg:(document.getElementById("fdc-msg")||{}).value||"",
        semMsg:semMensagem,
        _dataSel:dataSel?dataSel.toISOString():null,
        _periodoSel:periodoSel,
        _agConfirmado:agConfirmado,
        _termoAceito:termoAceito
      }));
    }catch(x){}
  }

  function restaurarSessao(){
    try{
      var dados=JSON.parse(sessionStorage.getItem("fdc_carrinho"));
      if(!dados)return;
      if(dados.tipo&&dados.tipo!==tipo)window.fdcSetTipo(dados.tipo);
      if(dados.cep){
        var cepEl=document.getElementById("fdc-cep");
        if(cepEl){cepEl.value=dados.cep;fdcValidarCep(true);}
      }
      if(dados.nome){var n=document.getElementById("fdc-nome");if(n)n.value=dados.nome;}
      if(dados.tel){var t=document.getElementById("fdc-tel");if(t)t.value=dados.tel;}
      if(dados.msg){var m=document.getElementById("fdc-msg");if(m){m.value=dados.msg;document.getElementById("fdc-faltam").textContent=500-dados.msg.length;}}
      if(dados.semMsg){
        semMensagem=true;
        var cb=document.getElementById("fdc-sem-msg");if(cb)cb.checked=true;
        var txt=document.getElementById("fdc-msg");if(txt){txt.value="";txt.disabled=true;}
      }
      if(dados._dataSel&&dados._periodoSel){
        var d=new Date(dados._dataSel);
        if(temDisp(d)){
          dataSel=d;periodoSel=dados._periodoSel;
          mesAtual=d.getMonth();anoAtual=d.getFullYear();
          agConfirmado=dados._agConfirmado||false;
          if(agConfirmado){
            var lista=getPeriodosParaDow(d.getDay(), d);
            var p=lista.find(function(x){return x.id===periodoSel;});
            if(p){
              document.getElementById("fdc-res-data").textContent=d.toLocaleDateString("pt-BR");
              document.getElementById("fdc-res-diasem").textContent=DIASLONG[d.getDay()];
              document.getElementById("fdc-res-per").textContent=p.nome;
              document.getElementById("fdc-res-hora").textContent=p.hora;
              document.getElementById("fdc-btn-ag").style.display="none";
              document.getElementById("fdc-resumo-ag").style.display="block";
            }
          }
        }
      }
      if(dados._termoAceito){
        termoAceito=true;
        var cb2=document.getElementById("fdc-termo");if(cb2)cb2.checked=true;
        var wrap=document.getElementById("fdc-termo-wrap");if(wrap)wrap.className="fdc-termo-wrap aceito";
      }
      fdcVerificar();
    }catch(x){}
  }

  function injetarCSS(){
    var css=[
      ".fdc-bloco{background:#e8e8e8;border:1.5px solid #c8c8c8;border-radius:10px;padding:20px 22px;margin:22px 0;font-family:inherit}",
      ".fdc-titulo{color:#a91537;font-size:16px;font-weight:700;margin-bottom:16px}",
      ".fdc-toggle{display:flex;margin-bottom:18px;border:1.5px solid #5a8966;border-radius:8px;overflow:hidden}",
      ".fdc-toggle-btn{flex:1;padding:10px;background:none;border:none;font-size:13px;font-weight:600;cursor:pointer;color:#5a8966;transition:all .2s}",
      ".fdc-toggle-btn.ativo{background:#5a8966;color:#fff}",
      ".fdc-sec{font-size:13px;font-weight:700;color:#a91537;margin:16px 0 10px;padding-bottom:6px;border-bottom:1px solid #c8c8c8}",
      ".fdc-campo{margin-bottom:12px}",
      ".fdc-campo label{display:block;font-size:13px;font-weight:600;color:#444;margin-bottom:4px}",
      ".fdc-campo label small{font-weight:400;color:#888;font-size:11px;display:block;margin-top:1px}",
      ".fdc-campo input,.fdc-campo textarea{width:100%;box-sizing:border-box;border:1.5px solid #c8c8c8;border-radius:7px;padding:9px 12px;font-size:14px;font-family:inherit;background:#fff;color:#333;outline:none;transition:border-color .2s}",
      ".fdc-campo input:focus,.fdc-campo textarea:focus{border-color:#a91537}",
      ".fdc-campo textarea{resize:vertical;min-height:90px}",
      ".fdc-campo textarea:disabled{background:#f5f5f5;color:#aaa;cursor:not-allowed}",
      ".fdc-cep-wrap{position:relative}",
      ".fdc-cep-status{display:inline-block;margin-top:6px;font-size:12px;font-weight:600;padding:4px 10px;border-radius:4px}",
      ".fdc-cep-status.ok{background:#e8f5f0;color:#0a5c3a}",
      ".fdc-cep-status.erro{background:#fde8e8;color:#c0392b}",
      ".fdc-cep-aviso{display:none;margin-top:8px;padding:8px 12px;background:#fff4e0;border-left:3px solid #e8a33d;border-radius:4px;font-size:12px;color:#7a5a1f;line-height:1.4}",
      ".fdc-cep-aviso.ativo{display:block}",
      ".fdc-bloco-trava{position:relative}",
      ".fdc-bloco-trava.bloqueado{pointer-events:none;opacity:.5}",
      ".fdc-msg-footer{display:flex;align-items:center;justify-content:space-between;margin-top:6px;flex-wrap:wrap;gap:4px}",
      ".fdc-contador{font-size:11px;color:#aaa}",
      ".fdc-sem-msg{display:flex;align-items:center;gap:6px;font-size:12px;color:#666;cursor:pointer;user-select:none}",
      ".fdc-sem-msg input{accent-color:#5a8966;width:14px;height:14px;flex-shrink:0;cursor:pointer;vertical-align:middle}",
      ".fdc-btn-ag{width:100%;background:#5a8966;color:#fff;border:none;padding:11px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:10px}",
      ".fdc-btn-ag:hover{background:#46714f}",
      ".fdc-btn-ag:disabled{background:#aaa;cursor:not-allowed}",
      ".fdc-resumo-ag{background:#fff;border:1.5px solid #c8c8c8;border-radius:8px;padding:12px 14px;margin-bottom:12px}",
      ".fdc-resumo-ag-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}",
      ".fdc-resumo-ag-item label{font-size:11px;color:#888;display:block;margin-bottom:2px}",
      ".fdc-resumo-ag-item strong{font-size:13px;color:#333;display:block}",
      ".fdc-resumo-ag-item span{font-size:11px;color:#888}",
      ".fdc-btn-alt{background:none;border:1px solid #5a8966;color:#5a8966;border-radius:6px;padding:5px 12px;font-size:12px;cursor:pointer}",
      ".fdc-btn-alt:hover{background:#eef3ed}",
      ".fdc-termo-wrap{border-radius:8px;padding:14px 16px;margin-top:4px;transition:background .3s;background:#3a3a3a}",
      ".fdc-termo-wrap.aceito{background:#72cd41}",
      ".fdc-termo-lista{list-style:none;padding:0;margin-bottom:12px}",
      ".fdc-termo-lista li{font-size:12px;color:#fff;line-height:1.6;padding:4px 0 4px 18px;position:relative}",
      ".fdc-termo-lista li::before{content:'•';position:absolute;left:0;color:rgba(255,255,255,.6)}",
      ".fdc-termo-check{display:flex;align-items:center;gap:8px;font-size:12px;color:#fff;cursor:pointer;font-weight:600}",
      ".fdc-termo-check input{accent-color:#fff;width:14px;height:14px;flex-shrink:0;vertical-align:middle}",
      ".fdc-status{margin-top:14px;background:#fff;border:1.5px solid #c8c8c8;border-radius:8px;padding:10px 14px}",
      ".fdc-status p{font-size:12px;color:#888;margin-bottom:6px}",
      ".fdc-status-items{display:flex;flex-wrap:wrap;gap:6px}",
      ".fdc-st{font-size:11px;padding:3px 10px;border-radius:20px;background:#efefef;color:#999}",
      ".fdc-st.ok{background:#e8f5f0;color:#0a5c3a}",
      ".fdc-box-ok{display:none;background:#72cd41;border-radius:8px;padding:14px 16px;margin-top:14px}",
      ".fdc-box-ok-inner{display:flex;align-items:flex-start;gap:12px}",
      ".fdc-box-ok-icon{font-size:22px;flex-shrink:0;line-height:1.3}",
      ".fdc-box-ok-txt strong{font-size:14px;color:#fff;display:block;margin-bottom:4px}",
      ".fdc-box-ok-txt p{font-size:12px;color:#fff;line-height:1.5;opacity:.95}",
      ".fdc-popup-overlay{display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:999999;align-items:center;justify-content:center}",
      ".fdc-popup-overlay.ativo{display:flex}",
      ".fdc-popup{background:#fff;border-radius:12px;padding:28px 24px;width:90%;max-width:420px;text-align:center}",
      ".fdc-popup-icon{font-size:36px;margin-bottom:12px}",
      ".fdc-popup h3{font-size:16px;font-weight:700;color:#333;margin-bottom:8px}",
      ".fdc-popup p{font-size:13px;color:#666;line-height:1.6;margin-bottom:20px}",
      ".fdc-popup-btn{background:#a91537;color:#fff;border:none;padding:11px 28px;border-radius:7px;font-size:14px;font-weight:600;cursor:pointer;margin:0 4px}",
      ".fdc-popup-btn:hover{background:#8a1029}",
      ".fdc-popup-btn-sec{background:#5a8966}",
      ".fdc-day.indisp-clicavel{cursor:pointer}",
      ".fdc-day.indisp-clicavel:hover{background:#f5f5f5}",
      ".fdc-popup-btn-sec:hover{background:#46714f}",
      ".fdc-popup-conf{max-width:460px;text-align:left}",
      ".fdc-popup-conf h3{text-align:center}",
      ".fdc-conf-bloco{background:#fff5e1;border:1px solid #f5e0b8;border-radius:8px;padding:14px 16px;margin-bottom:14px}",
      ".fdc-conf-item{display:flex;align-items:flex-start;gap:10px;margin-bottom:12px}",
      ".fdc-conf-item:last-child{margin-bottom:0}",
      ".fdc-conf-icon{font-size:16px;line-height:1.4;flex-shrink:0}",
      ".fdc-conf-label{font-size:11px;color:#888;font-weight:600;margin-bottom:2px;text-transform:uppercase;letter-spacing:.4px}",
      ".fdc-conf-valor{font-size:14px;color:#333;font-weight:600}",
      ".fdc-conf-sub{font-size:12px;color:#666;font-weight:400;margin-top:1px}",
      ".fdc-conf-msg-txt{font-size:13px;color:#333;font-style:italic;line-height:1.5;font-weight:400}",
      ".fdc-conf-aviso{background:#f1efe8;border-left:3px solid #95a37b;border-radius:6px;padding:11px 13px;font-size:12.5px;color:#444;line-height:1.55;text-align:left}",
      ".fdc-conf-aviso strong{font-weight:600;color:#333}",
      ".fdc-popup-btns{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}",
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
      ".fdc-day.namorados-esgotado{background:#ffe0e0;color:#c0392b;cursor:pointer;font-weight:600}",
      ".fdc-day.namorados-esgotado:hover{background:#ffcccc}",
      ".fdc-day.namorados-produto{background:#ffeaea;color:#a91537;cursor:pointer;font-weight:600}",
      ".fdc-day.namorados-produto:hover{background:#ffd6d6}",
      ".fdc-day.namorados-cep{background:#ffe0e0;color:#c0392b;cursor:pointer;font-weight:600}",
      ".fdc-day.namorados-cep:hover{background:#ffcccc}",
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
    var termoItens=TERMOS.entrega.map(function(t){return '<li>'+t+'</li>';}).join("");
    div.innerHTML=[
      '<div class="fdc-titulo">🌸 Dados do Pedido</div>',
      '<div class="fdc-toggle">',
        '<button class="fdc-toggle-btn ativo" id="fdc-btn-ent" onclick="fdcSetTipo(\'entrega\')">🚚 Entrega</button>',
        '<button class="fdc-toggle-btn" id="fdc-btn-ret" onclick="fdcSetTipo(\'retirada\')">🏪 Retirada na loja</button>',
      '</div>',
      '<div id="fdc-bloco-cep">',
        '<div class="fdc-sec">CEP de Entrega</div>',
        '<div class="fdc-campo fdc-cep-wrap">',
          '<label>Informe o CEP de destino<small>Validaremos se atendemos seu endereço</small></label>',
          '<input type="text" id="fdc-cep" placeholder="00000-000" maxlength="9" oninput="fdcMascaraCep(this);fdcValidarCep();fdcSalvar()"/>',
          '<span id="fdc-cep-status"></span>',
          '<div id="fdc-cep-aviso" class="fdc-cep-aviso">⚠️ <strong>Atenção:</strong> este CEP não está incluído na nossa área de entrega para o Dia dos Namorados (12/06).</div>',
        '</div>',
      '</div>',
      '<div id="fdc-bloco-trava" class="fdc-bloco-trava">',
        '<div class="fdc-sec">Agendamento</div>',
        '<button class="fdc-btn-ag" id="fdc-btn-ag" onclick="fdcAbrirModal()">📅 Escolher data e período</button>',
        '<div id="fdc-resumo-ag" style="display:none" class="fdc-resumo-ag">',
          '<div class="fdc-resumo-ag-grid">',
            '<div class="fdc-resumo-ag-item"><label>📅 Data</label><strong id="fdc-res-data">—</strong><span id="fdc-res-diasem"></span></div>',
            '<div class="fdc-resumo-ag-item"><label>🕐 Período</label><strong id="fdc-res-per">—</strong><span id="fdc-res-hora"></span></div>',
          '</div>',
          '<button class="fdc-btn-alt" onclick="fdcAlterar()">Alterar agendamento</button>',
        '</div>',
        '<div id="fdc-bloco-pres">',
          '<div class="fdc-sec">Presenteado</div>',
          '<div class="fdc-campo"><label>Nome completo de quem vai receber</label><input type="text" id="fdc-nome" placeholder="Ex.: Maria da Silva" maxlength="80" oninput="fdcSalvar();fdcVerificar()"/></div>',
          '<div class="fdc-campo"><label>WhatsApp de quem vai receber<small>Só entramos em contato se não conseguirmos falar com o comprador</small></label><input type="tel" id="fdc-tel" placeholder="(11) 98765-4321" maxlength="15" oninput="fdcMascaraTel(this);fdcSalvar();fdcVerificar()"/></div>',
        '</div>',
        '<div class="fdc-sec">Mensagem do Cartãozinho</div>',
        '<div class="fdc-campo">',
          '<textarea id="fdc-msg" maxlength="500" placeholder="Digite aqui sua mensagem de coração... não se esqueça de assinar a msg =)" oninput="fdcSalvar()"></textarea>',
          '<div class="fdc-msg-footer">',
            '<label class="fdc-sem-msg"><input type="checkbox" id="fdc-sem-msg" onchange="fdcToggleSemMsg()"/> Sem mensagem de cartão</label>',
            '<span class="fdc-contador"><span id="fdc-faltam">500</span> caracteres restantes</span>',
          '</div>',
        '</div>',
        '<div class="fdc-sec">Termos</div>',
        '<div class="fdc-termo-wrap" id="fdc-termo-wrap">',
          '<ul class="fdc-termo-lista" id="fdc-termo-lista">'+termoItens+'</ul>',
          '<label class="fdc-termo-check"><input type="checkbox" id="fdc-termo" onchange="fdcToggleTermo()"/> Estou ciente dos termos</label>',
        '</div>',
        '<div class="fdc-status">',
          '<p>Para finalizar, preencha todos os campos obrigatórios:</p>',
          '<div class="fdc-status-items">',
            '<div class="fdc-st" id="fdc-st-cep">CEP</div>',
            '<div class="fdc-st" id="fdc-st-ag">Agendamento</div>',
            '<div class="fdc-st" id="fdc-st-nome">Nome</div>',
            '<div class="fdc-st" id="fdc-st-tel">Telefone</div>',
            '<div class="fdc-st" id="fdc-st-termo">Termos</div>',
          '</div>',
        '</div>',
        '<div class="fdc-box-ok" id="fdc-box-ok">',
          '<div class="fdc-box-ok-inner">',
            '<div class="fdc-box-ok-icon">✅</div>',
            '<div class="fdc-box-ok-txt"><strong>Tudo certo!</strong><p>Agora avance para a tela de pagamento para preencher o endereço de entrega e finalizar seu pedido.</p></div>',
          '</div>',
        '</div>',
      '</div>',
    ].join("");
    return div;
  }

  function montarPopup(){
    var div=document.createElement("div");
    div.id="fdc-popup-overlay";div.className="fdc-popup-overlay";
    div.innerHTML=[
      '<div class="fdc-popup">',
        '<div class="fdc-popup-icon">⚠️</div>',
        '<h3>Atenção!</h3>',
        '<p>Preencha todos os campos obrigatórios antes de finalizar:<br><span id="fdc-popup-itens"></span></p>',
        '<button class="fdc-popup-btn" onclick="fdcFecharPopup()">Voltar e preencher</button>',
      '</div>'
    ].join("");
    document.body.appendChild(div);

    var divCep=document.createElement("div");
    divCep.id="fdc-popup-cep-overlay";divCep.className="fdc-popup-overlay";
    divCep.innerHTML=[
      '<div class="fdc-popup">',
        '<div class="fdc-popup-icon">📍</div>',
        '<h3>Endereço fora da área de entrega</h3>',
        '<p>Não realizamos entregas no CEP informado.<br><br>Você pode retirar seu pedido em nossa loja física em <strong>Alameda Barão de Limeira, 998 – Campos Elíseos</strong>.</p>',
        '<div class="fdc-popup-btns">',
          '<button class="fdc-popup-btn fdc-popup-btn-sec" onclick="fdcOptarRetirada()">Optar por Retirada</button>',
          '<button class="fdc-popup-btn" onclick="fdcFecharPopupCep()">Fechar</button>',
        '</div>',
      '</div>'
    ].join("");
    document.body.appendChild(divCep);

    var divNam=document.createElement("div");
    divNam.id="fdc-popup-namorados-overlay";divNam.className="fdc-popup-overlay";
    divNam.innerHTML=[
      '<div class="fdc-popup">',
        '<div class="fdc-popup-icon">💔</div>',
        '<h3 id="fdc-popup-nam-titulo">Dia dos Namorados</h3>',
        '<p id="fdc-popup-nam-msg">—</p>',
        '<div class="fdc-popup-btns" id="fdc-popup-nam-btns">',
          '<button class="fdc-popup-btn" onclick="fdcFecharPopupNamorados()">Entendi</button>',
        '</div>',
      '</div>'
    ].join("");
    document.body.appendChild(divNam);

    // Modal de confirmação final (após clicar em Finalizar)
    var divConf=document.createElement("div");
    divConf.id="fdc-popup-conf-overlay";divConf.className="fdc-popup-overlay";
    divConf.innerHTML=[
      '<div class="fdc-popup fdc-popup-conf">',
        '<div style="text-align:center;margin-bottom:18px">',
          '<div style="font-size:42px;line-height:1;margin-bottom:6px">✅</div>',
          '<h3>Dados registrados com sucesso!</h3>',
          '<p style="font-size:12px;color:#888;margin:6px 0 0">Protocolo: <span id="fdc-conf-protocolo" style="font-family:monospace;color:#444">—</span></p>',
        '</div>',
        '<div class="fdc-conf-bloco" id="fdc-conf-bloco"></div>',
        '<div class="fdc-conf-aviso">',
          'Já temos as informações de agendamento, destinatário e mensagem do cartão.<br><br>',
          '<strong>❗ Importante:</strong> Após a efetivação do pagamento, o pedido gerado pela plataforma <strong>não exibirá esses dados</strong> — eles ficam registrados apenas no nosso sistema interno. Pode ficar despreocupado, está tudo conosco!',
        '</div>',
        '<button id="fdc-conf-btn" class="fdc-popup-btn" style="width:100%;margin-top:14px">Continuar para o pagamento →</button>',
      '</div>'
    ].join("");
    document.body.appendChild(divConf);
  }

  function montarModal(){
    var overlay=document.createElement("div");
    overlay.id="fdc-overlay";overlay.className="fdc-overlay";
    overlay.innerHTML=[
      '<div class="fdc-modal">',
        '<div class="fdc-modal-header"><h4 id="fdc-modal-titulo">Escolha a data e o período de entrega</h4><button class="fdc-modal-fechar" onclick="fdcFecharModal()">&times;</button></div>',
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

  window.fdcMascaraCep=function(el){
    var v=el.value.replace(/\D/g,"").substring(0,8);
    if(v.length>5)v=v.substring(0,5)+"-"+v.substring(5);
    el.value=v;
  };

  window.fdcValidarCep=function(silencioso){
    var el=document.getElementById("fdc-cep");
    var status=document.getElementById("fdc-cep-status");
    var aviso=document.getElementById("fdc-cep-aviso");
    var cep=el.value.replace(/\D/g,"");

    if(cep.length<8){
      cepOk=false;
      cepValidoDia12=false;
      status.textContent="";
      status.className="";
      aviso.classList.remove("ativo");
      atualizarTrava();
      fdcVerificar();
      return;
    }

    if(cepValido(cep)){
      cepOk=true;
      status.textContent="✓ Atendemos seu endereço";
      status.className="fdc-cep-status ok";
      // Aviso amarelo desativado: entrega no dia 12 está esgotada para todos
      cepValidoDia12=cepValidoNamorados(cep);
      aviso.classList.remove("ativo");
      preencherCepPlataforma(el.value);
    }else{
      cepOk=false;
      cepValidoDia12=false;
      status.textContent="✗ Não atendemos este CEP";
      status.className="fdc-cep-status erro";
      aviso.classList.remove("ativo");
      if(!silencioso){
        document.getElementById("fdc-popup-cep-overlay").classList.add("ativo");
      }
    }
    // Se já havia um período selecionado e ele se tornou inválido com o novo CEP, reseta
    if(agConfirmado&&dataSel&&periodoSel){
      var periodosAtuais=periodosParaDia(dataSel);
      var pAtual=periodosAtuais.find(function(x){return x.id===periodoSel;});
      if(!pAtual||!pAtual.ok){
        agConfirmado=false;
        dataSel=null;
        periodoSel=null;
        var btnAg=document.getElementById("fdc-btn-ag");
        var resAg=document.getElementById("fdc-resumo-ag");
        if(btnAg)btnAg.style.display="block";
        if(resAg)resAg.style.display="none";
      }
    }
    atualizarTrava();
    fdcVerificar();
  };

  function preencherCepPlataforma(cep){
    try{
      var campo=document.getElementById("calcularFrete");
      if(campo){
        var setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;
        setter.call(campo,cep);
        campo.dispatchEvent(new Event("input",{bubbles:true}));
        campo.dispatchEvent(new Event("change",{bubbles:true}));
        var btn=document.getElementById("btn-frete");
        if(btn){setTimeout(function(){btn.click();},150);}
      }
    }catch(x){console.error("[FD] Erro ao preencher CEP plataforma:",x);}
  }

  window.fdcFecharPopupCep=function(){
    document.getElementById("fdc-popup-cep-overlay").classList.remove("ativo");
  };

  window.fdcOptarRetirada=function(){
    document.getElementById("fdc-popup-cep-overlay").classList.remove("ativo");
    document.getElementById("fdc-popup-namorados-overlay").classList.remove("ativo");
    window.fdcSetTipo("retirada");
  };

  window.fdcFecharPopupNamorados=function(){
    document.getElementById("fdc-popup-namorados-overlay").classList.remove("ativo");
  };

  window.fdcVerColecaoNamorados=function(){
    window.open(URL_NAMORADOS,"_blank");
  };

  // motivo: "esgotado" | "produto" | "cep"
  function mostrarPopupNamorados(motivo){
    var titulo=document.getElementById("fdc-popup-nam-titulo");
    var msg=document.getElementById("fdc-popup-nam-msg");
    var btns=document.getElementById("fdc-popup-nam-btns");

    if(motivo==="produto"){
      titulo.textContent="Data exclusiva para Dia dos Namorados";
      msg.innerHTML="O dia <strong>12/06</strong> está reservado para produtos da nossa coleção especial do Dia dos Namorados.<br><br>Confira nossa coleção completa e escolha um presente especial!";
      btns.innerHTML=
        '<button class="fdc-popup-btn fdc-popup-btn-sec" onclick="fdcVerColecaoNamorados()">Ver coleção</button>'+
        '<button class="fdc-popup-btn" onclick="fdcFecharPopupNamorados()">Escolher outra data</button>';
    }else if(motivo==="cep"){
      titulo.textContent="CEP fora da área de entrega especial";
      msg.innerHTML="Não realizamos entregas neste CEP no Dia dos Namorados (12/06).<br><br>Por favor, escolha outra data ou opte pela retirada em nossa loja.";
      btns.innerHTML=
        '<button class="fdc-popup-btn fdc-popup-btn-sec" onclick="fdcOptarRetirada()">Optar por Retirada</button>'+
        '<button class="fdc-popup-btn" onclick="fdcFecharPopupNamorados()">Escolher outra data</button>';
    }else{
      // esgotado
      if(tipo==="entrega"){
        titulo.textContent="Entregas esgotadas";
        msg.innerHTML="Agenda de entregas para o dia 12 completamente esgotada, desculpe.";
      }else{
        titulo.textContent="Retiradas esgotadas";
        msg.innerHTML="Nossos pedidos online estão esgotados. Agora só temos disponibilidade para compras presenciais em nossa loja física, na <strong>Alameda Barão de Limeira, 998 — Campos Elíseos</strong>.";
      }
      btns.innerHTML='<button class="fdc-popup-btn" onclick="fdcFecharPopupNamorados()">Entendi</button>';
    }
    document.getElementById("fdc-popup-namorados-overlay").classList.add("ativo");
  }

  function atualizarTrava(){
    var trava=document.getElementById("fdc-bloco-trava");
    if(!trava)return;
    if(tipo==="entrega"&&!cepOk){
      trava.classList.add("bloqueado");
    }else{
      trava.classList.remove("bloqueado");
    }
  }

  window.fdcSalvar=function(){salvarSessao();};

  window.fdcSetTipo=function(t){
    tipo=t;
    document.getElementById("fdc-btn-ent").className="fdc-toggle-btn"+(t==="entrega"?" ativo":"");
    document.getElementById("fdc-btn-ret").className="fdc-toggle-btn"+(t==="retirada"?" ativo":"");
    document.getElementById("fdc-bloco-cep").style.display=t==="entrega"?"block":"none";
    document.getElementById("fdc-bloco-pres").style.display=t==="entrega"?"block":"none";
    document.getElementById("fdc-st-cep").style.display=t==="retirada"?"none":"inline-block";
    document.getElementById("fdc-st-nome").style.display=t==="retirada"?"none":"inline-block";
    document.getElementById("fdc-st-tel").style.display=t==="retirada"?"none":"inline-block";
    document.getElementById("fdc-modal-titulo").textContent=t==="entrega"?"Escolha a data e o período de entrega":"Escolha a data e o período de retirada";
    var lista=document.getElementById("fdc-termo-lista");
    lista.innerHTML=TERMOS[t].map(function(i){return '<li>'+i+'</li>';}).join("");
    document.getElementById("fdc-termo-wrap").className="fdc-termo-wrap";
    document.getElementById("fdc-termo").checked=false;
    termoAceito=false;dataSel=null;periodoSel=null;agConfirmado=false;
    document.getElementById("fdc-btn-ag").style.display="block";
    document.getElementById("fdc-resumo-ag").style.display="none";
    atualizarTrava();
    salvarSessao();fdcVerificar();
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
    salvarSessao();
  };

  window.fdcToggleTermo=function(){
    termoAceito=document.getElementById("fdc-termo").checked;
    document.getElementById("fdc-termo-wrap").className="fdc-termo-wrap"+(termoAceito?" aceito":"");
    salvarSessao();fdcVerificar();
  };

  window.fdcVerificar=function(){
    function st(id,ok){var e=document.getElementById(id);if(e)e.className="fdc-st"+(ok?" ok":"");}
    var tudoOk=agConfirmado&&termoAceito;
    if(tipo==="entrega"){
      st("fdc-st-cep",cepOk);
      var nome=(document.getElementById("fdc-nome")||{}).value||"";
      var tel=(document.getElementById("fdc-tel")||{}).value||"";
      st("fdc-st-nome",!!nome.trim());
      st("fdc-st-tel",tel.trim().length>=14);
      tudoOk=tudoOk&&cepOk&&!!nome.trim()&&tel.trim().length>=14;
    }
    st("fdc-st-ag",agConfirmado);
    st("fdc-st-termo",termoAceito);
    document.getElementById("fdc-box-ok").style.display=tudoOk?"block":"none";
  };

  window.fdcAbrirModal=function(){
    document.getElementById("fdc-overlay").classList.add("ativo");
    fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();
  };

  window.fdcFecharModal=function(){
    document.getElementById("fdc-overlay").classList.remove("ativo");
  };

  window.fdcFecharPopup=function(){
    document.getElementById("fdc-popup-overlay").classList.remove("ativo");
    document.getElementById("fdc-bloco").scrollIntoView({behavior:"smooth",block:"start"});
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
    var lista=getPeriodosParaDow(dataSel.getDay(), dataSel);
    var p=lista.find(function(x){return x.id===periodoSel;});
    document.getElementById("fdc-res-data").textContent=dataSel.toLocaleDateString("pt-BR");
    document.getElementById("fdc-res-diasem").textContent=DIASLONG[dataSel.getDay()];
    document.getElementById("fdc-res-per").textContent=p.nome;
    document.getElementById("fdc-res-hora").textContent=p.hora;
    document.getElementById("fdc-btn-ag").style.display="none";
    document.getElementById("fdc-resumo-ag").style.display="block";
    fdcFecharModal();salvarSessao();fdcVerificar();
  };

  window.fdcAlterar=function(){
    agConfirmado=false;
    document.getElementById("fdc-btn-ag").style.display="block";
    document.getElementById("fdc-resumo-ag").style.display="none";
    fdcVerificar();fdcAbrirModal();
  };

  function fdcRenderCal(){
    document.getElementById("fdc-mes-titulo").textContent=MESES[mesAtual]+" "+anoAtual;
    var grid=document.getElementById("fdc-cal-grid");grid.innerHTML="";
    DIASABREV.forEach(function(d){var e=document.createElement("div");e.className="fdc-dow";e.textContent=d;grid.appendChild(e);});
    var p=new Date(anoAtual,mesAtual,1).getDay();
    for(var i=0;i<p;i++){var e=document.createElement("button");e.className="fdc-day";grid.appendChild(e);}
    var tot=new Date(anoAtual,mesAtual+1,0).getDate();
    var hj=hoje();
    var carrinhoNamorados=carrinhoEhNamorados();

    for(var d=1;d<=tot;d++){
      var dt=new Date(anoAtual,mesAtual,d);
      var b=document.createElement("button");b.textContent=d;
      var isSel=dataSel&&dataSel.getDate()===d&&dataSel.getMonth()===mesAtual&&dataSel.getFullYear()===anoAtual;
      var isHj=dt.getTime()===hj.getTime();
      var ehNamorados=isDiaNamorados(dt);
      var namoradosEsgotado=false;
      var namoradosProduto=false;
      var namoradosCep=false;

      if(ehNamorados){
        // 1ª prioridade: verifica se já esgotou (prazo limite)
        if(tipo==="entrega"&&!entregaNamoradosDisponivel())namoradosEsgotado=true;
        if(tipo==="retirada"&&!retiradaNamoradosDisponivel())namoradosEsgotado=true;
        // 2ª prioridade: se não esgotou, verifica CEP (só em entrega)
        if(!namoradosEsgotado&&tipo==="entrega"&&cepOk&&!cepValidoDia12){
          namoradosCep=true;
        }
        // 3ª prioridade: se não esgotou e CEP ok, verifica produto
        if(!namoradosEsgotado&&!namoradosCep&&!carrinhoNamorados){
          namoradosProduto=true;
        }
      }

      if(namoradosEsgotado){
        b.className="fdc-day namorados-esgotado";
        (function(){b.onclick=function(){mostrarPopupNamorados("esgotado");};})();
      }else if(namoradosCep){
        b.className="fdc-day namorados-cep";
        (function(){b.onclick=function(){mostrarPopupNamorados("cep");};})();
      }else if(namoradosProduto){
        b.className="fdc-day namorados-produto";
        (function(){b.onclick=function(){mostrarPopupNamorados("produto");};})();
      }else if(isSel){
        b.className="fdc-day sel";
      }else if(temDisp(dt)){
        b.className="fdc-day disp";
        (function(dt2){b.onclick=function(){dataSel=dt2;periodoSel=null;fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();};})(new Date(dt));
      }else{
        // Dias sem disponibilidade mas dentro do range válido — clicável para mostrar aviso
        b.className="fdc-day";
        var ddCheck=new Date(dt);ddCheck.setHours(0,0,0,0);
        var minD=minData();minD.setHours(0,0,0,0);
        var maxD=addDias(hoje(),30);maxD.setHours(0,0,0,0);
        if(ddCheck>=minD&&ddCheck<=maxD&&!isFeriado(dt)){
          // Não é feriado e está dentro do range — habilita clique
          b.classList.add("indisp-clicavel");
          (function(dt2){b.onclick=function(){dataSel=dt2;periodoSel=null;fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();};})(new Date(dt));
        }
      }
      if(isHj&&!isSel)b.classList.add("hj");
      grid.appendChild(b);
    }
  }

  function fdcRenderPeriodos(){
    var c=document.getElementById("fdc-periodos"),t=document.getElementById("fdc-per-titulo");
    c.innerHTML="";
    if(!dataSel){t.textContent="Selecione uma data";return;}

    // Verifica disponibilidade real do dia (mesma regra do calendário)
    var temDisponibilidade=temDisp(dataSel);

    if(!temDisponibilidade){
      // Sem disponibilidade — mostra aviso
      t.textContent="Sem horários disponíveis";
      var ddSel=new Date(dataSel);ddSel.setHours(0,0,0,0);
      var dowSel=ddSel.getDay();
      var ehHoje=ddSel.getTime()===hoje().getTime();
      var ehFds=(dowSel===0||dowSel===6);
      var msg;
      if(ehHoje){
        msg="Não há mais horários disponíveis para hoje. Confira a partir de amanhã.";
      }else if(ehFds){
        msg="Não há mais horários disponíveis para esta data. Confira a partir de segunda-feira.";
      }else{
        msg="Não há mais horários disponíveis para esta data. Tente outra data.";
      }
      var aviso=document.createElement("div");
      aviso.style.cssText="background:#fff4e0;border-left:3px solid #e8a33d;border-radius:6px;padding:12px 14px;font-size:13px;color:#7a5a1f;line-height:1.5";
      aviso.innerHTML="ℹ️ "+msg;
      c.appendChild(aviso);
      return;
    }

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
    var lista=dataSel?getPeriodosParaDow(dataSel.getDay(), dataSel):[];
    var p=periodoSel?lista.find(function(x){return x.id===periodoSel;}):null;
    document.getElementById("fdc-m-per").textContent=p?p.nome:"—";
    document.getElementById("fdc-m-hora").textContent=p?p.hora:"";
    btn.disabled=!(dataSel&&periodoSel);
  }

  function preCarregarEmailJS(){
    if(typeof emailjs!=="undefined"){emailjs.init({publicKey:CFG.emailjs_public_key});return;}
    var sc=document.createElement("script");
    sc.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    sc.onload=function(){emailjs.init({publicKey:CFG.emailjs_public_key});};
    document.head.appendChild(sc);
  }

  function enviarEmail(callback){
    var lista=dataSel?getPeriodosParaDow(dataSel.getDay(), dataSel):[];
    var p=periodoSel?lista.find(function(x){return x.id===periodoSel;}):null;
    var agora=new Date();
    var cepDigitado=(document.getElementById("fdc-cep")||{}).value||"";
    var dados={
      tipo_pedido:tipo==="entrega"?"Entrega":"Retirada na loja",
      itens_carrinho:lerItensCarrinho(),
      cep_entrega:tipo==="entrega"?(cepDigitado||"(não informado)"):"(retirada na loja)",
      nome_presenteado:tipo==="entrega"?((document.getElementById("fdc-nome")||{}).value||"(não informado)"):"(retirada na loja)",
      tel_presenteado:tipo==="entrega"?((document.getElementById("fdc-tel")||{}).value||"(não informado)"):"(retirada na loja)",
      mensagem:semMensagem?"(sem mensagem de cartão)":((document.getElementById("fdc-msg")||{}).value||"(não informada)"),
      data_entrega:dataSel?dataSel.toLocaleDateString("pt-BR"):"(não informado)",
      periodo_entrega:p?p.nome+" ("+p.hora+")":"(não informado)",
      termos_aceitos:"Confirmado em "+agora.toLocaleDateString("pt-BR")+" às "+agora.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"}),
      data_hora:agora.toLocaleString("pt-BR")
    };
    function send(){
      emailjs.send(CFG.emailjs_service_id,CFG.emailjs_template_id,dados).then(
        function(){console.log("[FD] Email enviado.");if(callback)callback();},
        function(e){console.error("[FD] Erro:",e);if(callback)callback();}
      );
    }
    if(typeof emailjs==="undefined"||!emailjs.send){
      var sc=document.createElement("script");
      sc.src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      sc.onload=function(){emailjs.init({publicKey:CFG.emailjs_public_key});send();};
      document.head.appendChild(sc);
    }else{send();}
  }

  function gerarProtocolo(){
    var d=new Date();
    var data=d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0");
    var hora=String(d.getHours()).padStart(2,"0")+String(d.getMinutes()).padStart(2,"0");
    return "FD-"+data+"-"+hora;
  }

  function mostrarModalConfirmacao(href){
    var bloco=document.getElementById("fdc-conf-bloco");
    var protocolo=gerarProtocolo();
    document.getElementById("fdc-conf-protocolo").textContent=protocolo;

    var html="";
    var lista=dataSel?getPeriodosParaDow(dataSel.getDay(), dataSel):[];
    var p=periodoSel?lista.find(function(x){return x.id===periodoSel;}):null;

    if(tipo==="entrega"){
      var nome=(document.getElementById("fdc-nome")||{}).value||"";
      var tel=(document.getElementById("fdc-tel")||{}).value||"";
      var cep=(document.getElementById("fdc-cep")||{}).value||"";
      html+='<div class="fdc-conf-item">'+
        '<div class="fdc-conf-icon">🎁</div>'+
        '<div style="flex:1">'+
          '<div class="fdc-conf-label">Destinatário</div>'+
          '<div class="fdc-conf-valor">'+nome+'</div>'+
          '<div class="fdc-conf-sub">'+tel+'</div>'+
        '</div>'+
      '</div>';
      html+='<div class="fdc-conf-item">'+
        '<div class="fdc-conf-icon">📍</div>'+
        '<div style="flex:1">'+
          '<div class="fdc-conf-label">CEP de entrega</div>'+
          '<div class="fdc-conf-valor">'+cep+'</div>'+
        '</div>'+
      '</div>';
    }else{
      html+='<div class="fdc-conf-item">'+
        '<div class="fdc-conf-icon">🏪</div>'+
        '<div style="flex:1">'+
          '<div class="fdc-conf-label">Tipo de pedido</div>'+
          '<div class="fdc-conf-valor">Retirada na loja</div>'+
          '<div class="fdc-conf-sub">Al. Barão de Limeira, 998 – Campos Elíseos</div>'+
        '</div>'+
      '</div>';
    }

    if(dataSel&&p){
      html+='<div class="fdc-conf-item">'+
        '<div class="fdc-conf-icon">📅</div>'+
        '<div style="flex:1">'+
          '<div class="fdc-conf-label">Agendamento</div>'+
          '<div class="fdc-conf-valor">'+DIASLONG[dataSel.getDay()].charAt(0).toUpperCase()+DIASLONG[dataSel.getDay()].slice(1)+', '+dataSel.toLocaleDateString("pt-BR")+'</div>'+
          '<div class="fdc-conf-sub">'+p.nome+' ('+p.hora+')</div>'+
        '</div>'+
      '</div>';
    }

    var mensagem=(document.getElementById("fdc-msg")||{}).value||"";
    if(!semMensagem&&mensagem.trim()){
      html+='<div class="fdc-conf-item">'+
        '<div class="fdc-conf-icon">💌</div>'+
        '<div style="flex:1">'+
          '<div class="fdc-conf-label">Mensagem do cartão</div>'+
          '<div class="fdc-conf-msg-txt">"'+mensagem.replace(/"/g,'&quot;')+'"</div>'+
        '</div>'+
      '</div>';
    }

    bloco.innerHTML=html;

    var btn=document.getElementById("fdc-conf-btn");
    btn.disabled=false;
    btn.textContent="Continuar para o pagamento →";
    btn.onclick=function(){
      btn.disabled=true;
      btn.textContent="Enviando…";
      enviarEmail(function(){window.location.href=href;});
    };

    document.getElementById("fdc-popup-conf-overlay").classList.add("ativo");
  }

  function init(){
    injetarCSS();
    var bloco=montarBloco();
    montarPopup();
    montarModal();

    var alvos=[
      ".carrinho-produtos","table.carrinho",".cart-table",
      "#carrinho-produtos",".conteudo-carrinho",".secao-principal .row-fluid"
    ];
    var ok=false;
    for(var i=0;i<alvos.length;i++){
      var a=document.querySelector(alvos[i]);
      if(a){a.parentNode.insertBefore(bloco,a);ok=true;break;}
    }
    if(!ok){
      var main=document.querySelector(".secao-principal")||document.querySelector("#corpo .conteiner");
      if(main)main.insertBefore(bloco,main.firstChild);
    }

    document.getElementById("fdc-msg").addEventListener("input",function(){
      document.getElementById("fdc-faltam").textContent=500-this.value.length;
      salvarSessao();
    });

    preCarregarEmailJS();
    restaurarSessao();
    atualizarTrava();

    document.addEventListener("click",function(e){
      var el=e.target;
      while(el&&el!==document.body){
        if(el.classList&&
           el.classList.contains("botao")&&
           el.classList.contains("principal")&&
           el.classList.contains("grande")&&
           el.closest&&el.closest(".finalizar-compra"))break;
        el=el.parentNode;
      }
      if(!el||el===document.body)return;
      if(!el.classList||!el.classList.contains("botao")||!el.classList.contains("principal")||!el.classList.contains("grande"))return;
      if(!el.closest||!el.closest(".finalizar-compra"))return;

      if(!tudo_valido()){
        e.preventDefault();e.stopPropagation();
        var pendencias=[];
        if(tipo==="entrega"&&!cepOk)pendencias.push("CEP de entrega válido");
        if(!agConfirmado)pendencias.push("Agendamento de entrega");
        if(tipo==="entrega"){
          var nome=(document.getElementById("fdc-nome")||{}).value||"";
          var tel=(document.getElementById("fdc-tel")||{}).value||"";
          if(!nome.trim())pendencias.push("Nome do presenteado");
          if(tel.trim().length<14)pendencias.push("Telefone WhatsApp");
        }
        if(!termoAceito)pendencias.push("Aceite dos termos");
        var itensEl=document.getElementById("fdc-popup-itens");
        if(itensEl)itensEl.innerHTML=pendencias.map(function(p){return "• "+p;}).join("<br>");
        document.getElementById("fdc-popup-overlay").classList.add("ativo");
        return;
      }

      e.preventDefault();e.stopPropagation();
      var href=el.getAttribute("href")||"/checkout";
      mostrarModalConfirmacao(href);
    },true);

    fdcVerificar();
  }

  if(document.readyState==="complete"){init();}
  else{window.addEventListener("load",init);}

})();

// v33
