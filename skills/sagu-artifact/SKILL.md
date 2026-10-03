---
name: sagu-artifact
description: |
  Create and fetch Sagu platform artifacts through MCP. Use when the user wants
  to turn intelligence into a shareable artifact, read an existing artifact, or
  extract a format-matched dispatch artifact from a ping. Also answers to
  "artifact" and "share".
aliases:
  - artifact
  - share
author: Sagu
---

# Sagu — artifacts and shares

Sagu can turn radars, pings, and intelligence into **platform artifacts**:
shareable pages with HTML, text, JSON payloads, and metadata. This skill teaches
agents how to create, read, and dispatch artifacts through MCP.

Connect to the Sagu MCP server at `https://radar-mcp.luke-nittmann.workers.dev/`,
or run the local stdio server with `npx -y @sagu/mcp` and a `RADAR_API_KEY`.

## Use when

- The user asks to create a share, artifact, page, or embed from Sagu content.
- You need to read an existing Sagu artifact by ID.
- You want to extract the format-matched dispatch artifact from a ping
  (dashboard, timeline, itinerary, threaded_summary).
- The user asks for a public link or embed URL for Sagu-generated content.

## Don't use when

- The task is just reading radars or pings — use `sagu-dispatch` for that.
- The user hasn't authenticated or authorized write scope.
- The artifact would expose secrets, private data, or unapproved content.

## MCP tools

- `radar_list_artifacts` (`sagu.artifacts`) — list platform artifacts for the user.
- `radar_get_artifact` (`sagu.artifacts`) — get one artifact by ID, including HTML,
  text, JSON payload, and metadata.
- `radar_create_artifact` (`sagu.artifacts`) — create a new artifact from HTML and
  optional JSON metadata. Returns share URL and embed URL. Requires write scope.
- `radar_get_dispatch` (`sagu.artifacts`) — extract the format-matched dispatch
  artifact from a ping.
- `radar_delegate_research` (`sagu.research`) — delegate a deep research run for a
  radar (write scope).
- `radar_evolve_knowledge` (`sagu.knowledge`) — add/update a fact on a radar's
  knowledge graph. Requires confidence >= 0.8 and >= 2 distinct citation IDs.

## How to artifact well

1. **Source.** Find the radar or ping you want to materialize (use `sagu-dispatch`).
2. **Create.** Call `radar_create_artifact` with a clear title, HTML body, optional
   summary/text, and JSON metadata. Prefer public visibility only when the user
   has confirmed.
3. **Share.** Return the `shareUrl` and `embedUrl` from the result.
4. **Dispatch.** For pings that already contain a format-matched artifact, use
   `radar_get_dispatch` to extract it instead of rebuilding.
5. **Evolve knowledge carefully.** Only call `radar_evolve_knowledge` when the user
   asks to update the radar's knowledge graph and you have strong citations.
