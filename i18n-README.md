# Wells of Change - Internationalization (i18n)

This project uses i18next for internationalization, allowing the website to be displayed in multiple languages: English, French, Spanish, and Portuguese.

## Structure

- `locales/` - Contains translation files for each language
  - `en/` - English translations (default language)
  - `fr/` - French translations
  - `es/` - Spanish translations
  - `pt-BR/` - Brazilian Portuguese translations
- `js/i18n.js` - Configuration file for i18next
- `css/language-switcher.css` - Styles for the language switcher component
- `i18n-example.html` - Example page demonstrating how to use i18next

## How It Works

1. The website uses i18next with HTTP backend and language detector plugins.
2. Translations are stored in JSON files in the `locales` directory.
3. The language switcher in the header allows users to change the language without refreshing the page.
4. Elements with the `data-i18n` attribute are automatically translated according to the selected language.

## Adding a New Language

To add a new language:

1. Create a new directory in `locales/` with the language code (e.g., `locales/de/` for German).
2. Copy the structure of `translation.json` from the `en` directory.
3. Translate all text in the new file.
4. Add the language to the supported languages list in `js/i18n.js`:

```javascript
supportedLngs: ['en', 'fr', 'es', 'pt-BR', 'de'],
```

5. Add a new button to the language switcher in all HTML files:

```html
<button data-lang="pt-BR">PT</button>
```

## Translating Content

### Text Content

To make text translatable, add the `data-i18n` attribute with the translation key:

```html
<h1 data-i18n="home.hero.title">Making a Difference Together</h1>
```

The default text is shown initially and will be replaced with the translation when i18next loads.

### Attributes

For attributes like placeholders, use the `data-i18n-attr` attribute with a JSON string:

```html
<input placeholder="Email" data-i18n-attr='{"placeholder": "footer.newsletter.placeholder"}'>
```

## Adding New Translations

When adding new content to the website:

1. Add the content with appropriate `data-i18n` attributes.
2. Add the translation keys to all language files in the `locales` directory.

## Translation Organization

Translations are organized hierarchically in the JSON files:

- `nav`: Navigation items
- `home`: Home page content
- `getInvolved`: Get Involved page content
- `footer`: Footer content

Each section contains subsections for different parts of the page.

## Language Detection

The website uses the following methods to detect the user's preferred language:

1. URL query parameter: `?lng=fr`
2. Browser language settings
3. LocalStorage/SessionStorage
4. HTML lang attribute

## Testing Translations

To test translations:

1. View the website locally or on GitHub Pages.
2. Click the language buttons in the header to switch languages.
3. Or add `?lng=fr` (replace 'fr' with any supported language code) to the URL.

## Example

An example page is provided at `i18n-example.html` which demonstrates how to use i18next in a simple context.