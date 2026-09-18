import { StudyReminderConfig } from '../types';

export function isNotificationSupported(): boolean {
  return typeof window !== 'undefined' && 'Notification' in window;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isNotificationSupported()) return 'denied';
  try {
    return await Notification.requestPermission();
  } catch (err) {
    console.error('Error requesting notification permission:', err);
    return 'denied';
  }
}

export function playSuccessChime(): void {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch (e) {
    // Ignore audio context errors
  }
}

export function playReminderChime(): void {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (e) {
    // Ignore audio context errors
  }
}

export function sendStudyReminderNotification(apprenticeName?: string): void {
  const title = 'Recordatorio de Estudio: Gestión de Inventarios';
  const nameSalutation = apprenticeName ? `${apprenticeName}, ¡` : '¡';
  const body = `${nameSalutation}es momento de repasar tus conceptos de inventarios (Modelos P/Q, Clasificación ABC y EOQ) para mantener tu nivel de excelencia!`;

  playReminderChime();

  if (isNotificationSupported() && Notification.permission === 'granted') {
    try {
      new Notification(title, {
        body,
        icon: '/favicon.ico',
        tag: 'daily-study-reminder'
      });
    } catch (e) {
      console.warn('System notification failed, fallback to in-app notification', e);
    }
  }
}

export function checkAndTriggerDailyReminder(
  config: StudyReminderConfig,
  apprenticeName: string,
  onTriggerBanner: (msg: string) => void
): boolean {
  if (!config.enabled) return false;

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // If already notified today, skip
  if (config.lastNotifiedDate === todayStr) return false;

  const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
  if (config.frequency === 'weekdays' && (dayOfWeek === 0 || dayOfWeek === 6)) {
    return false;
  }

  const [targetHour, targetMinute] = config.time.split(':').map(Number);
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // If current time is equal or greater than scheduled time
  if (currentHour > targetHour || (currentHour === targetHour && currentMinute >= targetMinute)) {
    sendStudyReminderNotification(apprenticeName);
    onTriggerBanner(`🔔 Recordatorio Diario: ${apprenticeName ? apprenticeName + ', ' : ''}es hora de tu sesión de estudio de Gestión de Inventarios.`);
    return true;
  }

  return false;
}
