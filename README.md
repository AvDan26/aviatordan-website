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
