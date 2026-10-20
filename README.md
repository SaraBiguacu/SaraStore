# SARA STORE

Catálogo de preços da loja da **Igreja Sara Nossa Terra Biguaçu**, no estilo cardápio digital.
É só informativo: as vendas são presenciais, no balcão da loja.

Site: <https://sarabiguacu.github.io/SaraStore/>

O acesso ao painel é passado pessoalmente pelo responsável da loja.

## Como funciona

- É um site **100% estático**, publicado pelo **GitHub Pages**. Não tem servidor nem banco de dados.
- Os produtos ficam em `data/produtos.json` e os dados da igreja em `data/igreja.json`.
- O painel grava as alterações direto neste repositório. O GitHub Pages republica sozinho, normalmente em 1 a 2 minutos (pode levar até 10).

## Fotos dos produtos

- Cada produto pode ter até **6 fotos** (ex.: frente e verso do livro). A primeira é a **capa**: é a que aparece na lista.
- No `produtos.json`, a capa fica em `imagem`/`miniatura` e as outras, na ordem, em `fotosExtras`:

```json
"imagem": "img/produtos/livro-x-m1x2k3.webp",
"miniatura": "img/produtos/livro-x-m1x2k3-mini.webp",
"fotosExtras": [
  { "imagem": "img/produtos/livro-x-m1x2k3-2.webp", "miniatura": "img/produtos/livro-x-m1x2k3-2-mini.webp" }
]
```

- Sem fotos extras, o campo `fotosExtras` não existe. Produtos antigos continuam funcionando sem mudar nada.
- O painel guarda a foto inteira, sem cortar (no máximo 1000 px no lado maior). Só a miniatura (240 px) é quadrada.
- No detalhe do produto, com mais de uma foto, dá para deslizar para o lado ou tocar nas miniaturas embaixo.
- Capa e fotos extras são gravadas sempre juntas no rascunho: se dois aparelhos mexem nas fotos do mesmo produto, vale o conjunto de quem publicou por último.
- Depois de colocar esta versão no ar, feche e abra de novo o painel em todo aparelho que estava com ele aberto. Um painel antigo aberto não enxerga as fotos extras (por isso ele perde o acesso às fotos guardadas no aparelho até ser recarregado).

## Arquivos

```
index.html            catálogo público
painel.html           uso interno da loja
qr.html               página para imprimir o QR Code (folha A5 ou display de mesa)
css/style.css         estilo do catálogo
css/painel.css        estilo do painel
js/comum.js           funções compartilhadas (preço, datas, busca, rascunho, validação)
js/app.js             catálogo
js/dialogo.js         fechamento confiável das janelas (<dialog>)
js/tema.js            tema claro/escuro do catálogo (botão sol/lua)
js/github.js          integração com a API do GitHub (publicar)
js/painel.js          interface do painel
js/fotos.js           compressão das fotos e rascunho de fotos (IndexedDB)
js/qr.js              geração do QR Code
data/produtos.json    categorias e produtos
data/igreja.json      dados da igreja e da loja
img/chama.png         logo do cabeçalho: a chama da Sara, branca e sem fundo
img/logo.png          a chama branca sobre o bronze: ícone do celular, prévia dos links e folha do QR Code
img/icone.png         ícone da aba do navegador (a chama do logo)
img/produtos/         fotos dos produtos (enviadas pelo painel)
testes/               testes automáticos
```

Extras:
- **Modo balcão:** `https://sarabiguacu.github.io/SaraStore/?balcao=1`. Mostra a busca já focada, sem fotos e com preços maiores, para os atendentes.
- **QR Code:** abra `qr.html`, escolha o modelo e imprima em tamanho real (100%).

## Publicação no GitHub Pages

Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.

O endereço diferencia maiúsculas: `/SaraStore/` funciona e `/sarastore/` dá erro. Defina o endereço final antes de imprimir QR Codes.

## Testar no computador

1. Na pasta do projeto, rode `python -m http.server 8000` e abra <http://localhost:8000>.
   Abrindo o arquivo direto (`file://`), o `fetch` dos dados não funciona.
2. Para testar no celular, use o próprio GitHub Pages, não o IP da rede local. O painel precisa de HTTPS (ou `localhost`).
3. Testes automáticos: `node --test testes/` (Node 20 ou mais novo, sem npm).

## Editar os dados da igreja pelo site do GitHub

1. Abra `data/igreja.json` no GitHub e clique no lápis (editar).
2. Altere só os textos entre aspas. Uma vírgula ou aspas faltando quebra o arquivo.
3. Clique em **Commit changes**.

Os campos `loja.pagamentos`, `loja.local` e `loja.horario` estão vazios porque ainda precisam ser confirmados. Quando vazios, essas linhas não aparecem no site. Exemplo preenchido:

```json
"loja": {
  "pagamentos": ["Pix", "cartão", "dinheiro"],
  "local": "Balcão da loja, na entrada da igreja",
  "horario": "Antes e depois dos cultos",
  "aviso": "Vendas somente presenciais. Preços podem mudar; confirme no balcão."
}
```

Se a seção da igreja sumir depois de uma edição, o arquivo ficou com erro. Volte a versão anterior pelo **History** do arquivo. O catálogo de preços continua funcionando mesmo assim.

## Aviso para quem mexer no código

- Depois que o painel estiver em uso, `data/produtos.json` e `img/produtos/` são **do painel**.
  - Sempre faça `git pull` antes de alterar algo.
  - Nunca use `force push`.
  - Nunca commite um `produtos.json` antigo por cima do atual.
