// Tema claro/escuro do catálogo. Script clássico no <head>, antes do CSS e sem module/defer:
// aplica a escolha salva antes de a página aparecer, então nada pisca no tema errado.
// O padrão é sempre o claro, mesmo com o celular no modo escuro. O escuro só vale se a pessoa
// escolher no botão sol/lua (nunca usar prefers-color-scheme aqui nem no CSS).
(() => {
  const CHAVE = 'saraStore:tema';             // mesmo prefixo e formato (JSON) do resto do site
  const CHAVE_AVISO = 'saraStore:avisoEscurecido';
  const COR_BARRA = { claro: '#6F5227', escuro: '#553E1D' }; // theme-color: barra do navegador no celular
  const raiz = document.documentElement;

  // Sempre com try/catch: navegação anônima ou armazenamento bloqueado não pode quebrar a página.
  function ler(chave) {
    try {
      return JSON.parse(localStorage.getItem(chave));
    } catch {
      return null;
    }
  }

  function gravar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
    } catch {
      /* sem armazenamento: a escolha vale só nesta visita */
    }
  }

  const atual = () => (raiz.getAttribute('data-tema') === 'escuro' ? 'escuro' : 'claro');

  function aplicar(tema) {
    const escuro = tema === 'escuro';
    if (escuro) raiz.setAttribute('data-tema', 'escuro');
    else raiz.removeAttribute('data-tema');
    // O meta decide a cor da primeira pintura. "only light" é o pedido mais forte para o navegador
    // não escurecer a página; no escuro, "dark" (sem "light") também não deixa ele escurecer de novo.
    const esquema = document.querySelector('meta[name="color-scheme"]');
    if (esquema) esquema.content = escuro ? 'dark' : 'only light';
    const barra = document.querySelector('meta[name="theme-color"]');
    if (barra) barra.content = COR_BARRA[escuro ? 'escuro' : 'claro'];
    for (const botao of document.querySelectorAll('[data-alternar-tema]')) {
      botao.setAttribute('aria-pressed', escuro ? 'true' : 'false');
    }
  }

  // Alguns navegadores escurecem a página por conta própria e ignoram o "only light"
  // (ex.: o modo escuro do Samsung Internet). Um elemento com a cor de fundo do sistema (Canvas)
  // e "only light" sai branco quando o pedido é respeitado e escuro quando o navegador força.
  function escurecidoPeloNavegador() {
    const teste = document.createElement('div');
    teste.style.cssText = 'display:none;background-color:Canvas;color-scheme:only light';
    document.body.append(teste);
    const cor = getComputedStyle(teste).backgroundColor;
    teste.remove();
    const [r, g, b, a = 1] = (cor.match(/[\d.]+/g) || []).map(Number);
    return a > 0 && r + g + b < 384; // transparente = navegador sem "Canvas": não dá para saber
  }

  // Avisa uma vez (até a pessoa tocar em "Entendi") como ver as cores certas.
  function mostrarAviso() {
    const faixa = document.querySelector('.faixa');
    if (!faixa || ler(CHAVE_AVISO)) return;
    const texto = document.createElement('p');
    texto.textContent = 'Seu navegador está escurecendo este site por conta própria, por isso as cores podem ficar estranhas. ' +
      'Para ver o site como ele é, desligue o modo escuro para sites nas configurações do navegador. ' +
      'O claro e o escuro do próprio site ficam no botão sol/lua, lá em cima.';
    const entendi = document.createElement('button');
    entendi.type = 'button';
    entendi.className = 'botao secundario';
    entendi.textContent = 'Entendi';
    const aviso = document.createElement('div');
    aviso.className = 'aviso aviso-escuro';
    aviso.setAttribute('role', 'note');
    aviso.append(texto, entendi);
    const caixa = document.createElement('div');
    caixa.className = 'conteudo';
    caixa.append(aviso);
    entendi.addEventListener('click', () => {
      gravar(CHAVE_AVISO, true);
      caixa.remove();
      // O botão com o foco sumiu: o foco vai para o título, e não se perde no <body>.
      document.getElementById('titulo')?.focus({ preventScroll: true });
    });
    faixa.after(caixa);
  }

  aplicar(ler(CHAVE) === 'escuro' ? 'escuro' : 'claro');

  // Assim que o HTML termina de ser lido (antes de os módulos do app.js rodarem, que podem demorar
  // numa rede lenta): o botão já existe, então acerta o aria-pressed e confere o escurecimento.
  function quandoLido() {
    aplicar(atual());
    // No alto contraste do Windows as cores do sistema mandam: não é o navegador escurecendo.
    if (!matchMedia('(forced-colors: active)').matches && escurecidoPeloNavegador()) mostrarAviso();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('readystatechange', quandoLido, { once: true });
  } else {
    quandoLido();
  }

  document.addEventListener('click', (evento) => {
    if (!evento.target.closest?.('[data-alternar-tema]')) return;
    const novo = atual() === 'escuro' ? 'claro' : 'escuro';
    aplicar(novo);
    gravar(CHAVE, novo);
  });

  // Outra aba do catálogo trocou o tema.
  addEventListener('storage', (evento) => {
    if (evento.key === CHAVE) aplicar(ler(CHAVE) === 'escuro' ? 'escuro' : 'claro');
  });
})();
