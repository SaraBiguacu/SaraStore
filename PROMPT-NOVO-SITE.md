<!--
  PARA VOCÊ (não precisa copiar este bloco):
  1. Confira os 3 itens marcados com [CONFIRMAR] na seção 4 (pagamento, onde fica a loja, horário da loja).
     Troque pelo valor certo e apague a marcação. O que ficar com [CONFIRMAR] NÃO vai aparecer no site.
  2. Copie TUDO entre "=== INÍCIO DO PROMPT ===" e "=== FIM DO PROMPT ===" e mande para a IA.
  3. Este arquivo tem o login e explica o link escondido: depois de usar, apague-o ou tire da pasta do repositório.
     (Ele já está configurado para o git ignorar, mas não custa.)
-->

=== INÍCIO DO PROMPT ===

# Refazer o site "SARA STORE": catálogo informativo da Igreja Sara Nossa Terra Biguaçu

Você vai **reconstruir do zero** o site deste repositório (`index.html`, `script.js`, `styles.css`), publicado no **GitHub Pages** em `https://leonardo681.github.io/PRACIMA/` (repositório `leonardo681/PRACIMA`, branch `main`, pasta raiz). Leia os 3 arquivos atuais antes de começar: eles têm os 20 produtos que serão migrados.

Escreva todos os textos da interface e suas respostas em **português do Brasil**. Se alguma parte deste pedido for impossível ou conflitante, **avise antes de implementar** em vez de inventar uma alternativa por conta própria. Se tiver dúvida sobre o que eu quero, pergunte antes de começar.

---

## 1. O que é o site

- Um **catálogo de preços** no estilo **cardápio digital de restaurante** (iFood/Goomer) com os produtos da loja da igreja: camisetas, livros, bíblias e outros.
- **É só informativo e não vende nada.** As vendas continuam 100% presenciais, no balcão da loja. O objetivo é que as pessoas vejam produto e preço sem precisar perguntar, e que os atendentes não precisem decorar preços nem procurar em tabela.
- Também serve para **divulgar a igreja** (cultos, endereço, Instagram).
- A maioria vai abrir pelo **celular**, muitas vezes por um **QR Code** impresso na loja. Mobile-first sempre.
- O nome do site continua **SARA STORE**.

## 2. Regras obrigatórias (não quebre nenhuma)

1. **100% estático, rodando só no GitHub Pages.** Sem backend, servidor ou banco de dados. Nada de Firebase, Supabase, Netlify Functions ou serviço de terceiros para guardar dados.
2. **Sem etapa de build.** HTML, CSS e JavaScript puro (ES modules). Nada de React, Vue, Angular, Next, Vite ou npm. O GitHub Pages serve os arquivos exatamente como estão no repositório.
3. **Caminhos sempre relativos** (`data/produtos.json`, nunca `/data/produtos.json`), porque o site fica dentro de `/PRACIMA/`.
4. **Nada de e-commerce:**
   - sem carrinho, sem quantidade, sem checkout;
   - sem botões "Comprar", "Pedir", "Reservar" ou "Encomendar";
   - sem Pix, link de pagamento ou frete;
   - sem "Pedir pelo WhatsApp".
5. **O site não informa estoque nem disponibilidade.** Não existe selo "Esgotado", "Últimas unidades" ou "Disponível". O produto fica no site até o administrador **ocultar** ou **excluir**.
6. **Nunca use `innerHTML` com dados de produto ou da igreja.** Monte o DOM com `createElement` + `textContent`. Os dados agora são editados pelo painel, e isso evita XSS.
7. **Nenhum token, senha em texto puro ou segredo pode ir para o repositório**, nem em código, comentário, README ou mensagem de commit.
8. **Não revele o acesso ao painel em nenhum arquivo do repositório**, porque o repositório é público. Isso vale para o README, comentários como "link secreto" ou "senha: baby" e mensagens de commit. Onde fica o acesso e qual é o login, você me diz **só na sua resposta final no chat**.
9. **Não commite o arquivo `PROMPT-NOVO-SITE.md`** (ele contém o login). Antes do primeiro commit, confira com `git status` que ele não está indo junto.
10. **Git:**
    - Trabalhe numa branch nova, `novo-site`, criada a partir da `main`, com um commit ao fim de cada fase (seção 3).
    - **Não faça commit, push nem merge na `main` sem eu pedir.** O site no ar não pode quebrar enquanto você trabalha.
11. **Nunca execute um "Publicar" de verdade** nem chame a API do GitHub para escrever. Você não tem a chave e não deve pedir por ela. O primeiro teste real eu mesmo faço.
12. Sem Google Analytics e sem cookies de rastreamento (isso evita o banner de LGPD).

## 3. Ordem de entrega

Se faltar tempo ou contexto, **pare ao fim de uma fase completa**, diga em qual parou e o que falta. Não comece uma fase antes da anterior estar funcionando.

1. **Fase 1 — Site público:**
   - `data/produtos.json` (migrado) e `data/igreja.json`;
   - `index.html`, `css/style.css`, `js/app.js` e `js/comum.js`;
   - catálogo com busca, chips, lista estilo cardápio, detalhe simples (Fechar/Esc), variações e selo/seção Novidades;
   - seção da igreja, rodapé com o link escondido, tratamento de carregamento e erros, e `.nojekyll`.
2. **Fase 2 — Painel essencial:**
   - login e saída, chave do GitHub, leitura dos dados e rascunho;
   - criar, editar, ocultar e excluir produtos; criar, renomear e excluir categorias;
   - fotos com compressão, **Publicar** e "Baixar produtos.json";
   - tela "Ajuda" do painel.
3. **Fase 3 — Testes e documentação:**
   - testes automatizados (seção 16);
   - README;
   - roteiro da primeira publicação.
4. **Fase 4 — Refinamentos:**
   - botão Compartilhar e link direto `#produto=` com controle de histórico;
   - Duplicar produto, setas ↑ ↓ de ordem;
   - cópia offline, esqueleto de carregamento, aviso "Já está no ar".
5. **Fase 5 — Extras** (seção 15).

## 4. Informações da igreja

