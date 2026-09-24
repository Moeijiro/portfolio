import type { Caption } from "@/components/diagram";
import type { Diagram } from "@/content/projects";

const p = (slug: string, label: string) => ({ label, href: `/projects/${slug}/` });

/** The hero's system map: the shape most of the projects share. */
export const systemMap: Diagram = {
  columns: [
    [
      { id: "discord", title: "Discord", sub: "gateway · slash commands", kind: "external" },
      { id: "hooks", title: "Webhooks", sub: "token URLs · HMAC", kind: "input" },
      { id: "web", title: "Web dashboard", sub: "Next.js · React", kind: "input" },
    ],
    [
      { id: "api", title: "Python backend", sub: "FastAPI · Pydantic", kind: "core" },
      { id: "workers", title: "Async workers", sub: "schedulers · retries", kind: "core" },
    ],
    [
      { id: "db", title: "Database", sub: "SQLAlchemy 2", kind: "store" },
      { id: "notify", title: "Discord · Telegram", sub: "alerts · actions", kind: "external" },
      { id: "apis", title: "External APIs", sub: "httpx · SSRF-guarded", kind: "external" },
    ],
  ],
  edges: [
    ["discord", "api"], ["hooks", "api"], ["web", "api"], ["api", "workers"],
    ["api", "db"], ["workers", "notify"], ["workers", "apis"],
  ],
};

export const systemCaptions: Record<string, Caption> = {
  discord: {
    title: "Discord gateway and REST",
    body: "discord.py bots that turn gateway events into plain events, act through a rate-limit-aware REST layer, and never trust a stale permission cache.",
    links: [p("nexusguard", "NexusGuard"), p("discord-automation-platform", "Discord Automation Platform"), p("supportdesk", "SupportDesk")],
  },
  hooks: {
    title: "Incoming webhooks",
    body: "Token URLs with size limits and optional HMAC verification; the run is recorded before anything else happens and the caller gets a 202.",
    links: [p("nexaflow", "NexaFlow"), p("databridge", "DataBridge"), p("webhook-automation-hub", "Webhook Automation Hub")],
  },
  web: {
    title: "Dashboards",
    body: "Next.js and React front ends on HttpOnly session cookies, with loading, empty and error states designed rather than left over.",
    links: [p("forgedesk", "ForgeDesk"), p("resolveai", "ResolveAI"), p("scoutflow", "ScoutFlow")],
  },
  api: {
    title: "FastAPI services",
    body: "Typed Pydantic models, one JSON error envelope, ownership checks that answer 404 rather than confirm a resource exists, and a test suite per repository.",
    links: [p("api-management-platform", "API Management Platform"), p("forgedesk", "ForgeDesk")],
  },
  workers: {
    title: "Background work",
    body: "In-process asyncio schedulers with atomic claiming, staged runs the UI can follow live, and retries only for failures a retry can fix.",
    links: [p("scoutflow", "ScoutFlow"), p("pulsewatch", "PulseWatch"), p("databridge", "DataBridge")],
  },
  db: {
    title: "Data layer",
    body: "SQLAlchemy 2 models (sync and async), UTC timestamps, audit trails and execution logs that record failures as well as successes.",
    links: [p("nexusguard", "NexusGuard"), p("api-management-platform", "API Management Platform")],
  },
  notify: {
    title: "Alerts and actions",
    body: "Discord webhooks with mentions disabled, Telegram with escaped HTML, and HMAC-signed webhooks — content from outside is escaped per channel.",
    links: [p("scoutflow", "ScoutFlow"), p("pulsewatch", "PulseWatch"), p("nexaflow", "NexaFlow")],
  },
  apis: {
    title: "Outbound HTTP",
    body: "One httpx client per product that resolves and checks addresses, re-validates redirects, caps response size and backs off exponentially on 429 and 5xx.",
    links: [p("databridge", "DataBridge"), p("scoutflow", "ScoutFlow"), p("pulsewatch", "PulseWatch")],
  },
};

