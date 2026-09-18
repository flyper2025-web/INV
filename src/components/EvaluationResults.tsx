import React, { useState, useEffect } from 'react';
import { EvaluationAttempt } from '../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Printer, 
  RotateCcw, 
  BarChart3, 
  Lightbulb, 
  Check, 
  Sparkles, 
  Crown,
  ChevronDown,
  ChevronUp,
  Filter,
  Trophy,
  Share2,
  Copy,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EvidenceReportModal } from './EvidenceReportModal';
import { downloadEvidenceReportHtml } from '../utils/generateEvidenceReport';
import { ALL_BADGES } from '../data/levelsAndBadges';
import { 
  isAttemptPublished, 
  publishAttemptToLeaderboard, 
  calculateProjectedRank, 
  formatDuration, 
  createChallengePayload 
} from '../services/leaderboardService';

interface EvaluationResultsProps {
  attempt: EvaluationAttempt;
  onNewAttempt: () => void;
  onGoToAnalytics: () => void;
  onGoToLeaderboard?: () => void;
}

export const EvaluationResults: React.FC<EvaluationResultsProps> = ({
  attempt,
  onNewAttempt,
  onGoToAnalytics,
  onGoToLeaderboard
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'correct' | 'incorrect'>('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isPublished, setIsPublished] = useState(() => isAttemptPublished(attempt.id));
  const [copiedChallenge, setCopiedChallenge] = useState(false);
  const [rankInfo, setRankInfo] = useState(() => calculateProjectedRank(attempt.score, attempt.durationSeconds));

  const handlePublishToLeaderboard = () => {
    const result = publishAttemptToLeaderboard(attempt);
    setIsPublished(true);
    setRankInfo({ rank: result.rank, total: result.rank > rankInfo.total ? result.rank : rankInfo.total });
  };

  const handleCopyChallenge = () => {
    const fakeEntry = {
      id: attempt.id,
      apprenticeName: attempt.apprenticeName || 'Aprendiz Experto',
      organization: 'Gestión Empresarial',
      score: attempt.score,
      correctCount: attempt.correctCount,
      durationSeconds: attempt.durationSeconds,
      timestamp: attempt.timestamp,
      levelName: attempt.level.name,
      badgeTitle: attempt.level.badgeTitle
    };
    const code = createChallengePayload(fakeEntry);
    const text = `🏆 ¡Reto de Gestión de Inventarios! He obtenido ${attempt.score}/100 puntos en ${formatDuration(attempt.durationSeconds)} (${attempt.correctCount}/20 aciertos). ¿Podrás superar mi marca en el Top 10 Global?\n\nCódigo de Reto: ${code}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedChallenge(true);
      setTimeout(() => setCopiedChallenge(false), 3000);
    });
  };

  useEffect(() => {
    // Fire confetti for good scores
    if (attempt.score >= 71) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      if (attempt.score >= 91) {
        setTimeout(() => {
          confetti({
            particleCount: 120,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 120,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 300);
      }
    }
  }, [attempt.score]);

  const filteredAnswers = attempt.answers.filter(a => {
    if (filterMode === 'correct') return a.isCorrect;
    if (filterMode === 'incorrect') return !a.isCorrect;
    return true;
  });

  const level = attempt.level;
  const earnedBadges = ALL_BADGES.filter(b => attempt.earnedBadgeIds.includes(b.id));

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner: Score & Level Hero */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Score Gauge / Metric */}
          <div className="flex flex-col items-center text-center sm:text-left sm:items-start space-y-3">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluación Culminada</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              ¡Buen trabajo, {attempt.apprenticeName}!
            </h1>

            <p className="text-slate-300 text-sm max-w-xl">
              Has completado las 20 preguntas seleccionadas al azar sobre Gestión de Inventarios. A continuación tienes tu reporte detallado de evidencias y logros.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-medium">
                  <strong>{attempt.correctCount}</strong> de 20 aciertos
                </span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 flex items-center space-x-2">
                <span className="text-xs sm:text-sm font-medium">
                  Efectividad: <strong>{Math.round((attempt.correctCount / 20) * 100)}%</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Big Score Card with Level Badge */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center min-w-[240px]">
            <div className="text-xs uppercase font-bold tracking-widest text-indigo-200 mb-1">
              Calificación Final
            </div>
            <div className="text-6xl sm:text-7xl font-black tracking-tight text-white font-heading">
              {attempt.score}
              <span className="text-2xl font-bold text-indigo-300">/100</span>
            </div>

            <div className="mt-4 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-900 shadow-sm flex items-center space-x-1.5">
              <Crown className="w-3.5 h-3.5 text-amber-500" />
              <span>{level.name}</span>
            </div>
            <p className="text-[11px] text-indigo-200 mt-2 max-w-[200px]">
              {level.badgeTitle}
            </p>
          </div>

        </div>

        {/* Action Buttons Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-download-evidence"
              onClick={() => downloadEvidenceReportHtml(attempt)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-2 shadow-lg shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Reporte de Evidencias (.HTML)</span>
            </button>

            <button
              id="btn-view-evidence-modal"
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm transition flex items-center space-x-2 border border-white/20"
            >
              <Printer className="w-4 h-4" />
              <span>Ver Certificado e Imprimir / PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToAnalytics}
              className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-indigo-200 font-semibold text-xs sm:text-sm transition flex items-center space-x-2 border border-slate-700"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Análisis Estadístico</span>
            </button>

            <button
              id="btn-new-attempt"
              onClick={onNewAttempt}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-2 shadow-md shadow-emerald-600/30"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Nuevo Intento (20 Nuevas)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Global Leaderboard & Challenge Friends Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-indigo-500/5 to-white dark:from-amber-950/30 dark:via-indigo-950/20 dark:to-slate-900 border-2 border-amber-400/40 dark:border-amber-500/30 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/20 flex-shrink-0 mt-0.5">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
                Clasificación en la Tabla de Líderes Global
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                Top {rankInfo.rank <= 10 ? rankInfo.rank : 'Participante'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Tu marca de <strong>{attempt.score}/100 pts</strong> en <strong>{formatDuration(attempt.durationSeconds)}</strong> te ubica en la posición <strong>#{rankInfo.rank}</strong> global.
            </p>
            {isPublished ? (
              <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1.5">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Puntuación publicada en el Ranking Global oficial.</span>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                Puedes registrar voluntariamente esta puntuación para figurar en el Top 10 y permitir que otros compitan contigo.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {!isPublished ? (
            <button
              id="btn-publish-leaderboard"
              onClick={handlePublishToLeaderboard}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm transition flex items-center justify-center space-x-2 shadow-md shadow-amber-500/20 active:scale-98"
            >
              <Trophy className="w-4 h-4 text-slate-950" />
              <span>Publicar en Tabla de Líderes</span>
            </button>
          ) : null}

          <button
            id="btn-share-challenge"
            onClick={handleCopyChallenge}
            className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2 shadow-xs"
          >
            {copiedChallenge ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>¡Reto Copiado!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                <span>Retar a Amigos</span>
              </>
            )}
          </button>

          {onGoToLeaderboard && (
            <button
              onClick={onGoToLeaderboard}
              className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 text-slate-700 dark:text-slate-300 font-semibold text-xs sm:text-sm transition flex items-center justify-center space-x-1.5"
            >
              <span>Ver Top 10</span>
            </button>
          )}
        </div>
      </div>


      {/* Unlocked Badges Showcase */}
      {earnedBadges.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading">
              Insignias y Logros Desbloqueados en este Intento
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {earnedBadges.map(badge => (
              <div
                key={badge.id}
                className="p-4 rounded-xl border border-indigo-100 dark:border-indigo-950/70 bg-gradient-to-br from-indigo-50/50 to-white dark:from-slate-800/80 dark:to-slate-900 flex items-start space-x-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg flex-shrink-0">
                  🏆
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {badge.title}
                  </div>
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {badge.subtitle}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Itemized Questions Review */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        
        {/* Controls Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
              Retroalimentación Detallada Pregunta por Pregunta
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Analiza tus aciertos, errores y fundamentación teórica extraída de la Unidad 3.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todas (20)
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterMode === 'correct'
                  ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Correctas ({attempt.correctCount})
            </button>
            <button
              onClick={() => setFilterMode('incorrect')}
              className={`px-3 py-1.5 rounded-lg transition ${
                filterMode === 'incorrect'
                  ? 'bg-white dark:bg-slate-700 text-rose-600 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Incorrectas ({attempt.incorrectCount})
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-4 space-y-4">
          {filteredAnswers.map((record, index) => {
            const isOk = record.isCorrect;
            const originalIndex = attempt.answers.findIndex(a => a.questionId === record.questionId) + 1;
            const isExpanded = expandedIndex === record.questionId || true; // expanded for easy reading

            return (
              <div key={record.questionId} className="pt-4 first:pt-0">
                <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
                  
                  {/* Status header */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                        isOk ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {originalIndex}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {record.question.categoryLabel}
                      </span>
                    </div>

                    <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full font-bold text-xs ${
                      isOk 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300' 
                        : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                    }`}>
                      {isOk ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Correcto (+5 pts)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Incorrecto (0 pts)</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Prompt */}
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mb-3">
                    {record.question.prompt}
                  </h3>

                  {/* Answers Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider mb-0.5">
                        Tu respuesta ingresada:
                      </div>
                      <div className={`font-semibold text-sm ${isOk ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                        {record.userAnswer || '(Sin respuesta)'}
                      </div>
                    </div>

                    {!isOk && (
                      <div className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="text-slate-400 uppercase font-bold text-[10px] tracking-wider mb-0.5">
                          Respuesta correcta oficial:
                        </div>
                        <div className="font-semibold text-sm text-emerald-600 dark:text-emerald-400">
                          {String(record.question.correctAnswer)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Theoretical Explanation */}
                  <div className="p-3 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center space-x-1.5 font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Fundamento Teórico:</span>
                    </div>
                    <p className="leading-relaxed">
                      {record.question.explanation}
                    </p>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Modal for Evidence Report */}
      <EvidenceReportModal
        attempt={attempt}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

    </div>
  );
};
