---
name: Kinetic Intelligence
colors:
  surface: '#101419'
  surface-dim: '#101419'
  surface-bright: '#363940'
  surface-container-lowest: '#0b0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#e0e2eb'
  on-surface-variant: '#c7c6cc'
  inverse-surface: '#e0e2eb'
  inverse-on-surface: '#2d3137'
  outline: '#909096'
  outline-variant: '#46464c'
  surface-tint: '#c3c6d7'
  primary: '#c3c6d7'
  on-primary: '#2c303d'
  primary-container: '#0a0e1a'
  on-primary-container: '#777b8a'
  inverse-primary: '#5a5e6d'
  secondary: '#adc6ff'
  on-secondary: '#002e6a'
  secondary-container: '#0566d9'
  on-secondary-container: '#e6ecff'
  tertiary: '#4cd7f6'
  on-tertiary: '#003640'
  tertiary-container: '#001116'
  on-tertiary-container: '#00879e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dfe2f3'
  primary-fixed-dim: '#c3c6d7'
  on-primary-fixed: '#171b28'
  on-primary-fixed-variant: '#434654'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#101419'
  on-background: '#e0e2eb'
  surface-variant: '#31353c'
  obsidian-base: '#020408'
  midnight-deep: '#0A0E1A'
  electric-glow: '#3B82F6'
  cyan-pulse: '#06B6D4'
  silver-particle: '#E2E8F0'
  glass-border: rgba(255, 255, 255, 0.08)
typography:
  display-xl:
    fontFamily: Geist
    fontSize: clamp(2.5rem, 5vw, 5rem)
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: clamp(1.5rem, 3vw, 2.5rem)
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  headline-md:
    fontFamily: Geist
    fontSize: 1.75rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.2em
  mono-data:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 24px
  section-gap: clamp(4rem, 10vh, 8rem)
---

## Brand & Style

This design system embodies the intersection of high-stakes intelligence and premium consumer aesthetics. It is a "Cinematic Tech" style that merges the technical rigor of data-driven platforms with the polished, emotional resonance of high-end editorial design. The brand personality is authoritative yet visionary, characterized by a sense of vastness and "the future in focus."

The visual direction utilizes a **Glassmorphic** and **Atmospheric** approach. It rejects standard enterprise density in favor of breathable, asymmetrical compositions that feel like an immersive operating system. Key stylistic pillars include holographic depth, reactive cinematic lighting, and a sophisticated use of motion to convey "floating inertia." The goal is to make recruitment data feel like a strategic asset, visualized through the lens of a sophisticated intelligence agency.

## Colors

The palette is anchored in a "Deep Space" dark mode, utilizing a range of near-blacks and midnight blues to create infinite depth. Primary surfaces are never flat; they utilize subtle radial gradients from `#0A0E1A` to `#020408` to simulate a backlit screen or cinematic lens.

Accents are strictly reserved for data visualization and interactive triggers. **Electric Blue** and **Cyan** act as light sources within the dark environment, often accompanied by soft glows (box-shadow or filter: blur) to simulate holographic projection. **Silver** and **Translucent White** are used for particle effects and secondary text to provide a sophisticated metallic sheen without breaking the dark-room atmosphere.

## Typography

Typography focuses on high-contrast weights and cinematic spacing. **Geist** provides a technical, precise feel for headlines and data labels, while **Inter** ensures maximum legibility for long-form intelligence reports and candidate profiles.

Fluid scaling is implemented via `clamp()` for display and large headline roles, ensuring the UI feels expansive on ultrawide monitors while remaining punchy on mobile. Headlines should utilize "Cinematic Tracking"—wide letter spacing for uppercase labels to evoke a luxury feel, and tight, negative tracking for large display headers to create a sense of density and power.

## Layout & Spacing

The layout philosophy rejects the "boxed-in" nature of traditional SaaS. It uses a **Fluid Asymmetrical Grid** where elements are anchored to 12 columns but often break the grid with large, atmospheric voids. This "breathable" whitespace is essential to the luxury-tech aesthetic.

- **Breakpoints:** Mobile (<768px), Tablet (768px-1280px), Desktop (1281px-1920px), and Ultra-Wide (>1920px).
- **Rhythm:** An 8px base unit is used for component internals, but layout-level spacing uses much larger, dynamic values to create a sense of scale.
- **Reflow:** On desktop, sidebars are often detached "floating" panels. On mobile, these panels transition into full-screen immersive overlays with backdrop blurs.

## Elevation & Depth

Depth is conveyed through **Atmospheric Layering** rather than traditional drop shadows. 
1. **Base Layer:** The deepest obsidian gradient, often featuring a subtle "starfield" of silver particles.
2. **Glass Layer:** Semi-transparent surfaces (`backdrop-filter: blur(20px)`) with a 1px solid border at 8% white opacity. This creates a "holographic pane" effect.
3. **Focus Layer:** Elements in focus use "Spotlight Lighting"—a radial gradient mask that follows the cursor or highlights specific data points.
4. **Glows:** High-priority items (like "Match Found") use a 20-40px outer glow in Electric Blue to simulate light emission.

## Shapes

The shape language is sophisticated and sharp. While components have a soft 0.25rem corner radius (Soft) to keep them from feeling aggressive, the overall geometry is defined by clean lines and precise angles. High-end containers and image masks may use asymmetrical clipping (e.g., one corner cut at a 45-degree angle) to reinforce the futuristic intelligence aesthetic.

## Components

**Buttons:**
Primary buttons are glass-pills with a subtle Cyan border and a soft inner glow. On hover, the glow intensity increases and the background becomes slightly more opaque. Secondary buttons are text-only with wide tracking and a thin underline that expands from the center on hover.

**Glass Layers (Cards):**
Avoid standard cards. Instead, use "Floating Panes"—borderless, blurred containers that appear to hover over the background. They should not have a solid background color; instead, use a 5% white tint with high backdrop blur.

**Input Fields:**
Minimalist bottom-border only inputs. When focused, the border glows Electric Blue and a subtle vertical "scanning" line moves across the field once.

**Data Visualizations:**
Custom "Constellation Maps" for candidate networks. Lines between nodes should be 0.5px wide with varying opacities. Use "Radar Graphs" with soft gradients for skill assessments.

**Transitions:**
Full-screen "shutter" or "faded-zoom" transitions between views. Use parallax effects on background layers to create a sense of 3D space when the user scrolls through data.