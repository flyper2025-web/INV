import { LeaderboardEntry, EvaluationAttempt } from '../types';

const LEADERBOARD_KEY = 'inventarios_global_leaderboard_v2';
const PUBLISHED_ATTEMPTS_KEY = 'inventarios_published_attempt_ids_v2';

// Realistic benchmark expert learners across logistics and business management
const INITIAL_BENCHMARK_ENTRIES: LeaderboardEntry[] = [
  {
    id: 'bench-1',
    apprenticeName: 'Ing. Valeria Restrepo',
    organization: 'Universidad Nacional - SCM',
    score: 100,
    correctCount: 20,
    durationSeconds: 154, // 2m 34s
    timestamp: '2025-02-28T14:22:00Z',
    levelName: 'Nivel Experto',
    badgeTitle: 'Maestro Estratega en Gestión de Existencias',
    avatarSeed: 'VR',
    sharedNote: 'EOQ y Clasificación ABC dominados al 100% sin margen de error.'
  },
  {
    id: 'bench-2',
    apprenticeName: 'Carlos M. Echeverri',
    organization: 'Centro de Logística SENA',
    score: 100,
    correctCount: 20,
    durationSeconds: 182, // 3m 02s
    timestamp: '2025-03-01T09:45:00Z',
    levelName: 'Nivel Experto',
    badgeTitle: 'Maestro Estratega en Gestión de Existencias',
    avatarSeed: 'CE',
    sharedNote: 'Excelente precisión en el cálculo de stock de seguridad y punto de reorden.'
  },
  {
    id: 'bench-3',
    apprenticeName: 'Dra. Andrea Sofía Morales',
    organization: 'FAEDIS - Especialización',
    score: 95,
    correctCount: 19,
    durationSeconds: 145, // 2m 25s
    timestamp: '2025-03-02T16:10:00Z',
    levelName: 'Nivel Experto',
    badgeTitle: 'Maestro Estratega en Gestión de Existencias',
    avatarSeed: 'AM',
    sharedNote: 'Máxima velocidad en preguntas de análisis estocástico y Newsvendor.'
  },
  {
    id: 'bench-4',
    apprenticeName: 'David Santiago Peña',
    organization: 'Logística Integral Andina',
    score: 95,
    correctCount: 19,
    durationSeconds: 198, // 3m 18s
    timestamp: '2025-03-03T11:30:00Z',
    levelName: 'Nivel Experto',
    badgeTitle: 'Maestro Estratega en Gestión de Existencias',
    avatarSeed: 'DP',
    sharedNote: 'Dominio de los modelos JIT, Kanban y Cross-docking.'
  },
  {
    id: 'bench-5',
    apprenticeName: 'Mariana Gómez Lozano',
    organization: 'Gestión Empresarial EAFIT',
    score: 95,
    correctCount: 19,
    durationSeconds: 220, // 3m 40s
    timestamp: '2025-03-04T18:05:00Z',
    levelName: 'Nivel Experto',
    badgeTitle: 'Maestro Estratega en Gestión de Existencias',
    avatarSeed: 'MG',
    sharedNote: 'Control exhaustivo del efecto látigo y exactitud IRA.'
  },
  {
    id: 'bench-6',
    apprenticeName: 'Alejandro Quintero V.',
    organization: 'Supply Chain Operations Tech',
    score: 90,
    correctCount: 18,
    durationSeconds: 162, // 2m 42s
    timestamp: '2025-03-05T08:15:00Z',
    levelName: 'Nivel Avanzado',
    badgeTitle: 'Especialista en Control y Rotación',
    avatarSeed: 'AQ',
    sharedNote: 'Gran agilidad en resolución de rotación de inventarios y DSI.'
  },
  {
    id: 'bench-7',
    apprenticeName: 'Paola Andrea Torres',
    organization: 'SENA Regional Antioquia',
    score: 90,
    correctCount: 18,
    durationSeconds: 189, // 3m 09s
    timestamp: '2025-03-06T13:40:00Z',
    levelName: 'Nivel Avanzado',
    badgeTitle: 'Especialista en Control y Rotación',
    avatarSeed: 'PT',
    sharedNote: 'Respuesta precisa en políticas de conteo cíclico y normas NIIF.'
  },
  {
    id: 'bench-8',
    apprenticeName: 'Felipe Henao Betancur',
    organization: 'Cámara de Comercio - Logística',
    score: 90,
    correctCount: 18,
    durationSeconds: 235, // 3m 55s
    timestamp: '2025-03-07T10:20:00Z',
    levelName: 'Nivel Avanzado',
    badgeTitle: 'Especialista en Control y Rotación',
    avatarSeed: 'FH',
    sharedNote: 'Fuerte fundamentación en costos de posesión y tasa de oportunidad.'
  },
  {
    id: 'bench-9',
    apprenticeName: 'Laura Camila Benítez',
    organization: 'Pontificia Universidad Javeriana',
    score: 85,
    correctCount: 17,
    durationSeconds: 175, // 2m 55s
    timestamp: '2025-03-08T15:50:00Z',
    levelName: 'Nivel Avanzado',
    badgeTitle: 'Especialista en Control y Rotación',
    avatarSeed: 'LB',
    sharedNote: 'Excelente en clasificación ABC multicriterio y factor Z.'
  },
  {
    id: 'bench-10',
    apprenticeName: 'Sebastián Morales R.',
    organization: 'Instituto Tecnológico Metropolitano',
    score: 85,
    correctCount: 17,
    durationSeconds: 210, // 3m 30s
    timestamp: '2025-03-09T17:00:00Z',
    levelName: 'Nivel Avanzado',
    badgeTitle: 'Especialista en Control y Rotación',
    avatarSeed: 'SM',
    sharedNote: 'Comprensión sólida de la demanda dependiente y árboles BOM.'
  }
];

