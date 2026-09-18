import React, { useState, useEffect } from 'react';
import { 
  ApprenticeState, 
  EvaluationAttempt, 
  StudyReminderConfig 
} from './types';
import { 
  loadApprenticeState, 
  saveApprenticeState, 
  loadThemePreference, 
  saveThemePreference 
} from './services/storageService';
import { checkAndTriggerDailyReminder } from './services/notificationService';
import { Header } from './components/Header';
import { EvaluationQuiz } from './components/EvaluationQuiz';
import { EvaluationResults } from './components/EvaluationResults';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { BadgesShowcase } from './components/BadgesShowcase';
import { HistoryTab } from './components/HistoryTab';
import { LeaderboardTab } from './components/LeaderboardTab';
import { CloudSyncModal } from './components/CloudSyncModal';
import { StudyReminderModal } from './components/StudyReminderModal';
import { DownloadHtmlModal } from './components/DownloadHtmlModal';
import { Bell, Check, X, ShieldAlert, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return loadThemePreference() === 'dark';
  });

  // Apprentice Profile & History State
  const [apprenticeState, setApprenticeState] = useState<ApprenticeState>(() => {
    return loadApprenticeState();
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<'evaluacion' | 'ranking' | 'estadisticas' | 'insignias' | 'historial'>('evaluacion');

  // Currently completed evaluation attempt to show results screen
  const [activeAttemptResult, setActiveAttemptResult] = useState<EvaluationAttempt | null>(null);

  // Modals
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  // Notification Toast banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      saveThemePreference('dark');
    } else {
      document.documentElement.classList.remove('dark');
      saveThemePreference('light');
    }
  }, [darkMode]);

  // Persist state changes
  const updateApprenticeState = (updater: (prev: ApprenticeState) => ApprenticeState) => {
    setApprenticeState(prev => {
      const next = updater(prev);
      saveApprenticeState(next);
      return next;
    });
  };

  // Daily study reminder check interval
  useEffect(() => {
    const checkReminder = () => {
      checkAndTriggerDailyReminder(
        apprenticeState.studyReminder,
        apprenticeState.name,
        (msg) => {
          setToastMessage(msg);
          // Auto clear after 8s
          setTimeout(() => setToastMessage(null), 8000);
          // Update lastNotifiedDate
          updateApprenticeState(prev => ({
            ...prev,
            studyReminder: {
              ...prev.studyReminder,
              lastNotifiedDate: new Date().toISOString().split('T')[0]
            }
          }));
        }
      );
    };

    checkReminder();
    const interval = setInterval(checkReminder, 60000); // check every minute
    return () => clearInterval(interval);
  }, [apprenticeState.studyReminder, apprenticeState.name]);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  const handleEvaluationFinished = (attempt: EvaluationAttempt) => {
    setActiveAttemptResult(attempt);
    // Switch to evaluation tab to view results
    setActiveTab('evaluacion');
  };

  const handleStartNewAttempt = () => {
    setActiveAttemptResult(null);
    setActiveTab('evaluacion');
  };

  const handleClearHistory = () => {
    updateApprenticeState(prev => ({
      ...prev,
      attempts: []
    }));
    setActiveAttemptResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
      
      {/* Top Notification Toast */}
      {toastMessage && (
        <aside 
          aria-label="Notificaciones del sistema"
          className="fixed top-20 right-4 z-50 max-w-sm p-4 rounded-2xl bg-indigo-600 text-white shadow-xl border border-indigo-500/50 flex items-start space-x-3 animate-in slide-in-from-top-4 duration-300"
        >
          <Bell className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-300 animate-bounce" />
          <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed">
            {toastMessage}
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 rounded hover:bg-white/20 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* Main Header with Navigation */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          // If moving away from evaluation results, user can re-access later via history
        }}
        onOpenSync={() => setIsSyncModalOpen(true)}
        onOpenReminder={() => setIsReminderModalOpen(true)}
        onOpenDownloadHtml={() => setIsDownloadModalOpen(true)}
        apprenticeState={apprenticeState}
        isEvaluating={!activeAttemptResult && activeTab === 'evaluacion'}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {activeTab === 'evaluacion' && (
          <>
            {activeAttemptResult ? (
              <EvaluationResults
                attempt={activeAttemptResult}
                onNewAttempt={handleStartNewAttempt}
                onGoToAnalytics={() => setActiveTab('estadisticas')}
                onGoToLeaderboard={() => setActiveTab('ranking')}
              />
            ) : (
              <EvaluationQuiz
                apprenticeState={apprenticeState}
                onUpdateApprenticeState={updateApprenticeState}
                onEvaluationCompleted={handleEvaluationFinished}
              />
            )}
          </>
        )}

        {activeTab === 'ranking' && (
          <LeaderboardTab
            apprenticeState={apprenticeState}
            onTakeEvaluation={handleStartNewAttempt}
          />
        )}

        {activeTab === 'estadisticas' && (
          <AnalyticsDashboard
            apprenticeState={apprenticeState}
            onTakeEvaluation={handleStartNewAttempt}
          />
        )}

        {activeTab === 'insignias' && (
          <BadgesShowcase
            apprenticeState={apprenticeState}
            onTakeEvaluation={handleStartNewAttempt}
          />
        )}

        {activeTab === 'historial' && (
          <HistoryTab
            apprenticeState={apprenticeState}
            onClearHistory={handleClearHistory}
            onTakeEvaluation={handleStartNewAttempt}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-slate-200 dark:border-slate-800/80 py-6 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Plataforma de Evaluación de Competencias en Gestión de Inventarios &bull; FAEDIS / Gestión Empresarial
          </p>
          <p className="flex items-center space-x-1">
            <span>100 Preguntas Oficiales &bull; Selección Aleatoria de 20 &bull; Tabla de Líderes Global (Top 10)</span>
          </p>
        </div>
      </footer>

      {/* Modals */}
      <CloudSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        apprenticeState={apprenticeState}
        onStateRestored={(newState) => {
          setApprenticeState(newState);
          saveApprenticeState(newState);
          setToastMessage('¡Progreso sincronizado exitosamente!');
          setTimeout(() => setToastMessage(null), 4000);
        }}
      />

      <StudyReminderModal
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        apprenticeState={apprenticeState}
        onUpdateReminder={(reminderConfig) => {
          updateApprenticeState(prev => ({
            ...prev,
            studyReminder: reminderConfig
          }));
        }}
      />

      <DownloadHtmlModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />

    </div>
  );
}
