import { EvaluationAttempt } from '../types';

export function downloadEvidenceReportHtml(attempt: EvaluationAttempt): void {
  const htmlContent = generateEvidenceReportHtml(attempt);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = attempt.apprenticeName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  a.download = `Reporte_Evidencias_Inventarios_${safeName}_${attempt.score}pts.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function generateEvidenceReportHtml(attempt: EvaluationAttempt): string {
  const dateFormatted = new Date(attempt.timestamp).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const minutes = Math.floor(attempt.durationSeconds / 60);
  const seconds = attempt.durationSeconds % 60;
  const durationText = `${minutes} min ${seconds} seg`;

  const rows = attempt.answers
    .map((record, index) => {
      const isOk = record.isCorrect;
      const statusBadge = isOk
        ? `<span style="background:#dcfce7;color:#166534;padding:4px 10px;border-radius:12px;font-weight:700;font-size:12px;">CORRECTO (+5 pts)</span>`
        : `<span style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:12px;font-weight:700;font-size:12px;">INCORRECTO (0 pts)</span>`;

      return `
      <tr style="border-bottom: 1px solid #e2e8f0; background: ${index % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="padding: 14px; text-align: center; font-weight: bold; color: #475569; width: 40px;">${index + 1}</td>
        <td style="padding: 14px;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 700; color: #64748b; margin-bottom: 4px;">
            ${record.question.categoryLabel} &bull; ${record.question.type === 'multiple_choice' ? 'Selección Múltiple' : record.question.type === 'true_false' ? 'Verdadero / Falso' : 'Respuesta Corta'}
          </div>
          <div style="font-size: 14px; font-weight: 600; color: #0f172a; margin-bottom: 8px;">
            ${record.question.prompt}
          </div>
          <div style="font-size: 13px; margin-bottom: 4px;">
            <strong style="color: #475569;">Respuesta del Aprendiz:</strong> 
            <span style="color: ${isOk ? '#15803d' : '#b91c1c'}; font-weight: 600;">${record.userAnswer || '(Sin respuesta)'}</span>
          </div>
          ${
            !isOk
              ? `<div style="font-size: 13px; margin-bottom: 4px;">
                  <strong style="color: #475569;">Respuesta Correcta Oficial:</strong> 
                  <span style="color: #15803d; font-weight: 600;">${String(record.question.correctAnswer)}</span>
                 </div>`
              : ''
          }
          <div style="font-size: 12px; color: #334155; background: #f1f5f9; padding: 8px 12px; border-radius: 6px; margin-top: 6px; border-left: 3px solid #6366f1;">
            <strong>Fundamento Teórico:</strong> ${record.question.explanation}
          </div>
        </td>
        <td style="padding: 14px; text-align: center; vertical-align: top; width: 140px;">
          ${statusBadge}
        </td>
      </tr>
    `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Reporte de Evidencias - ${attempt.apprenticeName}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
      background: #f8fafc;
      margin: 0;
      padding: 30px 20px;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.05);
      overflow: hidden;
    }
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      color: #ffffff;
      padding: 32px 36px;
      border-bottom: 4px solid #4f46e5;
    }
    .header h1 {
      margin: 0 0 6px 0;
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .header p {
      margin: 0;
      color: #cbd5e1;
      font-size: 14px;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      padding: 24px 36px;
      background: #f8fafc;
      border-bottom: 1px solid #e2e8f0;
    }
    .stat-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      padding: 14px 18px;
      border-radius: 8px;
    }
    .stat-label {
      font-size: 12px;
      color: #64748b;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .stat-value {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 4px;
    }
    .badge-chip {
      display: inline-block;
      background: #ede9fe;
      color: #5b21b6;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 9999px;
      font-size: 12px;
      margin-top: 4px;
    }
    .content {
      padding: 30px 36px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
    }
    .table th {
      background: #f1f5f9;
      color: #475569;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 12px 14px;
      text-align: left;
      border-bottom: 2px solid #cbd5e1;
    }
    .footer {
      padding: 20px 36px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      body { background: white; padding: 0; }
      .container { border: none; box-shadow: none; max-width: 100%; }
      .header { background: #1e293b !important; color: white !important; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Reporte Oficial de Evidencias de Competencias</h1>
      <p>Módulo: Unidad 3 - Gestión Integral de Inventarios | Gestión Empresarial</p>
    </div>

    <div class="summary-grid">
      <div class="stat-card">
        <div class="stat-label">Aprendiz Evaluado</div>
        <div class="stat-value" style="color: #4338ca;">${attempt.apprenticeName}</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 2px;">ID: ${attempt.apprenticeId || 'Registrado'}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Calificación Final</div>
        <div class="stat-value" style="font-size: 26px; color: ${attempt.score >= 71 ? '#15803d' : attempt.score >= 31 ? '#d97706' : '#dc2626'};">
          ${attempt.score} <span style="font-size: 15px; color: #64748b; font-weight: normal;">/ 100 pts</span>
        </div>
        <div style="font-size: 12px; color: #64748b;">${attempt.correctCount} correctas de 20</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Nivel de Desempeño</div>
        <div class="stat-value" style="font-size: 17px; color: #1e293b;">${attempt.level.name}</div>
        <span class="badge-chip">${attempt.level.badgeTitle}</span>
      </div>
      <div class="stat-card">
        <div class="stat-label">Fecha y Duración</div>
        <div class="stat-value" style="font-size: 14px; font-weight: 700;">${dateFormatted}</div>
        <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Tiempo: ${durationText}</div>
      </div>
    </div>

    <div class="content">
      <h2 style="font-size: 18px; margin: 0 0 4px 0; color: #0f172a;">Detalle de las 20 Preguntas Evaluadas</h2>
      <p style="font-size: 13px; color: #64748b; margin: 0 0 16px 0;">Registro minucioso de reactivos, opciones marcadas por el aprendiz, verificación y fundamentación teórica.</p>

      <table class="table">
        <thead>
          <tr>
            <th style="width: 40px; text-align: center;">#</th>
            <th>Pregunta, Respuestas y Retroalimentación</th>
            <th style="text-align: center; width: 140px;">Resultado</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div>Documento de Verificación Académica emitido por el Sistema Interactivo de Gestión de Inventarios</div>
      <div>Código de Validación: ${attempt.id}</div>
    </div>
  </div>
</body>
</html>
`;
}
