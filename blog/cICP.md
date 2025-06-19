---
title: cICP in PNG, explained
draft: true
date: 2025-03-17
tags: [
	"Image Formats",
	"Color Science",
	"PNG"
]
---

So, [PNG Third Edition](https://www.w3.org/TR/png-3/) adds [Coding Independent Code Points](https://www.w3.org/TR/png-3/#cICP-chunk) (CICP) for color space identification. What are they, why should you care, and should you be using them?

<!-- more -->

## Color spaces

[I already know what a color space is, skip to CICP](#introducing-cicp)

Same values, different colors (swatches)
Same colors, different values

Primary chromaticitiees, white point [^adaptation]
Transfer functions (graphs)

Gamut [^gamut_in_detail]

## Introducing CICP

The CICP specification allows labelling of *what* color space is used
for a given image.
It doesn't say *how to handle* that color space. [^label_vs_processing]

### Video what?

CICP wasn't invented for PNG. It builds on
an International Telecommunication Union (ITU) specification
for broadcast and television
whose full title is, somewhat confusingly,
“Coding-independent code points for video signal type identification”.

This heritage explains some of the choices for what was included
(many old, historical, or obsolete video standards),
and what was left out (common color spaces for still images, like ProPhoto RGB).

But CICP isn't just for video anymore;
it has been adopted by still-image and animation formats
like [AVI](https://github.com/AOMediaCodec/libavif/wiki/CICP) and
[JPEG-XL](https://www.loc.gov/preservation/digital/formats/fdd/fdd000536.shtml#factors). 
And now, PNG as well.

### Four (well, two) numbers

To save space and to encourage automated processing,
CICP encodes the color space using just four numbers,
each of which can be encoded in one byte.
The actual meaning of each one
can be found in the [ITU H.273 specification](https://www.itu.int/rec/T-REC-H.273).

Of those, two are vitaly important:
the **Color Primaries**,
which tell you the chromaticity [^chromaticity]
of the white, red, green and blue,
thus defining the color gamut;
and the **Transfer Characteristics**
or Electro-Optical Transfer Function (EOTF),
which allows interconverting between
the pixel values in the image
and the light intensities emitted by the display [^display referred].

Examples with same primaries different transfer,

sRGB and BT.709 (HDRV)

and different primaries with same transfer

sRGB and Display p3

### The other two numbers

Narrow range not so common in practice (also poorly supported in browsers)

PNG is RGB only, others use various luminance-chrominance spaces
so need a way to convert that to RGB.

### High Dynamic Range

PQ and HLG

2100-hlg and 2100-pq both there.
P3D65-PQ also

### Compared to ICC profiles

table of comparisons

|     CICP                              | ICC                   |
|                   :---:               |    :---:              |
| RGB, YCC, XYZ [^stupid xyz]           | RGB, CMY, CMYK, Lab   |
| list of known spaces[^weird_obsolete] | any space [^measured] |
| small                                 | larger to very large (CMYK) [^detailed_sizes]|
| what it is                            | what to do with it    |

Since PNG is limited to RGB images, the fact that CICP doesn't support things like CMYK or Lab is not an issue. However, it does mean that common but not representable RGB spaces like Adobe 1998 or ProPhoto RGB cannot use CICP and have to be identified with ICC profiles instead.

## `cICP` in PNG

### Wait why the little c

PNG chunk naming [^chunk_naming]

`cICP`

### Adds just 16 bytes

compared to `iCCP` which adds 23 bytes **plus** the size of the compressed profile.
Checking on some [ICC profiles in PNG tests](https://github.com/svgeesus/PNG-ICC-tests)
I found the smallest compressed profile
was 312 bytes, so 335 bytes in total;
the largest was 8825 bytes so 8848 in total.

### Browser support

link to implementation report (dated snapshot)

### What is in my PNG

pngcheck

I recently extended this ancient tool to support PNG 3e including `cICP`

brief example

more examples

### Tool support

Mention a few that export with `cICP`.

### The `png-cicp_editor` utility

Some programs will export a PNG,
but expect you to pass along the colorspace info yourself
to whatever program is next in your pipeline.
Clearly, that won't work on the web;
browsers will [assume the untagged image is in sRGB](https://drafts.csswg.org/css-color-4/#untagged).

So there is a need to take a given PNG,
where you already know the color space,
and add `cICP` without otherwise altering the image.

[Chris Blume](https://github.com/ProgramMax),
who is the chair of the W3C PNG Working Group,
wrote [a nice little command-line utility](https://github.com/ProgramMax/png_cicp_editor)
to do that one specific task.
It is called `png-cicp_editor`.
Here it is being used to label a PNG image as display P3:

```bash
png-cicp_editor add --preset display-p3 test.png
```

Notice that your image is modified in-place.
Notice too that the actual image data is _not changed_ in any way
(it does **not** do color space conversion),
this utility simply inserts the missing colorspace labelling
that should have been there anyway.

Here is another example, marking an HDR image
as being in the BT.2100 color space with PQ transfer function:

```bash
png-cicp_editor add --preset bt.2100-pq test2.png
```

The available presets [^preset_list] cover the most common
color spaces which will be encountered in practice.

But to avoid clutter, they don't cover all possible options.
Suppose you have a PNG image converted from some old video format,
which CICP does in fact support.
Then you can provide your four numbers directly
(you will need to look them up in the
[ITU H.273 specification](https://www.itu.int/rec/T-REC-H.273),
which is freely available).

For example, to label an RGB image decoded from an old [SECAM video](https://en.wikipedia.org/wiki/SECAM):

```bash
png-cicp_editor add --color_primaries 5 --transfer_function 4 --matrix_coefficients 0 --video_full_range_flag 1 secam-test.png
```

getting rid of an existing `cICP`

## Geeknotes

[^stupid_xyz]: CIE XYZ _is_ available, but with a stupid equi-energy white point: x=0.3333 y=0.3333. It can't label useful spaces like  xyz-d65 or xyz-d50.

[^preset_list]: Here are the names of all the presets (as of March 2025)
together with the specifications that define each color space
and some places where they are commonly used:

| Preset         | Specification                                                            | Used for             |
|----------------|--------------------------------------------------------------------------|----------------------|
| bt.601-pal     | Rec. ITU-R BT.601 625-line 50 Hz (PAL)                                   | old video framegrabs |
| bt.601-ntsc    | Rec. ITU-R BT.601 525-line 60 Hz (NTSC)                                  | old video framegrabs |
| bt.709         | Rec. ITU-R BT.709-6                                                      | HDTV (1080p)         |
| srgb-linear    | linear-light sRGB                                                        | video games, GPU     |
| srgb           | IEC 61966-2-1 sRGB                                                       | web default          |
| bt.2020-10-bit | Rec. ITU-R BT.2020-2 (10-bit system)                                     | 4k streaming         |
| bt.2020-12-bit | Rec. ITU-R BT.2020-2 (12-bit system)                                     | 4k streaming         |
| bt.2100-pq     | Rec. ITU-R BT.2100-2 perceptual quantization (PQ) system                 | HDR streaming        |
| bt.2100-hlg    | Rec. ITU-R BT.2100-2 hybrid log-gamma (HLG) system                       | iPhone video, images |
| dci-p3         | SMPTE RP 431-2 with SMPTE ST 428-1 D-Cinema Distribution Master (DCI-P3) | digital cinema       |
| display-p3     | Display P3                                                               | modern WCG web       |
| p3-d65-pq      | P3-D65 PQ                                                                | Dolby Vision HDR     |

For Dolby Vision mastering, see [Dolby Vision Content Creation Best Practices Guide](https://professionalsupport.dolby.com/s/article/Dolby-Vision-Content-Creation-Best-Practices-Guide?language=en_US)

[^detailed_sizes]
cICP chunk (including chunk name, length and checksum) adds 16 bytes, much smaller than even a minimal ICC profile.
`iCCP` holds compressed profiles but even so (list a few sizes)

Use the files in the ICC test page as input.
profile size, PNG size (compressed, plus chunk overhead)

ICCv2 sRGB (rgswap)  chunk iCCP at offset 0x00025, length 335
    profile name = LittleCMS ICC profile, compression method = 0 (deflate)
    compressed profile = 312 bytes
 uncompressed 1156

v2-CIE-Lstar chunk iCCP at offset 0x00025, length 8848
    profile name = LittleCMS ICC profile, compression method = 0 (deflate)
    compressed profile = 8825 bytes
 uncompressed 9376

v2-ProPhoto  chunk iCCP at offset 0x00025, length 666
    profile name = LittleCMS ICC profile, compression method = 0 (deflate)
    compressed profile = 643 bytes
 uncompressed 1260

v40-DisplayP3 chunk iCCP at offset 0x00025, length 376
    profile name = LittleCMS ICC profile, compression method = 0 (deflate)
    compressed profile = 353 bytes
 uncompressed 536

v4-CIE-Lstar  chunk iCCP at offset 0x00025, length 624
    profile name = LittleCMS ICC profile, compression method = 0 (deflate)
    compressed profile = 601 bytes
 uncompressed 1144

v4-ProPhoto chunk iCCP at offset 0x00025, length 616
    profile name = LittleCMS ICC profile, compression method = 0 (deflate)
    compressed profile = 593 bytes
 uncompressed 1156
