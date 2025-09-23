#!/bin/bash

# Add social media links to the footer of all pages except contact.html (which already has them)

# List of HTML files to update
HTML_FILES=(
  "/home/jony-santos/repositories/wellsofchange/pages/about.html"
  "/home/jony-santos/repositories/wellsofchange/pages/programs.html"
  "/home/jony-santos/repositories/wellsofchange/pages/get-involved.html"
  "/home/jony-santos/repositories/wellsofchange/pages/resources.html"
  "/home/jony-santos/repositories/wellsofchange/pages/donate.html"
)

# Social media links HTML to add
SOCIAL_MEDIA_HTML='                    <div class="social-media">
                        <h3 class="mdc-typography--subtitle1">Connect With Us</h3>
                        <a href="https://web.facebook.com/Wellsofchange" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.linkedin.com/company/wellsofchange" class="social-icon"><i class="fab fa-linkedin-in"></i></a>
                        <a href="https://www.instagram.com/wellsofchange/" class="social-icon"><i class="fab fa-instagram"></i></a>
                    </div>'

# Loop through each file and add the social media links
for file in "${HTML_FILES[@]}"; do
  # Check if the file exists
  if [ -f "$file" ]; then
    # Add social media links after the footer-section that contains "Wells of Change"
    sed -i '/Wells of Change/,/<\/p>/!b;/<\/p>/a '"$SOCIAL_MEDIA_HTML" "$file"
    echo "Added social media links to $file"
  else
    echo "File not found: $file"
  fi
done

echo "Social media links have been added to all pages!"