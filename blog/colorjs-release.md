---
title: Color.js Released
date: 2022-06-29
tags: [
	"Color",
    "CSS",
    "OSS"
]
---

<img src="./img/colorjs-logo.png" style="width: 50vw"/>

It has taken [Lea](https://lea.verou.me/2022/06/releasing-colorjs/) and I far too long –
there is always something more that _really should_ be added,
always some conversion that _really needs_ an authoritive
set of data
to validate our code against –
but we finally decided, time to **actually release** [Color.js](https://colorjs.io/).

By which, I guess, we mean removing the _polite figleaf_
that said, “whoops you stumbled on an unreleased thing,
please be careful and lower your expectations”.

Because people are already using it
to make demos and to check other color conversion code against
(this includes some browser implementations of [CSS Color 4](https://drafts.csswg.org/css-color-4/) and
[CSS Color 5](https://drafts.csswg.org/css-color-5/)).

<!-- more -->

## Lots of color spaces

[Color.js](https://colorjs.io/) is a JavaScript library  –
which you can use on a web page,
or from node,
or run locally –
to make, modify, and manipulate colors
in a [wide variety of color spaces](https://colorjs.io/docs/spaces.html).

That includes [all the predefined color spaces from CSS Color 4](https://drafts.csswg.org/css-color-4/#predefined),
plus the [Device-independent Colors: CIE Lab and LCH, OKLab and OKLCH](https://drafts.csswg.org/css-color-4/#lab-colors)
plus of course all the [legacy color syntaxes](https://drafts.csswg.org/css-color-4/#legacy-color-syntax).

In addition it includes some spaces useful for HDR, like rec2100-pq and rec2100-hlg, J<sub>z</sub>a<sub>z</sub>b<sub>z</sub>, IC<sub>T</sub>C<sub>P</sub>
and a couple of color spaces from the film and tv industry (ACESScc for color grading, ACEScg for physical rendering and compositing).

Speaking personally, being able to create examples in all those color spaces,
and accurately convert them to other color spaces,
was essential to me for making examples,
creating diagrams,
writing and verifying browser tests,
and for sanity checking the CSS Color 4 specification
in the days before browsers started implementing it.

## Why do we need it

Now, CSS Color 4 includes simple (but accurate)
[Sample code for Color Conversions](https://drafts.csswg.org/css-color-4/#color-conversion-code) so what extra does color.js add?

Well, the sample code is purely procedural,
lots of easy-to-understand but tiny, single-purpose functions,
so to use it you really need to apply a bunch of operations,
one after another,
not missing any out.
All done using simple arrays, so remember to keep track of what each one contains!

To take an example: convert `color(prophoto-rgb 0.7 0.2 0.65)`
to `oklch`. Using the sample code:

```js
let mycolor = [0.7, 0.2, 0.65]; // this is ProPhoto by the way
let myoklch = OKLab_to_OKLCH(XYZ_to_OKLab(D65_to_D50(
    lin_ProPhoto_to_XYZ(lin_ProPhoto(mycolor)))));
```

_(Prophoto uses the D50 whitepoint while OKLCH uses D65, so there is a [chromatic adaptation](https://colorjs.io/docs/adaptation.html) step in the middle there)_

Now let's do that in color.js:

```js
let mycolor = new Color('color(prophoto-rgb 0.7 0.2 0.65)');
let myoklch = mycolor.to('oklch');
```

Each color object contains, not just the actual color coordinates,
(and the alpha, if it is not fully opaque)
but also an explicit color space identifier.
The code can look up what white point each color space uses,
and can figure out how to convert between any pair of them.

Notice that the color can be specified exactly the same way you would in CSS,
and that conversion is as simple as saying where you want to go.
(Internally, the exact same set of steps as the first example are carried out, for you).

_Here is a handy [color conversion app](https://colorjs.io/apps/convert/?color=lime&precision=4), written in color.js, which I use all the time._

## Interpolating colors

On the legacy web, you can make a gradient between two (or more) colors.
As long as all are in sRGB,
missing out around a third of all the colors
most modern screens can display.
And provided the interpolation is carried out in sRGB too,
giving muddy, too-dark mixtures
and tempting you to add _just a couple more_ gradient stops
to get things looking right.

CSS Color 4 [explains how to interpolate any two colors](https://drafts.csswg.org/css-color-4/#interpolation)
regardless what color space they were originally in.
And you get to pick the color space used for interpolation, too:
diffeent ones give very different results. For example:

```css
linear-gradient(in lab to right, white, #01E)
linear-gradient(in srgb to right, white, #01E)
linear-gradient(in oklab to right, white, #01E)
```

<img src="./img/rectangular-fff-01e.png" style="width: 50vw"/>

The middle gradient of these three, in sRGB, is too dark and a bit purplish.
The top one, in CIE Lab, is way too purple while the bottom one
in shiny new [OKLab](https://bottosson.github.io/posts/oklab/) has a nicely even lightness throughout and no purple shift at all.

This rendering of the brand-new [CSS Images 4 gradient syntax](https://drafts.csswg.org/css-images-4/#linear-gradients) was generated in color.js,
using the [gradient interpolation demo app](https://colorjs.io/apps/gradients/)

Gradients aren't the only time colors are interpolated on the web; just one of the prettiest to show.
Animations, transitions, compositing and
[CSS Color 5 `color-mix()`](https://drafts.csswg.org/css-color-5/#color-mix)
also use interpolation, and color.js has you covered until all the browsers implement all of this (and beyond, because older browsers will always need a helping hand).

## And that's not all

I haven't even talked about automatic [gamut mapping](https://drafts.csswg.org/css-color-4/#gamut-mapping), which [brings undisplayable colors into gamut](https://colorjs.io/docs/gamut-mapping.html) while trying to keep them as similar-looking as possible. Or the several different [color difference (ΔE) formulae](https://colorjs.io/docs/color-difference.html) that color.js supports. Or the alternate [Chromatic Adaptation Transform](https://colorjs.io/docs/adaptation.html) methods you can use. Or just little utility functions to get luminance (on any color) or the _u,v_ chromaticity coordinates, for making diagrams.

But this is a release announcement not a tutorial, so I had best be ending here.

[Get color.js](https://colorjs.io/get/), enjoy, and [report bugs!!](https://github.com/LeaVerou/color.js/issues)