Fonte: Instagram oficial @sara.biguacu e Google Maps.

- **Nome:** Igreja Sara Nossa Terra Biguaçu ("Sara Biguaçu")
- **Slogan:** "Uma igreja para você"
- **Endereço:** R. Gregório Flôr, 160 – Rio Caveiras, Biguaçu – SC
- **Como chegar:** `https://www.google.com/maps/dir/?api=1&destination=-27.5055028,-48.6497846`
- **Cultos:**
  - Domingo 10h e 19h – Culto da Família
  - Terça 20h – Fé e Milagres
  - Sábado 18h – Arena Jovem
  - Sábado 20h30 – Conexão
- **Instagram:** `https://www.instagram.com/sara.biguacu/` (@sara.biguacu)
- **YouTube (cultos online):** `https://www.youtube.com/c/SaraBigua%C3%A7u`
- **Ministérios:** Sara Kids, Arena (jovens), Conexão, Mulheres, Casais, Células, Projeto Social
- **Loja:**
  - Formas de pagamento: Pix, cartão e dinheiro **[CONFIRMAR]**
  - Onde fica: balcão da loja, dentro da igreja **[CONFIRMAR]**
  - Horário: antes e depois dos cultos **[CONFIRMAR]**

Regras:
- Tudo isso fica em `data/igreja.json`, não espalhado pelo HTML.
- **Se algum item ainda estiver marcado [CONFIRMAR] quando você receber este pedido, ele NÃO pode aparecer no site.** Deixe o campo vazio (`""` ou `[]`) no `igreja.json`, esconda a linha correspondente quando estiver vazia e, no fim, me liste o que preciso preencher. Nunca copie a marcação "[CONFIRMAR]" para os arquivos.

## 5. Identidade visual

Siga a identidade do Instagram @sara.biguacu: gradiente bronze/dourado, creme, quase preto e branco, com tom acolhedor ("Seja bem-vindo!", "Uma igreja para você").

**Cores** (defina todas como variáveis CSS; os contrastes abaixo já foram medidos pela WCAG):

| Variável | Valor | Uso |
|---|---|---|
| `--bronze-claro` / `--bronze` | `#AB9472` / `#977037` | **Só decoração sem texto**: faixas, bordas, ícones, fundo do logo. Branco sobre `#977037` dá 4,48:1 e **reprova**. |
| `--bronze-escuro` | `#7A5A2B` | Fundo com texto branco (6,32:1): chip ativo, botões. Também texto bronze sobre fundo claro (preços, títulos): 5,95:1 no card e 4,79:1 no creme. |
| cabeçalho | `linear-gradient(135deg, #6F5227, #8A6530)` | Texto branco: 7,21:1 e 5,27:1. |
| `--creme` | `#E4E0D5` | Fundo da página. |
| `--card` | `#FAF8F3` | Superfícies, linhas de produto. |
| `--texto` | `#111111` | Texto principal (17,8:1 no card). |
| `--texto-2` | `#5A5248` | Texto secundário (7,23:1 no card, 5,82:1 no creme). |
| `--acento` | `#C62737` | Vermelho da marca Sara. Opcional e pontual, só sobre branco ou `#FAF8F3`, nunca sobre o creme. |

- **Contraste mínimo de 4,5:1 em todo texto.**
- **Fonte:** Roboto, carregada **só por `<link>` no `<head>` do `index.html`** (com `preconnect` e `display=swap`), nunca por `@import` no CSS. Pilha completa: `Roboto, system-ui, -apple-system, 'Segoe UI', Arial, sans-serif`. O painel usa só a pilha do sistema.
- **Logo:** vou colocar o arquivo em `img/logo.png` (a chama branca da Sara sobre gradiente bronze, a foto de perfil do Instagram). Se o arquivo não existir, use como fallback um círculo com gradiente bronze e o texto "sara" em branco, sem quebrar o layout.

## 6. Estrutura de arquivos

```
index.html            ← catálogo público
painel.html           ← painel admin (não é linkado em lugar nenhum, só pelo rodapé)
css/style.css         ← só o site público
css/painel.css
js/comum.js           ← funções puras compartilhadas (sem acesso ao DOM)
js/app.js             ← catálogo
js/github.js          ← chamadas à API do GitHub e fluxo "Publicar" (recebe fetch por parâmetro, para dar para testar)
js/painel.js          ← interface do painel (nenhum JS inline no painel.html)
data/produtos.json    ← categorias + produtos (editado pelo painel)
data/igreja.json      ← dados da igreja e da loja
img/logo.png          ← eu coloco
img/produtos/         ← fotos enviadas pelo painel
testes/               ← testes com node --test
.nojekyll             ← arquivo vazio
README.md             ← ver seção 16
```

- `js/comum.js` reúne: slug, normalizar texto para busca, formatar preço, `lerPreco`, data local, base64 ↔ UTF-8, `aplicarAlteracoes` e `validarCatalogo`. O `painel.js` **nunca** importa o `app.js`.
- Apague `script.js` e `styles.css` antigos depois de migrar os produtos.
- **Versão nas URLs:**
  - CSS e JS levam versão na URL: `css/style.css?v=1`, `js/app.js?v=1`.
  - **Todos os `import` entre módulos também levam versão:** `import { formatarPreco } from './comum.js?v=1'`. O `?v=` da tag `<script>` não se propaga para os `import`, e o GitHub Pages faz cache de 10 minutos.
  - O número sobe a cada mudança de código.
  - Não use `<script type="importmap">` inline.

## 7. Modelo de dados

### `data/produtos.json`

