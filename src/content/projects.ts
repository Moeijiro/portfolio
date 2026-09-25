// Everything on the site about a project comes from its repository: the README,
// the code, the screenshots in docs/screenshots and the collected test count.
// These are personal portfolio projects, not client work.

export type Category = "web" | "automation" | "discord" | "apis" | "ai" | "security";

export const CATEGORIES: { id: Category; label: string; short: string }[] = [
  { id: "web", label: "Full-Stack Apps", short: "Full-Stack" },
  { id: "automation", label: "Automation", short: "Automation" },
  { id: "discord", label: "Discord Systems", short: "Discord" },
  { id: "apis", label: "APIs & Integrations", short: "APIs" },
  { id: "ai", label: "AI", short: "AI" },
  { id: "security", label: "Security & Monitoring", short: "Security" },
];

export type NodeKind = "input" | "core" | "store" | "external";
export type DiagramNode = { id: string; title: string; sub?: string; kind?: NodeKind };
export type Diagram = { columns: DiagramNode[][]; edges: [string, string][] };

export type Shot = { src: string; alt: string; mobile?: boolean };
export type Point = { title: string; body: string };

export type Project = {
  slug: string;
  name: string;
  tier: "flagship" | "secondary";
  hue: number;
  kind: string;
  /** Card copy: what it is, in plain words (no backend jargon). */
  pitch: string;
  /** Card copy: the one thing that makes it interesting to build. */
  why: string;
  tagline: string;
  summary: string;
  categories: Category[];
  stack: string[];
  tests: number;
  cover: string;
  shots: Shot[];
  overview: string;
  problem?: string;
  solution?: string;
  features: Point[];
  decisions?: Point[];
  security?: Point[];
  testing?: string;
  diagram?: Diagram;
  demonstrates: string[];
  run: string[];
  demoNote: string;
  scope?: string;
};

const repo = (slug: string) => `https://github.com/Moeijiro/${slug}`;
export const repoUrl = repo;

