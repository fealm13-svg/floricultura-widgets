(function(){
'use strict';
var MESES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
var DIAS=['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
var DFULL=['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
var ENT_S=[{id:'m1',name:'Manhã I',time:'09:00–10:30',c:{h:8,m:0}},{id:'m2',name:'Manhã II',time:'10:30–12:00',c:{h:9,m:30}},{id:'t1',name:'Tarde I',time:'13:00–15:00',c:{h:12,m:0}},{id:'t2',name:'Tarde II',time:'15:00–17:00',c:{h:14,m:0}}];
var ENT_F=[{id:'m1',name:'Manhã I',time:'09:00–10:30',c:{h:8,m:0}},{id:'m2',name:'Manhã II',time:'10:30–12:00',c:{h:9,m:30}}];
function gR(i,f){var s=[];for(var h=i;h<f;h++){var a=String(h).padStart(2,'0'),b=String(h+1).padStart(2,'0');s.push({id:'r'+h,name:a+'h00',time:a+':00–'+b+':00',c:{h:h-1,m:0}});}return s;}
var RW=gR(8,19),RF=gR(9,14);
var C={g:'#5de0a0',gh:'#3dcf8a',r:'#f01c5c',v:'#a91537',af:'#fff8e1',ab:'#fcd34d',nf:'#fff5e1',nt:'#a91537',b:'#e8e8e8',tp:'#1a1a1a',ts:'#888'};
var vy,vm,selDate=null,selPer=null,mode='e',isCesta=false,nomeProduto='';
var now=new Date();

function sameDay(a,b){return a.getFullYear()===b.getFullYear()&&a.getMonth()===b.getMonth()&&a.getDate()===b.getDate();}
function isDis(date){
  var today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  var d=new Date(date.getFullYear(),date.getMonth(),date.getDate());
  if(d<today)return true;
  if(isCesta&&sameDay(d,today))return true;
  return false;
}
function getSlots(date){
  var dow=date.getDay(),fds=dow===0||dow===6;
  if(mode==='r')return fds?RF:RW;
  return fds?ENT_F:ENT_S;
}
function styleToggle(){
  var on='flex:1;padding:7px 8px;font-size:12px;border:none;cursor:pointer;background:'+C.nf+';color:'+C.v+';font-weight:500';
  var off='flex:1;padding:7px 8px;font-size:12px;border:none;cursor:pointer;background:none;color:#888;font-weight:400';
  document.getElementById('fd-be').style.cssText=mode==='e'?on:off;
  document.getElementById('fd-br').style.cssText=mode==='r'?on:off;
}
window.fdSetMode=function(m){
  mode=m;selPer=null;
  styleToggle();
  document.getElementById('fd-ptitle').textContent=m==='e'?'Escolha o período de entrega':'Escolha o horário de retirada';
  document.getElementById('fd-cplabel').textContent=m==='e'?'Período escolhido':'Horário de retirada';
  document.getElementById('fd-cperiod').textContent='—';
  var cb=document.getElementById('fd-cbtn');cb.disabled=true;cb.style.opacity='0.4';
  renderPer();
};
function renderCal(){
  var grid=document.getElementById('fd-cgrid');
  grid.innerHTML='';
  document.getElementById('fd-mlabel').textContent=MESES[vm]+' '+vy;
  DIAS.forEach(function(d){
    var el=document.createElement('div');
    el.textContent=d;
    el.style.cssText='font-size:11px;color:'+C.ts+';text-align:center;padding:4px 0;font-weight:500';
    grid.appendChild(el);
  });
  var first=new Date(vy,vm,1).getDay();
  var total=new Date(vy,vm+1,0).getDate();
  for(var i=0;i<first;i++)grid.appendChild(document.createElement('div'));
  for(var d=1;d<=total;d++){
    (function(d){
      var date=new Date(vy,vm,d);
      var dis=isDis(date);
      var sel=selDate&&sameDay(date,selDate);
      var el=document.createElement('button');
      el.textContent=d;
      if(sel){
        el.style.cssText='font-size:13px;padding:7px 2px;border-radius:999px;border:none;width:100%;cursor:pointer;font-weight:600;text-align:center;background:'+C.r+';color:#fff';
      }else if(dis){
        el.style.cssText='font-size:13px;padding:7px 2px;border-radius:999px;border:none;width:100%;cursor:default;font-weight:400;text-align:center;background:transparent;color:#ccc';
        el.disabled=true;
      }else{
        el.style.cssText='font-size:13px;padding:7px 2px;border-radius:999px;border:none;width:100%;cursor:pointer;font-weight:500;text-align:center;background:'+C.g+';color:#0a5c3f';
        el.onmouseenter=function(){el.style.background=C.gh;};
        el.onmouseleave=function(){el.style.background=C.g;};
        el.addEventListener('click',function(){
          selDate=date;selPer=null;
          document.getElementById('fd-cperiod').textContent='—';
          var cb=document.getElementById('fd-cbtn');cb.disabled=true;cb.style.opacity='0.4';
          var ds=date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
          document.getElementById('fd-cdate').textContent=ds;
          var df=DFULL[date.getDay()];
          document.getElementById('fd-cdow').textContent=df.charAt(0).toUpperCase()+df.slice(1);
          renderCal();renderPer();
        });
      }
      grid.appendChild(el);
    })(d);
  }
}
function renderPer(){
  var cont=document.getElementById('fd-periods');
  var notice=document.getElementById('fd-pnotice');
  cont.innerHTML='';notice.innerHTML='';
  if(!selDate){
    cont.innerHTML='<p style="font-size:12px;color:'+C.ts+';margin-top:4px">Selecione uma data no calendário.</p>';
    return;
  }
  var isToday=sameDay(selDate,now);
  var nowMin=now.getHours()*60+now.getMinutes();
  var slots=getSlots(selDate);
  var anyAvail=false;
  slots.forEach(function(p){
    var cutMin=p.c.h*60+p.c.m;
    var dis=isToday&&nowMin>=cutMin;
    if(!dis)anyAvail=true;
    var isSel=selPer===p.id&&!dis;
    var div=document.createElement('div');
    div.style.cssText='display:flex;align-items:center;gap:8px;padding:9px 10px;border:1.5px solid '+(isSel?C.v:C.b)+';border-radius:8px;cursor:'+(dis?'default':'pointer')+';margin-bottom:6px;background:'+(isSel?C.nf:'#fff')+';opacity:'+(dis?'0.35':'1');
    var radio=document.createElement('input');
    radio.type='radio';radio.name='fd-p';radio.disabled=dis;radio.checked=isSel;
    radio.style.accentColor=C.v;
    var label=document.createElement('div');
    label.innerHTML='<div style="font-size:12px;font-weight:500;color:'+C.tp+'">'+p.name+'</div><div style="font-size:10px;color:'+C.ts+'">'+p.time+'</div>';
    div.appendChild(radio);div.appendChild(label);
    if(!dis){
      (function(p){
        div.addEventListener('click',function(){
          selPer=p.id;
          document.getElementById('fd-cperiod').textContent=p.name+' ('+p.time+')';
          var cb=document.getElementById('fd-cbtn');cb.disabled=false;cb.style.opacity='1';
          renderPer();
        });
      })(p);
    }
    cont.appendChild(div);
  });
  if(mode==='r'){
    var dow=selDate.getDay();
    var hor=(dow===6||dow===0)?'09h às 14h':'08h às 19h';
    var info=document.createElement('div');
    info.style.cssText='font-size:11px;color:#555;line-height:1.6;padding:8px 10px;background:#f5f5f5;border-radius:8px;margin-top:4px';
    info.innerHTML='Al. Barão de Limeira, 998 – Campos Elíseos<br>Funcionamento: '+hor;
    cont.appendChild(info);
  }
  var msgs=[];
  if(!anyAvail)msgs.push('Não há horários disponíveis. Selecione outro dia.');
  if((selDate.getDay()===0||selDate.getDay()===6)&&mode==='e')msgs.push('Fins de semana: entregamos apenas pela manhã.');
  if(msgs.length)notice.innerHTML='<div style="background:'+C.nf+';border-left:3px solid '+C.v+';border-radius:6px;padding:8px 10px;font-size:11px;color:'+C.nt+';line-height:1.5;margin-top:4px">'+msgs.join('<br>')+'</div>';
}

// Preenche o campo de observações no checkout com os dados do agendamento
function preencherObservacaoCheckout(texto){
  try{sessionStorage.setItem('fd_agendamento',texto);}catch(e){}
  // Tenta preencher imediatamente se já estiver no checkout
  var obs=document.querySelector('textarea[name="observacoes"], textarea[name="observation"], #observacoes, #observation, textarea.observacoes');
  if(obs){obs.value=texto;obs.dispatchEvent(new Event('change'));}
  // Observer para preencher quando o checkout carregar
  var mo=new MutationObserver(function(){
    var obs2=document.querySelector('textarea[name="observacoes"], textarea[name="observation"], #observacoes, #observation, textarea.observacoes');
    if(obs2&&!obs2.value){obs2.value=texto;obs2.dispatchEvent(new Event('change'));}
  });
  mo.observe(document.body,{childList:true,subtree:true});
}

window.fdConfirmar=function(){
  if(!selDate||!selPer)return;
  var p=getSlots(selDate).find(function(x){return x.id===selPer;});
  var ds=selDate.getDate()+'/'+(selDate.getMonth()+1)+'/'+selDate.getFullYear();
  var dow=DFULL[selDate.getDay()];
  var tipo=mode==='e'?'Entrega':'Retirada na loja';
  var texto='[Agendamento] '+tipo+': '+ds+' ('+dow+') | Período: '+p.name+' ('+p.time+') | Produto: '+nomeProduto;
  preencherObservacaoCheckout(texto);
  fecharModal();
  // Continua o fluxo normal de compra
  var btn=document.querySelector('a.botao-comprar');
  if(btn)btn.click();
};

function fecharModal(){document.getElementById('fd-overlay').style.display='none';}

function abrirModal(){
  now=new Date();
  vy=now.getFullYear();vm=now.getMonth();
  selDate=null;selPer=null;mode='e';
  var titulo=document.querySelector('h1.produto-nome, .produto-nome h1, h1[itemprop="name"], .nome-produto');
  nomeProduto=titulo?titulo.textContent.trim():'Produto';
  isCesta=nomeProduto.toLowerCase().indexOf('cesta')!==-1;
  document.getElementById('fd-overlay').style.display='flex';
  document.getElementById('fd-badge').style.display=isCesta?'inline-flex':'none';
  document.getElementById('fd-notice-cesta').style.display=isCesta?'block':'none';
  document.getElementById('fd-cdate').textContent='—';
  document.getElementById('fd-cdow').textContent='';
  document.getElementById('fd-cperiod').textContent='—';
  document.getElementById('fd-cplabel').textContent='Período escolhido';
  document.getElementById('fd-ptitle').textContent='Escolha o período de entrega';
  var cb=document.getElementById('fd-cbtn');cb.disabled=true;cb.style.opacity='0.4';
  styleToggle();
  renderCal();renderPer();
}

function buildModal(){
  var ov=document.createElement('div');
  ov.id='fd-overlay';
  ov.style.cssText='display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.55);z-index:99999;align-items:center;justify-content:center;padding:1rem;box-sizing:border-box';
  ov.innerHTML=
    '<div style="background:#fff;border-radius:16px;width:100%;max-width:700px;overflow:hidden;border:1px solid #e0e0e0;max-height:95vh;display:flex;flex-direction:column">'+
      '<div style="padding:1rem 1.25rem;border-bottom:1px solid #e8e8e8;display:flex;justify-content:space-between;align-items:center;flex-shrink:0">'+
        '<span style="font-size:15px;font-weight:500;color:#1a1a1a">Escolha a data e o período de entrega</span>'+
        '<button onclick="document.getElementById(\'fd-overlay\').style.display=\'none\'" style="background:none;border:none;font-size:20px;cursor:pointer;color:#888;line-height:1">✕</button>'+
      '</div>'+
      '<div style="display:grid;grid-template-columns:1fr 1fr;flex:1;overflow:hidden">'+
        '<div style="padding:1.25rem;border-right:1px solid #e8e8e8;overflow-y:auto">'+
          '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">'+
            '<button id="fd-prev" style="background:none;border:none;cursor:pointer;color:#555;font-size:22px;padding:0 4px;line-height:1">‹</button>'+
            '<span id="fd-mlabel" style="font-size:14px;font-weight:500;color:#1a1a1a"></span>'+
            '<button id="fd-next" style="background:none;border:none;cursor:pointer;color:#555;font-size:22px;padding:0 4px;line-height:1">›</button>'+
          '</div>'+
          '<div id="fd-cgrid" style="display:grid;grid-template-columns:repeat(7,1fr);gap:3px;text-align:center"></div>'+
          '<div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">'+
            '<div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#888"><div style="width:10px;height:10px;border-radius:50%;background:'+C.r+'"></div>Selecionado</div>'+
            '<div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#888"><div style="width:10px;height:10px;border-radius:50%;background:'+C.g+'"></div>Disponível</div>'+
            '<div style="display:flex;align-items:center;gap:4px;font-size:10px;color:#888"><div style="width:10px;height:10px;border-radius:50%;background:#ddd"></div>Indisponível</div>'+
          '</div>'+
        '</div>'+
        '<div style="display:flex;flex-direction:column;overflow:hidden">'+
          '<div style="padding:1rem 1.25rem 0;flex-shrink:0;display:flex;flex-direction:column;gap:8px">'+
            '<div id="fd-badge" style="display:none;align-items:center;gap:5px;background:'+C.af+';border:1px solid '+C.ab+';border-radius:999px;padding:4px 12px;font-size:11px;color:#92620a;font-weight:500;align-self:flex-start">🧺 Cesta de café e outras</div>'+
            '<div id="fd-notice-cesta" style="display:none;background:'+C.nf+';border-left:3px solid '+C.v+';border-radius:6px;padding:8px 10px;font-size:11px;color:'+C.nt+';line-height:1.5">Cestas precisam ser agendadas com pelo menos 1 dia de antecedência.</div>'+
            '<div style="display:flex;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">'+
              '<button id="fd-be" onclick="fdSetMode(\'e\')" style="flex:1;padding:7px 8px;font-size:12px;border:none;cursor:pointer;background:'+C.nf+';color:'+C.v+';font-weight:500">Entregar</button>'+
              '<button id="fd-br" onclick="fdSetMode(\'r\')" style="flex:1;padding:7px 8px;font-size:12px;border:none;cursor:pointer;background:none;color:#888;font-weight:400">Retirar na loja</button>'+
            '</div>'+
            '<p id="fd-ptitle" style="font-size:12px;color:#888;margin-bottom:2px">Escolha o período de entrega</p>'+
          '</div>'+
          '<div style="padding:0 1.25rem 1rem;overflow-y:auto;flex:1">'+
            '<div id="fd-periods"></div>'+
            '<div id="fd-pnotice"></div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div style="padding:.875rem 1.25rem;border-top:1px solid #e8e8e8;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-shrink:0">'+
        '<div style="display:flex;gap:1.25rem">'+
          '<div><div style="font-size:11px;color:#888;margin-bottom:2px">Data escolhida</div><div id="fd-cdate" style="font-size:12px;font-weight:500;color:#1a1a1a">—</div><div id="fd-cdow" style="font-size:10px;color:#aaa"></div></div>'+
          '<div><div id="fd-cplabel" style="font-size:11px;color:#888;margin-bottom:2px">Período escolhido</div><div id="fd-cperiod" style="font-size:12px;font-weight:500;color:#1a1a1a">—</div></div>'+
        '</div>'+
        '<button id="fd-cbtn" disabled onclick="fdConfirmar()" style="background:'+C.v+';color:#fff;border:none;border-radius:8px;padding:9px 22px;font-size:13px;font-weight:500;cursor:pointer;opacity:0.4">Confirmar →</button>'+
      '</div>'+
    '</div>';
  document.body.appendChild(ov);
  document.getElementById('fd-prev').addEventListener('click',function(){vm--;if(vm<0){vm=11;vy--;}renderCal();});
  document.getElementById('fd-next').addEventListener('click',function(){vm++;if(vm>11){vm=0;vy++;}renderCal();});
}

// Preenche observação ao chegar no checkout (caso venha de outra página)
function verificarAgendamentoSalvo(){
  try{
    var ag=sessionStorage.getItem('fd_agendamento');
    if(!ag)return;
    var obs=document.querySelector('textarea[name="observacoes"],textarea[name="observation"],#observacoes,#observation,textarea.observacoes');
    if(obs&&!obs.value){obs.value=ag;obs.dispatchEvent(new Event('change'));}
  }catch(e){}
}

$(document).ready(function(){
  verificarAgendamentoSalvo();
  // Só monta o modal em páginas de produto
  if(!$('.comprar, a.botao-comprar').length)return;
  buildModal();
  // Intercepta clique no botão de comprar
  $(document).on('click','a.botao-comprar, .botao-comprar, a[class*="botao-comprar"]',function(e){
    e.preventDefault();e.stopImmediatePropagation();
    abrirModal();
    return false;
  });
});

})();
