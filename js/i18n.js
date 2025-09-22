// i18next configuration
import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.7.3/+esm';
import HttpBackend from 'https://cdn.jsdelivr.net/npm/i18next-http-backend@2.4.1/+esm';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@7.2.0/+esm';

// Initialize i18next
const i18nextInit = async () => {
  await i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      fallbackLng: 'en',
      supportedLngs: ['en', 'fr', 'es', 'pt-BR'],
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
      detection: {
        order: ['querystring', 'navigator', 'localStorage', 'sessionStorage', 'htmlTag'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'i18nextLng',
        lookupSessionStorage: 'i18nextLng',
        caches: ['localStorage', 'sessionStorage'],
      }
    });

  // Update all elements with i18n attributes
  updateContent();
  
  // Add language switcher functionality
  setupLanguageSwitcher();
};

// Function to update content with translations
const updateContent = () => {
  // Get all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    element.textContent = i18next.t(key);
  });

  // Handle attributes (like placeholders, alt texts, etc.)
  document.querySelectorAll('[data-i18n-attr]').forEach(element => {
    const attributesJSON = element.getAttribute('data-i18n-attr');
    if (attributesJSON) {
      try {
        const attributes = JSON.parse(attributesJSON);
        Object.keys(attributes).forEach(attr => {
          element.setAttribute(attr, i18next.t(attributes[attr]));
        });
      } catch (e) {
        console.error('Invalid data-i18n-attr JSON', e);
      }
    }
  });
};

// Set up language switcher
const setupLanguageSwitcher = () => {
  const languageSwitchers = document.querySelectorAll('.language-switcher');
  
  languageSwitchers.forEach(switcher => {
    switcher.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        const lang = event.target.getAttribute('data-lang');
        changeLanguage(lang);
      }
    });
  });
};

// Change language function
const changeLanguage = (lang) => {
  i18next.changeLanguage(lang).then(() => {
    updateContent();
    document.documentElement.lang = lang;
    
    // Update active state in language switchers
    document.querySelectorAll('.language-switcher button').forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  });
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', i18nextInit);

// Export for use in other scripts if needed
export { i18next, changeLanguage };