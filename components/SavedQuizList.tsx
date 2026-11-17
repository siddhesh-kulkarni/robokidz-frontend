"use client";

import { BookOpen, Calendar, Loader2 } from "lucide-react";
import type { QuizListItem } from "@/types/quiz";

interface SavedQuizListProps {
  quizzes: QuizListItem[];
  loading: boolean;
  openingQuiz: boolean;
  onOpen: (id: number) => void;
}

export default function SavedQuizList({
  quizzes,
  loading,
  openingQuiz,
  onOpen,
}: SavedQuizListProps) {
  return (
    <section className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Saved Quizzes</h3>
          <p className="text-sm text-gray-500">Click one to open and attempt</p>
        </div>
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium">
          {quizzes?.length}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-16 text-sm text-gray-400">
          <Loader2 size={16} className="animate-spin" />
          Loading...
        </div>
      ) : quizzes?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 rounded-full bg-blue-50 p-3 text-blue-500">
            <BookOpen size={24} />
          </div>
          <p className="text-sm text-gray-400">
            No quizzes yet. Create one from the form.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {quizzes?.map?.((quiz) => (
            <button
              key={`${quiz?.id}-${quiz?.title}`}
              onClick={() => onOpen(quiz?.id)}
              disabled={openingQuiz}
              className="flex w-full cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-left text-sm hover:border-blue-400 hover:bg-blue-50 disabled:opacity-50"
            >
              <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
                <BookOpen size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{quiz?.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                  <Calendar size={12} />
                  {new Date(quiz?.created_at)?.toLocaleString()}
                </p>
              </div>
              <span className="cursor-pointer text-blue-600">Open</span>
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