```json
{
  "versao": 1,
  "atualizadoEm": "2026-10-09T20:00:00-03:00",
  "categorias": [
    { "id": "camisetas", "nome": "Camisetas", "ordem": 1 },
    { "id": "livros",    "nome": "Livros",    "ordem": 2 },
    { "id": "biblias",   "nome": "Bíblias",   "ordem": 3 },
    { "id": "outros",    "nome": "Outros",    "ordem": 4 }
  ],
  "produtos": [
    {
      "id": "camiseta-jesus-m1x2k3",
      "categoria": "camisetas",
      "nome": "Camiseta Jesus",
      "descricao": "Camiseta com mensagem cristã, leve e confortável.",
      "info": "Tamanhos P ao GG",
      "precoCentavos": 7450,
      "variacoes": [ { "nome": "Infantil", "precoCentavos": 5990 } ],
      "imagem": "img/produtos/camiseta-jesus-m1x2k3-lq9.webp",
      "miniatura": "img/produtos/camiseta-jesus-m1x2k3-lq9-mini.webp",
      "visivel": true,
      "novidadeAte": "2026-11-09",
      "ordem": 10
    }
  ]
}
```

**Preço:**
- Sempre em centavos inteiros (`precoCentavos` maior que 0). Nunca string com "R$" nem float.
- Exiba com **um único** formatador reaproveitado: `new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })`. Ele coloca um espaço não separável (U+00A0) depois de "R$". **Não troque** esse espaço: é ele que impede o preço de quebrar a linha.

**Visibilidade:**
- `visivel: false` = **oculto**: o produto não aparece no site público, mas continua salvo para ser reativado sem redigitar.

**Campos opcionais:**
- `info`: texto curto, por exemplo tamanhos.
- `variacoes`: opções com preço próprio (Adulto/Infantil, capa dura/brochura).
  - Com variações, a lista mostra **"a partir de R$ X"** (o menor preço entre `precoCentavos` e as variações), e o detalhe mostra todos os preços.
- `novidadeAte`: data local no formato `AAAA-MM-DD`.
  - O selo "Novidade" aparece enquanto `hoje <= novidadeAte`, **comparando como texto**.
  - "Hoje" é montado com `getFullYear()`, `getMonth() + 1` e `getDate()` (com `padStart`).
  - Nunca use `new Date('AAAA-MM-DD')` (vira 21h do dia anterior no horário de Brasília) nem `toISOString().slice(0, 10)` (depois das 21h já dá o dia seguinte).
- `imagem` / `miniatura`: vazias = placeholder com o ícone da categoria (ícone genérico de sacola para categorias novas).

**`atualizadoEm`:**
- Gravado com o deslocamento local (`-03:00`).
- Exibido com `toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })`.

**IDs:**
- Produto: slug do nome + "-" + `Date.now().toString(36)`.
- Regra do slug:
  1. `normalize('NFD')`;
  2. remover os acentos (U+0300 a U+036F);
  3. passar para minúsculas;
  4. trocar toda sequência fora de `a-z0-9` por "-";
  5. tirar "-" das pontas.
- Categoria nova: slug do nome. Se já existir, acrescente "-2", "-3"…
- **O `id` nunca muda depois de criado.** Renomear produto ou categoria muda só o `nome`.

**Ordem:**
- Categorias são ordenadas por `ordem`.
- Produtos são ordenados por `ordem` e, em seguida, por `nome` com `localeCompare('pt-BR')`.
- Migração: categorias recebem 1 a 4. Produtos recebem 10, 20, 30… dentro de cada categoria, na ordem em que aparecem no `script.js`.
- Produto novo, duplicado ou que mudou de categoria: `ordem` = (maior `ordem` da categoria de destino, ou 0) + 10.
- Categoria nova: maior `ordem` + 1.

**Categoria inexistente:**
- No site público, um produto cuja `categoria` não existe não aparece.
- No painel, ele aparece no grupo "Sem categoria" para ser corrigido.

**Migração dos 20 produtos atuais:**
- Converta os preços: "R$ 74,50" → 7450.
- **Migre os produtos sem foto** (`imagem` e `miniatura` vazias). As fotos atuais são genéricas do Unsplash e não mostram os produtos reais (a caneca, por exemplo, usa foto de camiseta). As fotos reais serão enviadas pelo painel.
- Nunca aceite URL externa de imagem.

**Formato do arquivo:** salvar com `JSON.stringify(dados, null, 2) + "\n"`, em UTF-8.

### `data/igreja.json`

Contém os dados da seção 4:
- nome, slogan e endereço;
- link do mapa;
- cultos (dia, horário e nome);
- links (Instagram e YouTube);
- ministérios;
- um bloco `loja` com `pagamentos`, `local`, `horario` e `aviso` ("Vendas somente presenciais. Preços podem mudar; confirme no balcão.").

## 8. Site público (`index.html`)

Uma página única, de cima para baixo:

1. **Cabeçalho compacto** (cerca de 60px, rola junto com a página):
   - logo + "SARA STORE";
   - subtítulo "Igreja Sara Nossa Terra Biguaçu • Catálogo de preços";
   - sem imagem gigante e sem carrossel.
2. **Faixa informativa** de uma linha:
   - "Vendas somente presenciais no balcão da loja";
   - acrescente "• Pix, cartão e dinheiro" só se `loja.pagamentos` estiver preenchido.
3. **Busca:**
   - campo "Buscar produto…" com 48px de altura e botão de limpar;
   - filtra enquanto a pessoa digita, por nome, descrição, info e categoria, **ignorando acentos e maiúsculas**;
   - mostra o número de resultados, anunciado em `aria-live`;
   - durante a busca, esconda a seção Novidades (para nenhum produto aparecer duas vezes), as categorias sem resultado e os chips, e conte cada produto uma vez só;
   - sem resultados: "Nenhum produto encontrado para "xyz". Pergunte no balcão!".
4. **Chips de categoria fixos no topo** (`position: sticky`):
   - rolam na horizontal;
   - destacam a categoria atual com `IntersectionObserver` (scroll-spy) e `aria-current`;
   - no clique: `preventDefault()` + `scrollIntoView()`, **sem mudar o hash e sem criar entradas no histórico**;
   - são atalhos numa lista contínua, NÃO abas que escondem conteúdo;
   - as seções têm id `cat-<id>` e `scroll-margin-top`;
   - categorias sem produtos visíveis não aparecem.
