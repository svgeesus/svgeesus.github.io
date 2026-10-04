---
title: Temporary Private Identifiers
draft: true
tags: [
	"Web Standards"
]
---

# Temporary Private Identifiers

Temporary Private Indentifiers are neither private nor temporary.

## `X-` MIME types

`x-world/x-vrml`

Mislabelled content led to MIME sniffing

MIME sniffing attacks (security vulnerabilities)

which are, ironically, helped by requiring the (temporary)

`X-Content-Type-Options: nosniff`

HTTP header.

- https://www.rfc-editor.org/bcp/bcp13.txt

>   Note that types with names beginning with "x-" are no longer
   considered to be members of this tree (see [RFC6648]).  Also note
   that if a generally useful and widely deployed type incorrectly ends
   up with an "x-" name prefix, it MAY be registered using its current
   name in an alternative tree by following the procedure defined in
   Appendix A.

- [RFC 6648: Deprecating the "X-" Prefix and Similar Constructs in Application Protocols](https://www.rfc-editor.org/rfc/rfc6648) (2012)

>  Historically, designers and implementers of application protocols
   have often distinguished between standardized and unstandardized
   parameters by prefixing the names of unstandardized parameters with
   the string "X-" or similar constructs.  In practice, that convention
   causes more problems than it solves.  Therefore, this document
   deprecates the convention for newly defined parameters with textual
   (as opposed to numerical) names in application protocols.

Only prevents the problem spreading (applies to newly defined).

>  Implementations of application protocols MUST NOT make any
   assumptions about the status of a parameter, nor take automatic
   action regarding a parameter, based solely on the presence or absence
   of "X-" or a similar construct in the parameter's name.

## CSS vendor prefixes

 - https://www.quirksmode.org/blog/archives/2010/03/css_vendor_pref.html (2010)
 - https://www.quirksmode.org/blog/archives/2010/03/css_vendor_pref_1.html (2010)
 - https://wiki.csswg.org/spec/vendor-prefixes (2012)
 - https://www.w3.org/TR/css-2015/#future-proofing (2015)
 - https://css-tricks.com/is-vendor-prefixing-dead/ (2021)

proposes a `beta` which is just as bad as `x-`

browsers removing prefixed features once the unprefixed standard form is stable

implementing widespread `-webkit-` prefixes by other browsers, to be able to render content as designed

CSS does allow duplication (png does not, easily)

Eventually iproved, but not solved, by:

 - hiding early implementations behind feature flags
 - faster implementation cycles, greater communication, leading to improved standarization
 - configurable autoprefixing tools in build chains, improved maintainability at the cost of build complexity

## PNG private chunks

Animated PNG and web compatibility

## See also

 - https://wiki.csswg.org/ideas/mistakes