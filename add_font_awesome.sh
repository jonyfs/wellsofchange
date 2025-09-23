#!/bin/bash

# Update all HTML pages to include Font Awesome

# Find all HTML files in the repository
HTML_FILES=$(find /home/jony-santos/repositories/wellsofchange -name "*.html")

# Loop through each HTML file
for file in $HTML_FILES
do
  # Skip files that already have Font Awesome
  if grep -q "font-awesome" "$file"; then
    echo "Font Awesome already in $file, skipping..."
    continue
  fi
  
  # Add Font Awesome link after Google Fonts
  sed -i '/<link href="https:\/\/fonts.googleapis.com\/css2/a \    <!-- Font Awesome -->\n    <link href="https:\/\/cdnjs.cloudflare.com\/ajax\/libs\/font-awesome\/6.0.0\/css\/all.min.css" rel="stylesheet">' "$file"
  
  echo "Added Font Awesome to $file"
done

echo "Completed adding Font Awesome to all HTML files!"