import React, { useState } from 'react';
import { ApprenticeState, StudyReminderConfig } from '../types';
import { 
  Bell, 
  X, 
  Clock, 
  Check, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { 
  isNotificationSupported, 
  requestNotificationPermission, 
  sendStudyReminderNotification 
} from '../services/notificationService';

interface StudyReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprenticeState: ApprenticeState;
  onUpdateReminder: (reminderConfig: StudyReminderConfig) => void;
}

export const StudyReminderModal: React.FC<StudyReminderModalProps> = ({
  isOpen,
  onClose,
  apprenticeState,
  onUpdateReminder
}) => {
  const currentConfig = apprenticeState.studyReminder;
  const [enabled, setEnabled] = useState(currentConfig.enabled);
  const [time, setTime] = useState(currentConfig.time || '09:00');
  const [frequency, setFrequency] = useState<'daily' | 'weekdays'>(currentConfig.frequency || 'daily');
  const [soundEnabled, setSoundEnabled] = useState(currentConfig.soundEnabled ?? true);
  const [permissionState, setPermissionState] = useState<string>(
    isNotificationSupported() ? Notification.permission : 'not-supported'
  );
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRequestPermission = async () => {
    const result = await requestNotificationPermission();
    setPermissionState(result);
    if (result === 'granted') {
      setFeedbackMsg('¡Permiso concedido! Ahora podrás recibir tus recordatorios diarios de estudio.');
    } else {
      setFeedbackMsg('El permiso de notificaciones fue denegado en tu navegador.');
    }
  };

  const handleTestNotification = () => {
    sendStudyReminderNotification(apprenticeState.name);
    setFeedbackMsg('¡Notificación de prueba enviada! Si no la ves en tu escritorio, verifica que las notificaciones del navegador estén permitidas.');
  };

  const handleSave = () => {
    const updated: StudyReminderConfig = {
      enabled,
      time,
      frequency,
      soundEnabled,
      lastNotifiedDate: currentConfig.lastNotifiedDate
    };
    onUpdateReminder(updated);
    setFeedbackMsg('Configuración de recordatorios guardada exitosamente.');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Recordatorios de Estudio
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Notificaciones personalizadas para mantener tu constancia
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Master Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Activar Notificaciones Diarias
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Recibe avisos para repasar conceptos clave de inventarios
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={enabled}
              onChange={e => setEnabled(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {/* Configuration settings when enabled */}
        {enabled && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Time Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5 flex items-center space-x-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Hora del Recordatorio:</span>
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Frequency Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Frecuencia:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFrequency('daily')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                    frequency === 'daily'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Todos los días
                </button>
                <button
                  type="button"
                  onClick={() => setFrequency('weekdays')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                    frequency === 'weekdays'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  Lunes a Viernes
                </button>
              </div>
            </div>

            {/* Sound toggle */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                {soundEnabled ? <Volume2 className="w-4 h-4 text-indigo-500" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                <span>Sonido de campana motivacional</span>
              </span>
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`text-xs font-bold px-3 py-1 rounded-lg border transition ${
                  soundEnabled 
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                }`}
              >
                {soundEnabled ? 'Activado' : 'Silenciado'}
              </button>
            </div>

            {/* Browser permission status & Test button */}
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  Permiso del Navegador:
                </span>
                <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                  permissionState === 'granted'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                    : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                }`}>
                  {permissionState === 'granted' ? 'Permitido' : 'Requiere Habilitación'}
                </span>
              </div>

              {permissionState !== 'granted' && (
                <button
                  type="button"
                  onClick={handleRequestPermission}
                  className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition"
                >
                  Solicitar Permiso de Notificación
                </button>
              )}

              <button
                type="button"
                onClick={handleTestNotification}
                className="w-full py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-medium text-xs transition"
              >
                Probar Notificación y Sonido Ahora
              </button>
            </div>

          </div>
        )}

        {/* Feedback message */}
        {feedbackMsg && (
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 text-xs flex items-center space-x-2">
            <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition shadow-md cursor-pointer"
          >
            Guardar Preferencias de Recordatorio
          </button>
        </div>

      </div>
    </div>
  );
};
