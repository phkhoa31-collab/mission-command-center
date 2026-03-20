import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { CalendarDays, LayoutGrid } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  platform: string;
  day: string;
  status: string;
}

const platformColors: Record<string, string> = {
  YouTube: "bg-status-error/20 text-status-error",
  X: "bg-foreground/10 text-foreground",
  LinkedIn: "bg-primary/20 text-primary",
  Other: "bg-status-idle/20 text-status-idle",
};

const initialPipeline: Record<string, { title: string; items: ContentItem[] }> = {
  ideation: { title: "Ideation", items: [
    { id: "c1", title: "AI Agents Explained", platform: "YouTube", day: "Monday", status: "New" },
    { id: "c2", title: "Productivity hack thread", platform: "X", day: "Wednesday", status: "New" },
  ]},
  research: { title: "Research", items: [
    { id: "c3", title: "SaaS metrics deep dive", platform: "LinkedIn", day: "Tuesday", status: "In research" },
  ]},
  scripting: { title: "Scripting", items: [
    { id: "c4", title: "Weekly newsletter #24", platform: "Other", day: "Friday", status: "Writing" },
  ]},
  review: { title: "Review", items: [
    { id: "c5", title: "Building in public update", platform: "LinkedIn", day: "Thursday", status: "Needs review" },
  ]},
  design: { title: "Design", items: [] },
  scheduled: { title: "Scheduled", items: [
    { id: "c6", title: "Launch announcement video", platform: "YouTube", day: "Monday", status: "Ready" },
  ]},
  published: { title: "Published", items: [
    { id: "c7", title: "Founder story carousel", platform: "LinkedIn", day: "Tuesday", status: "Live" },
  ]},
};

const weeklySchedule = [
  { day: "Monday", theme: "Long-form Video" },
  { day: "Tuesday", theme: "LinkedIn Thought Leadership" },
  { day: "Wednesday", theme: "X Threads & Engagement" },
  { day: "Thursday", theme: "Behind the Scenes" },
  { day: "Friday", theme: "Newsletter & Recap" },
];

export default function ContentPipeline() {
  const [pipeline, setPipeline] = useState(initialPipeline);
  const [view, setView] = useState<"board" | "calendar">("board");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const srcCol = { ...pipeline[source.droppableId] };
    const destCol = source.droppableId === destination.droppableId ? srcCol : { ...pipeline[destination.droppableId] };
    const srcItems = [...srcCol.items];
    const destItems = source.droppableId === destination.droppableId ? srcItems : [...destCol.items];
    const [moved] = srcItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, moved);

    setPipeline({
      ...pipeline,
      [source.droppableId]: { ...srcCol, items: srcItems },
      [destination.droppableId]: { ...destCol, items: destItems },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Content Pipeline</h1>
          <p className="text-sm text-muted-foreground">Track content from ideation to publication.</p>
        </div>
        <div className="flex gap-1 rounded-md border bg-muted/30 p-0.5">
          <button onClick={() => setView("board")} className={cn("rounded px-3 py-1 text-sm transition-colors", view === "board" ? "bg-card text-foreground" : "text-muted-foreground")}>
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button onClick={() => setView("calendar")} className={cn("rounded px-3 py-1 text-sm transition-colors", view === "calendar" ? "bg-card text-foreground" : "text-muted-foreground")}>
            <CalendarDays className="h-4 w-4" />
          </button>
        </div>
      </div>

      {view === "board" ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {Object.entries(pipeline).map(([colId, col]) => (
              <div key={colId} className="w-52 shrink-0 rounded-lg border bg-muted/30 p-2.5">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-heading font-semibold uppercase tracking-wider">{col.title}</h3>
                  <span className="text-xs text-muted-foreground">{col.items.length}</span>
                </div>
                <Droppable droppableId={colId}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[80px]">
                      {col.items.map((item, idx) => (
                        <Draggable key={item.id} draggableId={item.id} index={idx}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={cn("rounded-md border bg-card p-2.5 text-xs", snapshot.isDragging && "shadow-lg border-primary/40")}
                            >
                              <p className="font-medium text-sm">{item.title}</p>
                              <div className="mt-1.5 flex items-center gap-1.5">
                                <span className={cn("rounded px-1.5 py-0.5 text-[10px] font-medium", platformColors[item.platform] || platformColors.Other)}>
                                  {item.platform}
                                </span>
                                <span className="text-muted-foreground">{item.day}</span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      ) : (
        <div className="rounded-lg border bg-card p-5">
          <h2 className="mb-4 font-heading font-semibold">Weekly Posting Schedule</h2>
          <div className="space-y-2">
            {weeklySchedule.map((s) => (
              <div key={s.day} className="flex items-center gap-4 rounded-md border bg-muted/30 p-3">
                <span className="w-24 text-sm font-medium">{s.day}</span>
                <span className="text-sm text-muted-foreground">{s.theme}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
