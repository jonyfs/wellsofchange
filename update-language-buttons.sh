#!/bin/bash

# Script to update the language-switcher from links to buttons
# Run from the root of the repository

# Define colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Updating language switchers to use buttons in all HTML files...${NC}"

# Function to update language switcher in a file
update_language_switcher() {
  local file=$1
  echo -e "Processing ${file}..."
  
  # Use sed to replace the links with buttons
  # Note: we need different sed syntax for Mac vs Linux
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # Mac OS X
    sed -i '' 's/<a href="#" class="language-flag active" data-lang="en">🇺🇸<\/a>\s*<a href="#" class="language-flag" data-lang="fr">🇫🇷<\/a>\s*<a href="#" class="language-flag" data-lang="es">🇪🇸<\/a>\s*<a href="#" class="language-flag" data-lang="pt-BR">🇧🇷<\/a>/<button type="button" class="language-btn active" data-lang="en">🇺🇸<\/button>\n                    <button type="button" class="language-btn" data-lang="fr">🇫🇷<\/button>\n                    <button type="button" class="language-btn" data-lang="es">🇪🇸<\/button>\n                    <button type="button" class="language-btn" data-lang="pt-BR">🇧🇷<\/button>/g' "$file"
  else
    # Linux and others
    sed -i 's/<a href="#" class="language-flag active" data-lang="en">🇺🇸<\/a>\s*<a href="#" class="language-flag" data-lang="fr">🇫🇷<\/a>\s*<a href="#" class="language-flag" data-lang="es">🇪🇸<\/a>\s*<a href="#" class="language-flag" data-lang="pt-BR">🇧🇷<\/a>/<button type="button" class="language-btn active" data-lang="en">🇺🇸<\/button>\n                    <button type="button" class="language-btn" data-lang="fr">🇫🇷<\/button>\n                    <button type="button" class="language-btn" data-lang="es">🇪🇸<\/button>\n                    <button type="button" class="language-btn" data-lang="pt-BR">🇧🇷<\/button>/g' "$file"
  fi
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}Updated ${file} successfully${NC}"
  else
    echo -e "\033[0;31mFailed to update ${file}${NC}"
  fi
}

# Update pages in the pages directory
for file in pages/*.html; do
  if [ -f "$file" ]; then
    update_language_switcher "$file"
  else
    echo -e "\033[0;31mFile not found: ${file}${NC}"
  fi
done

echo -e "${GREEN}Language switcher update to buttons complete!${NC}"