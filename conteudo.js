/* ============================================================
   CONTEÚDO DA ÁREA DE MEMBROS
   ------------------------------------------------------------
   ATENÇÃO: as receitas abaixo são EXEMPLOS para montar a estrutura.
   Substitua pelo conteúdo do livro antes de vender.

   Cada categoria (módulo) tem:
     id, num, badge, titulo, descricao, icone, cor ('green' | 'gold' | 'blue'), capa (opcional, imagem)
     receitas: lista de receitas

   Cada receita tem:
     titulo, para (incômodo), resumo, tempo, rende,
     ingredientes [lista], preparo [lista de passos], uso (texto),
     cuidados [lista], tags [palavras para a busca], foto (opcional)

   Ícones disponíveis: tea, juice, belly, shield, moon, leaf, list, cart, calendar
   ============================================================ */

window.MODULOS = [
  {
    id:'chas', num:1, badge:'Categoria 1', titulo:'Chás e infusões', icone:'tea', cor:'green',
    descricao:'Chás tradicionais para o dia a dia, com o preparo certo para cada planta.',
    receitas:[
      { titulo:'Chá de camomila para relaxar', para:'Tensão e dificuldade para relaxar',
        resumo:'Um chá suave e tradicional para o fim do dia.', tempo:'10 min', rende:'1 xícara',
        ingredientes:['1 colher (sopa) de flores secas de camomila','250 ml de água'],
        preparo:['Ferva a água e desligue o fogo.','Junte a camomila, tampe e deixe em infusão por 5 a 10 minutos.','Coe e sirva morno.'],
        uso:'Tome 1 xícara cerca de 30 minutos antes de dormir.',
        cuidados:['Evite se tiver alergia a plantas da família da margarida (como arnica e calêndula).','Pode aumentar o efeito de calmantes e anticoagulantes.'],
        tags:['sono','insonia','ansiedade','relaxar','calma','estresse'] },
      { titulo:'Chá de gengibre com limão', para:'Enjoo e digestão pesada',
        resumo:'Infusão aromática e levemente picante.', tempo:'12 min', rende:'1 xícara',
        ingredientes:['3 rodelas finas de gengibre fresco','250 ml de água','Suco de ½ limão'],
        preparo:['Ferva a água com o gengibre por 5 minutos.','Desligue, tampe e deixe descansar mais 5 minutos.','Coe e junte o suco de limão.'],
        uso:'Tome 1 xícara após as refeições, até 2 vezes ao dia.',
        cuidados:['Quem usa anticoagulantes ou tem cálculos na vesícula deve consultar um médico antes.','Gestantes devem usar apenas com orientação médica.','Pode piorar azia em pessoas sensíveis.'],
        tags:['enjoo','nausea','digestao','estomago','gengibre'] },
      { titulo:'Chá de hortelã', para:'Sensação de estufamento',
        resumo:'Refrescante e fácil de preparar com folhas frescas.', tempo:'8 min', rende:'1 xícara',
        ingredientes:['1 punhado de folhas frescas de hortelã','250 ml de água'],
        preparo:['Ferva a água e desligue.','Amasse levemente as folhas e coloque na água.','Tampe por 5 minutos e coe.'],
        uso:'Tome após as refeições.',
        cuidados:['Pode piorar refluxo e azia.','Não use óleo essencial de hortelã em bebês e crianças pequenas.'],
        tags:['gases','estufamento','barriga','digestao','hortela'] }
    ]
  },
  {
    id:'sucos', num:2, badge:'Categoria 2', titulo:'Sucos e shots naturais', icone:'juice', cor:'green',
    descricao:'Combinações práticas com frutas e verduras do dia a dia.',
    receitas:[
      { titulo:'Suco de abacaxi com hortelã', para:'Refrescar e hidratar',
        resumo:'Clássico, leve e muito refrescante.', tempo:'5 min', rende:'2 copos',
        ingredientes:['2 rodelas grossas de abacaxi','5 folhas de hortelã','300 ml de água gelada'],
        preparo:['Bata tudo no liquidificador.','Coe se preferir e sirva na hora.'],
        uso:'Tome no meio da manhã ou da tarde.',
        cuidados:['O abacaxi é ácido: pode incomodar quem tem gastrite ou aftas.','Diabéticos devem considerar o açúcar natural da fruta.'],
        tags:['hidratar','calor','inchaco','abacaxi','refrescante'] },
      { titulo:'Suco verde de couve e limão', para:'Começar o dia mais disposto',
        resumo:'Um suco simples para incluir mais verduras na rotina.', tempo:'5 min', rende:'1 copo',
        ingredientes:['1 folha de couve sem o talo','Suco de 1 limão','1 maçã picada','250 ml de água'],
        preparo:['Bata todos os ingredientes.','Coe se preferir e tome em seguida.'],
        uso:'Pela manhã, de preferência fresco.',
        cuidados:['Quem usa varfarina deve manter constante a quantidade de folhas verde-escuras e conversar com o médico.','Pessoas com cálculo renal devem consultar um profissional antes do consumo frequente.'],
        tags:['cansaco','disposicao','energia','couve','verde'] },
      { titulo:'Shot de gengibre e cúrcuma', para:'Dias frios',
        resumo:'Um shot concentrado para tomar em dose pequena.', tempo:'5 min', rende:'4 doses',
        ingredientes:['1 pedaço (3 cm) de gengibre','1 colher (chá) de cúrcuma em pó','Suco de 2 laranjas','1 pitada de pimenta-do-reino'],
        preparo:['Bata tudo e coe.','Guarde na geladeira em pote fechado por até 3 dias.'],
        uso:'Tome 1 dose de 30 ml pela manhã.',
        cuidados:['Evite se usar anticoagulantes ou tiver problemas de vesícula.','Gestantes devem consultar o médico.','Pode irritar o estômago se tomado em jejum por pessoas sensíveis.'],
        tags:['frio','imunidade','gripe','curcuma','gengibre'] }
    ]
  },
  {
    id:'digestao', num:3, badge:'Categoria 3', titulo:'Digestão leve', icone:'belly', cor:'green',
    descricao:'Receitas para depois de refeições pesadas e para o intestino.',
    receitas:[
      { titulo:'Água de erva-doce', para:'Gases e estufamento',
        resumo:'Infusão suave de sementes de erva-doce.', tempo:'10 min', rende:'1 xícara',
        ingredientes:['1 colher (chá) de sementes de erva-doce','250 ml de água'],
        preparo:['Amasse levemente as sementes.','Despeje a água fervente, tampe por 10 minutos e coe.'],
        uso:'Tome após o almoço ou o jantar.',
        cuidados:['Evite o uso prolongado na gestação sem orientação.','Não ofereça a bebês sem orientação do pediatra.'],
        tags:['gases','colica','estufamento','barriga','erva-doce'] },
      { titulo:'Mamão com aveia', para:'Intestino preso',
        resumo:'Combinação rica em fibras para o café da manhã.', tempo:'3 min', rende:'1 porção',
        ingredientes:['1 fatia de mamão','1 colher (sopa) de aveia em flocos','1 copo de água ao longo da manhã'],
        preparo:['Corte o mamão em cubos.','Polvilhe a aveia por cima.'],
        uso:'Coma no café da manhã e beba bastante água durante o dia.',
        cuidados:['Aumente as fibras aos poucos para evitar gases.','Celíacos devem usar aveia certificada sem glúten.','Intestino preso persistente ou com dor deve ser avaliado por um médico.'],
        tags:['intestino','preso','constipacao','fibras','mamao'] },
      { titulo:'Chá de boldo', para:'Sensação de estômago pesado',
        resumo:'Tradicional depois de exageros na comida.', tempo:'10 min', rende:'1 xícara',
        ingredientes:['2 folhas de boldo','250 ml de água'],
        preparo:['Macere as folhas em água fria.','Deixe descansar por 10 minutos e coe.'],
        uso:'Tome no máximo 1 xícara, em uso pontual.',
        cuidados:['Não use na gestação, na amamentação nem em crianças.','Não use por períodos longos.','Evite se tiver doenças no fígado, cálculos na vesícula ou usar anticoagulantes.'],
        tags:['estomago','figado','pesado','ma digestao','boldo'] }
    ]
  },
  {
    id:'imunidade', num:4, badge:'Categoria 4', titulo:'Imunidade da família', icone:'shield', cor:'green',
    descricao:'Receitas caseiras para os dias de gripe e resfriado.',
    receitas:[
      { titulo:'Chá de limão, gengibre e mel', para:'Garganta irritada',
        resumo:'Bebida morna e reconfortante.', tempo:'10 min', rende:'1 xícara',
        ingredientes:['2 rodelas de gengibre','250 ml de água','Suco de ½ limão','1 colher (chá) de mel'],
        preparo:['Ferva a água com o gengibre por 5 minutos.','Espere amornar e junte o limão e o mel.'],
        uso:'Tome morno, até 3 vezes ao dia.',
        cuidados:['Nunca dê mel a crianças menores de 1 ano.','Diabéticos devem controlar o mel.','Febre alta ou falta de ar pedem atendimento médico.'],
        tags:['gripe','resfriado','garganta','tosse','mel'] },
      { titulo:'Caldo de legumes caseiro', para:'Dias de gripe',
        resumo:'Leve, quente e fácil de digerir.', tempo:'35 min', rende:'4 porções',
        ingredientes:['1 cenoura','1 batata','1 abobrinha','½ cebola','2 dentes de alho','1,5 litro de água','Sal e cheiro-verde a gosto'],
        preparo:['Pique os legumes.','Refogue a cebola e o alho e junte os legumes e a água.','Cozinhe por 25 minutos, tempere e finalize com cheiro-verde.'],
        uso:'Sirva quente no almoço ou no jantar.',
        cuidados:['Quem tem pressão alta deve usar pouco sal.'],
        tags:['gripe','resfriado','sopa','caldo','fraqueza'] },
      { titulo:'Xarope caseiro de cebola e mel', para:'Tosse',
        resumo:'Receita de vó, preparada com dois ingredientes.', tempo:'5 min + 4 h de descanso', rende:'Pequeno pote',
        ingredientes:['1 cebola roxa em fatias finas','Mel suficiente para cobrir'],
        preparo:['Coloque a cebola em um pote de vidro.','Cubra com mel, tampe e deixe descansar por 4 horas.','Coe e guarde na geladeira por até 3 dias.'],
        uso:'1 colher (chá) até 3 vezes ao dia.',
        cuidados:['Nunca dê mel a crianças menores de 1 ano.','Tosse por mais de 2 semanas, com sangue ou com falta de ar precisa de avaliação médica.'],
        tags:['tosse','gripe','garganta','xarope','cebola'] }
    ]
  },
  {
    id:'sono', num:5, badge:'Categoria 5', titulo:'Sono e relaxamento', icone:'moon', cor:'green',
    descricao:'Rituais simples para desacelerar no fim do dia.',
    receitas:[
      { titulo:'Chá de melissa (erva-cidreira)', para:'Insônia leve',
        resumo:'Aroma cítrico e sabor suave.', tempo:'10 min', rende:'1 xícara',
        ingredientes:['1 colher (sopa) de folhas de melissa','250 ml de água'],
        preparo:['Despeje a água quente (sem ferver) sobre as folhas.','Tampe por 10 minutos e coe.'],
        uso:'Tome 1 xícara antes de dormir.',
        cuidados:['Quem tem hipotireoidismo deve consultar o médico.','Pode somar efeito a calmantes.'],
        tags:['sono','insonia','dormir','ansiedade','cidreira','melissa'] },
      { titulo:'Leite morno com canela', para:'Ritual antes de dormir',
        resumo:'Bebida quentinha e reconfortante.', tempo:'5 min', rende:'1 caneca',
        ingredientes:['200 ml de leite (ou bebida vegetal)','1 pau de canela','1 colher (chá) de mel (opcional)'],
        preparo:['Aqueça o leite com a canela sem deixar ferver.','Retire a canela e adoce se quiser.'],
        uso:'Tome cerca de 1 hora antes de deitar.',
        cuidados:['Intolerantes à lactose devem usar bebida vegetal.','Nunca dê mel a crianças menores de 1 ano.'],
        tags:['sono','dormir','relaxar','canela','leite'] },
      { titulo:'Escalda-pés de alecrim', para:'Pernas cansadas',
        resumo:'Um momento de pausa no fim do dia.', tempo:'20 min', rende:'1 uso',
        ingredientes:['Bacia com água morna','1 punhado de alecrim','2 colheres (sopa) de sal grosso'],
        preparo:['Ferva o alecrim em 500 ml de água por 5 minutos.','Junte à bacia de água morna com o sal.','Teste a temperatura com a mão antes de colocar os pés.'],
        uso:'Deixe os pés por 15 minutos e seque bem.',
        cuidados:['Diabéticos e pessoas com má circulação ou feridas nos pés devem evitar e conversar com o médico.','Nunca use água quente demais.'],
        tags:['pernas','cansaco','pes','inchaco','relaxar','alecrim'] }
    ]
  },
  {
    id:'funcionais', num:6, badge:'Categoria 6', titulo:'Alimentos funcionais', icone:'leaf', cor:'green',
    descricao:'Ingredientes do dia a dia usados de um jeito mais inteligente.',
    receitas:[
      { titulo:'Leite dourado (golden milk)', para:'Dias de corpo cansado',
        resumo:'Bebida morna com cúrcuma e especiarias.', tempo:'7 min', rende:'1 caneca',
        ingredientes:['200 ml de leite ou bebida vegetal','½ colher (chá) de cúrcuma','1 pitada de pimenta-do-reino','1 pitada de canela'],
        preparo:['Aqueça tudo em fogo baixo, mexendo.','Não deixe ferver. Sirva morno.'],
        uso:'Tome à noite ou no lanche da tarde.',
        cuidados:['Evite se usar anticoagulantes ou tiver problemas de vesícula.','Gestantes devem consultar o médico.'],
        tags:['cansaco','dores','curcuma','acafrao','inflamacao'] },
      { titulo:'Água saborizada de pepino e limão', para:'Inchaço e pouca água no dia',
        resumo:'Ajuda a lembrar de beber água.', tempo:'5 min + 1 h na geladeira', rende:'1 litro',
        ingredientes:['½ pepino em rodelas','½ limão em rodelas','Folhas de hortelã','1 litro de água'],
        preparo:['Coloque tudo em uma jarra.','Deixe na geladeira por 1 hora.'],
        uso:'Beba ao longo do dia. Consuma em até 24 horas.',
        cuidados:['Inchaço frequente ou repentino deve ser avaliado por um médico.','Quem tem restrição de líquidos deve seguir a orientação médica.'],
        tags:['inchaco','retencao','agua','hidratar','pepino'] },
      { titulo:'Pudim de chia com frutas', para:'Lanche que sustenta',
        resumo:'Preparo rápido na véspera.', tempo:'5 min + 4 h', rende:'2 porções',
        ingredientes:['3 colheres (sopa) de chia','200 ml de leite ou bebida vegetal','Frutas picadas a gosto'],
        preparo:['Misture a chia com o leite.','Leve à geladeira por pelo menos 4 horas.','Sirva com as frutas por cima.'],
        uso:'Café da manhã ou lanche.',
        cuidados:['Beba água junto: a chia absorve muito líquido.','Quem tem dificuldade para engolir deve evitar a chia seca.'],
        tags:['fome','lanche','intestino','chia','fibras'] }
    ]
  }
];

