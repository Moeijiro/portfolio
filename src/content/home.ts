import type { Caption } from "@/components/diagram";
import type { Category, Diagram } from "@/content/projects";

/** Homepage selection: one project per kind of work, strongest first. */
export const FEATURED = ["studyraid", "nexusguard", "databridge", "resolveai", "nexaflow"] as const;

/** What a card calls each kind of project (singular, plain words). */
export const KIND_LABEL: Record<Category, string> = {
  web: "Full-stack app",
  automation: "Automation platform",
  discord: "Discord system",
  apis: "API & integrations",
  ai: "AI app",
  security: "Security & monitoring",
};

export const capabilities: { title: string; body: string; category: Category; icon: "api" | "bolt" | "layers" | "discord" }[] = [
  { title: "Backend & APIs", body: "FastAPI services with authentication, roles, databases, API keys and third-party integrations.", category: "apis", icon: "api" },
  { title: "Automation", body: "Background jobs, schedulers, webhooks and workflows that notify Discord, Telegram or any endpoint.", category: "automation", icon: "bolt" },
  { title: "Full-stack apps", body: "Complete products: a Python backend with a React / Next.js frontend, designed down to the empty states.", category: "web", icon: "layers" },
  { title: "Discord systems", body: "Bots, OAuth2 dashboards, moderation, onboarding and community tooling with real permission checks.", category: "discord", icon: "discord" },
];

/** Technologies that appear in the repositories' dependency files (see the About page for counts). */
export const primaryStack = [
  { group: "Backend", items: ["Python", "FastAPI", "Pydantic", "SQLAlchemy", "asyncio", "httpx", "pytest"] },
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Data & delivery", items: ["SQLite", "PostgreSQL", "Docker", "GitHub Actions", "WebSockets"] },
  { group: "Integrations", items: ["Discord API", "Telegram Bot API", "Webhooks", "OpenAI-compatible APIs"] },
];

/** The "beyond the happy path" checklist, each backed by a case study. */
export const quality = [
  { title: "Authentication & permissions", body: "Rotating sessions, OAuth2, ownership checks on every lookup.", proof: "studyraid" },
  { title: "Background jobs & retries", body: "Schedulers and retries only where a retry can change the outcome.", proof: "databridge" },
  { title: "Testing & CI", body: "Every repository ships a test suite that drives the real app, run on each push.", proof: "studyraid" },
  { title: "API integrations", body: "Field mapping, rate limits, signed webhooks and a record of every failure.", proof: "databridge" },
  { title: "Security-conscious design", body: "Hashed keys, encrypted secrets, SSRF guards, safety caps on automation.", proof: "nexusguard" },
  { title: "Observable failures", body: "Runs, checks and actions keep the reason they failed, visible in the UI.", proof: "scoutflow" },
] as const;

const p = (slug: string, label: string) => ({ label, href: `/projects/${slug}/` });

