// Fotos do painel: compressão no navegador (antes de enviar) e guarda no IndexedDB
// até a publicação. Nada aqui fala com o GitHub.

const LIMITE_ARQUIVO = 25 * 1024 * 1024; // 25 MB
const LADO_FOTO = 1000;
const LADO_FOTO_REDUZIDA = 800;
const LADO_MINIATURA = 240;
const LADO_MAXIMO_CANVAS = 4096;
const LIMITE_FOTO = 300 * 1024; // acima disso, comprime mais

const WEBP = { tipo: 'image/webp', extensao: 'webp', qualidade: 0.8 };
const JPEG = { tipo: 'image/jpeg', extensao: 'jpg', qualidade: 0.82 };
const QUALIDADE_MENOR = 0.7;

const ERRO_FORMATO = 'Formato não suportado, use JPG ou PNG.';
const ERRO_PROCESSAR = 'Não foi possível preparar esta foto. Tente outra foto.';

/* ---------- Compressão ---------- */

// Abre a imagem com <img> + decode(): o createImageBitmap tem bugs de orientação (EXIF) no Safari.
async function abrirImagem(url) {
  const img = new Image();
  img.decoding = 'async';
  img.src = url;
  try {
    await img.decode();
  } catch {
    throw new Error(ERRO_FORMATO); // ex.: HEIC no Chrome do computador
  }
  if (!img.naturalWidth || !img.naturalHeight) throw new Error(ERRO_FORMATO);
  return img;
}

function novoCanvas(largura, altura = largura) {
  const canvas = document.createElement('canvas');
  canvas.width = largura;
  canvas.height = altura;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error(ERRO_PROCESSAR);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return { canvas, ctx };
}

// Libera a memória do canvas (o Safari do iPhone tem limite baixo).
function liberar(canvas) {
  canvas.width = 0;
  canvas.height = 0;
}

// Fundo branco, no máximo "ladoMaximo" px no lado maior e nunca ampliando.
// "quadrado": recorte central 1:1 (miniatura da lista). Sem ele a foto vai inteira, na proporção
// original: assim a capa de um livro (retangular, em pé) não perde o topo nem o rodapé.
// Reduz pela metade em etapas para a imagem não ficar serrilhada.
function desenhar(img, ladoMaximo, { quadrado = false } = {}) {
  const ladoMenor = Math.min(img.naturalWidth, img.naturalHeight);
  let larguraFonte = quadrado ? ladoMenor : img.naturalWidth;
  let alturaFonte = quadrado ? ladoMenor : img.naturalHeight;
  const escala = Math.min(1, ladoMaximo / Math.max(larguraFonte, alturaFonte));
  const largura = Math.max(1, Math.round(larguraFonte * escala));
  const altura = Math.max(1, Math.round(alturaFonte * escala));

  let fonte = img;
  let x = (img.naturalWidth - larguraFonte) / 2;
  let y = (img.naturalHeight - alturaFonte) / 2;
  const intermediarios = [];

  while (Math.max(larguraFonte, alturaFonte) > Math.max(largura, altura) * 2) {
    // Teto de 4096px: o Safari do iPhone não desenha canvas muito grande (foto de câmera de 100+ MP).
    const fator = Math.min(0.5, LADO_MAXIMO_CANVAS / Math.max(larguraFonte, alturaFonte));
    const larguraMetade = Math.max(1, Math.ceil(larguraFonte * fator));
    const alturaMetade = Math.max(1, Math.ceil(alturaFonte * fator));
    const { canvas, ctx } = novoCanvas(larguraMetade, alturaMetade);
    ctx.drawImage(fonte, x, y, larguraFonte, alturaFonte, 0, 0, larguraMetade, alturaMetade);
    intermediarios.push(canvas);
    fonte = canvas;
    x = 0;
    y = 0;
    larguraFonte = larguraMetade;
    alturaFonte = alturaMetade;
  }

  const { canvas, ctx } = novoCanvas(largura, altura);
  ctx.fillStyle = '#FFFFFF'; // PNG transparente fica com fundo branco
  ctx.fillRect(0, 0, largura, altura);
  ctx.drawImage(fonte, x, y, larguraFonte, alturaFonte, 0, 0, largura, altura);
  intermediarios.forEach(liberar);
  return canvas;
}

