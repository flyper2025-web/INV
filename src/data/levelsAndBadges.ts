import { PerformanceLevel, Badge, PerformanceLevelId } from '../types';

export const PERFORMANCE_LEVELS: Record<PerformanceLevelId, PerformanceLevel> = {
  principiante: {
    id: 'principiante',
    name: 'Nivel Principiante',
    range: [0, 30],
    badgeTitle: 'Insignia de Iniciación: Aprendiz de Almacén',
    description: 'Posee nociones preliminares pero requiere afianzar conceptos clave de control de existencias, clasificación y modelos de reaprovisionamiento.',
    color: 'amber',
    bgGradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-400 dark:border-amber-500'
  },
  intermedio: {
    id: 'intermedio',
    name: 'Nivel Intermedio',
    range: [31, 70],
    badgeTitle: 'Insignia Operativa: Gestor de Stock',
    description: 'Comprende las actividades logísticas fundamentales, la distinción de inventarios y los objetivos básicos de equilibrio entre servicio y costos.',
    color: 'blue',
    bgGradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/40 text-blue-600 dark:text-blue-400',
    textColor: 'text-blue-600 dark:text-blue-400',
    borderClass: 'border-blue-400 dark:border-blue-500'
  },
  avanzado: {
    id: 'avanzado',
    name: 'Nivel Avanzado',
    range: [71, 90],
    badgeTitle: 'Insignia Estratégica: Analista de Cadena de Suministro',
    description: 'Demuestra sólido dominio en segmentación ABC, modelos determinísticos (EOQ), demanda dependiente/independiente y prevención de obsolescencia.',
    color: 'emerald',
    bgGradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-400 dark:border-emerald-500'
  },
  experto: {
    id: 'experto',
    name: 'Nivel Experto',
    range: [91, 100],
    badgeTitle: 'Insignia de Excelencia: Maestro en Control de Inventarios',
    description: 'Capacidad consultora y directiva máxima en gestión integral de inventarios, optimización de lote económico, sistemas P/Q y mitigación de riesgos de ruptura.',
    color: 'purple',
    bgGradient: 'from-purple-500/25 to-violet-600/15 border-purple-500/50 text-purple-600 dark:text-purple-300',
    textColor: 'text-purple-600 dark:text-purple-300',
    borderClass: 'border-purple-400 dark:border-purple-500'
  }
};

export const ALL_BADGES: Badge[] = [
  // Nivel Badges
  {
    id: 'badge-level-principiante',
    title: 'Aprendiz de Almacén',
    subtitle: 'Nivel Principiante (0 - 30 pts)',
    description: 'Iniciaste tu proceso formativo en fundamentos de existencias y flujo de suministros.',
    iconName: 'Package',
    badgeType: 'level',
    requirement: 'Obtén entre 0 y 30 puntos en la evaluación.'
  },
  {
    id: 'badge-level-intermedio',
    title: 'Gestor Operativo de Stock',
    subtitle: 'Nivel Intermedio (31 - 70 pts)',
    description: 'Demostraste solvencia en administración de inventarios físicos y tipos de procesos productivos.',
    iconName: 'Boxes',
    badgeType: 'level',
    requirement: 'Obtén entre 31 y 70 puntos en la evaluación.'
  },
  {
    id: 'badge-level-avanzado',
    title: 'Estratega de Cadena de Suministro',
    subtitle: 'Nivel Avanzado (71 - 90 pts)',
    description: 'Destacaste por tu comprensión técnica en políticas de aprovisionamiento, métodos de previsión y segmentación ABC.',
    iconName: 'Award',
    badgeType: 'level',
    requirement: 'Obtén entre 71 y 90 puntos en la evaluación.'
  },
  {
    id: 'badge-level-experto',
    title: 'Maestro en Control de Inventarios',
    subtitle: 'Nivel Experto (91 - 100 pts)',
    description: 'Máxima distinción académica y empresarial en gestión, modelado matemático y control de inventarios.',
    iconName: 'Crown',
    badgeType: 'level',
    requirement: 'Obtén 91 puntos o más en la evaluación.'
  },

  // Achievement Badges
  {
    id: 'badge-achievement-perfect',
    title: 'Puntaje de Excelencia Absoluta',
    subtitle: '100% de Aciertos',
    description: 'Respondiste correctamente las 20 preguntas seleccionadas sin cometer ningún error.',
    iconName: 'CheckCheck',
    badgeType: 'achievement',
    requirement: 'Alcanzar una calificación perfecta de 100/100.'
  },
  {
    id: 'badge-achievement-abc',
    title: 'Ojo Clínico en Clasificación ABC',
    subtitle: 'Especialista en Segmentación',
    description: 'Acertaste con precisión todas las preguntas relacionadas con la metodología y criterios ABC.',
    iconName: 'Layers',
    badgeType: 'achievement',
    requirement: '100% de aciertos en preguntas de Clasificación ABC durante el intento.'
  },
  {
    id: 'badge-achievement-pq',
    title: 'Especialista en Sistemas P y Q',
    subtitle: 'Modelos Determinísticos & Probabilísticos',
    description: 'Dominas la distinción entre periodo fijo (P) y volumen económico de pedido (Q/EOQ).',
    iconName: 'TrendingUp',
    badgeType: 'achievement',
    requirement: '100% de aciertos en preguntas de Sistemas y Modelos de Inventario.'
  },
  {
    id: 'badge-achievement-first-attempt',
    title: 'Primer Intento Certificado',
    subtitle: 'Pionero en Evaluación',
    description: 'Completaste con éxito tu primera evaluación oficial de conocimientos.',
    iconName: 'Target',
    badgeType: 'achievement',
    requirement: 'Completar tu primera evaluación en la plataforma.'
  },
  {
    id: 'badge-achievement-speed',
    title: 'Respuesta Estratégica Rápida',
    subtitle: 'Agilidad y Precisión',
    description: 'Completaste la evaluación en menos de 5 minutos obteniendo un desempeño Avanzado o Experto.',
    iconName: 'Zap',
    badgeType: 'achievement',
    requirement: 'Terminar la prueba en menos de 300 segundos con calificación >= 71.'
  }
];

export function getLevelForScore(score: number): PerformanceLevel {
  if (score <= 30) return PERFORMANCE_LEVELS.principiante;
  if (score <= 70) return PERFORMANCE_LEVELS.intermedio;
  if (score <= 90) return PERFORMANCE_LEVELS.avanzado;
  return PERFORMANCE_LEVELS.experto;
}
