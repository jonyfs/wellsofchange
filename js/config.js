// GitHub Pages Configuration
window.wellsOfChangeConfig = {
  basePath: location.hostname.includes('github.io') ? '/wellsofchange' : '',
  
  // Language settings
  language: {
    default: 'en',
    supported: ['en', 'fr', 'es', 'pt-BR'],
    useBrowserLanguage: true // Set to false to always use default language
  },
  
  // Helper to get the correct path for resources
  getPath: function(path) {
    // If path already starts with the base path, don't modify it
    if (path.startsWith(this.basePath)) {
      return path;
    }
    
    // If it's an absolute path starting with '/', add the base path
    if (path.startsWith('/')) {
      return this.basePath + path;
    }
    
    // If it's a relative path, just return it as is
    return path;
  }
};