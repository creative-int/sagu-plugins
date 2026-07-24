# Sagu plugins — agent guide

Public distribution repo for Sagu: the `sagu-dispatch` and `sagu-artifact`
skills + plugin manifests for Cursor, Codex, and Claude Code, plus `.mcp.json`
and the MCP Registry `server.json`. Installable via
`npx skills add creative-int/sagu-plugins` and the three client plugin
marketplaces.

## The one rule: generate, don't hand-edit

`sagu.config.ts` is the **single source of truth**. Every manifest, `.mcp.json`,
`server.json`, and the README install block are emitted from it by
`tooling/generate.ts`. Edit the config, then:

```sh
pnpm generate     # rewrite all generated files
pnpm verify       # check:generated (drift) + typecheck + MCP reachability smoke
```

Never hand-edit the generated files (`.mcp.json`, `.claude-plugin/*`,
`.codex-plugin/*`, `.cursor-plugin/*`, `server.json`, the README `AUTO-GENERATED`
block). CI runs `check:generated` and fails on drift.

## To add a client

Add its install steps to `installClients` in `tooling/generate.ts` and, if it
needs a manifest, add the manifest builder to the `files` map. Regenerate.

## Scope

- v0: two skills (`sagu-dispatch`, `sagu-artifact`) + 3 client manifests +
  `.mcp.json` + `server.json`, generated.
- v0.2 (deferred): optional stop hooks / knowledge-graph guardrails.

The MCP tool surface is hosted by the Sagu MCP server:

- `packages/mcp` — local stdio server (`npx -y @sagu/mcp`, `RADAR_API_KEY`).
- `apps/mcp` — remote Streamable HTTP server (`https://sagu-mcp.luke-nittmann.workers.dev/mcp`).

Keep the agent-facing tool surface lean so it does not bloat context.

## Platform posture

Tooling-only companion repo; no product runtime surface.

## Companion plugin profile

This repo intentionally uses the `agent-plugin-companion` profile rather than the
full app-family turborepo profile. It is a public agent-facing distribution repo
for Sagu, so it owns generated plugin manifests, skills, MCP metadata, and
install documentation — not product runtime surfaces.

Required root contract for this profile:

- `AGENTS.md` plus `CLAUDE.md -> AGENTS.md`
- `README.md`, `LICENSE`, `package.json`, `pnpm-lock.yaml`, `tsconfig.json`, `.nvmrc`, `.gitignore`, `.github/workflows/verify.yml`
- canonical config at `sagu.config.ts`
- generator and smoke tooling under `tooling/`
- distributed skills under `skills/`
- generated client adapters: `.mcp.json`, `server.json`, `.claude-plugin/`, `.codex-plugin/`, `.cursor-plugin/`

Intentional omissions: `apps/`, `packages/`, `TESTING.md`, `knip.json`, `codecov.yml`, `biome.json`, `turbo.json`, `pnpm-workspace.yaml`, and `.npmrc` until the plugin pack grows into a workspace or needs private GitHub Packages.

CLAUDE.md is a symlink to this file.
