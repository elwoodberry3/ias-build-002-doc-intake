# /workflows

n8n workflow exports for this build (`*.json`).

- Export from n8n: workflow menu → Download.
- Strip credentials before committing (n8n exports exclude secrets
  by default — verify anyway).
- If the workflow doesn't exist yet: leave this directory with only
  this README. Do not commit placeholder or fabricated exports.

TODO: add workflow export(s) when the build ships.