5. **Seção "Novidades"** no topo, só se algum produto estiver dentro do prazo de `novidadeAte`.
6. **Seções por categoria** (`h2` com o nome), com os produtos em **linhas estilo cardápio**:
   - Meta: pelo menos 5 produtos por tela em 360×640 (hoje é 1 por tela).
   - Cada linha tem:
     - miniatura quadrada com cantos arredondados (72px no celular, 88px a partir de 720px);
     - nome em negrito (até 2 linhas);
     - descrição (1 linha no celular, 2 a partir de 720px, com line-clamp);
     - `info`;
     - **preço em destaque** (negrito, 17px ou mais, nunca quebra linha).
   - A linha inteira é um `<button type="button">` que abre o detalhe. **Dentro do botão use só `<img>` e `<span>`** (com `display: block` no CSS). Nada de `h3`, `p` ou `div` dentro dele.
   - Colunas: 1 no celular, 2 a partir de 720px, 3 a partir de 1100px.
7. **Detalhe do produto** com `<dialog>` nativo e `showModal()`:
   - Formato:
     - no celular, "bottom sheet" que sobe de baixo, com até 90dvh;
     - no desktop, centralizado, com a imagem à esquerda.
   - Conteúdo:
     - foto grande (só carrega quando abre o detalhe);
     - nome;
     - preço ou tabela de variações;
     - descrição e info;
     - a linha **"Venda somente no balcão da loja da igreja"**.
   - Botão Fechar com 44×44px. O foco volta para a linha que abriu o detalhe.
   - Fecha também com Esc e com toque fora.
   - Na fase 4 entram o botão Compartilhar e o link direto (seção 8.1).
8. **Seção da igreja** (faixa nas cores da marca):
   - "Igreja Sara Nossa Terra Biguaçu – Uma igreja para você";
   - "Primeira vez aqui? Seja bem-vindo!";
   - "Nossos cultos";
   - endereço + botão "Como chegar";
   - botões "Siga no Instagram @sara.biguacu" e "Cultos online no YouTube";
   - etiquetas dos ministérios;
   - **sem iframe de mapa** (é pesado e traz cookies); use só o link.
9. **Rodapé:**
   - "Preços atualizados em DD/MM/AAAA" (de `atualizadoEm`) • "Preços podem mudar; confirme no balcão.";
   - "© {ano atual} SARA STORE — **Todos os direitos reservados**" (o link escondido, seção 9);
   - "Igreja Sara Nossa Terra Biguaçu".
10. **Botão "voltar ao topo"**: 48px, só aparece depois de rolar cerca de 2 telas e não cobre preços.

**Carregamento e erros:**
- Carregue `produtos.json` e `igreja.json` **de forma independente**, nunca com um `Promise.all` que derrube tudo. Se o `igreja.json` falhar ou tiver erro de digitação, o catálogo continua aparecendo; só somem a seção da igreja e a faixa de pagamentos.
- Leia os arquivos com `fetch('data/produtos.json?v=' + Date.now(), { cache: 'no-store' })`.
- **O site público nunca chama `api.github.com`.** O limite é de 60 requisições por hora por IP, e o Wi-Fi da igreja é um IP só.
- Se o `produtos.json` falhar:
  - "Não foi possível carregar o catálogo. Verifique sua internet." + botão "Tentar novamente";
  - na fase 4, mostre a última cópia boa salva em `localStorage` (com o aviso "Mostrando a última versão salva").
- Tenha um `<noscript>` com um aviso amigável.
- **Não use service worker**: ele pode mostrar preço antigo.
- Cuidado com `localStorage`:
  - todo acesso dentro de `try/catch`;
  - use só chaves com o prefixo `saraStore:`;
  - **nunca chame `localStorage.clear()`**, porque o endereço `leonardo681.github.io` é compartilhado com outros sites do mesmo usuário.

**Meta tags:**
- `<title>SARA STORE – Catálogo de preços | Sara Biguaçu</title>` e meta description;
- Open Graph (`og:title`, `og:description` e `og:image` com URL absoluta), para o link ficar bonito no WhatsApp;
- favicon e apple-touch-icon a partir do logo;
- `<meta name="theme-color">`.

### 8.1 Link direto e botão Voltar (fase 4; siga exatamente)

- **Abrir pela lista:** `history.pushState({ produto: id }, '', '#produto=' + id)` e depois `dialog.showModal()`.
- **Fechar por qualquer meio** (Fechar, Esc, toque fora ou Voltar do Android): trate tudo no evento `close` do dialog com `if (history.state && history.state.produto) history.back();`. No Chrome 120+ para Android, o Voltar fecha o `<dialog>` sozinho, sem mexer no histórico.
- **No `popstate`:**
  - se o dialog estiver aberto e `history.state?.produto` não existir, chame `dialog.close()`. Nunca chame `history.back()` dentro do `popstate`;
  - se existir e o dialog estiver fechado (botão Avançar), abra esse produto.
- **Entrada por link compartilhado** (`#produto=<id>` já na URL ao carregar):
  1. espere os dados;
  2. `history.replaceState(null, '', location.pathname + location.search)`;
  3. `pushState` e abra o produto.

  Assim, fechar o detalhe volta para o catálogo em vez de sair do site.
- **Id inexistente ou produto oculto:** limpe o hash e mostre o aviso discreto "Este produto não está mais no catálogo".
- **Botão Compartilhar:** `navigator.share`, com alternativa de copiar o link `https://leonardo681.github.io/PRACIMA/#produto=<id>`.

## 9. Link escondido no rodapé

- O texto **"Todos os direitos reservados"** abre o painel com um toque, mas **ninguém pode perceber que é um link**.
- Faça um `<span id="copyright">`, **não um `<a href>`** (assim a URL não aparece ao passar o mouse nem no toque longo do celular).
- O listener de clique deve ficar **diretamente no próprio `<span>`**, nunca por delegação no `document` ou no `body`: no Safari do iPhone, clique em elemento não interativo só dispara assim. O listener faz `location.href = 'painel.html'`.
- CSS: `color: inherit; cursor: default; text-decoration: none; user-select: none; -webkit-tap-highlight-color: transparent;`. Sem hover, sem `title` e sem tooltip: idêntico ao texto em volta.
- `painel.html` não é linkado em nenhum outro lugar e não entra em sitemap.
- **Não crie `robots.txt` mencionando o painel**, porque isso divulgaria o endereço. Use só `<meta name="robots" content="noindex, nofollow">` dentro do `painel.html`.

