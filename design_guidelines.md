# Design Guidelines: Wells of Change Website

## Design Approach

**Reference-Based Strategy**: Drawing inspiration from charity: water and leading social impact organizations that excel at emotional storytelling combined with data transparency. The design emphasizes authentic impact narratives, human connection, and technological innovation.

**Core Principle**: Create an emotionally resonant experience that builds trust through transparency while maintaining focus on the transformative power of clean water access.

---

## Typography

**Font Families** (Google Fonts):
- **Display/Headlines**: Poppins (600, 700) - modern, approachable, impactful
- **Body Text**: Inter (400, 500) - clean, highly readable, professional
- **Data/Stats**: Space Mono (400, 700) - technical credibility for monitoring aspects

**Type Scale**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Titles: text-3xl md:text-4xl lg:text-5xl, font-semibold
- Subsection Headers: text-xl md:text-2xl, font-semibold
- Body: text-base md:text-lg, leading-relaxed
- Captions/Small: text-sm, font-medium

---

## Layout System

**Spacing Units**: Consistently use Tailwind units of **4, 6, 8, 12, 16, 20, 24** (as in p-4, py-12, gap-8, etc.)

**Section Padding**: py-16 md:py-24 lg:py-32 for major sections
**Container**: max-w-7xl mx-auto px-6 md:px-8
**Content Width**: max-w-3xl for text-focused sections
**Grid Systems**: 
- Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Stats: grid-cols-2 md:grid-cols-4 gap-6

---

## Component Library

### Navigation
- Fixed header with subtle backdrop blur (backdrop-blur-md)
- Logo left, navigation center/right
- Prominent "Doar" (Donate) button with high contrast
- Mobile: hamburger menu with slide-in panel

### Hero Section
- **Full-width impactful hero image** showing community water access or well installation
- Image overlay with gradient for text legibility
- Centered headline: "Mudando vidas, um poço por vez"
- Subheadline explaining mission
- Two CTAs: Primary "Fazer Doação" + Secondary "Conheça Nossa História" (buttons with blurred backgrounds over image)
- Height: min-h-screen on desktop, min-h-[70vh] on mobile

### Story Sections
- Alternating text-image layouts (60/40 split)
- Pull quotes with large text highlighting key manifesto statements
- Timeline component for "Nossa História" with vertical line and milestone cards

### Impact Display
- Large stat cards with animated counters showing wells built, liters provided, lives impacted
- Real-time monitoring teaser: dashboard mockup showing well performance
- Before/after comparison sliders or side-by-side images

### Call-to-Action Blocks
- Full-width sections with strong backgrounds
- Multiple entry points: "Doar", "Ser Voluntário", "Compartilhar"
- Three-column grid explaining each action with icons

### Footer
- Comprehensive: newsletter signup, social links, contact info, quick navigation
- Trust indicators: transparency statement, partner logos
- Location reference: "Começamos em Campo Formoso, Bahia"

---

## Images Strategy

**Hero**: Authentic photo of community members celebrating water access or well installation (high emotional impact)

**Section Images**: 
- Wells/infrastructure in action
- Community portraits (children, families, farmers)
- Technology elements (solar panels, monitoring systems)
- Before/after scenarios

**Image Treatment**: Natural, documentary-style photography with warm tones. Avoid overly polished stock photos—authenticity is key.

**Placement**: Hero (large), Nossa História (medium inline), O Que Fazemos (grid of 3-4 images), Compromisso (side-by-side), Juntos pela Mudança (background)

---

## Page Structure

1. **Hero**: Full-screen impact with manifesto headline
2. **Mission Statement**: Centered text block with core beliefs
3. **Nossa História**: Two-column text+image storytelling
4. **O Que Fazemos**: Feature grid with icons showing benefits (children, mothers, farmers, community)
5. **Impact Stats**: Large numbers with real-time data visualization preview
6. **Nosso Compromisso**: Campo Formoso case study with media
7. **Juntos pela Mudança**: Three-path CTA (invest, share, volunteer)
8. **Footer**: Complete with newsletter, contact, navigation

---

## Special Considerations

- **Transparency Focus**: Dedicated section or sidebar showing "Every drop measured, every impact documented"
- **Multi-language Ready**: Structure for PT-BR primary, potential EN expansion
- **Accessibility**: High contrast for readability, semantic HTML, ARIA labels
- **Performance**: Optimized images for GitHub Pages, minimal animations
- **Mobile-First**: Stack all columns on mobile, maintain emotional impact

**Animations**: Minimal—subtle fade-ins on scroll, counter animations for stats only. Focus on content over effects.