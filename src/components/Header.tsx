import React from 'react';
import { 
  Boxes, 
  Moon, 
  Sun, 
  Cloud, 
  Bell, 
  BarChart3, 
  Award, 
  FileText, 
  RotateCcw,
  CheckCircle2,
  Trophy,
  Download
} from 'lucide-react';
import { ApprenticeState } from '../types';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  activeTab: 'evaluacion' | 'ranking' | 'estadisticas' | 'insignias' | 'historial';
  onSelectTab: (tab: 'evaluacion' | 'ranking' | 'estadisticas' | 'insignias' | 'historial') => void;
  onOpenSync: () => void;
  onOpenReminder: () => void;
  onOpenDownloadHtml?: () => void;
  apprenticeState: ApprenticeState;
  isEvaluating: boolean;
  onResetEvaluation?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  activeTab,
  onSelectTab,
  onOpenSync,
  onOpenReminder,
  onOpenDownloadHtml,
  apprenticeState,
  isEvaluating,
  onResetEvaluation
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onSelectTab('evaluacion')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Boxes className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white font-heading">
                  Gestión de Inventarios
                </span>
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                  Nivel Avanzado
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Evaluación de Competencias &bull; Gestión Empresarial
              </p>
            </div>
          </div>

          {/* Apprentice identity indicator (if registered) */}
          {apprenticeState.name && (
            <div className="hidden lg:flex items-center px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></span>
              <span className="font-semibold text-slate-900 dark:text-white mr-1.5">Aprendiz:</span>
              <span className="truncate max-w-[140px]">{apprenticeState.name}</span>
            </div>
          )}

          {/* Utility Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            
            {/* Download Standalone .HTML Button */}
            {onOpenDownloadHtml && (
              <button
                id="btn-download-html"
                onClick={onOpenDownloadHtml}
                title="Descargar versión completa en un solo archivo .HTML (Funciona offline)"
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 transition flex items-center space-x-1.5 text-xs font-bold"
              >
                <Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Descargar .HTML</span>
              </button>
            )}

            {/* Cloud Sync Button */}
            <button
              id="btn-cloud-sync"
              onClick={onOpenSync}
              title="Sincronización en la Nube entre plataformas"
              className="p-2 sm:px-3 sm:py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition flex items-center space-x-1 text-xs font-medium"
            >
              <Cloud className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">Nube</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            </button>

            {/* Study Reminder Button */}
            <button
              id="btn-study-reminders"
              onClick={onOpenReminder}
              title="Notificaciones y recordatorios de estudio diarios"
              className="p-2 sm:px-3 sm:py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition flex items-center space-x-1 text-xs font-medium relative"
            >
              <Bell className="w-4 h-4 text-amber-500" />
              <span className="hidden sm:inline">Recordatorios</span>
              {apprenticeState.studyReminder.enabled && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500"></span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              id="btn-theme-toggle"
              onClick={onToggleDarkMode}
              title={darkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Alternar tema"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <nav className="flex space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-slate-800/60 text-xs sm:text-sm font-medium">
          <button
            id="tab-evaluacion"
            onClick={() => onSelectTab('evaluacion')}
            className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'evaluacion'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Boxes className="w-4 h-4" />
            <span>Evaluación (20 Preguntas)</span>
          </button>

          <button
            id="tab-ranking"
            onClick={() => onSelectTab('ranking')}
            className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'ranking'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Tabla de Líderes (Top 10)</span>
          </button>

          <button
            id="tab-estadisticas"
            onClick={() => onSelectTab('estadisticas')}
            className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'estadisticas'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Análisis Estadístico</span>
          </button>

          <button
            id="tab-insignias"
            onClick={() => onSelectTab('insignias')}
            className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'insignias'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Insignias y Niveles</span>
            {apprenticeState.earnedBadges.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-400 text-amber-950 font-bold">
                {apprenticeState.earnedBadges.length}
              </span>
            )}
          </button>

          <button
            id="tab-historial"
            onClick={() => onSelectTab('historial')}
            className={`px-3 py-2 rounded-lg flex items-center space-x-1.5 whitespace-nowrap transition-colors ${
              activeTab === 'historial'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Historial y Evidencias</span>
            {apprenticeState.attempts.length > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                {apprenticeState.attempts.length}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
};
