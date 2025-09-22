// Debug utility for GitHub Pages deployment
// Include this file to display debug information in the console

(function() {
  console.log('=== GitHub Pages Debug Information ===');
  console.log('Location:', window.location.toString());
  console.log('Hostname:', window.location.hostname);
  console.log('Pathname:', window.location.pathname);
  
  // Configuration
  if (window.wellsOfChangeConfig) {
    console.log('Config basePath:', window.wellsOfChangeConfig.basePath);
  } else {
    console.error('Config not found!');
  }
  
  // Check for resource loading issues
  window.addEventListener('error', function(e) {
    if (e.target.tagName === 'LINK' || e.target.tagName === 'SCRIPT' || e.target.tagName === 'IMG') {
      console.error('Resource failed to load:', e.target.src || e.target.href);
    }
  }, true);
  
  // List all script sources
  console.log('=== Script Sources ===');
  document.querySelectorAll('script[src]').forEach(script => {
    console.log(script.src);
  });
  
  // List all CSS links
  console.log('=== CSS Sources ===');
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    console.log(link.href);
  });
  
  console.log('=== Debug Information End ===');
})();