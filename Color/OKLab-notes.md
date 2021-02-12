# Notes on OKLab


[OKLab](https://bottosson.github.io/posts/oklab/), by Björn Ottosson is a CIE Lab replacement which transforms D65-adapted, whitepoint-relative XYZ to an LMS space, then uses a cube-root nonlinearity to produce an opponent colorspace. It is claimed to

> be simple to use

and to do

> a good job at predicting perceived lightness, chroma and hue

These notes are my initial impressions on reading.

## LMS basis

Like many modern perceptually uniform colorspaces (Jzazbz, ICtCp), XYZ values are first transformed into an LMS cone space. This has the benefit that no chromatic adapatation step is needed for moderate illuminant changes. In CIE Lab, in contrast, to avoid the well-known "wrong von Kries" effect, when the illuminant changes a Bradford transform is applied, which goes Lab > XYZ > LMS -> scaled LMS > XYZ > Lab.

Also like many such colorspaces, the cone fundamentals are not used directly but are modified (by sharpening to increase cone separation, by crosstalk, or by direct numerical optimization to minimize errors on assumed-constant datasets). In OKLab, numerical optimization was used.

## Transfer function

A single cube-root nonlinearity is applied, similar to the curved portion of the CIE L* transfer function. This has three drawbacks:

1. At very low luminance levels, a power law increases noise This is why ITU Rec BT.709, sRGB and Display P3 use a small linear portion near zero. In addition, it does not model the HVS, which requires:

    > square-root behavior (Rose-Devries law) for less than 0:001cd/m2
    > (Choudhury)

2. At moderate to high luminance levels, a logarithmic response is desired to model the HVS. For example the Hybrid Log-Gamma function from BT.2100 uses ths approach.

    > log behavior (Weber’s Law) for greater than 200cd/m2,
    > (Choudhury)

3. Luminance levels are capped at the diffuse (media) white, making it an SDR-only metric.

The choice of a simple, easily invertible, transfer function is understandable from a computational and ease-of understanding viewpoint, but also limits the deepest blacks and the moderate to high luminance whites from being represented.

The author of OKLab clarified:

> One thing to note: While I agree with the drawback of the transfer function, it is important to note that those can only be adressed if the viewing conditions can be modelled accurately.
> A danger in using models like JzAzBz and ICtCp is that if the viewing conditions are not accurately predicted, they will be incorrectly predict all colors.
> Oklab/IPT and similar models will always predict colors well in the range close to the eye's luminance adaption.
> -- Björn Ottosson

The power function from the optimization step was 0.323, but that gave a blue concavity on the sRGB gamut hull and so a simpler 1/3 was chosen for OKLab, which restored convexity. The effect on the gamut hull of other RGB spaces such as Display P3 and Rec BT.2020 was not stated in the origina article and remains to be investigated.

CIE Lab has been experimentally extended to L=400 (Fairchild & Chen), but the extension past L=100 does not follow Weber's Law.

## Restriction to Surface colors

A limitation of CIE Lab has been that it is primarily used with, and evaluated using, reflective surface colors such as printed or painted samples, at moderate diffuse illumination levels (e.g. 120 cd/m2). This limitation becomes apparent when self-luminous colors such as computer displays are analyzed, either SDR (up to 300 cd/m2) or HDR (up to 4,000 cd/m2).

When deriving OKLab, XYZ values were normalized such the D65 Y = 1.0

Also, the dataset used to derive OKLab included matched (in CIECAM16 with a bright viewing environment) pairs of colors:

> Colors were limited to be within Pointer’s Gamut – the set of possible surface colors

This limits representation to diffusely illuminated surface colors. This seems odd, because the stated aim of OKLab is for color manipulation in image processing; and images whether natural or computer generated would typically contain colors from specular lighting, and direct view of illumination sources.

The author of OKLab clarified:

> The choice of using the Pointer gamut has more to do with Ciecam than Oklab, and the experiments used to derive it. Didn't want to fit a model to parts of Ciecam that aren't valid. More wide gamut data is needed to do better.
> -- Björn Ottosson

## Use of DeltaE 2000

DeltaE 2000 is a good, if complex, metric which accounts for the human eye's perceptual sensitivity at different colors (in contrast to earler Lab-based metrics such as DeltaE76 and DeltaE94). For example, it has a correction term for the CIE Lab blue-purple non-linearity. It was used to compute the errors which would be minimized in the matrix optimization step.

However

> While the CIE L*a*b*-based metrics have been shown to perform well for many SDR applications (product surface colors, graphic arts printing), they are known to have significant problems with new image characteristics enabled by HDR, such as shadow detail spanning several log units, emissive colors, specular reflections, scenes of mixed illumination, and interscene adaptations (e.g., from scene changes like going into a cave, or turning on a light source).
> (Choudhury)

## Experimental comparisons

### Matched CIECAM16 color pairs

The computed error metrics for OKLab are very good. In particular, except for the H95 and Hrms hue metrics, they are significantly better than those for Jzazbz. On the two Hue metrics, Jzazbz is slightly better, but not by much. Note that (as confirmed with the author on twitter) the IPT value are for the original Ebener-Fairchipd IPT and not the Dolby ICtCp (whose error metric is termed ΔEITP, and the colorspace is often referred to as IPT).

The error values for CAM16-UCS are also given, and are the lowest of all the studied colorspaces, except for the two hue metrics where OKLab does better. This is a noteworthy result, given the simplicity and invertibility of OKLab, and the difficulty of obtaining the surround luminance, background luminance, and adapted state data needed to fully utilize CIECAM16.

The error values for sRGB HSV are also listed, presumably for comic relief.

Comparison with ICtCp would be interesting to see.

### Munsel renotation chroma uniformity

OKlab does very well at maintaining a circular shape, better than CIE Lab and Jzazbz.

### Luo-Rigg ellipses

An improvement over the MacAdam ellipses, these should be equal-sized circles in a perfect uniform colorspace.

An interesting observation is that:

> CAM16 explicitly compresses chroma to better match experimental data, which makes this data look good, but makes color blending worse

As often happens, optimising one aspect makes another worse and the answer to "what is the best colorspace" is "what are you trying to do?".

### Gamut volume slices

Slices of the sRGB gamut volume are shown. It would be interesting to see other RGB spaces in particular Rec BT.2020.

### Color blends

Only blends of an unspecified blue color with white are presented. CIE Lab has the usual purple shift mid way through.  The Jzazbz blend does not exhibit the [greenish shift which I found](https://svgees.us/ICC%20July%202020/Towards%20an%20HDR-capable%20ICC%20PCS.html). CAM16-UCS exhibits an odd desaturation and slight purpling at the midpoint.

## Color difference metric

No color-difference (ΔE) metric is specified,
but given that the irregularities of CIE Lab have been corrected,
and in particular that hue differences and lightness differences
are normalized to the same distance,
it would seem appropriate to define a ΔE that works directly on OKLab.

A Euclidean distance metric would work,
but a ΔE which is a root-sum-of-squares of Lightness, Chroma and Hue terms
would be better (because the three terms are meaningful
and could be compared or optimised separately if required.)

Thus, given a reference and a sample OKLab values L1 a1 b1 and L2 a2 b2, I suggest:

- **ΔL** = L1 - L2
- C1 = √(a1² + b1²)
- C2 = √(a2² + b2²)
- **ΔC** = C1 - C2
- Δa = a1 - a2
- Δb = b1 - b2
- **ΔH** = √(Δa² + Δb² - ΔC²)
- **ΔEOK** = √(ΔL² + ΔC² + ΔH²)

This is similar to the ΔECMC and ΔE94 error metrics, calculating a Lightness difference, a Chroma difference (these two are lengths) and thirdly a Hue difference (starting from the two angles, it calculates the length of the angular arc). Unlike ΔE94 it doesn't need the various weighting factors; and unlike ΔE2000 it doesn't need all the correction terms for blue non-linearity and so on.

ΔEOK is always positive, as is ΔH, but the ΔL and ΔC terms are signed, and the sign is meaningful (a sample which is darker than the reference will have negative ΔL; a sample with lower Chroma will have negative ΔC).

Note that, because OKLab lightness is [0-1] while CIE Lab Lightness is [0-100],
ΔEOK values will be 100 times smaller, other things being equal.
So a JND of 2.3 will be an OKLab JND of 0.023.

## Standard values

For checking implementations, these are the OKLab values for the sRGB primaries and secondaries, using the [provided C++ code](https://bottosson.github.io/posts/oklab/).

| Color   |  OK L    |  OK a     | OK b      |
|--:      |--:       |--:        |--:        |
| white   | 0.999988 |  0.000008 | -0.000118 |
| red     | 0.627915 |  0.224903 |  0.125803 |
| green   | 0.866440 | -0.233920 |  0.179424 |
| blue    | 0.452030 | -0.032379 | -0.311620 |
| cyan    | 0.905403 | -0.149449 | -0.039508 |
| magenta | 0.701648 |  0.274632 | -0.169274 |
| yellow  | 0.967967 | -0.071385 |  0.198491 |
| black   | 0.000000 |  0.000000 |  0.000000 |


## References

Anustup Choudhury, Scott Daly
_Comparing a spatial extension of ICTCP color representation with S-CIELAB and other recent color metrics for HDR and WCG quality assessment_
IS&T International Symposium on Electronic Imaging 2020
Color Imaging: Displaying, Processing, Hardcopy, and Applications
pp. 162-1 - 162-9
https://www.ingentaconnect.com/content/ist/ei/2020/00002020/00000015/art00005

Mark Fairchild, Ping-Hsu Chen
_Brightness, lightness, and specifying color in high-dynamic-range scenes and images._
 SPIE/IS&T Electronic Imaging Conference, San Francisco, 78670O-1 -78670O-14, 2011
 http://rit-mcsl.org/fairchild/PDFs/PRO37.pdf

Chris Lilley
_Towards an HDR-capable ICC PCS_
https://svgees.us/ICC%20July%202020/Towards%20an%20HDR-capable%20ICC%20PCS.html

Portrait Displays
_About DeltaE_
https://kb.portrait.com/help/about-deltae-e