/* ---------- BÔNUS ----------
   Bônus podem ter "conteudo" (texto em HTML) ou "receitas" (igual às categorias). */
window.BONUS = [
  { id:'b1', badge:'Bônus 1', titulo:'Tabela de cuidados', icone:'list', cor:'gold',
    descricao:'Resumo rápido das principais precauções de cada planta.',
    conteudo:`
      <p>Use esta tabela como consulta rápida. Ela não substitui a orientação de um profissional de saúde.</p>
      <table>
        <tr><th>Planta</th><th>Atenção</th></tr>
        <tr><td>Boldo</td><td>Não usar na gestação, amamentação ou em crianças</td></tr>
        <tr><td>Gengibre</td><td>Cuidado com anticoagulantes e cálculos na vesícula</td></tr>
        <tr><td>Cúrcuma</td><td>Cuidado com anticoagulantes e problemas de vesícula</td></tr>
        <tr><td>Camomila</td><td>Alergia a plantas da família da margarida</td></tr>
        <tr><td>Mel</td><td>Nunca para menores de 1 ano</td></tr>
      </table>` },
  { id:'b2', badge:'Bônus 2', titulo:'Lista de compras da despensa natural', icone:'cart', cor:'gold',
    descricao:'O que ter em casa para preparar a maioria das receitas.',
    conteudo:`
      <h3>Ervas secas</h3><ul><li>Camomila</li><li>Erva-doce</li><li>Melissa (erva-cidreira)</li></ul>
      <h3>Frescos</h3><ul><li>Gengibre</li><li>Limão</li><li>Hortelã</li><li>Couve</li></ul>
      <h3>Despensa</h3><ul><li>Cúrcuma em pó</li><li>Canela em pau</li><li>Chia e aveia</li><li>Mel</li></ul>` },
  { id:'b3', badge:'Bônus 3', titulo:'Rotina de 7 dias', icone:'calendar', cor:'gold',
    descricao:'Uma sugestão para incluir as receitas na semana.',
    conteudo:`
      <table>
        <tr><th>Dia</th><th>Manhã</th><th>Noite</th></tr>
        <tr><td>Seg</td><td>Suco verde</td><td>Chá de camomila</td></tr>
        <tr><td>Ter</td><td>Mamão com aveia</td><td>Leite com canela</td></tr>
        <tr><td>Qua</td><td>Água de pepino</td><td>Chá de melissa</td></tr>
        <tr><td>Qui</td><td>Pudim de chia</td><td>Escalda-pés</td></tr>
        <tr><td>Sex</td><td>Suco de abacaxi</td><td>Leite dourado</td></tr>
        <tr><td>Sáb</td><td>Livre</td><td>Chá de hortelã</td></tr>
        <tr><td>Dom</td><td>Livre</td><td>Chá de camomila</td></tr>
      </table>` }
];

/* ---------- PERGUNTAS FREQUENTES ---------- */
window.FAQ = [
  { p:'Como encontro a receita para o que estou sentindo?', r:'Na aba Receitas, digite o incômodo na busca (por exemplo "sono" ou "gripe") ou toque em uma das categorias.' },
  { p:'As receitas substituem remédios ou consulta médica?', r:'Não. O conteúdo é informativo e não substitui consulta, diagnóstico ou tratamento. Se os sintomas forem fortes, persistentes ou se você usa medicamentos, procure um profissional de saúde.' },
  { p:'Posso usar as receitas na gravidez ou em crianças?', r:'Algumas plantas são contraindicadas nesses casos. Leia sempre o bloco de cuidados de cada receita e converse com seu médico ou pediatra antes.' },
  { p:'Meu progresso fica salvo?', r:'Sim, no aparelho e navegador que você está usando. Se trocar de celular ou limpar os dados do navegador, o progresso recomeça.' },
  { p:'Por quanto tempo tenho acesso?', r:'O acesso é vitalício. Instale o app na tela inicial para abrir mais rápido.' },
  { p:'Não estou conseguindo acessar. O que faço?', r:'Fale com o suporte pelo card "Precisa de ajuda?" na aba Receitas.' }
];
