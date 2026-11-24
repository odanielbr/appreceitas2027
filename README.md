# Área de Membros — Saúde Natural

Área de membros em formato de app (PWA) para um livro de receitas naturais.
Funciona direto no navegador e pode ser instalada na tela inicial do celular.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `app.html` | A estrutura da página (normalmente não precisa editar) |
| `fonte/config.js` | Nome, especialista, domínios permitidos, vídeo, aviso, suporte e FAQ |
| `fonte/motor.js` | O funcionamento do app (busca, progresso, telas, trava de endereço) |
| `app.bin.js` | Versão codificada de config + motor, que o site usa. **Gerada** — não edite à mão |
| `conteudo.js` | "O Grande Livro das Receitas Naturais": 25 capítulos, 168 receitas, índice por sintoma e consulta rápida |
| `atalhos.js` | Índices do livro: sintomas (em grupos, com ícones) e ingredientes |
| `guia.js` | "O Guia da Saúde Natural": prefácio, 25 capítulos e conclusão |
| `img/` | Ilustrações dos livros (receitas, infográficos e tabelas) |
| `index.html` | Redireciona para `app.html` (depois vira a página de vendas) |
| `manifest.json`, `icon-*.png` | Instalação como app no celular |

## Conteúdo

O conteúdo foi gerado a partir dos PDFs dos dois livros. Cada receita tem a ilustração do livro
em `img/r/rNNN.webp` (NNN = número da receita) e uma versão recortada para miniaturas em `img/rc/`.
Para corrigir um texto, procure a receita em `conteudo.js` pelo título e edite entre as aspas.

## Publicar na Vercel

Importe este repositório na Vercel (Framework: **Other**, sem build). O endereço da área de membros será `seu-dominio/app.html`.

## Pensado para o público 50+

- Navegação só com toques: menu de baixo com 5 botões (Início, Sintomas, Receitas, Guia, Ajuda).
- Sintomas e ingredientes em botões grandes com ícones — ninguém precisa digitar.
- A busca por palavra existe, mas fica escondida em "Prefere digitar?".
- Botão "Aa" em todas as telas para aumentar a letra (fica salvo no aparelho).
- O botão voltar do celular funciona; toda tela tem "Voltar" e "Ir para o início".
- "Continuar de onde parei" na tela inicial.

## Proteção

- `fonte/` e `divulgacao/` não são publicados (ver `.vercelignore`).
- Depois de editar `fonte/config.js` ou `fonte/motor.js`, rode `python3 fonte/gerar.py` para gerar `app.bin.js` de novo.
- O app só abre nos endereços de `dominios` (em `fonte/config.js`); em outros, mostra "Cópia não autorizada".
- Ilustrações com marca d'água "© Ana Flávia · Aplicativo de Receita".
