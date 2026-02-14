import React, { useState } from "react";
import { IconLock, IconLogout, IconQuestionMark, IconBriefcase, IconCategory, IconChartBar, IconSearch, IconEdit, IconCheck, IconX, IconChevronDown, IconChevronUp, IconRefresh, IconFileSpreadsheet } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allQuestions, riasecProfiles, type RiasecType, type Question, type RiasecProfile } from "@/data/quizQuestions";
import { careerDetails, type CareerDetail } from "@/data/careerDetails";
import { useAdminData, ALL_SUBTYPES, getTypeForSubtype } from "@/hooks/useAdminData";
import { toast } from "@/hooks/use-toast";
import ImportCareersModal from "@/components/ImportCareersModal";

const ADMIN_PASSWORD = "trampos2024";
const STATS_KEY = "trampos_test_count";
const RIASEC_TYPES: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];

function getTestCount(): number {
  try { return parseInt(localStorage.getItem(STATS_KEY) || "0", 10); } catch { return 0; }
}

// ─── Login Gate ──────────────────────────────────────────
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { sessionStorage.setItem("admin_auth", "1"); onLogin(); }
    else setError(true);
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
            <Input type="password" placeholder="Senha de acesso" value={pw} onChange={(e) => { setPw(e.target.value); setError(false); }} className={error ? "border-destructive" : ""} autoFocus />
            {error && <p className="text-xs text-destructive font-medium">Senha incorreta</p>}
            <Button type="submit" className="w-full rounded-full bg-primary text-primary-foreground">Entrar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// ─── Subtype Select ──────────────────────────────────────
