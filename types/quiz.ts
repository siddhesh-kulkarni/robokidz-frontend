
export interface QuizCreate {
  title: string;
  lesson_text: string;
  age: number;
}

export interface QuizQuestion {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
}

export interface Quiz {
  id: number;
  title: string;
  lesson_text: string;
  age: number;
  created_at: string;
  updated_at: string;
  questions: QuizQuestion[];
}

export interface QuizListItem {
  id: number;
  title: string;
  created_at: string;
}

export interface CreateQuizResponse {
  message: string;
  quiz_id: number;
  title: string;
  total_questions: number;
}
