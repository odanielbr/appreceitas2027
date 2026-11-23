/* ============================================================
   CONFIGURAÇÕES DA ÁREA DE MEMBROS
   Edite os valores abaixo. Mantenha as aspas e as vírgulas.
   ============================================================ */
window.CONFIG = {
  // Nome que aparece no topo e na aba do navegador
  nomeApp: 'Saúde Natural',

  // Caminho do logo (ex.: './logo.webp'). Deixe '' para usar o nome em texto.
  logo: '',

  // Vídeo de boas-vindas no VTurb (opcional).
  // Coloque o ID do vídeo (ex.: '6a38c0f0084b7b6c494d1e9a') e o ID da sua conta VTurb.
  // Deixe videoBoasVindas: '' para mostrar o passo a passo em texto.
  videoBoasVindas: '',
  vturbConta: '',

  boasVindas: {
    titulo: 'Comece por aqui',
    texto: 'Aqui estão todas as receitas do livro, organizadas por incômodo. Encontre o que você está sentindo e vá direto na receita.',
    passos: [
      ['Busque pelo incômodo', 'Digite o que está sentindo, como "sono" ou "digestão".'],
      ['Ou navegue pelas categorias', 'Chás, sucos, digestão, imunidade, sono e alimentos funcionais.'],
      ['Leia os cuidados', 'Toda receita traz cuidados e contraindicações. Leia antes de preparar.'],
      ['Marque como lida', 'Acompanhe seu progresso na barra do topo.']
    ]
  },

  // Atalhos que aparecem embaixo da busca
  atalhosBusca: ['Sono', 'Digestão', 'Gripe', 'Inchaço', 'Cansaço', 'Ansiedade'],

  // Aviso exibido na home e no fim de cada receita
  aviso: 'Conteúdo informativo. Não substitui consulta, diagnóstico ou tratamento médico. Gestantes, lactantes, crianças, pessoas com doenças crônicas ou que usam medicamentos devem falar com um profissional de saúde antes de usar qualquer receita.',

  suporte: {
    texto: 'Nossa equipe responde em até 24 horas úteis.',
    email: 'suporte@seudominio.com.br',   // troque pelo seu e-mail
    whatsapp: ''                           // ex.: '5511999999999' (só números). Deixe '' para esconder.
  }
};
