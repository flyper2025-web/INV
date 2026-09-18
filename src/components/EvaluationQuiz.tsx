import React, { useState, useEffect, useRef } from 'react';
import { 
  Question, 
  EvaluationAttempt, 
  AnswerRecord, 
  ApprenticeState 
} from '../types';
import { getRandomEvaluationQuestions, evaluateAnswer } from '../data/questions';
import { getLevelForScore, ALL_BADGES } from '../data/levelsAndBadges';
import { QuestionCard } from './QuestionCard';
import { 
  Play, 
  Clock, 
  User, 
  CheckCircle2, 
  BookOpen, 
  Award, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { playSuccessChime } from '../services/notificationService';

interface EvaluationQuizProps {
  apprenticeState: ApprenticeState;
  onUpdateApprenticeState: (updater: (prev: ApprenticeState) => ApprenticeState) => void;
  onEvaluationCompleted: (attempt: EvaluationAttempt) => void;
}

export const EvaluationQuiz: React.FC<EvaluationQuizProps> = ({
  apprenticeState,
  onUpdateApprenticeState,
  onEvaluationCompleted
}) => {
  // Setup state
  const [learnerName, setLearnerName] = useState(apprenticeState.name || '');
  const [learnerId, setLearnerId] = useState(apprenticeState.apprenticeId || '');
  const [organization, setOrganization] = useState(apprenticeState.organization || 'Gestión Empresarial');
  const [nameError, setNameError] = useState('');

  // Active quiz state
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [confirmedQuestions, setConfirmedQuestions] = useState<Record<number, boolean>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const timerRef = useRef<any>(null);

  // Sync state if prop changes
  useEffect(() => {
    if (apprenticeState.name && !learnerName) {
      setLearnerName(apprenticeState.name);
    }
    if (apprenticeState.apprenticeId && !learnerId) {
      setLearnerId(apprenticeState.apprenticeId);
    }
  }, [apprenticeState.name, apprenticeState.apprenticeId]);

  // Timer runner
  useEffect(() => {
    if (isQuizActive) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isQuizActive]);

  const handleStartQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim()) {
      setNameError('Por favor ingresa tu nombre completo para emitir tus evidencias.');
      return;
    }
    setNameError('');

    // Save profile details
    onUpdateApprenticeState(prev => ({
      ...prev,
      name: learnerName.trim(),
      apprenticeId: learnerId.trim(),
      organization: organization.trim()
    }));

    // Generate 20 random questions from the 50-question database
    const selectedQuestions = getRandomEvaluationQuestions(20);
    setQuestions(selectedQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setConfirmedQuestions({});
    setElapsedSeconds(0);
    setIsQuizActive(true);
  };

  const handleAnswerChange = (answer: string) => {
    const currentQ = questions[currentIndex];
    setUserAnswers(prev => ({
      ...prev,
      [currentQ.id]: answer
    }));
  };

  const handleConfirmAnswer = () => {
    const currentQ = questions[currentIndex];
    const answer = userAnswers[currentQ.id] || '';
    if (!answer.trim()) return;

    setConfirmedQuestions(prev => ({
      ...prev,
      [currentQ.id]: true
    }));

    if (evaluateAnswer(currentQ, answer)) {
      playSuccessChime();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishEvaluation();
    }
  };

  const finishEvaluation = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Grade each question (5 points each, total 100)
    let correctCount = 0;
    const answerRecords: AnswerRecord[] = questions.map(q => {
      const uAns = userAnswers[q.id] || '';
      const isOk = evaluateAnswer(q, uAns);
      if (isOk) correctCount++;
      return {
        questionId: q.id,
        question: q,
        userAnswer: uAns,
        isCorrect: isOk
      };
    });

    const finalScore = correctCount * 5;
    const level = getLevelForScore(finalScore);

    // Calculate category breakdown
    const categoryBreakdown: EvaluationAttempt['categoryBreakdown'] = {};
    answerRecords.forEach(rec => {
      const catKey = rec.question.category;
      if (!categoryBreakdown[catKey]) {
        categoryBreakdown[catKey] = {
          categoryLabel: rec.question.categoryLabel,
          total: 0,
          correct: 0,
          percentage: 0
        };
      }
      categoryBreakdown[catKey].total += 1;
      if (rec.isCorrect) {
        categoryBreakdown[catKey].correct += 1;
      }
    });

    Object.keys(categoryBreakdown).forEach(k => {
      const item = categoryBreakdown[k];
      item.percentage = Math.round((item.correct / item.total) * 100);
    });

    // Evaluate badges to unlock
    const newEarnedBadges: string[] = [];

    // Level badge
    newEarnedBadges.push(`badge-level-${level.id}`);

    // Achievement badges
    if (finalScore === 100) {
      newEarnedBadges.push('badge-achievement-perfect');
    }

    // Check ABC perfection
    const abcRecs = answerRecords.filter(r => r.question.category === 'clasificacion_abc');
    if (abcRecs.length > 0 && abcRecs.every(r => r.isCorrect)) {
      newEarnedBadges.push('badge-achievement-abc');
    }

    // Check P/Q perfection
    const pqRecs = answerRecords.filter(r => r.question.category === 'sistemas_modelos');
    if (pqRecs.length > 0 && pqRecs.every(r => r.isCorrect)) {
      newEarnedBadges.push('badge-achievement-pq');
    }

    // First attempt
    newEarnedBadges.push('badge-achievement-first-attempt');

    // Speed badge (under 5 mins with score >= 71)
    if (elapsedSeconds < 300 && finalScore >= 71) {
      newEarnedBadges.push('badge-achievement-speed');
    }

    const attempt: EvaluationAttempt = {
      id: `ATT-${Date.now().toString(36).toUpperCase()}`,
      apprenticeName: learnerName.trim(),
      apprenticeId: learnerId.trim(),
      timestamp: new Date().toISOString(),
      score: finalScore,
      totalQuestions: 20,
      correctCount,
      incorrectCount: 20 - correctCount,
      durationSeconds: elapsedSeconds,
      level,
      earnedBadgeIds: newEarnedBadges,
      answers: answerRecords,
      categoryBreakdown
    };

    // Update Apprentice State
    onUpdateApprenticeState(prev => {
      const mergedBadges = Array.from(new Set([...prev.earnedBadges, ...newEarnedBadges]));
      return {
        ...prev,
        attempts: [attempt, ...prev.attempts],
        earnedBadges: mergedBadges
      };
    });

    setIsQuizActive(false);
    onEvaluationCompleted(attempt);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // If quiz is NOT active, show start screen with apprentice name form
  if (!isQuizActive) {
    return (
      <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
        
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluación de Conocimiento Avanzado</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight font-heading">
              Gestión Integral de Inventarios
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Plataforma para aprendices y profesionales expertos en Gestión Empresarial. Pon a prueba tus competencias en planificación de stocks, clasificación ABC, sistemas P y Q, modelos determinísticos (EOQ) y prevención de obsolescencia.
            </p>
          </div>
        </div>

        {/* Evaluation Format Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">20 Preguntas al Azar</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Seleccionadas aleatoriamente de un banco riguroso de 50 preguntas especializadas.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Escala 0 a 100 Puntos</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              5 puntos por reactivo con insignias por nivel: Principiante, Intermedio, Avanzado y Experto.
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">Reporte de Evidencias</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Retroalimentación pregunta por pregunta y descarga inmediata de tu constancia.
            </div>
          </div>
        </div>

        {/* Apprentice Registration & Start Form */}
        <form onSubmit={handleStartQuiz} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Datos del Aprendiz para la Certificación
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Ingresa tus datos tal como deben figurar en tu Reporte Oficial de Evidencias.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Nombre Completo del Aprendiz <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="input-apprentice-name"
                  type="text"
                  required
                  value={learnerName}
                  onChange={e => {
                    setLearnerName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="Ej: Laura Sofía Morales Restrepo"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {nameError && (
                <p className="text-xs text-rose-500 mt-1.5 flex items-center space-x-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{nameError}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Identificación / Ficha SENA / Matrícula (Opcional)
                </label>
                <input
                  id="input-apprentice-id"
                  type="text"
                  value={learnerId}
                  onChange={e => setLearnerId(e.target.value)}
                  placeholder="Ej: CC 1020304050"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Organización / Empresa / Centro de Formación
                </label>
                <input
                  id="input-organization"
                  type="text"
                  value={organization}
                  onChange={e => setOrganization(e.target.value)}
                  placeholder="Ej: Gestión Empresarial FAEDIS"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              id="btn-start-evaluation"
              type="submit"
              className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-base transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2.5 cursor-pointer"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Comenzar Evaluación de 20 Preguntas</span>
            </button>
          </div>
        </form>

      </div>
    );
  }

  // Quiz is active: render current question and progress
  const currentQuestion = questions[currentIndex];
  const isCurrentConfirmed = !!confirmedQuestions[currentQuestion?.id];
  const currentAnswer = userAnswers[currentQuestion?.id] || '';
  const isLast = currentIndex === questions.length - 1;
  const progressPercent = Math.round(((currentIndex + (isCurrentConfirmed ? 1 : 0)) / 20) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Top Header: Progress & Timer Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
              Pregunta {currentIndex + 1} <span className="text-slate-400 font-normal">/ 20</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">
              ({progressPercent}% completado)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold font-mono">
              <Clock className="w-3.5 h-3.5 text-indigo-500" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            <button
              onClick={() => {
                if (window.confirm('¿Deseas reiniciar la evaluación actual? Se generarán 20 preguntas nuevas.')) {
                  setIsQuizActive(false);
                }
              }}
              className="text-xs text-slate-500 hover:text-rose-600 transition"
              title="Cancelar evaluación"
            >
              Reiniciar
            </button>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Mini Questions Dots Navigator */}
        <div className="flex items-center justify-between gap-1 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto no-scrollbar py-1">
          {questions.map((q, idx) => {
            const isDone = !!confirmedQuestions[q.id];
            const isCur = idx === currentIndex;
            const isOk = isDone ? evaluateAnswer(q, userAnswers[q.id] || '') : null;

            let dotClass = 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400';
            if (isCur) dotClass = 'ring-2 ring-indigo-500 bg-indigo-600 text-white font-bold';
            else if (isDone && isOk) dotClass = 'bg-emerald-500 text-white font-bold';
            else if (isDone && !isOk) dotClass = 'bg-rose-500 text-white font-bold';

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-6 h-6 rounded-md text-[10px] flex items-center justify-center flex-shrink-0 transition-all ${dotClass}`}
                title={`Pregunta ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          totalQuestions={20}
          currentAnswer={currentAnswer}
          isConfirmed={isCurrentConfirmed}
          onAnswerChange={handleAnswerChange}
          onConfirmAnswer={handleConfirmAnswer}
          onNextQuestion={handleNextQuestion}
          isLastQuestion={isLast}
        />
      )}

    </div>
  );
};
