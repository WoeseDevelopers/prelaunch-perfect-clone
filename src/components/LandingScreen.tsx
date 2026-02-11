import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface LandingScreenProps {
  onStart: () => void;
}

const LandingScreen = ({ onStart }: LandingScreenProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="trampos-gradient">Trampos</span>
          </h1>
          <p className="mt-1 text-2xl font-semibold text-muted-foreground">Game</p>
        </div>

        <Card className="animate-fade-in-up-delay rounded-2xl border border-border/50 shadow-lg">
          <CardContent className="p-8 space-y-5">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="h-5 w-5 text-[hsl(var(--trampos-purple))]" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Teste Vocacional
              </span>
            </div>

            <p className="text-base leading-relaxed text-foreground/80">
              Descubra qual perfil profissional combina mais com você! Responda 18 perguntas
              rápidas e veja seus resultados no modelo RIASEC.
            </p>

            <Button
              onClick={onStart}
              className="w-full rounded-full bg-[hsl(var(--trampos-purple))] text-lg font-semibold text-white transition-transform hover:scale-105 hover:bg-[hsl(var(--trampos-purple))]/90 h-12"
            >
              Começar 🚀
            </Button>

            <p className="text-xs text-muted-foreground">
              Leva menos de 3 minutos • Sem cadastro
            </p>
          </CardContent>
        </Card>

        <p className="animate-fade-in-up-delay-2 text-xs text-muted-foreground/60">
          Baseado no modelo RIASEC de John Holland
        </p>
      </div>
    </div>
  );
};

export default LandingScreen;
