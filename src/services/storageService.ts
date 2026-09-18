import { ApprenticeState, EvaluationAttempt, StudyReminderConfig } from '../types';

const STORAGE_KEY = 'inventarios_apprentice_state_v1';
const THEME_KEY = 'inventarios_theme_preference';

export function generateSyncCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'INV-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function getDefaultState(): ApprenticeState {
  return {
    name: '',
    apprenticeId: '',
    organization: 'Gestión Empresarial',
    attempts: [],
    earnedBadges: [],
    syncCode: generateSyncCode(),
    studyReminder: {
      enabled: false,
      time: '09:00',
      frequency: 'daily',
      soundEnabled: true
    }
  };
}

export function loadApprenticeState(): ApprenticeState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultState();
    const parsed = JSON.parse(raw) as ApprenticeState;
    if (!parsed.syncCode) {
      parsed.syncCode = generateSyncCode();
    }
    return parsed;
  } catch (e) {
    console.error('Error loading local state:', e);
    return getDefaultState();
  }
}

export function saveApprenticeState(state: ApprenticeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving local state:', e);
  }
}

export function loadThemePreference(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function saveThemePreference(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (e) {
    console.error('Error saving theme preference:', e);
  }
}

// Cloud Synchronization via server API with fallback
export async function syncStateWithCloud(state: ApprenticeState): Promise<{ success: boolean; message: string; timestamp?: string }> {
  try {
    const payload = {
      ...state,
      lastCloudSync: new Date().toISOString()
    };

    const res = await fetch('/api/sync/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        syncCode: state.syncCode,
        data: payload
      })
    });

    if (res.ok) {
      const data = await res.json();
      saveApprenticeState(payload);
      return { success: true, message: 'Sincronizado exitosamente en la nube.', timestamp: payload.lastCloudSync };
    } else {
      // Local cloud backup fallback
      saveApprenticeState(payload);
      return { success: true, message: 'Progreso guardado localmente con respaldo listo.', timestamp: new Date().toISOString() };
    }
  } catch (error) {
    // Network or offline fallback
    const payload = { ...state, lastCloudSync: new Date().toISOString() };
    saveApprenticeState(payload);
    return { success: true, message: 'Guardado localmente (modo sin conexión).', timestamp: payload.lastCloudSync };
  }
}

export async function fetchStateFromCloud(syncCode: string): Promise<{ success: boolean; data?: ApprenticeState; message: string }> {
  try {
    const res = await fetch(`/api/sync/load?code=${encodeURIComponent(syncCode.trim().toUpperCase())}`);
    if (res.ok) {
      const json = await res.json();
      if (json.data) {
        saveApprenticeState(json.data);
        return { success: true, data: json.data, message: 'Datos descargados exitosamente desde la nube.' };
      }
    }
    return { success: false, message: 'No se encontraron datos en la nube para este código de sincronización.' };
  } catch (error) {
    return { success: false, message: 'No fue posible conectar con el servicio en la nube. Verifique su conexión.' };
  }
}
