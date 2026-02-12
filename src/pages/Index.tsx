import { useState } from "react";
import LandingScreen from "@/components/LandingScreen";
import QuizScreen from "@/components/QuizScreen";
import ResultsScreen from "@/components/ResultsScreen";
import type { Question } from "@/data/quizQuestions";

type Screen = "landing" | "quiz" | "results";

const Index = () => {
  const [screen, setScreen] = useState<Screen>("landing");
  const [answers, setAnswers] = useState<Record<number, 'yes' | 'no'>>({});
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>([]);

  const handleStart = () => setScreen("quiz");

  const handleComplete = (ans: Record<number, 'yes' | 'no'>, questions: Question[]) => {
    setAnswers(ans);
    setSessionQuestions(questions);
    setScreen("results");
  };

  const handleRestart = () => {
    setAnswers({});
    setSessionQuestions([]);
    setScreen("landing");
  };

  return (
    <main className="min-h-screen bg-background">
      {screen === "landing" && <LandingScreen onStart={handleStart} />}
      {screen === "quiz" && <QuizScreen onComplete={handleComplete} onBack={() => setScreen("landing")} />}
      {screen === "results" && <ResultsScreen answers={answers} sessionQuestions={sessionQuestions} onRestart={handleRestart} />}
    </main>
  );
};

export default Index;
