# Connect prototype

A static social media interface built with HTML, CSS, and JavaScript.

## Local preview

Run `python3 -m http.server 8000` from this directory, then open
http://localhost:8000.

This is a frontend prototype. Posts, messages, and reports exist only in the
current browser page and reset when the page reloads.

## Deploy to Vercel

Import this GitHub repository at https://vercel.com/new. Use the **Other**
framework preset and the repository root. `vercel.json` configures an empty
build command and serves the files from the root directory.

Deployments from the production branch publish the site automatically.
