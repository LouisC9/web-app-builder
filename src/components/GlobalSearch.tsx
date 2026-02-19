// =========================
// GlobalSearch Component
// Search across all modules from the topbar
// =========================

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Calendar, Users, Star, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  demoEvents,
  demoClubs,
  demoMerits,
  demoAchievements,
  CURRENT_USER_ID,
} from "@/data/demo-data";

interface SearchResult {
  id: string;
  name: string;
  category: "event" | "club" | "merit" | "achievement";
  detail: string;
  route: string;
}

const iconMap = {
  event: Calendar,
  club: Users,
  merit: Star,
  achievement: Award,
};

const colorMap = {
  event: "text-info",
  club: "text-success",
  merit: "text-warning",
  achievement: "text-purple",
};

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const res: SearchResult[] = [];

    demoEvents
      .filter((e) => e.user_id === CURRENT_USER_ID)
      .forEach((e) => {
        if (e.event_name.toLowerCase().includes(q) || e.event_type.toLowerCase().includes(q))
          res.push({ id: `ev-${e.id}`, name: e.event_name, category: "event", detail: e.event_type, route: "/modules/event" });
      });

    demoClubs
      .filter((c) => c.user_id === CURRENT_USER_ID)
      .forEach((c) => {
        if (c.club_name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q))
          res.push({ id: `cl-${c.id}`, name: c.club_name, category: "club", detail: c.role, route: "/modules/club" });
      });

    demoMerits
      .filter((m) => m.user_id === CURRENT_USER_ID)
      .forEach((m) => {
        if (m.activity_name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q))
          res.push({ id: `mr-${m.id}`, name: m.activity_name, category: "merit", detail: m.category, route: "/modules/merit" });
      });

    demoAchievements
      .filter((a) => a.user_id === CURRENT_USER_ID)
      .forEach((a) => {
        if (a.title.toLowerCase().includes(q) || a.level.toLowerCase().includes(q))
          res.push({ id: `ac-${a.id}`, name: a.title, category: "achievement", detail: a.level, route: "/modules/achievement" });
      });

    return res.slice(0, 8);
  }, [query]);

  const handleSelect = (result: SearchResult) => {
    setQuery("");
    setOpen(false);
    navigate(result.route);
  };

  return (
    <div ref={ref} className="relative hidden sm:block">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          className="h-8 w-48 pl-8 text-sm lg:w-64"
        />
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 w-80 rounded-md border bg-popover p-1 shadow-lg">
          {results.map((r) => {
            const Icon = iconMap[r.category];
            return (
              <button
                key={r.id}
                onClick={() => handleSelect(r)}
                className="flex w-full items-center gap-3 rounded-sm px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
              >
                <Icon className={`h-4 w-4 shrink-0 ${colorMap[r.category]}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{r.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{r.category} · {r.detail}</p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {open && query.trim() && results.length === 0 && (
        <div className="absolute top-full left-0 z-50 mt-1 w-80 rounded-md border bg-popover p-4 shadow-lg text-center text-sm text-muted-foreground">
          No results found.
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
