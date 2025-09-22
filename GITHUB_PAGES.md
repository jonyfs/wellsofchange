# Wells of Change - GitHub Pages Deployment Guide

This document provides detailed information about the GitHub Pages deployment for the Wells of Change website, especially focusing on resolving the 404 error issues.

## Deployment Structure

When deployed to GitHub Pages, the website is accessible at:
```
https://jonyfs.github.io/wellsofchange/
```

## Common GitHub Pages Issues and Solutions

### 1. Resource 404 Errors

The most common issue is resources (JS, CSS, images, translation files) failing to load with 404 errors. This happens because GitHub Pages hosts the site at `/wellsofchange/` rather than at the root path.

#### Solution Implemented:

1. **Global Configuration Object**: 
   - `js/config.js` creates a global `wellsOfChangeConfig` object that detects GitHub Pages and sets the correct base path
   - All scripts use this configuration for constructing correct URLs

2. **Automatic Path Fixing**:
   - `js/path-utils.js` automatically corrects all links in the DOM to include the repository name when on GitHub Pages
   - Handles root-relative paths (starting with `/`) and updates them to include `/wellsofchange`

3. **Dynamic i18next Configuration**:
   - Translation files are loaded using the dynamic base path
   - Debug output in the console shows the detected paths

4. **Custom 404.html Page**:
   - The 404.html page serves as both an error handler and a redirector
   - It detects the repository name from the URL and redirects to the correct path

### 2. Jekyll Processing Issues

GitHub Pages uses Jekyll by default, which can interfere with path handling.

#### Solution Implemented:

1. **.nojekyll File**:
   - An empty `.nojekyll` file in the repository root disables Jekyll processing
   - The GitHub Action workflow ensures this file is created during deployment

2. **Direct File Serving**:
   - Without Jekyll, files are served exactly as they appear in the repository
   - This ensures consistent path handling

### 3. Troubleshooting

If 404 errors persist:

1. **Check the Console**:
   - `js/github-pages-debug.js` outputs detailed debugging information
   - Look for specific resources that are failing to load

2. **Verify Base Path Detection**:
   - The config object should correctly identify GitHub Pages
   - The base path should be set to `/wellsofchange`

3. **Test Resource Loading**:
   - Try manually loading resources with the full GitHub Pages URL
   - Example: `https://jonyfs.github.io/wellsofchange/locales/en/translation.json`

4. **URL Structure**:
   - All resource URLs should include the repository name
   - Example: `/wellsofchange/js/main.js` instead of `/js/main.js`

## Deployment Workflow

The GitHub Actions workflow:

1. Checks out the repository
2. Sets up GitHub Pages environment
3. Creates the `.nojekyll` file
4. Logs repository information for debugging
5. Verifies the file structure
6. Uploads the entire repository as an artifact
7. Deploys to GitHub Pages

## Testing Locally

To test GitHub Pages configuration locally:

1. Create a subdirectory matching the repository name
2. Serve the site from that subdirectory
3. Access it via a path matching the GitHub Pages structure