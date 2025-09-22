#!/bin/bash

# List of pages to update
PAGES=("contact.html" "donate.html" "get-involved.html" "programs.html" "resources.html")
BASE_DIR="/home/jony-santos/repositories/wellsofchange/pages"

# Function to update CSS imports
update_css_imports() {
  local file="$1"
  sed -i '/<link rel="stylesheet" href="..\/css\/styles.css">/c\
    <link rel="stylesheet" href="../css/styles.css">\
    <link rel="stylesheet" href="../css/language-switcher.css">\
    <link rel="stylesheet" href="../css/navigation.css">' "$file"
}

# Function to add Material Design drawer
add_drawer() {
  local file="$1"
  local page_name=$(basename "$file" .html)
  
  # Determine which item should be active based on the current page
  local home_active=""
  local about_active=""
  local programs_active=""
  local get_involved_active=""
  local resources_active=""
  local contact_active=""
  local donate_active=""
  
  case "$page_name" in
    "about") about_active="mdc-list-item--activated" ;;
    "programs") programs_active="mdc-list-item--activated" ;;
    "get-involved") get_involved_active="mdc-list-item--activated" ;;
    "resources") resources_active="mdc-list-item--activated" ;;
    "contact") contact_active="mdc-list-item--activated" ;;
    "donate") donate_active="mdc-list-item--activated" ;;
  esac
  
  # Insert the drawer HTML
  sed -i '/<body class="mdc-typography">/a\
    <!-- Material Design Drawer -->\
    <aside class="mdc-drawer mdc-drawer--modal">\
        <div class="mdc-drawer__header">\
            <h3 class="mdc-drawer__title">Wells of Change</h3>\
            <h6 class="mdc-drawer__subtitle">Making a Difference</h6>\
        </div>\
        <div class="mdc-drawer__content">\
            <nav class="mdc-list">\
                <a class="mdc-list-item '$home_active'" href="../index.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">home</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.home">Home</span>\
                </a>\
                <a class="mdc-list-item '$about_active'" href="about.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">info</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.about">About Us</span>\
                </a>\
                <a class="mdc-list-item '$programs_active'" href="programs.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">lightbulb</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.programs">Programs</span>\
                </a>\
                <a class="mdc-list-item '$get_involved_active'" href="get-involved.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">people</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.getInvolved">Get Involved</span>\
                </a>\
                <a class="mdc-list-item '$resources_active'" href="resources.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">library_books</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.resources">Resources</span>\
                </a>\
                <a class="mdc-list-item '$contact_active'" href="contact.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">email</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.contact">Contact</span>\
                </a>\
                <div class="mdc-list-divider" role="separator"></div>\
                <a class="mdc-list-item mdc-list-item--highlighted '$donate_active'" href="donate.html">\
                    <span class="mdc-list-item__ripple"></span>\
                    <i class="material-icons mdc-list-item__graphic" aria-hidden="true">favorite</i>\
                    <span class="mdc-list-item__text" data-i18n="nav.donate">Donate</span>\
                </a>\
            </nav>\
        </div>\
    </aside>\
    <div class="mdc-drawer-scrim"></div>\
\
    <!-- Header with top app bar -->' "$file"
  
  # Remove the original header comment
  sed -i 's/<!-- Header with top app bar -->//' "$file"
}