## 10. Painel administrativo (`painel.html` + `js/painel.js` + `js/github.js`)

### 10.1 Login (tropa / baby) e saída

- Tela com usuário e senha. Login: **usuário `tropa`**, **senha `baby`**.
- **A senha não pode ficar em texto puro no código.**
  - Calcule o SHA-256 de `` `${usuario}:${senha}` `` com `crypto.subtle.digest` (bytes via `TextEncoder`), em hexadecimal.
  - Compare com `72e17a03b4ebd509d124d943d79910ef280d4b0f24dc7ff4ba845bacfe0816bc`.
  - Não escreva no código nenhum comentário dizendo qual é a senha.
- `crypto.subtle` só existe em HTTPS ou `localhost`. Se `!window.isSecureContext || !crypto.subtle`, mostre "Abra pelo endereço https://leonardo681.github.io/PRACIMA/" em vez de quebrar.
- Login certo → `sessionStorage['saraStore:logado'] = '1'`.
- **"Sair"** apaga só o login da sessão (e o token, se ele estiver só na sessão). **Nunca apaga o rascunho nem as fotos pendentes.**
- O rascunho só é apagado por **"Descartar alterações"** (com confirmação) ou depois de publicar com sucesso.

### 10.2 Chave do GitHub (é ela que realmente protege o site)

Depois do login, se não houver token salvo, mostre a tela **"Conectar ao GitHub (só na primeira vez)"** com este passo a passo:

1. Entre no GitHub **com a conta `leonardo681`** (a dona do repositório). Uma chave criada em outra conta não funciona, mesmo que essa conta seja colaboradora.
2. Ative a verificação em duas etapas (2FA) e **guarde os códigos de recuperação**.
3. Abra: `https://github.com/settings/personal-access-tokens/new?name=Painel%20Sara%20Store&description=Catalogo%20PRACIMA&target_name=leonardo681&expires_in=366&contents=write`
   (se o link pré-preenchido não funcionar: Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate new token).
4. Configure a chave:
   - em "Repository access", escolha **Only select repositories → PRACIMA**;
   - em permissões, **Contents: Read and write** (Metadata fica só leitura, automaticamente);
   - validade de 1 ano.
5. Clique em "Generate token", copie a chave (começa com `github_pat_`) e cole no painel. Se perder, não tem problema: é só criar outra e apagar a antiga.

Regras:
- O campo é `type="password"`.
- Checkbox **"Lembrar neste aparelho"**:
  - marcado → `localStorage['saraStore:token']`;
  - desmarcado (padrão) → `sessionStorage`;
  - abaixo dele, o texto: "Marque só no seu celular pessoal, com bloqueio de tela".
- Botão **"Esquecer a chave neste aparelho"**: apaga das duas memórias (o rascunho continua).
- **Valide a chave com escrita, não com leitura.** O repositório é público, então qualquer chave consegue ler.
  - Faça `POST /repos/leonardo681/PRACIMA/git/blobs` com `{"content":"teste","encoding":"utf-8"}`. Isso não cria commit.
  - `201` = ok.
  - `401` = chave inválida ou expirada.
  - `403` ou `404` = a chave não tem permissão de escrita no PRACIMA.
  - Depois, `GET /user` para mostrar "Conectado como leonardo681".
- Botão **"Continuar sem chave (só rascunho)"**:
  - tudo funciona, menos "Publicar" e o envio de fotos;
  - o campo de foto fica desativado, com o texto "Para enviar fotos, conecte a chave do GitHub";
  - o botão **"Baixar produtos.json"** gera o resultado de `aplicarAlteracoes` e mostra como publicar à mão: github.com → PRACIMA → `data/produtos.json` → lápis → apagar tudo e colar → Commit changes ("isso substitui o arquivo inteiro").

### 10.3 De onde o painel lê os dados

- **Com chave:** sempre a versão mais nova pela API (passos 1 a 3 da seção 11), **nunca pelo GitHub Pages**, que pode estar até 10 minutos atrasado.
- **Sem chave:** `data/produtos.json?v=` + `Date.now()` com `cache: 'no-store'`, mais o aviso "Pode estar desatualizado em até 10 minutos".
- O que aparece no painel é `aplicarAlteracoes(base, ops)` (seção 10.5).
- Depois de publicar com sucesso, a nova base é **exatamente o JSON que acabou de ser commitado** (guardado em memória). Não recarregue do Pages.
- No topo, mostre "Dados de DD/MM às HH:MM" e um botão "Atualizar".

### 10.4 Funções do painel (feito para usar no celular, no balcão)

**Lista de produtos:**
- Agrupada por categoria, com busca.
- Cada linha tem miniatura, nome, preço, a chave **Visível / Oculto** e os botões **Editar** e **Excluir** (na fase 4, também **Duplicar** e as setas **↑ ↓**).
- **Excluir** pede confirmação e sugere ocultar: "Ocultar guarda o produto para você reativar depois".

**Formulário de novo produto / editar:**
- **nome*** e **categoria*** (select);
- **preço*** (veja `lerPreco` abaixo);
- descrição e info curta;
- variações: adicionar e remover linhas de nome + preço;
- foto (câmera ou galeria, seção 12), com prévia;
- checkbox **"Novidade"**:
  - marcar define `novidadeAte` = hoje + 30 dias (data local);
  - se o produto já tem uma data futura, o checkbox vem marcado mostrando "Novidade até DD/MM", e salvar de novo **não** renova a data;
  - desmarcar remove o campo.

**Preço, com a função pura `lerPreco(texto) → centavos | null` em `comum.js`:**
- **Sem ponto flutuante.** Tire "R$" e os espaços, separe reais e centavos e calcule `reais * 100 + centavos`. Nunca use `parseFloat(x) * 100`: "0,29" viraria 28 centavos.
- Aceita:
  - "74" → 7400, "74,5" → 7450, "74,50" → 7450;
  - "R$ 74,50" → 7450;
  - "1.234,50" → 123450, "1.234" → 123400;
  - "0,29" → 29, "1,15" → 115;
  - "74.50" → 7450: ponto seguido de exatamente 1 ou 2 dígitos no fim, sem vírgula, é separador decimal (alguns teclados de Android só têm ponto). Ponto seguido de 3 dígitos é milhar.
