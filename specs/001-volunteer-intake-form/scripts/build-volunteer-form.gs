/**
 * Builds the Wells of Change volunteer form.
 *
 * How to run it:
 *   1. Open the form: https://docs.google.com/forms/d/1p445U5jI_-Gc2hvkV6f84KM5cBg-NgSjBe1sXZ8nnZM/edit
 *   2. Three-dot menu, top right, then "Editor de scripts" (Apps Script).
 *   3. Replace whatever is in the editor with this file, save, and run buildVolunteerForm.
 *   4. Authorize it when Google asks. It only touches this one form.
 *
 * Running it twice deletes the questions it created and rebuilds them, so it is safe to re-run
 * after an edit. It does not touch responses.
 */

function buildVolunteerForm() {
  var form = FormApp.getActiveForm();

  form.setTitle('Seja Voluntário — Wells of Change');
  form.setDescription(
    'A Wells of Change leva água potável a comunidades carentes com poços movidos a energia solar ' +
    'e monitoramento em tempo real. Somos uma equipe de voluntários: engenheiros, desenvolvedores, ' +
    'geólogos, administradores e comunicadores.\n\n' +
    'Preencher leva cerca de 5 minutos. Respondemos toda candidatura em até 14 dias.\n\n' +
    'Seus dados são usados apenas para avaliar sua candidatura e entrar em contato. Não ' +
    'compartilhamos com terceiros. Para corrigir ou excluir seus dados, escreva para ' +
    'wellsofchange@gmail.com.'
  );

  var existing = form.getItems();
  for (var i = existing.length - 1; i >= 0; i--) {
    form.deleteItem(existing[i]);
  }

  form.addTextItem()
    .setTitle('Nome completo')
    .setRequired(true);

  form.addTextItem()
    .setTitle('E-mail')
    .setHelpText('É por aqui que vamos responder.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Telefone ou WhatsApp')
    .setHelpText('Opcional. Só usamos se combinarmos uma conversa.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Cidade e país onde você mora')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Idiomas que você fala')
    .setChoiceValues(['Português', 'Inglês', 'Espanhol', 'Francês'])
    .showOtherOption(true)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Áreas em que você pode contribuir')
    .setHelpText('Marque quantas quiser.')
    .setChoiceValues([
      'Perfuração e hidrogeologia',
      'Engenharia solar e elétrica',
      'Monitoramento e instrumentação',
      'Software e dados',
      'Comunicação e redes sociais',
      'Captação de recursos e parcerias',
      'Tradução',
      'Administração',
      'Jurídico',
      'Contabilidade',
      'Logística de campo'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Quantas horas por semana você pode dedicar')
    .setChoiceValues(['Até 2 horas', '2 a 5 horas', '5 a 10 horas', 'Mais de 10 horas'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Disponibilidade para trabalho de campo')
    .setChoiceValues([
      'Apenas remoto',
      'Remoto, com viagens eventuais',
      'Disponível para ir a campo (Bahia, Senegal)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Experiência relevante')
    .setHelpText('Projetos, trabalhos ou voluntariado que tenham a ver com o que você marcou acima.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Link para perfil profissional ou portfólio')
    .setHelpText('LinkedIn, GitHub, site pessoal. Opcional.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Por que você quer contribuir com a Wells of Change?')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Como você conheceu a Wells of Change?')
    .setChoiceValues([
      'Site wellsofchange.com',
      'Redes sociais',
      'Indicação de alguém',
      'Empresa parceira',
      'Evento ou palestra'
    ])
    .showOtherOption(true)
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Consentimento')
    .setHelpText(
      'A Wells of Change (CNPJ 43.933.784/0001-13) usa estes dados apenas para avaliar sua ' +
      'candidatura e entrar em contato. Não compartilhamos com terceiros. Para corrigir ou ' +
      'excluir seus dados, escreva para wellsofchange@gmail.com.'
    )
    .setChoiceValues(['Autorizo o uso dos meus dados para esta finalidade'])
    .setRequired(true);

  form.setConfirmationMessage(
    'Recebemos sua candidatura. Obrigado por oferecer seu tempo.\n\n' +
    'Vamos ler com atenção e responder em até 14 dias, mesmo que não haja uma frente aberta ' +
    'agora para o seu perfil.'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  Logger.log('Formulário montado: ' + form.getItems().length + ' perguntas.');
}
