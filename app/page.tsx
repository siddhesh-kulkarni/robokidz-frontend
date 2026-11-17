"use client";

import { useEffect, useState } from "react";

import Header from "@/components/Header";
import CreateQuizForm from "@/components/CreateQuizForm";
import SavedQuizList from "@/components/SavedQuizList";
import QuizAttempt from "@/components/QuizAttempt";

import { createQuiz, getQuiz, getQuizzes } from "@/lib/api";
import type { QuizCreate, QuizDetail, QuizListItem } from "@/types/quiz";

export default function Home() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<QuizDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [openingQuiz, setOpeningQuiz] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadQuizzes();
  }, []);

  async function loadQuizzes() {
    try {
      const data = await getQuizzes();
      setQuizzes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load quizzes");
    } finally {
      setFetching(false);
    }
  }

  async function handleGenerateQuiz(payload: QuizCreate): Promise<boolean> {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const data = await createQuiz(payload);
      await loadQuizzes();
      setSuccess("Quiz saved successfully.");
      await openQuiz(data.quiz_id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate quiz");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function openQuiz(id: number) {
    setError("");
    setOpeningQuiz(true);

    try {
      const data = await getQuiz(id);
      setSelectedQuiz(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not open quiz");
    } finally {
      setOpeningQuiz(false);
    }
  }

  function handleBack() {
    setSelectedQuiz(null);
    setError("");
    setSuccess("");
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      <Header showBack={!!selectedQuiz} onBack={handleBack} />

      <div className="mx-auto max-w-6xl px-6 py-8">
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && !selectedQuiz && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {selectedQuiz ? (
          <QuizAttempt key={selectedQuiz.id} quiz={selectedQuiz} />
        ) : (
          <>
            <section className="mb-8">
              <h2 className="text-2xl font-bold">Lesson Quiz Generator</h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                Paste a lesson, generate a quiz for kids aged 8-14, then attempt
                it from the saved list.
              </p>
            </section>

            <div className="grid gap-5 md:grid-cols-2">
              <CreateQuizForm loading={loading} onGenerate={handleGenerateQuiz} />
              <SavedQuizList
                quizzes={quizzes}
                loading={fetching}
                openingQuiz={openingQuiz}
                onOpen={openQuiz}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
}