- Rejeita (`null`): vazio, zero, negativo, letras, mais de 2 casas decimais e valores acima de R$ 100.000,00.
- Campo `<input inputmode="decimal" autocomplete="off">` **sem máscara durante a digitação**. Formate como "74,50" só ao sair do campo e mostre o erro embaixo dele.
- Vale o mesmo para o preço de cada variação.

**Categorias:**
- Criar, renomear e excluir. Na fase 4, também reordenar com ↑ ↓.
- Só exclua uma categoria **sem nenhum produto, incluindo os ocultos**. Se houver produtos, peça para movê-los antes.

**Setas ↑ ↓ (fase 4):**
- Renumere a categoria inteira (10, 20, 30… na ordem exibida) e troque o produto com o vizinho.
- Gere `alterar { ordem }` só para os produtos cujo valor mudou.
- Para categorias, a mesma lógica com 1, 2, 3…

**Duplicar (fase 4):** id novo, nome "‹nome› (cópia)", sem foto.

**Barra fixa embaixo:** "**N alterações não publicadas** • [Publicar]", com o botão "Descartar alterações". Use `beforeunload` para avisar se a pessoa sair com alterações não publicadas.

**Tela "Ajuda"** (dentro do painel, depois do login), em linguagem simples:
- como adicionar, ocultar e excluir produtos;
- como publicar;
- quanto tempo demora para aparecer no site;
- o que fazer se a chave expirar ou se perder;
- a explicação de segurança da seção 13.

**Tamanho dos controles:** botões de toque com 44px ou mais e confirmação em tudo que apaga.

### 10.5 Formato do rascunho (siga exatamente)

`localStorage['saraStore:rascunho']` = `{ "ops": [ ... ] }`. Cada operação é uma destas:
- `{ "tipo": "produto", "acao": "criar", "id": "...", "dados": { produto completo } }`
- `{ "tipo": "produto", "acao": "alterar", "id": "...", "campos": { só os campos que mudaram } }`
  - Um campo com valor `null` significa remover o campo (ex.: `novidadeAte`).
- `{ "tipo": "produto", "acao": "excluir", "id": "..." }`
- `{ "tipo": "categoria", "acao": "criar" | "alterar" | "excluir", ... }`, no mesmo formato.

**Compacte por id a cada alteração:**
- criar + alterar = um `criar` com os dados atualizados;
- criar + excluir = nada (e apague a foto pendente);
- vários `alterar` = um só, com os campos mesclados;
- alterar + excluir = `excluir`;
- um `alterar` que volta ao valor original desaparece.

O contador "N alterações" é o número de ops depois de compactar.

**Função pura `aplicarAlteracoes(base, ops) → { dados, avisos }`** em `comum.js`. É usada tanto para mostrar o painel quanto no passo 3 do Publicar:
- `criar`: insere se o id não existir.
- `alterar`: aplica só os `campos`, se o id existir. Se não existir, ignora e gera o aviso "‹nome› foi excluído em outro aparelho; sua alteração foi descartada".
- `excluir`: remove, se existir.
- `excluir` categoria: só se nenhum produto do resultado (visível **ou oculto**) usar a categoria. Senão, ignora e avisa.

**`validarCatalogo(dados)` antes de publicar.** Não publique se falhar nenhuma destas regras e mostre qual produto corrigir:
- todo produto tem `categoria` existente;
- `nome` não vazio;
- `precoCentavos` inteiro maior que 0 (inclusive nas variações);
- ids únicos;
- nenhum valor começando com `pendente:`.

Mostre os `avisos` antes de confirmar a publicação.

## 11. Como o painel publica (especificação técnica; siga à risca)

O painel grava direto no repositório pela **API REST do GitHub**, que aceita CORS do navegador. Cada clique em "Publicar" gera **um único commit**: o GitHub Pages tem limite de cerca de 10 builds por hora, e um commit por foto estouraria esse limite.

**Constantes no topo do `js/github.js`:**
- `OWNER = 'leonardo681'`, `REPO = 'PRACIMA'`, `BRANCH = 'main'`;
- `API = 'https://api.github.com'`;
- `API_VERSION = '2026-03-10'`.

**Cabeçalhos em toda chamada:**
- `Accept: application/vnd.github+json`;
- `Authorization: Bearer <token>`;
- `X-GitHub-Api-Version: API_VERSION`;
- `Content-Type: application/json` nos POST e PATCH.

Todo `fetch` da API usa `{ cache: 'no-store' }`.

**As requisições são sempre em série** (nunca `Promise.all` em escrita), com cerca de 500 ms entre uma escrita e outra.

**Fluxo do "Publicar" (Git Data API):**

1. `GET /repos/O/R/git/ref/heads/main` → `headSha`.
2. `GET /repos/O/R/git/commits/{headSha}` → `tree.sha` = `baseTree`.
3. Pegue a versão atual do catálogo e aplique o rascunho:
   1. `GET /repos/O/R/contents/data/produtos.json?ref={headSha}`;
   2. decodifique **em UTF-8**: `atob(content.replace(/\s/g, ''))` → `Uint8Array` → `TextDecoder` → `JSON.parse`;
   3. `aplicarAlteracoes(esse JSON, ops)` (o rascunho é reaplicado sobre a versão fresca, sem sobrescrever o que outro aparelho mudou);
   4. `atualizadoEm` = agora, com o deslocamento local;
   5. `validarCatalogo`.