const SubtypeSelect = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{label}</p>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 text-xs rounded-lg">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-60">
        {ALL_SUBTYPES.map(sub => (
          <SelectItem key={sub} value={sub} className="text-xs">
            {sub} ({getTypeForSubtype(sub)})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// ─── Questions Tab ───────────────────────────────────────
const QuestionsAdmin = ({ questions, updateQuestion, resetQuestions, profiles }: {
  questions: Question[];
  updateQuestion: (i: number, q: Question) => void;
  resetQuestions: () => void;
  profiles: Record<RiasecType, RiasecProfile>;
}) => {
  const [search, setSearch] = useState("");
  const [filterPair, setFilterPair] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ text: string; yesSub: string; noSub: string }>({ text: '', yesSub: '', noSub: '' });

  const pairs = [
    { label: "Todos", value: "all" },
    { label: "R × I", value: "R-I" }, { label: "I × R", value: "I-R" },
    { label: "A × C", value: "A-C" }, { label: "C × A", value: "C-A" },
    { label: "S × E", value: "S-E" }, { label: "E × S", value: "E-S" },
  ];

  const filtered = questions.filter((q) => {
    const matchSearch = !search || q.text.toLowerCase().includes(search.toLowerCase()) || q.id.toString().includes(search);
    const matchPair = filterPair === "all" || `${q.yesType}-${q.noType}` === filterPair;
    return matchSearch && matchPair;
  });

  const startEdit = (q: Question) => {
    setEditingId(q.id);
    setEditData({ text: q.text, yesSub: q.yesSub, noSub: q.noSub });
  };

  const saveEdit = (q: Question, idx: number) => {
    if (!editData.text.trim()) { toast({ title: "Erro", description: "Texto não pode ficar vazio", variant: "destructive" }); return; }
    const yesType = getTypeForSubtype(editData.yesSub);
    const noType = getTypeForSubtype(editData.noSub);
    if (!yesType || !noType) { toast({ title: "Erro", description: "Subtipo inválido", variant: "destructive" }); return; }
    updateQuestion(idx, { ...q, text: editData.text.trim(), yesSub: editData.yesSub, noSub: editData.noSub, yesType, noType });
    setEditingId(null);
    toast({ title: "Salvo", description: `Pergunta #${q.id} atualizada` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-foreground">Perguntas ({questions.length})</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={resetQuestions}>
            <IconRefresh className="h-3.5 w-3.5 mr-1" /> Resetar
          </Button>
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-60 rounded-full text-sm" />
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {pairs.map((p) => (
          <button key={p.value} onClick={() => setFilterPair(p.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${filterPair === p.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
            {p.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} resultados</p>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {filtered.map((q) => {
          const globalIdx = questions.findIndex(x => x.id === q.id);
          const isEditing = editingId === q.id;
          return (
            <Card key={q.id} className="rounded-xl border border-border/50">
              <CardContent className="p-0">
                <button onClick={() => { setExpandedId(expandedId === q.id ? null : q.id); if (editingId === q.id) setEditingId(null); }} className="w-full flex items-start gap-3 p-4 text-left">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-muted-foreground">{q.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground leading-relaxed">{q.text}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <TypeBadge type={q.yesType} label={`SIM → ${q.yesSub}`} profiles={profiles} />
                      <TypeBadge type={q.noType} label={`NÃO → ${q.noSub}`} profiles={profiles} />
                    </div>
                  </div>
                  {expandedId === q.id ? <IconChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" /> : <IconChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
                </button>
                {expandedId === q.id && (
                  <div className="px-4 pb-4 pt-0 border-t border-border/50 mt-0">
                    {isEditing ? (
                      <div className="space-y-3 pt-3">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Texto da pergunta</p>
                          <Textarea value={editData.text} onChange={(e) => setEditData(d => ({ ...d, text: e.target.value }))} className="text-sm min-h-[60px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <SubtypeSelect label="Subtipo SIM" value={editData.yesSub} onChange={(v) => setEditData(d => ({ ...d, yesSub: v }))} />
                          <SubtypeSelect label="Subtipo NÃO" value={editData.noSub} onChange={(v) => setEditData(d => ({ ...d, noSub: v }))} />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="rounded-full text-xs" onClick={() => saveEdit(q, globalIdx)}>
                            <IconCheck className="h-3.5 w-3.5 mr-1" /> Salvar
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => setEditingId(null)}>
                            <IconX className="h-3.5 w-3.5 mr-1" /> Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="pt-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Resposta SIM</p>
                            <p className="text-sm font-bold" style={{ color: profiles[q.yesType].color }}>{profiles[q.yesType].name} ({q.yesType})</p>
                            <p className="text-xs text-foreground">Subtipo: <span className="font-bold">{q.yesSub}</span></p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Resposta NÃO</p>
                            <p className="text-sm font-bold" style={{ color: profiles[q.noType].color }}>{profiles[q.noType].name} ({q.noType})</p>
                            <p className="text-xs text-foreground">Subtipo: <span className="font-bold">{q.noSub}</span></p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full text-xs mt-3" onClick={(e) => { e.stopPropagation(); startEdit(q); }}>
                          <IconEdit className="h-3.5 w-3.5 mr-1" /> Editar
                        </Button>
                      </div>
                    )}
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

// ─── Careers Tab ──────────────────────────────────────────
const CareersAdmin = ({ careers, updateCareer, resetCareers, replaceCareers, profiles }: {
  careers: CareerDetail[];
  updateCareer: (i: number, c: CareerDetail) => void;
  resetCareers: () => void;
  replaceCareers: (newCareers: CareerDetail[]) => void;
  profiles: Record<RiasecType, RiasecProfile>;
}) => {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editData, setEditData] = useState<{ name: string; description: string; strengths: string; weaknesses: string; type: RiasecType; subs: string[] }>({ name: '', description: '', strengths: '', weaknesses: '', type: 'R', subs: [] });
  const [importOpen, setImportOpen] = useState(false);

  const types = [
    { label: "Todos", value: "all" },
    ...(RIASEC_TYPES.map((t) => ({ label: `${profiles[t].name} (${t})`, value: t }))),
  ];

  const filtered = careers.filter((c) => {
    const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || c.type === filterType;
    return matchSearch && matchType;
  });

  const startEdit = (c: CareerDetail, idx: number) => {
    setEditingIdx(idx);
    setEditData({
      name: c.name, description: c.description, strengths: c.strengths, weaknesses: c.weaknesses,
      type: c.type, subs: c.relatedSubtypes.map(s => s.label),
    });
  };

  const saveEdit = (idx: number) => {
    if (!editData.name.trim()) { toast({ title: "Erro", description: "Nome não pode ficar vazio", variant: "destructive" }); return; }
    const uniqueSubs = new Set(editData.subs);
    if (uniqueSubs.size !== 4) { toast({ title: "Erro", description: "4 subtipos sem duplicatas", variant: "destructive" }); return; }
    for (const sub of editData.subs) {
      if (!getTypeForSubtype(sub)) { toast({ title: "Erro", description: `Subtipo inválido: ${sub}`, variant: "destructive" }); return; }
    }
    const relatedSubtypes = editData.subs.map(label => ({ label, type: getTypeForSubtype(label)! }));
    updateCareer(idx, { name: editData.name.trim(), description: editData.description.trim(), strengths: editData.strengths.trim(), weaknesses: editData.weaknesses.trim(), type: editData.type, relatedSubtypes });
    setEditingIdx(null);
    toast({ title: "Salvo", description: `Profissão "${editData.name}" atualizada` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-lg font-bold text-foreground">Profissões ({careers.length})</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={resetCareers}>
            <IconRefresh className="h-3.5 w-3.5 mr-1" /> Resetar
          </Button>
          <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => setImportOpen(true)}>
            <IconFileSpreadsheet className="h-3.5 w-3.5 mr-1" /> Importar Planilha
          </Button>
          <div className="relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-60 rounded-full text-sm" />
          </div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {types.map((t) => (
          <button key={t.value} onClick={() => setFilterType(t.value)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${filterType === t.value ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"}`}>
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} resultados</p>

      <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
        {filtered.map((career) => {
          const globalIdx = careers.indexOf(career);
          const isEditing = editingIdx === globalIdx;
          const profile = profiles[career.type];
          return (
            <Card key={globalIdx} className="rounded-xl border border-border/50">
              <CardContent className="p-0">
                <button onClick={() => { setExpandedIdx(expandedIdx === globalIdx ? null : globalIdx); if (editingIdx === globalIdx) setEditingIdx(null); }} className="w-full flex items-start gap-3 p-4 text-left">
                  <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: profile.color }}>{career.type}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground">{career.name}</p>
                    <div className="flex gap-1.5 mt-1.5 flex-wrap">
                      {career.relatedSubtypes.map((sub, si) => (
                        <span key={si} className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: profiles[sub.type].color + '22', color: profiles[sub.type].color, border: `1px solid ${profiles[sub.type].color}44` }}>{sub.label}</span>
                      ))}
                    </div>
                  </div>
                  {expandedIdx === globalIdx ? <IconChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" /> : <IconChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
                </button>
                {expandedIdx === globalIdx && (
                  <div className="px-4 pb-4 pt-0 border-t border-border/50 space-y-3">
                    {isEditing ? (
                      <div className="space-y-3 pt-3">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Nome</p>
                          <Input value={editData.name} onChange={(e) => setEditData(d => ({ ...d, name: e.target.value }))} className="text-sm h-8" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Descrição</p>
                          <Textarea value={editData.description} onChange={(e) => setEditData(d => ({ ...d, description: e.target.value }))} className="text-sm min-h-[60px]" />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Ponto Forte</p>
                            <Textarea value={editData.strengths} onChange={(e) => setEditData(d => ({ ...d, strengths: e.target.value }))} className="text-sm min-h-[50px]" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Ponto Fraco</p>
                            <Textarea value={editData.weaknesses} onChange={(e) => setEditData(d => ({ ...d, weaknesses: e.target.value }))} className="text-sm min-h-[50px]" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Tipo RIASEC</p>
                          <Select value={editData.type} onValueChange={(v) => setEditData(d => ({ ...d, type: v as RiasecType }))}>
                            <SelectTrigger className="h-8 text-xs rounded-lg w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {RIASEC_TYPES.map(t => <SelectItem key={t} value={t} className="text-xs">{profiles[t].name} ({t})</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {['Dominante 1', 'Dominante 2', 'Secundário 1', 'Secundário 2'].map((label, i) => (
                            <SubtypeSelect key={label} label={label} value={editData.subs[i] || ''} onChange={(v) => setEditData(d => {
                              const subs = [...d.subs];
                              subs[i] = v;
                              return { ...d, subs };
                            })} />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="rounded-full text-xs" onClick={() => saveEdit(globalIdx)}>
                            <IconCheck className="h-3.5 w-3.5 mr-1" /> Salvar
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => setEditingIdx(null)}>
                            <IconX className="h-3.5 w-3.5 mr-1" /> Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
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
                                <span className="text-[8px] font-bold text-muted-foreground uppercase">{si < 2 ? `Dom. ${si + 1}` : `Sec. ${si - 1}`}</span>
                                <span className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white" style={{ backgroundColor: profiles[sub.type].color }}>{sub.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={(e) => { e.stopPropagation(); startEdit(career, globalIdx); }}>
                          <IconEdit className="h-3.5 w-3.5 mr-1" /> Editar
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
      <ImportCareersModal
        open={importOpen}
        onOpenChange={setImportOpen}
        onConfirm={(newCareers) => {
          replaceCareers(newCareers);
          toast({ title: "Importado", description: `${newCareers.length} profissões importadas com sucesso.` });
        }}
      />
    </div>
  );
};

// ─── Types/Subtypes Tab ──────────────────────────────────
const TypesAdmin = ({ questions, careers, profiles, updateProfile, resetProfiles }: {
  questions: Question[];
  careers: CareerDetail[];
  profiles: Record<RiasecType, RiasecProfile>;
  updateProfile: (t: RiasecType, p: RiasecProfile) => void;
  resetProfiles: () => void;
}) => {
  const typeOrder: RiasecType[] = ['R', 'I', 'A', 'S', 'E', 'C'];
  const [editingType, setEditingType] = useState<RiasecType | null>(null);
  const [editData, setEditData] = useState<{ name: string; description: string; color: string; subdivisions: string[] }>({ name: '', description: '', color: '', subdivisions: [] });

  const subtypeCounts: Record<string, number> = {};
  for (const q of questions) { subtypeCounts[q.yesSub] = (subtypeCounts[q.yesSub] || 0) + 1; subtypeCounts[q.noSub] = (subtypeCounts[q.noSub] || 0) + 1; }

  const careerSubtypeCounts: Record<string, number> = {};
  for (const c of careers) { for (const sub of c.relatedSubtypes) { careerSubtypeCounts[sub.label] = (careerSubtypeCounts[sub.label] || 0) + 1; } }

  const startEdit = (type: RiasecType) => {
    const p = profiles[type];
    setEditingType(type);
    setEditData({ name: p.name, description: p.description, color: p.color, subdivisions: [...p.subdivisions] });
  };

  const saveEdit = (type: RiasecType) => {
    if (!editData.name.trim()) { toast({ title: "Erro", description: "Nome não pode ficar vazio", variant: "destructive" }); return; }
    if (editData.subdivisions.some(s => !s.trim())) { toast({ title: "Erro", description: "Nenhum subtipo pode ficar vazio", variant: "destructive" }); return; }
    if (new Set(editData.subdivisions).size !== 10) { toast({ title: "Erro", description: "10 subtipos únicos necessários", variant: "destructive" }); return; }
    updateProfile(type, { ...profiles[type], name: editData.name.trim(), description: editData.description.trim(), color: editData.color, subdivisions: editData.subdivisions.map(s => s.trim().toUpperCase()) });
    setEditingType(null);
    toast({ title: "Salvo", description: `Tipo ${type} atualizado` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Tipos & Subtipos RIASEC</h2>
          <p className="text-xs text-muted-foreground">6 tipos × 10 subtipos = 60 subtipos totais</p>
        </div>
        <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={resetProfiles}>
          <IconRefresh className="h-3.5 w-3.5 mr-1" /> Resetar
        </Button>
      </div>

      <div className="space-y-4">
        {typeOrder.map((type) => {
          const profile = profiles[type];
          const isEditing = editingType === type;
          const questionsForType = questions.filter((q) => q.yesType === type || q.noType === type).length;
          const careersForType = careers.filter((c) => c.type === type).length;

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
                  {!isEditing && (
                    <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => startEdit(type)}>
                      <IconEdit className="h-3.5 w-3.5 mr-1" /> Editar
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="px-4 pb-4 pt-2 space-y-3 border-t border-border/50">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Nome</p>
                        <Input value={editData.name} onChange={(e) => setEditData(d => ({ ...d, name: e.target.value }))} className="text-sm h-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Cor</p>
                        <div className="flex gap-2 items-center">
                          <input type="color" value={editData.color.startsWith('hsl') ? '#22c55e' : editData.color} onChange={(e) => setEditData(d => ({ ...d, color: e.target.value }))} className="w-8 h-8 rounded border cursor-pointer" />
                          <Input value={editData.color} onChange={(e) => setEditData(d => ({ ...d, color: e.target.value }))} className="text-xs h-8 flex-1" placeholder="hsl(142, 71%, 45%)" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Descrição</p>
                      <Textarea value={editData.description} onChange={(e) => setEditData(d => ({ ...d, description: e.target.value }))} className="text-sm min-h-[60px]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Subtipos (10)</p>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {editData.subdivisions.map((sub, i) => (
                          <Input key={i} value={sub} onChange={(e) => setEditData(d => {
                            const subs = [...d.subdivisions];
                            subs[i] = e.target.value;
                            return { ...d, subdivisions: subs };
                          })} className="text-xs h-8 uppercase" />
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" className="rounded-full text-xs" onClick={() => saveEdit(type)}>
                        <IconCheck className="h-3.5 w-3.5 mr-1" /> Salvar
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-full text-xs" onClick={() => setEditingType(null)}>
                        <IconX className="h-3.5 w-3.5 mr-1" /> Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
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
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// ─── Stats Tab ───────────────────────────────────────────
const StatsAdmin = ({ questions, careers, profiles }: {
  questions: Question[];
  careers: CareerDetail[];
  profiles: Record<RiasecType, RiasecProfile>;
}) => {
  const [testCount, setTestCount] = useState(getTestCount);

  const stats = [
    { label: "Total de perguntas", value: questions.length, icon: <IconQuestionMark className="h-5 w-5" /> },
    { label: "Total de profissões", value: careers.length, icon: <IconBriefcase className="h-5 w-5" /> },
    { label: "Tipos RIASEC", value: 6, icon: <IconCategory className="h-5 w-5" /> },
    { label: "Subtipos totais", value: 60, icon: <IconCategory className="h-5 w-5" /> },
    { label: "Testes realizados", value: testCount, icon: <IconChartBar className="h-5 w-5" /> },
  ];

  const pairCounts: Record<string, number> = {};
  for (const q of questions) { const key = `${q.yesType} × ${q.noType}`; pairCounts[key] = (pairCounts[key] || 0) + 1; }

  const careerTypeCounts: Record<string, number> = {};
  for (const c of careers) { careerTypeCounts[c.type] = (careerTypeCounts[c.type] || 0) + 1; }

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
          {RIASEC_TYPES.map((type) => {
            const profile = profiles[type];
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
      <Button variant="outline" className="rounded-full text-xs" onClick={() => { localStorage.setItem(STATS_KEY, "0"); setTestCount(0); }}>
        Resetar contador de testes
      </Button>
    </div>
  );
};

// ─── Helper ──────────────────────────────────────────────
const TypeBadge = ({ type, label, profiles }: { type: RiasecType; label: string; profiles: Record<RiasecType, RiasecProfile> }) => {
  const profile = profiles[type];
  return (
    <span className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide" style={{ backgroundColor: profile.color + '22', color: profile.color, border: `1px solid ${profile.color}44` }}>
      {label}
    </span>
  );
};

// ─── Main Admin Component ────────────────────────────────
const Admin = () => {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("admin_auth") === "1");
  const { questions, careers, profiles, updateQuestion, updateCareer, updateProfile, resetQuestions, resetCareers, resetProfiles, replaceCareers } = useAdminData();

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
          <Button variant="ghost" size="sm" onClick={() => { sessionStorage.removeItem("admin_auth"); setAuthed(false); }} className="text-muted-foreground">
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

          <TabsContent value="perguntas">
            <QuestionsAdmin questions={questions} updateQuestion={updateQuestion} resetQuestions={resetQuestions} profiles={profiles} />
          </TabsContent>
          <TabsContent value="profissoes">
            <CareersAdmin careers={careers} updateCareer={updateCareer} resetCareers={resetCareers} replaceCareers={replaceCareers} profiles={profiles} />
          </TabsContent>
          <TabsContent value="tipos">
            <TypesAdmin questions={questions} careers={careers} profiles={profiles} updateProfile={updateProfile} resetProfiles={resetProfiles} />
          </TabsContent>
          <TabsContent value="stats">
            <StatsAdmin questions={questions} careers={careers} profiles={profiles} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
