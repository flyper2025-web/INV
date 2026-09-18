import React, { useState } from 'react';
import { ApprenticeState, EvaluationAttempt } from '../types';
import { 
  FileText, 
  Download, 
  Printer, 
  Trash2, 
  Calendar, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';
import { downloadEvidenceReportHtml } from '../utils/generateEvidenceReport';
import { EvidenceReportModal } from './EvidenceReportModal';

interface HistoryTabProps {
  apprenticeState: ApprenticeState;
  onClearHistory: () => void;
  onTakeEvaluation: () => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({
  apprenticeState,
  onClearHistory,
  onTakeEvaluation
}) => {
  const [selectedAttempt, setSelectedAttempt] = useState<EvaluationAttempt | null>(null);

  const attempts = apprenticeState.attempts;

  if (attempts.length === 0) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16 px-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
          <FileText className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white font-heading">
          Historial de Evaluaciones Vacío
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Aún no has completado ninguna evaluación de 20 preguntas. Realiza un intento para generar tu primer reporte descargable de evidencias.
        </p>
        <div className="pt-2">
          <button
            onClick={onTakeEvaluation}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md transition cursor-pointer"
          >
            Iniciar Primera Evaluación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Historial de Evaluaciones y Reportes de Evidencias
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Consulta tus calificaciones anteriores y vuelve a descargar cualquier reporte oficial.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              if (window.confirm('¿Deseas limpiar el historial de evaluaciones? Esta acción no se puede deshacer.')) {
                onClearHistory();
              }
            }}
            className="px-3 py-2 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold flex items-center space-x-1.5 transition border border-rose-200 dark:border-rose-900/60"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Borrar Historial</span>
          </button>

          <button
            onClick={onTakeEvaluation}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm transition flex items-center space-x-1.5 shadow-sm"
          >
            <span>Nueva Evaluación</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Attempts List */}
      <div className="space-y-3">
        {attempts.map((attempt, index) => {
          const attemptNum = attempts.length - index;
          const isHigh = attempt.score >= 71;
          const mins = Math.floor(attempt.durationSeconds / 60);
          const secs = attempt.durationSeconds % 60;

          return (
            <div
              key={attempt.id}
              className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition hover:border-indigo-300 dark:hover:border-indigo-800"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold font-heading flex-shrink-0 ${
                  isHigh 
                    ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300' 
                    : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                }`}>
                  <span className="text-xl leading-none">{attempt.score}</span>
                  <span className="text-[10px] uppercase font-semibold">/100</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      Intento #{attemptNum} &bull; {attempt.apprenticeName}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {attempt.level.name}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(attempt.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{mins}m {secs}s</span>
                    </span>
                    <span className="flex items-center space-x-1 font-semibold text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{attempt.correctCount} / 20 correctas ({Math.round((attempt.correctCount / 20) * 100)}%)</span>
                    </span>
                  </div>

                  <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium pt-0.5">
                    {attempt.level.badgeTitle}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setSelectedAttempt(attempt)}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition flex items-center space-x-1.5"
                  title="Ver certificado e imprimir"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Ver Detalle</span>
                </button>

                <button
                  onClick={() => downloadEvidenceReportHtml(attempt)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition flex items-center space-x-1.5 shadow-xs"
                  title="Descargar reporte HTML"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Evidencia</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Modal */}
      {selectedAttempt && (
        <EvidenceReportModal
          attempt={selectedAttempt}
          isOpen={!!selectedAttempt}
          onClose={() => setSelectedAttempt(null)}
        />
      )}

    </div>
  );
};
