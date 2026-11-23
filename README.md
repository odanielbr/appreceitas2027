# Área de Membros — Saúde Natural

Área de membros em formato de app (PWA) para um livro de receitas naturais.
Funciona direto no navegador e pode ser instalada na tela inicial do celular.

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `app.html` | A área de membros (normalmente não precisa editar) |
| `config.js` | Nome, logo, vídeo de boas-vindas, aviso, e-mail/WhatsApp de suporte |
| `conteudo.js` | Categorias, receitas, bônus e perguntas frequentes |
| `index.html` | Redireciona para `app.html` (depois vira a página de vendas) |
| `manifest.json`, `icon-*.png` | Instalação como app no celular |

## Como trocar o conteúdo

1. Abra `conteudo.js`.
2. Cada categoria tem uma lista `receitas`. Copie o bloco de uma receita e troque os textos.
3. Para colocar foto numa receita, envie a imagem para o repositório e adicione `foto:'./nome.webp'`.
4. Para colocar capa numa categoria, adicione `capa:'./capa.webp'`.

> As receitas atuais são **exemplos**. Substitua pelo conteúdo do livro antes de vender.

## Publicar na Vercel

Importe este repositório na Vercel (Framework: **Other**, sem build). O endereço da área de membros será `seu-dominio/app.html`.
