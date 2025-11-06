# 🌍 Automatic Language Detection

## ✅ Feature Added

The Wells of Change website now **automatically detects your browser's language** and displays the site in your preferred language!

---

## 🎯 How It Works

### **1. First Visit (No Saved Preference)**

When you visit the site for the first time:

```
Browser Language → Detected → Site Language
```

| Browser Setting | Site Displays |
|----------------|---------------|
| English (en, en-US, en-GB, etc.) | 🇬🇧 English |
| Portuguese (pt, pt-BR, pt-PT, etc.) | 🇧🇷 Portuguese (Brazil) |
| Spanish (es, es-ES, es-MX, etc.) | 🇪🇸 Spanish |
| French (fr, fr-FR, fr-CA, etc.) | 🇫🇷 French |
| Any other language | 🇬🇧 English (default) |

### **2. Language Selection (User Choice)**

When you manually select a language using the language selector:
- Your choice is **saved** to browser storage
- The site **always** uses your saved preference
- Your choice **overrides** browser detection

### **3. Return Visits**

When you return to the site:
- **If you've selected a language**: Uses your saved preference ✅
- **If you haven't selected**: Re-detects browser language ✅

---

## 🔧 Technical Implementation

### **Detection Logic**

```typescript
function detectBrowserLanguage(): Language {
  // Get browser language
  const browserLang = navigator.language;
  
  // Map to supported languages
  if (browserLang.startsWith("pt")) return "pt-BR";
  if (browserLang.startsWith("es")) return "es";
  if (browserLang.startsWith("fr")) return "fr";
  if (browserLang.startsWith("en")) return "en";
  
  // Default to English
  return "en";
}
```

### **Priority Order**

```
1. Saved user preference (localStorage)
   ↓ (if not found)
2. Browser language detection
   ↓ (if not supported)
3. Default to English
```

---

## 📊 Supported Languages

| Language | Code | Detects |
|----------|------|---------|
| **English** | `en` | en, en-US, en-GB, en-CA, en-AU, etc. |
| **Portuguese (BR)** | `pt-BR` | pt, pt-BR, pt-PT, etc. |
| **Spanish** | `es` | es, es-ES, es-MX, es-AR, etc. |
| **French** | `fr` | fr, fr-FR, fr-CA, fr-BE, etc. |

---

## 🧪 Testing

### **Test Different Browser Languages**

**Chrome/Edge**:
1. Settings → Languages
2. Add or reorder languages
3. Refresh the site
4. Site should detect the top language

**Firefox**:
1. Settings → Language
2. Choose language
3. Restart browser
4. Visit site

**Safari**:
1. System Preferences → Language & Region
2. Change preferred language
3. Restart Safari
4. Visit site

### **Test Manual Override**

1. Visit site (auto-detects your browser language)
2. Click language selector FAB
3. Select a different language
4. Refresh page
5. Site should remember your choice (not browser language)

### **Test Default Fallback**

1. Set browser to unsupported language (e.g., Chinese, Japanese)
2. Clear browser storage for the site
3. Visit site
4. Should display in English (default)

---

## 💾 Storage

**Key**: `wellsofchange-language`  
**Location**: Browser localStorage  
**Values**: `"en"` | `"pt-BR"` | `"es"` | `"fr"`

**To clear saved preference** (for testing):
```javascript
// Open browser console (F12)
localStorage.removeItem('wellsofchange-language');
location.reload();
```

---

## 🌍 User Experience

### **Scenario 1: Brazilian Visitor**
- Browser: Chrome set to Portuguese (pt-BR)
- First visit: Site displays in Portuguese ✅
- Selects Spanish: Site switches to Spanish
- Next visit: Site stays in Spanish (user preference)

### **Scenario 2: International Visitor**
- Browser: Safari set to French (fr-FR)
- First visit: Site displays in French ✅
- No language change: Site always displays in French
- Next visit: Site displays in French (auto-detected)

### **Scenario 3: Multilingual User**
- Browser: Has multiple languages [Spanish, English]
- First visit: Site displays in Spanish (first in list) ✅
- Switches to English: Site displays in English
- Next visit: Site stays in English (saved preference)

### **Scenario 4: Unsupported Language**
- Browser: Set to Japanese (ja-JP)
- First visit: Site displays in English (fallback) ✅
- Can manually select any supported language

---

## 🎉 Benefits

1. **Better UX**: Visitors see content in their language immediately
2. **Global Reach**: Automatic support for Portuguese, Spanish, French speakers
3. **User Control**: Manual selection always takes precedence
4. **Smart Fallback**: English as universal default
5. **Persistent Choice**: User selections are remembered

---

## 📝 Files Changed

- ✅ `client/src/lib/i18n.tsx` - Added `detectBrowserLanguage()` function
- ✅ Language detection integrated into `LanguageProvider`
- ✅ Maintains backward compatibility with saved preferences

---

## 🔍 Example Detection

**Browser**: Chrome with Portuguese (Brazil)
```
navigator.language = "pt-BR"
         ↓
detectBrowserLanguage() returns "pt-BR"
         ↓
Site displays: "Mudando vidas, um poço por vez"
```

**Browser**: Firefox with Spanish (Mexico)
```
navigator.language = "es-MX"
         ↓
detectBrowserLanguage() returns "es"
         ↓
Site displays: "Cambiando vidas, un pozo a la vez"
```

**Browser**: Safari with English (US)
```
navigator.language = "en-US"
         ↓
detectBrowserLanguage() returns "en"
         ↓
Site displays: "Changing lives, one well at a time"
```

---

## ✨ Summary

**Feature**: Automatic browser language detection  
**Default**: English  
**Supported**: English, Portuguese (BR), Spanish, French  
**Storage**: Persists user selection  
**Priority**: User choice > Browser detection > English default  

**Your visitors now see Wells of Change in their own language automatically!** 🌍💧