# Function to update top app bar with language switcher
update_top_app_bar() {
  local file="$1"
  local page_name=$(basename "$file" .html)
  
  # Replace the top app bar
  sed -i '/<header class="mdc-top-app-bar mdc-top-app-bar--fixed">/,/<\/header>/c\
    <header class="mdc-top-app-bar mdc-top-app-bar--fixed">\
        <div class="mdc-top-app-bar__row">\
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">\
                <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>\
                <span class="mdc-top-app-bar__title">Wells of Change</span>\
            </section>\
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">\
                <div class="language-switcher">\
                    <button class="active" data-lang="en">EN</button>\
                    <button data-lang="fr">FR</button>\
                    <button data-lang="es">ES</button>\
                    <button data-lang="pt-BR">PT</button>\
                </div>\
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">search</button>\
                <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button">favorite</button>\
            </section>\
        </div>\
    </header>\
\
    <!-- Main Navigation Menu -->\
    <nav class="main-nav">\
        <div class="container">\
            <div class="mdc-tab-bar" role="tablist">\
                <div class="mdc-tab-scroller">\
                    <div class="mdc-tab-scroller__scroll-area">\
                        <div class="mdc-tab-scroller__scroll-content">\
                            <a href="../index.html" class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">home</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.home">Home</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                            <a href="about.html" class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">info</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.about">About Us</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                            <a href="programs.html" class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">lightbulb</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.programs">Programs</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                            <a href="get-involved.html" class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">people</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.getInvolved">Get Involved</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                            <a href="resources.html" class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">library_books</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.resources">Resources</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                            <a href="contact.html" class="mdc-tab" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">email</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.contact">Contact</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                            <a href="donate.html" class="mdc-tab mdc-tab--donate" role="tab" aria-selected="false" tabindex="-1">\
                                <span class="mdc-tab__content">\
                                    <span class="mdc-tab__icon material-icons" aria-hidden="true">favorite</span>\
                                    <span class="mdc-tab__text-label" data-i18n="nav.donate">Donate</span>\
                                </span>\
                                <span class="mdc-tab-indicator">\
                                    <span class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"></span>\
                                </span>\
                                <span class="mdc-tab__ripple"></span>\
                            </a>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </nav>' "$file"
  
  # Set the active tab based on the current page
  if [ "$page_name" = "about" ]; then
    sed -i 's/<a href="about.html" class="mdc-tab"/<a href="about.html" class="mdc-tab mdc-tab--active"/g' "$file"
    sed -i 's/aria-selected="false" tabindex="-1"/aria-selected="true" tabindex="0"/g' "$file"
    sed -i 's/<span class="mdc-tab-indicator">/<span class="mdc-tab-indicator mdc-tab-indicator--active">/g' "$file"
  elif [ "$page_name" = "programs" ]; then
    sed -i 's/<a href="programs.html" class="mdc-tab"/<a href="programs.html" class="mdc-tab mdc-tab--active"/g' "$file"
    sed -i 's/aria-selected="false" tabindex="-1"/aria-selected="true" tabindex="0"/g' "$file"
    sed -i 's/<span class="mdc-tab-indicator">/<span class="mdc-tab-indicator mdc-tab-indicator--active">/g' "$file"
  elif [ "$page_name" = "get-involved" ]; then
    sed -i 's/<a href="get-involved.html" class="mdc-tab"/<a href="get-involved.html" class="mdc-tab mdc-tab--active"/g' "$file"
    sed -i 's/aria-selected="false" tabindex="-1"/aria-selected="true" tabindex="0"/g' "$file"
    sed -i 's/<span class="mdc-tab-indicator">/<span class="mdc-tab-indicator mdc-tab-indicator--active">/g' "$file"
  elif [ "$page_name" = "resources" ]; then
    sed -i 's/<a href="resources.html" class="mdc-tab"/<a href="resources.html" class="mdc-tab mdc-tab--active"/g' "$file"
    sed -i 's/aria-selected="false" tabindex="-1"/aria-selected="true" tabindex="0"/g' "$file"
    sed -i 's/<span class="mdc-tab-indicator">/<span class="mdc-tab-indicator mdc-tab-indicator--active">/g' "$file"
  elif [ "$page_name" = "contact" ]; then
    sed -i 's/<a href="contact.html" class="mdc-tab"/<a href="contact.html" class="mdc-tab mdc-tab--active"/g' "$file"
    sed -i 's/aria-selected="false" tabindex="-1"/aria-selected="true" tabindex="0"/g' "$file"
    sed -i 's/<span class="mdc-tab-indicator">/<span class="mdc-tab-indicator mdc-tab-indicator--active">/g' "$file"
  elif [ "$page_name" = "donate" ]; then
    sed -i 's/<a href="donate.html" class="mdc-tab mdc-tab--donate"/<a href="donate.html" class="mdc-tab mdc-tab--donate mdc-tab--active"/g' "$file"
    sed -i 's/aria-selected="false" tabindex="-1"/aria-selected="true" tabindex="0"/g' "$file"
    sed -i 's/<span class="mdc-tab-indicator">/<span class="mdc-tab-indicator mdc-tab-indicator--active">/g' "$file"
  fi
}

