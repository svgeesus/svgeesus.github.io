---
title: Is HSL really easier to use?
draft: true
tags: [
	"CSS",
	"Color Science"
]
---

So far, each syntactic form has used the  Red-Green-Blue model directly. It is often assertedi that color pickers using color models with orthogonal perceptual attributes (such as Lightness, Colorfulness, Chroma, Saturation, Hue) have higher usability than RGB[Schwartz] although the early studies have significant methodological flawsii and more recent research finds that other factors such as interface design and responsive feedback are much more important in affecting the speed and accuracy of color selection than the color modeliii. While it seems intuitively reasonable, the usability benefit has yet to be demonstrated in a well-controlled study.

Still, this assumed increase in usability was the reason that the hsl() (Hue, Saturation, Lightness) model [Joblove] was added in 2002 [csshsl], followed later by the alpha-including hsla() form.  

footnotes

The CSS Color 3 specification [csshsl] asserted “The advantage of HSL over RGB is that it is far more intuitive: you can guess at the colors you want, and then tweak. It is also easier to create sets of matching colors (by keeping the hue the same and varying the lightness/darkness, and saturation)”. However, no published Human Computer Interaction study has demonstrated this. 

The oft-cited study by Schwartz [Schwartz] was deeply flawed: the interface provided no user feedback on the effect of moving the featureless gray sliders, and there was no navigational hint as to the current position in the color model. Test subjects were essentially proceeding by guessing [DKModels]. In addition, closeness to the target color was measured by Euclidean distance in gamma-encoded RGB space rather than by using an established color-difference metric.

“With these interfaces we could not find a significant difference between the accuracy and speed of the RGB and HSV models, but did find that level of feedback had a significant effect on accuracy of the final match.” [DKFeedback]

references

csshsl. World Wide Web Consortium (2002)
CSS3 module: Color: 4.2.4. HSL color values
https://www.w3.org/TR/2002/WD-css3-color-20020219/#hsl-color
(accessed $$)

Schwartz.
Schwarz, M., Cowan, W. and Beatty, J.  (1987)
An experimental comparison of RGB, YIQ, LAB, HSV, and opponent color models. 
ACM Transactions on Graphics 6, 2 (April 1987) 123-158.

DKModels.
Douglas, S.A., and A.E. Kirkpatrick (1996). 
Do Color Models Really Make a Difference?
Proceedings of the SIGCHI conference on Human Factors in Computing systems
(April 1996) pp.399-405.
https://web.archive.org/web/20080507020049/https://sigchi.org/chi96/proceedings/papers/Douglas/sad_txt.htm

DKFeedback. 
Douglas, S.A.; Kirkpatrick, T. (1996)
The Effect of Feedback on a Color Selection Interface
Proceedings of Graphics Interface '96: Toronto, Ontario, Canada, 22 - 24 May 1996, 47-54 
doi: 10.20380/GI1996.06
Joblove.
Joblove, G. H.; Greenberg, D. (1978). 
Color spaces for computer graphics. Computer Graphics. 12 (3): 20–25 (August 1978). 
doi:10.1145/965139.807362. 