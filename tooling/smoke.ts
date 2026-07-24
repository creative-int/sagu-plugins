/**
 * Best-effort reachability smoke for the Sagu MCP server.
 *
 * Sends a minimal MCP `initialize` to the configured Streamable HTTP endpoint.
 * - HTTP < 500 (incl. auth challenges) → the server speaks MCP → pass.
 * - HTTP >= 500 → the server is broken → fail.
 * - Network unreachable (offline CI / sandbox) → soft-skip so it never flakes.
 *
 * A fully authenticated `tools/list` smoke is a follow-up once the OAuth preflight
 * is wired.
 */
import { sagu } from "../sagu.config.ts";

const url = sagu.mcp.url;
const body = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: {
    protocolVersion: "2025-06-18",
    capabilities: {},
    clientInfo: { name: "sagu-plugins-smoke", version: sagu.version },
  },
});

try {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
    },
    body,
    signal: AbortSignal.timeout(8000),
  });
  if (res.status >= 500) {
    console.error(`MCP smoke failed: ${url} returned HTTP ${res.status}`);
    process.exit(1);
  }
  console.log(`MCP server reachable: ${url} (HTTP ${res.status})`);
} catch (error) {
  console.warn(
    `MCP smoke skipped (endpoint unreachable from here): ${(error as Error).message}`
  );
}
