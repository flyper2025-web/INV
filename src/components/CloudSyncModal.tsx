import React, { useState } from 'react';
import { ApprenticeState } from '../types';
import { 
  Cloud, 
  X, 
  Copy, 
  Check, 
  Upload, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  Smartphone, 
  Monitor,
  AlertCircle
} from 'lucide-react';
import { syncStateWithCloud, fetchStateFromCloud } from '../services/storageService';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprenticeState: ApprenticeState;
  onStateRestored: (newState: ApprenticeState) => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  isOpen,
  onClose,
  apprenticeState,
  onStateRestored
}) => {
  const [copied, setCopied] = useState(false);
  const [remoteCodeInput, setRemoteCodeInput] = useState('');
  const [syncStatus, setSyncStatus] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(apprenticeState.syncCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setErrorMsg(null);
    setSyncStatus('Sincronizando estado con el servidor en la nube...');

    const result = await syncStateWithCloud(apprenticeState);
    setIsSyncing(false);
    if (result.success) {
      setSyncStatus(result.message);
    } else {
      setErrorMsg(result.message);
      setSyncStatus(null);
    }
  };

  const handleRestoreFromCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remoteCodeInput.trim()) return;

    setIsSyncing(true);
    setErrorMsg(null);
    setSyncStatus('Buscando datos en la nube...');

    const result = await fetchStateFromCloud(remoteCodeInput);
    setIsSyncing(false);

    if (result.success && result.data) {
      onStateRestored(result.data);
      setSyncStatus('¡Progreso descargado y restaurado exitosamente!');
    } else {
      setErrorMsg(result.message);
      setSyncStatus(null);
    }
  };

  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(apprenticeState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `respaldo_inventarios_${apprenticeState.syncCode}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && Array.isArray(parsed.attempts)) {
            onStateRestored(parsed);
            setSyncStatus('Copia de seguridad importada con éxito.');
          } else {
            setErrorMsg('El archivo seleccionado no tiene el formato válido de respaldo.');
          }
        } catch (err) {
          setErrorMsg('Error al leer el archivo JSON.');
        }
      };
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Cloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-heading">
                Sincronización en la Nube
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guarda y transfiere tu progreso entre computador y móvil
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

        {/* Current Sync Code Card */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 text-center space-y-2">
          <div className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
            Tu Código Único de Sincronización en la Nube
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="font-mono text-2xl font-black text-indigo-950 dark:text-indigo-200 tracking-wider">
              {apprenticeState.syncCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-lg bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-slate-700 transition shadow-xs"
              title="Copiar código"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-[11px] text-indigo-800/80 dark:text-indigo-300/80">
            Ingresa este código en tu teléfono o tableta para cargar instantáneamente tus calificaciones e insignias.
          </p>

          <div className="pt-2">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Sincronizando...' : 'Guardar y Sincronizar Ahora'}</span>
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {syncStatus && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs flex items-center space-x-2">
            <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{syncStatus}</span>
          </div>
        )}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Restore from Another Device Form */}
        <form onSubmit={handleRestoreFromCode} className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
            Cargar progreso desde otro dispositivo:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={remoteCodeInput}
              onChange={e => setRemoteCodeInput(e.target.value.toUpperCase())}
              placeholder="Ej: INV-7B3Q"
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm uppercase placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={isSyncing || !remoteCodeInput.trim()}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs transition disabled:opacity-50"
            >
              Restaurar
            </button>
          </div>
        </form>

        {/* Offline Backup Export / Import */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={handleExportJson}
            className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Copia (.JSON)</span>
          </button>

          <label className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center space-x-1 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Importar Copia (.JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportJson}
              className="hidden"
            />
          </label>
        </div>

      </div>
    </div>
  );
};
