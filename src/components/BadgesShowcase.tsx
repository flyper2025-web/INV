import React from 'react';
import { ApprenticeState } from '../types';
import { ALL_BADGES, PERFORMANCE_LEVELS } from '../data/levelsAndBadges';
import { Award, Crown, Lock, CheckCircle2, Star, Sparkles } from 'lucide-react';

interface BadgesShowcaseProps {
  apprenticeState: ApprenticeState;
  onTakeEvaluation: () => void;
}

export const BadgesShowcase: React.FC<BadgesShowcaseProps> = ({
  apprenticeState,
  onTakeEvaluation
}) => {
  const earnedSet = new Set(apprenticeState.earnedBadges);

  const levelList = Object.values(PERFORMANCE_LEVELS);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Niveles de Desempeño e Insignias Académicas
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Escalafón oficial de competencias alcanzadas en Gestión Integral de Inventarios.
        </p>
      </div>

      {/* 4 Performance Levels Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center space-x-2">
          <Crown className="w-5 h-5 text-indigo-500" />
          <span>Escala de Niveles de Desempeño (0 - 100 Puntos)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {levelList.map(level => {
            const isUnlocked = earnedSet.has(`badge-level-${level.id}`);
            return (
              <div
                key={level.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-white dark:bg-slate-900 border-indigo-500/60 ring-2 ring-indigo-500/20 shadow-md'
                    : 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {level.range[0]} - {level.range[1]} pts
                    </span>
                    {isUnlocked ? (
                      <span className="inline-flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Desbloqueado</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-400">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Bloqueado</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white font-heading">
                    {level.name}
                  </h3>
                  
                  <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 mb-2">
                    {level.badgeTitle}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {level.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] font-medium text-slate-400">
                  Requiere calificación entre {level.range[0]} y {level.range[1]}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Insignias de Logro y Habilidades Especiales</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Desbloqueadas automáticamente al demostrar destrezas específicas durante las evaluaciones.
            </p>
          </div>
          <div className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 w-fit">
            {apprenticeState.earnedBadges.length} de {ALL_BADGES.length} obtenidas
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_BADGES.map(badge => {
            const isUnlocked = earnedSet.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start space-x-3.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-indigo-50/40 via-white to-white dark:from-slate-800/90 dark:via-slate-900 dark:to-slate-900 border-indigo-200 dark:border-indigo-900 shadow-sm'
                    : 'bg-slate-50/50 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 ${
                  isUnlocked 
                    ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shadow-xs' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                }`}>
                  {isUnlocked ? '🏆' : <Lock className="w-5 h-5" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {badge.title}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    {badge.subtitle}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                    {badge.description}
                  </p>

                  <div className="pt-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Requisito: {badge.requirement}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
