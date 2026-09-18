export type QuestionType = 'multiple_choice' | 'true_false' | 'short_answer';

export type QuestionCategory =
  | 'conceptos_basicos'
  | 'objetivos_ventajas'
  | 'actividades_procesos'
  | 'tipos_caracteristicas'
  | 'concepcion_logistica'
  | 'clasificacion_abc'
  | 'demanda'
  | 'sistemas_modelos'
  | 'control_obsolescencia';

export interface Question {
  id: number;
  type: QuestionType;
  category: QuestionCategory;
  categoryLabel: string;
  prompt: string;
  options?: string[];
  correctAnswer: string | boolean;
  acceptableAnswers?: string[]; // for short answers
  explanation: string;
  difficulty: 'intermedio' | 'avanzado' | 'experto';
}

export type PerformanceLevelId = 'principiante' | 'intermedio' | 'avanzado' | 'experto';

export interface PerformanceLevel {
  id: PerformanceLevelId;
  name: string;
  range: [number, number];
  badgeTitle: string;
  description: string;
  color: string;
  bgGradient: string;
  textColor: string;
  borderClass: string;
}

export interface Badge {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  badgeType: 'level' | 'achievement';
  requirement: string;
}

export interface AnswerRecord {
  questionId: number;
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
}

export interface EvaluationAttempt {
  id: string;
  apprenticeName: string;
  apprenticeId?: string;
  timestamp: string;
  score: number; // 0 - 100
  totalQuestions: number; // 20
  correctCount: number;
  incorrectCount: number;
  durationSeconds: number;
  level: PerformanceLevel;
  earnedBadgeIds: string[];
  answers: AnswerRecord[];
  categoryBreakdown: Record<
    string,
    {
      categoryLabel: string;
      total: number;
      correct: number;
      percentage: number;
    }
  >;
}

export interface StudyReminderConfig {
  enabled: boolean;
  time: string; // e.g., "09:00"
  frequency: 'daily' | 'weekdays';
  soundEnabled: boolean;
  lastNotifiedDate?: string;
}

export interface ApprenticeState {
  name: string;
  apprenticeId?: string;
  organization?: string;
  attempts: EvaluationAttempt[];
  earnedBadges: string[];
  studyReminder: StudyReminderConfig;
  syncCode: string;
  lastCloudSync?: string;
}

export interface LeaderboardEntry {
  id: string;
  apprenticeName: string;
  apprenticeId?: string;
  organization: string;
  score: number; // 0 - 100
  correctCount: number;
  durationSeconds: number;
  timestamp: string;
  levelName: string;
  badgeTitle: string;
  isCurrentUser?: boolean;
  avatarSeed?: string;
  sharedNote?: string;
}