4. Envie as fotos novas: para cada valor `pendente:` no resultado,
   1. `POST /repos/O/R/git/blobs` com `{ content: <base64>, encoding: 'base64' }` → `sha`;
   2. caminho `img/produtos/{id}-{Date.now().toString(36)}.webp` (ou `.jpg`), e `-mini` para a miniatura;
   3. troque o `pendente:` pelo caminho no JSON;
   4. guarde em memória `{ chave → { caminho, sha } }` para que uma nova tentativa reaproveite o mesmo envio.
   - **Nunca sobrescreva** um caminho de imagem existente: o CDN do GitHub ignora `?v=` e mostraria a foto antiga.
5. `POST /repos/O/R/git/trees` com `base_tree: baseTree` e estas entradas:
   - cada imagem nova: `{ path, mode: '100644', type: 'blob', sha }`;
   - o catálogo: `{ path: 'data/produtos.json', mode: '100644', type: 'blob', content: JSON.stringify(dados, null, 2) + '\n' }` (texto UTF-8 puro, sem base64).
   - **Não apague fotos antigas nesta versão.** Elas ocupam pouco espaço, e apagá-las pode quebrar um rascunho feito em outro aparelho.
6. `POST /repos/O/R/git/commits` com `{ message: 'Catálogo: <resumo das alterações>', tree: <sha da nova tree>, parents: [headSha] }`.
7. `PATCH /repos/O/R/git/refs/heads/main` com `{ sha: <novo commit>, force: false }`.
   - **Nunca use `force: true`.**
   - `409` ou `422` significa que alguém publicou no meio. Espere 2 segundos e recomece do passo 1, até 3 tentativas.
   - Depois disso: "Outra pessoa alterou o catálogo agora. Recarregue e tente de novo."
8. **Sucesso:**
   - limpe o rascunho e as fotos do IndexedDB;
   - mostre "Enviado! O site atualiza para todos normalmente em 1 a 2 minutos (pode levar até 10).";
   - na fase 4: a cada 15 segundos, por até 12 minutos, busque o `data/produtos.json` público (`?v=Date.now()`, `cache: 'no-store'`). Quando o `atualizadoEm` bater, mostre "✅ Já está no ar para todos". Se não bater nesse tempo: "Ainda não apareceu. Veja em github.com/leonardo681/PRACIMA/actions se a publicação deu erro."

**Base64:**
- Texto: nunca use `btoa(texto)` direto em texto com acento. Não dá erro, mas grava "B�blia" corrompido. Use sempre `TextEncoder` → bytes → base64 (e o caminho inverso na leitura).
- Fotos (Blob): use `FileReader.readAsDataURL(blob)` e pegue só o que vem depois da vírgula.
  - Nunca use `btoa(String.fromCharCode(...bytes))` com o array inteiro: estoura com cerca de 300 KB.
  - Nunca use `fetch(dataURL)` nem `fetch(blobURL)`: a CSP do painel bloqueia.

**Erros** (mensagens em português; **nunca perca o rascunho**):

| Situação | O que fazer |
|---|---|
| Sem internet, `TypeError` ou `5xx` | "Sem conexão ou GitHub instável." + botão "Tentar novamente". |
| `401` | "Chave do GitHub inválida ou expirada." Apague o token e peça outro. |
| `403`/`429` com `retry-after` | "Muitas alterações seguidas, aguarde X segundos." |
| `x-ratelimit-remaining` igual a `0` | Espere até `x-ratelimit-reset`. |
| Outro `403`/`404` em escrita | "Esta chave não tem permissão de escrita no repositório PRACIMA (Contents: Read and write)." |
| `410` | "A versão da API do GitHub usada pelo painel foi desativada. Atualize API_VERSION em js/github.js." |
| `422` fora do passo 7 | Mostre a mensagem que o GitHub devolveu. |

## 12. Fotos (compressão no navegador antes de enviar)

**Entrada:**
- `<input type="file" accept="image/*">` (no celular, abre câmera ou galeria).
- Recuse arquivos acima de 25 MB.

**Decodificação:**
- Use `<img>` + `URL.createObjectURL` + `await img.decode()`. O `createImageBitmap` tem bugs de orientação EXIF no Safari.
- Se não conseguir decodificar (por exemplo, HEIC no Chrome do computador): "Formato não suportado, use JPG ou PNG."

**Duas versões quadradas** (recorte central 1:1, fundo branco):
- **foto** com no máximo 1000px;
- **miniatura** com 240px;
- nunca aumente uma imagem pequena.

**Compressão:**
- `canvas.toBlob('image/webp', 0.8)`.
- Se `blob.type !== 'image/webp'` (o Safari do iPhone devolve PNG), refaça em `image/jpeg` com qualidade 0.82.
- Se a foto passar de 300 KB, tente qualidade 0.7 e depois 800px.
- Mostre a prévia e o tamanho final.

**No rascunho:**
- A foto fica no IndexedDB com a chave `foto-<uuid>` (e `foto-<uuid>-mini`), com uuid gerado por `crypto.randomUUID()`.
- O produto guarda `"imagem": "pendente:foto-<uuid>"` e `"miniatura": "pendente:foto-<uuid>-mini"`. O painel exibe com `URL.createObjectURL`.
- Trocar a foto de novo, ou excluir o produto antes de publicar, apaga o blob antigo do IndexedDB.

**No site público:**
- Toda imagem de produto usa `aspect-ratio: 1; object-fit: cover;` e tem `width`/`height`.
- `loading="lazy"` e `decoding="async"` em todas, menos nas primeiras visíveis e no logo.
- A lista usa a miniatura; a foto grande só carrega no detalhe.

## 13. Segurança (implemente; a explicação vai na tela "Ajuda" e na sua resposta final, nunca no README)

**O que o login protege, e o que não protege:**
- O login tropa/baby e o link escondido são só uma **cortina para curiosos**. O site é estático e o repositório é público, então quem ler o código consegue passar dessa tela.
- **Quem protege de verdade é a chave do GitHub.** Sem ela, ninguém altera nada, mesmo passando do login.

**A chave:**
- Nunca vai para o repositório: nem codificada, nem criptografada, nem dividida em partes. O GitHub revoga automaticamente chaves que aparecem em repositório público.
- O endereço `leonardo681.github.io` é compartilhado com os outros sites desse usuário no GitHub Pages, e todos eles podem ler o `localStorage` desse endereço.
  - Por isso o padrão é `sessionStorage`.
  - "Lembrar neste aparelho" só em celular pessoal com bloqueio de tela.
  - Para isolar de vez, dá para usar domínio próprio ou uma conta/organização separada (ex.: `sarabiguacu.github.io`).

