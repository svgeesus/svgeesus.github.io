# Escaping the sRGB Prison

## Color perception

### Lightness

- luminance vs lightness

### Complementary colors

- after images.
- reddish yellow but not reddish green

### Color model

Describe OKLCH but don't name it yet, assume they understand the concept

- lightness, hue, chroma in 3D

- chromaticity diagrams, mainly for a laugh (abstract mentioned)
- percentage of gamut in 2D is meaningless.

## the Prison

### HDTV Rec 709

- 3D gamut volume in OKLCH

### Display P3

- 3D gamut volume in OKLCH
- compare to sRGB
- how many colors we **can't use**
- all modern devices

### ? BT.2020?

- or is that too confusing

### All legacy color formats are sRGB

- hsl, named, etc

### Canvas (was) sRGB only

- canvas example

## Escaping (specifying color)

### color(display-p3 ...)

- Matches capabilities of modern devices
- CSS and Canvas examples

### Other predefined color spaces

- mainly for matching other content, like Adobe RGB or ProPhoto RGB

### Lab, LCH, OKLab, OKLCH

- Meaningful, orthogonal polar color models
- OK is better, newer, not so well known or supported

## Escaping (Mixing colors)

- color-mix()
- gradients and the perils of sRGB mixing
- gradients in OKLab

## Escaping (Altering colors)

- css variables and dynamic, computed colors (not like sass)
- relative color syntax

## Most contrasting color

- Automatic WCAG 2.1 contrast
- known to give false positives and negatives, improved system in development

## Can I use it

- browser landscape, Safari, color-mix in Firefox, Chrome lagging
- Interop 2022

## Futures

- BT.2020 and even wider gamut
- BT.2100 and PQ/HLG HDR (Canvas)
