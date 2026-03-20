import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Filter, X } from "lucide-react";

interface MemoryDoc {
  id: string;
  title: string;
  category: string;
  date: string;
  preview: string;
  content: string;
}

const documents: MemoryDoc[] = [
  { id: "m1", title: "Brand Voice Guidelines", category: "SOPs", date: "Mar 15, 2026", preview: "Our brand speaks with clarity and confidence...", content: "Our brand speaks with clarity and confidence. We use short, direct sentences. We avoid jargon unless speaking to a technical audience. Tone: professional yet approachable." },
  { id: "m2", title: "Q1 Revenue Report", category: "Reports", date: "Mar 10, 2026", preview: "Total revenue for Q1 reached $142K, a 23% increase...", content: "Total revenue for Q1 reached $142K, representing a 23% increase over Q4. Key drivers: new product launches and improved conversion rates on LinkedIn campaigns." },
  { id: "m3", title: "API Architecture Notes", category: "Knowledge Base", date: "Mar 8, 2026", preview: "Current architecture uses a microservices pattern...", content: "Current architecture uses a microservices pattern with 3 core services: auth, content-api, and analytics. All communicate via REST with JWT auth. Moving to gRPC for internal comms in Q2." },
  { id: "m4", title: "Meeting Notes: Partner Call", category: "Meeting Notes", date: "Mar 5, 2026", preview: "Discussed partnership terms with Acme Corp...", content: "Discussed partnership terms with Acme Corp. They want co-branded content series. Budget: $20K/quarter. Next steps: draft proposal by Mar 20." },
  { id: "m5", title: "Content Calendar Template", category: "SOPs", date: "Feb 28, 2026", preview: "Standard weekly content calendar structure...", content: "Standard weekly content calendar: Mon=Video, Tue=LinkedIn, Wed=X threads, Thu=BTS, Fri=Newsletter. Each piece goes through 7-stage pipeline." },
  { id: "m6", title: "Competitor Analysis: XYZ Co", category: "Archive", date: "Feb 15, 2026", preview: "XYZ Co launched a new AI tool targeting SMBs...", content: "XYZ Co launched a new AI tool targeting SMBs. Pricing: $49/mo. Key differentiator: built-in CRM. Weakness: no API access. Our advantage: full API + automation." },
];

const categories = ["All", "SOPs", "Reports", "Knowledge Base", "Meeting Notes", "Archive"];

export default function Memory() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedDoc, setSelectedDoc] = useState<MemoryDoc | null>(null);

  const filtered = documents.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) || d.preview.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Memory</h1>
        <p className="text-sm text-muted-foreground">Searchable knowledge base and document library.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full rounded-md border bg-muted/30 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors", activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className="rounded-lg border bg-card p-4 text-left card-hover"
          >
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-medium">{doc.title}</h3>
              <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{doc.category}</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">{doc.date}</p>
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{doc.preview}</p>
          </button>
        ))}
      </div>

      {/* Doc viewer */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm" onClick={() => setSelectedDoc(null)}>
          <div className="w-full max-w-lg rounded-lg border bg-card p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold">{selectedDoc.title}</h3>
                <p className="text-xs text-muted-foreground">{selectedDoc.date} · {selectedDoc.category}</p>
              </div>
              <button onClick={() => setSelectedDoc(null)} className="text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 rounded-md border bg-muted/30 p-4 text-sm leading-relaxed text-foreground">
              {selectedDoc.content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
