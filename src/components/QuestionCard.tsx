import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { CheckCircle, XCircle, HelpCircle, ArrowRight, Lightbulb, Check } from 'lucide-react';
import { evaluateAnswer } from '../data/questions';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  currentAnswer: string;
  isConfirmed: boolean;
  onAnswerChange: (answer: string) => void;
  onConfirmAnswer: () => void;
  onNextQuestion?: () => void;
  isLastQuestion: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  currentAnswer,
  isConfirmed,
  onAnswerChange,
  onConfirmAnswer,
  onNextQuestion,
  isLastQuestion
}) => {
  const isCorrect = isConfirmed ? evaluateAnswer(question, currentAnswer) : null;
  const [shortAnswerInput, setShortAnswerInput] = useState(currentAnswer);

  useEffect(() => {
    setShortAnswerInput(currentAnswer);
  }, [currentAnswer, question.id]);

  const handleShortAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfirmed && shortAnswerInput.trim()) {
      onAnswerChange(shortAnswerInput.trim());
      onConfirmAnswer();
    }
  };

  const getDifficultyBadge = () => {
    switch (question.difficulty) {
      case 'intermedio':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">Nivel Intermedio</span>;
      case 'avanzado':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300">Nivel Avanzado</span>;
      case 'experto':
        return <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300">Nivel Experto</span>;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-5 sm:p-7 transition-all">
      
      {/* Top Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800/80 text-xs">
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-1 rounded-md font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            &bull; {question.categoryLabel}
          </span>
        </div>
        <div>
          {getDifficultyBadge()}
        </div>
      </div>

      {/* Question Prompt */}
      <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-6 font-heading">
        {question.prompt}
      </h2>

      {/* Options: Multiple Choice or True / False */}
      {(question.type === 'multiple_choice' || question.type === 'true_false') && (
        <div className="space-y-3 mb-6">
          {question.options?.map((option, idx) => {
            const isSelected = currentAnswer === option;
            const isThisOptionCorrect = String(question.correctAnswer).toLowerCase() === option.toLowerCase();

            let optionBorder = 'border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 bg-white dark:bg-slate-800/60';
            let optionText = 'text-slate-700 dark:text-slate-200';
            let optionBadgeBg = 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300';

            if (isSelected) {
              optionBorder = 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-500/20';
              optionText = 'text-indigo-950 dark:text-indigo-100 font-semibold';
              optionBadgeBg = 'bg-indigo-600 text-white font-bold';
            }

            if (isConfirmed) {
              if (isThisOptionCorrect) {
                optionBorder = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20';
                optionBadgeBg = 'bg-emerald-600 text-white font-bold';
              } else if (isSelected && !isThisOptionCorrect) {
                optionBorder = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20';
                optionBadgeBg = 'bg-rose-600 text-white font-bold';
              }
            }

            const letter = String.fromCharCode(65 + idx);

            return (
              <button
                key={idx}
                type="button"
                disabled={isConfirmed}
                onClick={() => onAnswerChange(option)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-start space-x-3.5 ${optionBorder} ${
                  isConfirmed ? 'cursor-default' : 'cursor-pointer'
                }`}
              >
                <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors ${optionBadgeBg}`}>
                  {isConfirmed && isThisOptionCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    letter
                  )}
                </span>
                <span className={`text-sm sm:text-base leading-relaxed ${optionText}`}>
                  {option}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Short Answer Input */}
      {question.type === 'short_answer' && (
        <form onSubmit={handleShortAnswerSubmit} className="mb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Ingresa tu respuesta escrita:
          </label>
          <div className="relative">
            <input
              type="text"
              disabled={isConfirmed}
              value={shortAnswerInput}
              onChange={(e) => {
                setShortAnswerInput(e.target.value);
                onAnswerChange(e.target.value);
              }}
              placeholder="Escribe el concepto clave, sigla o término técnico..."
              className="w-full px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition disabled:opacity-80 text-sm sm:text-base"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            * Se aceptan términos en mayúsculas, minúsculas o sin tildes (ej: &quot;EOQ&quot;, &quot;Demanda independiente&quot;, &quot;Stock de seguridad&quot;).
          </p>
        </form>
      )}

      {/* Confirmation & Action Buttons */}
      {!isConfirmed ? (
        <div className="flex justify-end pt-2">
          <button
            id={`btn-confirm-answer-${questionNumber}`}
            type="button"
            disabled={!currentAnswer || currentAnswer.trim() === ''}
            onClick={onConfirmAnswer}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-md shadow-indigo-600/20 flex items-center space-x-2"
          >
            <span>Verificar Respuesta</span>
            <CheckCircle className="w-4 h-4" />
          </button>
        </div>
      ) : (
        /* Detailed Feedback Section */
        <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-300">
          
          {/* Status Alert */}
          <div className={`p-4 rounded-xl border flex items-start space-x-3 ${
            isCorrect 
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/70 text-emerald-900 dark:text-emerald-200' 
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/70 text-rose-900 dark:text-rose-200'
          }`}>
            <div className="flex-shrink-0 mt-0.5">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              )}
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base">
                {isCorrect ? '¡Excelente! Respuesta Correcta (+5 pts)' : 'Respuesta Incorrecta (0 pts)'}
              </div>
              {!isCorrect && (
                <div className="text-xs sm:text-sm mt-1 font-medium text-slate-800 dark:text-slate-200">
                  <span className="font-bold text-slate-900 dark:text-white">Respuesta correcta esperada:</span>{' '}
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{String(question.correctAnswer)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Explanation from Unidad 3 PDF */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1">
            <div className="flex items-center space-x-1.5 font-bold text-indigo-700 dark:text-indigo-400">
              <Lightbulb className="w-4 h-4" />
              <span>Fundamentación Teórica (Unidad 3):</span>
            </div>
            <p className="leading-relaxed pl-5 text-slate-600 dark:text-slate-300">
              {question.explanation}
            </p>
          </div>

          {/* Next Question Button */}
          <div className="flex justify-end pt-2">
            <button
              id={`btn-next-question-${questionNumber}`}
              type="button"
              onClick={onNextQuestion}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm transition-all shadow-md flex items-center space-x-2"
            >
              <span>{isLastQuestion ? 'Finalizar y Calificar Evaluación' : 'Siguiente Pregunta'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