- A cada mudança de CSS ou JS, aumente o número `?v=` nas tags `<link>`/`<script>` **e** nos `import` entre os módulos. O GitHub Pages guarda arquivos em cache por 10 minutos.
- Nunca use `innerHTML` com dados de produto. Monte o HTML com `createElement` + `textContent`.
- Nenhuma chave, token ou senha pode ser commitada.

### Versão da API do GitHub

O painel usa `API_VERSION = '2026-03-10'` em `js/github.js`. Se o GitHub desativar essa versão, o painel avisa. Nesse caso, troque pelo valor mais novo da lista em <https://docs.github.com/rest/about-the-rest-api/api-versions> e aumente o `?v=` dos arquivos.

## Tema claro e escuro

- O catálogo abre **sempre no tema claro**, mesmo com o celular no modo escuro. O escuro só liga pelo botão sol/lua no canto superior direito, e a escolha fica salva no aparelho (`js/tema.js`).
- O painel e a página do QR Code ficam sempre no claro.
- Alguns navegadores escurecem qualquer site por conta própria e ignoram o pedido do site para ficar claro (por exemplo, o modo escuro do Samsung Internet). Nenhum código consegue impedir isso. Quando o site percebe que está sendo escurecido assim, mostra um aviso explicando que dá para desligar o modo escuro para sites nas configurações do navegador.
- Para mexer nas cores: o tema escuro é o bloco `:root[data-tema="escuro"]` no começo de `css/style.css`. Nunca use `prefers-color-scheme` nem `color-scheme: light` (sem "only"): os dois fazem o navegador escurecer o site sozinho.

## Cores e contraste (WCAG)

Mínimos: texto 4,5:1; contornos de foco, bordas de campo e ícones 3:1.

| Combinação | Claro | Escuro |
|---|---|---|
| Texto principal sobre o card | 17,79:1 (`#111111`/`#FAF8F3`) | 13,06:1 (`#F1EBE1`/`#2A231D`) |
| Texto principal sobre o fundo da página | 14,32:1 (`#111111`/`#E4E0D5`) | 15,17:1 (`#F1EBE1`/`#1A1612`) |
| Texto secundário sobre o card | 7,23:1 (`#5A5248`/`#FAF8F3`) | 8,52:1 (`#C9BFB0`/`#2A231D`) |
| Texto secundário sobre o fundo da página | 5,82:1 (`#5A5248`/`#E4E0D5`) | 9,90:1 (`#C9BFB0`/`#1A1612`) |
| Texto digitado na busca | 18,88:1 (`#111111`/`#FFFFFF`) | 11,88:1 (`#F1EBE1`/`#322A23`) |
| Placeholder da busca | 7,68:1 (`#5A5248`/`#FFFFFF`) | 7,75:1 (`#C9BFB0`/`#322A23`) |
| Preços e botão "Compartilhar" sobre o card | 5,95:1 (`#7A5A2B`/`#FAF8F3`) | 8,00:1 (`#D9B57C`/`#2A231D`) |
| Bronze de destaque sobre o fundo da página | 4,79:1 (`#7A5A2B`/`#E4E0D5`) | 9,29:1 (`#D9B57C`/`#1A1612`) |
| Texto do chip marcado e dos botões | 6,32:1 (`#FFFFFF`/`#7A5A2B`) | 9,29:1 (`#1A1612`/`#D9B57C`) |
| Branco sobre o cabeçalho e a seção da igreja | 7,21:1 a 5,27:1 (`#6F5227` → `#8A6530`) | 10,03:1 a 7,21:1 (`#553E1D` → `#6F5227`) |
| Selo "Novidade" sobre o card | 5,28:1 (`#C62737`/`#FAF8F3`) | 6,46:1 (`#F28B7E`/`#2A231D`) |
| Rodapé | 14,32:1 (`#E4E0D5`/`#111111`) | 12,98:1 (`#DCD3C5`/`#110E0B`) |
| Aviso flutuante (toast) | 18,88:1 (`#FFFFFF`/`#111111`) | 14,39:1 (`#1A1612`/`#EDE5D8`) |
| Borda da busca × fundo da página | 3,40:1 | 5,31:1 |
| Borda da busca × fundo do campo | 4,48:1 | 4,16:1 |
| Foco bronze × fundo da página | 4,79:1 | 9,29:1 |
| Foco bronze × card e detalhe | 5,95:1 | 8,00:1 |
| Foco branco × cabeçalho e seção da igreja | 7,21:1 a 5,27:1 | 10,03:1 a 7,21:1 |
| Botão sol/lua: símbolo branco × cabeçalho | 7,21:1 a 5,27:1 | 10,03:1 a 7,21:1 |
| Botão sol/lua: símbolo `#6F5227` sobre a bolinha branca | 7,21:1 | 7,21:1 |
| Botão sol/lua: borda branca 70% × cabeçalho | 4,49:1 a 3,50:1 | 5,86:1 a 4,49:1 |
| Ícone de categoria (produto sem foto) × fundo da foto | 3,70:1 (`#977037`/`#EFE9DD`) | 3,76:1 (`#977037`/`#221C17`) |

Só decoração, sem exigência: bordas dos chips, da faixa e das miniaturas (`#AB9472` no claro, `#6E5A3F` no escuro), a separação entre card e página e a linha embaixo dos chips. Branco sobre `#977037` dá 4,48:1 e não passa no mínimo de 4,5:1, por isso esse bronze não leva texto (o "sara" do logo reserva é logotipo).
