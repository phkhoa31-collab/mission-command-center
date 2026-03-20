import { StatusDot } from "@/components/StatusDot";
import { MetricCard } from "@/components/MetricCard";
import { CheckSquare, FileText, Calendar, Bot, ArrowRight } from "lucide-react";

const activityFeed = [
  { id: 1, agent: "GM", action: "Completed task: Update landing page copy", time: "2 min ago", status: "active" as const },
  { id: 2, agent: "Writer-01", action: "Draft ready: Tuesday LinkedIn post", time: "15 min ago", status: "active" as const },
  { id: 3, agent: "Researcher-01", action: "Compiled competitor analysis report", time: "32 min ago", status: "active" as const },
  { id: 4, agent: "Dev-01", action: "Deployed API endpoint v2.3", time: "1h ago", status: "active" as const },
  { id: 5, agent: "Operator-01", action: "Waiting for Slack webhook confirmation", time: "1h ago", status: "pending" as const },
  { id: 6, agent: "Writer-02", action: "Failed to generate thumbnail — retrying", time: "2h ago", status: "error" as const },
  { id: 7, agent: "Dev-02", action: "Idle — no tasks assigned", time: "3h ago", status: "idle" as const },
];

const upcomingEvents = [
  { title: "Team standup", time: "Today, 3:00 PM", type: "meeting" },
  { title: "Publish LinkedIn post", time: "Tomorrow, 9:00 AM", type: "content" },
  { title: "API rate limit cron job", time: "Tomorrow, 2:00 AM", type: "automation" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Mission Control</h1>
        <p className="text-sm text-muted-foreground">Welcome back, Commander. Here's your status overview.</p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Active Tasks" value={12} subtitle="3 urgent" icon={CheckSquare} trend={{ value: 8, positive: true }} />
        <MetricCard title="Content Pipeline" value={24} subtitle="7 in review" icon={FileText} />
        <MetricCard title="Upcoming Events" value={6} subtitle="Next 48h" icon={Calendar} />
        <MetricCard title="AI Agent Activity" value="Online" subtitle="5/7 agents active" icon={Bot} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Activity Feed */}
        <div className="lg:col-span-2 rounded-lg border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading font-semibold">Live Activity Feed</h2>
            <StatusDot status="active" showLabel />
          </div>
          <div className="space-y-1">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-start gap-3 rounded-md px-3 py-2.5 transition-colors hover:bg-muted/50">
                <StatusDot status={item.status} className="mt-1.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-medium text-primary">{item.agent}</span>{" "}
                    <span className="text-foreground">{item.action}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming */}
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-4 font-heading font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {upcomingEvents.map((evt, i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border bg-muted/30 p-3">
                <Calendar className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{evt.title}</p>
                  <p className="text-xs text-muted-foreground">{evt.time}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