export function getLeaderboardEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) {
      saveLeaderboardEntries(INITIAL_BENCHMARK_ENTRIES);
      return INITIAL_BENCHMARK_ENTRIES;
    }
    const parsed = JSON.parse(raw) as LeaderboardEntry[];
    return sortLeaderboardEntries(parsed);
  } catch (e) {
    console.error('Error reading leaderboard entries:', e);
    return INITIAL_BENCHMARK_ENTRIES;
  }
}

export function saveLeaderboardEntries(entries: LeaderboardEntry[]): void {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error('Error saving leaderboard entries:', e);
  }
}

export function getTop10Leaderboard(): LeaderboardEntry[] {
  const all = getLeaderboardEntries();
  return all.slice(0, 10);
}

// Sorting logic: Primary = score DESC, Secondary = durationSeconds ASC (faster = higher), Tertiary = timestamp DESC
export function sortLeaderboardEntries(entries: LeaderboardEntry[]): LeaderboardEntry[] {
  return [...entries].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    if (a.durationSeconds !== b.durationSeconds) {
      return a.durationSeconds - b.durationSeconds;
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });
}

export function getPublishedAttemptIds(): string[] {
  try {
    const raw = localStorage.getItem(PUBLISHED_ATTEMPTS_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function isAttemptPublished(attemptId: string): boolean {
  return getPublishedAttemptIds().includes(attemptId);
}

export function markAttemptAsPublished(attemptId: string): void {
  const ids = getPublishedAttemptIds();
  if (!ids.includes(attemptId)) {
    ids.push(attemptId);
    try {
      localStorage.setItem(PUBLISHED_ATTEMPTS_KEY, JSON.stringify(ids));
    } catch (e) {
      console.error(e);
    }
  }
}

export function publishAttemptToLeaderboard(
  attempt: EvaluationAttempt,
  customAlias?: string,
  customOrganization?: string,
  note?: string
): { entry: LeaderboardEntry; rank: number; isTop10: boolean } {
  const all = getLeaderboardEntries();

  // Create entry
  const name = customAlias?.trim() || attempt.apprenticeName || 'Aprendiz Experto';
  const org = customOrganization?.trim() || 'Gestión Empresarial';

  // Seed avatar from initials
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('') || 'AP';

  const newEntry: LeaderboardEntry = {
    id: `user-entry-${attempt.id}`,
    apprenticeName: name,
    apprenticeId: attempt.apprenticeId,
    organization: org,
    score: attempt.score,
    correctCount: attempt.correctCount,
    durationSeconds: attempt.durationSeconds,
    timestamp: attempt.timestamp || new Date().toISOString(),
    levelName: attempt.level.name,
    badgeTitle: attempt.level.badgeTitle,
    isCurrentUser: true,
    avatarSeed: initials,
    sharedNote: note?.trim() || `Logró ${attempt.correctCount}/20 aciertos en ${formatDuration(attempt.durationSeconds)}.`
  };

  // Remove previous entry with same id if any
  const filtered = all.filter(e => e.id !== newEntry.id);
  filtered.push(newEntry);

  const sorted = sortLeaderboardEntries(filtered);
  saveLeaderboardEntries(sorted);
  markAttemptAsPublished(attempt.id);

  const rank = sorted.findIndex(e => e.id === newEntry.id) + 1;

  return {
    entry: newEntry,
    rank,
    isTop10: rank <= 10
  };
}

export function calculateProjectedRank(score: number, durationSeconds: number): { rank: number; total: number } {
  const all = getLeaderboardEntries();
  const dummy: LeaderboardEntry = {
    id: 'dummy',
    apprenticeName: 'dummy',
    organization: 'dummy',
    score,
    correctCount: 0,
    durationSeconds,
    timestamp: new Date().toISOString(),
    levelName: '',
    badgeTitle: ''
  };

  const simulated = sortLeaderboardEntries([...all, dummy]);
  const rank = simulated.findIndex(e => e.id === 'dummy') + 1;
  return { rank, total: all.length + 1 };
}

export function resetLeaderboardToDefault(): void {
  saveLeaderboardEntries(INITIAL_BENCHMARK_ENTRIES);
  try {
    localStorage.removeItem(PUBLISHED_ATTEMPTS_KEY);
  } catch (e) {
    console.error(e);
  }
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}s`;
  return `${mins}m ${secs.toString().padStart(2, '0')}s`;
}

// Generate an encrypted or shareable challenge token for friends
export function createChallengePayload(entry: LeaderboardEntry): string {
  const data = {
    n: entry.apprenticeName,
    o: entry.organization,
    s: entry.score,
    c: entry.correctCount,
    d: entry.durationSeconds,
    t: entry.timestamp
  };
  try {
    return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
  } catch {
    return `${entry.score}-${entry.durationSeconds}`;
  }
}

export function parseChallengePayload(token: string): Partial<LeaderboardEntry> | null {
  try {
    const raw = decodeURIComponent(escape(atob(token.trim())));
    const parsed = JSON.parse(raw);
    return {
      apprenticeName: parsed.n,
      organization: parsed.o,
      score: parsed.s,
      correctCount: parsed.c,
      durationSeconds: parsed.d,
      timestamp: parsed.t,
      levelName: parsed.s >= 91 ? 'Nivel Experto' : parsed.s >= 71 ? 'Nivel Avanzado' : 'Nivel Intermedio',
      badgeTitle: 'Retador Invitado',
      isCurrentUser: false,
      avatarSeed: parsed.n ? parsed.n.substring(0, 2).toUpperCase() : 'AM'
    };
  } catch {
    return null;
  }
}

export function addExternalChallenger(entry: Omit<LeaderboardEntry, 'id'>): LeaderboardEntry {
  const all = getLeaderboardEntries();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: `friend-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
  };
  const updated = sortLeaderboardEntries([...all, newEntry]);
  saveLeaderboardEntries(updated);
  return newEntry;
}
