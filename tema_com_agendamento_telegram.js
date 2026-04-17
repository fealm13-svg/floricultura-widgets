const ST_Preview={isIframe:()=>window!==window.parent,waitMessage(){window.addEventListener("message",(event=>{event.data.message&&eval(event.data.message)}),!1)},runScriptsFromStorage(){let wasAnyScriptRun=!1;for(let key in sessionStorage)if(key.includes("preview-run-script_")){const previewRunScript=sessionStorage.getItem(key);wasAnyScriptRun||(wasAnyScriptRun=!0),eval(previewRunScript)}return wasAnyScriptRun},init(){this.waitMessage()}};ST_Preview.isIframe()&&ST_Preview.init();

$(document).ready(function(){

if (ST_Preview.isIframe()){
    const wasAnyScriptRun = ST_Preview.runScriptsFromStorage();
    if (wasAnyScriptRun) return;
}

const THEME_NAME = "SUPER LOJA - Cosméticos";

Fontes_da_Loja({
	fonteGeral: "DM Sans",
	fonteMenu: "DM Sans"
});

Feed_Instagram({
	ativar: "sim",
	codigoToken: "{{ TOKEN_INSTAGRAM_SAMA_THEMES }}",
	usuario: "floriculturadias.sp",
	titulo: "Siga-nos no instagram"
});  

Arredondamentos({
	a: "6",
	b: "6",
	c: "6",
	d: "6",
	e: "6"
});

Limitador_De_Categorias({
	ativar: "sim",
	icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/icone-menu-todas-categorias.png",
	titulo: "Todas Categorias",
	categoriasPrincipais: "7"
});

Icone_Carrinho_Sacola({
	ativarSacola: "sim"
});

Whatsapp_Flutuante({
	ativar: "sim",
	lado: "direito",
	alturaInferior: "85",
	numero: "(11) 95278-1267",
	texto: "Olá! Estou no site e desejo receber atendimento"
});

Comprar_Pelo_Whatsapp_Listagem_Produtos({
	ativar: "sim",
	numero: "(11) 95278-1267",
	textoBotao: "Comprar pelo WhatsApp",
	mensagem: "Olá, tudo bem? Gostaria de comprar este produto:"
});

Comprar_Pelo_Whatsapp_Pagina_Produto({
	ativar: "sim",
	numero: "(11) 95278-1267",
	textoBotao: "Comprar/ pelo WhatsApp",
	mensagem: "Olá, tudo bem? Gostaria de comprar este produto:"
});

// ============================================================
// WIDGET DE AGENDAMENTO DE ENTREGA - Floricultura Dias
// Inserido após o botão de compra na página do produto
// ============================================================
(function() {

  // Só roda na página de produto
  if (!document.querySelector('.produto-pagina, .product-page, [class*="produto"], [class*="product"]') &&
      !window.location.pathname.match(/\/[^\/]+\.html$|\/produto\//)) return;

  // ── CONFIGURAÇÕES ──────────────────────────────────────────
  var CONFIG = {
    
    diasDisponiveis: [0, 1, 2, 3, 4, 5, 6], // 0=Dom ... 6=Sáb
    periodosSemana: [
      { id: 'manha1', nome: 'Manhã I',  horario: '9h às 10h30',    inicio: [9,  0], preparo: 60 },
      { id: 'manha2', nome: 'Manhã II', horario: '10h30 às 12h',   inicio: [10,30], preparo: 60 },
      { id: 'tarde1', nome: 'Tarde I',  horario: '12h30 às 14h30', inicio: [12,30], preparo: 60 },
      { id: 'tarde2', nome: 'Tarde II', horario: '14h30 às 17h',   inicio: [14,30], preparo: 60 },
    ],
    periodosFimDeSemana: [
      { id: 'manha1', nome: 'Manhã I',  horario: '9h às 10h30',  inicio: [9,  0], preparo: 60 },
      { id: 'manha2', nome: 'Manhã II', horario: '10h30 às 12h', inicio: [10,30], preparo: 60 },
    ],
  };
  // ──────────────────────────────────────────────────────────

  // ── CSS ───────────────────────────────────────────────────
  var css = `
    #fd-agendar-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      justify-content: center;
      background: #2d5016;
      color: #fff;
      border: none;
      padding: 13px 20px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      border-radius: 6px;
      cursor: pointer;
      margin-top: 10px;
      transition: background 0.2s, transform 0.15s;
      letter-spacing: 0.3px;
      box-sizing: border-box;
    }
    #fd-agendar-btn:hover { background: #3a6b1d; transform: translateY(-1px); }
    #fd-agendar-btn svg { width: 17px; height: 17px; flex-shrink: 0; }

    #fd-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(20,15,8,0.6);
      backdrop-filter: blur(3px);
      z-index: 99999;
      align-items: center;
      justify-content: center;
      padding: 16px;
    }
    #fd-overlay.fd-active { display: flex; animation: fdFadeIn 0.2s ease; }
    @keyframes fdFadeIn { from { opacity:0 } to { opacity:1 } }
    @keyframes fdSlideUp { from { opacity:0; transform:translateY(18px) } to { opacity:1; transform:translateY(0) } }

    #fd-modal {
      background: #fff;
      border-radius: 14px;
      width: 100%;
      max-width: 700px;
      max-height: 92vh;
      overflow-y: auto;
      box-shadow: 0 20px 70px rgba(0,0,0,0.2);
      animation: fdSlideUp 0.25s ease;
      font-family: 'DM Sans', sans-serif;
    }

    #fd-modal * { box-sizing: border-box; }

    .fd-header {
      padding: 20px 24px 16px;
      border-bottom: 1px solid #f0ebe4;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .fd-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      margin: 0;
    }
    .fd-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #999;
      padding: 4px;
      border-radius: 6px;
      line-height: 1;
      transition: color 0.15s, background 0.15s;
    }
    .fd-close:hover { color: #333; background: #f0ebe4; }

    .fd-body {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }

    .fd-cal-side {
      padding: 20px 16px 20px 24px;
      border-right: 1px solid #f0ebe4;
    }
    .fd-cal-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .fd-cal-nav span {
      font-size: 16px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .fd-cal-nav button {
      background: none;
      border: 1px solid #e0d8cf;
      border-radius: 6px;
      width: 28px; height: 28px;
      cursor: pointer;
      color: #555;
      font-size: 15px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.15s;
      padding: 0;
    }
    .fd-cal-nav button:hover { background: #f0ebe4; }

    .fd-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }
    .fd-dname {
      text-align: center;
      font-size: 10px;
      font-weight: 500;
      color: #aaa;
      text-transform: uppercase;
      padding: 3px 0 7px;
      letter-spacing: 0.4px;
    }
    .fd-day {
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 7px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s;
      color: #333;
      position: relative;
      margin: 1px;
    }
    .fd-day:hover:not(.fd-disabled):not(.fd-empty) { background: #e8f0df; }
    .fd-day.fd-available { color: #2d5016; font-weight: 500; }
    .fd-day.fd-available::after {
      content: '';
      position: absolute;
      bottom: 2px;
      width: 3px; height: 3px;
      border-radius: 50%;
      background: #7ab648;
    }
    .fd-day.fd-selected { background: #2d5016 !important; color: #fff !important; font-weight: 600; }
    .fd-day.fd-selected::after { background: rgba(255,255,255,0.5); }
    .fd-day.fd-today { border: 1.5px solid #7ab648; }
    .fd-day.fd-disabled { color: #d0d0d0; cursor: default; }
    .fd-day.fd-empty { cursor: default; }

    .fd-legend {
      display: flex;
      gap: 12px;
      margin-top: 12px;
      flex-wrap: wrap;
    }
    .fd-legend-item {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 10px;
      color: #888;
    }
    .fd-ldot {
      width: 9px; height: 9px;
      border-radius: 3px;
    }
    .fd-ldot.s { background: #2d5016; }
    .fd-ldot.a { background: #e8f0df; border: 1.5px solid #7ab648; }
    .fd-ldot.d { background: #f0ebe4; }

    .fd-periods-side {
      padding: 20px 24px 20px 16px;
    }
    .fd-ptitle {
      font-size: 11px;
      font-weight: 500;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 0.7px;
      margin-bottom: 12px;
    }
    .fd-plist { display: flex; flex-direction: column; gap: 7px; }
    .fd-pitem {
      border: 1.5px solid #e8e0d6;
      border-radius: 9px;
      padding: 11px 13px;
      cursor: pointer;
      transition: all 0.15s;
      display: flex;
      align-items: center;
      gap: 11px;
    }
    .fd-pitem:hover:not(.fd-unavail) { border-color: #7ab648; background: #f4f9ee; }
    .fd-pitem.fd-psel { border-color: #2d5016; background: #f0f6e8; }
    .fd-pitem.fd-unavail { opacity: 0.35; cursor: not-allowed; }
    .fd-pradio {
      width: 17px; height: 17px;
      border-radius: 50%;
      border: 2px solid #ccc;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      transition: border-color 0.15s;
    }
    .fd-pitem.fd-psel .fd-pradio { border-color: #2d5016; }
    .fd-pradio-inner {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #2d5016;
      transform: scale(0);
      transition: transform 0.15s;
    }
    .fd-pitem.fd-psel .fd-pradio-inner { transform: scale(1); }
    .fd-pname { font-size: 13px; font-weight: 500; color: #222; }
    .fd-ptime { font-size: 11px; color: #999; margin-top: 1px; }
    .fd-pbadge {
      margin-left: auto;
      font-size: 10px;
      background: #fff3e0;
      color: #e07b00;
      border: 1px solid #ffe0b2;
      border-radius: 4px;
      padding: 2px 5px;
      font-weight: 500;
      white-space: nowrap;
    }
    .fd-nodate {
      padding: 24px 12px;
      text-align: center;
      color: #bbb;
      font-size: 13px;
      line-height: 1.5;
    }

    .fd-footer {
      padding: 14px 24px 18px;
      border-top: 1px solid #f0ebe4;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      flex-wrap: wrap;
    }
    .fd-summary { display: flex; gap: 18px; flex-wrap: wrap; }
    .fd-sitem { display: flex; flex-direction: column; gap: 2px; }
    .fd-slabel { font-size: 10px; color: #aaa; text-transform: uppercase; letter-spacing: 0.5px; }
    .fd-sval { font-size: 13px; font-weight: 500; color: #1a1a1a; }
    .fd-sval.fd-sempty { color: #ccc; font-style: italic; font-weight: 400; }

    .fd-confirm-btn {
      background: #2d5016;
      color: #fff;
      border: none;
      padding: 11px 20px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      border-radius: 7px;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .fd-confirm-btn:hover:not(:disabled) { background: #3a6b1d; }
    .fd-confirm-btn:disabled { background: #ccc; cursor: not-allowed; }

    .fd-success {
      display: none;
      padding: 36px 24px;
      text-align: center;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
    .fd-success.fd-active { display: flex; }
    .fd-sicon {
      width: 54px; height: 54px;
      background: #f0f6e8;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 4px;
    }
    .fd-success h3 { font-size: 19px; font-weight: 600; color: #1a1a1a; margin: 0; }
    .fd-success p { font-size: 13px; color: #666; line-height: 1.6; margin: 0; }
    .fd-sdetail {
      background: #f4f9ee;
      border: 1px solid #d4e8b8;
      border-radius: 9px;
      padding: 12px 18px;
      text-align: left;
      width: 100%;
      max-width: 340px;
    }
    .fd-sdetail div { font-size: 13px; color: #444; padding: 3px 0; }
    .fd-sdetail strong { color: #2d5016; }

    @media (max-width: 540px) {
      .fd-body { grid-template-columns: 1fr; }
      .fd-cal-side { border-right: none; border-bottom: 1px solid #f0ebe4; padding: 18px; }
      .fd-periods-side { padding: 18px; }
    }
  `;

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // ── HTML ──────────────────────────────────────────────────
  var html = `
    <div id="fd-overlay">
      <div id="fd-modal">
        <div id="fd-main">
          <div class="fd-header">
            <h2>📅 Escolha a data e horário de entrega</h2>
            <button class="fd-close" id="fd-close-btn">✕</button>
          </div>
          <div class="fd-body">
            <div class="fd-cal-side">
              <div class="fd-cal-nav">
                <button id="fd-prev">&#8249;</button>
                <span id="fd-mes-ano"></span>
                <button id="fd-next">&#8250;</button>
              </div>
              <div class="fd-grid" id="fd-grid"></div>
              <div class="fd-legend">
                <div class="fd-legend-item"><div class="fd-ldot s"></div> Selecionado</div>
                <div class="fd-legend-item"><div class="fd-ldot a"></div> Disponível</div>
                <div class="fd-legend-item"><div class="fd-ldot d"></div> Indisponível</div>
              </div>
            </div>
            <div class="fd-periods-side">
              <div class="fd-ptitle">Período de entrega</div>
              <div id="fd-plist"><div class="fd-nodate">← Selecione uma data para ver os horários disponíveis</div></div>
            </div>
          </div>
          <div class="fd-footer">
            <div class="fd-summary">
              <div class="fd-sitem">
                <span class="fd-slabel">Data</span>
                <span class="fd-sval fd-sempty" id="fd-res-data">Não selecionada</span>
              </div>
              <div class="fd-sitem">
                <span class="fd-slabel">Horário</span>
                <span class="fd-sval fd-sempty" id="fd-res-hora">Não selecionado</span>
              </div>
            </div>
            <button class="fd-confirm-btn" id="fd-confirmar" disabled>Confirmar agendamento</button>
          </div>
        </div>
        <div class="fd-success" id="fd-success">
          <div class="fd-sicon">✅</div>
          <h3>Agendamento confirmado! 🌸</h3>
          <p>Sua data e horário foram registrados.<br>Você receberá a confirmação em breve.</p>
          <div class="fd-sdetail" id="fd-sdetail"></div>
          <button class="fd-confirm-btn" id="fd-fechar-sucesso">Fechar</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', html);

  // ── BOTÃO NA PÁGINA DO PRODUTO ────────────────────────────
  // Aguarda o DOM do produto estar pronto e tenta inserir o botão
  function inserirBotao() {
    // Seletores comuns de botões de compra na Loja Integrada / temas SAMA
    var alvos = [
      '.produto-comprar',
      '.comprar-produto',
      '.buy-button-container',
      '.action-buy',
      '[class*="comprar"]',
      '.produto-acoes',
      '.product-actions',
      'form[action*="carrinho"] .btn',
      '.add-to-cart',
    ];

    var referencia = null;
    for (var i = 0; i < alvos.length; i++) {
      referencia = document.querySelector(alvos[i]);
      if (referencia) break;
    }

    if (!referencia) return; // Não está na página de produto

    var wrapper = document.createElement('div');
    wrapper.style.cssText = 'margin-top:10px; width:100%;';
    wrapper.innerHTML = `
      <button id="fd-agendar-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
        Agendar Data de Entrega
      </button>
    `;

    referencia.parentNode.insertBefore(wrapper, referencia.nextSibling);
    document.getElementById('fd-agendar-btn').addEventListener('click', abrirModal);
  }

  // ── LÓGICA DO CALENDÁRIO ──────────────────────────────────
  var hoje = new Date();
  var viewDate = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  var dataSel = null;
  var periodoSel = null;
  var mesesPT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  var diasPT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  function isFDS(d) { return d.getDay() === 0 || d.getDay() === 6; }
  function getPeriodos(d) { return isFDS(d) ? CONFIG.periodosFimDeSemana : CONFIG.periodosSemana; }
  function isHoje(d) { return d.toDateString() === hoje.toDateString(); }

  function periodoOk(p, d) {
    if (!isHoje(d)) return true;
    var agora = new Date();
    var agoraMin = agora.getHours() * 60 + agora.getMinutes();
    var inicioMin = p.inicio[0] * 60 + p.inicio[1];
    return agoraMin < (inicioMin - p.preparo);
  }

  function temPeriodo(d) {
    return getPeriodos(d).some(function(p){ return periodoOk(p, d); });
  }

  function renderCal() {
    document.getElementById('fd-mes-ano').textContent = mesesPT[viewDate.getMonth()] + ' ' + viewDate.getFullYear();
    var grid = document.getElementById('fd-grid');
    grid.innerHTML = '';

    diasPT.forEach(function(d) {
      var el = document.createElement('div');
      el.className = 'fd-dname';
      el.textContent = d;
      grid.appendChild(el);
    });

    var primeiro = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    var ultimo = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

    for (var i = 0; i < primeiro.getDay(); i++) {
      var vazio = document.createElement('div');
      vazio.className = 'fd-day fd-empty';
      grid.appendChild(vazio);
    }

    for (var d = 1; d <= ultimo.getDate(); d++) {
      (function(dia) {
        var date = new Date(viewDate.getFullYear(), viewDate.getMonth(), dia);
        var el = document.createElement('div');
        el.className = 'fd-day';
        el.textContent = dia;

        var passado = date < new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
        var diaOk = CONFIG.diasDisponiveis.indexOf(date.getDay()) !== -1;

        if (passado || !diaOk || !temPeriodo(date)) {
          el.classList.add('fd-disabled');
        } else {
          el.classList.add('fd-available');
          if (isHoje(date)) el.classList.add('fd-today');
          if (dataSel && date.toDateString() === dataSel.toDateString()) el.classList.add('fd-selected');
          el.addEventListener('click', function() { selecionarData(date); });
        }
        grid.appendChild(el);
      })(d);
    }
  }

  function selecionarData(d) {
    dataSel = d;
    periodoSel = null;
    renderCal();
    renderPeriodos();
    atualizarResumo();
  }

  function renderPeriodos() {
    var container = document.getElementById('fd-plist');
    if (!dataSel) {
      container.innerHTML = '<div class="fd-nodate">← Selecione uma data para ver os horários disponíveis</div>';
      return;
    }
    var periodos = getPeriodos(dataSel);
    container.innerHTML = '';
    var list = document.createElement('div');
    list.className = 'fd-plist';

    periodos.forEach(function(p) {
      var ok = periodoOk(p, dataSel);
      var sel = periodoSel && periodoSel.id === p.id;
      var el = document.createElement('div');
      el.className = 'fd-pitem' + (sel ? ' fd-psel' : '') + (!ok ? ' fd-unavail' : '');
      el.innerHTML =
        '<div class="fd-pradio"><div class="fd-pradio-inner"></div></div>' +
        '<div><div class="fd-pname">' + p.nome + '</div><div class="fd-ptime">' + p.horario + '</div></div>' +
        (!ok ? '<span class="fd-pbadge">Indisponível</span>' : '');
      if (ok) {
        el.addEventListener('click', function() {
          periodoSel = p;
          renderPeriodos();
          atualizarResumo();
        });
      }
      list.appendChild(el);
    });
    container.appendChild(list);
  }

  function atualizarResumo() {
    var elData = document.getElementById('fd-res-data');
    var elHora = document.getElementById('fd-res-hora');
    var btnConf = document.getElementById('fd-confirmar');

    if (dataSel) {
      elData.textContent = dataSel.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long' });
      elData.classList.remove('fd-sempty');
    } else {
      elData.textContent = 'Não selecionada';
      elData.classList.add('fd-sempty');
    }
    if (periodoSel) {
      elHora.textContent = periodoSel.nome + ' · ' + periodoSel.horario;
      elHora.classList.remove('fd-sempty');
    } else {
      elHora.textContent = 'Não selecionado';
      elHora.classList.add('fd-sempty');
    }
    btnConf.disabled = !(dataSel && periodoSel);
  }

  function abrirModal() {
    document.getElementById('fd-overlay').classList.add('fd-active');
    renderCal();
  }

  function fecharModal() {
    document.getElementById('fd-overlay').classList.remove('fd-active');
    document.getElementById('fd-main').style.display = '';
    document.getElementById('fd-success').classList.remove('fd-active');
  }

  // ── EVENTOS ───────────────────────────────────────────────
  document.getElementById('fd-close-btn').addEventListener('click', fecharModal);
  document.getElementById('fd-fechar-sucesso').addEventListener('click', fecharModal);
  document.getElementById('fd-overlay').addEventListener('click', function(e) {
    if (e.target === this) fecharModal();
  });
  document.getElementById('fd-prev').addEventListener('click', function() {
    viewDate.setMonth(viewDate.getMonth() - 1);
    renderCal();
  });
  document.getElementById('fd-next').addEventListener('click', function() {
    viewDate.setMonth(viewDate.getMonth() + 1);
    renderCal();
  });
  document.getElementById('fd-confirmar').addEventListener('click', function() {
    if (!dataSel || !periodoSel) return;
    var dataStr = dataSel.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

    // Envia notificação via Telegram Bot
    var msgTelegram =
      '🌸 *Novo Agendamento de Entrega*\n\n' +
      '📅 *Data:* ' + dataStr + '\n' +
      '🕐 *Período:* ' + periodoSel.nome + ' (' + periodoSel.horario + ')\n\n' +
      '🔔 _Enviado automaticamente pelo site floriculturadias.com_';

    fetch('https://api.telegram.org/bot8782634094:AAHI3dsP9t0AdIZiJJ6Bp1YlCyX2O9Uhf8A/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '1507141860',
        text: msgTelegram,
        parse_mode: 'Markdown'
      })
    });

    // Mostra sucesso
    document.getElementById('fd-main').style.display = 'none';
    document.getElementById('fd-success').classList.add('fd-active');
    document.getElementById('fd-sdetail').innerHTML =
      '<div>📅 <strong>Data:</strong> ' + dataStr + '</div>' +
      '<div>🕐 <strong>Período:</strong> ' + periodoSel.nome + ' (' + periodoSel.horario + ')</div>';
  });

  // Insere botão (tenta imediatamente e depois aguarda um pouco caso o tema ainda esteja renderizando)
  inserirBotao();
  setTimeout(inserirBotao, 1500);
  setTimeout(inserirBotao, 3000);

})();
// ============================================================
// FIM DO WIDGET DE AGENDAMENTO
// ============================================================

Video_Home({
	ativar: "sim",
	link: "https://youtu.be/jwbFHO2IL1U?si=qr04XiLP4GmZM0kN"
});

LinksSuperior({
	ativarDesktop: "não",
	ativarMobile: "não",
	corFundo: "#b969e2",
	corBorda: "white",
	corTextos: "white"
}, [
	{ novaAba: "não", icone: "", titulo: "Quem Somos", link: "/", lado: "esquerdo" },
	{ novaAba: "não", icone: "", titulo: "Nossas Lojas", link: "/", lado: "esquerdo" },
	{ novaAba: "não", icone: "", titulo: "Trocas e Devoluções", link: "/", lado: "esquerdo" },
	{ novaAba: "não", icone: "", titulo: "Políticas de Compras", link: "/", lado: "esquerdo" },
	{ novaAba: "não", icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/icone-link-superior-wpp-v2.png", titulo: "Compre pelo WhatsApp", link: "/", lado: "direito" },
	{ novaAba: "não", icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/icone-link-superior-pedido-v1.png", titulo: "Meus Pedidos", link: "/", lado: "direito" }
]);

Tamanho_Logomarca({
	TamanhoDesktop: "250x200",
	TamanhoMobile: "150x50"
});

Carrossel_Produtos({
	ativarCarrosselComputador: "sim",
	ativarCarrosselMobile: "sim",
	quantidadePorLinhaMobile: "2",
	quantidadePorLinhaTablet: "3",
	quantidadePorLinhaComputador: "4"
});

Rastreio_Pedido({
	ativar: "não",
	titulo: "Rastrear Pedido",
	tituloCampo: "Código de Rastreio",
	linkRastreio: "https://rastreae.com.br/resultado/"
});

Mensagem_Topo({
	ativar: "sim",
	ativarEfeitoRotativo: "sim",
	velocidadeEfeito: "0.6",
	corFundo: "black",
	corBorda: "#8f0c2b",
	corTextos: "white"
}, [
	{ mensagem: "Compre via <img src='https://cdn.awsli.com.br/1950/1950161/arquivos/logo-pix-icone-1024.png'> pix</b></a> e ganhe 5% de desconto!" },
	{ mensagem: "<img src='https://cdn.awsli.com.br/2498/2498336/arquivos/lojas.png'> Compre pelo site e Retire em nossa loja física!" },
	{ mensagem: "<img src='https://cdn.awsli.com.br/2498/2498336/arquivos/caminhao.png'> Entrega rápida para Campos Elíseos e bairros vizinhos!" }
]);

Cores_Precos_Produtos({
	corPrecos: "#990225"
});

Config_Header({
	modelo: "modelo-3",
	corFundoLogomarca: "white",
	corFundoMenu: "white",
	corBordaBusca: "#5b8956",
	corBordaMenu: "#e8e8e8",
	corFundoBarraBusca: "white",
	corBarraBusca: "#a81537",
	corIconeBarraBusca: "#5b8956",
	corCategoriasMenu: "#a81537",
	corTituloAcoes: "#a81537",
	corIconesAcoes: "#5b8956",
	corNumeroBalaoCarrinho: "white",
	corBalaoCarrinho: "#5b8956",
	corLinhasDivisorias: "#e8e8e8",
	ativarCategoriasMobile: "sim"
});

Contatos_Header({
	NumeroWhatsapp: "(11) 95278-1267",
	NumeroTelefone: "(11) 2368-1101",
	Email: "contato@floriculturadias.com",
	TituloHorario: "Horario de Atendimento",
	Horario: "Segunda a Sexta - 9h00 às 18h00"
});

Logo_Rodape({
	ativar: "sim",
	ativar_nova_logo: "não",
	nova_logo_imagem: ""
});

Config_Rodape({
	corFundo: "black",
	corTextos: "white",
	corLinhasDivisorias: "#e8e8e8",
	corFundoBotoes: "#a81537",
	corTextoBotoes: "white",
	corBordaBotoes: "#a81537",
	linkBotaoSobreALoja: "/pagina/sobre-nos.html",
	textoBotaoSobreALoja: "Ver mais",
	tituloHorarioAtendimento: "Horario de Atendimento",
	horarioAtendimento: "Seg. a Sex. 9h às 22h",
	tituloEndereco: "Endereço",
	endereco: "Al. Barão de Limeira, 998 - Campos Elíseos | São Paulo-SP | Cep: 01202-002"
});

Compra_Por_Quantiade({
	ativar: "sim"
});

Modal_Newsletter({
	ativar: "não",
	imagem: "https://cdn.awsli.com.br/500x500/2737/2737777/produto/271070845/oleo-essencial-hidramais-lavanda-ddjsv8f1l0.jpg"
});

Rodape_Newsletter({
	ativar: "não",
	altura_bloco: "200px",
	icone: "https://cdn.awsli.com.br/1837/1837706/arquivos/iconnewslettermail.png",
	imagem_fundo: "https://cdn.awsli.com.br/1804/1804436/arquivos/bg-newsletter-rodape.png",
	cor_titulo: "white",
	cor_fundo_botao: "#fea1a2",
	cor_texto_botao: "white"
});

Compras_Flutuante({
	ativar: "não"
}, [
	{
		imagem: "https://cdn.awsli.com.br/500x500/2737/2737777/produto/270879428/protetor-labial-nivea-shine-morango-o5jcbd2e5f.jpg",
		link: "/hidratante-labial-nivea-shine-48g-morango",
		name_product: "Comprou <b>Hidratante Labial NIVEA Shine</b>",
		name_user: "Silvana <b>São Paulo - SP</b>",
		hour: "1 horas atrás"
	}
]);

Icones_Menu({
	ativar: "sim",
	largura: "25",
	altura: "25",
	Icone_1: "https://cdn.awsli.com.br/2498/2498336/arquivos/flower.png",
	Icone_2: "https://cdn.awsli.com.br/2498/2498336/arquivos/bouquet.png",
	Icone_3: "https://cdn.awsli.com.br/2498/2498336/arquivos/kitsecestas.png",
	Icone_4: "https://cdn.awsli.com.br/2498/2498336/arquivos/idea.png",
	Icone_5: "https://cdn.awsli.com.br/2498/2498336/arquivos/discount.png",
	Icone_6: "https://cdn.awsli.com.br/2498/2498336/arquivos/adicionais.png",
	Icone_7: "https://cdn.awsli.com.br/2498/2498336/arquivos/orchid.png",
	Icone_8: "", Icone_9: "", Icone_10: "", Icone_11: "", Icone_12: "",
	Icone_13: "", Icone_14: "", Icone_15: "", Icone_16: "", Icone_17: "",
	Icone_18: "", Icone_19: "", Icone_20: ""
});

Titulos_Vitrines({
	Lancamentos: "Novidades da Semana",
	Mais_Vendidos: "Nossos Queridinhos",
	Destaques: "Nossos Destaques"
});

Tabela_Medidas({
	ativar: "não",
	titulo: "Guia de Medidas"
}, [
	{ nome: "", imagem: "https://cdn.awsli.com.br/1656/1656453/arquivos/dda519deca28de5075e27d42d1dbbe0c.jpg" },
	{ nome: "", imagem: "https://cdn.awsli.com.br/1950/1950161/arquivos/tabela_de_medidas.jpg" }
]);

Departamentos({
	ativar: "sim",
	titulo: "Conheça Nossos Kits e Cestas",
	itensPorLinhaMobile: "3",
	itensPorLinhaDesktop: "5"
}, [
	{ icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/fundo-removido-quadrado-12-.png", titulo: "Kits com Chocolates", link: "flores-e-chocolates" },
	{ icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/removedor-de-fundo-quadrado-14-.png", titulo: "Cestas de Café", link: "/cestas-de-cafe" },
	{ icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/1000132008.png", titulo: "Kits com Cerveja", link: "/flores-e-bebidas" },
	{ icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/1000131333.png", titulo: "Kits com Pelúcias", link: "/flores-e-pelucias" },
	{ icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/1000153433-jpg.png", titulo: "Linha Premium", link: "/linha-premium" }
]);

VitrineCronometro({
	ativar: "não",
	blocoCompleto: "não",
	linkCategoria: "/ofertas-especiais",
	corFundo: "#f44336",
	corBordas: "#cc0000",
	corTextosTopo: "white",
	icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/icone-relogio-cronometro-branco-v1.png",
	titulo: "Ofertas Especiais",
	subtitulo: "Confira nossos produtos em super oferta",
	linkBotao: "/promocoes",
	textoBotao: "+ ver todos",
	corFundoBotao: "#b96ae4",
	corTextoBotao: "white",
	textoCronometro: "termina em:",
	dataFinalizacao: "2025/05/08 17:50",
	produtosPorLinhaDekstop: "5",
	produtosPorLinhaMobile: "2",
	passagemAutomatica: "sim",
	passagemInfinita: "não"
});

Banners_Vitrines({
	ativar: "não",
	imagem_1: "https://cdn.awsli.com.br/2737/2737777/arquivos/banners-banner-vitrine-01.jpg",
	link_1: "/promocoes",
	imagem_2: "https://cdn.awsli.com.br/2737/2737777/arquivos/banners-banner-vitrine-02.jpg",
	link_2: "/promocoes",
	imagem_3: "https://cdn.awsli.com.br/2737/2737777/arquivos/banners-banner-vitrine-03.jpg",
	link_3: "/promocoes",
	imagem_4: "https://cdn.awsli.com.br/2737/2737779/arquivos/banners-banner-vitrine-04.jpg",
	link_4: "/promocoes"
});

Banner_Tarja({
	ativar: "sim"
}, [
	{ icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/localizacao.png", link: "#", titulo: "Compre e retire", descricao: "em nossa loja física" },
	{ icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/banner-tarja-icone-parcelamento-v1.png", link: "#", titulo: "Parcele suas compras", descricao: "em até 3x sem juros." },
	{ icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/banner-tarja-icone-frete-v1.png", link: "#", titulo: "Consulte os bairros", descricao: "em que fazemos entregas." },
	{ icone: "https://cdn.awsli.com.br/2737/2737779/arquivos/banner-tarja-icone-desconto-v1.png", link: "#", titulo: "Desconto de 5% para", descricao: "pagamentos via pix!" }
]);

Depoimentos_Home({
	ativar: "sim",
	titulo: "Avaliações Google - 🌟🌟🌟🌟🌟"
}, [
	{ imagem: "https://cdn.awsli.com.br/1837/1837706/arquivos/146037.png", nome: "Daniel Bejarano", data: "São Paulo | SP", descricao: "Atendimento muito personalizado e gentil, Bruna me atendeu super atenciosa. A venda é feita via WhatsApp mas as fotos que estão no site são exatamente iguais as fotos dos produtos e o tempo de entrega foi excepcional, sem dúvida voltarei." },
	{ imagem: "https://cdn.awsli.com.br/1837/1837706/arquivos/146035.png", nome: "Thiago Lemmos", data: "São Paulo | SP", descricao: "Sempre passo para levar alguns arranjos e ontem encomendei uma cesta pela primeira vez, atendimento excelente da Bruna no WhatsApp, cesta linda, bem montada, entrega no prazo e super em conta. Recomendo muito." },
	{ imagem: "https://cdn.awsli.com.br/1837/1837706/arquivos/146034.png", nome: "Mônica Rodrigues", data: "São Paulo | SP", descricao: "Experiência maravilhosa!<br>Arranjo lindo superou muito a expectativa!<br>Super recomendo." },
	{ imagem: "https://cdn.awsli.com.br/1837/1837706/arquivos/146031.png", nome: "Murilo Henrique", data: "São Paulo | SP", descricao: "Fiz o pedido para o Dia dos Namorados e a experiência foi excelente. O atendimento da Bruna foi um diferencial, muito prático e eficiente. O presente fez o maior sucesso, obrigado!" },
	{ imagem: "https://cdn.awsli.com.br/1837/1837706/arquivos/146036.png", nome: "Welida Miranda", data: "Recife | PE", descricao: "Excelente, eu não sou da cidade e eles foram muito atenciosos e me ajudar a escolher o presente para minha amiga. Entregaram no horário e foram super solícitos! Ela amou demais e eu fiquei muito feliz !Parabéns pelo profissionalismo" }
]);

Ofertas_Especiais({
	ativar: "não",
	icone: "https://cdn.awsli.com.br/2498/2498336/arquivos/desconto-1-.png",
	link_categoria: "/ofertas",
	titulo_categoria: "Ofertas Especiais",
	cor_fundo_categoria: "#a81537",
	cor_titulo_categoria: "#ffd966",
	titulo_cronometro: "Confira nossas ofertas",
	sub_titulo_cronometro: "Corre que já está acabandooo!!",
	termino_cronometro: "2025/01/01 00:00"
});

Tags({ a: "transparent", b: "transparent", c: "#1eab49", d: "white" });

Altura_Produtos({ c: "não", a: "100", b: "100" });

CategoriasAlta({
	l: "before", m: "2", a: "não", c: "não", b: "4", d: "2", e: "sim",
	f: "Categorias em Destaque", g: "black", h: "black", i: "#777777", j: "white", k: "#6a2281"
}, [
	{ a: "sim", c: "https://cdn.awsli.com.br/500x500/2737/2737777/produto/271070845/oleo-essencial-hidramais-lavanda--1--i15e6lm4i2.jpg", b: "/oleos", f: "clique e confira", d: "Óleos Essenciais", e: "t is a long established fact that a reader will be distracted by the readable content" },
	{ a: "sim", c: "https://cdn.awsli.com.br/500x500/2737/2737777/produto/270880254/vela-de-massagem-biossance-spread-love--1--xppptnnqgw.jpg", b: "/promocoes", f: "clique e confira", d: "Velas", e: "There are many variations of passages of Lorem Ipsum available, but the majority" },
	{ a: "sim", c: "https://cdn.awsli.com.br/500x500/2737/2737777/produto/271070845/oleo-essencial-hidramais-lavanda--1--i15e6lm4i2.jpg", b: "/promocoes", f: "clique e confira", d: "Óleos Essenciais", e: "he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested." },
	{ a: "sim", c: "https://cdn.awsli.com.br/500x500/2737/2737777/produto/270880254/vela-de-massagem-biossance-spread-love--1--xppptnnqgw.jpg", b: "/promocoes", f: "clique e confira", d: "Velas", e: "Simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's" }
]);

SecaoQuemSomos({
	a: "sim", b: "sim", c: "#e8e8e8", d: "#e8e8e8", e: "black", f: "#7b7b7b",
	g: "white", h: "#6a2281",
	i: "Conheça sobre nossa empresa",
	j: "https://cdn.awsli.com.br/2498/2498336/arquivos/1000123763.jpg",
	k: "Ver mais", l: "/pagina/sobre-nos.html"
});

});

$(".secao-banners .flexslider li").each(function(){let e=$(this).find("img").attr("alt").toLowerCase();window.innerWidth>=768?e.includes("@mobile")&&$(this).remove():e.includes("@desktop")&&$(this).remove()});
