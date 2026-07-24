---
name: sagu-dispatch
description: |
  Work with Sagu radars and pings through MCP: list and search radars, read recent
  pings, export agent-ready context packets, refresh intelligence on demand, and
  ask questions in radar threads. Use when the user needs monitoring intelligence,
  research briefs, or radar-aware context. Also answers to "monitor" and "radar".
aliases:
  - monitor
  - radar
author: Sagu
---

# Sagu — dispatch radars and pings

Sagu is an AI-powered monitoring platform. A **radar** tracks a topic you care
about, and Sagu generates periodic intelligence reports called **pings**. This
skill connects an agent to Sagu's radar and ping tools over MCP.

Connect to the Sagu MCP server at `https://sagu-mcp.luke-nittmann.workers.dev/mcp`,
or run the local stdio server with `npx -y @sagu/mcp` and a `RADAR_API_KEY`.

## Use when

- The user asks about a radar, topic, or ongoing monitoring subject.
- You need recent intelligence, sources, or citations about a tracked topic.
- You want to export a ping as an agent-ready context packet for another workflow.
- The user asks to refresh a radar, run a new intelligence pass, or check ping status.
- The user asks a follow-up question inside a radar's thread.

## Don't use when

- The answer is fully available in the current workspace files.
- The user asks about private data outside their authenticated Sagu account.
- You need to create or share artifacts — use `sagu-artifact` for that.

## MCP tools

- `radar_list_radars` (`sagu.radars`) — list all radars; filter by status and limit.
- `radar_get_radar` (`sagu.radars`) — get one radar's knowledge graph, source stats,
  and learning metrics.
- `radar_search` (`sagu.radars`) — search radars by topic or description.
- `radar_get_pings` (`sagu.pings`) — get recent pings for a radar.
- `radar_get_ping` (`sagu.pings`) — get one ping by ID with full content.
- `radar_get_ping_packet` (`sagu.pings`) — export a ping as an agent-facing
  context packet (JSON or Markdown) with citations, source cards, why-included
  notes, and stable source IDs.
- `radar_refresh` (`sagu.pings`) — trigger a new ping generation for a radar.
- `radar_thread_ask` (`sagu.pings`) — ask a question in a radar's thread.
- `radar_get_info` (`sagu.meta`) — get account context and radar count.

## How to dispatch well

1. **Discover.** Call `radar_list_radars` or `radar_search` to find the relevant radar.
2. **Read.** Use `radar_get_radar` for the radar overview, then `radar_get_pings` or
   `radar_get_ping` for the intelligence.
3. **Export.** When the ping is going into another agent or workflow, use
   `radar_get_ping_packet` with `format: "json"` to preserve citations and stable
   IDs. Use `format: "markdown"` for direct reading.
4. **Refresh.** If the latest ping is stale, call `radar_refresh` and tell the user
   the run is queued. Poll `radar_get_pings` for the new ping.
5. **Cite.** Always carry Sagu citations forward; don't collapse sourced claims
   into unsourced summaries.
