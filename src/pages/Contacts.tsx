import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, Plus } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  role: string;
  handle: string;
  timezone: string;
  category: string;
  notes: string;
  compensation?: string;
}

const contacts: Contact[] = [
  { id: "ct1", name: "Alex Rivera", role: "Product Lead", handle: "@alex_r", timezone: "PST (UTC-8)", category: "Internal Team", notes: "Handles product roadmap and sprint planning.", compensation: "$12K/mo" },
  { id: "ct2", name: "Sam Chen", role: "Lead Engineer", handle: "@samchen", timezone: "EST (UTC-5)", category: "Internal Team", notes: "Full-stack, prefers async communication." },
  { id: "ct3", name: "Jordan Lee", role: "Content Creator", handle: "@jordanlee", timezone: "CST (UTC-6)", category: "Content Team", notes: "Video production and social media management.", compensation: "$3K/mo" },
  { id: "ct4", name: "Taylor Kim", role: "Copywriter", handle: "@tkim_writes", timezone: "PST (UTC-8)", category: "Content Team", notes: "Newsletter and LinkedIn content." },
  { id: "ct5", name: "Morgan Davis", role: "Design Contractor", handle: "@morgand", timezone: "GMT (UTC+0)", category: "External", notes: "UI/UX design, available 20h/week.", compensation: "$85/hr" },
  { id: "ct6", name: "Casey Wong", role: "Client — Acme Corp", handle: "@caseyw", timezone: "JST (UTC+9)", category: "Clients", notes: "Main point of contact for partnership deal." },
];

const categories = ["All", "Internal Team", "Content Team", "External", "Clients"];

export default function Contacts() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = contacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold">Contacts</h1>
          <p className="text-sm text-muted-foreground">Your team and network directory.</p>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-3.5 w-3.5" /> Add Contact
        </button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
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
        {filtered.map((contact) => (
          <div key={contact.id} className="rounded-lg border bg-card p-4 card-hover">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-sm font-bold text-secondary-foreground">
                {contact.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium">{contact.name}</h3>
                <p className="text-xs text-muted-foreground">{contact.role}</p>
              </div>
              <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">{contact.category}</span>
            </div>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p><span className="text-foreground">Handle:</span> {contact.handle}</p>
              <p><span className="text-foreground">TZ:</span> {contact.timezone}</p>
              {contact.compensation && <p><span className="text-foreground">Comp:</span> {contact.compensation}</p>}
              <p className="mt-1.5">{contact.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
