// Path utilities for GitHub Pages compatibility

// Determine the base path based on the environment
export const getBasePath = () => {
  // Check if we're on GitHub Pages
  const isGitHubPages = window.location.hostname.includes('github.io');
  // Use repository name for GitHub Pages, empty string for local development
  return isGitHubPages ? '/wellsofchange' : '';
};

// Fix links in the DOM to include the base path when on GitHub Pages
export const fixLinks = () => {
  const basePath = getBasePath();
  
  // Skip if we're not on GitHub Pages
  if (!basePath) return;
  
  // Fix navigation links
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    // Don't modify absolute URLs or those already containing the base path
    if (!link.getAttribute('href').startsWith(basePath)) {
      link.href = `${basePath}${link.getAttribute('href')}`;
    }
  });
  
  // Fix CSS links
  document.querySelectorAll('link[rel="stylesheet"][href^="/"]').forEach(link => {
    if (!link.getAttribute('href').startsWith(basePath)) {
      link.href = `${basePath}${link.getAttribute('href')}`;
    }
  });
  
  // Fix JavaScript sources
  document.querySelectorAll('script[src^="/"]').forEach(script => {
    if (!script.getAttribute('src').startsWith(basePath)) {
      script.src = `${basePath}${script.getAttribute('src')}`;
    }
  });
  
  // Fix images
  document.querySelectorAll('img[src^="/"]').forEach(img => {
    if (!img.getAttribute('src').startsWith(basePath)) {
      img.src = `${basePath}${img.getAttribute('src')}`;
    }
  });
};

// Call this function early in page load
document.addEventListener('DOMContentLoaded', fixLinks);