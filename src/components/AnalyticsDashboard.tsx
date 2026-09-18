import React from 'react';
import { ApprenticeState, EvaluationAttempt } from '../types';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Clock, 
  Target,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

interface AnalyticsDashboardProps {
  apprenticeState: ApprenticeState;
  onTakeEvaluation: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  apprenticeState,
  onTakeEvaluation
}) => {
  const attempts = apprenticeState.attempts;

  if (attempts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
          Aún no hay evaluaciones registradas
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Completa tu primera evaluación de 20 preguntas para generar tu diagnóstico estadístico personalizado de competencias en Gestión de Inventarios.
        </p>
        <div className="pt-2">
          <button
            onClick={onTakeEvaluation}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition"
          >
            Iniciar Primera Evaluación
          </button>
        </div>
      </div>
    );
  }

  // Calculate Aggregates
  const totalAttempts = attempts.length;
  const totalScoreSum = attempts.reduce((acc, a) => acc + a.score, 0);
  const averageScore = Math.round(totalScoreSum / totalAttempts);
  const highestScore = Math.max(...attempts.map(a => a.score));
  const passedAttempts = attempts.filter(a => a.score >= 71).length;
  const passRate = Math.round((passedAttempts / totalAttempts) * 100);

  const totalTimeSeconds = attempts.reduce((acc, a) => acc + a.durationSeconds, 0);
  const avgTimeMinutes = Math.round((totalTimeSeconds / totalAttempts) / 60);

  // Category Aggregate
  const categoryStats: Record<string, { label: string; total: number; correct: number }> = {};

  attempts.forEach(att => {
    att.answers.forEach(record => {
      const cat = record.question.category;
      const label = record.question.categoryLabel;
      if (!categoryStats[cat]) {
        categoryStats[cat] = { label, total: 0, correct: 0 };
      }
      categoryStats[cat].total += 1;
      if (record.isCorrect) {
        categoryStats[cat].correct += 1;
      }
    });
  });

  const categoryList = Object.keys(categoryStats).map(key => {
    const stat = categoryStats[key];
    const percentage = Math.round((stat.correct / stat.total) * 100);
    return {
      key,
      label: stat.label,
      total: stat.total,
      correct: stat.correct,
      percentage
    };
  }).sort((a, b) => b.percentage - a.percentage);

  // Weakest and strongest categories
  const strongestCategory = categoryList[0];
  const weakestCategory = categoryList[categoryList.length - 1];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Análisis Estadístico de Rendimiento
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Diagnóstico integral de competencias del aprendiz {apprenticeState.name || 'Registrado'}.
          </p>
        </div>

        <button
          onClick={onTakeEvaluation}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-1.5 shadow-sm"
        >
          <span>Nueva Evaluación (20 Preguntas)</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Target className="w-4 h-4 text-indigo-500" />
            <span>Calificación Promedio</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white font-heading mt-2">
            {averageScore} <span className="text-base font-medium text-slate-400">/100</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            En {totalAttempts} intento{totalAttempts > 1 ? 's' : ''} realizados
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Puntaje Máximo</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-heading mt-2">
            {highestScore} <span className="text-base font-medium text-slate-400">/100</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Mejor desempeño obtenido
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span>Tasa de Aprobación</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-heading mt-2">
            {passRate}%
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {passedAttempts} de {totalAttempts} sobre 70 pts
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <Clock className="w-4 h-4 text-purple-500" />
            <span>Tiempo Promedio</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400 font-heading mt-2">
            {avgTimeMinutes} <span className="text-base font-medium text-slate-400">min</span>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Por evaluación de 20 preguntas
          </div>
        </div>

      </div>

      {/* Domain Mastery by Category */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            Dominio Temático por Categorías de la Unidad 3
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Nivel de efectividad porcentual acumulado en los reactivos respondidos por cada área temática.
          </p>
        </div>

        <div className="space-y-4">
          {categoryList.map(cat => {
            let colorClass = 'from-rose-500 to-amber-500';
            let tagBadge = <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">Requiere Refuerzo</span>;

            if (cat.percentage >= 80) {
              colorClass = 'from-emerald-500 to-teal-500';
              tagBadge = <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Dominado</span>;
            } else if (cat.percentage >= 60) {
              colorClass = 'from-indigo-500 to-blue-500';
              tagBadge = <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">En Progreso</span>;
            }

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-900 dark:text-white">{cat.label}</span>
                    {tagBadge}
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    <span className="font-bold">{cat.percentage}%</span>{' '}
                    <span className="text-xs text-slate-400 font-normal">({cat.correct}/{cat.total})</span>
                  </div>
                </div>

                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${colorClass} rounded-full transition-all duration-500`}
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Historical Attempts Progression Chart */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
            Evolución Cronológica de Calificaciones
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Seguimiento de puntajes obtenidos en los últimos intentos realizados.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
          {attempts.slice(0, 12).map((attempt, index) => {
            const attemptNumber = attempts.length - index;
            const isHigh = attempt.score >= 71;
            return (
              <div
                key={attempt.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-center flex flex-col justify-between"
              >
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Intento #{attemptNumber}
                </span>
                
                <div className={`text-2xl font-black my-2 font-heading ${
                  isHigh ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {attempt.score}
                </div>

                <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {attempt.level.name.replace('Nivel ', '')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Pedagogical Advice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strong point */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Mayor Fortaleza Identificada</span>
          </div>
          <div className="text-base font-extrabold text-emerald-950 dark:text-emerald-100">
            {strongestCategory ? strongestCategory.label : 'Evaluación General'} ({strongestCategory?.percentage}%)
          </div>
          <p className="text-xs text-emerald-900/80 dark:text-emerald-200/80 leading-relaxed">
            Muestras excelente solidez conceptual en este bloque. Continúa aplicando este criterio en casos reales de aprovisionamiento y gestión empresarial.
          </p>
        </div>

        {/* Weak point / Study Recommendation */}
        <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
          <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Área de Oportunidad para Repaso</span>
          </div>
          <div className="text-base font-extrabold text-amber-950 dark:text-amber-100">
            {weakestCategory ? weakestCategory.label : 'Modelos Determinísticos'} ({weakestCategory?.percentage}%)
          </div>
          <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
            Te sugerimos consultar la sección de la Unidad 3 correspondiente a {weakestCategory?.label || 'esta área'}, prestando especial atención a las definiciones operativas y los modelos de reaprovisionamiento.
          </p>
        </div>

      </div>

    </div>
  );
};
