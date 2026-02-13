import React, { useState, useEffect } from "react";
import { IconLock, IconLogout, IconQuestionMark, IconBriefcase, IconCategory, IconChartBar, IconSearch, IconEdit, IconCheck, IconX, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { allQuestions, riasecProfiles, type RiasecType, type Question } from "@/data/quizQuestions";
import { careerDetails, type CareerDetail } from "@/data/careerDetails";

const ADMIN_PASSWORD = "trampos2024";
const STATS_KEY = "trampos_test_count";

function getTestCount(): number {
  try {
    return parseInt(localStorage.getItem(STATS_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

// ─── Login Gate ──────────────────────────────────────────
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "1");
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-sm rounded-2xl shadow-lg border border-border/50">
        <CardContent className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <IconLock className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>Admin</h1>
            <p className="text-sm text-muted-foreground">Área administrativa do Trampos Game</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Senha de acesso"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setError(false); }}
              className={error ? "border-destructive" : ""}
              autoFocus
            />
            {error && <p className="text-xs text-destructive font-medium">Senha incorreta</p>}
            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// ─── Questions Tab ───────────────────────────────────────
const QuestionsAdmin = () => {
  const [search, setSearch] = useState("");
  const [filterPair, setFilterPair] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const pairs = [
    { label: "Todos", value: "all" },
    { label: "R × I", value: "R-I" },
    { label: "I × R", value: "I-R" },
    { label: "A × C", value: "A-C" },
    { label: "C × A", value: "C-A" },
    { label: "S × E", value: "S-E" },
    { label: "E × S", value: "E-S" },
  ];

  const filtered = allQuestions.filter((q) => {
    const matchSearch = search === "" || q.text.toLowerCase().includes(search.toLowerCase()) || q.id.toString().includes(search);
    const matchPair = filterPair === "all" || `${q.yesType}-${q.noType}` === filterPair;
    return matchSearch && matchPair;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-foreground">Perguntas ({allQuestions.length})</h2>
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-60 rounded-full text-sm" />
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {pairs.map((p) => (
          <button
            key={p.value}
            onClick={() => setFilterPair(p.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              filterPair === p.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} resultados</p>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {filtered.map((q) => (
          <Card key={q.id} className="rounded-xl border border-border/50">
            <CardContent className="p-0">
              <button
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
                className="w-full flex items-start gap-3 p-4 text-left"
              >
                <span className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">
                  {q.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">{q.text}</p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <TypeBadge type={q.yesType} label={`SIM → ${q.yesSub}`} />
                    <TypeBadge type={q.noType} label={`NÃO → ${q.noSub}`} />
                  </div>
                </div>
                {expandedId === q.id ? <IconChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" /> : <IconChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
              </button>
              {expandedId === q.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0">
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Resposta SIM</p>
                      <p className="text-sm font-bold" style={{ color: riasecProfiles[q.yesType].color }}>
                        {riasecProfiles[q.yesType].name} ({q.yesType})
                      </p>
                      <p className="text-xs text-foreground">Subtipo: <span className="font-bold">{q.yesSub}</span></p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Resposta NÃO</p>
                      <p className="text-sm font-bold" style={{ color: riasecProfiles[q.noType].color }}>
                        {riasecProfiles[q.noType].name} ({q.noType})
                      </p>
                      <p className="text-xs text-foreground">Subtipo: <span className="font-bold">{q.noSub}</span></p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── Careers Tab ──────────────────────────────────────────
const CareersAdmin = () => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  const types: { label: string; value: string }[] = [
    { label: "Todos", value: "all" },
    ...((Object.keys(riasecProfiles) as RiasecType[]).map((t) => ({
      label: `${riasecProfiles[t].name} (${t})`,
      value: t,
    }))),
  ];

  const filtered = careerDetails.filter((c, i) => {
    const matchSearch = search === "" || c.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || c.type === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-foreground">Profissões ({careerDetails.length})</h2>
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-60 rounded-full text-sm" />
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {types.map((t) => (
          <button
            key={t.value}
            onClick={() => setFilterType(t.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              filterType === t.value
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} resultados</p>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {filtered.map((career, idx) => {
          const globalIdx = careerDetails.indexOf(career);
          const profile = riasecProfiles[career.type];
          return (
            <Card key={globalIdx} className="rounded-xl border border-border/50">
              <CardContent className="p-0">
                <button
                  onClick={() => setExpandedIdx(expandedIdx === globalIdx ? null : globalIdx)}
                  className="w-full flex items-start gap-3 p-4 text-left"
                >
                  <div
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ backgroundColor: profile.color }}
                  >
                    {career.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{career.name}</p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {career.relatedSubtypes.map((sub, si) => (
                        <span key={si} className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: riasecProfiles[sub.type].color + '22', color: riasecProfiles[sub.type].color, border: `1px solid ${riasecProfiles[sub.type].color}44` }}>
                          {sub.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  {expandedIdx === globalIdx ? <IconChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" /> : <IconChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
                </button>
                {expandedIdx === globalIdx && (
                  <div className="px-4 pb-4 pt-0 border-t border-border/50 space-y-3">
                    <div className="pt-3">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Descrição</p>
                      <p className="text-xs text-foreground leading-relaxed">{career.description || "—"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Ponto Forte</p>
                        <p className="text-xs text-foreground">{career.strengths || "—"}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Ponto Fraco</p>
                        <p className="text-xs text-foreground">{career.weaknesses || "—"}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground mb-1">Subtipos (ordem)</p>
                      <div className="flex gap-2">
                        {career.relatedSubtypes.map((sub, si) => (
                          <div key={si} className="flex flex-col items-center gap-1">
                            <span className="text-[8px] font-bold text-muted-foreground uppercase">
                              {si < 2 ? `Dom. ${si + 1}` : `Sec. ${si - 1}`}
                            </span>
                            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: riasecProfiles[sub.type].color }}>
                              {sub.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── Types/Subtypes Tab ──────────────────────────────────
const TypesAdmin = () => {
  const typeOrder: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

  // Count questions per subtype
  const subtypeCounts: Record<string, number> = {};
  for (const q of allQuestions) {
    subtypeCounts[q.yesSub] = (subtypeCounts[q.yesSub] || 0) + 1;
    subtypeCounts[q.noSub] = (subtypeCounts[q.noSub] || 0) + 1;
  }

  // Count careers per subtype
  const careerSubtypeCounts: Record<string, number> = {};
  for (const c of careerDetails) {
    for (const sub of c.relatedSubtypes) {
      careerSubtypeCounts[sub.label] = (careerSubtypeCounts[sub.label] || 0) + 1;
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">Tipos & Subtipos RIASEC</h2>
      <p className="text-xs text-muted-foreground">6 tipos × 10 subtipos = 60 subtipos totais</p>

      <div className="space-y-4">
        {typeOrder.map((type) => {
          const profile = riasecProfiles[type];
          const questionsForType = allQuestions.filter((q) => q.yesType === type || q.noType === type).length;
          const careersForType = careerDetails.filter((c) => c.type === type).length;

          return (
            <Card key={type} className="rounded-xl border border-border/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 px-4 py-3" style={{ borderLeft: `4px solid ${profile.color}` }}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: profile.color }}>
                    <span className="text-white font-bold text-sm">{type}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground">{profile.name}</p>
                    <p className="text-xs text-muted-foreground">{questionsForType} perguntas • {careersForType} profissões</p>
                  </div>
                </div>
                <div className="px-4 pb-4 pt-2">
                  <div className="flex flex-wrap gap-2">
                    {profile.subdivisions.map((sub) => (
                      <div key={sub} className="flex flex-col items-center gap-0.5 rounded-lg border border-border/50 px-3 py-2 bg-secondary/30">
                        <span className="text-[10px] font-bold uppercase tracking-wide" style={{ color: profile.color }}>{sub}</span>
                        <div className="flex gap-2 text-[9px] text-muted-foreground">
                          <span title="Perguntas">P: {subtypeCounts[sub] || 0}</span>
                          <span title="Profissões">C: {careerSubtypeCounts[sub] || 0}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── Stats Tab ───────────────────────────────────────────
const StatsAdmin = () => {
  const [testCount, setTestCount] = useState(getTestCount);

  const stats = [
    { label: "Total de perguntas", value: allQuestions.length, icon: <IconQuestionMark className="h-5 w-5" /> },
    { label: "Total de profissões", value: careerDetails.length, icon: <IconBriefcase className="h-5 w-5" /> },
    { label: "Tipos RIASEC", value: 6, icon: <IconCategory className="h-5 w-5" /> },
    { label: "Subtipos totais", value: 60, icon: <IconCategory className="h-5 w-5" /> },
    { label: "Testes realizados", value: testCount, icon: <IconChartBar className="h-5 w-5" /> },
  ];

  // Questions per pair
  const pairCounts: Record<string, number> = {};
  for (const q of allQuestions) {
    const key = `${q.yesType} × ${q.noType}`;
    pairCounts[key] = (pairCounts[key] || 0) + 1;
  }

  // Careers per type
  const careerTypeCounts: Record<string, number> = {};
  for (const c of careerDetails) {
    careerTypeCounts[c.type] = (careerTypeCounts[c.type] || 0) + 1;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">Estatísticas</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((s) => (
          <Card key={s.label} className="rounded-xl border border-border/50">
            <CardContent className="p-4 text-center space-y-1">
              <div className="mx-auto w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">{s.icon}</div>
              <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-xl border border-border/50">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-bold text-foreground">Perguntas por par antagônico</p>
          {Object.entries(pairCounts).map(([pair, count]) => (
            <div key={pair} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{pair}</span>
              <span className="font-bold text-foreground">{count}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-xl border border-border/50">
        <CardContent className="p-4 space-y-3">
          <p className="text-sm font-bold text-foreground">Profissões por tipo</p>
          {(Object.keys(riasecProfiles) as RiasecType[]).map((type) => {
            const profile = riasecProfiles[type];
            return (
              <div key={type} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: profile.color }} />
                  <span className="text-muted-foreground">{profile.name}</span>
                </div>
                <span className="font-bold text-foreground">{careerTypeCounts[type] || 0}</span>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Button
        variant="outline"
        className="rounded-full text-xs"
        onClick={() => {
          localStorage.setItem(STATS_KEY, "0");
          setTestCount(0);
        }}
      >
        Resetar contador de testes
      </Button>
    </div>
  );
};

// ─── Helper ──────────────────────────────────────────────
const TypeBadge = ({ type, label }: { type: RiasecType; label: string }) => {
  const profile = riasecProfiles[type];
  return (
    <span
      className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide"
      style={{ backgroundColor: profile.color + '22', color: profile.color, border: `1px solid ${profile.color}44` }}
    >
      {label}
    </span>
  );
};

// ─── Main Admin Component ────────────────────────────────
const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-foreground" style={{ fontFamily: "'Syne', sans-serif" }}>
              <span className="trampos-gradient">Trampo</span> <span className="text-muted-foreground font-semibold text-base">Admin</span>
            </h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }}
            className="text-muted-foreground"
          >
            <IconLogout className="h-4 w-4 mr-1" /> Sair
          </Button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        <Tabs defaultValue="perguntas">
          <TabsList className="w-full rounded-full bg-secondary/50 p-1 mb-6">
            <TabsTrigger value="perguntas" className="flex-1 rounded-full text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <IconQuestionMark className="h-3.5 w-3.5 mr-1" /> Perguntas
            </TabsTrigger>
            <TabsTrigger value="profissoes" className="flex-1 rounded-full text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <IconBriefcase className="h-3.5 w-3.5 mr-1" /> Profissões
            </TabsTrigger>
            <TabsTrigger value="tipos" className="flex-1 rounded-full text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <IconCategory className="h-3.5 w-3.5 mr-1" /> Tipos
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex-1 rounded-full text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <IconChartBar className="h-3.5 w-3.5 mr-1" /> Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perguntas"><QuestionsAdmin /></TabsContent>
          <TabsContent value="profissoes"><CareersAdmin /></TabsContent>
          <TabsContent value="tipos"><TypesAdmin /></TabsContent>
          <TabsContent value="stats"><StatsAdmin /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
