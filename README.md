# AviatorDan website

A premium, multi-page static website designed for GitHub Pages.

## Upload to GitHub

Upload everything in this folder to the root of your `aviatordan-site` repository. Then enable GitHub Pages from the `main` branch and `/root` folder.

## Automatic latest YouTube videos

The website is already coded to show the latest three uploads automatically through the official YouTube Data API.

1. Create a YouTube Data API v3 key in Google Cloud Console.
2. Find your YouTube Channel ID in YouTube advanced account settings.
3. Open `assets/js/video-config.js`.
4. Paste both values into `apiKey` and `channelId`.

Without these values, the section displays a polished link to the channel rather than breaking.

## Edit text and links

- Homepage: `index.html`
- About: `about.html`
- Community: `community.html`
- Contact: `contact.html`
- Shared navigation/footer: `assets/js/components.js`
- Colours and design: `assets/css/style.css`

## Custom domain

In GitHub: **Settings → Pages → Custom domain**, enter `aviatordan.com` and enable HTTPS once DNS is verified.
