(function(){

  if(window.location.pathname.indexOf("/carrinho")===-1)return;

  var CFG={
    emailjs_service_id:"service_8nyc25b",
    emailjs_template_id:"template_jaeoc5u",
    emailjs_public_key:"LZISdXcU2KCrtNwVd",
    tracking_url:"https://script.google.com/macros/s/AKfycbzTOokehlacD7nIpETyqHEkJRay8Pz2vRrStALijA37MytIZ-egF91zLy-hMevUZdmR/exec"
  };

  // ── Estado de tracking (registro de CEPs) ────────────────────────────
  var _protocoloSessao=null; // gerado no primeiro CEP válido, mantido pela sessão
  var _ultimoCepRegistrado=null; // último CEP enviado pro tracking
  var _pedidoFinalizadoTracking=false; // flag para não duplicar finalização

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

  // ── Pick Decorativa ─────────────────────────────────────────────────
  var PICKS=[
    {codigo:"PKD00",frase:"SEM PICK DECORATIVA"},
    {codigo:"PKD01",frase:"Com Carinho Pra Você"},
    {codigo:"PKD02",frase:"Para uma Pessoa muito Especial"},
    {codigo:"PKD03",frase:"Seja Bem-Vinda"},
    {codigo:"PKD04",frase:"Vai ficar tudo bem"},
    {codigo:"PKD05",frase:"Parabéns pela Conquista"},
    {codigo:"PKD06",frase:"Você faz deste mundo um excelente lugar"},
    {codigo:"PKD07",frase:"Sorria a felicidade fica linda em você"},
    {codigo:"PKD08",frase:"Brilhe sem medo. A luz que te ilumina vem lá de cima."},
    {codigo:"PKD09",frase:"Pra lembrar que você é especial"},
    {codigo:"PKD10",frase:"Um mimo pro seu buchinho ficar feliz!"},
    {codigo:"PKD11",frase:"Muito Obrigado de coração"},
    {codigo:"PKD12",frase:"Que sorte a minha ter uma amizade como a sua"},
    {codigo:"PKD13",frase:"O mundo precisa de pessoas incríveis como você"},
    {codigo:"PKD14",frase:"Felicidade é sonho, meta e realidade"},
    {codigo:"PKD15",frase:"Eu Te Amo"},
    {codigo:"PKD16",frase:"Eu Te Amo (colorida)"},
    {codigo:"PKD17",frase:"Você me faz tão bem"},
    {codigo:"PKD18",frase:"Tem sido maravilhoso compartilhar a vida com você"},
    {codigo:"PKD19",frase:"Amo Tu!"},
    {codigo:"PKD20",frase:"Obrigado por me fazer feliz. Te Amo."},
    {codigo:"PKD21",frase:"Feliz Aniversário Par Alguém Muito Especial"},
    {codigo:"PKD22",frase:"Parabéns!"},
    {codigo:"PKD23",frase:"Feliz Aniversário"},
    {codigo:"PKD24",frase:"Parabéns! Que a felicidade faça morada em seu sorriso."},
    {codigo:"PKD25",frase:"Que seu dia seja lindo e leve e feliz"},
    {codigo:"PKD26",frase:"Que Deus te ilumine, te guarde, te proteja e te abençoe"}
  ];

  // Produtos que dão direito a pick decorativa (busca case-insensitive por qualquer parte do nome)
  var PRODUTOS_COM_PICK=[
    "CASA VERDE","CORVELLE","VALENÇA","MOURA","VEREDA","ALCOBAÇA","AUREN","BUARCOS",
    "DINO BUENO","MONSANTO","VILA PAIVA","BELÉM I","BELLAROUGE","CHARMELLE","CIOCCOLATO",
    "DOCERE","MAFRA","MANSORES","ODEMIRA","SARAMAGO","LANCASTER","CÂLIN","ACTIVEBOX",
    "DOLCE CAMPO","VIANA DO CASTELO","VILA REAL","VILA FLOR","VALADARES","MIRANDELA",
    "SANTA CECÍLIA","AROEIRA","ALENQUER","TRENTO BOX","LOVELLE","VITTA","GRAND ALLURE",
    "ROYAL GRAND BOX","PAGLIA BELLE","SWEET MATINA","ESSENCE FIT","DOLCE PASSIONE","AURUM",
    "RUBI","PETIT FLEUR","ANHEMBI","VILA BUARQUE","SOLON","ALAMEDA","AURORA","ITACOLOMI",
    "REPÚBLICA","VEIGA FILHO","MONTENEGRO","GUIMARÃES","MONTALEGRE","TÁVORA","VICTORIA",
    "VILLALBA","LUMIAR","LANCASTRE","INÊS","ALCÂNTARA","CASTRO DAIRE","FILIPE","VILA FRADES",
    "VARZIM","SINES","SETÚBAL","PORTELA","LISBOA","ALMEIDA","TUPI","MIRAMAR","ÁUREA",
    "CONSTANÇA","SANTARÉM","GAEL","AYLA","FELGUEIRAS"
  ];

  // Verifica se algum produto do carrinho tem direito a pick
  function carrinhoTemPick(){
    var itens=lerItensCarrinhoArray();
    if(itens.length===0)return false;
    for(var i=0;i<itens.length;i++){
      var nome=itens[i].trim().toUpperCase();
      for(var j=0;j<PRODUTOS_COM_PICK.length;j++){
        if(nome.indexOf(PRODUTOS_COM_PICK[j].toUpperCase())!==-1)return true;
      }
    }
    return false;
  }

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
    [1032000,1033050],[1036000,1048000],
    [1100000,1101009],[1101011,1109999],
    [1110000,1124059],[1124061,1135050],
    [1135050,1136000],[1136002,1136050],
    [1137000,1138800],
    [1139000,1140079],[1140081,1150010],
    [1150011,1153050],[1154000,1160000],
    [1200000,1206010],[1207000,1213010],[1214000,1217020],
    [1218000,1218999],[1219000,1233070],[1234000,1244030],
    [2500000,2516800],
    [5000000,5001099],[5001150,5020000]
  ];

  // CEPs com bloqueio total (não realizamos entregas nesses endereços)
  // Cliente vê popup e é impedido de agendar entrega (só retirada)
  var CEPS_BLOQUEADOS=[
    "01133-020",
    "01140-080",
    "01140-070",
    "05001-100",
    "01156-001",
    "01128-030",
    "01142-200",
    "01142-300"
  ];

  // CEPs com alerta parcial (local problemático compartilha o CEP com outros endereços)
  // Cliente vê aviso com nome do local e precisa marcar "ciente" para prosseguir
  var CEPS_ALERTA_PARCIAL={
    "01139-001":"Fórum Trabalhista",
    "05003-100":"Shopping West Plaza",
    "05001-200":"Nubank Parque",
    "05005-030":"Bourbon Shopping",
    "05005-900":"Bourbon Shopping",
    "01232-010":"Hospital Samaritano",
    "01232-011":"Hospital Samaritano",
    "01238-000":"Shopping Higienópolis",
    "01221-010":"Complexo Santa Casa",
    "01239-001":"Mackenzie",
    "01241-000":"Mackenzie",
    "01120-010":"Pinacoteca de São Paulo",
    "01101-010":"Pinacoteca de São Paulo",
    "01032-001":"Estação da Luz",
    "01122-000":"COPOM / Quartel do Comando Geral da PM",
    "01124-060":"COPOM / Quartel do Comando Geral da PM",
    "01107-000":"SABESP"
  };

  // Normaliza CEP para formato "00000-000"
  function formatarCep(cep){
    var n=cep.replace(/\D/g,"");
    if(n.length!==8)return cep;
    return n.substring(0,5)+"-"+n.substring(5);
  }

  // Verifica se o CEP está na lista de bloqueio total
  function cepBloqueadoTotal(cep){
    return CEPS_BLOQUEADOS.indexOf(formatarCep(cep))!==-1;
  }

  // Retorna o nome do local se o CEP tiver alerta parcial, senão null
  function cepAlertaParcial(cep){
    return CEPS_ALERTA_PARCIAL[formatarCep(cep)]||null;
  }

  // Faixas de CEP com trânsito intenso após as 15h
  // (Tarde III bloqueada para estes CEPs quando o cliente acessar após esse horário)
  var FAIXAS_CEP_TRANSITO=[
    [1100000,1109999],   // 3
    [1110000,1135050],   // 4
    [1135050,1136050],   // 5
    [1137000,1138800],   // 6
    [1139000,1150010],   // 7
    [1234000,1244030],   // 15
    [2500000,2516800],   // 16
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
      "Caso a entrega não seja concluída por ausência do destinatário, de uma pessoa responsável pelo recebimento, informações incorretas, impossibilidade de contato com o comprador para resolver ou qualquer motivo não imputável à Floricultura Dias, o pedido retornará à loja. O produto ficará disponível para retirada em nossa loja física por 2 dias. Tratando-se de flores — produto perecível — os sucessivos transportes inviabilizam sua reutilização ou comercialização, caracterizando culpa exclusiva do consumidor, não sendo cabível o cancelamento da compra nem a restituição dos valores pagos."
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
  var pickSel=null; // objeto pick escolhida ou null
  var cienteAlertaParcial=false; // check do aviso de CEP com local problemático

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
        _termoAceito:termoAceito,
        _pickCod:pickSel?pickSel.codigo:null
      }));
    }catch(x){}
  }

  function restaurarSessao(){
    // Restaura o protocolo da sessão se existir
    try{
      var protoSaved=sessionStorage.getItem("fdc_protocolo");
      if(protoSaved)_protocoloSessao=protoSaved;
    }catch(x){}
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
      if(dados._pickCod){
        var pRest=PICKS.find(function(x){return x.codigo===dados._pickCod;});
        if(pRest){
          pickSel=pRest;
          var pCod=document.getElementById("fdc-res-pick-cod");
          var pFr=document.getElementById("fdc-res-pick-frase");
          var pBtn=document.getElementById("fdc-btn-pick");
          var pRes=document.getElementById("fdc-resumo-pick");
          if(pCod){pCod.textContent=pRest.codigo;}
          if(pFr){pFr.textContent=pRest.frase;}
          if(pBtn){pBtn.style.display="none";}
          if(pRes){pRes.style.display="block";}
        }
      }
      fdcVerificar();
    }catch(x){}
  }

  function injetarCSS(){
    var css=[
      ".fdc-bloco{background:transparent;border:0;padding:0;margin:20px 0;font-family:inherit;box-shadow:none}",
      ".fdc-v9-head{background:#fff;border:1px solid #e7e3e0;border-radius:14px;padding:18px 18px 16px;margin-bottom:14px}",
      ".fdc-v9-head h2{margin:0;color:#a91537;font-size:21px;line-height:1.25}",
      ".fdc-v9-head p{margin:5px 0 0;color:#777;font-size:12px;line-height:1.45}",
      ".fdc-v9-progress{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:15px}",
      ".fdc-v9-step{display:flex;align-items:center;gap:7px;border:1px solid #e7e3e0;background:#fafafa;border-radius:9px;padding:8px 9px;font-size:11px;color:#8a8a8a}",
      ".fdc-v9-step .n{width:23px;height:23px;border-radius:50%;background:#e9e7e6;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0}",
      ".fdc-v9-step.done{background:#f4faf6;border-color:#d6e8dc;color:#3d7650}.fdc-v9-step.done .n{background:#3d875a;color:#fff}",
      ".fdc-v9-step.active{background:#fff5f7;border-color:#dfb7c2;color:#a91537}.fdc-v9-step.active .n{background:#a91537;color:#fff}",
      ".fdc-v9-layout{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:14px;align-items:start}",
      ".fdc-v9-card{background:#fff;border:1px solid #e7e3e0;border-radius:12px;padding:16px;margin-bottom:12px}",
      ".fdc-v9-card-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}",
      ".fdc-v9-card-title{margin:0;font-size:15px;font-weight:800;color:#2d2d2d}",
      ".fdc-v9-edit{background:none;border:0;color:#a91537;font-size:11px;font-weight:800;cursor:pointer}",
      ".fdc-v9-receber{display:grid;grid-template-columns:1fr 1fr;gap:9px}",
      ".fdc-v9-toggle{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 13px}",
      ".fdc-toggle-btn{min-height:48px;padding:12px 10px;background:#fff;border:1.5px solid #d8d3d0;border-radius:10px;font-size:12px;font-weight:800;cursor:pointer;color:#555;transition:all .2s}",
      ".fdc-toggle-btn.ativo{background:#5a8966;color:#fff;border-color:#5a8966;box-shadow:0 2px 8px rgba(90,137,102,.18)}",
      ".fdc-v9-cep-title{font-size:12px;font-weight:800;color:#444;margin:0 0 6px}",
      ".fdc-campo{margin-bottom:11px}.fdc-campo label{display:block;font-size:12px;font-weight:700;color:#444;margin-bottom:5px}.fdc-campo label small{font-weight:400;color:#888;font-size:10px;display:block;margin-top:2px}.fdc-campo label small.fdc-cep-destaque{font-weight:800;color:#a91537}",
      ".fdc-campo input,.fdc-campo textarea{width:100%;box-sizing:border-box;border:1.5px solid #d0cbc8;border-radius:8px;padding:10px 11px;font-size:14px;font-family:inherit;background:#fff;color:#333;outline:none;transition:border-color .2s}.fdc-campo input:focus,.fdc-campo textarea:focus{border-color:#a91537}",
      ".fdc-campo textarea{resize:vertical;min-height:88px}.fdc-campo textarea:disabled{background:#f5f5f5;color:#aaa}",
      ".fdc-cep-wrap{position:relative}.fdc-cep-status{display:inline-block;margin-top:5px;font-size:11px;font-weight:600;padding:4px 8px;border-radius:5px}.fdc-cep-status.ok{background:#e8f5f0;color:#0a5c3a}.fdc-cep-status.erro{background:#fde8e8;color:#c0392b}",
      ".fdc-cep-aviso,.fdc-cep-parcial{display:none;margin-top:7px;padding:8px 10px;border-radius:6px;font-size:11px;line-height:1.45}.fdc-cep-aviso{background:#fff4e0;border-left:3px solid #e8a33d;color:#7a5a1f}.fdc-cep-aviso.ativo{display:block}.fdc-cep-parcial{background:#fff1f0;border-left:3px solid #a91537;color:#6a1220}.fdc-cep-parcial.ativo{display:block}.fdc-cep-parcial-check{display:flex;align-items:center;gap:6px;margin-top:8px;font-size:11px;cursor:pointer;font-weight:600}.fdc-cep-parcial-check input{accent-color:#a91537;width:14px;height:14px}",
      ".fdc-bloco-trava{position:relative}.fdc-bloco-trava.bloqueado{pointer-events:none;opacity:.48}",
      ".fdc-sec{font-size:12px;font-weight:800;color:#a91537;margin:15px 0 9px;padding-bottom:6px;border-bottom:1px solid #eee}",
      ".fdc-btn-ag{width:100%;background:#fff;color:#5a8966;border:1.5px solid #5a8966;padding:11px;border-radius:9px;font-size:13px;font-weight:800;cursor:pointer;margin-bottom:9px}.fdc-btn-ag:hover{background:#eef5ef}",
      ".fdc-resumo-ag{background:#f7fbf8;border:1px solid #d8e7dc;border-radius:9px;padding:11px 12px;margin-bottom:10px}.fdc-resumo-ag-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}.fdc-resumo-ag-item label{font-size:10px;color:#888;display:block;margin-bottom:2px}.fdc-resumo-ag-item strong{font-size:12px;color:#333;display:block}.fdc-resumo-ag-item span{font-size:10px;color:#888}.fdc-btn-alt{background:#fff;border:1px solid #5a8966;color:#5a8966;border-radius:7px;padding:6px 11px;font-size:11px;font-weight:700;cursor:pointer}",
      ".fdc-pick-item{display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid #e8c9a0;border-radius:7px;margin-bottom:7px;cursor:pointer;transition:all .15s}.fdc-pick-item:hover{border-color:#a91537;background:#faf5eb}.fdc-pick-item.sel{border-color:#a91537;background:#fff5e1}.fdc-pick-item input{accent-color:#a91537;width:14px;height:14px;flex-shrink:0}.fdc-pick-cod{font-weight:700;color:#a91537;font-size:12px;font-family:monospace}.fdc-pick-frase{font-size:13px;color:#333}",
      ".fdc-btn-ag:disabled{background:#aaa;cursor:not-allowed}",
      ".fdc-msg-footer{display:flex;align-items:center;justify-content:space-between;margin-top:6px;flex-wrap:wrap;gap:4px}.fdc-contador{font-size:10px;color:#aaa}.fdc-sem-msg{display:flex;align-items:center;gap:6px;font-size:11px;color:#666;cursor:pointer;user-select:none}.fdc-sem-msg input{accent-color:#5a8966;width:14px;height:14px}",
      ".fdc-termo-wrap{border-radius:9px;padding:13px 14px;margin-top:4px;background:#3a3a3a}.fdc-termo-wrap.aceito{background:#72cd41}.fdc-termo-lista{list-style:none;padding:0 4px 0 0;margin:0 0 10px;max-height:145px;overflow-y:auto;scrollbar-width:thin}.fdc-termo-lista li{font-size:11px;color:#fff;line-height:1.55;padding:4px 0 4px 17px;position:relative}.fdc-termo-lista li::before{content:'•';position:absolute;left:0;color:rgba(255,255,255,.65)}.fdc-termo-check{display:flex;align-items:center;gap:7px;font-size:11px;color:#fff;cursor:pointer;font-weight:700}.fdc-termo-check input{accent-color:#fff;width:14px;height:14px}",
      ".fdc-v9-side{position:sticky;top:14px}.fdc-v9-summary{background:#fff;border:1px solid #e7e3e0;border-radius:12px;padding:15px}.fdc-v9-summary h3{margin:0 0 12px;font-size:14px}.fdc-v9-summary-row{display:flex;justify-content:space-between;gap:8px;padding:7px 0;border-bottom:1px solid #eee;font-size:11px}.fdc-v9-summary-row:last-child{border-bottom:0}.fdc-v9-summary-row span{color:#777}.fdc-v9-summary-row strong{color:#333;text-align:right}.fdc-v9-check{margin-top:11px;background:#edf7f0;border-radius:8px;padding:10px;font-size:10px;line-height:1.45;color:#275d3c}.fdc-v9-status{margin-top:10px;background:#fafafa;border:1px solid #e8e5e3;border-radius:9px;padding:10px}.fdc-v9-status-title{font-size:11px;font-weight:800;margin-bottom:7px;color:#555}.fdc-status-items{display:flex;flex-wrap:wrap;gap:5px}.fdc-st{font-size:10px;padding:3px 8px;border-radius:20px;background:#efefef;color:#999}.fdc-st.ok{background:#e8f5f0;color:#0a5c3a}",
      ".fdc-box-ok{display:none;background:#72cd41;border-radius:9px;padding:13px;margin-top:10px}.fdc-box-ok-inner{display:flex;align-items:flex-start;gap:10px}.fdc-box-ok-icon{font-size:20px}.fdc-box-ok-txt strong{font-size:13px;color:#fff;display:block;margin-bottom:4px}.fdc-box-ok-txt p{font-size:11px;color:#fff;line-height:1.45;margin:0}",
      /* Modal: keep existing business logic/IDs, but optimize UX */
      ".fdc-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:99999;align-items:center;justify-content:center}.fdc-overlay.ativo{display:flex}",
      ".fdc-modal{background:#fff;border-radius:14px;width:min(94%,680px);max-height:92vh;overflow:auto;box-shadow:0 18px 60px rgba(0,0,0,.25)}",
      ".fdc-modal-header{padding:14px 17px;border-bottom:1px solid #eee;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:#fff;z-index:2}.fdc-modal-header h4{font-size:15px;font-weight:700;color:#333;margin:0}.fdc-modal-fechar{background:#f3f3f3;border:0;border-radius:50%;width:32px;height:32px;font-size:20px;color:#777;cursor:pointer}",
      ".fdc-modal-body{display:grid;grid-template-columns:1fr 1fr}.fdc-cal-lado{padding:15px}.fdc-per-lado{padding:15px;border-left:1px solid #eee}.fdc-cal-nav{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}.fdc-cal-nav span{font-size:13px;font-weight:700}.fdc-cal-nav button{background:#fff;border:1px solid #ddd;border-radius:7px;width:30px;height:30px;cursor:pointer;font-size:17px;color:#666;display:flex;align-items:center;justify-content:center}.fdc-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.fdc-dow{font-size:10px;color:#aaa;text-align:center;padding:2px}.fdc-day{font-size:11px;text-align:center;padding:8px 2px;border-radius:8px;border:1px solid #e7a1a1;background:#fdeaea;color:#a72d2d;width:100%;font-weight:600}.fdc-day.disp{background:#e7f5eb;color:#23663a;border-color:#a9d5b6;cursor:pointer;font-weight:800}.fdc-day.disp:hover{background:#d5eddd}.fdc-day.sel{background:#026dfb;color:#fff;border-color:#026dfb}.fdc-day.hj{outline:2px solid #a91537;outline-offset:-2px}.fdc-day.namorados-esgotado,.fdc-day.namorados-produto,.fdc-day.namorados-cep{background:#fdeaea;color:#a72d2d;border-color:#e7a1a1;cursor:pointer;font-weight:700}.fdc-legenda{display:flex;gap:9px;margin-top:10px;flex-wrap:wrap}.fdc-leg{display:flex;align-items:center;gap:5px;font-size:9px;color:#777}.fdc-leg-dot{width:11px;height:11px;border-radius:3px}.fdc-per-titulo{font-size:12px;font-weight:800;color:#555;margin-bottom:9px};.fdc-periodos-scroll{max-height:256px;overflow-y:auto;padding-right:4px}.fdc-periodo{display:flex;align-items:center;gap:9px;padding:10px 11px;border:1.5px solid #8fc49e;background:#edf8f1;color:#21613a;border-radius:9px;margin-bottom:7px;cursor:pointer;min-height:48px}.fdc-periodo.sel{border-color:#a91537;background:#fff;color:#a91537;box-shadow:0 0 0 2px rgba(169,21,55,.08)}.fdc-periodo.bloq{background:#fdeaea;border-color:#e7a1a1;color:#a72d2d;cursor:default;pointer-events:none}.fdc-periodo input{accent-color:#a91537;width:14px;height:14px}.fdc-per-nome{font-size:12px;font-weight:700;color:#333}.fdc-per-hora{font-size:10px;color:#888}.fdc-modal-resumo{border-top:1px solid #eee;padding:11px 17px;display:grid;grid-template-columns:1fr 1fr;gap:8px}.fdc-modal-res label{font-size:10px;color:#888;margin-bottom:2px;display:block}.fdc-modal-res strong{font-size:12px;color:#333}.fdc-modal-res small{font-size:10px;color:#aaa;display:block}.fdc-btn-conf{width:calc(100% - 34px);margin:0 17px 15px;background:#a91537;color:#fff;border:none;padding:12px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.fdc-btn-conf:disabled{background:#ccc;cursor:default}",
      ".fdc-popup-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:999999;align-items:center;justify-content:center}.fdc-popup-overlay.ativo{display:flex}.fdc-popup{background:#fff;border-radius:13px;padding:26px 22px;width:90%;max-width:430px;text-align:center}.fdc-popup-icon{font-size:34px;margin-bottom:10px}.fdc-popup h3{font-size:16px;margin:0 0 8px}.fdc-popup p{font-size:12px;color:#666;line-height:1.55}.fdc-popup-btn{background:#a91537;color:#fff;border:0;padding:11px 26px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer}.fdc-popup-btn-sec{background:#5a8966}.fdc-popup-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}",
      ".fdc-popup-conf{max-width:460px;text-align:left}.fdc-popup-conf h3{text-align:center}.fdc-conf-bloco{background:#fff5e1;border:1px solid #f5e0b8;border-radius:8px;padding:13px 14px;margin-bottom:13px}.fdc-conf-item{display:flex;gap:9px;margin-bottom:11px}.fdc-conf-item:last-child{margin-bottom:0}.fdc-conf-icon{font-size:16px}.fdc-conf-label{font-size:10px;color:#888;font-weight:600;text-transform:uppercase;letter-spacing:.4px}.fdc-conf-valor{font-size:13px;color:#333;font-weight:700}.fdc-conf-sub{font-size:11px;color:#666}.fdc-conf-msg-txt{font-size:12px;color:#333;font-style:italic;line-height:1.5}.fdc-conf-aviso{background:#f1efe8;border-left:3px solid #95a37b;border-radius:6px;padding:10px 12px;font-size:11.5px;line-height:1.5;color:#444}",
      "@media(max-width:820px){.fdc-v9-layout{grid-template-columns:1fr}.fdc-v9-side{position:static}.fdc-v9-progress{grid-template-columns:repeat(2,1fr)}}",
      "@media(max-width:560px){.fdc-v9-head{padding:15px 14px}.fdc-v9-head h2{font-size:19px}.fdc-v9-progress{gap:5px}.fdc-v9-step{padding:8px 7px;font-size:10px}.fdc-v9-step .n{width:21px;height:21px}.fdc-v9-card{padding:14px;margin-bottom:10px}.fdc-v9-receber{grid-template-columns:1fr}.fdc-v9-toggle{gap:6px}.fdc-toggle-btn{font-size:11px;padding:11px 7px}.fdc-modal{width:96%;max-height:94vh;border-radius:12px}.fdc-modal-body{grid-template-columns:1fr}.fdc-per-lado{border-left:0;border-top:1px solid #eee}.fdc-cal-lado,.fdc-per-lado{padding:12px}.fdc-day{padding:8px 1px;font-size:10px}.fdc-periodo{min-height:50px;padding:10px}.fdc-modal-resumo{grid-template-columns:1fr}.fdc-v9-summary{padding:13px}}"
    ].join("");
    var s=document.createElement("style");s.id="fdc-v9-css";s.innerHTML=css;document.head.appendChild(s);
  }
  function montarBloco(){
    var div=document.createElement("div");
    div.id="fdc-bloco";div.className="fdc-bloco";
    var termoItens=TERMOS.entrega.map(function(t){return '<li>'+t+'</li>';}).join("");

    div.innerHTML=[
      '<section class="fdc-v9-head">',
        '<h2>Seu pedido está quase pronto! 🌷</h2>',
        '<p>Confira os dados abaixo e escolha quando e como deseja receber seu pedido.</p>',
        '<div class="fdc-v9-progress">',
          '<div class="fdc-v9-step active"><span class="n">1</span><span>Entrega</span></div>',
          '<div class="fdc-v9-step"><span class="n">2</span><span>Agendamento</span></div>',
          '<div class="fdc-v9-step"><span class="n">3</span><span>Personalização</span></div>',
          '<div class="fdc-v9-step"><span class="n">4</span><span>Revisão</span></div>',
        '</div>',
      '</section>',

      '<div class="fdc-v9-layout">',
        '<div class="fdc-v9-main">',

          '<section class="fdc-v9-card">',
            '<div class="fdc-v9-card-head"><h3 class="fdc-v9-card-title">📍 Como deseja receber seu pedido?</h3></div>',
            '<div class="fdc-v9-toggle">',
              '<button class="fdc-toggle-btn ativo" id="fdc-btn-ent" onclick="fdcSetTipo(\'entrega\')">🚚 Entrega</button>',
              '<button class="fdc-toggle-btn" id="fdc-btn-ret" onclick="fdcSetTipo(\'retirada\')">🏪 Retirada na loja</button>',
            '</div>',
            '<div id="fdc-bloco-cep">',
              '<p class="fdc-v9-cep-title">CEP de entrega</p>',
              '<div class="fdc-campo fdc-cep-wrap">',
                '<label>Informe o CEP de destino<small class="fdc-cep-destaque">⚠️ Primeiro, confirme se entregamos no endereço que você precisa.</small></label>',
                '<input type="text" id="fdc-cep" placeholder="00000-000" maxlength="9" oninput="fdcMascaraCep(this);fdcValidarCep();fdcSalvar()"/>',
                '<span id="fdc-cep-status"></span>',
                '<div id="fdc-cep-aviso" class="fdc-cep-aviso">⚠️ <strong>Atenção:</strong> este CEP não está incluído na nossa área de entrega para o Dia dos Namorados (12/06).</div>',
                '<div id="fdc-cep-parcial" class="fdc-cep-parcial">',
                  '<span>⚠️ <strong>Atenção:</strong> Neste CEP funciona também o <strong id="fdc-cep-parcial-local">—</strong>, local onde infelizmente não realizamos entregas por dificuldade de acesso. Se a entrega for para outro endereço deste CEP, pode seguir normalmente. Se for para o <span id="fdc-cep-parcial-local2">—</span>, o pedido será cancelado.</span>',
                  '<label class="fdc-cep-parcial-check"><input type="checkbox" id="fdc-cep-parcial-check" onchange="fdcToggleCienteParcial()"/> Estou ciente</label>',
                '</div>',
              '</div>',
            '</div>',
          '</section>',

          '<section id="fdc-bloco-trava" class="fdc-v9-card fdc-bloco-trava">',
            '<div class="fdc-v9-card-head"><h3 class="fdc-v9-card-title">📅 Quando receber seu pedido?</h3></div>',
            '<button class="fdc-btn-ag" id="fdc-btn-ag" onclick="fdcAbrirModal()">Escolher data e período</button>',
            '<div id="fdc-resumo-ag" style="display:none" class="fdc-resumo-ag">',
              '<div class="fdc-resumo-ag-grid">',
                '<div class="fdc-resumo-ag-item"><label>📅 Data</label><strong id="fdc-res-data">—</strong><span id="fdc-res-diasem"></span></div>',
                '<div class="fdc-resumo-ag-item"><label>🕐 Período</label><strong id="fdc-res-per">—</strong><span id="fdc-res-hora"></span></div>',
              '</div>',
              '<button class="fdc-btn-alt" onclick="fdcAlterar()">Alterar agendamento</button>',
            '</div>',

            '<div id="fdc-bloco-pres" class="fdc-v9-card" style="padding:0;border:0;margin:14px 0 0">',
              '<div class="fdc-v9-card-head"><h3 class="fdc-v9-card-title">🎁 Quem vai receber?</h3></div>',
              '<div class="fdc-campo"><label>Nome completo de quem vai receber</label><input type="text" id="fdc-nome" placeholder="Ex.: Maria da Silva" maxlength="80" oninput="fdcSalvar();fdcVerificar()"/></div>',
              '<div class="fdc-campo"><label>WhatsApp de quem vai receber<small>Só entramos em contato se não conseguirmos falar com o comprador antes.</small></label><input type="tel" id="fdc-tel" placeholder="(11) 98765-4321" maxlength="15" oninput="fdcMascaraTel(this);fdcSalvar();fdcVerificar()"/></div>',
            '</div>',

            '<div id="fdc-bloco-pick" style="display:none" class="fdc-v9-card" style="padding:0;border:0">',
              '<div class="fdc-v9-card-head"><h3 class="fdc-v9-card-title">🎀 Personalização</h3></div>',
              '<button class="fdc-btn-ag" id="fdc-btn-pick" onclick="fdcAbrirModalPick()" style="border:1.5px solid #72cd41">Brinde: escolha sua pick decorativa</button>',
              '<div id="fdc-resumo-pick" style="display:none" class="fdc-resumo-ag">',
                '<div class="fdc-resumo-ag-grid" style="grid-template-columns:1fr">',
                  '<div class="fdc-resumo-ag-item"><label>🎀 Pick escolhida</label><strong id="fdc-res-pick-cod">—</strong><span id="fdc-res-pick-frase"></span></div>',
                '</div>',
                '<button class="fdc-btn-alt" onclick="fdcAlterarPick()">Alterar pick</button>',
              '</div>',
            '</div>',

            '<div class="fdc-v9-card" style="padding:0;border:0;margin-top:16px">',
              '<div class="fdc-v9-card-head"><h3 class="fdc-v9-card-title">💌 Mensagem do cartão</h3></div>',
              '<div class="fdc-campo">',
                '<textarea id="fdc-msg" maxlength="500" placeholder="Digite aqui sua mensagem de coração... não se esqueça de assinar a msg =)" oninput="fdcSalvar()"></textarea>',
                '<div class="fdc-msg-footer">',
                  '<label class="fdc-sem-msg"><input type="checkbox" id="fdc-sem-msg" onchange="fdcToggleSemMsg()"/> Sem mensagem de cartão</label>',
                  '<span class="fdc-contador"><span id="fdc-faltam">500</span> caracteres restantes</span>',
                '</div>',
              '</div>',
            '</div>',

            '<div class="fdc-v9-card" style="padding:0;border:0;margin-top:16px">',
              '<div class="fdc-v9-card-head"><h3 class="fdc-v9-card-title">🔒 Termos e confirmações</h3></div>',
              '<div class="fdc-termo-wrap" id="fdc-termo-wrap">',
                '<ul class="fdc-termo-lista" id="fdc-termo-lista">'+termoItens+'</ul>',
                '<label class="fdc-termo-check"><input type="checkbox" id="fdc-termo" onchange="fdcToggleTermo()"/> Estou ciente dos termos</label>',
              '</div>',
            '</div>',

            '<div class="fdc-v9-status">',
              '<div class="fdc-v9-status-title">Checklist do pedido</div>',
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

          '</section>',
        '</div>',

        '<aside class="fdc-v9-side">',
          '<div class="fdc-v9-summary">',
            '<h3>Revisão do pedido</h3>',
            '<div class="fdc-v9-summary-row"><span>Recebimento</span><strong id="fdc-v9-receb">Entrega</strong></div>',
            '<div class="fdc-v9-summary-row"><span>Agendamento</span><strong id="fdc-v9-ag">Ainda não escolhido</strong></div>',
            '<div class="fdc-v9-summary-row"><span>Destinatário</span><strong id="fdc-v9-nome">Ainda não preenchido</strong></div>',
            '<div class="fdc-v9-summary-row"><span>WhatsApp</span><strong id="fdc-v9-tel">Ainda não preenchido</strong></div>',
            '<div class="fdc-v9-summary-row"><span>Mensagem</span><strong id="fdc-v9-msg">Não preenchida</strong></div>',
            '<div class="fdc-v9-summary-row"><span>Termos</span><strong id="fdc-v9-termos">Aguardando</strong></div>',
            '<div class="fdc-v9-check">🔒 <b>Seus dados estão seguros.</b><br>Usamos estas informações para garantir a preparação correta do seu pedido.</div>',
            '<div style="margin-top:11px;font-size:10px;color:#888;line-height:1.45">Ao concluir, você seguirá para o pagamento.</div>',
          '</div>',
        '</aside>',
      '</div>'
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

    // Popup para bloqueio total (endereço com difícil acesso)
    var divBloq=document.createElement("div");
    divBloq.id="fdc-popup-bloqueio-overlay";divBloq.className="fdc-popup-overlay";
    divBloq.innerHTML=[
      '<div class="fdc-popup">',
        '<div class="fdc-popup-icon">⚠️</div>',
        '<h3>Endereço com difícil acesso</h3>',
        '<p>Infelizmente não realizamos entregas neste endereço devido a dificuldades de acesso, parada ou restrições do local.<br><br>Você pode retirar seu pedido em nossa loja física em <strong>Al. Barão de Limeira, 998 – Campos Elíseos</strong>.</p>',
        '<div class="fdc-popup-btns">',
          '<button class="fdc-popup-btn fdc-popup-btn-sec" onclick="fdcOptarRetiradaBloq()">Optar por Retirada</button>',
          '<button class="fdc-popup-btn" onclick="fdcFecharPopupBloq()">Fechar</button>',
        '</div>',
      '</div>'
    ].join("");
    document.body.appendChild(divBloq);


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
              '<div class="fdc-leg"><div class="fdc-leg-dot" style="background:#e7f5eb;border:1px solid #a9d5b6"></div>Disponível</div>',
              '<div class="fdc-leg"><div class="fdc-leg-dot" style="background:#fdeaea;border:1px solid #e7a1a1"></div>Indisponível</div>',
            '</div>',
          '</div>',
          '<div class="fdc-per-lado">',
            '<div class="fdc-per-titulo" id="fdc-per-titulo">Selecione uma data</div>',
            '<div id="fdc-periodos" class="fdc-periodos-scroll"></div>',
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

  function montarModalPick(){
    var overlay=document.createElement("div");
    overlay.id="fdc-overlay-pick";overlay.className="fdc-overlay";
    var itensHtml=PICKS.map(function(p){
      return '<div class="fdc-pick-item" data-cod="'+p.codigo+'"><input type="radio" name="fdc-pick-radio"/><div><span class="fdc-pick-cod">'+p.codigo+'</span> — <span class="fdc-pick-frase">'+p.frase+'</span></div></div>';
    }).join("");
    overlay.innerHTML=[
      '<div class="fdc-modal" style="max-width:520px">',
        '<div class="fdc-modal-header"><h4>🎀 Escolha sua pick decorativa</h4><button class="fdc-modal-fechar" onclick="fdcFecharModalPick()">&times;</button></div>',
        '<div style="padding:16px 20px">',
          '<p style="font-size:12.5px;color:#666;line-height:1.5;margin-bottom:14px">A pick decorativa acompanha seu kit como brinde. Escolha a frase que combina com a ocasião do presente.</p>',
          '<div id="fdc-picks-lista">'+itensHtml+'</div>',
        '</div>',
        '<button class="fdc-btn-conf" id="fdc-btn-conf-pick" disabled onclick="fdcConfirmarPick()">Confirmar</button>',
      '</div>'
    ].join("");
    document.body.appendChild(overlay);
    overlay.onclick=function(e){if(e.target===overlay)fdcFecharModalPick();};

    // Adiciona listeners nas opções
    overlay.querySelectorAll(".fdc-pick-item").forEach(function(el){
      el.onclick=function(){
        overlay.querySelectorAll(".fdc-pick-item").forEach(function(x){x.classList.remove("sel");x.querySelector("input").checked=false;});
        el.classList.add("sel");
        el.querySelector("input").checked=true;
        document.getElementById("fdc-btn-conf-pick").disabled=false;
      };
    });
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
    var parcial=document.getElementById("fdc-cep-parcial");
    var cep=el.value.replace(/\D/g,"");

    if(cep.length<8){
      cepOk=false;
      cepValidoDia12=false;
      cienteAlertaParcial=false;
      status.textContent="";
      status.className="";
      aviso.classList.remove("ativo");
      if(parcial){
        parcial.classList.remove("ativo");
        var cbP=document.getElementById("fdc-cep-parcial-check");
        if(cbP)cbP.checked=false;
      }
      atualizarTrava();
      fdcVerificar();
      return;
    }

    // 1. Verifica bloqueio total (CEP de local com difícil acesso)
    if(cepBloqueadoTotal(el.value)){
      cepOk=false;
      cepValidoDia12=false;
      cienteAlertaParcial=false;
      status.textContent="✗ Não realizamos entregas neste endereço";
      status.className="fdc-cep-status erro";
      aviso.classList.remove("ativo");
      if(parcial)parcial.classList.remove("ativo");
      if(!silencioso){
        document.getElementById("fdc-popup-bloqueio-overlay").classList.add("ativo");
        registrarCepTracking(el.value,"bloqueado","");
      }
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

      // 2. Verifica alerta parcial (local problemático compartilhando CEP)
      var localParcial=cepAlertaParcial(el.value);
      if(localParcial&&parcial){
        var el1=document.getElementById("fdc-cep-parcial-local");
        var el2=document.getElementById("fdc-cep-parcial-local2");
        if(el1)el1.textContent=localParcial;
        if(el2)el2.textContent=localParcial;
        parcial.classList.add("ativo");
        // Reseta o check ao trocar de CEP
        var cbP2=document.getElementById("fdc-cep-parcial-check");
        if(cbP2)cbP2.checked=false;
        cienteAlertaParcial=false;
      }else if(parcial){
        parcial.classList.remove("ativo");
        cienteAlertaParcial=false;
      }

      // Registra CEP atendido no Google Sheets (silencioso, se não for restauração de sessão)
      if(!silencioso){
        registrarCepTracking(el.value,"atendido",descobrirFaixaCep(cep));
      }
    }else{
      cepOk=false;
      cepValidoDia12=false;
      cienteAlertaParcial=false;
      status.textContent="✗ Não atendemos este CEP";
      status.className="fdc-cep-status erro";
      aviso.classList.remove("ativo");
      if(parcial)parcial.classList.remove("ativo");
      if(!silencioso){
        document.getElementById("fdc-popup-cep-overlay").classList.add("ativo");
        // Registra CEP não atendido
        registrarCepTracking(el.value,"não atendido","");
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

  window.fdcFecharPopupBloq=function(){
    document.getElementById("fdc-popup-bloqueio-overlay").classList.remove("ativo");
  };

  window.fdcOptarRetiradaBloq=function(){
    document.getElementById("fdc-popup-bloqueio-overlay").classList.remove("ativo");
    window.fdcSetTipo("retirada");
  };

  window.fdcToggleCienteParcial=function(){
    var cb=document.getElementById("fdc-cep-parcial-check");
    cienteAlertaParcial=cb?cb.checked:false;
    atualizarTrava();
    fdcVerificar();
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
    var bloquear=false;
    if(tipo==="entrega"){
      if(!cepOk)bloquear=true;
      // Se tem alerta parcial e não marcou "ciente", bloqueia
      var cepEl=document.getElementById("fdc-cep");
      if(cepOk&&cepEl&&cepAlertaParcial(cepEl.value)&&!cienteAlertaParcial){
        bloquear=true;
      }
    }
    if(bloquear){
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
    var steps=document.querySelectorAll(".fdc-v9-progress .fdc-v9-step");steps.forEach(function(s){s.classList.remove("active","done");});if(steps[0])steps[0].classList.add("done");if(steps[1])steps[1].classList.add("active");
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

  function fdcV9AtualizarResumo(){
    var el=function(id){return document.getElementById(id);};
    var rb=el("fdc-v9-receb"),ag=el("fdc-v9-ag"),nm=el("fdc-v9-nome"),tel=el("fdc-v9-tel"),msg=el("fdc-v9-msg"),ter=el("fdc-v9-termos");
    if(rb)rb.textContent=tipo==="entrega"?"Entrega":"Retirada na loja";
    if(ag){
      if(dataSel&&periodoSel){
        var lista=getPeriodosParaDow(dataSel.getDay(),dataSel);
        var p=lista.find(function(x){return x.id===periodoSel;});
        ag.textContent=dataSel.toLocaleDateString("pt-BR")+" · "+(p?p.hora:"");
      }else ag.textContent="Ainda não escolhido";
    }
    var n=(el("fdc-nome")||{}).value||"", t=(el("fdc-tel")||{}).value||"", m=(el("fdc-msg")||{}).value||"";
    if(nm)nm.textContent=n.trim()||"Ainda não preenchido";
    if(tel)tel.textContent=t.trim()||"Ainda não preenchido";
    if(msg)msg.textContent=(semMensagem?"Sem mensagem":(m.trim()?m.trim().slice(0,28)+(m.trim().length>28?"…":""):"Não preenchida"));
    if(ter)ter.textContent=termoAceito?"✓ Aceitos":"Aguardando";
  }

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
    fdcV9AtualizarResumo();
    var steps=document.querySelectorAll(".fdc-v9-progress .fdc-v9-step");
    if(tudoOk){
      steps.forEach(function(s){s.classList.remove("active","done");});
      if(steps[0])steps[0].classList.add("done");if(steps[1])steps[1].classList.add("done");if(steps[2])steps[2].classList.add("done");if(steps[3])steps[3].classList.add("active");
    }

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
    var steps=document.querySelectorAll(".fdc-v9-progress .fdc-v9-step");steps.forEach(function(s){s.classList.remove("active","done");});if(steps[0])steps[0].classList.add("done");if(steps[1])steps[1].classList.add("done");if(steps[2])steps[2].classList.add("active");
fdcFecharModal();salvarSessao();fdcVerificar();
  };

  window.fdcAlterar=function(){
    agConfirmado=false;
    document.getElementById("fdc-btn-ag").style.display="block";
    document.getElementById("fdc-resumo-ag").style.display="none";
    fdcVerificar();fdcAbrirModal();
  };

  window.fdcAbrirModalPick=function(){
    document.getElementById("fdc-overlay-pick").classList.add("ativo");
    // Se já tem pick selecionada, marca no modal
    var itens=document.querySelectorAll("#fdc-overlay-pick .fdc-pick-item");
    itens.forEach(function(el){el.classList.remove("sel");el.querySelector("input").checked=false;});
    if(pickSel){
      var el=document.querySelector("#fdc-overlay-pick .fdc-pick-item[data-cod='"+pickSel.codigo+"']");
      if(el){el.classList.add("sel");el.querySelector("input").checked=true;}
      document.getElementById("fdc-btn-conf-pick").disabled=false;
    }else{
      document.getElementById("fdc-btn-conf-pick").disabled=true;
    }
  };

  window.fdcFecharModalPick=function(){
    document.getElementById("fdc-overlay-pick").classList.remove("ativo");
  };

  window.fdcConfirmarPick=function(){
    var sel=document.querySelector("#fdc-overlay-pick .fdc-pick-item.sel");
    if(!sel)return;
    var cod=sel.getAttribute("data-cod");
    var p=PICKS.find(function(x){return x.codigo===cod;});
    if(!p)return;
    pickSel=p;
    document.getElementById("fdc-res-pick-cod").textContent=p.codigo;
    document.getElementById("fdc-res-pick-frase").textContent=p.frase;
    document.getElementById("fdc-btn-pick").style.display="none";
    document.getElementById("fdc-resumo-pick").style.display="block";
    fdcFecharModalPick();
    salvarSessao();
  };

  window.fdcAlterarPick=function(){
    document.getElementById("fdc-btn-pick").style.display="block";
    document.getElementById("fdc-resumo-pick").style.display="none";
    pickSel=null;
    salvarSessao();
    fdcAbrirModalPick();
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
    var pickTxt="(não aplicável)";
    if(carrinhoTemPick()){
      pickTxt=pickSel?(pickSel.codigo+" - "+pickSel.frase):"(não escolhida)";
    }
    var dados={
      tipo_pedido:tipo==="entrega"?"Entrega":"Retirada na loja",
      itens_carrinho:lerItensCarrinho(),
      cep_entrega:tipo==="entrega"?(cepDigitado||"(não informado)"):"(retirada na loja)",
      nome_presenteado:tipo==="entrega"?((document.getElementById("fdc-nome")||{}).value||"(não informado)"):"(retirada na loja)",
      tel_presenteado:tipo==="entrega"?((document.getElementById("fdc-tel")||{}).value||"(não informado)"):"(retirada na loja)",
      pick_decorativa:pickTxt,
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

  // Retorna o protocolo da sessão (gera na primeira chamada, mantém depois)
  function getProtocoloSessao(){
    if(!_protocoloSessao){
      _protocoloSessao=gerarProtocolo();
      try{sessionStorage.setItem("fdc_protocolo",_protocoloSessao);}catch(x){}
    }
    return _protocoloSessao;
  }

  // Converte valor em número (aceita "R$ 1.234,56" ou 1234.56)
  function fdNumero(v){
    if(typeof v==="number")return v;
    var s=String(v).replace(/[^\d.,-]/g,"");
    if(s.indexOf(",")>-1&&s.indexOf(".")>-1){
      s=s.replace(/\./g,"").replace(",",".");
    }else if(s.indexOf(",")>-1){
      s=s.replace(",",".");
    }
    return parseFloat(s)||0;
  }

  // Lê os produtos do carrinho a partir do dataLayer (ProductBasketProducts)
  function fdLerCarrinho(){
    var itens=[];
    try{
      var dl=window.dataLayer||[];
      for(var i=dl.length-1;i>=0;i--){
        var o=dl[i];
        if(!o)continue;
        var lista=o.ProductBasketProducts||(o.ecommerce&&o.ecommerce.checkout&&o.ecommerce.checkout.products);
        if(lista&&lista.length){itens=lista;break;}
      }
    }catch(e){}
    var produtos=[],qtdTotal=0,valorTotal=0;
    itens.forEach(function(p){
      var nome=p.name||"";
      var qtd=parseInt(p.quantity||1,10)||1;
      var preco=fdNumero(p.price||0);
      produtos.push({nome:nome,qtd:qtd,id:p.id||"",preco:preco});
      qtdTotal+=qtd;
      valorTotal+=preco*qtd;
    });
    return {
      produtos:produtos,
      qtd_itens:qtdTotal,
      valor_total:Math.round(valorTotal*100)/100
    };
  }

  // Registra o CEP no Google Sheets (fire-and-forget, silencioso)
  function registrarCepTracking(cep,status,faixa){
    if(!CFG.tracking_url)return;
    // Evita duplicar registro do mesmo CEP na mesma sessão
    if(_ultimoCepRegistrado===cep)return;
    _ultimoCepRegistrado=cep;
    var protocolo=getProtocoloSessao();
    var carrinho=fdLerCarrinho();
    var payload={
      acao:"registrar_cep",
      cep:cep,
      status:status,
      faixa:faixa||"",
      protocolo:protocolo,
      produtos:carrinho.produtos,
      qtd_itens:carrinho.qtd_itens,
      valor_total:carrinho.valor_total
    };
    try{
      fetch(CFG.tracking_url,{
        method:"POST",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(payload)
      }).catch(function(){});
    }catch(x){}
  }

  // Marca o pedido como finalizado no Google Sheets
  function finalizarPedidoTracking(){
    if(!CFG.tracking_url)return;
    if(_pedidoFinalizadoTracking)return;
    if(!_protocoloSessao)return;
    _pedidoFinalizadoTracking=true;
    var payload={
      acao:"finalizar_pedido",
      protocolo:_protocoloSessao
    };
    try{
      fetch(CFG.tracking_url,{
        method:"POST",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(payload)
      }).catch(function(){});
    }catch(x){}
  }

  // Formata número CEP em faixa "01100-000 → 01109-999"
  function formatarFaixaCep(faixa){
    function fmt(n){
      var s=String(n).padStart(8,"0");
      return s.substring(0,5)+"-"+s.substring(5);
    }
    return fmt(faixa[0])+" → "+fmt(faixa[1]);
  }

  // Descobre em qual faixa o CEP se encaixa
  function descobrirFaixaCep(cep){
    var n=cepNoFormato(cep);
    for(var i=0;i<FAIXAS_CEP.length;i++){
      if(n>=FAIXAS_CEP[i][0]&&n<=FAIXAS_CEP[i][1])return formatarFaixaCep(FAIXAS_CEP[i]);
    }
    return "";
  }


  // ─────────────────────────────────────────────
  // MÓDULO FOTOS — upload somente ao clicar em "Continuar para o pagamento"
  // ─────────────────────────────────────────────
  var FD_FOTO_DB="fd_fotos_db_v1",FD_FOTO_STORE="personalizacoes",FD_FOTO_CLOUD="ccox0god",FD_FOTO_PRESET="floricultura_personalizados";

  function fdCheckoutDB(){
    return new Promise(function(resolve,reject){var r=indexedDB.open(FD_FOTO_DB,1);r.onupgradeneeded=function(){if(!r.result.objectStoreNames.contains(FD_FOTO_STORE))r.result.createObjectStore(FD_FOTO_STORE,{keyPath:"id"});};r.onsuccess=function(){resolve(r.result);};r.onerror=function(){reject(r.error);};});
  }
  function fdCheckoutGet(ids){return fdCheckoutDB().then(function(db){return new Promise(function(resolve){var tx=db.transaction(FD_FOTO_STORE,"readonly"),st=tx.objectStore(FD_FOTO_STORE),out=[],left=ids.length;if(!left){db.close();resolve(out);return;}ids.forEach(function(id,i){var r=st.get(id);r.onsuccess=function(){out[i]=r.result||null;if(--left===0){db.close();resolve(out);}};r.onerror=function(){if(--left===0){db.close();resolve(out);}};});});});}
  function fdCheckoutDel(id){return fdCheckoutDB().then(function(db){return new Promise(function(resolve,reject){var tx=db.transaction(FD_FOTO_STORE,"readwrite");tx.objectStore(FD_FOTO_STORE).delete(id);tx.oncomplete=function(){db.close();resolve();};tx.onerror=function(){db.close();reject(tx.error);};});});}
  function fdCheckoutIds(){try{return JSON.parse(sessionStorage.getItem("fd_fotos_pendentes")||"[]");}catch(e){return [];}}
  function fdCheckoutSetIds(ids){try{sessionStorage.setItem("fd_fotos_pendentes",JSON.stringify(ids));}catch(e){}}
  function fdCheckoutProtocol(){var p=_protocoloSessao;try{p=p||sessionStorage.getItem("fdc_protocolo");}catch(e){}if(p)return p;var d=new Date();p="FD-"+d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")+"-"+String(d.getHours()).padStart(2,"0")+String(d.getMinutes()).padStart(2,"0");try{sessionStorage.setItem("fdc_protocolo",p);}catch(e){}return p;}
  function fdCheckoutFontReady(font){if(document.fonts&&document.fonts.load)return document.fonts.load('600 120px "'+font+'"').catch(function(){});return Promise.resolve();}
  function fdCheckoutFonts(){return {"Dancing Script":{base:120,weight:600},"Cormorant Garamond":{base:110,weight:600},"Special Elite":{base:92,weight:400},"Libre Baskerville":{base:88,weight:700},"Montserrat":{base:90,weight:600}};}
  function fdCheckoutSize(text,font,scale,maxWidth,captionRatio){var F=fdCheckoutFonts()[font]||fdCheckoutFonts()["Dancing Script"];if(captionRatio&&captionRatio>0)return Math.max(24,Math.min(maxWidth,captionRatio*maxWidth));var probe=document.createElement("span");probe.style.position="fixed";probe.style.visibility="hidden";probe.style.whiteSpace="nowrap";probe.style.left="-99999px";probe.style.fontFamily='"'+font+'"';probe.style.fontWeight=F.weight;probe.textContent=text;document.body.appendChild(probe);var size=F.base*(scale||.75);while(size>24){probe.style.fontSize=size+"px";if(probe.getBoundingClientRect().width<=maxWidth)break;size-=1;}document.body.removeChild(probe);return Math.max(24,size);}
  function fdCheckoutPolaroid(item){return new Promise(async function(resolve,reject){try{var W=1772,H=2362,c=document.createElement("canvas");c.width=W;c.height=H;var ctx=c.getContext("2d");ctx.fillStyle="#fff";ctx.fillRect(0,0,W,H);var side=116,pw=W-side*2,ph=Math.round(pw*(3.5/3)),px=side,py=116,url=URL.createObjectURL(item.blob),img=new Image();img.onload=async function(){try{var cover=Math.max(pw/img.naturalWidth,ph/img.naturalHeight),dw=img.naturalWidth*cover*(item.scale||1),dh=img.naturalHeight*cover*(item.scale||1),dx=W/2+(item.xNorm||0)*pw-dw/2,dy=py+ph/2+(item.yNorm||0)*ph-dh/2;ctx.save();ctx.beginPath();ctx.rect(px,py,pw,ph);ctx.clip();ctx.drawImage(img,dx,dy,dw,dh);ctx.restore();if(item.ins&&item.text&&item.text.trim()){await fdCheckoutFontReady(item.font);var F=fdCheckoutFonts(),size=fdCheckoutSize(item.text.trim(),item.font,item.fontScale||.75,W-220,item.captionRatio||0);ctx.fillStyle="#222";ctx.textAlign="center";ctx.textBaseline="middle";ctx.font=(F[item.font]||F["Dancing Script"]).weight+" "+size+'px "'+item.font+'"';var top=py+ph;ctx.fillText(item.text.trim(),W/2,top+(H-top)/2);}URL.revokeObjectURL(url);c.toBlob(function(blob){blob?resolve(blob):reject(new Error("Falha ao gerar a Polaroid."));},"image/png");}catch(e){URL.revokeObjectURL(url);reject(e);}};img.onerror=function(){URL.revokeObjectURL(url);reject(new Error("Falha ao carregar a foto."));};img.src=url;}catch(e){reject(e);}});}
  function fdCheckoutUpload(item,blob,index,total,btn){
    var fd=new FormData(),protocol=fdCheckoutProtocol();
    var safe=(item.produto||"produto").normalize?String(item.produto||"produto").normalize("NFD").replace(/[\u0300-\u036f]/g,""):String(item.produto||"produto");
    safe=safe.replace(/[^a-z0-9]+/gi,"-").replace(/^-+|-+$/g,"").toLowerCase();

    // Context mínimo e seguro para o primeiro teste:
    // o protocolo é a chave de ligação com o pedido.
    // O produto/unidade/foto já ficam também no nome do arquivo.
    var context="protocolo="+String(protocol).replace(/[|=\\\r\n]/g,"-");

    fd.append("file",blob,"fd-"+protocol+"-"+safe+"-u"+item.unidade+"-f"+item.foto+"."+(item.tipo==="polaroid"?"png":"jpg"));
    fd.append("upload_preset",FD_FOTO_PRESET);
    fd.append("context",context);
    if(btn)btn.textContent="Enviando fotos ("+index+"/"+total+")…";
    return fetch("https://api.cloudinary.com/v1_1/"+FD_FOTO_CLOUD+"/image/upload",{method:"POST",body:fd}).then(function(r){
      return r.text().then(function(raw){
        var data={};try{data=JSON.parse(raw);}catch(e){}
        if(!r.ok)throw new Error((data&&data.error&&data.error.message)||raw||("HTTP "+r.status));
        return data;
      });
    });
  }
  function fdNormalizarNomeProduto(nome){
    var s=String(nome||"").toLowerCase().replace(/\u00a0/g," ");
    try{ s=s.normalize("NFD").replace(/[\u0300-\u036f]/g,""); }catch(e){}
    s=s.replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();
    return s;
  }

  function fdFotoNomeCompativel(a,b){
    var x=fdNormalizarNomeProduto(a),y=fdNormalizarNomeProduto(b);
    if(!x||!y)return false;
    return x===y || x.indexOf(y)!==-1 || y.indexOf(x)!==-1;
  }
  function fdNumeroNomeProduto(nome){
    var t=(nome||"").toLowerCase();

    // 1) "2 Fotos", "4 Polaroids", etc.
    var m=t.match(/\b(\d+)\s*(?:fotos?|polaroids?)\b/i);
    if(m)return parseInt(m[1],10)||1;

    // 2) "2 Unidades", "2 un.", "2 unid." mesmo quando NÃO estão entre parênteses.
    m=t.match(/(?:^|\s|[-–—(])\s*(\d+)\s*(?:un|unid|unidades?)\.?(?:\s|$|[)])/i);
    if(m)return parseInt(m[1],10)||1;

    // 3) Números por extenso antes de foto/polaroid.
    var words={uma:1,um:1,duas:2,dois:2,tres:3,três:3,quatro:4,cinco:5,seis:6,sete:7,oito:8,nove:9,dez:10};
    for(var k in words){
      if(new RegExp("\\b"+k+"\\s*(?:fotos?|polaroids?)\\b","i").test(t))return words[k];
    }

    // 4) Formato "(2 unidades)".
    m=t.match(/\((\d+)\s*(?:un|unid|unidades?)\.?\)/i);
    if(m)return parseInt(m[1],10)||1;

    return 1;
  }
  async function fdCheckoutSelecionarItensDoCarrinho(items){
    var cart=fdLerCarrinho();
    var produtos=cart&&cart.produtos?cart.produtos:[];
    if(!produtos.length)return [];

    var usados={};
    var selecionados=[];

    // Primeiro identificamos somente os produtos de foto que realmente estão no carrinho.
    var fotoProdutos=produtos.filter(function(p){
      var n=fdNormalizarNomeProduto(p.nome);
      return n.indexOf("foto")!==-1;
    });

    fotoProdutos.forEach(function(p){
      var nomeCart=fdNormalizarNomeProduto(p.nome);
      var qtdProduto=Math.max(1,parseInt(p.qtd||1,10));

      var tipoEsperado=nomeCart.indexOf("polaroid")!==-1 ? "polaroid" : "foto10x15";
      var candidatos=items.filter(function(item){
        if(usados[item.id] || item.tipo!==tipoEsperado)return false;
        var nomeItem=fdNormalizarNomeProduto(item.produto);

        // Para o primeiro teste, se existir apenas UM produto daquele tipo
        // no carrinho, usamos todos os registros daquele tipo do grupo atual.
        // Isso evita depender de pequenas diferenças no nome exibido pela Loja Integrada.
        var mesmaFamilia=(
          fotoProdutos.filter(function(fp){
            return fdNormalizarNomeProduto(fp.nome).indexOf(tipoEsperado==="polaroid"?"polaroid":"foto")!==-1 &&
                   (tipoEsperado!=="polaroid" || fdNormalizarNomeProduto(fp.nome).indexOf("polaroid")!==-1);
          }).length===1
        );

        return mesmaFamilia || fdFotoNomeCompativel(nomeItem,nomeCart);
      }).sort(function(a,b){return (b.createdAt||0)-(a.createdAt||0);});

      if(!candidatos.length)return;

      var fotosPorUnidade=tipoEsperado==="polaroid" ? Math.max(1,fdNumeroNomeProduto(p.nome)) : 1;
      var precisa=fotosPorUnidade*qtdProduto;
      console.log("[FD FOTO] produto:",p.nome,"→ fotos/unidade:",fotosPorUnidade,"qtd:",qtdProduto,"→ esperado:",precisa);

      candidatos.slice(0,precisa).forEach(function(item){
        usados[item.id]=true;
        selecionados.push(item);
      });
    });

    return selecionados;
  }

  async function enviarFotosAntesDoPagamento(){
    var ids=fdCheckoutIds();if(!ids.length)return true;
    var all=await fdCheckoutGet(ids);all=all.filter(function(x){return x&&(!x.ttl||x.ttl>=Date.now());});if(!all.length)return true;
    var grupoAtual=null;try{grupoAtual=sessionStorage.getItem("fd_fotos_grupo_atual");}catch(e){}
    if(grupoAtual)all=all.filter(function(x){return (x.id||"").indexOf(grupoAtual+"-")===0;});
    if(!all.length)return true;
    var items=await fdCheckoutSelecionarItensDoCarrinho(all);
    console.log("[FD FOTO] pendentes:", all.map(function(x){return {id:x.id,produto:x.produto,tipo:x.tipo,unidade:x.unidade,foto:x.foto};}));
    console.log("[FD FOTO] selecionados para o carrinho:", items.map(function(x){return {id:x.id,produto:x.produto,tipo:x.tipo,unidade:x.unidade,foto:x.foto};}));
    if(!items.length){
      // Não há personalizações compatíveis com os produtos atuais do carrinho.
      // Limpa apenas referências antigas/órfãs da sessão para não tentar enviá-las.
      fdCheckoutSetIds([]);
      return true;
    }
    var btn=document.getElementById("fdc-conf-btn"),protocolo=fdCheckoutProtocol();
    try{
      for(var i=0;i<items.length;i++){
        var item=items[i];
        if(item.ttl&&item.ttl<Date.now())continue;
        var blob=item.tipo==="polaroid"?await fdCheckoutPolaroid(item):item.blob;
        await fdCheckoutUpload(item,blob,i+1,items.length,btn);
        await fdCheckoutDel(item.id);
        ids=ids.filter(function(x){return x!==item.id;});
        fdCheckoutSetIds(ids);
      }
      if(btn)btn.textContent="Continuando para o pagamento…";
      console.log("[FD FOTO] uploads concluídos para",protocolo,items.length);
      return true;
    }catch(e){
      if(btn)btn.textContent="Tentar novamente";
      console.error("[FD FOTO] erro no upload:",e); console.error("[FD FOTO] item que falhou:",item);
      alert("Não conseguimos concluir o envio das fotos. Verifique sua conexão e tente novamente.\n\nErro técnico: "+(e&&e.message?e.message:"erro desconhecido"));
      return false;
    }
  }

  function mostrarModalConfirmacao(href){
    var bloco=document.getElementById("fdc-conf-bloco");
    // Reusa o protocolo da sessão (se existir), senão gera um novo
    var protocolo=getProtocoloSessao();
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

    // Pick decorativa (só aparece se carrinho tem produto elegível)
    if(carrinhoTemPick()){
      var pickTxtModal=pickSel?(pickSel.codigo+" — "+pickSel.frase):"Nenhuma escolhida";
      html+='<div class="fdc-conf-item">'+
        '<div class="fdc-conf-icon">🎀</div>'+
        '<div style="flex:1">'+
          '<div class="fdc-conf-label">Pick decorativa</div>'+
          '<div class="fdc-conf-valor">'+pickTxtModal+'</div>'+
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
    btn.textContent="Finalizar compra →";
    btn.onclick=async function(){
      btn.disabled=true;
      btn.textContent="Preparando seu pedido...";
      var okFotos=await enviarFotosAntesDoPagamento();
      if(!okFotos){btn.disabled=false;return;}
      finalizarPedidoTracking(); // marca no Google Sheets
      enviarEmail(function(){window.location.href=href;});
    };

    document.getElementById("fdc-popup-conf-overlay").classList.add("ativo");
  }

  function init(){
    injetarCSS();
    var bloco=montarBloco();
    montarPopup();
    montarModal();
    montarModalPick();

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

    // Mostra a seção de pick se algum produto do carrinho for elegível
    if(carrinhoTemPick()){
      var blocoPick=document.getElementById("fdc-bloco-pick");
      if(blocoPick)blocoPick.style.display="block";
    }
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