function canvasParaBlob(canvas, tipo, qualidade) {
  return new Promise((resolver, rejeitar) => {
    canvas.toBlob((blob) => (blob ? resolver(blob) : rejeitar(new Error(ERRO_PROCESSAR))), tipo, qualidade);
  });
}

// Gera o arquivo no formato pedido. Quando o navegador não sabe gerar WebP
// (o Safari do iPhone devolve PNG), o chamador refaz em JPEG.
async function gerar(img, lado, formato, qualidade = formato.qualidade, { quadrado = false } = {}) {
  const canvas = desenhar(img, lado, { quadrado });
  try {
    return await canvasParaBlob(canvas, formato.tipo, qualidade);
  } finally {
    liberar(canvas);
  }
}

/**
 * Prepara a foto escolhida (câmera ou galeria) para o site.
 * @param {File|Blob} arquivo
 * @returns {Promise<{ foto: Blob, miniatura: Blob, extensao: 'webp'|'jpg', bytesFoto: number, bytesMiniatura: number }>}
 * Lança Error com mensagem em português pronta para mostrar.
 */
export async function comprimirFoto(arquivo) {
  if (!arquivo || typeof arquivo.size !== 'number') throw new Error('Nenhuma foto escolhida.');
  if (arquivo.size === 0) throw new Error('O arquivo da foto está vazio. Escolha outra foto.');
  if (arquivo.size > LIMITE_ARQUIVO) {
    throw new Error('A foto tem mais de 25 MB. Escolha uma foto menor ou tire outra com a câmera.');
  }
  if (arquivo.type && !arquivo.type.startsWith('image/')) throw new Error(ERRO_FORMATO);

  const url = URL.createObjectURL(arquivo);
  try {
    const img = await abrirImagem(url);

    let formato = WEBP;
    let foto = await gerar(img, LADO_FOTO, formato);
    if (foto.type !== WEBP.tipo) {
      formato = JPEG;
      foto = await gerar(img, LADO_FOTO, formato);
      if (foto.type !== JPEG.tipo) throw new Error(ERRO_PROCESSAR);
    }

    // Foto pesada: primeiro baixa a qualidade, depois o tamanho.
    if (foto.size > LIMITE_FOTO) foto = await gerar(img, LADO_FOTO, formato, QUALIDADE_MENOR);
    if (foto.size > LIMITE_FOTO) foto = await gerar(img, LADO_FOTO_REDUZIDA, formato, QUALIDADE_MENOR);

    // Só a miniatura é quadrada: ela fica num quadrado na lista e nas miniaturas da galeria.
    const miniatura = await gerar(img, LADO_MINIATURA, formato, formato.qualidade, { quadrado: true });
    if (miniatura.type !== formato.tipo) throw new Error(ERRO_PROCESSAR);

    return {
      foto,
      miniatura,
      extensao: formato.extensao,
      bytesFoto: foto.size,
      bytesMiniatura: miniatura.size,
    };
  } catch (erro) {
    if (erro instanceof Error && (erro.message === ERRO_FORMATO || erro.message === ERRO_PROCESSAR)) throw erro;
    throw new Error(ERRO_PROCESSAR);
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Base64 de um Blob sem estourar a memória: FileReader e só a parte depois da vírgula.
// (Nunca btoa(String.fromCharCode(...bytes)) nem fetch(dataURL): a CSP do painel bloqueia.)
export function blobParaBase64(blob) {
  return new Promise((resolver, rejeitar) => {
    const leitor = new FileReader();
    leitor.onload = () => {
      const texto = String(leitor.result || '');
      resolver(texto.slice(texto.indexOf(',') + 1));
    };
    leitor.onerror = () => rejeitar(leitor.error || new Error('Não foi possível ler a foto.'));
    leitor.readAsDataURL(blob);
  });
}

/* ---------- IndexedDB (banco "saraStore", object store "fotos") ---------- */

const BANCO = 'saraStore';
const LOJA = 'fotos';
// 2: chegada das fotos extras. Um painel antigo ainda aberto em outra aba fecha a conexão e não
// consegue abrir de novo; assim a limpeza dele, que não conhece "fotosExtras", não apaga as fotos novas.
const VERSAO_BANCO = 2;
const ERRO_BANCO = 'Este aparelho não deixou guardar a foto (memória do navegador indisponível ou cheia).';

let promessaBanco = null;

function abrirBanco() {
  if (promessaBanco) return promessaBanco;
  promessaBanco = new Promise((resolver, rejeitar) => {
    let pedido;
    try {
      pedido = globalThis.indexedDB.open(BANCO, VERSAO_BANCO);
    } catch {
      rejeitar(new Error(ERRO_BANCO));
      return;
    }
    pedido.onupgradeneeded = () => {
      const banco = pedido.result;
      if (!banco.objectStoreNames.contains(LOJA)) banco.createObjectStore(LOJA);
    };
    pedido.onsuccess = () => {
      const banco = pedido.result;
      banco.onversionchange = () => {
        banco.close();
        promessaBanco = null;
      };
      banco.onclose = () => {
        promessaBanco = null;
      };
      resolver(banco);
    };
    pedido.onerror = () => rejeitar(new Error(ERRO_BANCO));
    pedido.onblocked = () => rejeitar(new Error('Feche as outras abas do painel e tente de novo.'));
  });
  promessaBanco.catch(() => {
    promessaBanco = null;
  });
  return promessaBanco;
}

// Roda uma operação numa transação e resolve com o resultado quando ela termina.
async function noBanco(modo, operacao) {
  const banco = await abrirBanco();
  return new Promise((resolver, rejeitar) => {
    let transacao;
    try {
      transacao = banco.transaction(LOJA, modo);
    } catch {
      promessaBanco = null;
      rejeitar(new Error(ERRO_BANCO));
      return;
    }
    const pedido = operacao(transacao.objectStore(LOJA));
    transacao.oncomplete = () => resolver(pedido ? pedido.result : undefined);
    transacao.onerror = () => rejeitar(new Error(ERRO_BANCO));
    transacao.onabort = () => rejeitar(new Error(ERRO_BANCO));
  });
}

function blobParaArrayBuffer(blob) {
  if (typeof blob.arrayBuffer === 'function') return blob.arrayBuffer();
  return new Promise((resolver, rejeitar) => {
    const leitor = new FileReader();
    leitor.onload = () => resolver(leitor.result);
    leitor.onerror = () => rejeitar(leitor.error || new Error(ERRO_BANCO));
    leitor.readAsArrayBuffer(blob);
  });
}

// Guarda os bytes (e não o Blob) porque versões antigas do Safari falham ao gravar Blob no IndexedDB.
export async function salvarFoto(chave, blob) {
  const dados = await blobParaArrayBuffer(blob);
  await noBanco('readwrite', (loja) => loja.put({ tipo: blob.type, dados }, chave));
}

export async function lerFoto(chave) {
  const valor = await noBanco('readonly', (loja) => loja.get(chave));
  if (!valor) return null;
  if (valor instanceof Blob) return valor;
  if (valor.dados) return new Blob([valor.dados], { type: valor.tipo || 'image/jpeg' });
  return null;
}

export async function apagarFoto(chave) {
  await noBanco('readwrite', (loja) => loja.delete(chave));
}

export async function listarFotos() {
  const chaves = await noBanco('readonly', (loja) => loja.getAllKeys());
  return (chaves || []).map(String);
}
