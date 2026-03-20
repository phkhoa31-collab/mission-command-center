import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wrench, Search, Globe, Mail, BarChart3, Newspaper, 
  Shield, Brain, Play, CheckCircle, XCircle 
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "inactive" | "error";
  icon: any;
  lastUsed: string;
  usageCount: number;
}

const skills: Skill[] = [
  {
    id: "gm-youtube",
    name: "YouTube Integration",
    description: "Extract transcripts, search videos, browse channels",
    category: "media",
    status: "active",
    icon: Play,
    lastUsed: "2 min ago",
    usageCount: 45
  },
  {
    id: "gm-browser-secure",
    name: "Browser Agent",
    description: "Web scraping with anti-detection",
    category: "automation",
    status: "active",
    icon: Globe,
    lastUsed: "15 min ago",
    usageCount: 128
  },
  {
    id: "gm-secure-mail",
    name: "Email Agent",
    description: "Secure email via AgentMail",
    category: "communication",
    status: "active",
    icon: Mail,
    lastUsed: "1h ago",
    usageCount: 67
  },
  {
    id: "gm-analyze",
    name: "Data Analyst",
    description: "Statistical analysis",
    category: "analysis",
    status: "active",
    icon: BarChart3,
    lastUsed: "32 min ago",
    usageCount: 89
  },
  {
    id: "gm-news",
    name: "News Fetcher",
    description: "News headlines",
    category: "media",
    status: "active",
    icon: Newspaper,
    lastUsed: "5 min ago",
    usageCount: 156
  },
  {
    id: "gm-security",
    name: "Security Agent",
    description: "Audits and hardening",
    category: "security",
    status: "active",
    icon: Shield,
    lastUsed: "2h ago",
    usageCount: 23
  },
  {
    id: "gm-memory",
    name: "Memory Manager",
    description: "Long-term learning",
    category: "knowledge",
    status: "active",
    icon: Brain,
    lastUsed: "45 min ago",
    usageCount: 234
  },
  {
    id: "gm-visualize",
    name: "Visualize",
    description: "Charts and graphs",
    category: "analysis",
    status: "active",
    icon: BarChart3,
    lastUsed: "1h ago",
    usageCount: 56
  }
];

const categories = [
  { id: "all", label: "All Skills" },
  { id: "automation", label: "Automation" },
  { id: "media", label: "Media" },
  { id: "communication", label: "Communication" },
  { id: "analysis", label: "Analysis" },
  { id: "security", label: "Security" },
  { id: "knowledge", label: "Knowledge" }
];

export default function Skills() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Skills</h1>
        <p className="text-sm text-muted-foreground">Manage your OpenClaw skills.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{filteredSkills.length} skills</Badge>
          <Badge variant="outline" className="bg-green-500/10 text-green-500">
            {skills.filter((s) => s.status === "active").length} active
          </Badge>
        </div>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="flex-wrap h-auto">
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>{cat.label}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <Card key={skill.id} className="group card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                        <CheckCircle className="h-3 w-3 mr-1" /> active
                      </Badge>
                    </div>
                    <CardTitle className="text-base mt-3">{skill.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Used {skill.lastUsed}</span>
                      <span>{skill.usageCount} times</span>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="flex-1"><Play className="mr-1 h-3 w-3" /> Run</Button>
                      <Button size="sm" variant="outline"><Wrench className="h-3 w-3" /></Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
