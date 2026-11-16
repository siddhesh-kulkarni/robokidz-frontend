
"use client";

import { useState } from "react";
import { BookOpen, Plus, Sparkles } from "lucide-react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [age, setAge] = useState("10");
  const [lessonText, setLessonText] = useState("");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-600 p-2 text-white">
              <BookOpen size={23} />
            </div>
            <div>
              <h1 className="text-xl font-bold">RoboKidz</h1>
              <p className="text-xs text-gray-500">
                AI Quiz Generator
              </p>
            </div>
          </div>

          <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
            Teacher Dashboard
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Welcome */}
        <section className="mb-10">
          <p className="mb-2 text-sm font-semibold text-indigo-600">
            WELCOME TO ROBOKIDZ
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Create engaging quizzes for your students.
          </h2>
          <p className="mt-3 max-w-2xl text-gray-500">
            Turn your lesson content into interactive multiple-choice
            quizzes with the help of AI.
          </p>
        </section>

        {/* Main Content */}
        <div className="grid gap-6 md:grid-cols-2">

          {/* Create Quiz */}
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

            <form className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Quiz Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter quiz title"
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
                  {Array.from({ length: 7 }, (_, i) => i + 8).map((n) => (
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
                    {lessonText.length}/5000
                  </span>
                </div>
                <textarea
                  value={lessonText}
                  onChange={(e) => setLessonText(e.target.value)}
                  placeholder="Paste your lesson content here..."
                  rows={8}
                  className="w-full resize-y rounded-lg border px-4 py-3 text-sm outline-none focus:border-indigo-500"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Minimum 50 and maximum 5000 characters.
                </p>
              </div>

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
              >
                <Sparkles size={18} />
                Generate Quiz
              </button>
            </form>
          </section>

          {/* Saved Quizzes */}
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Saved Quizzes</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your previously created quizzes
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
                0
              </span>
            </div>

            <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 px-5 text-center">
              <div className="mb-4 rounded-full bg-indigo-50 p-4 text-indigo-500">
                <BookOpen size={28} />
              </div>

              <h4 className="font-semibold">No quizzes yet</h4>
              <p className="mt-2 max-w-xs text-sm text-gray-500">
                Your generated quizzes will appear here. Create your
                first quiz to get started.
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-white py-5 text-center text-sm text-gray-400">
        © 2026 RoboKidz Eduventures Ltd.
      </footer>
    </main>
  );
}
