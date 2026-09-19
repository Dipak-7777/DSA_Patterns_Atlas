# Pattern Atlas

A dependency-free, GitHub Pages-ready DSA interview revision atlas. The site organizes a curated problem set into 14 reusable patterns, with templates, difficulty filters, search, links, keyboard-friendly accordions, and a browser-saved checklist.

## Features

- 14 pattern-based DSA study tracks with dynamically calculated totals.
- Search by problem name, metadata, role, or pattern.
- Easy / Medium / Hard filters with an accessible empty state.
- Progress tracking stored locally in the browser.
- JSON progress export/import for moving between browsers.
- Light/dark theme, responsive navigation, print/PDF styles, and reduced-motion support.
- No build step, framework, package manager, or server-side code required.

## Run locally

From this directory, use any static server. For example, with Python:

```powershell
py -m http.server 8000
```

Then open <http://localhost:8000>. Opening `index.html` directly also works for the basic interface, but a local server is recommended for a deployment-like test.

## Publish with GitHub Pages

1. Create an empty repository on GitHub. Do not add a README or `.gitignore` there if you want the first push to be completely clean.
2. Open PowerShell and run the following commands, replacing the placeholders:

```powershell
Set-Location "C:\Users\DrX DIPAK\dsa_platformaa_atlas"
git init
git branch -M main
git add .
git commit -m "Build Pattern Atlas website"
git remote add origin "https://github.com/<GITHUB_USERNAME>/<REPOSITORY_NAME>.git"
git push -u origin main
```

3. On GitHub, open **Settings → Pages**, choose **GitHub Actions** as the source, and wait for the `Deploy Pattern Atlas to GitHub Pages` workflow to finish. The live URL will normally be:

```text
https://<GITHUB_USERNAME>.github.io/<REPOSITORY_NAME>/
```

If GitHub asks for credentials, authenticate through GitHub CLI (`gh auth login`) or your configured Git credential manager. Never paste a password or access token into this chat.

## Updating the site

After editing files locally:

```powershell
git add .
git commit -m "Update Pattern Atlas"
git push
```

The workflow redeploys the latest `main` branch automatically.

## Maintainer

Maintained by [Dipak-7777](https://github.com/Dipak-7777).