# Function to update footer with i18n
update_footer() {
  local file="$1"
  
  # Update the footer
  sed -i '/<footer class="footer">/,/<\/footer>/c\
    <!-- Footer -->\
    <footer class="footer">\
        <div class="container">\
            <div class="footer-content">\
                <div class="footer-section">\
                    <h3 class="mdc-typography--headline6">Wells of Change</h3>\
                    <p class="mdc-typography--body2" data-i18n="footer.aboutText">Making clean water accessible to everyone, everywhere.</p>\
                </div>\
                <div class="footer-section">\
                    <h3 class="mdc-typography--subtitle1" data-i18n="footer.quickLinks">Quick Links</h3>\
                    <ul class="footer-links">\
                        <li><a href="../index.html" data-i18n="nav.home">Home</a></li>\
                        <li><a href="about.html" data-i18n="nav.about">About Us</a></li>\
                        <li><a href="programs.html" data-i18n="nav.programs">Programs</a></li>\
                        <li><a href="get-involved.html" data-i18n="nav.getInvolved">Get Involved</a></li>\
                        <li><a href="resources.html" data-i18n="nav.resources">Resources</a></li>\
                        <li><a href="contact.html" data-i18n="nav.contact">Contact</a></li>\
                        <li><a href="donate.html" data-i18n="nav.donate">Donate</a></li>\
                    </ul>\
                </div>\
                <div class="footer-section">\
                    <h3 class="mdc-typography--subtitle1" data-i18n="footer.newsletter.title">Newsletter</h3>\
                    <p class="mdc-typography--body2">Stay updated with our latest news and projects.</p>\
                    <div class="newsletter-form">\
                        <div class="mdc-text-field mdc-text-field--outlined">\
                            <input class="mdc-text-field__input" id="newsletter-input" type="email">\
                            <div class="mdc-notched-outline">\
                                <div class="mdc-notched-outline__leading"></div>\
                                <div class="mdc-notched-outline__notch">\
                                    <label for="newsletter-input" class="mdc-floating-label" data-i18n-attr=\'{"placeholder": "footer.newsletter.placeholder"}\'>Email</label>\
                                </div>\
                                <div class="mdc-notched-outline__trailing"></div>\
                            </div>\
                        </div>\
                        <button class="mdc-button mdc-button--raised">\
                            <span class="mdc-button__label" data-i18n="footer.newsletter.button">Subscribe</span>\
                        </button>\
                    </div>\
                </div>\
            </div>\
            <div class="footer-bottom">\
                <p class="mdc-typography--caption" data-i18n="footer.copyright">&copy; 2025 Wells of Change. All rights reserved.</p>\
            </div>\
        </div>\
    </footer>' "$file"
}

# Function to update JavaScript imports
update_js_imports() {
  local file="$1"
  
  # Update the JavaScript imports
  sed -i 's/<!-- Material Design JavaScript -->/<!-- Material Design JavaScript -->/;
          s/<script src="https:\/\/unpkg.com\/material-components-web@latest\/dist\/material-components-web.min.js"><\/script>/\
    <script src="https:\/\/unpkg.com\/material-components-web@latest\/dist\/material-components-web.min.js"><\/script>\
    \
    <!-- Global Config -->\
    <script src="..\/js\/config.js"><\/script>\
    \
    <!-- GitHub Pages Debug -->\
    <script src="..\/js\/github-pages-debug.js"><\/script>\
    \
    <!-- Path Utilities for GitHub Pages -->\
    <script type="module" src="..\/js\/path-utils.js"><\/script>\
    \
    <!-- i18next Libraries -->\
    <script type="module" src="..\/js\/i18n.js"><\/script>/;' "$file"
}

# Process each page
for page in "${PAGES[@]}"; do
  file_path="$BASE_DIR/$page"
  echo "Updating $file_path..."
  
  # Make a backup of the original file
  cp "$file_path" "$file_path.bak"
  
  # Apply the updates
  update_css_imports "$file_path"
  add_drawer "$file_path"
  update_top_app_bar "$file_path"
  update_footer "$file_path"
  update_js_imports "$file_path"
  
  echo "Updated $file_path successfully."
done

echo "All pages have been updated."