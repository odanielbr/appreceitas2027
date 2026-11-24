/* ============================================================
   CONFIGURAÇÕES DA ÁREA DE MEMBROS
   Edite os valores abaixo. Mantenha as aspas e as vírgulas.
   ============================================================ */
window.CONFIG = {
  // Nome que aparece no topo e na aba do navegador
  nomeApp: 'Aplicativo de Receita',

  // Caminho do logo (ex.: './logo.webp'). Deixe '' para usar o nome em texto.
  logo: '',

  // Vídeo de boas-vindas no VTurb (opcional): ID do vídeo e ID da sua conta.
  // Deixe videoBoasVindas: '' para mostrar o passo a passo em texto.
  videoBoasVindas: '',
  vturbConta: '',

  boasVindas: {
    titulo: 'Olá! Que bom ter você aqui 🌿',
    texto: 'Aqui estão as 168 receitas do Grande Livro das Receitas Naturais e todo o Guia da Saúde Natural. É só tocar nos botões abaixo.',
    passos: [
      ['Busque pelo incômodo', 'Digite o que está sentindo, como "insônia", ou um ingrediente, como "gengibre".'],
      ['Ou navegue pelos capítulos', '25 capítulos de receitas, organizados pelo que o seu corpo precisa.'],
      ['Leia sempre a cautela', 'Toda receita traz quem deve evitar e por quê. Leia antes de preparar.'],
      ['Aprofunde com o Guia', 'Capítulos de leitura sobre sono, alimentação, coração, estresse e mais.']
    ]
  },

  // Aviso exibido na home e no fim de cada receita
  aviso: 'Conteúdo educativo e informativo. As receitas apoiam o bem-estar, não curam doenças e não substituem exames, medicamentos ou o acompanhamento do seu médico. Se você tem alguma condição de saúde, usa medicamentos, está grávida, amamentando ou vai oferecer algo a uma criança, converse antes com o seu médico ou farmacêutico.',

  suporte: {
    texto: 'Nossa equipe responde em até 24 horas úteis.',
    email: 'suporte@seudominio.com.br',   // troque pelo seu e-mail
    whatsapp: ''                           // ex.: '5511999999999' (só números). Deixe '' para esconder.
  },

  faq: [
    { p:'Como encontro a receita para o que estou sentindo?', r:'Toque em "Sintomas", no menu de baixo da tela, e depois toque no que você está sentindo. Aparecem todas as receitas indicadas no livro.' },
    { p:'Qual a diferença entre os dois livros?', r:'"O Grande Livro das Receitas Naturais" traz 168 preparos com ingredientes, preparo, como usar e cautela. "O Guia da Saúde Natural" é um livro de leitura, com capítulos sobre alimentação, sono, estresse, coração e outros temas.' },
    { p:'As receitas substituem remédios ou consulta médica?', r:'Não. O conteúdo é educativo e informativo. Sintomas persistentes, fortes ou que pioram pedem avaliação médica. Nunca suspenda um medicamento por conta própria.' },
    { p:'Posso usar as receitas na gravidez ou em crianças?', r:'Muitas plantas são contraindicadas nesses casos. Consulte a "Tabela de cautelas" em Consulta rápida, leia a cautela de cada receita e fale com o seu médico ou pediatra antes.' },
    { p:'Meu progresso fica salvo?', r:'Sim, no aparelho e navegador que você está usando. Se trocar de celular ou limpar os dados do navegador, o progresso recomeça.' },
    { p:'A letra está pequena. Como aumento?', r:'Toque no botão "Aa Letra", no alto da tela, e escolha "Grande" ou "Maior".' },
    { p:'Por quanto tempo tenho acesso?', r:'O acesso é vitalício. Instale o app na tela inicial para abrir mais rápido.' },
    { p:'Não estou conseguindo acessar. O que faço?', r:'Toque em "Ajuda", no menu de baixo da tela, e fale com a nossa equipe por e-mail ou WhatsApp.' }
  ]
};
