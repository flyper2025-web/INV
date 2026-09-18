import React, { useState } from 'react';
import { Download, Check, FileCode, HardDrive, WifiOff, Sparkles, X, ShieldCheck } from 'lucide-react';

interface DownloadHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadHtmlModal: React.FC<DownloadHtmlModalProps> = ({
  isOpen,
  onClose
}) => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    try {
      setDownloading(true);

      // Fetch the pre-bundled standalone HTML
      let response = await fetch('/evaluacion-inventarios-offline.html');
      
      let htmlText = '';
      if (response.ok) {
        htmlText = await response.text();
      } else {
        // Fallback: If in dev server and file isn't pre-rendered yet, construct it dynamically
        const indexResp = await fetch('/');
        htmlText = await indexResp.text();
      }

      // Create a Blob with HTML content
      const blob = new Blob([htmlText], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Evaluacion-Gestion-Inventarios-Offline.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => {
        setDownloaded(false);
      }, 4000);
    } catch (err) {
      console.error('Error al descargar archivo HTML:', err);
      // Direct link fallback
      const link = document.createElement('a');
      link.href = '/evaluacion-inventarios-offline.html';
      link.download = 'Evaluacion-Gestion-Inventarios-Offline.html';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 flex-shrink-0">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 mb-1">
              <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Ejecución 100% Autónoma e Independiente</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
              Descargar Versión .HTML Offline
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Lleva toda la plataforma en un único archivo ejecutable en cualquier computador o navegador, sin necesidad de conexión a internet.
            </p>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="flex items-start space-x-3">
            <WifiOff className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Funciona sin Internet:</span>
              <p className="text-slate-600 dark:text-slate-400">
                Todo el código, diseño (Tailwind), lógica de calificación y el banco de 100 preguntas están incrustados en un único archivo.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <HardDrive className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Doble Clic para Abrir:</span>
              <p className="text-slate-600 dark:text-slate-400">
                Compatible con Google Chrome, Microsoft Edge, Mozilla Firefox, Safari u Opera. No requiere instalar Node.js ni servidores.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Persistencia Local:</span>
              <p className="text-slate-600 dark:text-slate-400">
                Tus notas, intentos de evaluación, insignias y récord en la Tabla de Líderes se guardan directamente en tu navegador local.
              </p>
            </div>
          </div>
        </div>

        {/* Download Action */}
        <div className="space-y-2">
          <button
            id="btn-download-html-file"
            onClick={handleDownload}
            disabled={downloading}
            className={`w-full py-3.5 px-4 rounded-xl font-extrabold text-sm transition flex items-center justify-center space-x-2 shadow-lg active:scale-98 ${
              downloaded
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
            }`}
          >
            {downloaded ? (
              <>
                <Check className="w-5 h-5 text-white" />
                <span>¡Archivo .HTML Descargado con Éxito!</span>
              </>
            ) : downloading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generando paquete autónomo...</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>Descargar Archivo: Evaluacion-Gestion-Inventarios-Offline.html</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-slate-400 dark:text-slate-500">
            Tamaño estimado: ~820 KB &bull; Contiene 100 preguntas especializadas, Tabla de Líderes y Sistema de Insignias.
          </p>
        </div>
      </div>
    </div>
  );
};
