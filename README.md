# Frontend – RoboKidz Quiz Generator

Next.js (React) UI for creating quizzes from lesson text, listing saved quizzes, and attempting them.

The frontend **does not call Groq**. It only talks to the FastAPI backend.

## Folder structure (open-source React stack)

```
robokidz-frontend/
  app/
    page.tsx          # main screen: create + list + attempt
    layout.tsx        # root HTML / fonts / title
    globals.css       # Tailwind
  components/
    Header.tsx
    CreateQuizForm.tsx
    SavedQuizList.tsx
    QuizAttempt.tsx
  lib/api.ts          # fetch helpers to backend
  types/quiz.ts       # TypeScript types
  .env.example
  package.json
```

### Open-source pieces used

| Library | Used for |
|---------|----------|
| **Next.js** | App router / React framework |
| **React** | UI components |
| **Tailwind CSS** | Layout, cards, buttons |
| **Lucide React** | Icons (`BookOpen`, `Sparkles`, `Loader2`, `Trophy`, …) |
| **TypeScript** | Typed props and API responses |

Custom UI is small components on top of those libs (no closed design system required).

## Setup & run

1. Make sure the **backend** is running on port 8000  
   (see `../robokidz-backend/README.md`)

2. Start frontend:

```bash
cd robokidz-frontend
copy .env.example .env
npm install
npm run dev
```

`.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Open http://localhost:3000

## How to test

### Manual UI test

1. Open http://localhost:3000  
2. Enter **title**, **age** (8–14), **lesson** (≥ 50 characters)  
3. Click **Generate Quiz**  
   - Button shows loading / is disabled while waiting  
4. Quiz should open for attempt; also appear in **Saved Quizzes**  
5. Answer all questions → **Submit Answers** → see score  
6. **Back to Dashboard** → list still loads  
7. Click another saved quiz → opens correctly  

### Error cases to try

- Lesson shorter than 50 chars → form error (client-side)  
- Backend down → error banner from `lib/api.ts`  
- Invalid id / deleted quiz → open fails with message  

### Build check (optional)

```bash
npm run build
```

## Screen flow

```
page.tsx
  ├─ CreateQuizForm  → createQuiz() → POST /api/quizzes
  ├─ SavedQuizList   → getQuizzes() → GET /api/quizzes
  └─ QuizAttempt     → getQuiz(id)  → GET /api/quizzes/{id}
                       score answers locally in the browser
```

State owned by `app/page.tsx`:

- `quizzes` – list  
- `selectedQuiz` – null = dashboard, set = attempt view  
- `loading` / `fetching` / `openingQuiz` – spinners  
- `error` / `success` – banners  

## Where AI is used

### In the product

- **Not in the frontend.**  
- Quiz generation happens only in the backend:  
  `../robokidz-backend/app/services/ai_model_llm.py`  
- This app only calls our API (`lib/api.ts`).

### AI coding tools while building

I used ChatGPT / VS Code Copilot for:

1. Next.js + Tailwind layout ideas  
2. Small React component structure (form / list / attempt)  
3. Lucide icon usage  
4. Fetch error handling against FastAPI `detail`  
5. README wording  

I wrote / edited the final UI code myself so it stays simple.

## Design decisions

- One page for create + list + attempt (simple for take-home)  
- Client-side form checks for fast UX; backend still validates  
- Score calculated in browser after submit  
- Open-source stack: Next.js, React, Tailwind, Lucide  

## What I would improve later

- Show correct / incorrect answers after submit  
- Dedicated route `/quiz/[id]` instead of in-page state  
- Pagination UI using backend `page` / `size`  
- Optional shadcn/ui on the same Tailwind setup  
- Loading skeletons  

## Notes

- Do not commit `.env` — use `.env.example` only  
- If list is empty or create fails, check backend is up and `NEXT_PUBLIC_API_URL` is correct  
- Backend README: `../robokidz-backend/README.md`  
