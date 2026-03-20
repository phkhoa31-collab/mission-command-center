import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { StatusDot } from "@/components/StatusDot";
import { cn } from "@/lib/utils";
import { Filter, Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: "low" | "medium" | "high" | "urgent";
  dueDate: string;
  project: string;
}

const priorityStyles: Record<string, string> = {
  low: "text-status-idle",
  medium: "text-status-pending",
  high: "text-primary",
  urgent: "text-status-error",
};

const initialColumns: Record<string, { title: string; tasks: Task[] }> = {
  backlog: {
    title: "Backlog",
    tasks: [
      { id: "t1", title: "Design new onboarding flow", assignee: "Me", priority: "medium", dueDate: "Mar 25", project: "Product" },
      { id: "t2", title: "Research competitor pricing", assignee: "Researcher-01", priority: "low", dueDate: "Mar 28", project: "Strategy" },
    ],
  },
  "in-progress": {
    title: "In Progress",
    tasks: [
      { id: "t3", title: "Build API v2 endpoints", assignee: "Dev-01", priority: "high", dueDate: "Mar 22", project: "Engineering" },
      { id: "t4", title: "Write weekly newsletter", assignee: "Writer-01", priority: "medium", dueDate: "Mar 21", project: "Content" },
    ],
  },
  review: {
    title: "Review",
    tasks: [
      { id: "t5", title: "Review landing page copy", assignee: "Me", priority: "high", dueDate: "Mar 20", project: "Content" },
    ],
  },
  done: {
    title: "Done",
    tasks: [
      { id: "t6", title: "Set up CI/CD pipeline", assignee: "Dev-02", priority: "medium", dueDate: "Mar 18", project: "Engineering" },
    ],
  },
};

export default function Tasks() {
  const [columns, setColumns] = useState(initialColumns);
  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const srcCol = { ...columns[source.droppableId] };
    const destCol = source.droppableId === destination.droppableId ? srcCol : { ...columns[destination.droppableId] };
    const srcTasks = [...srcCol.tasks];
    const destTasks = source.droppableId === destination.droppableId ? srcTasks : [...destCol.tasks];
    const [moved] = srcTasks.splice(source.index, 1);
    destTasks.splice(destination.index, 0, moved);

    setColumns({
      ...columns,
      [source.droppableId]: { ...srcCol, tasks: srcTasks },
      [destination.droppableId]: { ...destCol, tasks: destTasks },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Tasks Board</h1>
          <p className="text-sm text-muted-foreground">Manage and track all tasks across projects.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 rounded-md border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Filter className="h-3.5 w-3.5" /> Filter
          </button>
          <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            <Plus className="h-3.5 w-3.5" /> Add Task
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid gap-4 lg:grid-cols-4">
          {Object.entries(columns).map(([colId, col]) => (
            <div key={colId} className="rounded-lg border bg-muted/30 p-3">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-heading font-semibold">{col.title}</h3>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{col.tasks.length}</span>
              </div>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[100px]">
                    {col.tasks.map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
                            className={cn(
                              "rounded-md border bg-card p-3 cursor-pointer transition-all",
                              snapshot.isDragging && "shadow-lg border-primary/40",
                              "hover:border-primary/20"
                            )}
                          >
                            <p className="text-sm font-medium">{task.title}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                              <span className={cn("font-medium capitalize", priorityStyles[task.priority])}>{task.priority}</span>
                              <span>·</span>
                              <span>{task.assignee}</span>
                              <span>·</span>
                              <span>{task.dueDate}</span>
                            </div>
                            {expandedTask === task.id && (
                              <div className="mt-3 border-t pt-3 text-xs text-muted-foreground">
                                <p><span className="font-medium text-foreground">Project:</span> {task.project}</p>
                                <p className="mt-1">Click to add description and comments...</p>
                              </div>
                            )}
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
    </div>
  );
}