**`painel.html`:**
- Primeiras tags do `<head>`, nesta ordem e antes de qualquer `<link>` ou `<script>`:
  1. `<meta charset="utf-8">`;
  2. a CSP: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; connect-src 'self' https://api.github.com; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'none'; form-action 'none'">`;
  3. `<meta name="robots" content="noindex, nofollow">`.
- Por causa da CSP: nada de JS inline nem `onclick=` no HTML do painel.
- Nenhum script, fonte ou analytics de terceiros no painel.

**Se algo der errado:**
1. revogue a chave em github.com/settings/personal-access-tokens;
2. reverta o commit no GitHub. Todo o histórico fica salvo.

## 14. Acessibilidade e desempenho

**Estrutura:**
- HTML semântico: `header`, `main`, `nav`, `section` e `footer`.
- Um único `h1` e um `h2` por categoria.

**Leitura e toque:**
- Texto com 16px ou mais; preço com 17px ou mais, em negrito.
- Alvos de toque com 44px ou mais.
- `:focus-visible` visível.
- Respeite `prefers-reduced-motion` (sem rolagem suave nem animações).
- Nunca bloqueie o zoom.

**Imagens:**
- `alt=""` nas miniaturas da lista, porque o nome já está do lado.
- `alt` descritivo na foto do detalhe.

**Orçamento do site público** (`index.html` + `style.css` + `app.js` + `comum.js`):
- abaixo de cerca de 60 KB, sem frameworks;
- no máximo uma fonte web;
- o painel não entra nesse limite.

**Metas:**
- Sem rolagem horizontal em 360px.
- LCP abaixo de 2,5 s e CLS abaixo de 0,1, medidos em "Slow 4G".

## 15. Extras (fase 5)

1. **Modo balcão** (`index.html?balcao=1`), para os atendentes: busca já focada, sem fotos, preços maiores e lista compacta.
2. **Página `qr.html`** para imprimir:
   - gera o QR Code do site no navegador, com a biblioteca `qrcode-generator` via cdnjs e versão fixa;
   - mostra o logo, "Aponte a câmera e veja os preços", a URL escrita por extenso e "Siga @sara.biguacu";
   - layouts A5 e "display de mesa".
3. **Aba "Informações" no painel** para editar o `data/igreja.json` (pagamentos, horário da loja, aviso e cultos), publicando no mesmo commit do fluxo da seção 11.

## 16. Entregáveis e testes

### Arquivos
1. Todos os arquivos da seção 6, na branch `novo-site`, funcionando no GitHub Pages sem configuração extra (Pages: branch `main`, pasta `/ (root)`, depois que eu fizer o merge).
2. `data/produtos.json` com os 20 produtos migrados e `data/igreja.json` preenchido conforme a seção 4.

### README.md
Escreva em português simples. **Não pode conter** onde fica o acesso escondido nem o login. Pode dizer apenas "O acesso ao painel é passado pessoalmente pelo responsável da loja." Deve explicar:
- a estrutura dos arquivos;
- como testar localmente: `python -m http.server` e abrir `http://localhost:8000`. Abrindo com `file://` o `fetch` não funciona. No celular, teste pelo GitHub Pages, não pelo IP da rede, porque o login precisa de HTTPS;
- como editar o `data/igreja.json` pelo site do GitHub (arquivo → lápis → editar → "Commit changes"), avisando que uma vírgula ou aspas faltando quebra o arquivo. Se a seção da igreja sumir depois de uma edição, volte a versão anterior pelo "History";
- **aviso para quem mexer no código:** depois que o painel estiver em uso, `data/produtos.json` e `img/produtos/` passam a ser do painel. Sempre faça `git pull` antes de alterar algo, nunca use `force push` e nunca commite um `produtos.json` antigo por cima;
- como trocar `API_VERSION` se o GitHub desativar a versão (lista em docs.github.com/rest/about-the-rest-api/api-versions);
- a tabela de cores com o contraste de cada combinação.

### Testes automatizados
`node --test testes/` (Node 20 ou mais novo, sem npm):
- `comum.js`:
  - slug;
  - busca sem acentos;
  - `lerPreco`, com todos os exemplos da seção 10.4;
  - formatação de preço: 0 → "R$ 0,00", 5 → "R$ 0,05", 7450 → "R$ 74,50", 123450 → "R$ 1.234,50". Compare com o espaço U+00A0, ou normalize **só na comparação**;
  - data local da Novidade;
  - ida e volta UTF-8 de `"Bíblia Graça — “Fé” 🙏"`;
  - `aplicarAlteracoes` (compactação, item excluído em outro aparelho, categoria com produto oculto);
  - `validarCatalogo`.
- `github.js` com `fetch` simulado (mock):
  - a sequência certa de chamadas: ref → commit → contents → blobs → trees → commits → PATCH ref;
  - um commit só por publicação;
  - nova tentativa em 409/422;
  - rascunho preservado em 401 e sem internet;
  - nenhuma chamada com `force: true`.

### Na sua resposta final
1. **Resultado de cada teste.** O que depende de navegador ou celular real (Voltar do Android, iPhone, compressão no Safari, Publicar de verdade) marque como **"NÃO TESTADO — testar manualmente"**, com o passo a passo. **Nunca diga que passou algo que você não executou.**
2. **Onde fica o acesso ao painel e o login** (só aqui no chat).
3. **A explicação de segurança** da seção 13.
4. **Roteiro da primeira publicação**, para eu fazer com a minha chave:
   1. criar o produto "TESTE" e publicar;
   2. conferir no site em até 10 minutos;
   3. ocultar, publicar de novo e conferir que sumiu;
   4. excluir.
5. **Os dados que ficaram vazios** no `igreja.json` por estarem marcados [CONFIRMAR].
6. Em qual fase você parou, se não terminou tudo.

=== FIM DO PROMPT ===