export const capabilities = [
  {
    title: "Discord systems",
    body: "Bots and dashboards for real server workflows: moderation engines, onboarding, tickets, tournaments, progression — with OAuth2 and permission checks done properly.",
    projects: ["nexusguard", "discord-automation-platform", "supportdesk", "guildpilot", "eventforge", "questforge"],
    category: "discord",
  },
  {
    title: "APIs & integrations",
    body: "REST APIs with keys, quotas and logs, and integrations that map data between services with retries and a record of every failure.",
    projects: ["databridge", "api-management-platform", "devpulse", "resolveai"],
    category: "apis",
  },
  {
    title: "Automation",
    body: "Webhook-triggered workflows, scheduled checks and background jobs that notify Discord, Telegram or any HTTP endpoint.",
    projects: ["nexaflow", "scoutflow", "webhook-automation-hub", "pulsewatch"],
    category: "automation",
  },
  {
    title: "Full-stack applications",
    body: "Next.js + FastAPI products with authentication, roles, file handling and every UI state designed — landing page included.",
    projects: ["forgedesk", "resolveai", "nexaflow", "vaultshare"],
    category: "web",
  },
  {
    title: "Security & monitoring",
    body: "SSRF guards, hashed keys, encrypted secrets, rate limits, uptime and change monitoring — the parts that decide whether a tool can be trusted.",
    projects: ["nexusguard", "vaultshare", "pulsewatch", "api-management-platform"],
    category: "security",
  },
] as const;

export const principles = [
  { title: "Failures are data", body: "A timeout is recorded as a timeout, not as a change or a silent no-op. Runs, checks and automations keep the reason they failed.", proof: [p("scoutflow", "ScoutFlow"), p("databridge", "DataBridge")] },
  { title: "Secrets stay on the server", body: "OAuth tokens and credentials are encrypted at rest; API keys are stored as digests and shown once.", proof: [p("discord-automation-platform", "Discord Automation Platform"), p("api-management-platform", "API Management")] },
  { title: "Outbound requests are guarded", body: "Services that fetch URLs for users check resolved addresses and every redirect hop against private ranges.", proof: [p("scoutflow", "ScoutFlow"), p("nexaflow", "NexaFlow")] },
  { title: "Retries only when they help", body: "Timeouts, 429 and 5xx back off and retry; a 4xx is an answer and is never retried.", proof: [p("databridge", "DataBridge"), p("webhook-automation-hub", "Webhook Automation Hub")] },
  { title: "The blast radius is bounded", body: "Automatic actions run under caps, so a bad rule degrades to “log and tell a human”.", proof: [p("nexusguard", "NexusGuard")] },
  { title: "Demos run the real code", body: "Seed data is produced by the same pipelines as production, and tests drive real services in-process.", proof: [p("scoutflow", "ScoutFlow"), p("nexusguard", "NexusGuard")] },
];

/** Technologies as evidenced by the repositories' dependency files (count = repositories using it). */
export const stack = [
  { group: "Backend", items: [["Python", 16], ["FastAPI", 16], ["Pydantic v2", 16], ["SQLAlchemy 2", 16], ["httpx · asyncio", 16], ["pytest", 16]] },
  { group: "Discord & integrations", items: [["discord.py", 6], ["Discord OAuth2 & REST", 2], ["Telegram Bot API", 4], ["Webhooks & HMAC signing", null], ["OpenAI-compatible API", 1], ["BeautifulSoup", 1]] },
  { group: "Security", items: [["JWT sessions", 11], ["cryptography (Fernet, AES-GCM)", 7], ["scrypt / bcrypt passwords", 9], ["API-key hashing", 4], ["SSRF protection", 5]] },
  { group: "Frontend", items: [["TypeScript", 16], ["React 19", 16], ["Tailwind CSS v4", 16], ["Next.js 16", 13], ["Motion", 12], ["shadcn/ui", 10], ["Vite", 3]] },
  { group: "Data & tooling", items: [["SQLite", 16], ["GitHub Actions CI", 16], ["Git", 16], ["Make", 16]] },
] as const;
