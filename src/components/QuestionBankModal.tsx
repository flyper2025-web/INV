import React, { useState } from 'react';
import { QUESTIONS_DATABASE } from '../data/questions';
import { Question, QuestionType, QuestionCategory } from '../types';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Lightbulb, 
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const QuestionBankModal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredQuestions = QUESTIONS_DATABASE.filter(q => {
    const matchesSearch = 
      q.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(q.correctAnswer).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'all' || q.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const categories = Array.from(new Set(QUESTIONS_DATABASE.map(q => q.category)));

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Banco Oficial de {QUESTIONS_DATABASE.length} Preguntas Especializadas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Explora la totalidad de reactivos diseñados a partir de la Unidad 3: Gestión de Inventarios para nivel experto.
          </p>
        </div>
        <div className="text-xs font-bold px-3.5 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 w-fit">
          {QUESTIONS_DATABASE.length} Preguntas Disponibles
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar por concepto, pregunta, EOQ, ABC, seguridad..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={e => setSelectedType(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Todos los tipos de reactivos</option>
            <option value="multiple_choice">Selección Múltiple (26)</option>
            <option value="true_false">Verdadero / Falso (14)</option>
            <option value="short_answer">Respuestas Cortas (10)</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">Todas las categorías temáticas</option>
            {categories.map(cat => {
              const sample = QUESTIONS_DATABASE.find(q => q.category === cat);
              return (
                <option key={cat} value={cat}>
                  {sample?.categoryLabel}
                </option>
              );
            })}
          </select>

        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-slate-500 text-sm">
            No se encontraron preguntas que coincidan con los criterios de búsqueda.
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xs transition hover:border-slate-300 dark:hover:border-slate-700"
              >
                <div 
                  className="flex items-start justify-between gap-3 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : q.id)}
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="w-5 h-5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-[10px]">
                        #{q.id}
                      </span>
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        {q.categoryLabel}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {q.type === 'multiple_choice' ? 'Selección Múltiple' : q.type === 'true_false' ? 'V / F' : 'Respuesta Corta'}
                      </span>
                    </div>

                    <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-1">
                      {q.prompt}
                    </h2>
                  </div>

                  <button
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    aria-label={isExpanded ? 'Contraer' : 'Expandir'}
                  >
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3 animate-in fade-in duration-200 text-xs sm:text-sm">
                    
                    {/* Options if available */}
                    {q.options && (
                      <div className="space-y-1.5 pl-2">
                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Opciones formuladas:
                        </div>
                        {q.options.map((opt, oIdx) => {
                          const isCorrect = opt.toLowerCase() === String(q.correctAnswer).toLowerCase();
                          return (
                            <div
                              key={oIdx}
                              className={`p-2 rounded-lg border text-xs flex items-center space-x-2 ${
                                isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold'
                                  : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <span className="font-mono text-[10px] w-4">{String.fromCharCode(65 + oIdx)}.</span>
                              <span>{opt}</span>
                              {isCorrect && <span className="ml-auto text-[10px] text-emerald-600 font-extrabold uppercase">Correcta</span>}
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Correct Answer Display */}
                    <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                      <span className="font-bold">Respuesta Correcta:</span>{' '}
                      <span className="font-mono font-semibold">{String(q.correctAnswer)}</span>
                    </div>

                    {/* Pedagogical Explanation */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center space-x-1.5 font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                        <Lightbulb className="w-4 h-4" />
                        <span>Fundamentación Teórica de la Unidad 3:</span>
                      </div>
                      <p className="leading-relaxed text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                        {q.explanation}
                      </p>
                    </div>

                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
