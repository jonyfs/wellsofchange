# GitHub Pages Configuration for Wells of Change

This document explains how the Wells of Change website is configured to work with GitHub Pages, particularly focusing on the internationalization (i18n) setup.

## Repository Structure

The website is hosted from the `main` branch of the `wellsofchange` repository, with the following key components:

- `index.html` and other HTML files at the root
- `/js/` directory for JavaScript files, including i18n configuration
- `/css/` directory for stylesheets
- `/locales/` directory containing translation files for each language
- `.nojekyll` file to disable Jekyll processing

## GitHub Pages URL Structure

When hosted on GitHub Pages, the website is available at:
```
https://jonyfs.github.io/wellsofchange/
```

## i18next Configuration

The i18n system uses the following adjustments to work correctly on GitHub Pages:

1. **Dynamic Base Path Detection**: 
   - The `path-utils.js` file contains a `getBasePath()` function that detects whether the site is running on GitHub Pages or locally
   - When on GitHub Pages, it prepends `/wellsofchange` to all paths
   - When running locally, it uses root-relative paths

2. **Translation File Loading**:
   - The i18next HTTP Backend is configured to load translation files from the correct location whether on GitHub Pages or local development
   - Path structure: `{basePath}/locales/{language}/translation.json`

3. **Link Fixing**:
   - The `fixLinks()` function automatically corrects all links, CSS references, script sources, and image paths to include the repository name when deployed on GitHub Pages
   - This ensures that all resources are loaded correctly without manual path adjustments

## Path Resolution

The `path-utils.js` file provides utility functions for handling paths:

```javascript
// Returns '/wellsofchange' when on GitHub Pages, or '' when local
getBasePath()

// Automatically fixes all links in the DOM when on GitHub Pages
fixLinks()
```

## Deployment Process

To deploy updates to GitHub Pages:

1. Make changes to the codebase locally
2. Test locally to ensure everything works
3. Commit changes to the main branch
4. Push to GitHub
5. GitHub Actions will automatically deploy the site to GitHub Pages

## Testing

To test the GitHub Pages configuration locally:

1. Simulate the GitHub Pages URL structure by serving from a subfolder
2. Test language switching to ensure all translations load correctly
3. Verify that all links work as expected

## Troubleshooting

If resources fail to load on GitHub Pages:

1. Check browser console for 404 errors
2. Verify that the path begins with `/wellsofchange/` for all resources
3. Ensure the `.nojekyll` file exists in the repository root
4. Check that the repository settings have GitHub Pages enabled for the main branch