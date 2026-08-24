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
      ".fdc-bloco{background:transparent;border:0;padding:0;margin:18px 0;font-family:inherit;box-shadow:none}",
      ".fdc-v10-head{background:#fff;border:1px solid #e6e2df;border-radius:14px;padding:16px;margin-bottom:11px}",
      ".fdc-v10-head h2{margin:0;color:#a91537;font-size:20px;line-height:1.25}.fdc-v10-head p{margin:5px 0 0;color:#777;font-size:11px;line-height:1.45}",
      ".fdc-v10-progress{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-top:13px}.fdc-v10-step{padding:7px 5px;border:1px solid #e6e2df;background:#fafafa;border-radius:8px;color:#8b8b8b;font-size:9px;display:flex;align-items:center;gap:5px}.fdc-v10-num{width:21px;height:21px;border-radius:50%;background:#e8e6e4;display:flex;align-items:center;justify-content:center;font-weight:800;flex:none}.fdc-v10-step.active{border-color:#deb9c5;background:#fff6f8;color:#a91537}.fdc-v10-step.active .fdc-v10-num{background:#a91537;color:#fff}.fdc-v10-step.done{border-color:#d2e7d8;background:#f4faf6;color:#39744f}.fdc-v10-step.done .fdc-v10-num{background:#3d875a;color:#fff}",
      ".fdc-v10-content{background:#fff;border:1px solid #e6e2df;border-radius:14px;padding:0 16px 17px}",
      ".fdc-v10-pane{display:none;padding-top:15px}.fdc-v10-pane.active{display:block}.fdc-v10-title{font-size:17px;font-weight:800;margin:0}.fdc-v10-sub{font-size:11px;color:#777;line-height:1.5;margin:5px 0 13px}.fdc-v10-receive{display:grid;grid-template-columns:1fr 1fr;gap:8px}.fdc-v10-receive-btn{background:#fff;border:1.5px solid #d7d2cf;border-radius:10px;padding:13px;text-align:left;cursor:pointer}.fdc-v10-receive-btn strong{display:block;font-size:12px}.fdc-v10-receive-btn span{display:block;font-size:10px;color:#777;margin-top:4px}.fdc-v10-receive-btn.sel{border-color:#3d875a;background:#edf7f0;box-shadow:0 0 0 2px #3d875a12}",
      ".fdc-v10-cep{margin-top:11px;border:1px solid #ddd8d5;border-radius:9px;padding:12px;background:#fff}.fdc-v10-cep-title{font-size:12px;font-weight:800}.fdc-v10-cep-highlight{font-size:11px;color:#a91537;font-weight:800;margin:3px 0 9px}.fdc-v10-cep-row{display:flex;gap:8px}.fdc-v10-cep-row input{flex:1;min-width:0;border:1.5px solid #d1ccca;border-radius:8px;padding:10px;font-size:14px}.fdc-v10-cep-btn{border:0;border-radius:8px;background:#a91537;color:#fff;padding:10px 14px;font-size:11px;font-weight:800;cursor:pointer}.fdc-v10-cep-msg{display:none;margin-top:8px;padding:8px 9px;border-radius:7px;font-size:10.5px;line-height:1.45}.fdc-v10-cep-msg.ok{display:block;background:#edf7f0;border:1px solid #9fd0ac;color:#2f6c43}.fdc-v10-cep-msg.bad{display:block;background:#fdeaea;border:1px solid #e8a1a1;color:#9d2d2d}",
      ".fdc-v10-nav{display:flex;justify-content:space-between;gap:8px;margin-top:14px}.fdc-v10-nav button{border-radius:8px;padding:10px 15px;font-size:11px;font-weight:800;cursor:pointer}.fdc-v10-back{background:#fff;border:1px solid #a91537;color:#a91537}.fdc-v10-next{background:#a91537;border:1px solid #a91537;color:#fff}.fdc-v10-next:disabled{background:#d0d0d0;border-color:#d0d0d0;cursor:not-allowed}",
      ".fdc-v10-calendar{border:1px solid #e0dcda;border-radius:10px;padding:11px}.fdc-v10-cal-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:9px}.fdc-v10-cal-head strong{font-size:13px}.fdc-v10-cal-nav{width:29px;height:29px;border:1px solid #ddd;background:#fff;border-radius:7px;cursor:pointer}.fdc-v10-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.fdc-v10-cal-dow{font-size:9px;color:#999;text-align:center;padding:3px}.fdc-v10-day{font-size:10px;text-align:center;padding:8px 1px;border-radius:8px;border:1px solid #e7a1a1;background:#fdeaea;color:#a72d2d;font-weight:700;width:100%}.fdc-v10-day.disp{background:#edf7f0;color:#23663a;border-color:#9fd0ac;cursor:pointer;font-weight:800}.fdc-v10-day.sel{background:#a91537;color:#fff;border-color:#a91537}.fdc-v10-day.empty{visibility:hidden;border:0;background:transparent}.fdc-v10-legend{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;font-size:9px;color:#777}.fdc-v10-lg{display:flex;align-items:center;gap:4px}.fdc-v10-sw{width:10px;height:10px;border-radius:3px}.fdc-v10-sw.g{background:#edf7f0;border:1px solid #9fd0ac}.fdc-v10-sw.r{background:#fdeaea;border:1px solid #e7a1a1}.fdc-v10-sw.w{background:#a91537}",
      ".fdc-v10-datehint{margin-top:9px;background:#fafafa;border:1px solid #ece9e7;padding:9px;border-radius:8px;font-size:10.5px;color:#666;line-height:1.45}.fdc-v10-times-title{font-size:11.5px;font-weight:900;margin:11px 0 7px}.fdc-v10-times{display:grid;gap:7px}.fdc-v10-time{display:flex;align-items:center;gap:9px;border:1.5px solid #9fd0ac;background:#edf7f0;color:#2e6b42;border-radius:9px;padding:10px;cursor:pointer}.fdc-v10-time.sel{border-color:#a91537;background:#fff3f6;color:#a91537}.fdc-v10-time.bloq{border-color:#e7a1a1;background:#fdeaea;color:#9d2d2d;cursor:default}.fdc-v10-mark{width:19px;height:19px;border-radius:50%;border:2px solid #67a877;background:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;flex:none}.fdc-v10-time.bloq .fdc-v10-mark{border:0;background:#b53333;color:#fff}.fdc-v10-time b{display:block;font-size:11.5px}.fdc-v10-time small{display:block;color:#777;font-size:9.5px;margin-top:2px}.fdc-v10-time.sel .fdc-v10-mark{border-color:#a91537;color:#a91537}",
      ".fdc-v10-person-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.fdc-v10-field-label{font-size:11px;font-weight:800;margin-bottom:4px}.fdc-v10-field{width:100%;border:1.5px solid #d1ccca;border-radius:8px;padding:10px;font-size:13px}.fdc-v10-helper{font-size:10px;color:#777;line-height:1.45;margin-top:6px}.fdc-v10-person-card{background:#fafafa;border:1px solid #e9e6e4;border-radius:9px;padding:10px;margin-bottom:8px}",
      ".fdc-v10-person-title{font-size:12px;font-weight:800;margin-bottom:8px}",
      ".fdc-v10-person-btn{width:100%;background:#fff;border:1px solid #a91537;color:#a91537;border-radius:8px;padding:9px;font-size:10.5px;font-weight:800;cursor:pointer}",
      ".fdc-v10-msg textarea{width:100%;min-height:86px;border:1.5px solid #d1ccca;border-radius:8px;padding:10px;font-family:inherit;font-size:13px;resize:vertical}.fdc-v10-msg-foot{display:flex;justify-content:space-between;margin-top:5px;font-size:9.5px;color:#888}",
      ".fdc-v10-terms{background:#3a3a3a;border-radius:9px;padding:12px}.fdc-v10-terms.aceito{background:#72cd41}.fdc-v10-terms ul{list-style:none;padding:0;margin:0 0 9px;max-height:170px;overflow-y:auto}.fdc-v10-terms li{font-size:10.5px;color:#fff;line-height:1.5;padding:4px 0 4px 16px;position:relative}.fdc-v10-terms li:before{content:'•';position:absolute;left:0;color:#bbb}.fdc-v10-check{display:flex;align-items:center;gap:6px;color:#fff;font-size:10.5px;font-weight:700;cursor:pointer}.fdc-v10-check input{accent-color:#fff}",
      ".fdc-v10-review{border:1px solid #e4e0de;border-radius:9px;padding:10px}.fdc-v10-review-row{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid #eee;font-size:10.5px}.fdc-v10-review-row:last-child{border-bottom:0}.fdc-v10-review-row span{color:#777}.fdc-v10-review-row strong{text-align:right}.fdc-v10-secure{margin-top:10px;background:#edf7f0;border:1px solid #9fd0ac;border-radius:8px;padding:10px;font-size:10px;color:#2d6841;line-height:1.45}",
      ".fdc-v10-summary-photo{margin-top:8px;background:#faf8f7;border:1px solid #ebe7e5;border-radius:8px;padding:9px;font-size:10px;color:#666}",
      ".fdc-v10-status{margin-top:10px;border:1px solid #e4e0de;background:#fafafa;border-radius:8px;padding:9px}.fdc-v10-status-title{font-size:10.5px;font-weight:800;color:#555;margin-bottom:6px}",
      ".fdc-status-items{display:flex;flex-wrap:wrap;gap:5px}.fdc-st{font-size:9px;padding:3px 7px;border-radius:16px;background:#eee;color:#999}.fdc-st.ok{background:#e8f5f0;color:#0a5c3a}",
      ".fdc-box-ok{display:none;margin-top:10px;background:#72cd41;border-radius:8px;padding:11px}.fdc-box-ok-inner{display:flex;gap:9px}.fdc-box-ok-icon{font-size:18px}.fdc-box-ok-txt strong{font-size:12px;color:#fff}.fdc-box-ok-txt p{font-size:10px;line-height:1.4;color:#fff;margin:3px 0 0}",
      ".fdc-popup-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.52);z-index:999999;align-items:center;justify-content:center;padding:12px}.fdc-popup-overlay.ativo{display:flex}.fdc-popup{background:#fff;border-radius:13px;padding:24px 20px;width:90%;max-width:430px;text-align:center}.fdc-popup h3{font-size:16px;margin:0 0 7px}.fdc-popup p{font-size:12px;line-height:1.5;color:#666}.fdc-popup-btn{background:#a91537;color:#fff;border:0;padding:10px 20px;border-radius:8px;font-size:12px;font-weight:800;cursor:pointer}.fdc-popup-btn-sec{background:#5a8966}.fdc-popup-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.fdc-popup-close{position:absolute;right:12px;top:12px;width:30px;height:30px;border:0;background:#f2f2f2;border-radius:50%;font-size:18px;cursor:pointer}.fdc-popup-conf{position:relative;max-width:460px;text-align:left}.fdc-popup-conf h3{text-align:center}.fdc-conf-bloco{background:#fff5e1;border:1px solid #f5e0b8;border-radius:8px;padding:12px;margin-bottom:12px}.fdc-conf-aviso{background:#f1efe8;border-left:3px solid #95a37b;border-radius:6px;padding:10px 11px;font-size:11px;line-height:1.5;color:#444}",
      /* Keep hidden legacy modal styling/DOM safe. */
      ".fdc-overlay{display:none!important}.fdc-v10-hidden{display:none!important}",
      "@media(max-width:700px){.fdc-v10-progress{grid-template-columns:repeat(3,1fr)}.fdc-v10-content{padding:0 12px 15px}}",
      "@media(max-width:520px){.fdc-v10-head{padding:14px 12px}.fdc-v10-head h2{font-size:18px}.fdc-v10-receive,.fdc-v10-person-grid{grid-template-columns:1fr}.fdc-v10-progress{grid-template-columns:repeat(2,1fr)}.fdc-v10-pane{padding-top:13px}.fdc-v10-cep-row{flex-direction:column}.fdc-v10-cep-btn{width:100%}.fdc-v10-nav{position:sticky;bottom:6px;background:#fff;padding-top:7px;z-index:4}.fdc-v10-day{padding:8px 1px;font-size:9.5px}}"
    ].join("");
    var s=document.createElement("style");s.id="fdc-v10-css";s.innerHTML=css;document.head.appendChild(s);
  }

  function montarBloco(){
    var div=document.createElement("div");
    div.id="fdc-bloco";div.className="fdc-bloco";
    var termoItens=TERMOS.entrega.map(function(t){return '<li>'+t+'</li>';}).join("");

    div.innerHTML=[
      '<div class="fdc-v10-head">',
        '<h2>Seu pedido está quase pronto! 🌷</h2>',
        '<p>Vamos confirmar tudo em algumas etapas rápidas.</p>',
        '<div class="fdc-v10-progress" id="fdc-v10-progress"></div>',
      '</div>',
      '<div class="fdc-v10-content">',

        '<section class="fdc-v10-pane active" id="fdc-v10-s1">',
          '<h3 class="fdc-v10-title">1. Como deseja receber seu pedido?</h3>',
          '<p class="fdc-v10-sub">Primeiro escolha entrega ou retirada. Para entrega, o CEP será validado imediatamente.</p>',
          '<div class="fdc-v10-receive">',
            '<button class="fdc-v10-receive-btn sel" id="fdc-btn-ent" onclick="fdcSetTipo(\'entrega\');fdcV10Sync()">🚚 <strong>Entrega</strong><span>Receba no endereço informado.</span></button>',
            '<button class="fdc-v10-receive-btn" id="fdc-btn-ret" onclick="fdcSetTipo(\'retirada\');fdcV10Sync()">🏪 <strong>Retirada na loja</strong><span>Al. Barão de Limeira, 998.</span></button>',
          '</div>',
          '<div id="fdc-bloco-cep" class="fdc-v10-cep">',
            '<div class="fdc-v10-cep-title">CEP de entrega</div>',
            '<div class="fdc-v10-cep-highlight">⚠️ Primeiro, confirme se entregamos no endereço que você precisa.</div>',
            '<div class="fdc-v10-cep-row"><input id="fdc-cep" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="9" placeholder="00000-000" oninput="fdcMascaraCep(this);fdcValidarCep();fdcSalvar()"><button type="button" class="fdc-v10-cep-btn" onclick="fdcValidarCep()">Validar CEP</button></div>',
            '<div id="fdc-cep-status"></div>',
            '<div id="fdc-cep-aviso" class="fdc-v10-cep-msg"></div>',
            '<div id="fdc-cep-parcial" class="fdc-v10-cep-msg"><span>⚠️ <strong>Atenção:</strong> Neste CEP funciona também o <strong id="fdc-cep-parcial-local">—</strong>, local onde infelizmente não realizamos entregas por dificuldade de acesso. Se a entrega for para outro endereço deste CEP, pode seguir normalmente. Se for para o <span id="fdc-cep-parcial-local2">—</span>, o pedido será cancelado.</span><label class="fdc-cep-parcial-check"><input type="checkbox" id="fdc-cep-parcial-check" onchange="fdcToggleCienteParcial()"> Estou ciente</label></div>',
          '</div>',
          '<div id="fdc-v10-pickup-note" class="fdc-v10-summary-photo" style="display:none">Você escolheu retirada na loja. O CEP de entrega não é necessário.</div>',
          '<div class="fdc-v10-nav"><span></span><button type="button" class="fdc-v10-next" id="fdc-v10-next1" disabled onclick="fdcV10Go(2)">Continuar →</button></div>',
        '</section>',

        '<section class="fdc-v10-pane" id="fdc-v10-s2">',
          '<h3 class="fdc-v10-title">2. Escolha a melhor data para a entrega do pedido</h3>',
          '<p class="fdc-v10-sub">Não se esqueça de confirmar se haverá alguém disponível para receber o pedido na data e horário escolhidos.</p>',
          '<div class="fdc-v10-calendar">',
            '<div class="fdc-v10-cal-head"><button type="button" class="fdc-v10-cal-nav" onclick="fdcV10MudarMes(-1)">‹</button><strong id="fdc-v10-mes-titulo">—</strong><button type="button" class="fdc-v10-cal-nav" onclick="fdcV10MudarMes(1)">›</button></div>',
            '<div id="fdc-v10-cal-grid" class="fdc-v10-cal-grid"></div>',
            '<div class="fdc-v10-legend"><span class="fdc-v10-lg"><i class="fdc-v10-sw w"></i>Selecionado</span><span class="fdc-v10-lg"><i class="fdc-v10-sw g"></i>Disponível</span><span class="fdc-v10-lg"><i class="fdc-v10-sw r"></i>Indisponível</span></div>',
          '</div>',
          '<div id="fdc-v10-periodos-wrap" style="display:none"><div id="fdc-v10-per-titulo" class="fdc-v10-times-title">Escolha o horário</div><div id="fdc-v10-periodos" class="fdc-v10-times"></div></div>',
          '<div class="fdc-v10-nav"><button type="button" class="fdc-v10-back" onclick="fdcV10Go(1)">← Voltar</button><button type="button" class="fdc-v10-next" id="fdc-v10-next2" disabled onclick="fdcV10Go(3)">Continuar →</button></div>',
        '</section>',

        '<section class="fdc-v10-pane" id="fdc-v10-s3">',
          '<h3 class="fdc-v10-title">3. Quem vai receber?</h3>',
          '<p class="fdc-v10-sub">Preencha os dados da pessoa que receberá o pedido.</p>',
          '<div id="fdc-bloco-pres">',
            '<div class="fdc-v10-person-grid">',
              '<div><div class="fdc-v10-field-label">Nome completo</div><div class="fdc-campo" style="margin:0"><input type="text" id="fdc-nome" placeholder="Ex.: Maria da Silva" maxlength="80" oninput="fdcSalvar();fdcVerificar()"></div></div>',
              '<div><div class="fdc-v10-field-label">WhatsApp</div><div class="fdc-campo" style="margin:0"><input type="tel" id="fdc-tel" placeholder="(11) 98765-4321" maxlength="15" oninput="fdcMascaraTel(this);fdcSalvar();fdcVerificar()"></div></div>',
            '</div>',
            '<div class="fdc-v10-helper">Só entramos em contato se não conseguirmos falar com o comprador antes.</div>',
          '</div>',
          '<div class="fdc-v10-nav"><button type="button" class="fdc-v10-back" onclick="fdcV10Go(2)">← Voltar</button><button type="button" class="fdc-v10-next" id="fdc-v10-next3" onclick="fdcV10Go(4)">Continuar →</button></div>',
        '</section>',

        '<section class="fdc-v10-pane" id="fdc-v10-s4">',
          '<h3 class="fdc-v10-title">4. Personalização</h3>',
          '<p class="fdc-v10-sub">Confira as personalizações do seu pedido. As fotos personalizadas já foram preparadas na página do produto.</p>',
          '<div id="fdc-bloco-pick" class="fdc-v10-person-card" style="display:none">',
            '<div class="fdc-v10-person-title">🎀 Pick decorativa</div>',
            '<button class="fdc-v10-person-btn" id="fdc-btn-pick" onclick="fdcAbrirModalPick()">Brinde: escolha sua pick decorativa</button>',
            '<div id="fdc-resumo-pick" style="display:none" class="fdc-v10-summary-photo"><b>Pick escolhida:</b> <span id="fdc-res-pick-cod">—</span> — <span id="fdc-res-pick-frase"></span><br><button type="button" class="fdc-btn-alt" onclick="fdcAlterarPick()">Alterar pick</button></div>',
          '</div>',
          '<div class="fdc-v10-person-card">',
            '<div class="fdc-v10-person-title">📸 Fotos personalizadas</div>',
            '<div class="fdc-v10-helper">As fotos enviadas e os ajustes feitos no produto serão vinculados a este pedido e enviados ao Cloudinary somente na finalização.</div>',
          '</div>',
          '<div class="fdc-v10-person-card fdc-v10-msg">',
            '<div class="fdc-v10-person-title">💌 Mensagem do cartão</div>',
            '<div class="fdc-campo" style="margin:0"><textarea id="fdc-msg" maxlength="500" placeholder="Digite aqui sua mensagem de coração... não se esqueça de assinar a msg =)" oninput="fdcSalvar();fdcV10Sync()"></textarea></div>',
            '<div class="fdc-v10-msg-foot"><label><input type="checkbox" id="fdc-sem-msg" onchange="fdcToggleSemMsg();fdcV10Sync()"> Sem mensagem de cartão</label><span><span id="fdc-faltam">500</span> caracteres restantes</span></div>',
          '</div>',
          '<div class="fdc-v10-nav"><button type="button" class="fdc-v10-back" onclick="fdcV10Go(3)">← Voltar</button><button type="button" class="fdc-v10-next" onclick="fdcV10Go(5)">Continuar →</button></div>',
        '</section>',

        '<section class="fdc-v10-pane" id="fdc-v10-s5">',
          '<h3 class="fdc-v10-title">5. Termos e confirmações</h3>',
          '<p class="fdc-v10-sub">Leia os termos e confirme que está de acordo para continuar.</p>',
          '<div id="fdc-termo-wrap" class="fdc-v10-terms">',
            '<ul id="fdc-termo-lista">'+termoItens+'</ul>',
            '<label class="fdc-v10-check"><input type="checkbox" id="fdc-termo" onchange="fdcToggleTermo()"> Estou ciente dos termos</label>',
          '</div>',
          '<div class="fdc-v10-nav"><button type="button" class="fdc-v10-back" onclick="fdcV10Go(4)">← Voltar</button><button type="button" class="fdc-v10-next" id="fdc-v10-next5" disabled onclick="fdcV10Go(6)">Continuar →</button></div>',
        '</section>',

        '<section class="fdc-v10-pane" id="fdc-v10-s6">',
          '<h3 class="fdc-v10-title">6. Revise seu pedido</h3>',
          '<p class="fdc-v10-sub">Confira tudo antes de finalizar. Você poderá voltar e fazer qualquer ajuste.</p>',
          '<div class="fdc-v10-review">',
            '<div class="fdc-v10-review-row"><span>Recebimento</span><strong id="fdc-v10-r-receb">Entrega</strong></div>',
            '<div class="fdc-v10-review-row"><span>CEP</span><strong id="fdc-v10-r-cep">—</strong></div>',
            '<div class="fdc-v10-review-row"><span>Data e horário</span><strong id="fdc-v10-r-ag">—</strong></div>',
            '<div class="fdc-v10-review-row"><span>Destinatário</span><strong id="fdc-v10-r-nome">—</strong></div>',
            '<div class="fdc-v10-review-row"><span>WhatsApp</span><strong id="fdc-v10-r-tel">—</strong></div>',
            '<div class="fdc-v10-review-row"><span>Personalização</span><strong>Mensagem + fotos + pick, quando aplicável</strong></div>',
          '</div>',
          '<div class="fdc-v10-secure">🔒 <b>Dados registrados com seu protocolo.</b><br>As informações de entrega e personalização ficam vinculadas ao seu pedido.</div>',
          '<div class="fdc-v10-status"><div class="fdc-v10-status-title">Checklist</div><div class="fdc-status-items"><div class="fdc-st" id="fdc-st-cep">CEP</div><div class="fdc-st" id="fdc-st-ag">Agendamento</div><div class="fdc-st" id="fdc-st-nome">Nome</div><div class="fdc-st" id="fdc-st-tel">Telefone</div><div class="fdc-st" id="fdc-st-termo">Termos</div></div></div>',
          '<div id="fdc-box-ok" class="fdc-box-ok"><div class="fdc-box-ok-inner"><div class="fdc-box-ok-icon">✅</div><div class="fdc-box-ok-txt"><strong>Tudo certo!</strong><p>Agora finalize e siga para o pagamento.</p></div></div></div>',
          '<button type="button" class="fdc-v10-next" style="width:100%;margin-top:12px;padding:13px" onclick="fdcV10Finalizar()">✓ FINALIZAR COMPRA</button>',
          '<div class="fdc-v10-nav"><button type="button" class="fdc-v10-back" onclick="fdcV10Go(5)">← Voltar e editar</button><span></span></div>',
        '</section>',

      '</div>',
      /* hidden legacy elements still referenced by session/old functions */
      '<div class="fdc-v10-hidden"><button id="fdc-btn-ag"></button><div id="fdc-resumo-ag"><span id="fdc-res-data"></span><span id="fdc-res-diasem"></span><span id="fdc-res-per"></span><span id="fdc-res-hora"></span></div><button id="fdc-btn-conf"></button><div id="fdc-mes-titulo"></div><div id="fdc-cal-grid"></div><div id="fdc-periodos"></div><div id="fdc-per-titulo"></div><span id="fdc-m-data"></span><span id="fdc-m-diasem"></span><span id="fdc-m-per"></span><span id="fdc-m-hora"></span></div>'
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
      '<div class="fdc-popup fdc-popup-conf" style="position:relative">',
        '<button type="button" class="fdc-popup-close" aria-label="Fechar" onclick="fdcFecharConfirmacao()">×</button>',
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

  function fdcV10RefreshReview(){
    var el=function(id){return document.getElementById(id);};
    var p=dataSel&&periodoSel?getPeriodosParaDow(dataSel.getDay(),dataSel).find(function(x){return x.id===periodoSel;}):null;
    if(el("fdc-v10-r-receb"))el("fdc-v10-r-receb").textContent=tipo==="entrega"?"Entrega":"Retirada na loja";
    if(el("fdc-v10-r-cep"))el("fdc-v10-r-cep").textContent=tipo==="entrega"?((el("fdc-cep")||{}).value||"—"):"Não se aplica";
    if(el("fdc-v10-r-ag"))el("fdc-v10-r-ag").textContent=(dataSel&&p)?dataSel.toLocaleDateString("pt-BR")+" · "+p.hora:"—";
    if(el("fdc-v10-r-nome"))el("fdc-v10-r-nome").textContent=((el("fdc-nome")||{}).value||"—");
    if(el("fdc-v10-r-tel"))el("fdc-v10-r-tel").textContent=((el("fdc-tel")||{}).value||"—");
  }

  function fdcV10RenderProgress(){
    var labels=["Recebimento","Data e horário","Destinatário","Personalização","Termos","Revisão"];
    var c=document.getElementById("fdc-v10-progress");if(!c)return;
    c.innerHTML=labels.map(function(label,i){var n=i+1,done=window.fdcV10CurrentStep>n,active=window.fdcV10CurrentStep===n;return '<div class="fdc-v10-step '+(done?"done ":"")+(active?"active":"")+'"><span class="fdc-v10-num">'+(done?"✓":n)+'</span><span>'+label+'</span></div>';}).join("");
  }

  window.fdcV10CurrentStep=1;
  window.fdcV10Go=function(n){
    if(n===2 && !(tipo==="retirada"||cepOk))return;
    if(n===3 && !(agConfirmado&&dataSel&&periodoSel))return;
    if(n===4 && tipo==="entrega"){
      var nome=((document.getElementById("fdc-nome")||{}).value||"").trim();
      var tel=((document.getElementById("fdc-tel")||{}).value||"").trim();
      if(!nome||tel.length<14){fdcVerificar();return;}
    }
    if(n===5){ }
    if(n===6 && !termoAceito){fdcVerificar();return;}
    document.querySelectorAll(".fdc-v10-pane").forEach(function(p){p.classList.remove("active");});
    var pane=document.getElementById("fdc-v10-s"+n);if(!pane)return;
    pane.classList.add("active");window.fdcV10CurrentStep=n;
    fdcV10RenderProgress();fdcV10RefreshReview();fdcV10Sync();
    window.scrollTo({top:document.getElementById("fdc-bloco").getBoundingClientRect().top+window.scrollY-8,behavior:"smooth"});
  };

  window.fdcV10Sync=function(){
    var next1=document.getElementById("fdc-v10-next1"),next2=document.getElementById("fdc-v10-next2"),next3=document.getElementById("fdc-v10-next3"),next5=document.getElementById("fdc-v10-next5");
    if(next1)next1.disabled=!(tipo==="retirada"||cepOk);
    if(next2)next2.disabled=!(dataSel&&periodoSel&&agConfirmado);
    if(next3){
      var nome=((document.getElementById("fdc-nome")||{}).value||"").trim(),tel=((document.getElementById("fdc-tel")||{}).value||"").trim();
      next3.disabled=(tipo==="entrega"&&!nome&&false)?true:false;
    }
    if(next5)next5.disabled=!termoAceito;
    var nCep=document.getElementById("fdc-v10-cep-status");
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
    var box=document.getElementById("fdc-box-ok");if(box)box.style.display=tudoOk?"block":"none";
    fdcV10RefreshReview();fdcV10Sync();
  };

  window.fdcAbrirModal=function(){
    // Mantém o nome da função por compatibilidade, mas o agendamento agora acontece inline.
    fdcV10Go(2);fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();
  };

  window.fdcFecharModal=function(){
    var o=document.getElementById("fdc-overlay");if(o)o.classList.remove("ativo");
  };

  window.fdcFecharPopup=function(){
    document.getElementById("fdc-popup-overlay").classList.remove("ativo");
    document.getElementById("fdc-bloco").scrollIntoView({behavior:"smooth",block:"start"});
  };

  window.fdcMudarMes=function(d){
    mesAtual+=d;
    if(mesAtual<0){mesAtual=11;anoAtual--;}
    if(mesAtual>11){mesAtual=0;anoAtual++;}
    fdcRenderCal();fdcRenderPeriodos();
  };
  window.fdcV10MudarMes=window.fdcMudarMes;

  window.fdcConfirmar=function(){
    if(!dataSel||!periodoSel)return;
    agConfirmado=true;
    var lista=getPeriodosParaDow(dataSel.getDay(),dataSel);
    var p=lista.find(function(x){return x.id===periodoSel;});
    var rd=document.getElementById("fdc-res-data");if(rd)rd.textContent=dataSel.toLocaleDateString("pt-BR");
    var rs=document.getElementById("fdc-res-diasem");if(rs)rs.textContent=DIASLONG[dataSel.getDay()];
    var rp=document.getElementById("fdc-res-per");if(rp)rp.textContent=p?p.nome:"—";
    var rh=document.getElementById("fdc-res-hora");if(rh)rh.textContent=p?p.hora:"";
    salvarSessao();fdcVerificar();
  };

  window.fdcAlterar=function(){
    agConfirmado=false;fdcVerificar();fdcV10Go(2);fdcRenderCal();fdcRenderPeriodos();
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
    var title=document.getElementById("fdc-v10-mes-titulo");
    var grid=document.getElementById("fdc-v10-cal-grid");
    if(!title||!grid)return;
    title.textContent=MESES[mesAtual]+" "+anoAtual;
    grid.innerHTML="";
    DIASABREV.forEach(function(d){var e=document.createElement("div");e.className="fdc-v10-cal-dow";e.textContent=d;grid.appendChild(e);});
    var p=new Date(anoAtual,mesAtual,1).getDay();
    for(var i=0;i<p;i++){var e=document.createElement("button");e.className="fdc-v10-day empty";grid.appendChild(e);}
    var tot=new Date(anoAtual,mesAtual+1,0).getDate();
    var hj=hoje();
    var carrinhoNamorados=carrinhoEhNamorados();
    for(var d=1;d<=tot;d++){
      var dt=new Date(anoAtual,mesAtual,d);
      var b=document.createElement("button");b.type="button";b.textContent=d;
      var isSel=dataSel&&dataSel.getDate()===d&&dataSel.getMonth()===mesAtual&&dataSel.getFullYear()===anoAtual;
      var ehNamorados=isDiaNamorados(dt), namoradosEsgotado=false,namoradosProduto=false,namoradosCep=false;
      if(ehNamorados){
        if(tipo==="entrega"&&!entregaNamoradosDisponivel())namoradosEsgotado=true;
        if(tipo==="retirada"&&!retiradaNamoradosDisponivel())namoradosEsgotado=true;
        if(!namoradosEsgotado&&tipo==="entrega"&&cepOk&&!cepValidoDia12)namoradosCep=true;
        if(!namoradosEsgotado&&!namoradosCep&&!carrinhoNamorados)namoradosProduto=true;
      }
      if(namoradosEsgotado||namoradosCep||namoradosProduto){
        b.className="fdc-v10-day";
        if(namoradosEsgotado)b.title="Data indisponível";
        else if(namoradosCep)b.title="CEP não atendido nesta data";
        else b.title="Produto não disponível nesta data";
      }else if(isSel){
        b.className="fdc-v10-day selected";
      }else if(temDisp(dt)){
        b.className="fdc-v10-day available";
        (function(dt2){b.onclick=function(){
          dataSel=dt2;periodoSel=null;agConfirmado=false;mesAtual=dt2.getMonth();anoAtual=dt2.getFullYear();
          fdcRenderCal();fdcRenderPeriodos();fdcUpdRes();fdcV10Sync();
        };})(new Date(dt));
      }else{
        b.className="fdc-v10-day";
      }
      grid.appendChild(b);
    }
  }

  function fdcRenderPeriodos(){
    var c=document.getElementById("fdc-v10-periodos"),wrap=document.getElementById("fdc-v10-periodos-wrap"),t=document.getElementById("fdc-v10-per-titulo");
    if(!c||!wrap)return;
    c.innerHTML="";
    if(!dataSel){wrap.style.display="none";return;}
    wrap.style.display="block";
    var temDisponibilidade=temDisp(dataSel);
    if(!temDisponibilidade){
      t.textContent="Sem horários disponíveis";
      var ddSel=new Date(dataSel);ddSel.setHours(0,0,0,0);
      var dowSel=ddSel.getDay(),ehHoje=ddSel.getTime()===hoje().getTime(),ehFds=(dowSel===0||dowSel===6);
      var msg=ehHoje?"Não há mais horários disponíveis para hoje. Confira a partir de amanhã.":ehFds?"Não há mais horários disponíveis para esta data. Confira a partir de segunda-feira.":"Não há mais horários disponíveis para esta data. Tente outra data.";
      c.innerHTML='<div class="fdc-v10-summary-photo">ℹ️ '+msg+'</div>';
      return;
    }
    t.textContent="Horários disponíveis para "+dataSel.toLocaleDateString("pt-BR");
    periodosParaDia(dataSel).forEach(function(p){
      var d=document.createElement("button");d.type="button";d.className="fdc-v10-time"+(periodoSel===p.id?" sel":"")+(p.ok?"":" bloq");
      d.innerHTML='<span class="fdc-v10-mark">'+(p.ok?(periodoSel===p.id?"✓":""):"×")+'</span><span><b>'+p.nome+'</b><small>'+p.hora+'</small></span>';
      if(p.ok)d.onclick=function(){
        periodoSel=p.id;agConfirmado=true;
        fdcRenderPeriodos();fdcUpdRes();salvarSessao();fdcVerificar();fdcV10Sync();
      };
      c.appendChild(d);
    });
  }

  function fdcUpdRes(){
    var lista=dataSel?getPeriodosParaDow(dataSel.getDay(),dataSel):[];
    var p=periodoSel?lista.find(function(x){return x.id===periodoSel;}):null;
    var map={
      "fdc-m-data":dataSel?dataSel.toLocaleDateString("pt-BR"):"—",
      "fdc-m-diasem":dataSel?DIASLONG[dataSel.getDay()]:"",
      "fdc-m-per":p?p.nome:"—",
      "fdc-m-hora":p?p.hora:""
    };
    Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)el.textContent=map[id];});
    var btn=document.getElementById("fdc-btn-conf");if(btn)btn.disabled=!(dataSel&&periodoSel);
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

  window.fdcV10Finalizar=function(){
    if(!termoAceito){fdcVerificar();fdcV10Go(5);return;}
    var tudo=(agConfirmado&&termoAceito);
    if(tipo==="entrega"){
      var nome=((document.getElementById("fdc-nome")||{}).value||"").trim();
      var tel=((document.getElementById("fdc-tel")||{}).value||"").trim();
      tudo=tudo&&cepOk&&!!nome&&tel.length>=14;
    }
    if(!tudo){fdcVerificar();return;}
    var href=window.location.href;
    mostrarModalConfirmacao(href);
  };

  window.fdcFecharConfirmacao=function(){
    var o=document.getElementById("fdc-popup-conf-overlay");
    if(o)o.classList.remove("ativo");
    var b=document.getElementById("fdc-conf-btn");
    if(b&&!b.disabled)b.textContent="Continuar para o pagamento →";
  };

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
      btn.textContent="Preparando suas fotos…";
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
    fdcV10RenderProgress();
    fdcV10Sync();
    fdcRenderCal();
    fdcRenderPeriodos();

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
