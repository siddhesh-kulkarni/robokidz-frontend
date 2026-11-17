import type {
  CreateQuizResponse,
  QuizCreate,
  QuizDetail,
  QuizListItem,
} from "@/types/quiz";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Something went wrong";
  }

  const detail = (data as { detail?: unknown }).detail;

  if (typeof detail === "string") {
    return detail;
  }

  // FastAPI validation errors come as a list
  if (Array.isArray(detail) && detail?.length > 0) {
    const first = detail?.[0];
    if (first && typeof first === "object" && "msg" in first) {
      return String((first as { msg: string }).msg);
    }
  }

  return "Something went wrong";
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(data));
  }

  return data as T;
}

export async function createQuiz(
  payload: QuizCreate
): Promise<CreateQuizResponse> {
  const response = await fetch(`${API_URL}/api/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return handleResponse<CreateQuizResponse>(response);
}

export async function getQuizzes(): Promise<QuizListItem[]> {
  const response = await fetch(`${API_URL}/api/quizzes`);
  return handleResponse<QuizListItem[]>(response);
}

export async function getQuiz(id: number): Promise<QuizDetail> {
  const response = await fetch(`${API_URL}/api/quizzes/${id}`);
  return handleResponse<QuizDetail>(response);
}
