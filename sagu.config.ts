/**
 * Canonical source of truth for every Sagu install adapter.
 *
 * One config in — every client manifest out. Run `pnpm generate` to (re)emit
 * `.mcp.json`, the Cursor / Codex / Claude Code plugin manifests, the MCP
 * Registry `server.json`, and the README install block. Never hand-edit the
 * generated files; edit this config and regenerate.
 */

export interface SaguConfig {
  /** Marketplace category. */
  category: string;
  /** Human-facing name. */
  displayName: string;
  homepage: string;
  keywords: string[];
  license: string;
  /** Logo path, repo-relative. */
  logo: string;
  /** Paragraph for marketplace long-description surfaces. */
  longDescription: string;
  mcp: {
    /** Server key used in `.mcp.json` and as the registry short name. */
    id: string;
    /** Remote Streamable HTTP MCP endpoint. */
    url: string;
    transport: "streamable-http";
    /** Local stdio MCP server package for clients that prefer a subprocess. */
    stdioPackage: string;
  };
  /** Machine-facing id (plugin name, mcp server key). */
  name: string;
  owner: { name: string; email: string };
  readiness: {
    status: string;
  };
  /** Reverse-DNS name for the official MCP Registry server.json. */
  registryName: string;
  repository: string;
  /** One-sentence description (manifests, marketplace cards). */
  shortDescription: string;
  skills: Array<{
    /** Skill directory under skills/. */
    name: string;
    /** Discovery aliases (e.g. "monitor"). */
    aliases: string[];
    description: string;
  }>;
  /** Short marketing line. */
  tagline: string;
  tools: Array<{
    name: string;
    scope: string;
    description: string;
  }>;
  version: string;
}

export const sagu: SaguConfig = {
  name: "sagu",
  displayName: "Sagu",
  version: "0.1.0",
  tagline: "Agent-facing intelligence from your radars.",
  shortDescription:
    "Connect agents to Sagu radars, pings, and artifacts over remote MCP.",
  longDescription:
    "Sagu is an AI-powered monitoring platform. This plugin exposes Sagu's dispatch and artifact tools to any MCP-aware agent: list and search radars, read pings, export agent-ready context packets, refresh intelligence on demand, and create or fetch platform artifacts. The remote MCP endpoint uses OAuth/Bearer auth; a local stdio server is also available via the `@sagu/mcp` package.",
  homepage: "https://sagu.app",
  repository: "https://github.com/creative-int/sagu-plugins",
  license: "MIT",
  owner: { name: "creative-int", email: "support@sagu.app" },
  category: "Productivity",
  keywords: [
    "sagu",
    "mcp",
    "agent-skills",
    "monitoring",
    "intelligence",
    "radars",
    "pings",
    "artifacts",
    "context-packets",
  ],
  logo: "./assets/logo.png",
  mcp: {
    id: "sagu",
    // TODO: switch to https://mcp.sagu.app/mcp once the custom domain is routed.
    url: "https://sagu-mcp.luke-nittmann.workers.dev/mcp",
    transport: "streamable-http",
    stdioPackage: "npx -y @sagu/mcp",
  },
  registryName: "io.github.creative-int/sagu",
  skills: [
    {
      name: "sagu-dispatch",
      aliases: ["monitor", "radar"],
      description:
        "Create, list, search, and refresh Sagu radars; read pings and export agent-ready context packets.",
    },
    {
      name: "sagu-artifact",
      aliases: ["artifact", "share"],
      description:
        "Create and fetch Sagu platform artifacts and extract dispatch artifacts from pings.",
    },
  ],
  tools: [
    {
      name: "radar_list_radars",
      scope: "sagu.radars",
      description:
        "List all radars for the authenticated user. Filter by status and limit results.",
    },
    {
      name: "radar_get_radar",
      scope: "sagu.radars",
      description:
        "Get detailed information about a specific radar including its knowledge graph and source intelligence stats.",
    },
    {
      name: "radar_search",
      scope: "sagu.radars",
      description: "Search radars by topic or description.",
    },
    {
      name: "radar_get_pings",
      scope: "sagu.pings",
      description: "Get recent pings (intelligence reports) for a radar.",
    },
    {
      name: "radar_get_ping",
      scope: "sagu.pings",
      description: "Get a single ping by ID with full content.",
    },
    {
      name: "radar_get_ping_packet",
      scope: "sagu.pings",
      description:
        "Export a ping as an agent-facing context packet in JSON or Markdown with citations and source cards.",
    },
    {
      name: "radar_refresh",
      scope: "sagu.pings",
      description:
        "Trigger a new ping generation for a radar. Starts the research pipeline and returns immediately.",
    },
    {
      name: "radar_thread_ask",
      scope: "sagu.pings",
      description: "Ask a question in a radar's thread.",
    },
    {
      name: "radar_list_artifacts",
      scope: "sagu.artifacts",
      description: "List platform artifacts for the authenticated user.",
    },
    {
      name: "radar_get_artifact",
      scope: "sagu.artifacts",
      description:
        "Get a single platform artifact by ID, including its HTML, text, JSON payload, and metadata.",
    },
    {
      name: "radar_create_artifact",
      scope: "sagu.artifacts",
      description:
        "Create a new platform artifact from HTML and optional JSON metadata. Returns share URL and embed URL.",
    },
    {
      name: "radar_get_dispatch",
      scope: "sagu.artifacts",
      description:
        "Extract the format-matched dispatch artifact from a ping (dashboard, timeline, itinerary, threaded_summary).",
    },
    {
      name: "radar_delegate_research",
      scope: "sagu.research",
      description:
        "Delegate a trust-spine-validated deep research run for a radar.",
    },
    {
      name: "radar_evolve_knowledge",
      scope: "sagu.knowledge",
      description:
        "Add or update a fact on a radar's knowledge graph. Requires confidence >= 0.8 and >= 2 distinct citation IDs.",
    },
    {
      name: "radar_get_info",
      scope: "sagu.meta",
      description:
        "Get session context including available radars count and account information.",
    },
  ],
  readiness: {
    status:
      "Live prod: the workers.dev MCP origin serves the real Sagu Convex-backed platform. Authenticated read/write tools operate against production radars, pings, and artifacts. The mcp.sagu.app custom domain is not routed yet; use the workers.dev origin or the local `@sagu/mcp` stdio package.",
  },
};

export default sagu;
