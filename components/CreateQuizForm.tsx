
"use client";

import { useState, type FormEvent } from "react";
import { Plus, Sparkles, Loader2 } from "lucide-react";
import type { QuizCreate } from "@/types/quiz";

interface CreateQuizFormProps {
  loading: boolean;
  onGenerate: (data: QuizCreate) => Promise<boolean>;
}

export default function CreateQuizForm({
  loading,
  onGenerate,
}: CreateQuizFormProps) {
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("10");
  const [lessonText, setLessonText] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (title?.trim()?.length === 0) {
      setError("Please enter a quiz title.");
      return;
    }

    if (lessonText?.trim()?.length < 50) {
      setError("Lesson content must contain at least 50 characters.");
      return;
    }

    if (lessonText?.length > 5000) {
      setError("Lesson content cannot exceed 5000 characters.");
      return;
    }

    await onGenerate({
      title: title?.trim(),
      age: Number(age),
      lesson_text: lessonText,
    });

    setTitle("");
    setAge("10");
    setLessonText("");
  }

  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
          <Plus size={21} />
        </div>

        <div>
          <h3 className="font-semibold">Create New Quiz</h3>
          <p className="text-sm text-gray-500">
            Enter your lesson details
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Quiz Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
            maxLength={150}
            required
            className="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Student Age
          </label>

          <select
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
          >
            {Array.from({ length: 7 }, (_, i) => i + 8)?.map?.((n) => (
              <option key={n} value={n}>
                {n} years
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-sm font-medium">
              Lesson Content
            </label>

            <span className="text-xs text-gray-400">
              {lessonText?.length}/5000
            </span>
          </div>

          <textarea
            value={lessonText}
            onChange={(e) => setLessonText(e.target.value)}
            placeholder="Paste your lesson content here..."
            rows={8}
            maxLength={5000}
            required
            className="w-full resize-y rounded-lg border px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />

          <p className="mt-2 text-xs text-gray-400">
            Minimum 50 and maximum 5000 characters.
          </p>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate Quiz
            </>
          )}
        </button>
      </form>
    </section>
  );
}
