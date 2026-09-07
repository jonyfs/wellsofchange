/**
 * Builds the Wells of Change volunteer form with Portuguese and English side by side.
 *
 * Supersedes specs/001-volunteer-intake-form/scripts/build-volunteer-form.gs, which was
 * Portuguese only. The questions are the same; every label, help text and option now carries
 * both languages, Portuguese first, separated by " / " in titles and options, and on a new line
 * in help text.
 *
 * How to run it:
 *   1. Open the form, three-dot menu, then "Editor de scripts" (Apps Script).
 *   2. Replace the editor contents with this file, save, and run buildBilingualVolunteerForm.
 *   3. Authorize it when Google asks. It touches this form only.
 *
 * Re-running deletes the questions it created and rebuilds them. Responses are untouched.
 *
 * The theme cannot be set from a script. After running, set it by hand:
 *   Palette icon, then Header image, upload specs/003-bilingual-volunteer-form/assets/
 *   form-header-1600x400.jpg; Color, custom, #0A4EA1; Font, Formal.
 */

function buildBilingualVolunteerForm() {
  var form = FormApp.getActiveForm();

  form.setTitle('Seja Voluntário / Become a Volunteer — Wells of Change');
  form.setDescription(
    'A Wells of Change leva água potável a comunidades carentes com poços movidos a energia solar ' +
    'e monitoramento em tempo real. Somos uma equipe de voluntários: engenheiros, desenvolvedores, ' +
    'geólogos, administradores e comunicadores.\n' +
    'Wells of Change brings drinking water to underserved communities through solar-powered wells ' +
    'with real-time monitoring. We are a team of volunteers: engineers, developers, geologists, ' +
    'administrators and communicators.\n\n' +
    'Preencher leva cerca de 5 minutos. Respondemos toda candidatura em até 14 dias.\n' +
    'This takes about 5 minutes. We reply to every application within 14 days.\n\n' +
    'Seus dados são usados apenas para avaliar sua candidatura e entrar em contato. Não ' +
    'compartilhamos com terceiros. Para corrigir ou excluir seus dados, escreva para ' +
    'wellsofchange@gmail.com.\n' +
    'Your data is used only to review your application and contact you. We do not share it with ' +
    'anyone. To correct or delete it, write to wellsofchange@gmail.com.'
  );

  var existing = form.getItems();
  for (var i = existing.length - 1; i >= 0; i--) {
    form.deleteItem(existing[i]);
  }

  form.addTextItem()
    .setTitle('Nome completo / Full name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('E-mail')
    .setHelpText('É por aqui que vamos responder.\nThis is where we will reply.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Telefone ou WhatsApp / Phone or WhatsApp')
    .setHelpText('Opcional. Só usamos se combinarmos uma conversa.\nOptional. Only used if we arrange a call.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('Cidade e país / City and country')
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Idiomas que você fala / Languages you speak')
    .setChoiceValues([
      'Português / Portuguese',
      'Inglês / English',
      'Espanhol / Spanish',
      'Francês / French'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('Áreas em que você pode contribuir / How you can contribute')
    .setHelpText('Marque quantas quiser.\nTick as many as apply.')
    .setChoiceValues([
      'Perfuração e hidrogeologia / Drilling and hydrogeology',
      'Engenharia solar e elétrica / Solar and electrical engineering',
      'Monitoramento e instrumentação / Monitoring and instrumentation',
      'Software e dados / Software and data',
      'Comunicação e redes sociais / Communication and social media',
      'Captação de recursos e parcerias / Fundraising and partnerships',
      'Tradução / Translation',
      'Administração / Administration',
      'Jurídico / Legal',
      'Contabilidade / Accounting',
      'Logística de campo / Field logistics'
    ])
    .showOtherOption(true)
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Horas por semana que você pode dedicar / Hours per week you can give')
    .setChoiceValues([
      'Até 2 horas / Up to 2 hours',
      '2 a 5 horas / 2 to 5 hours',
      '5 a 10 horas / 5 to 10 hours',
      'Mais de 10 horas / More than 10 hours'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Disponibilidade para trabalho de campo / Availability for field work')
    .setChoiceValues([
      'Apenas remoto / Remote only',
      'Remoto, com viagens eventuais / Remote, with occasional travel',
      'Disponível para ir a campo (Bahia, Senegal) / Available for field trips (Bahia, Senegal)'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Experiência relevante / Relevant experience')
    .setHelpText(
      'Projetos, trabalhos ou voluntariado ligados ao que você marcou acima.\n' +
      'Projects, jobs or volunteering related to what you ticked above.'
    )
    .setRequired(false);

  form.addTextItem()
    .setTitle('Perfil profissional ou portfólio / Professional profile or portfolio')
    .setHelpText('LinkedIn, GitHub, site pessoal. Opcional.\nLinkedIn, GitHub, personal site. Optional.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('Por que você quer contribuir com a Wells of Change? / Why do you want to contribute to Wells of Change?')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Como você conheceu a Wells of Change? / How did you hear about Wells of Change?')
    .setChoiceValues([
      'Site wellsofchange.com / The wellsofchange.com website',
      'Redes sociais / Social media',
      'Indicação de alguém / Someone referred us',
      'Empresa parceira / A partner company',
      'Evento ou palestra / An event or talk'
    ])
    .showOtherOption(true)
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('Consentimento / Consent')
    .setHelpText(
      'A Wells of Change (CNPJ 43.933.784/0001-13, o registro fiscal brasileiro da organização) usa ' +
      'estes dados apenas para avaliar sua candidatura e entrar em contato. Não compartilhamos com ' +
      'terceiros. Para corrigir ou excluir seus dados, escreva para wellsofchange@gmail.com.\n' +
      'Wells of Change (CNPJ 43.933.784/0001-13, the organization\'s Brazilian tax registration) uses ' +
      'this data only to review your application and contact you. We do not share it with anyone. ' +
      'To correct or delete it, write to wellsofchange@gmail.com.'
    )
    .setChoiceValues(['Autorizo o uso dos meus dados para esta finalidade / I consent to this use of my data'])
    .setRequired(true);

  form.setConfirmationMessage(
    'Recebemos sua candidatura. Obrigado por oferecer seu tempo. Vamos ler com atenção e responder ' +
    'em até 14 dias, mesmo que não haja uma frente aberta agora para o seu perfil.\n\n' +
    'We have your application. Thank you for offering your time. We will read it carefully and reply ' +
    'within 14 days, even if there is no open need matching your profile right now.'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  Logger.log('Formulário montado / Form built: ' + form.getItems().length + ' perguntas / questions.');
}