/** The shape most of the projects share. Shown on the About page. */
export const systemMap: Diagram = {
  columns: [
    [
      { id: "discord", title: "Discord", sub: "gateway · slash commands", kind: "external" },
      { id: "hooks", title: "Webhooks", sub: "token URLs · HMAC", kind: "input" },
      { id: "web", title: "Web app", sub: "Next.js · React", kind: "input" },
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
    title: "Web apps",
    body: "Next.js and React front ends on session cookies or in-memory tokens, with loading, empty and error states designed rather than left over.",
    links: [p("studyraid", "StudyRaid"), p("forgedesk", "ForgeDesk"), p("resolveai", "ResolveAI")],
  },
  api: {
    title: "FastAPI services",
    body: "Typed Pydantic models, one JSON error envelope, ownership checks that answer 404 rather than confirm a resource exists, and a test suite per repository.",
    links: [p("studyraid", "StudyRaid"), p("api-management-platform", "API Management Platform"), p("forgedesk", "ForgeDesk")],
  },
  workers: {
    title: "Background work",
    body: "Asyncio schedulers with atomic claiming or dedupe keys, staged runs the UI can follow live, and retries only for failures a retry can fix.",
    links: [p("scoutflow", "ScoutFlow"), p("pulsewatch", "PulseWatch"), p("studyraid", "StudyRaid")],
  },
  db: {
    title: "Data layer",
    body: "SQLAlchemy 2 models (sync and async), UTC timestamps, audit trails and ledgers that record failures as well as successes.",
    links: [p("studyraid", "StudyRaid"), p("nexusguard", "NexusGuard"), p("api-management-platform", "API Management Platform")],
  },
  notify: {
    title: "Alerts and actions",
    body: "Discord webhooks with mentions disabled, Telegram with escaped HTML, and HMAC-signed webhooks. Content from outside is escaped per channel.",
    links: [p("scoutflow", "ScoutFlow"), p("pulsewatch", "PulseWatch"), p("nexaflow", "NexaFlow")],
  },
  apis: {
    title: "Outbound HTTP",
    body: "One httpx client per product that resolves and checks addresses, re-validates redirects, caps response size and backs off on 429 and 5xx.",
    links: [p("databridge", "DataBridge"), p("scoutflow", "ScoutFlow"), p("pulsewatch", "PulseWatch")],
  },
};

export const principles = [
  { title: "Failures are data", body: "A timeout is recorded as a timeout, not as a change or a silent no-op. Runs, checks and automations keep the reason they failed.", proof: [p("scoutflow", "ScoutFlow"), p("databridge", "DataBridge")] },
  { title: "Secrets stay on the server", body: "OAuth tokens and credentials are encrypted at rest; API keys and refresh tokens are stored as digests.", proof: [p("discord-automation-platform", "Discord Automation Platform"), p("studyraid", "StudyRaid")] },
  { title: "Outbound requests are guarded", body: "Services that fetch URLs for users check resolved addresses and every redirect hop against private ranges.", proof: [p("scoutflow", "ScoutFlow"), p("nexaflow", "NexaFlow")] },
  { title: "Retries only when they help", body: "Timeouts, 429 and 5xx back off and retry; a 4xx is an answer and is never retried.", proof: [p("databridge", "DataBridge"), p("webhook-automation-hub", "Webhook Automation Hub")] },
  { title: "Totals come from history", body: "Counters that matter are derived from append-only records, so they can't drift from what happened.", proof: [p("studyraid", "StudyRaid")] },
  { title: "Demos run the real code", body: "Seed data is produced by the same services as production, and tests drive real apps in-process.", proof: [p("studyraid", "StudyRaid"), p("nexusguard", "NexusGuard")] },
];

/** Technologies as evidenced by the repositories' dependency files (count = repositories using it). */
export const stack = [
  { group: "Backend", items: [["Python", 17], ["FastAPI", 17], ["Pydantic v2", 17], ["SQLAlchemy 2", 17], ["httpx · asyncio", 17], ["pytest", 17], ["Alembic", 1]] },
  { group: "Discord & integrations", items: [["discord.py", 6], ["Discord OAuth2 & REST", 2], ["Telegram Bot API", 4], ["Webhooks & HMAC signing", null], ["OpenAI-compatible API", 1], ["BeautifulSoup", 1], ["WebSockets", 1]] },
  { group: "Security", items: [["JWT sessions", 12], ["cryptography (Fernet, AES-GCM)", 7], ["scrypt / bcrypt / argon2 passwords", 10], ["API-key hashing", 4], ["SSRF protection", 5]] },
  { group: "Frontend", items: [["TypeScript", 17], ["React 19", 17], ["Tailwind CSS v4", 17], ["Next.js 16", 14], ["Motion", 13], ["shadcn/ui", 10], ["Recharts", 1], ["Vite", 3]] },
  { group: "Data & tooling", items: [["SQLite", 17], ["PostgreSQL", 1], ["Docker", 1], ["GitHub Actions CI", 17], ["Make", 17]] },
] as const;
