# Wells of Change - Design Guidelines

## Design Approach
**System-Based Design**: Material Design principles adapted for institutional credibility. NGO sites prioritize trust, transparency, and information clarity over visual experimentation. Clean, professional aesthetic with purposeful use of imagery.

## Typography System
**Fonts**: Inter (primary), Lora (serif accents for storytelling)
- **H1**: 48px/56px, font-weight 700 (Hero headlines)
- **H2**: 40px/48px, font-weight 700 (Section headers)
- **H3**: 32px/40px, font-weight 600 (Subsection titles)
- **H4**: 24px/32px, font-weight 600 (Card headers)
- **Body Large**: 20px/32px, font-weight 400 (Intro paragraphs)
- **Body**: 16px/26px, font-weight 400 (Standard text)
- **Small**: 14px/22px, font-weight 400 (Captions, metadata)

## Spacing System
**Tailwind Units**: Use 4, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-20 (desktop), py-12 (mobile)
- Component spacing: gap-8 for grids, space-y-6 for vertical content
- Container: max-w-7xl with px-6

## Layout Structure

### Navigation
Sticky header with white background, subtle shadow on scroll
- Left: Logo (50px height)
- Center: Horizontal menu links
- Right: Language selector dropdown + prominent Donate button (golden accent, slightly elevated)
- Mobile: Hamburger menu, stacked layout

### Hero Section
**Full-width image hero** (70vh min-height)
- Large impactful image showing community/water access
- Centered content overlay with semi-transparent dark gradient
- H1 headline + subtitle + dual CTAs ("Learn Our Story" + "Donate Now")
- CTAs have blurred backgrounds (backdrop-blur-md) with golden primary button

### Our Story
Two-column layout (60/40 split on desktop, stacked mobile)
- Left: Long-form narrative with Lora serif for warmth
- Right: Timeline component or key statistics cards
- Include impact photos interspersed with text

### What We Do
Three-column grid of service cards
- Icon/illustration at top (custom water-related icons)
- Title + description + "Learn more" link
- Equal height cards with subtle borders

### Our Commitment
Accordion-style expandable sections OR side-by-side cards
- Each commitment gets icon, headline, detailed explanation
- Consider certification badges/trust symbols
- Background: light subtle texture

### Who We Are
Team grid (3-4 columns)
- Circular headshot photos
- Name, title, brief bio
- Include board members and key staff
- Optional: Leadership message in featured card

### Code of Ethics
Single column, max-w-4xl centered
- Numbered or icon-based list format
- Clear section breaks between ethical principles
- Download PDF link prominent

### Join Us
Two-column split
- Left: Volunteer opportunities cards (stacked)
- Right: Newsletter signup form + contact information
- Include social proof ("Join 5,000+ volunteers")

## Component Library

**Cards**: Subtle shadow, rounded corners (8px), hover lift effect
**Buttons**: Primary (golden), Secondary (blue outline), Ghost (text only)
**Forms**: Full-width inputs, generous padding (p-4), clear labels above fields
**Stats Counters**: Large numbers with context, minimal styling
**Testimonials**: Quote format with photo, name, location
**Language Selector**: Dropdown with flag icons, smooth transitions

## Images Strategy
**Hero**: Large, high-quality photo of communities using clean water infrastructure (1920x1080 min)
**Our Story**: 2-3 photos showing before/after or community impact
**What We Do**: Optional background patterns or illustrations (not photos)
**Who We Are**: Professional headshots for all team members
**Sections**: Strategic use of full-width background images with overlays for Our Commitment or Join Us

**Image Treatment**: Maintain consistent aspect ratios, use subtle overlays for text legibility, ensure all images show real impact (authentic photography preferred over stock).

## Accessibility & Internationalization
- All text maintains 4.5:1 contrast ratio minimum
- Language selector shows current language clearly
- RTL support consideration in spacing/layout
- Form labels always visible, never placeholder-only

**Animation**: Minimal - fade-ins on scroll for cards, smooth navigation transitions only. Avoid distracting animations that undermine professional credibility.