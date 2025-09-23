// i18next configuration
import i18next from 'https://cdn.jsdelivr.net/npm/i18next@23.7.3/+esm';
import HttpBackend from 'https://cdn.jsdelivr.net/npm/i18next-http-backend@2.4.1/+esm';
import LanguageDetector from 'https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@7.2.0/+esm';

// Initialize i18next
const i18nextInit = async () => {
  // Get the base path and language settings from the global config
  const basePath = window.wellsOfChangeConfig?.basePath || '';
  const langConfig = window.wellsOfChangeConfig?.language || { default: 'en', supported: ['en', 'fr', 'es', 'pt-BR'], useBrowserLanguage: true };
  
  try {
    await i18next
      .use(HttpBackend)
      .use(LanguageDetector)
      .init({
        fallbackLng: langConfig.default,
        supportedLngs: langConfig.supported,
        ns: ['translation'],
        defaultNS: 'translation',
        backend: {
          loadPath: `${basePath}/locales/{{lng}}/{{ns}}.json`,
        },
        detection: {
          order: langConfig.useBrowserLanguage 
            ? ['navigator', 'querystring', 'localStorage', 'sessionStorage', 'htmlTag'] 
            : ['querystring', 'localStorage', 'sessionStorage', 'htmlTag'],
          lookupQuerystring: 'lng',
          lookupLocalStorage: 'i18nextLng',
          lookupSessionStorage: 'i18nextLng',
          caches: ['localStorage', 'sessionStorage'],
        }
      });

    console.log(`i18next initialized with basePath: ${basePath}`);
    
    // Update all elements with i18n attributes
    updateContent();
    
    // Add language switcher functionality
    setupLanguageSwitcher();
    
    // Update UI to show the current language
    updateLanguageUI(i18next.language);
  } catch (error) {
    console.error('i18next initialization failed:', error);
  }
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

// Get the best matching language based on browser language
const getBestMatchingLanguage = () => {
  // Get config settings
  const langConfig = window.wellsOfChangeConfig?.language || { 
    default: 'en', 
    supported: ['en', 'fr', 'es', 'pt-BR'], 
    useBrowserLanguage: true 
  };
  
  // If browser language detection is disabled, use default
  if (!langConfig.useBrowserLanguage) {
    return langConfig.default;
  }
  
  const browserLang = navigator.language || navigator.userLanguage;
  const supportedLangs = langConfig.supported;
  
  // Check for exact match
  if (supportedLangs.includes(browserLang)) {
    return browserLang;
  }
  
  // Check for language code match (e.g., 'en-US' should match 'en')
  const langCode = browserLang.split('-')[0];
  if (supportedLangs.includes(langCode)) {
    return langCode;
  }
  
  // Special case for Portuguese variants
  if (langCode === 'pt') {
    return 'pt-BR';
  }
  
  // Default to config default
  return langConfig.default;
};

// Set up language switcher
const setupLanguageSwitcher = () => {
  // First handle any remaining select dropdowns (for backward compatibility)
  const languageSelects = document.querySelectorAll('.language-select');
  
  // Then handle the new flag links
  const languageFlags = document.querySelectorAll('.language-flag');
  
  // If no language is explicitly set (or it's not in our supported list), use browser language
  const currentLang = i18next.language;
  const langConfig = window.wellsOfChangeConfig?.language || {
    default: 'en',
    supported: ['en', 'fr', 'es', 'pt-BR'],
    useBrowserLanguage: true
  };
  
  if (!langConfig.supported.includes(currentLang)) {
    const bestLang = getBestMatchingLanguage();
    console.log(`Current language "${currentLang}" not supported, switching to "${bestLang}"`);
    changeLanguage(bestLang);
  }
  
  // Setup for select dropdowns (if any still exist)
  languageSelects.forEach(select => {
    // Set initial value based on current language
    select.value = i18next.language;
    
    // Set the flag for the current language
    const selectedOption = Array.from(select.options).find(option => option.value === i18next.language);
    if (selectedOption) {
      const flagText = selectedOption.textContent.trim().split(' ')[0];
      select.setAttribute('data-flag', flagText);
    }
    
    // Add change event listener
    select.addEventListener('change', (event) => {
      const lang = event.target.value;
      changeLanguage(lang);
    });
  });
  
  // Setup for flag links
  languageFlags.forEach(flag => {
    // Mark the current language as active
    const flagLang = flag.getAttribute('data-lang');
    if (flagLang === i18next.language) {
      flag.classList.add('active');
    } else {
      flag.classList.remove('active');
    }
    
    // Add click event listener
    flag.addEventListener('click', (event) => {
      event.preventDefault();
      const lang = flag.getAttribute('data-lang');
      changeLanguage(lang);
    });
  });
};

// Change language function
const changeLanguage = (lang) => {
  i18next.changeLanguage(lang).then(() => {
    updateContent();
    updateLanguageUI(lang);
  });
};

// Update language UI elements
const updateLanguageUI = (lang) => {
  document.documentElement.lang = lang;
  
  // Update select boxes to show current language (for backward compatibility)
  document.querySelectorAll('.language-select').forEach(select => {
    select.value = lang;
    
    // Update the flag in the main display
    const selectedOption = Array.from(select.options).find(option => option.value === lang);
    if (selectedOption) {
      const flagText = selectedOption.textContent.trim().split(' ')[0];
      select.setAttribute('data-flag', flagText);
    }
  });
  
  // Update flag links to show current language
  document.querySelectorAll('.language-flag').forEach(flag => {
    const flagLang = flag.getAttribute('data-lang');
    if (flagLang === lang) {
      flag.classList.add('active');
    } else {
      flag.classList.remove('active');
    }
  });
  
  console.log(`Language set to: ${lang}`);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', i18nextInit);

// Export for use in other scripts if needed
export { i18next, changeLanguage, getBestMatchingLanguage };