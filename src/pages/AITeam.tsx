import { useState } from "react";
import { StatusDot } from "@/components/StatusDot";
import { cn } from "@/lib/utils";
import { Bot, X } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  role: string;
  group: string;
  status: "active" | "pending" | "error" | "idle";
  currentTask: string;
  lastActive: string;
  responsibilities: string[];
  recentWork: string[];
}

const agents: Agent[] = [
  { id: "gm", name: "GM", role: "Lead Orchestrator", group: "lead", status: "active", currentTask: "Coordinating sprint tasks", lastActive: "Now", responsibilities: ["Task delegation", "Agent coordination", "Decision making"], recentWork: ["Assigned 4 tasks to sub-agents", "Updated content pipeline", "Reviewed API endpoints"] },
  { id: "dev1", name: "Dev-01", role: "Backend Developer", group: "Developers", status: "active", currentTask: "Building API v2 endpoints", lastActive: "2 min ago", responsibilities: ["API development", "Database management", "CI/CD"], recentWork: ["Deployed auth service v2.3", "Fixed rate limiting bug", "Added pagination to listings API"] },
  { id: "dev2", name: "Dev-02", role: "Frontend Developer", group: "Developers", status: "idle", currentTask: "None", lastActive: "3h ago", responsibilities: ["UI development", "Component library", "Performance"], recentWork: ["Refactored dashboard components", "Added dark mode support"] },
  { id: "w1", name: "Writer-01", role: "Content Strategist", group: "Writers", status: "active", currentTask: "Drafting LinkedIn post", lastActive: "15 min ago", responsibilities: ["Content strategy", "Copywriting", "Social media"], recentWork: ["Wrote weekly newsletter", "Published 3 LinkedIn posts", "Updated brand guidelines"] },
  { id: "w2", name: "Writer-02", role: "Video Scriptwriter", group: "Writers", status: "error", currentTask: "Thumbnail generation failed", lastActive: "2h ago", responsibilities: ["Video scripts", "Thumbnails", "YouTube SEO"], recentWork: ["Scripted 'AI Agents Explained' video", "Created 5 thumbnails"] },
  { id: "r1", name: "Researcher-01", role: "Market Researcher", group: "Researchers", status: "active", currentTask: "Competitor analysis", lastActive: "32 min ago", responsibilities: ["Market research", "Data analysis", "Trend reports"], recentWork: ["Compiled Q1 competitor report", "Analyzed pricing trends"] },
  { id: "o1", name: "Operator-01", role: "Automation Specialist", group: "Operators", status: "pending", currentTask: "Awaiting webhook confirmation", lastActive: "1h ago", responsibilities: ["Workflow automation", "Integrations", "Monitoring"], recentWork: ["Set up Slack notifications", "Configured cron jobs"] },
];

const groups = ["Developers", "Writers", "Researchers", "Operators"];

export default function AITeam() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const lead = agents.find((a) => a.group === "lead")!;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">AI Team</h1>
        <p className="text-sm text-muted-foreground">Your AI agent org chart and live statuses.</p>
      </div>

      {/* Lead Agent */}
      <div className="mx-auto max-w-sm">
        <button onClick={() => setSelectedAgent(lead)} className="w-full rounded-lg border bg-card p-5 text-center card-hover">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h3 className="mt-3 font-heading text-lg font-bold">{lead.name}</h3>
          <p className="text-sm text-muted-foreground">{lead.role}</p>
          <div className="mt-2 flex justify-center">
            <StatusDot status={lead.status} showLabel />
          </div>
        </button>
      </div>

      {/* Connector line */}
      <div className="flex justify-center">
        <div className="h-8 w-px bg-border" />
      </div>

      {/* Groups */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => {
          const groupAgents = agents.filter((a) => a.group === group);
          return (
            <div key={group}>
              <h3 className="mb-2 text-xs font-heading font-semibold uppercase tracking-wider text-muted-foreground">{group}</h3>
              <div className="space-y-2">
                {groupAgents.map((agent) => (
                  <button key={agent.id} onClick={() => setSelectedAgent(agent)} className="w-full rounded-lg border bg-card p-3 text-left card-hover">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                        <Bot className="h-4 w-4 text-secondary-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{agent.name}</span>
                          <StatusDot status={agent.status} />
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{agent.role}</p>
                      </div>
                    </div>
                    <p className="mt-2 truncate text-xs text-muted-foreground">{agent.currentTask}</p>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Agent Detail */}
      {selectedAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setSelectedAgent(null)}>
          <div className="w-full max-w-md rounded-lg border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15">
                  <Bot className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold">{selectedAgent.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedAgent.role}</p>
                </div>
              </div>
              <button onClick={() => setSelectedAgent(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <StatusDot status={selectedAgent.status} showLabel />
              <span className="text-xs text-muted-foreground">· Last active: {selectedAgent.lastActive}</span>
            </div>
            <div className="mt-4 space-y-3">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Current Task</h4>
                <p className="mt-1 text-sm">{selectedAgent.currentTask}</p>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Responsibilities</h4>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {selectedAgent.responsibilities.map((r) => (
                    <span key={r} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{r}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent Work</h4>
                <ul className="mt-1 space-y-1">
                  {selectedAgent.recentWork.map((w, i) => (
                    <li key={i} className="text-xs text-muted-foreground">• {w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
