import { StatusDot } from "@/components/StatusDot";
import { cn } from "@/lib/utils";
import { Clock, Plug, Bot, Save } from "lucide-react";

const cronJobs = [
  { name: "Content scheduler", schedule: "Every day at 9:00 AM", status: "active" as const, lastRun: "Today, 9:00 AM" },
  { name: "Analytics digest", schedule: "Every Monday at 8:00 AM", status: "active" as const, lastRun: "Mar 17, 8:00 AM" },
  { name: "Database backup", schedule: "Every 6 hours", status: "active" as const, lastRun: "Today, 6:00 AM" },
  { name: "Social engagement check", schedule: "Every 2 hours", status: "pending" as const, lastRun: "Today, 10:00 AM" },
];

const integrations = [
  { name: "Slack", status: "active" as const, description: "Notifications and team comms" },
  { name: "Notion", status: "active" as const, description: "Knowledge base sync" },
  { name: "GitHub", status: "active" as const, description: "Code repository" },
  { name: "Google Calendar", status: "pending" as const, description: "Event sync — needs re-auth" },
  { name: "YouTube API", status: "active" as const, description: "Video publishing" },
  { name: "X (Twitter) API", status: "error" as const, description: "Rate limited — awaiting reset" },
  { name: "LinkedIn API", status: "active" as const, description: "Post scheduling" },
  { name: "Stripe", status: "idle" as const, description: "Payments — not configured" },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage cron jobs, integrations, and agent configuration.</p>
      </div>

      {/* Cron Jobs */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <h2 className="font-heading font-semibold">Cron Jobs</h2>
        </div>
        <div className="space-y-2">
          {cronJobs.map((job) => (
            <div key={job.name} className="flex items-center justify-between rounded-lg border bg-card p-4">
              <div className="flex items-center gap-3">
                <StatusDot status={job.status} />
                <div>
                  <p className="text-sm font-medium">{job.name}</p>
                  <p className="text-xs text-muted-foreground">{job.schedule}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">Last: {job.lastRun}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Plug className="h-4 w-4 text-primary" />
          <h2 className="font-heading font-semibold">Integrations</h2>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {integrations.map((int) => (
            <div key={int.name} className="flex items-center gap-3 rounded-lg border bg-card p-3">
              <StatusDot status={int.status} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{int.name}</p>
                <p className="truncate text-xs text-muted-foreground">{int.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Agent Config */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <Bot className="h-4 w-4 text-primary" />
          <h2 className="font-heading font-semibold">Agent Configuration</h2>
        </div>
        <div className="rounded-lg border bg-card p-5 space-y-4">
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Agent Name</label>
            <input defaultValue="GM" className="mt-1 w-full rounded-md border bg-muted/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Default Model</label>
            <select className="mt-1 w-full rounded-md border bg-muted/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary">
              <option>GPT-4o</option>
              <option>Claude 3.5 Sonnet</option>
              <option>Gemini Pro</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">System Prompt</label>
            <textarea rows={3} defaultValue="You are GM, an AI orchestrator managing tasks, content, and team coordination." className="mt-1 w-full rounded-md border bg-muted/30 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none" />
          </div>
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Save className="h-3.5 w-3.5" /> Save Configuration
          </button>
        </div>
      </section>
    </div>
  );
}
