import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface CalEvent {
  id: string;
  title: string;
  date: number;
  category: "task" | "content" | "meeting" | "automation";
}

const categoryStyles: Record<string, string> = {
  task: "bg-primary/20 text-primary border-primary/30",
  content: "bg-status-active/20 text-status-active border-status-active/30",
  meeting: "bg-[hsl(270,60%,60%)]/20 text-[hsl(270,60%,70%)] border-[hsl(270,60%,60%)]/30",
  automation: "bg-status-idle/20 text-status-idle border-status-idle/30",
};

const sampleEvents: CalEvent[] = [
  { id: "e1", title: "Team standup", date: 20, category: "meeting" },
  { id: "e2", title: "Publish LinkedIn post", date: 21, category: "content" },
  { id: "e3", title: "API cron job", date: 21, category: "automation" },
  { id: "e4", title: "Review PRs", date: 22, category: "task" },
  { id: "e5", title: "Client call", date: 24, category: "meeting" },
  { id: "e6", title: "YouTube upload", date: 24, category: "content" },
  { id: "e7", title: "Sprint planning", date: 25, category: "meeting" },
  { id: "e8", title: "Newsletter send", date: 28, category: "automation" },
];

const daysInMonth = 31;
const startDay = 5; // March 2026 starts on Thursday (index 5 for Sat-start? Let's use Mon-start: Thu=3)
const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<CalEvent | null>(null);
  const [view, setView] = useState<"month" | "week" | "day">("month");

  const cells = [];
  // March 2026 starts on Sunday (day 0), let's say Thursday for realism
  const offset = 3; // Thursday
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Calendar</h1>
          <p className="text-sm text-muted-foreground">March 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 rounded-md border bg-muted/30 p-0.5">
            {(["month", "week", "day"] as const).map((v) => (
              <button key={v} onClick={() => setView(v)} className={cn("rounded px-3 py-1 text-xs font-medium capitalize transition-colors", view === v ? "bg-card text-foreground" : "text-muted-foreground")}>
                {v}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-3.5 w-3.5" /> New Event
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4">
        {Object.entries(categoryStyles).map(([cat, style]) => (
          <span key={cat} className="flex items-center gap-1.5 text-xs capitalize">
            <span className={cn("h-2.5 w-2.5 rounded-sm border", style)} />
            {cat === "task" ? "Tasks" : cat === "content" ? "Content" : cat === "meeting" ? "Meetings" : "Automations"}
          </span>
        ))}
      </div>

      <div className="rounded-lg border bg-card">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b">
          {dayNames.map((d) => (
            <div key={d} className="p-2 text-center text-xs font-medium text-muted-foreground">{d}</div>
          ))}
        </div>
        {/* Cells */}
        <div className="grid grid-cols-7">
          {cells.map((day, i) => {
            const dayEvents = day ? sampleEvents.filter((e) => e.date === day) : [];
            return (
              <div key={i} className={cn("min-h-[100px] border-b border-r p-1.5 last:border-r-0", !day && "bg-muted/20")}>
                {day && <span className={cn("mb-1 inline-block text-xs font-medium", day === 20 && "rounded-full bg-primary px-1.5 text-primary-foreground")}>{day}</span>}
                <div className="space-y-0.5">
                  {dayEvents.map((evt) => (
                    <button
                      key={evt.id}
                      onClick={() => setSelectedEvent(evt)}
                      className={cn("w-full truncate rounded px-1 py-0.5 text-left text-[10px] font-medium border", categoryStyles[evt.category])}
                    >
                      {evt.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setSelectedEvent(null)}>
          <div className="w-full max-w-sm rounded-lg border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-heading font-semibold">{selectedEvent.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">March {selectedEvent.date}, 2026</p>
            <span className={cn("mt-3 inline-block rounded px-2 py-0.5 text-xs font-medium capitalize border", categoryStyles[selectedEvent.category])}>
              {selectedEvent.category}
            </span>
            <button onClick={() => setSelectedEvent(null)} className="mt-4 block w-full rounded-md border py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
