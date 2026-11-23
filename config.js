/* ============================================================
   CONFIGURAÇÕES DA ÁREA DE MEMBROS
   Edite os valores abaixo. Mantenha as aspas e as vírgulas.
   ============================================================ */
window.CONFIG = {
  // Nome que aparece no topo e na aba do navegador
  nomeApp: 'Saúde Natural',

  // Caminho do logo (ex.: './logo.webp'). Deixe '' para usar o nome em texto.
  logo: '',

  // Vídeo de boas-vindas no VTurb (opcional): ID do vídeo e ID da sua conta.
  // Deixe videoBoasVindas: '' para mostrar o passo a passo em texto.
  videoBoasVindas: '',
  vturbConta: '',

  boasVindas: {
    titulo: 'Comece por aqui',
    texto: 'Aqui estão os dois livros completos: as 168 receitas de "O Grande Livro das Receitas Naturais" e os capítulos de "O Guia da Saúde Natural".',
    passos: [
      ['Busque pelo incômodo', 'Digite o que está sentindo, como "insônia", ou um ingrediente, como "gengibre".'],
      ['Ou navegue pelos capítulos', '25 capítulos de receitas, organizados pelo que o seu corpo precisa.'],
      ['Leia sempre a cautela', 'Toda receita traz quem deve evitar e por quê. Leia antes de preparar.'],
      ['Aprofunde com o Guia', 'Capítulos de leitura sobre sono, alimentação, coração, estresse e mais.']
    ]
  },

  // Atalhos que aparecem embaixo da busca. Deixe [] para mostrar todos os sintomas do índice do livro.
  atalhosBusca: ['Insônia', 'Ansiedade', 'Gripe', 'Gases', 'Pressão alta', 'Glicemia', 'Inchaço', 'Dor de cabeça', 'Garganta', 'Intestino', 'Cansaço', 'Pele'],

  // Aviso exibido na home e no fim de cada receita
  aviso: 'Conteúdo educativo e informativo. As receitas apoiam o bem-estar, não curam doenças e não substituem exames, medicamentos ou o acompanhamento do seu médico. Se você tem alguma condição de saúde, usa medicamentos, está grávida, amamentando ou vai oferecer algo a uma criança, converse antes com o seu médico ou farmacêutico.',

  suporte: {
    texto: 'Nossa equipe responde em até 24 horas úteis.',
    email: 'suporte@seudominio.com.br',   // troque pelo seu e-mail
    whatsapp: ''                           // ex.: '5511999999999' (só números). Deixe '' para esconder.
  },

  faq: [
    { p:'Como encontro a receita para o que estou sentindo?', r:'Na aba Receitas, digite o incômodo ou um ingrediente na busca (por exemplo "insônia" ou "gengibre"), ou toque em um dos atalhos logo abaixo dela.' },
    { p:'Qual a diferença entre os dois livros?', r:'"O Grande Livro das Receitas Naturais" traz 168 preparos com ingredientes, preparo, como usar e cautela. "O Guia da Saúde Natural" é um livro de leitura, com capítulos sobre alimentação, sono, estresse, coração e outros temas.' },
    { p:'As receitas substituem remédios ou consulta médica?', r:'Não. O conteúdo é educativo e informativo. Sintomas persistentes, fortes ou que pioram pedem avaliação médica. Nunca suspenda um medicamento por conta própria.' },
    { p:'Posso usar as receitas na gravidez ou em crianças?', r:'Muitas plantas são contraindicadas nesses casos. Consulte a "Tabela de cautelas" em Consulta rápida, leia a cautela de cada receita e fale com o seu médico ou pediatra antes.' },
    { p:'Meu progresso fica salvo?', r:'Sim, no aparelho e navegador que você está usando. Se trocar de celular ou limpar os dados do navegador, o progresso recomeça.' },
    { p:'Por quanto tempo tenho acesso?', r:'O acesso é vitalício. Instale o app na tela inicial para abrir mais rápido.' },
    { p:'Não estou conseguindo acessar. O que faço?', r:'Fale com o suporte pelo card "Precisa de ajuda?" na aba Receitas.' }
  ]
};
