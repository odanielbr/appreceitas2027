# Área de Membros — Saúde Natural

Área de membros em formato de app (PWA) para um livro de receitas naturais.
Funciona direto no navegador e pode ser instalada na tela inicial do celular.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `app.html` | A estrutura da página (normalmente não precisa editar) |
| `motor.js` | O funcionamento: busca, progresso, telas (normalmente não precisa editar) |
| `config.js` | Nome, logo, vídeo de boas-vindas, aviso, suporte, atalhos de busca e FAQ |
| `conteudo.js` | "O Grande Livro das Receitas Naturais": 25 capítulos, 168 receitas, índice por sintoma e consulta rápida |
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
