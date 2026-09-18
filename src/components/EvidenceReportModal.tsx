import React from 'react';
import { EvaluationAttempt } from '../types';
import { 
  X, 
  Download, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  User, 
  Building2 
} from 'lucide-react';
import { downloadEvidenceReportHtml } from '../utils/generateEvidenceReport';
import { ALL_BADGES } from '../data/levelsAndBadges';

interface EvidenceReportModalProps {
  attempt: EvaluationAttempt;
  isOpen: boolean;
  onClose: () => void;
}

export const EvidenceReportModal: React.FC<EvidenceReportModalProps> = ({
  attempt,
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    downloadEvidenceReportHtml(attempt);
  };

  const earnedBadgesDetails = ALL_BADGES.filter(b => attempt.earnedBadgeIds.includes(b.id));

  const minutes = Math.floor(attempt.durationSeconds / 60);
  const seconds = attempt.durationSeconds % 60;
  const formattedDuration = `${minutes}m ${seconds}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden">
        
        {/* Header toolbar (Hidden in print) */}
        <div className="no-print sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-sm sm:text-base font-heading">
              Reporte Oficial de Evidencias de Aprendizaje
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition shadow-sm"
              title="Descargar archivo descargable"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Reporte HTML</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700"
              title="Imprimir o guardar en PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Content Body */}
        <div className="p-6 sm:p-10 space-y-8 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          
          {/* Certificate Title Header */}
          <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 mb-2">
              Constancia de Evaluación de Competencias
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
              Gestión Integral de Inventarios
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Programa de Especialización en Gestión Empresarial &bull; Unidad 3
            </p>
          </div>

          {/* Apprentice & Evaluation Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                <span>Aprendiz</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mt-1 truncate">
                {attempt.apprenticeName}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                ID: {attempt.apprenticeId || 'General'}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 text-indigo-500" />
                <span>Calificación Final</span>
              </div>
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                {attempt.score} <span className="text-sm font-normal text-slate-500 dark:text-slate-400">/ 100 pts</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {attempt.correctCount} correctas de {attempt.totalQuestions}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                <span>Nivel Alcanzado</span>
              </div>
              <div className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {attempt.level.name}
              </div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                {attempt.level.badgeTitle}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>Fecha y Tiempo</span>
              </div>
              <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-1">
                {new Date(attempt.timestamp).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Duración: {formattedDuration}
              </div>
            </div>

          </div>

          {/* Insignias Desbloqueadas */}
          {earnedBadgesDetails.length > 0 && (
            <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/60">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 mb-2.5 flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Insignias de Desempeño y Reconocimientos Obtenidos:</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {earnedBadgesDetails.map(badge => (
                  <span
                    key={badge.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 shadow-xs"
                  >
                    🏆 {badge.title} ({badge.subtitle})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Question Listing */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading">
                Detalle Exhaustivo de las 20 Preguntas Evaluadas
              </h3>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Aprobación: {attempt.score >= 71 ? 'Satisfactoria (Avanzado/Experto)' : 'En Proceso'}
              </span>
            </div>

            <div className="space-y-4">
              {attempt.answers.map((record, index) => {
                const isOk = record.isCorrect;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border text-xs sm:text-sm ${
                      isOk
                        ? 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                          isOk ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          {index + 1}
                        </span>
                        <span className="font-semibold text-slate-600 dark:text-slate-400 text-xs">
                          {record.question.categoryLabel}
                        </span>
                      </div>
                      <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full font-bold text-xs ${
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

                    <div className="font-semibold text-slate-900 dark:text-white mb-2">
                      {record.question.prompt}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 text-xs">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <span className="text-slate-500 dark:text-slate-400 block font-medium">Respuesta del Aprendiz:</span>
                        <span className={`font-bold ${isOk ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                          {record.userAnswer || '(Sin respuesta)'}
                        </span>
                      </div>
                      {!isOk && (
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                          <span className="text-slate-500 dark:text-slate-400 block font-medium">Respuesta Correcta:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {String(record.question.correctAnswer)}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 text-xs text-slate-600 dark:text-slate-300">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Fundamento Teórico:</span>{' '}
                      {record.question.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Official Verification Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div>
              <p className="font-medium text-slate-700 dark:text-slate-300">
                Sistema Automatizado de Evaluación y Certificación Logística
              </p>
              <p>Código Único de Intento: {attempt.id}</p>
            </div>
            <div className="text-right">
              <p>Facultad de Estudios a Distancia &bull; FAEDIS</p>
              <p>Material de Referencia: Rojas, Guisao, Cano (2011) & Ávila (2010)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
