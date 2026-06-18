# Deployment instructions

This project is prepared for containerized deployment and CI/CD. The repository includes:

- `Dockerfile` — multi-stage build: builds the React client and runs the Node server serving the built client in production.
- `.github/workflows/deploy.yml` — GitHub Actions workflow that builds and pushes a Docker image to GitHub Container Registry (GHCR). If secrets are configured, it can also trigger a Render deploy or deploy to Vercel using the appropriate secrets.

Quick steps to get a public URL:

1. Push the repo to GitHub (public or private):
```
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

2. Configure repository secrets (Settings → Secrets → Actions):
- `GITHUB_TOKEN` (provided automatically in Actions) — used to push to GHCR.
- Optional for Render: `RENDER_API_KEY`, `RENDER_SERVICE_ID`.
- Optional for Vercel: `VERCEL_TOKEN`, `VERCEL_PROJECT_ID`, `VERCEL_ORG_ID`.

3. The workflow triggers on push to `main`. It will build and push the Docker image to GHCR (tag: `:latest`) and optionally trigger Render or Vercel deploys when their secrets are present.

4. Alternative: Deploy directly to Vercel by connecting the GitHub repo in the Vercel dashboard — `vercel.json` is already present and configured to serve `client/build` and route `/api` to `server/src/server.js`.

Environment variables to set in the cloud environment:
- `CORS_ORIGIN` — typically set to `*` or to your frontend URL.

If you want, I can also:
- Create the Git commit and push to a GitHub repo (you must provide the remote or grant access).
- Configure a Render service via API (requires Render API key and service id) and wire the deploy.
- Configure Vercel via GitHub integration (requires you to connect Vercel to your GitHub account).
