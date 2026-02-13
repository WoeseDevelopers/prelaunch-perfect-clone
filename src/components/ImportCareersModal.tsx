import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconUpload, IconAlertTriangle, IconCheck } from '@tabler/icons-react';
import { subtypeTypeMap, type CareerDetail } from '@/data/careerDetails';

const REQUIRED_COLS = ['Profissão', 'Descrição', 'Subtipo Dominante 1', 'Subtipo Dominante 2', 'Subtipo Secundário 1', 'Subtipo Secundário 2'];
const OPTIONAL_COLS = ['Ponto Forte', 'Ponto Fraco'];

interface ImportCareersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (careers: CareerDetail[]) => void;
}

interface ParseResult {
  careers: CareerDetail[];
  errors: string[];
  raw: Record<string, string>[];
}

function parseFile(file: File): Promise<ParseResult> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json<Record<string, string>>(sheet, { defval: '' });

        if (rows.length === 0) {
          resolve({ careers: [], errors: ['Arquivo vazio ou sem dados.'], raw: [] });
          return;
        }

        const headers = Object.keys(rows[0]);
        const missing = REQUIRED_COLS.filter(col => !headers.includes(col));
        if (missing.length > 0) {
          resolve({ careers: [], errors: [`Colunas obrigatórias faltando: ${missing.join(', ')}`], raw: [] });
          return;
        }

        const careers: CareerDetail[] = [];
        const errors: string[] = [];

        rows.forEach((row, i) => {
          const lineNum = i + 2; // header is line 1
          const name = String(row['Profissão'] || '').trim();
          const description = String(row['Descrição'] || '').trim();
          const d1 = String(row['Subtipo Dominante 1'] || '').trim().toUpperCase();
          const d2 = String(row['Subtipo Dominante 2'] || '').trim().toUpperCase();
          const s1 = String(row['Subtipo Secundário 1'] || '').trim().toUpperCase();
          const s2 = String(row['Subtipo Secundário 2'] || '').trim().toUpperCase();
          const strengths = String(row['Ponto Forte'] || '').trim();
          const weaknesses = String(row['Ponto Fraco'] || '').trim();

          const lineErrors: string[] = [];
          if (!name) lineErrors.push('Profissão vazia');
          if (!description) lineErrors.push('Descrição vazia');

          const subs = [d1, d2, s1, s2];
          const emptySubs = subs.filter(s => !s);
          if (emptySubs.length > 0) lineErrors.push(`${emptySubs.length} subtipo(s) vazio(s)`);

          const unique = new Set(subs.filter(s => s));
          if (unique.size < subs.filter(s => s).length) lineErrors.push('Subtipos duplicados');

          for (const sub of subs) {
            if (sub && !subtypeTypeMap[sub]) lineErrors.push(`Subtipo desconhecido: "${sub}"`);
          }

          if (lineErrors.length > 0) {
            errors.push(`Linha ${lineNum}: ${lineErrors.join('; ')}`);
          } else {
            const type = subtypeTypeMap[d1]!;
            careers.push({
              name,
              type,
              description,
              strengths,
              weaknesses,
              relatedSubtypes: subs.map(label => ({ label, type: subtypeTypeMap[label]! })),
            });
          }
        });

        resolve({ careers, errors, raw: rows.slice(0, 5) });
      } catch {
        resolve({ careers: [], errors: ['Erro ao ler arquivo. Verifique o formato.'], raw: [] });
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

const ImportCareersModal: React.FC<ImportCareersModalProps> = ({ open, onOpenChange, onConfirm }) => {
  const [result, setResult] = useState<ParseResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setLoading(true);
    const res = await parseFile(file);
    setTotalRows(res.careers.length + res.errors.length);
    setResult(res);
    setLoading(false);
  };

  const handleConfirm = () => {
    if (result && result.careers.length > 0 && result.errors.length === 0) {
      onConfirm(result.careers);
      handleClose();
    }
  };

  const handleClose = () => {
    setResult(null);
    setFileName('');
    setTotalRows(0);
    if (inputRef.current) inputRef.current.value = '';
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
            Importar Planilha de Profissões
          </DialogTitle>
          <DialogDescription>
            Aceita arquivos .xlsx, .xls e .csv. A importação substituirá 100% da base atual.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={() => inputRef.current?.click()}>
              <IconUpload className="h-3.5 w-3.5 mr-1" /> Escolher arquivo
            </Button>
            <input ref={inputRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleFile} className="hidden" />
            {fileName && <span className="text-xs text-muted-foreground truncate">{fileName}</span>}
          </div>

          {loading && <p className="text-sm text-muted-foreground">Processando...</p>}

          {result && result.errors.length > 0 && (
            <Alert variant="destructive">
              <IconAlertTriangle className="h-4 w-4" />
              <AlertTitle>Erros encontrados ({result.errors.length})</AlertTitle>
              <AlertDescription>
                <ScrollArea className="max-h-32">
                  <ul className="list-disc pl-4 space-y-0.5">
                    {result.errors.map((err, i) => (
                      <li key={i} className="text-xs">{err}</li>
                    ))}
                  </ul>
                </ScrollArea>
              </AlertDescription>
            </Alert>
          )}

          {result && result.errors.length === 0 && result.careers.length > 0 && (
            <>
              <Alert>
                <IconCheck className="h-4 w-4" />
                <AlertTitle>{result.careers.length} profissões válidas</AlertTitle>
                <AlertDescription className="text-xs">
                  Preview das 5 primeiras linhas (total: {totalRows})
                </AlertDescription>
              </Alert>

              <ScrollArea className="flex-1 border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Profissão</TableHead>
                      <TableHead className="text-xs">Tipo</TableHead>
                      <TableHead className="text-xs">D1</TableHead>
                      <TableHead className="text-xs">D2</TableHead>
                      <TableHead className="text-xs">S1</TableHead>
                      <TableHead className="text-xs">S2</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.careers.slice(0, 5).map((c, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-xs font-medium">{c.name}</TableCell>
                        <TableCell className="text-xs">{c.type}</TableCell>
                        <TableCell className="text-xs">{c.relatedSubtypes[0]?.label}</TableCell>
                        <TableCell className="text-xs">{c.relatedSubtypes[1]?.label}</TableCell>
                        <TableCell className="text-xs">{c.relatedSubtypes[2]?.label}</TableCell>
                        <TableCell className="text-xs">{c.relatedSubtypes[3]?.label}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" className="rounded-full text-xs" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            size="sm"
            className="rounded-full text-xs"
            onClick={handleConfirm}
            disabled={!result || result.errors.length > 0 || result.careers.length === 0}
          >
            <IconCheck className="h-3.5 w-3.5 mr-1" /> Confirmar importação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportCareersModal;
