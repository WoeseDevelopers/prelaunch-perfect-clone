import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";

type Screen = "landing" | "quiz" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleStart = () => setScreen("quiz");

  const handleComplete = (ans: Record<number, number>) => {
    setAnswers(ans);
    setScreen("results");
  };

  const handleRestart = () => {
    setAnswers({});
    setScreen("landing");
  };

  return (
    <main className="min-h-screen bg-background">
      {screen === "landing" && <LandingScreen onStart={handleStart} />}
      {screen === "quiz" && <QuizScreen onComplete={handleComplete} onBack={() => setScreen("landing")} />}
      {screen === "results" && <ResultsScreen answers={answers} onRestart={handleRestart} />}
    </main>
  );
};

export default Index;
