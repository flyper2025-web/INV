import React, { useState, useId } from 'react';
import { 
  Trophy, 
  Crown, 
  Medal, 
  Clock, 
  CheckCircle2, 
  Share2, 
  Users, 
  Sparkles, 
  ArrowUpRight, 
  Copy, 
  Check, 
  RotateCcw, 
  Filter, 
  Search, 
  Plus, 
  Zap,
  Flame,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { ApprenticeState, LeaderboardEntry } from '../types';
import { 
  getLeaderboardEntries, 
  getTop10Leaderboard, 
  formatDuration, 
  publishAttemptToLeaderboard, 
  isAttemptPublished,
  createChallengePayload,
  parseChallengePayload,
  addExternalChallenger,
  resetLeaderboardToDefault
} from '../services/leaderboardService';

interface LeaderboardTabProps {
  apprenticeState: ApprenticeState;
  onTakeEvaluation: () => void;
}

export const LeaderboardTab: React.FC<LeaderboardTabProps> = ({
  apprenticeState,
  onTakeEvaluation
}) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboardEntries());
  const [filterMode, setFilterMode] = useState<'top10' | 'all' | 'mine'>('top10');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [challengeInput, setChallengeInput] = useState('');
  const [challengeSuccess, setChallengeSuccess] = useState<string | null>(null);
  const [challengeError, setChallengeError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedShareEntry, setSelectedShareEntry] = useState<LeaderboardEntry | null>(null);

  // Quick check if latest attempt is already published
  const latestAttempt = apprenticeState.attempts.length > 0
    ? apprenticeState.attempts[apprenticeState.attempts.length - 1]
    : null;

  const isLatestPublished = latestAttempt ? isAttemptPublished(latestAttempt.id) : false;

  const handlePublishLatestAttempt = () => {
    if (!latestAttempt) return;
    publishAttemptToLeaderboard(latestAttempt);
    setEntries(getLeaderboardEntries());
    setChallengeSuccess('¡Tu último intento fue publicado exitosamente en la Tabla de Líderes Global!');
    setTimeout(() => setChallengeSuccess(null), 5000);
  };

  const handleOpenShare = (entry: LeaderboardEntry) => {
    setSelectedShareEntry(entry);
    setIsShareModalOpen(true);
  };

  const handleCopyChallenge = (entry: LeaderboardEntry) => {
    const code = createChallengePayload(entry);
    const text = `🏆 ¡Reto de Gestión de Inventarios! He obtenido ${entry.score}/100 puntos en ${formatDuration(entry.durationSeconds)} (${entry.correctCount}/20 aciertos). ¿Podrás superar mi marca en el Top 10 Global?\n\nCódigo de Reto: ${code}`;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    }).catch(() => {
      // fallback
    });
  };

  const handleImportChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    setChallengeError(null);
    setChallengeSuccess(null);

    if (!challengeInput.trim()) {
      setChallengeError('Por favor ingresa un código de reto válido.');
      return;
    }

    const parsed = parseChallengePayload(challengeInput);
    if (!parsed || !parsed.apprenticeName || parsed.score === undefined) {
      setChallengeError('El código de reto no es válido o ha expirado. Verifica que esté completo.');
      return;
    }

    addExternalChallenger({
      apprenticeName: parsed.apprenticeName,
      organization: parsed.organization || 'Retador Invitado',
      score: parsed.score,
      correctCount: parsed.correctCount || Math.round((parsed.score / 100) * 20),
      durationSeconds: parsed.durationSeconds || 240,
      timestamp: parsed.timestamp || new Date().toISOString(),
      levelName: parsed.levelName || 'Nivel Avanzado',
      badgeTitle: parsed.badgeTitle || 'Retador Académico',
      isCurrentUser: false,
      avatarSeed: parsed.avatarSeed,
      sharedNote: 'Reto aceptado y registrado en la tabla de líderes.'
    });

    setEntries(getLeaderboardEntries());
    setChallengeSuccess(`¡Excelente! El registro de ${parsed.apprenticeName} (${parsed.score} pts) ha sido agregado a tu ranking.`);
    setChallengeInput('');
    setTimeout(() => setChallengeSuccess(null), 6000);
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Deseas restaurar la tabla con los 10 puntajes de referencia académica originales?')) {
      resetLeaderboardToDefault();
      setEntries(getLeaderboardEntries());
      setChallengeSuccess('Tabla de líderes restablecida a los registros de referencia.');
      setTimeout(() => setChallengeSuccess(null), 4000);
    }
  };

  // Filtered list
  const filteredEntries = entries.filter(e => {
    if (filterMode === 'mine') {
      const isMine = e.isCurrentUser || 
        (apprenticeState.name && e.apprenticeName.toLowerCase() === apprenticeState.name.toLowerCase());
      if (!isMine) return false;
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesName = e.apprenticeName.toLowerCase().includes(term);
      const matchesOrg = e.organization.toLowerCase().includes(term);
      const matchesLevel = e.levelName.toLowerCase().includes(term);
      return matchesName || matchesOrg || matchesLevel;
    }
    return true;
  });

  const displayList = filterMode === 'top10' ? filteredEntries.slice(0, 10) : filteredEntries;

  // Podium top 3
  const top1 = entries[0];
  const top2 = entries[1];
  const top3 = entries[2];

  // User best rank
  const userBestRankIndex = entries.findIndex(e => e.isCurrentUser);
  const userRankDisplay = userBestRankIndex !== -1 ? `#${userBestRankIndex + 1}` : 'Sin clasificar';

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-900/50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Competencia Académica de Alto Rendimiento</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Tabla de Líderes Global (Top 10)
            </h1>

            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              El ranking oficial reconoce a los expertos en Gestión de Inventarios clasificados según su <strong>máxima puntuación (0-100)</strong> y su <strong>velocidad de resolución</strong>. ¡Compite con colegas y comparte tus marcas!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              id="btn-compete-now"
              onClick={onTakeEvaluation}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm transition flex items-center space-x-2 shadow-lg shadow-amber-500/20 active:scale-98"
            >
              <Zap className="w-4 h-4 text-slate-950 fill-current" />
              <span>Competir Ahora (20 Preguntas)</span>
            </button>
          </div>
        </div>

        {/* Global Statistics Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Total Participantes
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
              {entries.length}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Puntuación Récord
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-heading mt-0.5 flex items-center space-x-1">
              <span>{top1 ? top1.score : 100}</span>
              <span className="text-xs text-slate-400 font-normal">/100</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tiempo Récord (100 pts)
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400 font-heading mt-0.5">
              {top1 ? formatDuration(top1.durationSeconds) : '2m 34s'}
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Tu Posición Actual
            </div>
            <div className="text-xl sm:text-2xl font-black text-indigo-300 font-heading mt-0.5">
              {userRankDisplay}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {challengeSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center space-x-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
          <span>{challengeSuccess}</span>
        </div>
      )}

      {challengeError && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs sm:text-sm font-semibold flex items-center space-x-2 animate-in fade-in">
          <RotateCcw className="w-5 h-5 flex-shrink-0 text-rose-600" />
          <span>{challengeError}</span>
        </div>
      )}

      {/* Callout if latest attempt is pending publish */}
      {latestAttempt && !isLatestPublished && (
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">
                Tienes un intento reciente: {latestAttempt.score}/100 pts en {formatDuration(latestAttempt.durationSeconds)}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                ¿Deseas publicarlo para competir y reclamar tu posición en el Top 10?
              </div>
            </div>
          </div>

          <button
            onClick={handlePublishLatestAttempt}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-1.5 shadow-sm whitespace-nowrap"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>Publicar mi Puntuación Ahora</span>
          </button>
        </div>
      )}

      {/* Podium for Top 3 */}
      {top1 && top2 && top3 && filterMode !== 'mine' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center space-x-2">
              <Crown className="w-5 h-5 text-amber-500" />
              <span>Podio de Honor: Los 3 Mejores Expertos</span>
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Desempate por tiempo y precisión
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* 2nd Place (Silver) */}
            <div className="order-2 md:order-1 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-slate-400/10 rounded-full blur-xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold flex items-center justify-center text-sm border border-slate-200 dark:border-slate-700">
                    🥈 #2
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Plata
                  </span>
                </div>

                <div className="mt-3">
                  <div className="font-extrabold text-base text-slate-900 dark:text-white truncate">
                    {top2.apprenticeName}
                    {top2.isCurrentUser && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-indigo-600 text-white font-bold">
                        Tú
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {top2.organization}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white font-heading">
                    {top2.score}
                  </span>
                  <span className="text-slate-500 font-semibold">/100 pts</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{formatDuration(top2.durationSeconds)}</span>
                </div>
              </div>
            </div>

            {/* 1st Place (Gold - Elevated) */}
            <div className="order-1 md:order-2 p-6 rounded-2xl bg-gradient-to-b from-amber-500/10 via-white to-white dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900 border-2 border-amber-400/60 dark:border-amber-500/40 shadow-md flex flex-col justify-between relative overflow-hidden md:-translate-y-2">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>
              
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base shadow-sm">
                    🥇 #1
                  </div>
                  <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700">
                    <Crown className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 fill-current" />
                    <span>Líder Absoluto</span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="font-extrabold text-lg text-slate-900 dark:text-white truncate">
                    {top1.apprenticeName}
                    {top1.isCurrentUser && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-indigo-600 text-white font-bold">
                        Tú
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {top1.organization}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-100 dark:border-amber-950/60 flex items-center justify-between text-xs">
                <div>
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 font-heading">
                    {top1.score}
                  </span>
                  <span className="text-slate-500 font-semibold">/100 pts</span>
                </div>
                <div className="flex items-center space-x-1 text-amber-900 dark:text-amber-200 font-bold bg-amber-100/80 dark:bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
                  <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>{formatDuration(top1.durationSeconds)}</span>
                </div>
              </div>
            </div>

            {/* 3rd Place (Bronze) */}
            <div className="order-3 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-700/10 rounded-full blur-xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-extrabold flex items-center justify-center text-sm border border-amber-200 dark:border-amber-800">
                    🥉 #3
                  </div>
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                    Bronce
                  </span>
                </div>

                <div className="mt-3">
                  <div className="font-extrabold text-base text-slate-900 dark:text-white truncate">
                    {top3.apprenticeName}
                    {top3.isCurrentUser && (
                      <span className="ml-1.5 px-2 py-0.5 rounded-full text-[10px] bg-indigo-600 text-white font-bold">
                        Tú
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                    {top3.organization}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-xl font-black text-slate-900 dark:text-white font-heading">
                    {top3.score}
                  </span>
                  <span className="text-slate-500 font-semibold">/100 pts</span>
                </div>
                <div className="flex items-center space-x-1 text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{formatDuration(top3.durationSeconds)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Interactive Controls & Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Navigation Pill Filters */}
          <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
            <button
              onClick={() => setFilterMode('top10')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                filterMode === 'top10'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Top 10 Global
            </button>
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                filterMode === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos ({entries.length})
            </button>
            <button
              onClick={() => setFilterMode('mine')}
              className={`px-3.5 py-1.5 rounded-lg transition ${
                filterMode === 'mine'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Mis Puntuaciones
            </button>
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por aprendiz o institución..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
          </div>

        </div>

        {/* Challenge a friend code input */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <form onSubmit={handleImportChallenge} className="flex-1 w-full flex items-center space-x-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 hidden sm:inline whitespace-nowrap">
              ¿Tienes un código de reto de un amigo?:
            </span>
            <input
              type="text"
              placeholder="Pega aquí el código de reto..."
              value={challengeInput}
              onChange={(e) => setChallengeInput(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-hidden"
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition whitespace-nowrap"
            >
              Cargar Reto
            </button>
          </form>

          <button
            onClick={handleResetDefaults}
            title="Restablecer tabla de líderes con los 10 registros académicos de referencia"
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 underline text-[11px] whitespace-nowrap self-end md:self-auto"
          >
            Restablecer Referencias
          </button>
        </div>

      </div>

      {/* Main Table Showcase */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {filterMode === 'top10' ? 'Top 10 Oficial de Competencia' : filterMode === 'mine' ? 'Mis Puntuaciones Registradas' : 'Clasificación General'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mostrando {displayList.length} registro(s) ordenados por puntaje y velocidad.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>En vivo</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                <th className="py-3.5 px-4 font-bold text-center w-14">Rango</th>
                <th className="py-3.5 px-4 font-bold">Aprendiz / Especialista</th>
                <th className="py-3.5 px-4 font-bold">Organización / Centro</th>
                <th className="py-3.5 px-4 font-bold text-center">Puntaje</th>
                <th className="py-3.5 px-4 font-bold text-center">Tiempo</th>
                <th className="py-3.5 px-4 font-bold text-center">Aciertos</th>
                <th className="py-3.5 px-4 font-bold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {displayList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No se encontraron participantes que coincidan con la búsqueda.
                  </td>
                </tr>
              ) : (
                displayList.map((entry, index) => {
                  const rank = entries.findIndex(e => e.id === entry.id) + 1;
                  const isGold = rank === 1;
                  const isSilver = rank === 2;
                  const isBronze = rank === 3;
                  const isUser = entry.isCurrentUser;

                  return (
                    <tr
                      key={entry.id}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors ${
                        isUser ? 'bg-indigo-50/40 dark:bg-indigo-950/20' : ''
                      }`}
                    >
                      {/* Rank Position */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-lg font-black text-xs ${
                            isGold
                              ? 'bg-amber-400 text-amber-950 shadow-xs'
                              : isSilver
                              ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white'
                              : isBronze
                              ? 'bg-amber-800 text-amber-100'
                              : rank <= 10
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold'
                              : 'text-slate-400 font-normal'
                          }`}
                        >
                          {rank}
                        </span>
                      </td>

                      {/* Name & Avatar */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                            isUser 
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                          }`}>
                            {entry.avatarSeed || entry.apprenticeName.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                              <span>{entry.apprenticeName}</span>
                              {isUser && (
                                <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-indigo-600 text-white font-extrabold uppercase">
                                  Tú
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {entry.levelName}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Organization */}
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                        <div className="flex items-center space-x-1.5 truncate max-w-[200px]">
                          <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                          <span className="truncate">{entry.organization}</span>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black ${
                          entry.score >= 91
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : entry.score >= 71
                            ? 'bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                            : 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                        }`}>
                          {entry.score} pts
                        </span>
                      </td>

                      {/* Duration / Speed */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="inline-flex items-center space-x-1 text-slate-700 dark:text-slate-300 font-semibold text-xs">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{formatDuration(entry.durationSeconds)}</span>
                        </div>
                      </td>

                      {/* Accuracy */}
                      <td className="py-3.5 px-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                        {entry.correctCount}/20
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => handleOpenShare(entry)}
                          title="Compartir o retar a un amigo con esta puntuación"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition inline-flex items-center space-x-1"
                        >
                          <Share2 className="w-4 h-4" />
                          <span className="text-[11px] font-medium hidden sm:inline">Retar</span>
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Share / Challenge Modal */}
      {isShareModalOpen && selectedShareEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                    Compartir Puntuación y Retar
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Desafía a tus colegas a superar tu marca
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {/* Preview Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-3">
              <div className="flex items-center justify-between text-xs text-indigo-200 font-semibold">
                <span>Gestión de Inventarios &bull; Nivel Avanzado</span>
                <span>20 Preguntas</span>
              </div>
              <div>
                <div className="text-2xl font-black font-heading text-white">
                  {selectedShareEntry.score} / 100 Puntos
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Tiempo: <strong>{formatDuration(selectedShareEntry.durationSeconds)}</strong> &bull; {selectedShareEntry.correctCount} aciertos
                </div>
              </div>
              <div className="text-xs text-amber-300 font-semibold border-t border-white/10 pt-2 flex items-center justify-between">
                <span>Por: {selectedShareEntry.apprenticeName}</span>
                <span>{selectedShareEntry.levelName}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={() => handleCopyChallenge(selectedShareEntry)}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center space-x-2 shadow-md shadow-indigo-600/30"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>¡Mensaje y Código de Reto Copiados!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar Desafío para WhatsApp / Mensajes</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  const text = encodeURIComponent(`🏆 ¡He alcanzado ${selectedShareEntry.score}/100 puntos en ${formatDuration(selectedShareEntry.durationSeconds)} en la Evaluación de Gestión de Inventarios! ¿Crees poder superar mi récord en el Top 10?`);
                  window.open(`https://wa.me/?text=${text}`, '_blank');
                }}
                className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition flex items-center justify-center space-x-2 shadow-xs"
              >
                <Share2 className="w-4 h-4" />
                <span>Enviar Directamente por WhatsApp</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400 leading-normal">
              Tus amigos pueden ingresar el código en la pestaña de <strong>Tabla de Líderes</strong> para comparar sus resultados contra tu récord en tiempo real.
            </p>

          </div>
        </div>
      )}

    </div>
  );
};
