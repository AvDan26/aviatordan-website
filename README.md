# AviatorDan website

This is a static GitHub Pages website for aviatordan.com.

## What is included

- Home page with the About section merged into it
- Community page
- Contact page
- Scroll responsive cloud background
- Mobile navigation
- Automatic copyright year
- Custom 404 page
- CNAME file for aviatordan.com
- No Google Cloud setup
- No YouTube API
- No paid services

## Uploading the new version

1. Download and extract the ZIP.
2. Open your GitHub repository.
3. Delete the old website files so none of the old API files remain.
4. Choose Add file, then Upload files.
5. Upload everything inside the extracted folder.
6. Commit the changes to the main branch.
7. Wait for GitHub Pages to redeploy.
8. Refresh the live site using a hard refresh.

On Windows, use Ctrl + Shift + R.
On Mac, use Command + Shift + R.

## File structure

- index.html
- community.html
- contact.html
- about.html
- 404.html
- CNAME
- site.webmanifest
- assets/css/styles.css
- assets/js/main.js
- assets/images/

## Version 1.1 changes

- Updated Home page wording
- Removed About from the navigation
- Updated Community card text
- Replaced the footer bar and social links with a plain copyright line

## Version 1.4 emergency fix

- Fixed CSS, JavaScript, favicon, and image paths on `/community/` and `/contact/`.
- All local assets now use root-relative URLs such as `/assets/css/styles.css`.
- Clean URLs remain enabled.


## Version 1.15

- Replaced the Community page with social icons in the homepage hero.
- Added YouTube, Instagram, Discord and Facebook links.
- Renamed Contact to Work With Me.
- Added `/work-with-me/` and redirected the old Contact URLs.
- Added a simple desktop navigation with Home and Work With Me.
- Kept the hamburger menu for smaller screens.


## Version 1.16

- Moved the AviatorDan logo into the top-left header.
- Kept desktop navigation on the right and the hamburger menu on mobile only.
- Made mobile hero buttons compact rather than full-width.
- Moved “Hi, I'm Dan.” into the opening biography paragraph.
- Removed “Scroll to explore”.
- Added a layered cloud curtain that separates as the visitor scrolls.
- Changed the footer to “© 2026 AviatorDan”.
- Aligned the biography text with the top of Dan's photo on desktop.
- Removed the “Where to next?” section.


## Version 1.17

- Kept the role and tagline on one line across desktop and mobile.
- Removed the large hero buttons.
- Added a fifth email icon linking to Work With Me.
- Rebuilt the cloud transition with deeper cloud layers, haze, wisps and an evaporation fade.
- Added a two-by-two My Platforms section with branded platform colours and handles.
- Compressed the Goals section, especially on mobile.
- Added a compact Work With Me call-to-action after the Goals section.


## Version 1.18

- Removed the divider line running through the cloud transition.
- Increased the cloud field so it occupies more of the hero area.
- Refined cloud shading, haze and depth for a more realistic appearance.
- Rebuilt the cloud scroll animation with requestAnimationFrame and eased progress.
- Corrected hero centring on desktop and mobile.
- Made the top-left logo hide and return with the navigation controls.
- Updated the biography copy.


## Version 1.19

- Centred the hero directly against the full viewport rather than the page container.
- Replaced complex CSS cloud shapes with three pre-rendered transparent cloud layers.
- Increased cloud coverage across the lower part of the hero.
- Removed expensive mobile blur and box-shadow rendering.
- Changed cloud animation to use scroll position without layout reads and smooth interpolation.


## Version 1.20

- Replaced the About photo with a five-image slideshow using the supplied photographs.
- Preserved the original portrait aspect ratio.
- Added Instagram-style position dots beneath the slideshow.
- Added automatic cycling, dot navigation and mobile swipe gestures.
- Pauses automatic cycling while hovered on desktop.


## Version 1.21

- Replaced the first About slideshow image with IMG_7706.jpg.
- Increased cloud density and depth so the transition reads as a cloud bank rather than smoke.
- Expanded the cloud coverage across the hero.
- Preserved the lightweight mobile animation approach.


## Version 1.23

- Reformatted the four goals into the requested icon-led design.
- Added aircraft, camera, community and globe icons.
- Updated the goals to Entertain, Create, Connect and Inspire.
- Added the supplied descriptions and responsive divider layout.


## Version 1.25

- Replaced the Entertain aircraft icon with a happy face outline.
- Removed the duplicate full-width divider lines beneath the mobile goal items.
