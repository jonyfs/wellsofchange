/**
 * Builds the Wells of Change volunteer form: Portuguese and English side by side, wording taken
 * from the site so the form reads like the page the visitor just left.
 *
 * Supersedes the scripts in specs/001-volunteer-intake-form and specs/003-bilingual-volunteer-form.
 *
 * How to run it:
 *   1. Open the form, three-dot menu, then "Editor de scripts" (Apps Script).
 *   2. Replace the editor contents with this file, save, and run buildVolunteerForm.
 *   3. Authorize it when Google asks. It touches this form only.
 *
 * Re-running deletes the questions it created and rebuilds them. Responses are untouched.
 *
 * The theme cannot be set from a script. After running, set it by hand under the palette icon:
 *   Header image: specs/008-volunteer-form-launch/assets/form-header-1600x400.jpg
 *   Colour: custom, #0A4EA1, the site's primary blue
 *   Background: white
 *   Font: Formal, the closest Forms offers to the site's Poppins and Inter
 */

function buildVolunteerForm() {
  var form = FormApp.getActiveForm();

  form.setTitle('Wells of Change: Seja Voluntário / Become a Volunteer');
  form.setDescription(
    'A Wells of Change leva água potável a comunidades carentes com poços movidos a energia solar ' +
    'e monitoramento em tempo real. Quem faz isso é um time de voluntários: engenheiros, ' +
    'desenvolvedores, geólogos, administradores e comunicadores.\n' +
    'Wells of Change brings drinking water to underserved communities through solar-powered wells ' +
    'with real-time monitoring. The people who do it are volunteers: engineers, developers, ' +
    'geologists, administrators and communicators.\n\n' +
    'O primeiro poço está pronto, em Campo Formoso, no interior da Bahia. Quando a água começa a ' +
    'correr, continuamos com a comunidade, para que ela cuide da própria fonte.\n' +
    'The first well is finished, in Campo Formoso, in the interior of Bahia. Once the water is ' +
    'running we stay with the community, so it can look after its own source.\n\n' +
    'São cerca de 5 minutos. Respondemos em até 14 dias, mesmo quando não há uma frente aberta ' +
    'para o seu perfil.\n' +
    'This takes about 5 minutes. We reply within 14 days, even when there is no open need matching ' +
    'your profile.\n\n' +
    'Usamos seus dados apenas para avaliar sua candidatura e falar com você. Não passamos para ' +
    'ninguém. Para corrigir ou apagar, escreva para wellsofchange@gmail.com.\n' +
    'We use your data only to review your application and talk to you. We pass it to no one. To ' +
    'correct or delete it, write to wellsofchange@gmail.com.'
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
    .setHelpText('É por aqui que respondemos.\nThis is where we reply.')
    .setRequired(true);

  form.addTextItem()
    .setTitle('Telefone ou WhatsApp / Phone or WhatsApp')
    .setHelpText('Opcional. Só usamos se marcarmos uma conversa.\nOptional. Only used if we arrange a call.')
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
    .setTitle('Onde você pode ajudar / Where you can help')
    .setHelpText(
      'Perfuramos o solo, instalamos bombas movidas a energia solar e monitoramos os poços em ' +
      'tempo real. Marque quantas quiser.\n' +
      'We drill, install solar-powered pumps and monitor the wells in real time. Tick as many as ' +
      'apply.'
    )
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
    .setTitle('Trabalho de campo / Field work')
    .setHelpText(
      'Do Nordeste brasileiro ao Senegal, vamos onde a sede é mais urgente.\n' +
      'From the Brazilian Northeast to Senegal, we go where thirst is most urgent.'
    )
    .setChoiceValues([
      'Apenas remoto / Remote only',
      'Remoto, com viagens eventuais / Remote, with occasional travel',
      'Disponível para ir a campo / Available to go into the field'
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
    .setTitle('Como você chegou até aqui? / How did you find us?')
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
      'estes dados apenas para avaliar sua candidatura e falar com você. Não passamos para ninguém. ' +
      'Para corrigir ou apagar, escreva para wellsofchange@gmail.com.\n' +
      'Wells of Change (CNPJ 43.933.784/0001-13, the organization\'s Brazilian tax registration) uses ' +
      'this data only to review your application and talk to you. We pass it to no one. To correct ' +
      'or delete it, write to wellsofchange@gmail.com.'
    )
    .setChoiceValues(['Autorizo o uso dos meus dados para esta finalidade / I consent to this use of my data'])
    .setRequired(true);

  form.setConfirmationMessage(
    'Recebemos sua candidatura. Obrigado por oferecer seu tempo. Lemos com atenção e respondemos em ' +
    'até 14 dias, mesmo quando não há uma frente aberta para o seu perfil. Enquanto isso, o projeto ' +
    'está em wellsofchange.com.\n\n' +
    'We have your application. Thank you for offering your time. We read every one and reply within ' +
    '14 days, even when there is no open need matching your profile. In the meantime, the project is ' +
    'at wellsofchange.com.'
  );

  form.setCollectEmail(false);
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);

  Logger.log('Formulário montado / Form built: ' + form.getItems().length + ' perguntas / questions.');
}
