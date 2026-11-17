
export interface QuizCreate {
  title: string;
  age: number;
  lesson_text: string;
}

export interface QuizListItem {
  id: number;
  title: string;
  created_at: string;
}

export interface QuizQuestion {
  id: number;
  question_text: string;
  options: string[];
  correct_answer: string;
}

export interface QuizDetail extends QuizListItem {
  lesson_text: string;
  age: number;
  updated_at: string;
  questions: QuizQuestion[];
}

export interface CreateQuizResponse {
  message: string;
  quiz_id: number;
  title: string;
  total_questions: number;
}
