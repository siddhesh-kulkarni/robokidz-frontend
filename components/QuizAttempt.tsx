"use client";

import { useState } from "react";
import { CheckCircle, Trophy } from "lucide-react";
import type { QuizDetail } from "@/types/quiz";

interface QuizAttemptProps {
  quiz: QuizDetail;
}

export default function QuizAttempt({ quiz }: QuizAttemptProps) {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const score = quiz?.questions?.filter(
    (q) => answers[q?.id] === q?.correct_answer
  )?.length;

  const allAnswered = Object.keys(answers)?.length === quiz?.questions?.length;

  function tryAgain() {
    setAnswers({});
    setSubmitted(false);
  }

  if (submitted) {
    return (
      <section className="mx-auto max-w-xl rounded-xl border bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-50 text-yellow-500">
          <Trophy size={32} />
        </div>
        <h2 className="text-2xl font-bold">Quiz Completed</h2>
        <p className="mt-4 text-4xl font-bold text-blue-600">
          {score} / {quiz?.questions?.length}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Score: {Math.round((score / quiz?.questions?.length) * 100)}%
        </p>
        <button
          onClick={tryAgain}
          className="mt-6 rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{quiz?.title}</h2>
        <p className="mt-1 text-sm text-gray-500">
          Age {quiz?.age} · {quiz?.questions?.length} questions
        </p>
      </div>

      {quiz?.questions?.map?.((question, index) => (
        <div key={`${question?.id}-${question?.question_text}`} className="mb-4 rounded-xl border bg-white p-5 shadow-sm">
          <p className="mb-2 text-xs font-medium text-blue-600">
            Question {index + 1} of {quiz?.questions?.length}
          </p>
          <h3 className="mb-4 text-base font-semibold">{question?.question_text}</h3>

          <div className="grid gap-2 sm:grid-cols-2">
            {question?.options?.map?.((option, optionIndex) => {
              const selected = answers[question?.id] === option;

              return (
                <button
                  key={optionIndex}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [question?.id]: option }))
                  }
                  className={`flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 text-left text-sm ${
                    selected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                      selected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <p className="mb-3 text-sm text-gray-500">
          Answered {Object.keys(answers)?.length} / {quiz?.questions?.length}
        </p>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!allAnswered}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle size={16} />
          Submit Answers
        </button>
      </div>
    </section>
  );
}
