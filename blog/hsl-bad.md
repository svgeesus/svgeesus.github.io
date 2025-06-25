---
title: Is HSL really easier to use?
draft: false
date: 2025-06-26
tags: [
	"CSS",
	"Color Science",
	"History"
]
---

Before CSS Color 3, each syntactic form in CSS used the  Red-Green-Blue color model directly.

It is often asserted [^csshsl] that color pickers using color models with orthogonal perceptual attributes (such as Lightness, Colorfulness, Chroma, Saturation, Hue) have higher usability than RGB; although the early studies have significant methodological flaws and more recent research finds that other factors such as interface design and responsive feedback are much more important in affecting the speed and accuracy of color selection than the color model.

While it seems intuitively reasonable, the usability benefit has yet to be demonstrated in a well-controlled study. The oft-cited study by Schwartz [^Schwartz] was deeply flawed: the interface provided no user feedback on the effect of moving the featureless gray sliders, and there was no navigational hint as to the current position in the color model. Test subjects were essentially proceeding by guessing [^DKModels].

> “With these interfaces we could not find a significant difference between the accuracy and speed of the RGB and HSV models, but did find that level of feedback had a significant effect on accuracy of the final match.” [^DKFeedback]

In addition, in the Schwartz study, closeness to the target color was measured by Euclidean distance in gamma-encoded RGB space, rather than by using an established color-difference metric such as CIE Delta-E.

Still, this assumed increase in usability was the reason that the `hsl()` (Hue, Saturation, Lightness) model [^Joblove] was added in to CSS Color 3 in 2002 [^csshsl], followed later by the alpha-including `hsla()` form.  

This is why CSS Color 4 has some warnings about HSL

> “A disadvantage of HSL over OkLCh is that hue manipulation changes the visual lightness, and that hues are not evenly spaced apart.” [^CSS4HSL]

## Geeknotes

[^csshsl]: The [CSS Color 3 specification](https://www.w3.org/TR/2002/WD-css3-color-20020219/#hsl-color) asserted 

	> “The advantage of HSL over RGB is that it is far more intuitive: you can guess at the colors you want, and then tweak. It is also easier to create sets of matching colors (by keeping the hue the same and varying the lightness/darkness, and saturation)”. 

	However, no published Human Computer Interaction study has demonstrated this.

[^Schwartz]: Schwarz, M., Cowan, W. and Beatty, J.  (1987)
_An experimental comparison of RGB, YIQ, LAB, HSV, and opponent color models._
ACM Transactions on Graphics **6, 2** (April 1987) 123-158.
[abstract](https://www.mendeley.com/catalogue/c3fee117-0b6a-355d-a569-20172cfa905c/)

[^DKModels]: Douglas, S.A., and A.E. Kirkpatrick (1996).
_Do Color Models Really Make a Difference?_
Proceedings of the SIGCHI conference on Human Factors in Computing systems
(April 1996) pp.399-405.
[download](https://web.archive.org/web/20080507020049/https://sigchi.org/chi96/proceedings/papers/Douglas/sad_txt.htm)

[^DKFeedback]: Douglas, S.A.; Kirkpatrick, T. (1996)
_The Effect of Feedback on a Color Selection Interface_
Proceedings of Graphics Interface '96: Toronto, Ontario, Canada, 22 - 24 May 1996, 47-54 
doi: 10.20380/GI1996.06
[download](https://graphicsinterface.org/wp-content/uploads/gi1996-6.pdf)

[^Joblove]: Joblove, G. H.; Greenberg, D. (1978).
_Color spaces for computer graphics_. Computer Graphics. **12 (3)**: 20–25 (August 1978). 
doi:10.1145/965139.807362.
[download](https://dl.acm.org/doi/10.1145/965139.807362)

[^CSS4HSL]: CSS Color 4, [HSL Colors: `hsl()` and `hsla()` functions](https://drafts.csswg.org/css-color-4/#the-hsl-notation)
