# Yotode Events Website

Professional, bilingual (English/Amharic) event-planning website for Yotode Events, focused on Ethiopian Orthodox and multicultural celebrations.

## Current Site Features

- Single-page experience in `/home/runner/work/yotode-events/yotode-events/index.html`
- Four-section navigation: Home, Services & Packages, Inspiration, Contact
- English/Amharic language toggle with persistence (`localStorage` key: `yotode-language`)
- Package showcase for Dirirsa, Qidus, and Melkam with inquiry shortcuts
- Filterable inspiration gallery (Orthodox weddings, baptisms, coffee ceremony, multicultural)
- Contact form via FormSubmit AJAX endpoint

## Local Preview

Open `index.html` in a browser.

## GitHub Pages + Custom Domain (`www.yotode_events.com`)

This repository includes a `CNAME` file configured for:

```txt
www.yotode_events.com
```

### Publish Steps

1. Push this repository to the branch used for Pages publishing (typically `main`).
2. In GitHub: **Repository → Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch: `main`, folder: `/ (root)`, then **Save**.
5. In **Custom domain**, set: `www.yotode_events.com`.
6. Enable **Enforce HTTPS** after certificate provisioning completes.

### DNS Configuration

At your domain/DNS provider, add:

- `CNAME` record
  - Host/Name: `www`
  - Value/Target: `<your-github-username>.github.io`

Optional (for apex root redirect/support):

- `A` records for `@` pointing to GitHub Pages IPs:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`

### Verification Checklist

- GitHub Pages URL loads (e.g., `https://<username>.github.io/<repo>`)
- Custom domain resolves (`https://www.yotode_events.com`)
- HTTPS certificate issued and enabled
- Navigation, language toggle, gallery filters, and inquiry form all work on live site