export const projects: Project[] = [
  {
    slug: "studyraid",
    name: "StudyRaid",
    tier: "flagship",
    hue: 280,
    kind: "Gamified study platform · full-stack",
    pitch: "Gamified study platform: homework becomes quests with XP, levels, streaks, focus sessions and team challenges.",
    why: "Every reward is computed on the server from an append-only ledger, and party challenges update live over WebSockets.",
    tagline: "A study planner that plays like an RPG: quests, XP, streaks, focus sessions and party challenges with friends.",
    summary:
      "Homework, revision and goals become quests worth XP. Streaks follow each student's own time zone, focus sessions are timed by the server, and small parties chase weekly goals with live progress.",
    categories: ["web"],
    stack: ["Python", "FastAPI", "Next.js", "WebSockets", "SQLAlchemy 2", "PostgreSQL", "TypeScript", "Tailwind CSS", "Recharts", "Docker"],
    tests: 115,
    cover: "dashboard",
    shots: [
      { src: "dashboard", alt: "Dashboard: level 17 with XP progress, a 12-day streak, today's quests and weekly XP" },
      { src: "quests", alt: "Quest board with planned, in-progress and recently closed quests" },
      { src: "focus-session", alt: "Full-screen focus session counting down a 50-minute block" },
      { src: "analytics", alt: "Analytics: XP by day, best weekday, subjects, outcomes and an activity heatmap" },
      { src: "party", alt: "Party page with a live weekly challenge, member contributions and a leaderboard" },
      { src: "achievements", alt: "Achievements unlocked from real activity, with progress toward the rest" },
      { src: "mobile-dashboard", alt: "Dashboard on a phone", mobile: true },
    ],
    overview:
      "StudyRaid turns schoolwork into quests. Each quest has a subject, a difficulty and an estimate, and completing it pays XP and coins that level you up. A daily streak rewards consistency, a full-screen focus mode times deep work, 18 achievements unlock from what you actually do, and parties of up to eight friends take on shared weekly challenges. Analytics show XP and focus time by day, completion rate, best weekday and a 26-week heatmap.",
    problem:
      "Gamification only motivates if the numbers can be trusted. If the client can claim XP, if a double-click pays twice, if a streak breaks because a student in Kyiv finished at 00:30, or if a party counter drifts from what members did, the game stops meaning anything.",
    solution:
      "All rewards are computed on the server from an append-only ledger with a unique key per source, so every payout is idempotent. Streaks, party progress and analytics are recomputed from recorded activity in each user's own calendar. Live updates are published only after the transaction commits.",
    features: [
      { title: "Quests with real weight", body: "Difficulty and estimated effort set the base XP; early finishes, streaks and a daily soft cap adjust it on completion." },
      { title: "Level curve", body: "Each level costs 100 XP more than the last. The closed form inverts exactly, so level-from-XP is O(1)." },
      { title: "Streaks & freezes", body: "One meaningful activity a day, in the student's time zone. Coins buy a freeze the scheduler spends on a missed day." },
      { title: "Focus mode", body: "25, 50, 90 or custom minutes. The server decides when the time has passed; credit is capped at the plan." },
      { title: "Achievements", body: "18 badges such as Night Owl, Boss Slayer and No Days Off, each a threshold on stats aggregated from real activity." },
      { title: "Parties & challenges", body: "Invites by username or code, weekly goals, per-member contribution, and a live activity feed." },
      { title: "Scoped leaderboards", body: "Only among people you share a party with, never global, and anyone can opt out." },
      { title: "Notifications", body: "Due tomorrow, level-ups, challenge results and a streak warning, pushed live and deduplicated." },
    ],
    decisions: [
      { title: "The ledger is the source of truth", body: "Every XP and coin change is a row keyed by its source (quest:42, achievement:first_blood). Totals are a cache updated in the same transaction, and a test holds them equal to the ledger." },
      { title: "Progress is derived, not counted", body: "Challenge progress is recomputed from members' activity inside the window, counted from the moment each member joined. Settlement is a conditional update, so a race can't pay twice." },
      { title: "Publish after commit", body: "Services queue realtime events on the session; they reach WebSockets only once the transaction commits. Nobody sees XP that was rolled back." },
      { title: "The clock is a parameter", body: "Routes read the time once and pass it down. Tests are deterministic, and the demo replays 100 days of history through production code." },
    ],
    security: [
      { title: "Rotating refresh tokens", body: "Opaque, stored as SHA-256 digests in an HttpOnly cookie and rotated on each use. Replaying an old token revokes the whole login." },
      { title: "Server-side rewards", body: "Request bodies reject unknown fields, so a client can't send XP. Rewards come from facts the server owns." },
      { title: "404 for foreign data", body: "Ownership and membership are part of every lookup, so other users' quests and parties look like they don't exist." },
      { title: "WebSocket tickets", body: "Sockets authenticate with a single-use 30-second ticket and a checked Origin, never a long-lived token in the URL." },
      { title: "Passwords & limits", body: "argon2id, identical timing for unknown emails, and rate limits on login, registration and writes." },
      { title: "CSRF", body: "Cookie endpoints require a custom header that cross-site pages can't send without a CORS preflight." },
    ],
    testing:
      "115 pytest tests drive the real app over HTTP and WebSockets with a controllable clock: auth and token reuse, cross-user access, reward rules, level boundaries, time-zone streak days, achievements, focus timing, challenge settlement, idempotent scheduler runs and live event delivery. CI runs the suite on SQLite and PostgreSQL and checks that the Alembic migrations match the models exactly.",
    diagram: {
      columns: [
        [
          { id: "web", title: "Next.js app", sub: "React · Motion · Recharts", kind: "input" },
          { id: "sock", title: "WebSocket", sub: "single-use ticket", kind: "input" },
        ],
        [
          { id: "api", title: "FastAPI routes", sub: "auth · quests · parties", kind: "core" },
          { id: "sched", title: "Scheduler", sub: "reminders · expiry", kind: "core" },
        ],
        [
          { id: "svc", title: "Services", sub: "quests · focus · challenges", kind: "core" },
          { id: "eng", title: "Rule engines", sub: "levels · rewards · streaks", kind: "core" },
        ],
        [
          { id: "db", title: "XP ledger & data", sub: "SQLite · PostgreSQL", kind: "store" },
          { id: "hub", title: "Realtime hub", sub: "post-commit outbox", kind: "core" },
        ],
      ],
      edges: [["web", "api"], ["api", "svc"], ["sched", "svc"], ["svc", "eng"], ["svc", "db"], ["svc", "hub"], ["hub", "sock"]],
    },
    demonstrates: ["Full-stack product design", "Game-system design", "Realtime (WebSockets)", "Session security", "Time-zone-correct logic", "Data modelling", "PostgreSQL + SQLite"],
    run: ["make install", "make seed   # ~100 days of demo history", "make api    # FastAPI on :8000", "make web    # Next.js on :3000"],
    demoNote: "Seeds six fictional students with about 100 days of history, generated through the real services. Or run docker compose up to use PostgreSQL.",
  },
  {
    slug: "nexusguard",
    name: "NexusGuard",
    tier: "flagship",
    hue: 12,
    kind: "Discord bot · engine · dashboard",
    pitch: "Security and moderation bot for Discord servers that stops raids and spam, and explains every action it takes.",
    why: "Detection, rule and action engines run behind per-server safety caps, so a bad rule can't kick half the server.",
    tagline: "Rule-based security and moderation for Discord servers, with every decision explained.",
    summary:
      "A discord.py bot feeding detection, rule and action engines: floods, raids, mass mentions and privileged-role grants — reviewed in an OAuth2 dashboard.",
    categories: ["discord", "security"],
    stack: ["Python", "discord.py", "FastAPI", "SQLAlchemy", "Discord OAuth2", "Next.js", "TypeScript", "shadcn/ui"],
    tests: 69,
    cover: "02-overview",
    shots: [
      { src: "02-overview", alt: "NexusGuard overview: security events, raid status and recent actions for a server" },
      { src: "03-event-detail", alt: "Event detail showing what the detection, rule and action engines decided" },
      { src: "05-raid-mode", alt: "Raid mode switched on automatically by a join spike" },
      { src: "04-rules", alt: "Per-server protection rules with bounded thresholds and actions" },
      { src: "06-moderation", alt: "Moderation log with action statuses" },
      { src: "11-mobile-overview", alt: "Overview on a phone", mobile: true },
    ],
    overview:
      "NexusGuard watches member joins, messages, role changes and manual moderation in a Discord server. Each event goes through a detection engine, a rule engine and an action engine; the bot then acts in Discord and records the full decision for a live web dashboard. Slash commands are deliberately few — servers are configured and incidents reviewed in the dashboard.",
    problem:
      "Moderation bots tend to be either a pile of /ban commands or an opaque auto-mod that acts without saying why. A server team needs automatic reactions to floods and raids, an answer to “why did it do that?”, and a guarantee that one bad rule can't kick half the server.",
    solution:
      "Discord events are normalised into plain events and run through six detectors with sliding windows and cooldowns. The rule engine escalates repeat offenders and writes every adjustment down as a note. The action engine runs behind per-server safety caps, and each action is stored as done, skipped, suppressed or failed — with Discord's reason.",
    features: [
      { title: "Six detectors", body: "Message flood, duplicate messages, mass mentions, join-spike raids, account age and privileged-role grants — each threshold configurable within fixed bounds." },
      { title: "Automatic raid mode", body: "A join spike switches raid mode on for a configured time; a raid of 20 accounts produces one alert, not 20." },
      { title: "Explainable decisions", body: "Every event keeps the detection, the rule engine's notes and each action's result, so the dashboard can always show why." },
      { title: "Safety limits", body: "Per-server caps per minute on kicks, timeouts, role changes, warnings and alerts. Bans are not an action at all." },
      { title: "OAuth2 dashboard", body: "Discord sign-in with guild-permission checks, rules, moderation log, raid status and a permissions/intents health check." },
      { title: "Labelled demo data", body: "Simulated servers driven by a scenario simulator; simulated data is labelled everywhere and never mixes with real servers." },
    ],
    decisions: [
      { title: "The engine knows nothing about Discord", body: "It talks to the world through two protocols, ActionExecutor and Store. The live bot, the demo simulator and the tests run the same detection, rule and action code — only the edges differ." },
      { title: "Cooldowns turn a burst into one event", body: "When a detector fires, the member's window is cleared and a cooldown starts, so moderators get one incident per burst instead of a wall of alerts." },
      { title: "Severity from the shape of the burst", body: "Detectors fire the moment a threshold is reached, so severity is rule-based and documented per detector — no scores, no model." },
      { title: "Failure degrades to “log and tell a human”", body: "Anything past a safety cap is recorded as suppressed; a misconfigured rule can't escalate into mass kicks." },
    ],
    diagram: {
      columns: [
        [
          { id: "gw", title: "Discord gateway", sub: "joins · messages · roles", kind: "external" },
          { id: "sim", title: "Demo simulator", sub: "scenarios.py", kind: "input" },
        ],
        [{ id: "bot", title: "Bot adapter", sub: "discord.py → events", kind: "core" }],
        [
          { id: "det", title: "Detection engine", sub: "6 detectors · windows", kind: "core" },
          { id: "rule", title: "Rule engine", sub: "escalation · notes", kind: "core" },
        ],
        [
          { id: "safe", title: "Safety limits", sub: "caps per minute", kind: "core" },
          { id: "act", title: "Action engine", sub: "one module per action", kind: "core" },
        ],
        [
          { id: "rest", title: "Discord REST", sub: "429-aware executor", kind: "external" },
          { id: "db", title: "Database", sub: "events · mod log", kind: "store" },
          { id: "dash", title: "Dashboard", sub: "FastAPI · Next.js", kind: "input" },
        ],
      ],
      edges: [["gw", "bot"], ["bot", "det"], ["sim", "det"], ["det", "rule"], ["rule", "safe"], ["safe", "act"], ["act", "rest"], ["act", "db"], ["db", "dash"]],
    },
    demonstrates: ["Discord bot architecture", "Event-driven pipelines", "Ports-and-adapters design", "Safety engineering", "OAuth2 dashboards"],
    run: ["make install", "make seed", "make api   # FastAPI on :8000", "make web   # dashboard on :3000"],
    demoNote: "Runs locally with simulated servers and a live event simulator; no Discord token needed for the demo.",
  },
  {
    slug: "discord-automation-platform",
    name: "Discord Automation Platform",
    tier: "flagship",
    hue: 262,
    kind: "OAuth2 dashboard · gateway bot",
    pitch: "Dashboard and bot that automate a Discord server: verification, welcome messages, roles and an audit log.",
    why: "Sign in with Discord; every change re-checks permissions with Discord before it runs.",
    tagline: "Discord OAuth2 dashboard and automation bot with permission checks that ask Discord, not a cache.",
    summary:
      "Sign in with Discord, configure verification, welcome messages and role automation, and read an audit trail of every action — including the ones Discord would have refused.",
    categories: ["discord", "automation"],
    stack: ["Python", "FastAPI", "discord.py", "Discord OAuth2", "SQLAlchemy", "PyJWT", "cryptography", "React", "TypeScript", "Vite"],
    tests: 49,
    cover: "dashboard",
    shots: [
      { src: "dashboard", alt: "Server dashboard with bot status and permission state per server" },
      { src: "server", alt: "Per-server automation settings: verification, welcome message and roles" },
      { src: "logs", alt: "Filterable audit log of automation events" },
      { src: "login", alt: "Sign in with Discord" },
    ],
    overview:
      "A production-shaped platform for Discord server automation: sign in with Discord, configure verification, welcome messages and role automation for a server you administrate, and read back an audit trail of everything the automation did. The interesting part is the boundaries — OAuth2 tokens that never reach the browser, a permission gate that re-checks Discord, and automations that refuse to run when Discord would reject them anyway.",
    problem:
      "Server dashboards often trust a stale permission cache, hand OAuth tokens to the browser, and let role changes fail silently when the bot sits below the target role.",
    solution:
      "The OAuth2 code flow runs server-side with tokens encrypted at rest. Every write checks both sides — the caller's Manage Server permission and the bot's own permissions and role position — before calling Discord. The API and the gateway bot share one automation service, so a join event and a dashboard click behave identically.",
    features: [
      { title: "Discord login", body: "OAuth2 authorisation-code flow (identify, guilds); access and refresh tokens are Fernet-encrypted and never serialised into a response." },
      { title: "Verification & roles", body: "Verified-role flow, role add/remove with the hierarchy and integration-managed roles respected, and an optional join autorole." },
      { title: "Welcome automation", body: "Channel and message template with {user}, {server} and {member_count} placeholders, posted by the bot on join." },
      { title: "Audit trail", body: "Every event — including automation_failed — stored with actor, target, guild and metadata, on a filterable, paged page." },
      { title: "Signed webhooks", body: "POST /api/webhooks/custom accepts HMAC-SHA256-signed events, validated strictly and optionally announced in a channel." },
      { title: "Demo mode", body: "A mock Discord client implementing the same interface; the demo never invents activity, and production refuses to boot with it on." },
    ],
    decisions: [
      { title: "Separate keys from one secret", body: "Session signing and token encryption keys are derived from SESSION_SECRET through HKDF with different labels." },
      { title: "CSRF on the OAuth round trip", body: "A random state per attempt, stored in a short-lived HttpOnly cookie scoped to /api/auth and compared in constant time." },
      { title: "Permissions are re-checked, not remembered", body: "Guild membership and permission bitfields are re-read from Discord on login; ADMINISTRATOR implies everything, exactly as Discord treats it." },
      { title: "Two processes, one service", body: "uvicorn serves the API and python -m app.bot holds the gateway; both import the same automation service." },
    ],
    diagram: {
      columns: [
        [
          { id: "browser", title: "Dashboard", sub: "React · session cookie", kind: "input" },
          { id: "gw", title: "Discord gateway", sub: "member_join", kind: "external" },
        ],
        [
          { id: "api", title: "FastAPI", sub: "OAuth2 · permission chain", kind: "core" },
          { id: "bot", title: "Gateway bot", sub: "discord.py", kind: "core" },
        ],
        [{ id: "svc", title: "Automation service", sub: "shared by API + bot", kind: "core" }],
        [
          { id: "oauth", title: "Discord OAuth2", sub: "code exchange", kind: "external" },
          { id: "rest", title: "Discord REST", sub: "roles · messages", kind: "external" },
          { id: "db", title: "Database", sub: "settings · audit log", kind: "store" },
        ],
      ],
      edges: [["browser", "api"], ["gw", "bot"], ["api", "oauth"], ["api", "svc"], ["bot", "svc"], ["svc", "rest"], ["svc", "db"]],
    },
    demonstrates: ["Discord OAuth2", "Discord REST & gateway", "Permission modelling", "Token security", "Audit logging"],
    run: ["make install", "make api   # FastAPI on :8000", "make web   # dashboard", "make bot   # optional, needs a bot token"],
    demoNote: "DEMO_MODE=true (the default) swaps in a mock Discord client with three servers and a demo sign-in.",
  },
  {
    slug: "databridge",
    name: "DataBridge",
    tier: "flagship",
    hue: 250,
    kind: "Integration & sync platform",
    pitch: "Connects an API or webhook to another API, maps the fields between them, and shows exactly which records failed.",
    why: "Retries only failures a retry can fix, with live run progress and credentials that never leave the server.",
    tagline: "Connect an API or webhook to another API — with field mapping, retries and a record of exactly what failed.",
    summary:
      "REST and webhook connectors, declarative field mapping with named transforms, schedules, retries and live run progress, plus the exact records that failed — masked.",
    categories: ["apis", "automation"],
    stack: ["Python", "FastAPI", "httpx", "asyncio", "SQLAlchemy", "cryptography", "Next.js", "TypeScript", "Motion"],
    tests: 39,
    cover: "integration-running",
    shots: [
      { src: "integration-running", alt: "A sync run in progress: fetch, map, transform and send stages" },
      { src: "run-detail", alt: "Run detail with delivered records and a failed record with its reason" },
      { src: "new-integration", alt: "New integration: tested source, field chips and a live mapping preview" },
      { src: "dashboard", alt: "Dashboard with run totals and a 7-day chart" },
      { src: "credentials", alt: "Credentials shown only as a masked hint" },
      { src: "mobile-dashboard", alt: "Dashboard on a phone", mobile: true },
    ],
    overview:
      "DataBridge moves records from a source — a REST API or an incoming webhook — to a destination API. You map fields declaratively, apply a small named set of transforms (no scripting language), run on a schedule or on demand, and every run keeps a log of what was delivered and which records failed, and why.",
    problem:
      "Small teams glue their tools together with scripts that have no retries and no memory: when a sync breaks, nobody knows which records were lost or why.",
    solution:
      "Integrations are data, not scripts: a source, a field mapping with transforms, a destination and a schedule. A staged runner fetches, maps, transforms and sends, retries only failures that a retry can fix, and stores failed records (with personal data masked) next to the reason they failed.",
    features: [
      { title: "Test before you save", body: "Source and destination are tested live from the editor — HTTP status and a sample record — before an integration exists." },
      { title: "Field mapping", body: "Click fields from the sample to map them, add transforms (trim, to_number, prefix…) and see a live preview of the outgoing record." },
      { title: "Schedules & manual runs", body: "Runs on a schedule or on demand, with staged progress the dashboard animates as it happens." },
      { title: "Retries that make sense", body: "Exponential backoff for timeouts, 429 and 5xx only; a 4xx is a real answer and is never retried." },
      { title: "Inspectable failures", body: "Each run lists the records that failed and why (e.g. “Missing required field: email”), with personal data masked." },
      { title: "Credentials", body: "Encrypted at rest and only ever shown as a •••• hint; outgoing webhooks are HMAC-signed." },
    ],
    decisions: [
      { title: "One SSRF-safe HTTP client", body: "Resolved addresses are checked against private ranges, redirects aren't followed, and response bodies are streamed with a size cap." },
      { title: "Runs are persisted in stages", body: "The runner writes each stage as it goes, so the UI simply polls one run row to animate progress — no websockets needed." },
      { title: "Demo APIs in the same process", body: "Seed data and 39 tests drive real demo source/destination APIs in-process through httpx's ASGI transport." },
    ],
    diagram: {
      columns: [
        [
          { id: "src", title: "Source API", sub: "REST · paginated", kind: "external" },
          { id: "hook", title: "Incoming webhook", sub: "POST /hooks/{token}", kind: "input" },
          { id: "cron", title: "Scheduler", sub: "interval · manual", kind: "input" },
        ],
        [{ id: "run", title: "Run engine", sub: "staged · persisted", kind: "core" }],
        [
          { id: "map", title: "Field mapping", sub: "declarative", kind: "core" },
          { id: "tx", title: "Transforms", sub: "named · no scripting", kind: "core" },
        ],
        [
          { id: "dst", title: "Destination", sub: "REST · signed webhook", kind: "external" },
          { id: "log", title: "Run log", sub: "failed records, masked", kind: "store" },
        ],
      ],
      edges: [["src", "run"], ["hook", "run"], ["cron", "run"], ["run", "map"], ["map", "tx"], ["tx", "dst"], ["tx", "log"]],
    },
    demonstrates: ["API integrations", "Async HTTP (httpx)", "Retry & backoff strategy", "SSRF protection", "Data mapping"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded demo account: demo@databridge.dev / databridge-demo-1234. The demo source and destination APIs run inside the backend.",
  },
  {
    slug: "nexaflow",
    name: "NexaFlow",
    tier: "flagship",
    hue: 292,
    kind: "Automation platform · marketing site",
    pitch: "Automation platform: a webhook starts a workflow that reshapes the data and notifies Discord, Telegram or any URL.",
    why: "A visual builder, templated steps and a readable log of every run, plus the product's marketing site.",
    tagline: "Webhook-triggered workflows with JSON transforms and Discord, Telegram or HTTP actions — and a run log you can read.",
    summary:
      "A trigger, an optional transform and an action; runs in the background with retries, and records the payload at every stage. Full marketing site and developer dashboard.",
    categories: ["automation", "apis", "web"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "httpx", "cryptography", "Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    tests: 30,
    cover: "execution",
    shots: [
      { src: "execution", alt: "Execution detail with trigger payload, transformed payload and action result" },
      { src: "builder", alt: "Five-step workflow builder with a live pipeline summary" },
      { src: "landing", alt: "Marketing site hero with an interactive pipeline diagram" },
      { src: "dashboard", alt: "Developer dashboard with executions and success rate" },
      { src: "workflow", alt: "Workflow detail with its webhook URL and recent runs" },
      { src: "docs", alt: "API walkthrough in the dashboard" },
    ],
    overview:
      "NexaFlow is a full-stack automation platform: a marketing site, a developer dashboard and a Python backend that genuinely runs workflows. A workflow is one trigger, an optional JSON transform and one action. Three integrations exist and work; the rest of the effort went into credential handling, retries, an SSRF guard, ownership boundaries and an execution log.",
    problem:
      "Glue between services — “when the shop sends an order, post it to Discord” — tends to be a script nobody can inspect. When it fails, there's no record of the payload, the attempt or the answer.",
    solution:
      "An incoming webhook creates an execution row immediately and returns 202; the engine runs in the background, applies the transform, calls the destination with up to three attempts, and stores the trigger payload, transformed payload, attempts, duration and result.",
    features: [
      { title: "Webhook triggers", body: "POST /hooks/{token} with a size limit, JSON parsing, token lookup and optional HMAC verification." },
      { title: "JSON transforms", body: "Reshape payloads with {{dotted.paths}}; templates substitute values and never evaluate anything." },
      { title: "Three real actions", body: "Discord webhook, Telegram Bot API and any-method HTTP calls, behind one adapter interface." },
      { title: "Background execution", body: "Up to three attempts with exponential backoff, only for failures a retry can fix (timeouts, 429, 5xx)." },
      { title: "Execution history", body: "Payload at every stage, attempts, duration and error per run, filterable by workflow and status." },
      { title: "API keys", body: "nxf_live_… keys stored as SHA-256 digests, shown once and revocable, for scripts and CI." },
    ],
    decisions: [
      { title: "A template language that can't run code", body: "Payloads are untrusted input, so the transform engine only resolves paths; missing paths are reported in the log instead of rendering “None”." },
      { title: "The execution row exists before the first attempt", body: "The caller is never held open while a third party is contacted, and nothing is lost if the process dies mid-run." },
      { title: "Two credentials, two jobs", body: "A workflow token can trigger its own workflow and nothing else; an API key can manage the account but is never used by the browser." },
    ],
    diagram: {
      columns: [
        [
          { id: "ext", title: "External service", sub: "shop · form · CI", kind: "external" },
          { id: "dash", title: "Dashboard", sub: "cookie · API key", kind: "input" },
        ],
        [
          { id: "hook", title: "POST /hooks/{token}", sub: "size · HMAC · 202", kind: "core" },
          { id: "mgmt", title: "Management API", sub: "/api/*", kind: "core" },
        ],
        [
          { id: "eng", title: "Workflow engine", sub: "background · 3 attempts", kind: "core" },
          { id: "tx", title: "Transform", sub: "{{dotted.paths}}", kind: "core" },
        ],
        [
          { id: "discord", title: "Discord", sub: "webhook", kind: "external" },
          { id: "tg", title: "Telegram", sub: "Bot API", kind: "external" },
          { id: "http", title: "HTTP API", sub: "any method", kind: "external" },
          { id: "db", title: "Executions", sub: "payload per stage", kind: "store" },
        ],
      ],
      edges: [["ext", "hook"], ["dash", "mgmt"], ["hook", "eng"], ["mgmt", "eng"], ["eng", "tx"], ["tx", "discord"], ["tx", "tg"], ["tx", "http"], ["tx", "db"]],
    },
    demonstrates: ["Workflow automation", "Webhooks & HMAC", "Background jobs & retries", "Discord & Telegram APIs", "Full-stack product"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded demo account: demo@nexaflow.dev / nexaflow-demo-1234.",
  },
  {
    slug: "scoutflow",
    name: "ScoutFlow",
    tier: "flagship",
    hue: 182,
    kind: "Web change monitoring",
    pitch: "Watches public web pages for price, stock and content changes, and alerts you on Discord or Telegram.",
    why: "Every fetch is SSRF-guarded, and a failed check is recorded as a failure, never as a change.",
    tagline: "Watch prices, stock, text, whole pages and JSON fields on public sites — and see exactly what changed.",
    summary:
      "Scheduled checks with word diffs, price deltas and stock transitions, alerts to Discord, Telegram or signed webhooks, and failures that never masquerade as changes.",
    categories: ["automation", "security"],
    stack: ["Python", "FastAPI", "httpx", "asyncio", "BeautifulSoup", "SQLAlchemy", "Next.js", "TypeScript", "shadcn/ui"],
    tests: 46,
    cover: "check-now",
    shots: [
      { src: "check-now", alt: "Check now in progress: opening page, extracting, comparing, change detected" },
      { src: "monitor-price", alt: "Price monitor with previous and current value and a price chart" },
      { src: "changes", alt: "Change feed with a word diff of a headline and a stock transition" },
      { src: "monitor-failing", alt: "A failing monitor that keeps its last good value" },
      { src: "new-monitor", alt: "New monitor with a live selector test" },
      { src: "mobile-monitor", alt: "Monitor on a phone", mobile: true },
    ],
    overview:
      "ScoutFlow checks public pages and APIs on a schedule with five monitor types — text, price, availability, whole-page content and a JSON field — and shows exactly what changed. It alerts Discord, Telegram or a signed webhook, and treats a failed check as a failure with a precise reason, never as a change.",
    problem:
      "People refresh pages to catch price drops, restocks and policy edits, and naive monitors cry wolf whenever a page times out or a layout changes.",
    solution:
      "A staged check runner (fetching → extracting → comparing) records one of four outcomes: baseline, no change, changed or failed. A failure carries a type — timeout, network, HTTP error, blocked, selector missing, robots.txt, too large — and the last good value is kept, so recovery compares against real data.",
    features: [
      { title: "Five monitor types", body: "Text, price (locale-aware parsing), availability, page content with ignorable selectors, and a JSON field by path." },
      { title: "Readable changes", body: "Word diffs that collapse unchanged runs, price deltas with percentages, and in-stock/out-of-stock transitions." },
      { title: "Live “Check now”", body: "The UI follows each stage of a manual check as it happens, with a cooldown and one check per monitor at a time." },
      { title: "Alerts", body: "Discord (mentions disabled, markdown escaped), Telegram (HTML-escaped) and HMAC-signed webhooks; one alert at the failure threshold." },
      { title: "Selector tester", body: "Try a selector against the live page before saving and see exactly what would be recorded." },
      { title: "Responsible by design", body: "robots.txt respected, per-host request spacing, an honest user agent and a page-size cap. No CAPTCHA or anti-bot evasion." },
    ],
    decisions: [
      { title: "A failure is never a change", body: "Failures are a separate outcome and never overwrite the stored value, so a timeout can't trigger a false “price changed”." },
      { title: "SSRF checks at every hop", body: "URLs are validated when saved, before each request and at every redirect, against resolved addresses including IPv4-mapped IPv6." },
      { title: "Output escaping per channel", body: "Page content goes into alerts, so Discord mentions are disabled and Telegram HTML is escaped — no @everyone from a scraped headline." },
      { title: "A seed that really runs", body: "The demo week is produced by real checks against built-in demo pages, then back-dated — the history on screen is genuine output." },
    ],
    diagram: {
      columns: [
        [
          { id: "sched", title: "Scheduler", sub: "per-monitor interval", kind: "input" },
          { id: "now", title: "Check now", sub: "cooldown · one at a time", kind: "input" },
        ],
        [{ id: "fetch", title: "Safe fetcher", sub: "SSRF · robots.txt", kind: "core" }],
        [{ id: "extract", title: "Extractors", sub: "text · price · stock · JSON", kind: "core" }],
        [{ id: "cmp", title: "Comparison", sub: "diff · delta · outcome", kind: "core" }],
        [
          { id: "alert", title: "Alerts", sub: "Discord · Telegram · webhook", kind: "external" },
          { id: "db", title: "Database", sub: "checks · changes", kind: "store" },
        ],
      ],
      edges: [["sched", "fetch"], ["now", "fetch"], ["fetch", "extract"], ["extract", "cmp"], ["cmp", "alert"], ["cmp", "db"]],
    },
    demonstrates: ["Scraping done responsibly", "Async scheduling", "Change detection & diffs", "SSRF protection", "Alert integrations"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded demo account: demo@scoutflow.dev / scoutflow-demo-1234. Monitors watch built-in demo pages you can change from the Demo lab.",
  },
  {
    slug: "resolveai",
    name: "ResolveAI",
    tier: "flagship",
    hue: 152,
    kind: "AI answers from your docs",
    pitch: "AI support assistant that answers customer questions from your own help articles, with an embeddable chat widget.",
    why: "Answers cite the articles they come from; questions it can't answer are collected instead of guessed.",
    tagline: "Customer-support answers grounded in your own articles, with verified citations and an honest “I don't know”.",
    summary:
      "BM25 retrieval over your help articles, grounded answers with checked citations, an unresolved-questions list, an embeddable widget and a /v1/ask API. Runs free in mock mode.",
    categories: ["ai", "web", "apis"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "httpx", "OpenAI-compatible API", "Next.js", "TypeScript", "Vanilla JS widget"],
    tests: 41,
    cover: "05-knowledge-base-chat",
    shots: [
      { src: "05-knowledge-base-chat", alt: "Knowledge base with the test chat and cited sources" },
      { src: "09-widget-on-demo-site", alt: "The embeddable widget answering on a demo customer site" },
      { src: "06-unresolved-questions", alt: "Unresolved questions to turn into articles" },
      { src: "04-overview", alt: "Overview with answer rate and most-cited articles" },
      { src: "08-api-keys", alt: "API keys, shown once" },
      { src: "11-mobile-overview", alt: "Overview on a phone", mobile: true },
    ],
    overview:
      "ResolveAI answers customer questions from your help articles through an embeddable chat widget and a developer API. Each answer lists the articles it came from; when the articles don't cover a question, it says so and logs the question as unresolved. It runs without an AI key: the default mock provider builds answers from article sentences, and AI_PROVIDER=openai switches to any OpenAI-compatible endpoint.",
    problem:
      "A support chatbot that answers everything confidently is worse than none: it invents policies, and nobody learns which questions the docs fail to cover.",
    solution:
      "Retrieval decides first. If the retrieved passages don't cover the question well enough, the model is never called — the visitor gets a plain “I couldn't find that” and the question goes to the dashboard. When it does answer, a citation only counts if that article was actually retrieved.",
    features: [
      { title: "Knowledge bases", body: "Markdown articles or .md/.txt uploads; the index reflects every edit on the next question, with no re-indexing job." },
      { title: "Grounded answers", body: "Only retrieved passages reach the provider, and citations are cross-checked against what was retrieved." },
      { title: "Unresolved questions", body: "Low-coverage questions skip the model and become a to-write list on the dashboard." },
      { title: "Embeddable widget", body: "One script tag, about 11 KB, rendered in a Shadow DOM, with a server-enforced domain allowlist and rate limits." },
      { title: "Developer API", body: "POST /v1/ask with X-API-Key; keys SHA-256 hashed at rest, shown once, revocable." },
      { title: "Pluggable AI", body: "A small provider protocol: extractive mock provider, or OpenAI-compatible Chat Completions with structured output." },
    ],
    decisions: [
      { title: "Retrieval gates the model", body: "Heading-aware chunking and BM25 with title/heading terms weighted ×2; below a score and coverage threshold, the model isn't called at all." },
      { title: "Citations are verified, not trusted", body: "The provider returns article ids; only those that were retrieved for this question are shown as sources." },
      { title: "Three surfaces, one pipeline", body: "The widget, the API and the dashboard's test chat call the same answering service." },
    ],
    diagram: {
      columns: [
        [
          { id: "dash", title: "Dashboard", sub: "session cookie", kind: "input" },
          { id: "widget", title: "Widget", sub: "origin allowlist", kind: "input" },
          { id: "api", title: "/v1/ask", sub: "X-API-Key", kind: "input" },
        ],
        [{ id: "svc", title: "Answering service", sub: "one pipeline", kind: "core" }],
        [
          { id: "bm25", title: "BM25 retrieval", sub: "chunks · headings ×2", kind: "core" },
          { id: "gate", title: "Coverage gate", sub: "score · coverage", kind: "core" },
        ],
        [
          { id: "llm", title: "AI provider", sub: "mock | OpenAI-compatible", kind: "external" },
          { id: "unres", title: "Unresolved list", sub: "model never called", kind: "store" },
        ],
        [{ id: "cite", title: "Cited answer", sub: "verified sources", kind: "core" }],
      ],
      edges: [["dash", "svc"], ["widget", "svc"], ["api", "svc"], ["svc", "bm25"], ["bm25", "gate"], ["gate", "llm"], ["gate", "unres"], ["llm", "cite"]],
    },
    demonstrates: ["AI integration (RAG)", "Search & ranking", "Public API design", "Embeddable widgets", "Full-stack SaaS"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Runs with the free mock provider by default; the demo knowledge base describes a fictional product.",
  },
  {
    slug: "api-management-platform",
    name: "API Management Platform",
    tier: "flagship",
    hue: 215,
    kind: "API keys · rate limits · logs",
    pitch: "Developer console for an API product: API keys, per-key rate limits and a searchable log of every request.",
    why: "Keys are stored as hashes and shown once; logging is batched off the request path.",
    tagline: "Developer console for an API product: hashed API keys, per-key rate limits and request logs off the hot path.",
    summary:
      "Issue API keys, call a protected API with them, and see every request — status, latency and why it was refused. Sliding-window limits with standard quota headers.",
    categories: ["apis", "security"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "asyncio", "PyJWT", "React", "TypeScript", "Vite", "Tailwind CSS"],
    tests: 38,
    cover: "dashboard",
    shots: [
      { src: "dashboard", alt: "Usage analytics: requests, success rate, latency and an hourly chart" },
      { src: "logs", alt: "Request log with status, latency and refusal reason" },
      { src: "keys", alt: "API keys with prefixes and per-key limits" },
      { src: "docs", alt: "API documentation in the console" },
    ],
    overview:
      "Register, issue API keys, call a protected API with them, and see every request that was made — with its status, latency and the reason it was refused. It isn't an API gateway; it's the part of one that has to be right: key handling, quota enforcement and an audit trail you can query.",
    problem:
      "API products need keys that can't be leaked from the database, limits one customer can't use up for another, and logs that don't slow down the API they measure.",
    solution:
      "Keys are 256-bit random values stored only as SHA-256 digests. A middleware authenticates, applies a per-key sliding window and attaches X-RateLimit headers; request logs go onto an in-memory queue and are written in batches by a background task.",
    features: [
      { title: "API keys", body: "dev_live_… keys shown once, stored as a digest with a display prefix; revoke keeps history, delete keeps logs." },
      { title: "Per-key rate limits", body: "Sliding 60-second window, X-RateLimit-Limit/Remaining/Reset on every response and Retry-After on 429." },
      { title: "Request logs", body: "Key, method, path, status, latency, client IP and refusal code — never request bodies." },
      { title: "Usage analytics", body: "Requests today/this month, success rate, average latency and a 24-hour chart, computed from the log table." },
      { title: "Two auth schemes", body: "X-API-Key for machines on /v1, an HttpOnly session for humans on /api — a leaked key can't mint keys or read logs." },
      { title: "One error envelope", body: "Every failure, including validation errors, leaves as {\"error\": {\"code\", \"message\"}}." },
    ],
    decisions: [
      { title: "Sliding window, per key", body: "One customer's burst can't spend another's budget, and a caller can't double the quota by straddling a minute boundary." },
      { title: "Logging off the request path", body: "A non-blocking queue, one batched INSERT per flush, and dropped-and-counted logs if the queue fills — never a slower API." },
      { title: "Digest lookup", body: "The raw key is never stored, logged or compared as a string; the digest makes the lookup one indexed query." },
    ],
    diagram: {
      columns: [
        [
          { id: "client", title: "Client", sub: "X-API-Key", kind: "external" },
          { id: "console", title: "Developer console", sub: "session cookie", kind: "input" },
        ],
        [
          { id: "mw", title: "Key middleware", sub: "SHA-256 lookup", kind: "core" },
          { id: "mgmt", title: "Management API", sub: "/api/*", kind: "core" },
        ],
        [{ id: "rl", title: "Rate limiter", sub: "sliding 60 s window", kind: "core" }],
        [
          { id: "ep", title: "/v1 endpoint", sub: "+ X-RateLimit-*", kind: "core" },
          { id: "q", title: "Log queue", sub: "non-blocking", kind: "core" },
        ],
        [{ id: "db", title: "Database", sub: "keys · batched logs", kind: "store" }],
      ],
      edges: [["client", "mw"], ["console", "mgmt"], ["mw", "rl"], ["rl", "ep"], ["rl", "q"], ["q", "db"], ["mgmt", "db"]],
    },
    demonstrates: ["API design", "Rate limiting", "Key management", "Async background tasks", "Observability"],
    run: ["make install", "make api", "make web", "make traffic   # generate sample requests"],
    demoNote: "Register a local account, create a key and use make traffic to generate real requests against the demo API.",
  },
  {
    slug: "forgedesk",
    name: "ForgeDesk",
    tier: "flagship",
    hue: 45,
    kind: "Client portal · full-stack",
    pitch: "Client portal for freelancers and studios: projects, tasks, versioned deliverables and client approvals.",
    why: "Two roles in one app: clients see only the projects they're invited to.",
    tagline: "A client portal for freelancers and studios: projects, versioned deliverables with approval, files and updates.",
    summary:
      "Studio dashboard and a separate client portal with strict data boundaries: approvals, change requests, secure file sharing, single-use invitations and an activity log.",
    categories: ["web"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "shadcn/ui", "Motion"],
    tests: 43,
    cover: "09-client-portal",
    shots: [
      { src: "09-client-portal", alt: "Client portal: what needs a decision, projects and latest updates" },
      { src: "06-project-deliverables", alt: "Deliverables with version history and review status" },
      { src: "03-studio-dashboard", alt: "Studio dashboard with projects, reviews and deadlines" },
      { src: "05-project-tasks", alt: "Task board" },
      { src: "07-client-invite", alt: "Single-use client invitation" },
      { src: "12-mobile-portal", alt: "Client portal on a phone", mobile: true },
    ],
    overview:
      "ForgeDesk gives each client one calm place to follow a project — progress, deliverables to approve, shared files and short updates — while the studio runs tasks, reviews and deadlines for every client from one dashboard. It deliberately covers one use case, studio ↔ client collaboration: no workflow engine, custom fields or Gantt chart.",
    problem:
      "Freelancers juggle email threads, file links and “which version did you approve?”. A portal only helps if clients can't see each other's data and approvals are recorded against a specific version.",
    solution:
      "Two roles with one access layer: every project query goes through accessible_projects(), so a client user only ever sees their own client's projects. Deliverables are versioned; a new version returns to review, and approvals or change requests are tied to it.",
    features: [
      { title: "Studio dashboard", body: "Active projects, pending reviews, overdue tasks, deadlines in the next three weeks and recent activity from live queries." },
      { title: "Versioned deliverables", body: "Uploads with version history; a new version goes back to the client, older versions stay downloadable." },
      { title: "Client approvals", body: "Approve or request changes with a written note the studio sees." },
      { title: "Single-use invitations", body: "Client users exist only through invitations stored as SHA-256 digests; access can be removed anytime." },
      { title: "Files & updates", body: "Shared files both ways through a four-method storage protocol, and progress notes on the client's timeline." },
      { title: "Every state designed", body: "Light and dark themes, mobile layouts, and loading, empty and error states on every page." },
    ],
    decisions: [
      { title: "One access layer", body: "Authorization is a query, not an afterthought: resources outside the user's scope return 404, never a 403 that confirms they exist." },
      { title: "Storage behind a protocol", body: "Local disk today; the four-method Storage protocol is the seam for S3-compatible storage." },
      { title: "Strict inputs", body: "Pydantic models reject unknown fields and trim strings; timestamps are UTC and always returned with an offset." },
    ],
    diagram: {
      columns: [
        [
          { id: "studio", title: "Studio app", sub: "/app", kind: "input" },
          { id: "portal", title: "Client portal", sub: "/portal", kind: "input" },
        ],
        [{ id: "web", title: "Next.js", sub: "App Router · React 19", kind: "core" }],
        [
          { id: "auth", title: "Auth", sub: "JWT HttpOnly cookie", kind: "core" },
          { id: "acl", title: "Access layer", sub: "accessible_projects()", kind: "core" },
        ],
        [{ id: "routes", title: "Routes & services", sub: "activity log · uploads", kind: "core" }],
        [
          { id: "db", title: "Database", sub: "SQLAlchemy 2", kind: "store" },
          { id: "fs", title: "File storage", sub: "Storage protocol", kind: "store" },
        ],
      ],
      edges: [["studio", "web"], ["portal", "web"], ["web", "auth"], ["auth", "acl"], ["acl", "routes"], ["routes", "db"], ["routes", "fs"]],
    },
    demonstrates: ["Full-stack product", "Role-based access", "File handling", "Product UX", "Next.js 16 + FastAPI"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "The seed creates a studio owner and client users for three fictional companies — logins are listed in the README.",
  },

  // Secondary projects
  {
    slug: "pulsewatch",
    name: "PulseWatch",
    tier: "secondary",
    hue: 145,
    kind: "Uptime monitoring",
    pitch: "Uptime monitoring for websites and APIs, with incidents, alerts and public status pages.",
    why: "Scheduled checks open and resolve incidents on their own, with alerts only on state changes.",
    tagline: "HTTP uptime monitoring with incidents, alerts and public status pages.",
    summary: "An async scheduler that never double-checks, threshold-based incidents, Discord/Telegram/webhook alerts and public status pages.",
    categories: ["security", "automation"],
    stack: ["Python", "FastAPI", "asyncio", "httpx", "SQLAlchemy", "Next.js", "TypeScript"],
    tests: 33,
    cover: "dashboard",
    shots: [
      { src: "dashboard", alt: "Monitors with uptime and response times" },
      { src: "monitor", alt: "Monitor detail with check history" },
      { src: "status-page", alt: "Public status page" },
      { src: "incidents", alt: "Incident timeline" },
    ],
    overview:
      "PulseWatch checks websites and APIs on a schedule, records every result, opens an incident when failures cross a threshold, alerts on Discord, Telegram or a webhook, and publishes a public status page. The effort went into a scheduler that never checks twice, incidents that don't page over one dropped packet, uptime that is never rounded up, and an SSRF guard.",
    features: [
      { title: "Scheduler", body: "One asyncio task with atomic claiming and bounded concurrency, so a monitor is never checked twice at once." },
      { title: "Incidents", body: "Opened and resolved by consecutive-failure thresholds, not single blips." },
      { title: "Alerts", body: "Discord, Telegram and webhook alerts when an incident opens; recovery closes it with the downtime recorded." },
      { title: "Status pages", body: "Public, auto-refreshing status pages with uptime that is never rounded up." },
    ],
    demonstrates: ["Monitoring", "Async scheduling", "Incident logic", "Alerting"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded demo account: demo@pulsewatch.dev / pulsewatch-demo-1234.",
  },
  {
    slug: "supportdesk",
    name: "SupportDesk",
    tier: "secondary",
    hue: 292,
    kind: "Discord helpdesk",
    pitch: "Helpdesk that lives in Discord: members open tickets in the server, staff answer them from a web queue.",
    why: "Transcripts and response times are measured, so support quality can be tracked.",
    tagline: "Customer support that lives in a Discord server: a real ticket queue with transcripts and measured SLAs.",
    summary: "Tickets opened from a Discord panel into private threads; agents claim, prioritise and close from Discord or the dashboard.",
    categories: ["discord", "web"],
    stack: ["Python", "discord.py", "FastAPI", "SQLAlchemy (async)", "Next.js", "TypeScript"],
    tests: 8,
    cover: "queue",
    shots: [
      { src: "queue", alt: "Ticket queue with categories and priorities" },
      { src: "ticket", alt: "Ticket with conversation and private staff notes" },
      { src: "analytics", alt: "Response-time analytics" },
      { src: "transcript", alt: "HTML transcript of a closed ticket" },
    ],
    overview:
      "SupportDesk turns a support channel into a ticket queue. Customers open tickets from a panel in Discord and get a private thread; agents claim, reply, prioritise and close from Discord or the dashboard. Every closed ticket leaves an HTML and plain-text transcript, and response times are measured from the tickets' own timestamps.",
    features: [
      { title: "Ticket panel", body: "Customers open tickets in Discord and get a private thread." },
      { title: "Agent workflow", body: "Claiming, priorities, categories and private staff notes." },
      { title: "Transcripts", body: "HTML and plain-text transcripts for every closed ticket." },
      { title: "SLAs", body: "First-response and resolution times measured from ticket timestamps." },
    ],
    demonstrates: ["Discord bots", "Ticket workflows", "Async SQLAlchemy"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded with a fictional server and tickets.",
    scope: "Built for one community: the dashboard has no accounts and is meant to run on a trusted network (documented in the README).",
  },
  {
    slug: "webhook-automation-hub",
    name: "Webhook Automation Hub",
    tier: "secondary",
    hue: 200,
    kind: "Webhook → action engine",
    pitch: "Turns incoming webhooks into Discord, Telegram or HTTP actions using simple rules.",
    why: "Retries with backoff and a full execution log for every delivery.",
    tagline: "Turn incoming webhooks into Discord, Telegram or HTTP actions, with retries and a full execution log.",
    summary: "The backend-first predecessor of NexaFlow: an adapter-based workflow engine with background retries and encrypted credentials.",
    categories: ["automation", "apis"],
    stack: ["Python", "FastAPI", "SQLAlchemy", "httpx", "cryptography", "React", "TypeScript", "Vite"],
    tests: 51,
    cover: "logs",
    shots: [
      { src: "logs", alt: "Execution log" },
      { src: "workflow", alt: "Workflow configuration" },
      { src: "dashboard", alt: "Dashboard" },
      { src: "api-keys", alt: "API keys" },
    ],
    overview:
      "Take an incoming webhook, transform the payload, and do something with it somewhere else — post to Discord, message a Telegram chat or call another HTTP API — then keep a log of every run. One trigger type, three actions, and an adapter interface that makes the fourth one a single file.",
    features: [
      { title: "Adapters", body: "Discord, Telegram and HTTP actions behind one interface." },
      { title: "Retries", body: "A 502 is retried with backoff; a 400 is not." },
      { title: "Credentials", body: "Encrypted at rest, never returned by the API." },
      { title: "Execution log", body: "Every run with payloads, attempts and results." },
    ],
    demonstrates: ["Webhooks", "Adapter pattern", "Retry strategy"],
    run: ["make install", "make api", "make web"],
    demoNote: "Runs locally; create a workflow and POST to its hook URL.",
  },
  {
    slug: "vaultshare",
    name: "VaultShare",
    tier: "secondary",
    hue: 210,
    kind: "One-time secret links",
    pitch: "Share a password or key through a link that works once, then destroys itself.",
    why: "Encrypted with AES-GCM and shredded after the first read.",
    tagline: "Encrypted one-time links for passwords, keys and small files — expired and shredded after reading.",
    summary: "AES-256-GCM encryption, passphrase protection, atomic view claims and a published threat model.",
    categories: ["security", "web"],
    stack: ["Python", "FastAPI", "cryptography (AES-GCM)", "SQLAlchemy (async)", "Next.js", "TypeScript"],
    tests: 22,
    cover: "reveal",
    shots: [
      { src: "reveal", alt: "Reveal page that shows nothing until the recipient presses Reveal" },
      { src: "create", alt: "Create a secret link with expiry and passphrase" },
      { src: "security", alt: "Published threat model" },
      { src: "mobile-reveal", alt: "Reveal on a phone", mobile: true },
    ],
    overview:
      "VaultShare turns a password, API key or small file into an encrypted link that expires and destroys itself after it's read. A passphrase can be sent over a second channel, and recipients see nothing until they press Reveal — so chat-app link previews can't burn the secret.",
    features: [
      { title: "AES-256-GCM", body: "Secrets encrypted at rest with a master key; nothing stays readable, even for the sender." },
      { title: "Atomic view claims", body: "Two simultaneous opens can't both read a one-time secret." },
      { title: "Reveal button", body: "Link previews from chat apps don't consume the secret." },
      { title: "Threat model", body: "What it protects against — and what it doesn't — is documented." },
    ],
    demonstrates: ["Applied cryptography", "Concurrency safety", "Security writing"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded demo account: demo@vaultshare.dev (password in the README).",
  },
  {
    slug: "eventforge",
    name: "EventForge",
    tier: "secondary",
    hue: 50,
    kind: "Discord tournaments",
    pitch: "Runs tournaments inside Discord: sign-ups, fair brackets or leagues, and score reporting.",
    why: "Seeded brackets with fair byes; the opponent confirms scores and staff resolve disputes.",
    tagline: "Tournaments in Discord: sign-ups, seeded brackets with fair byes, round-robin leagues and confirmed scores.",
    summary: "Players report scores, opponents confirm, disputes go to staff; the dashboard shows the live bracket and standings.",
    categories: ["discord", "web"],
    stack: ["Python", "discord.py", "FastAPI", "SQLAlchemy (async)", "Next.js", "TypeScript"],
    tests: 14,
    cover: "bracket",
    shots: [
      { src: "bracket", alt: "Single-elimination bracket" },
      { src: "standings", alt: "Round-robin standings" },
      { src: "match-dialog", alt: "Match with reported score awaiting confirmation" },
      { src: "mobile-bracket", alt: "Bracket on a phone", mobile: true },
    ],
    overview:
      "EventForge takes sign-ups in Discord, then seeds a single-elimination bracket with fair byes or a round-robin league. Players report their own scores: the opponent confirms, and disputes go to staff.",
    features: [
      { title: "Brackets", body: "Seeded single elimination with byes placed fairly." },
      { title: "Leagues", body: "Round-robin schedules with standings." },
      { title: "Score reporting", body: "Player-reported, opponent-confirmed, staff-resolved disputes." },
      { title: "Dashboard", body: "Live bracket and every match that needs a decision." },
    ],
    demonstrates: ["Discord bots", "Algorithms (seeding)", "State machines"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded with a fictional server and tournaments.",
  },
  {
    slug: "guildpilot",
    name: "GuildPilot",
    tier: "secondary",
    hue: 275,
    kind: "Discord onboarding",
    pitch: "Onboarding for new Discord members: a short step-by-step flow that hands out roles from their answers.",
    why: "Flow builder with a live Discord preview and a drop-off funnel.",
    tagline: "Step-by-step Discord onboarding that grants roles from members' answers, with a flow builder and drop-off funnel.",
    summary: "A DM flow for new members — welcome, region, interests, rules — each answer able to grant a role.",
    categories: ["discord", "automation"],
    stack: ["Python", "discord.py", "FastAPI", "SQLAlchemy (async)", "Next.js", "TypeScript"],
    tests: 11,
    cover: "flow-builder",
    shots: [
      { src: "flow-builder", alt: "Flow builder with a live Discord preview" },
      { src: "overview", alt: "Onboarding funnel" },
      { src: "step-editor", alt: "Step editor" },
      { src: "mobile-flow", alt: "Flow on a phone", mobile: true },
    ],
    overview:
      "When someone joins a Discord server, GuildPilot walks them through a short flow in a private message. Each answer can grant a role so the right channels open up; the dashboard builds the flow, previews each step as Discord shows it, and shows where people drop off.",
    features: [
      { title: "Flow builder", body: "Steps with choices, previewed exactly as Discord renders them." },
      { title: "Role rewards", body: "Answers grant roles automatically." },
      { title: "Funnel", body: "See which step members stop at." },
      { title: "Member progress", body: "Per-member state through the flow." },
    ],
    demonstrates: ["Discord bots", "Automation flows", "Product analytics"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded with a fictional server and member progress.",
  },
  {
    slug: "questforge",
    name: "QuestForge",
    tier: "secondary",
    hue: 320,
    kind: "Discord progression",
    pitch: "Quests, XP levels and seasonal leaderboards for Discord communities.",
    why: "Reputation has a cooldown so it can't be farmed; any bot reports activity through one API.",
    tagline: "Quests, XP levels, badges, role rewards and seasonal leaderboards for Discord — with reputation that can't be farmed.",
    summary: "A progression engine and dashboard; any bot or service reports activity through one API call.",
    categories: ["discord", "apis"],
    stack: ["Python", "FastAPI", "SQLAlchemy (async)", "discord.py", "Next.js", "TypeScript"],
    tests: 11,
    cover: "leaderboard",
    shots: [
      { src: "leaderboard", alt: "Seasonal leaderboard" },
      { src: "quests", alt: "Quest designer" },
      { src: "progress", alt: "Member progress with XP and badges" },
      { src: "mobile-progress", alt: "Progress on a phone", mobile: true },
    ],
    overview:
      "QuestForge replaces XP-per-message spam with quests you design: post in the right channels, help others, show up in voice. Reaching a goal pays out XP, a role and a badge; leaderboards rank all-time XP, season XP or reputation, and reputation has a cooldown so it can't be farmed.",
    features: [
      { title: "Quests", body: "Goals over reported activity, paying XP, roles and badges." },
      { title: "Levels & seasons", body: "One XP curve, all-time and seasonal boards." },
      { title: "Reputation", body: "Cooldown-protected so it can't be farmed." },
      { title: "Activity API", body: "Bots and services report activity through one endpoint." },
    ],
    demonstrates: ["API-first design", "Game-style progression", "Discord communities"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Seeded with a fictional community.",
  },
  {
    slug: "devpulse",
    name: "DevPulse",
    tier: "secondary",
    hue: 155,
    kind: "GitHub analytics",
    pitch: "Activity charts and language stats for any public GitHub profile.",
    why: "A 15-minute cache keeps busy pages inside GitHub's rate limit.",
    tagline: "GitHub activity charts, language breakdowns and searchable repositories for any public profile.",
    summary: "Reads GitHub's public API with a 15-minute cache to stay inside rate limits, and gives each developer a shareable profile page.",
    categories: ["apis", "web"],
    stack: ["Python", "FastAPI", "httpx", "SQLAlchemy (async)", "Next.js", "TypeScript"],
    tests: 13,
    cover: "dashboard",
    shots: [
      { src: "dashboard", alt: "Activity and language charts for a GitHub profile" },
      { src: "profile", alt: "Shareable developer profile page" },
      { src: "repo", alt: "Repository detail" },
      { src: "mobile-dashboard", alt: "Dashboard on a phone", mobile: true },
    ],
    overview:
      "DevPulse turns any public GitHub profile into an activity chart, a language breakdown and a searchable repository list, plus a clean profile page to share. It reads public data only — no OAuth, never private repositories — and caches GitHub responses for 15 minutes.",
    features: [
      { title: "Activity", body: "An activity chart over 7, 30 or 90 days from public events." },
      { title: "Languages", body: "Breakdown across a profile's repositories." },
      { title: "Caching", body: "15-minute cache that keeps busy pages inside GitHub's rate limit." },
      { title: "Profile page", body: "A shareable page per developer." },
    ],
    demonstrates: ["Third-party API integration", "Caching", "Rate-limit awareness"],
    run: ["make install", "make seed", "make api", "make web"],
    demoNote: "Works against GitHub's public API; no token required.",
  },
];

export const flagships = projects.filter((p) => p.tier === "flagship");
export const secondary = projects.filter((p) => p.tier === "secondary");
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const categoryLabel = (id: Category) => CATEGORIES.find((c) => c.id === id)!.label;
