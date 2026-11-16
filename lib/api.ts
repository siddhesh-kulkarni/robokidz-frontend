
import type {
  Quiz,
  QuizCreate,
  QuizListItem,
  CreateQuizResponse,
} from "@/types/quiz";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Something went wrong");
  }

  return data as T;
}

export async function createQuiz(
  payload: QuizCreate
): Promise<CreateQuizResponse> {
  const response = await fetch(`${API_URL}/api/quizzes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<CreateQuizResponse>(response);
}

export async function getQuizzes(): Promise<QuizListItem[]> {
  const response = await fetch(`${API_URL}/api/quizzes`);

  return handleResponse<QuizListItem[]>(response);
}

export async function getQuiz(id: number): Promise<Quiz> {
  const response = await fetch(`${API_URL}/api/quizzes/${id}`);

  return handleResponse<Quiz>(response);
}
