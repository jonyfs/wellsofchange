#!/bin/bash

# Script to update the language-switcher from dropdown to flag links
# Run from the root of the repository

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Updating language switchers in all HTML files...${NC}"

# Function to update language switcher in a file
update_language_switcher() {
  local file=$1
  echo -e "Processing ${file}..."
  
  # Use sed to replace the dropdown with flag links
  # Note: we need different sed syntax for Mac vs Linux
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OS X
    sed -i '' 's/<div class="language-switcher">\s*<select id="language-select" class="language-select" data-flag="🇺🇸">\s*<option value="en">🇺🇸<\/option>\s*<option value="fr">🇫🇷<\/option>\s*<option value="es">🇪🇸<\/option>\s*<option value="pt-BR">🇧🇷<\/option>\s*<\/select>\s*<\/div>/<div class="language-switcher">\n                    <a href="#" class="language-flag active" data-lang="en">🇺🇸<\/a>\n                    <a href="#" class="language-flag" data-lang="fr">🇫🇷<\/a>\n                    <a href="#" class="language-flag" data-lang="es">🇪🇸<\/a>\n                    <a href="#" class="language-flag" data-lang="pt-BR">🇧🇷<\/a>\n                <\/div>/g' "$file"
  else
    # Linux and others
    sed -i 's/<div class="language-switcher">\s*<select id="language-select" class="language-select" data-flag="🇺🇸">\s*<option value="en">🇺🇸<\/option>\s*<option value="fr">🇫🇷<\/option>\s*<option value="es">🇪🇸<\/option>\s*<option value="pt-BR">🇧🇷<\/option>\s*<\/select>\s*<\/div>/<div class="language-switcher">\n                    <a href="#" class="language-flag active" data-lang="en">🇺🇸<\/a>\n                    <a href="#" class="language-flag" data-lang="fr">🇫🇷<\/a>\n                    <a href="#" class="language-flag" data-lang="es">🇪🇸<\/a>\n                    <a href="#" class="language-flag" data-lang="pt-BR">🇧🇷<\/a>\n                <\/div>/g' "$file"
  fi
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Updated ${file} successfully${NC}"
  else
    echo -e "\033[0;31mFailed to update ${file}${NC}"
  fi
}

# Update remaining pages in the pages directory
for file in pages/programs.html pages/resources.html pages/get-involved.html pages/donate.html; do
  if [ -f "$file" ]; then
    update_language_switcher "$file"
  else
    echo -e "\033[0;31mFile not found: ${file}${NC}"
  fi
done

echo -e "${GREEN}Language switcher update complete!${NC}"