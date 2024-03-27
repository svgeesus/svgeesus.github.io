---
title: cICP explained
draft: true
tags: [
	"Image Formats",
	"Color Science"
]
---

Blog post taking apart the H.273 values in cICP and distilling down to the useful ones, 
ignoring historical/undefined/reserved/useless.

XYZ is available but with a stupid white point, x=0.3333 y=0.3333 don't be tempted to use it.

sRGB is there (also 709 HDTV with a different transfer curve)
DCI-P3 and display-p3 are available
2020, 2100-hlg and 2100-pq all there.

Not representable: Adobe 1998, ProPhoto, xyz-d65, xyz-d50
and only RGB-like formats, no CIE Lab, Oklab.

cICP chunk (including chunk name, length and checksum) adds 16 bytes, much smaller than even a minimal ICC profile.