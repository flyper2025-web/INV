import { Question } from '../types';

export const QUESTIONS_DATABASE: Question[] = [
  // --- CONCEPTOS BÁSICOS Y DEFINICIÓN ---
  {
    id: 1,
    type: 'multiple_choice',
    category: 'conceptos_basicos',
    categoryLabel: 'Conceptos Básicos',
    prompt: 'Según el documento, ¿cuál es el escenario principal y propósito esencial de un inventario dentro de una empresa?',
    options: [
      'Facilitar la continuidad del proceso productivo y la satisfacción de la demanda de los clientes',
      'Acumular la mayor cantidad de producto terminado para especular con los precios del mercado',
      'Eliminar por completo los costos de almacenamiento y distribución física',
      'Sustituir los procesos de compras directas mediante fabricación interna exclusivamente'
    ],
    correctAnswer: 'Facilitar la continuidad del proceso productivo y la satisfacción de la demanda de los clientes',
    explanation: 'El documento define el inventario como una provisión de materiales cuyo escenario principal es facilitar la continuidad del proceso productivo y asegurar la satisfacción de la demanda de los clientes.',
    difficulty: 'intermedio'
  },
  {
    id: 2,
    type: 'multiple_choice',
    category: 'conceptos_basicos',
    categoryLabel: 'Conceptos Básicos',
    prompt: 'Dentro de la dinámica de un sistema productivo, ¿cómo actúan fundamentalmente los inventarios entre fases sucesivas?',
    options: [
      'Como reguladores o amortiguadores entre los ritmos de salida de una fase y los de entrada de las siguientes',
      'Como cuellos de botella controlados para elevar artificialmente el precio del producto',
      'Como depósitos estáticos sin relación con las cadencias de abastecimiento',
      'Como activos financieros intangibles sin impacto operativo en la fábrica'
    ],
    correctAnswer: 'Como reguladores o amortiguadores entre los ritmos de salida de una fase y los de entrada de las siguientes',
    explanation: 'Los inventarios actúan como reguladores o amortiguadores que sincronizan y absorben las diferencias entre las tasas de salida de una fase y los ritmos de entrada de la siguiente.',
    difficulty: 'avanzado'
  },
  {
    id: 3,
    type: 'multiple_choice',
    category: 'conceptos_basicos',
    categoryLabel: 'Conceptos Básicos',
    prompt: 'En la gestión de inventarios, ¿qué significa específicamente la acción de "ORGANIZAR"?',
    options: [
      'Fijar criterios y políticas para su regulación y determinar las cantidades más convenientes de cada artículo',
      'Establecer métodos de previsión matemática y momentos exactos de reposición',
      'Inspeccionar físicamente las cajas en bodega diariamente y reordenarlas alfabéticamente',
      'Registrar las facturas de proveedores únicamente al cierre del ejercicio contable'
    ],
    correctAnswer: 'Fijar criterios y políticas para su regulación y determinar las cantidades más convenientes de cada artículo',
    explanation: 'El texto señala textualmente: "Organizar significa fijar criterios y políticas para su regulación y determinar las cantidades más convenientes de cada uno de los artículos".',
    difficulty: 'avanzado'
  },
  {
    id: 4,
    type: 'multiple_choice',
    category: 'conceptos_basicos',
    categoryLabel: 'Conceptos Básicos',
    prompt: 'Cuando en la gestión de inventarios se habla de "PLANIFICAR", ¿qué actividades clave se establecen?',
    options: [
      'Se establecen los métodos de previsión y se determinan los momentos y cantidades de reposición',
      'Se despiden o contratan operarios de acuerdo con el humor del supervisor de planta',
      'Se fijan únicamente las sanciones a proveedores por retrasos de transporte',
      'Se computa el valor residual de la maquinaria obsoleta del almacén'
    ],
    correctAnswer: 'Se establecen los métodos de previsión y se determinan los momentos y cantidades de reposición',
    explanation: 'De acuerdo con el documento, planificar implica establecer los métodos de previsión y determinar oportunamente los momentos y cantidades de reposición.',
    difficulty: 'avanzado'
  },
  {
    id: 5,
    type: 'true_false',
    category: 'conceptos_basicos',
    categoryLabel: 'Conceptos Básicos',
    prompt: '¿Verdadero o Falso? La gestión de inventarios es una operación aislada que no tiene carácter transversal a la cadena de abastecimiento.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. El texto resalta en su introducción que "la gestión de inventarios es una operación transversal a la cadena de abastecimiento y compone uno de los aspectos logísticos más complejos".',
    difficulty: 'intermedio'
  },

  // --- OBJETIVOS Y VENTAJAS ---
  {
    id: 6,
    type: 'multiple_choice',
    category: 'objetivos_ventajas',
    categoryLabel: 'Objetivos y Ventajas',
    prompt: '¿Cuál es el objetivo primordial de la gestión de inventarios según el texto de estudio?',
    options: [
      'Actuar como reguladores entre los ritmos de abastecimiento y las cadencias o consumos de sus salidas',
      'Maximizar el espacio físico ocupado en bodega para justificar el costo de arrendamiento',
      'Eliminar todo tipo de stock de seguridad para que el capital de trabajo sea cero',
      'Comprar exclusivamente bajo condiciones de urgencia sin planificación de lote'
    ],
    correctAnswer: 'Actuar como reguladores entre los ritmos de abastecimiento y las cadencias o consumos de sus salidas',
    explanation: 'El texto indica claramente que el objetivo primordial es actuar como reguladores entre los ritmos de abastecimiento y las cadencias o consumos de sus salidas.',
    difficulty: 'intermedio'
  },
  {
    id: 7,
    type: 'multiple_choice',
    category: 'objetivos_ventajas',
    categoryLabel: 'Objetivos y Ventajas',
    prompt: 'Para lograr el equilibrio entre la calidad de servicio y los costos derivados de tener inventario, ¿cuáles son los dos aspectos complementarios indispensables?',
    options: [
      'El sistema de reposición y el stock de seguridad',
      'El precio de venta y el salario de los bodegueros',
      'La depreciación acelerada y el costo del flete aéreo',
      'La publicidad masiva y las promociones 2x1'
    ],
    correctAnswer: 'El sistema de reposición y el stock de seguridad',
    explanation: 'El documento indica expresamente: "Para conseguir este propósito, se deben tener en cuenta dos aspectos complementarios: El sistema de reposición y El stock de seguridad".',
    difficulty: 'experto'
  },
  {
    id: 8,
    type: 'true_false',
    category: 'objetivos_ventajas',
    categoryLabel: 'Objetivos y Ventajas',
    prompt: '¿Verdadero o Falso? Uno de los objetivos de la gestión de inventarios es reducir el riesgo sobre la certeza en la demanda de los productos.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. La gestión de inventarios permite reducir el riesgo de incertidumbre frente a las fluctuaciones de la demanda del mercado.',
    difficulty: 'intermedio'
  },
  {
    id: 9,
    type: 'multiple_choice',
    category: 'objetivos_ventajas',
    categoryLabel: 'Objetivos y Ventajas',
    prompt: 'Entre las ventajas de adoptar un sistema formal de gestión de inventarios, ¿cuál de las siguientes NO corresponde a las citadas en el texto?',
    options: [
      'Garantizar que jamás se presenten mermas sin necesidad de supervisar físicamente el almacén',
      'Prever las necesidades medias futuras a satisfacer y aceptar un nivel de riesgo de ruptura',
      'Calcular los pedidos teniendo en cuenta la disminución de costos de gestión y los límites de proveedores',
      'Mantener un stock de seguridad adecuado y conocer su comportamiento histórico'
    ],
    correctAnswer: 'Garantizar que jamás se presenten mermas sin necesidad de supervisar físicamente el almacén',
    explanation: 'El sistema permite gestionar riesgos de ruptura, calcular pedidos óptimos y contabilizar existencias, pero nunca prescinde de la supervisión ni promete la eliminación mágica de mermas sin control.',
    difficulty: 'avanzado'
  },
  {
    id: 10,
    type: 'short_answer',
    category: 'objetivos_ventajas',
    categoryLabel: 'Objetivos y Ventajas',
    prompt: '¿Qué tipo de stock complementario se mantiene en la empresa para equilibrar el nivel de servicio y proteger contra fluctuaciones imprevistas de la demanda?',
    correctAnswer: 'stock de seguridad',
    acceptableAnswers: ['stock de seguridad', 'inventario de seguridad', 'seguridad', 'stock seguridad'],
    explanation: 'El stock de seguridad es el amortiguador complementario esencial para salvaguardar el nivel de servicio ante incertidumbres de demanda o suministro.',
    difficulty: 'intermedio'
  },

  // --- ACTIVIDADES Y PROCESOS PRODUCTIVOS ---
  {
    id: 11,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos',
    prompt: '¿En qué tres tipos principales de existencias se centran básicamente las actividades de la gestión de inventarios?',
    options: [
      'Materias primas, productos en proceso y productos terminados',
      'Activos fijos, maquinaria pesada y bienes inmuebles',
      'Cuentas por cobrar, pagarés bancarios y dividendos',
      'Patentes de invención, marcas registradas y software de nómina'
    ],
    correctAnswer: 'Materias primas, productos en proceso y productos terminados',
    explanation: 'El texto indica que las actividades de la gestión de inventarios se centran fundamentalmente en materias primas, productos en proceso y productos terminados.',
    difficulty: 'intermedio'
  },
  {
    id: 12,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos',
    prompt: 'En un proceso de producción por "ÓRDENES ESPECÍFICAS", ¿cómo opera la adquisición de materia prima y entrega del producto?',
    options: [
      'La materia prima se adquiere después de recibir el pedido y el producto se entrega inmediatamente al terminarlo',
      'Se compran materias primas con meses de anticipación y el producto terminado se almacena indefinidamente',
      'Se produce siempre en lotes gigantescos para stock especulativo sin tener clientes confirmados',
      'No se utiliza materia prima porque este proceso solo aplica a empresas de servicios bancarios'
    ],
    correctAnswer: 'La materia prima se adquiere después de recibir el pedido y el producto se entrega inmediatamente al terminarlo',
    explanation: 'En órdenes específicas, la materia prima se compra tras confirmar el pedido del cliente y el producto se entrega de inmediato una vez fabricado, minimizando inventarios en bodega.',
    difficulty: 'avanzado'
  },
  {
    id: 13,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos',
    prompt: 'En un régimen de "PRODUCCIÓN CONTINUA", ¿cuál es el comportamiento habitual de las materias primas y del producto terminado?',
    options: [
      'Las materias primas se adquieren con anticipación y el producto terminado permanece poco tiempo en inventario',
      'Las materias primas nunca se compran y el producto terminado se acumula durante años',
      'La materia prima se compra después de vender el lote final al consumidor',
      'El producto terminado se destruye físicamente de manera periódica para mantener los precios altos'
    ],
    correctAnswer: 'Las materias primas se adquieren con anticipación y el producto terminado permanece poco tiempo en inventario',
    explanation: 'En producción continua, el aprovisionamiento de insumos es anticipado para sostener la línea ininterrumpida y los productos terminados rotan velozmente hacia la distribución.',
    difficulty: 'avanzado'
  },
  {
    id: 14,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos',
    prompt: 'En el proceso de "MONTAJES O ENSAMBLES", ¿qué decisión productiva clave se debe determinar según el documento?',
    options: [
      'Se determina la cantidad a producir y almacenar para cada producto',
      'Se cancelan todas las órdenes de ensamblaje para trabajar únicamente sobre pedidos manuales',
      'Se subcontrata el 100% de la mano de obra sin fijar metas de almacenamiento',
      'Se calcula exclusivamente el valor de los empaques desechables'
    ],
    correctAnswer: 'Se determina la cantidad a producir y almacenar para cada producto',
    explanation: 'En montajes o ensambles, el método de producción determina con precisión la cantidad a producir y almacenar para cada producto terminado.',
    difficulty: 'avanzado'
  },
  {
    id: 15,
    type: 'true_false',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos',
    prompt: '¿Verdadero o Falso? Los inventarios se administran exactamente de la misma manera sin importar si se trata de una empresa manufacturera, comercializadora o de servicios.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. El texto señala expresamente que la administración de inventarios depende del tipo o naturaleza de la organización y de su estructura organizativa.',
    difficulty: 'intermedio'
  },
  {
    id: 16,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos',
    prompt: '¿Cuáles son los 4 pilares en los que se fundamenta tener el control sobre la administración de inventarios según el texto?',
    options: [
      'En qué momento ordenar/producir, cómo protegerse de variaciones de costos, cuántas unidades pedir y qué artículos merecen atención especial',
      'Quién es el chofer de reparto, qué camión consume menos combustible, cuántos turnos trabaja el vigilante y a qué hora abre la bodega',
      'El color de las cajas, el diseño del logotipo publicitario, el descuento por pronto pago y la depreciación fiscal',
      'El margen de intermediación bancaria, los impuestos aduaneros, el tipo de cambio oficial y la nómina de gerencia'
    ],
    correctAnswer: 'En qué momento ordenar/producir, cómo protegerse de variaciones de costos, cuántas unidades pedir y qué artículos merecen atención especial',
    explanation: 'El documento resume el control en: 1) En qué momento ordenar o producir, 2) Cómo protegerse contra los cambios en costos, 3) Cuántas unidades ordenar o producir, 4) Qué artículos merecen atención especial.',
    difficulty: 'experto'
  },

  // --- TIPOS DE INVENTARIOS SEGÚN CARACTERÍSTICAS FÍSICAS Y OPERATIVAS ---
  {
    id: 17,
    type: 'multiple_choice',
    category: 'tipos_caracteristicas',
    categoryLabel: 'Tipos Físicos y Operativos',
    prompt: '¿Qué condición indispensable deben cumplir las MATERIAS PRIMAS O INSUMOS en las empresas industriales según el documento?',
    options: [
      'Deben ser perfectamente identificables y medibles para determinar el costo final y su composición',
      'Deben ser productos ya terminados listos para su venta en estantería al consumidor',
      'Deben ser materiales intangibles que no sufran transformación física alguna',
      'Deben ser exclusivamente productos importados con aranceles preferenciales'
    ],
    correctAnswer: 'Deben ser perfectamente identificables y medibles para determinar el costo final y su composición',
    explanation: 'El texto indica que la materia prima "debe ser perfectamente identificable y medible, para poder determinar tanto el costo final de producto como su composición".',
    difficulty: 'avanzado'
  },
  {
    id: 18,
    type: 'multiple_choice',
    category: 'tipos_caracteristicas',
    categoryLabel: 'Tipos Físicos y Operativos',
    prompt: '¿Cómo se define el inventario de "PRODUCTOS EN PROCESO" o materia semielaborada?',
    options: [
      'Productos en proceso de elaboración que no han sido terminados y, por tanto, no están disponibles para el cliente',
      'Bienes importados que aún no han pasado la aduana marítima',
      'Elementos destinados únicamente a contener y embellecer el artículo para la venta al público',
      'Artículos en liquidación por haber alcanzado su fecha de caducidad'
    ],
    correctAnswer: 'Productos en proceso de elaboración que no han sido terminados y, por tanto, no están disponibles para el cliente',
    explanation: 'Son aquellos productos que se encuentran en alguna fase de elaboración o manufactura, inconclusos y aún no aptos para la entrega comercial.',
    difficulty: 'intermedio'
  },
  {
    id: 19,
    type: 'multiple_choice',
    category: 'tipos_caracteristicas',
    categoryLabel: 'Tipos Físicos y Operativos',
    prompt: '¿Cuál es la función del inventario de "MATERIAL DE EMPAQUE Y EMBALAJE"?',
    options: [
      'Contener, proteger, manipular, distribuir, transportar y presentar productos de venta al público',
      'Sustituir la materia prima principal para abaratar el costo unitario de fabricación',
      'Almacenar piezas de repuesto para maquinaria averiada en el taller mecánico',
      'Garantizar el pago de fletes a la empresa transportadora'
    ],
    correctAnswer: 'Contener, proteger, manipular, distribuir, transportar y presentar productos de venta al público',
    explanation: 'El documento lo define como todo producto fabricado con materiales apropiados para contener, proteger, manipular, distribuir, transportar y presentar productos de venta al público.',
    difficulty: 'intermedio'
  },
  {
    id: 20,
    type: 'true_false',
    category: 'tipos_caracteristicas',
    categoryLabel: 'Tipos Físicos y Operativos',
    prompt: '¿Verdadero o Falso? La venta de productos terminados a consumidores u otras empresas constituye el objeto principal de la actividad empresarial.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. La obtención y comercialización de productos terminados representa la razón de ser y el objeto de la actividad económica de la empresa.',
    difficulty: 'intermedio'
  },

  // --- TIPOS DE INVENTARIOS SEGÚN CONCEPCIÓN LOGÍSTICA ---
  {
    id: 21,
    type: 'multiple_choice',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística',
    prompt: '¿Qué origina la formación de los INVENTARIOS CÍCLICOS O DE LOTE?',
    options: [
      'La decisión de comprar, producir o transportar por lotes en lugar de una unidad a la vez',
      'Las variaciones climáticas en las temporadas de lluvia o sequía',
      'El temor a huelgas prolongadas de los trabajadores de aduanas',
      'La expectativa de que la tasa de interés caiga por debajo de cero'
    ],
    correctAnswer: 'La decisión de comprar, producir o transportar por lotes en lugar de una unidad a la vez',
    explanation: 'Se originan cuando la empresa opta por gestionar órdenes en lotes para aprovechar economías de escala o facilidades operativas, acumulándose en diferentes puntos del sistema.',
    difficulty: 'avanzado'
  },
  {
    id: 22,
    type: 'multiple_choice',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística',
    prompt: '¿Cuál es el beneficio laboral y operativo de implementar INVENTARIOS ESTACIONALES?',
    options: [
      'Suavizar el nivel de producción para no contratar o despedir trabajadores frecuentemente',
      'Aumentar el pago de horas extras de manera impredecible en los meses festivos',
      'Cerrar la fábrica durante la mitad del año sin pagar costos fijos',
      'Trasladar el riesgo de vencimiento íntegramente a los proveedores'
    ],
    correctAnswer: 'Suavizar el nivel de producción para no contratar o despedir trabajadores frecuentemente',
    explanation: 'Los inventarios estacionales se acumulan para responder a picos de demanda estacional manteniendo una producción nivelada y evitando la inestabilidad en la contratación y despido laboral.',
    difficulty: 'avanzado'
  },
  {
    id: 23,
    type: 'multiple_choice',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística',
    prompt: 'En el caso de las materias primas, ¿contra qué factores específicos de los proveedores protegen los INVENTARIOS DE SEGURIDAD?',
    options: [
      'Tiempos de espera, huelgas y períodos de vacaciones de los proveedores',
      'La fluctuación del tipo de cambio del euro frente al dólar',
      'La insolvencia financiera personal de los socios accionistas',
      'Los cambios de directivos en la junta directiva de la empresa'
    ],
    correctAnswer: 'Tiempos de espera, huelgas y períodos de vacaciones de los proveedores',
    explanation: 'El texto cita explícitamente que los inventarios de seguridad de materias primas protegen contra la incertidumbre del actuar de los proveedores ante tiempos de espera, huelgas y vacaciones.',
    difficulty: 'experto'
  },
  {
    id: 24,
    type: 'multiple_choice',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística',
    prompt: '¿Cuándo se justifican económicamente los INVENTARIOS ESPECULATIVOS?',
    options: [
      'Cuando se espera un aumento de precios superior a los costos de acumulación del inventario',
      'Cuando los productos tienen una fecha de caducidad menor a 48 horas',
      'Cuando los costos de almacenamiento superan con creces el margen comercial proyectado',
      'Cuando el mercado se encuentra en una fase de deflación prolongada'
    ],
    correctAnswer: 'Cuando se espera un aumento de precios superior a los costos de acumulación del inventario',
    explanation: 'Los inventarios especulativos se generan al anticipar aumentos de precios que sobrepasen el costo de mantener inventario (por ejemplo, si las tasas de interés son negativas o inferiores a la inflación).',
    difficulty: 'experto'
  },
  {
    id: 25,
    type: 'short_answer',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística',
    prompt: '¿Qué nombre reciben los inventarios que se crean para proteger a la empresa frente a la incertidumbre en la demanda u oferta de unidades?',
    correctAnswer: 'inventarios de seguridad',
    acceptableAnswers: ['inventario de seguridad', 'inventarios de seguridad', 'seguridad', 'stock de seguridad'],
    explanation: 'Los inventarios de seguridad amortiguan la incertidumbre y previenen faltantes ante fluctuaciones de demanda o plazos de entrega de proveedores.',
    difficulty: 'intermedio'
  },

  // --- CLASIFICACIÓN ABC Y SEGMENTACIÓN ---
  {
    id: 26,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: '¿Cuáles son los dos indicadores de importancia fundamentales en los que se basa la metodología de segmentación ABC?',
    options: [
      'El costo unitario y el volumen anual demandado',
      'El peso bruto y el color del embalaje',
      'La distancia geográfica del cliente y la marca comercial',
      'El número de estanterías requeridas y la antigüedad del proveedor'
    ],
    correctAnswer: 'El costo unitario y el volumen anual demandado',
    explanation: 'El documento define la clasificación ABC como una metodología de segmentación de acuerdo a criterios preestablecidos tales como el "costo unitario" y el "volumen anual demandado".',
    difficulty: 'avanzado'
  },
  {
    id: 27,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: 'En la clasificación ABC, ¿qué características definen a los artículos del GRUPO A?',
    options: [
      'Productos de alto valor y/o gran venta que requieren mayor atención, control estricto y análisis de mercado/costos',
      'Productos de muy bajo valor monetario que se compran en cantidades gigantescas con supervisión informal',
      'Artículos dañados que no pueden venderse y están a la espera de ser incinerados',
      'Materiales secundarios que no tienen ningún impacto en el presupuesto de compras'
    ],
    correctAnswer: 'Productos de alto valor y/o gran venta que requieren mayor atención, control estricto y análisis de mercado/costos',
    explanation: 'Los productos Tipo A concentran el mayor porcentaje del valor total del inventario (~80%) y requieren registro riguroso, análisis preferencial de valores y cálculo preciso de exigencias de seguridad.',
    difficulty: 'intermedio'
  },
  {
    id: 28,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: 'En el gráfico representativo de la clasificación ABC (Curva de Pareto), ¿qué porcentaje aproximado del valor representan típicamente los productos A frente al volumen total?',
    options: [
      'Aproximadamente el 80% del valor total con solo cerca del 20% del volumen de referencias',
      'Exactamente el 33% del valor y el 33% del volumen en perfecta igualdad',
      'Menos del 5% del valor y más del 95% del volumen de artículos',
      'El 50% del valor y el 90% del volumen de artículos almacenados'
    ],
    correctAnswer: 'Aproximadamente el 80% del valor total con solo cerca del 20% del volumen de referencias',
    explanation: 'La gráfica 3.6 del documento ilustra la regla de Pareto: los artículos A representan ~80% del valor monetario acumulado con alrededor del 20% del volumen de referencias.',
    difficulty: 'experto'
  },
  {
    id: 29,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: '¿Cómo deben tratarse operativamente los productos clasificados en el GRUPO C?',
    options: [
      'Bajo el principio de simplificación productiva y administrativa, reducción de costos y trámites simplificados',
      'Con auditorías diarias por parte del gerente general y custodia armada individual',
      'Realizando análisis de mercado y precios todas las semanas artículo por artículo',
      'Prohibiendo su compra hasta agotar el último gramo de materias primas A'
    ],
    correctAnswer: 'Bajo el principio de simplificación productiva y administrativa, reducción de costos y trámites simplificados',
    explanation: 'Los productos C son de bajo valor relativo, por lo que su gestión se enfoca en simplificación administrativa, pedidos de grandes cantidades y supervisión sencilla para ahorrar costos.',
    difficulty: 'avanzado'
  },
  {
    id: 30,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: '¿Cómo se caracteriza el tratamiento de los artículos pertenecientes al GRUPO B?',
    options: [
      'Productos de alto valor con ventas moderadas que requieren un tratamiento normal ajustado a los requerimientos del negocio',
      'Productos que se consideran automáticamente chatarra sin valor contable',
      'Artículos de consumo masivo con supervisión simplificada idéntica a los productos C',
      'Materias primas que jamás pueden solicitarse bajo el sistema Q'
    ],
    correctAnswer: 'Productos de alto valor con ventas moderadas que requieren un tratamiento normal ajustado a los requerimientos del negocio',
    explanation: 'El texto señala para el Grupo B: "Productos de alto valor con ventas moderadas, requieren un tratamiento normal; es decir, una atención ajustada a los requerimientos del negocio".',
    difficulty: 'avanzado'
  },
  {
    id: 31,
    type: 'true_false',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: '¿Verdadero o Falso? Factores como la confiabilidad de proveedores, condiciones de almacenamiento y riesgo de obsolescencia se toman en cuenta para establecer los niveles de importancia de un producto.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. Además del costo y ventas, la lista de criterios incluye oferta y demanda, disponibilidad de recursos, confiabilidad de proveedores, almacenamiento, obsolescencia y nivel de servicio.',
    difficulty: 'intermedio'
  },
  {
    id: 32,
    type: 'short_answer',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC',
    prompt: '¿Qué letra identifica al grupo de artículos de bajo valor y/o poca venta gestionados con trámites y supervisión simplificada?',
    correctAnswer: 'C',
    acceptableAnswers: ['c', 'grupo c', 'categoría c', 'clase c', 'tipo c'],
    explanation: 'El grupo C agrupa los productos de menor valor acumulado, donde prima la simplificación administrativa para no incurrir en gastos desproporcionados de control.',
    difficulty: 'intermedio'
  },

  // --- CLASIFICACIÓN SEGÚN DEMANDA ---
  {
    id: 33,
    type: 'multiple_choice',
    category: 'demanda',
    categoryLabel: 'Clasificación según Demanda',
    prompt: '¿Cuál de los siguientes es un ejemplo directo de DEMANDA INDEPENDIENTE según el material de estudio?',
    options: [
      'Productos finales facturados y repuestos que demande el cliente',
      'Materias primas para ensamblar chasises de automóviles',
      'Insumos químicos incorporados en el reactivo de una fórmula',
      'Tornillos utilizados internamente en la línea de montaje de motores'
    ],
    correctAnswer: 'Productos finales facturados y repuestos que demande el cliente',
    explanation: 'La demanda independiente está determinada directamente por las preferencias del mercado exterior, como los productos finales facturados y repuestos que solicitan los clientes.',
    difficulty: 'avanzado'
  },
  {
    id: 34,
    type: 'multiple_choice',
    category: 'demanda',
    categoryLabel: 'Clasificación según Demanda',
    prompt: '¿Cómo se define y cuáles son ejemplos de la DEMANDA DEPENDIENTE?',
    options: [
      'Se relaciona con la demanda de otro artículo; ejemplos: materias primas, insumos y componentes de fabricación',
      'Es la demanda que deciden los competidores sin relación con el plan de producción de la empresa',
      'Son las ventas al por menor en tiendas de barrio exclusivamente',
      'Corresponde únicamente a productos importados exentos de aranceles'
    ],
    correctAnswer: 'Se relaciona con la demanda de otro artículo; ejemplos: materias primas, insumos y componentes de fabricación',
    explanation: 'La demanda dependiente se deriva directamente del programa maestro de producción de otro artículo final o de orden superior (materias primas, partes, insumos).',
    difficulty: 'avanzado'
  },
  {
    id: 35,
    type: 'true_false',
    category: 'demanda',
    categoryLabel: 'Clasificación según Demanda',
    prompt: '¿Verdadero o Falso? Los repuestos que demanda directamente el cliente final son un ejemplo de demanda dependiente.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. El texto ubica explícitamente a los "repuestos que demande el cliente" bajo DEMANDA INDEPENDIENTE, mientras que los componentes y repuestos requeridos para fabricación interna son demanda dependiente.',
    difficulty: 'experto'
  },
  {
    id: 36,
    type: 'short_answer',
    category: 'demanda',
    categoryLabel: 'Clasificación según Demanda',
    prompt: '¿Cómo se llama la demanda que está determinada directamente por las decisiones de compra del mercado externo?',
    correctAnswer: 'demanda independiente',
    acceptableAnswers: ['demanda independiente', 'independiente'],
    explanation: 'La demanda independiente proviene del cliente y el mercado externo, por lo que debe pronosticarse en lugar de deducirse internamente.',
    difficulty: 'intermedio'
  },

  // --- SISTEMAS Y MODELOS DE INVENTARIOS ---
  {
    id: 37,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿Qué caracteriza esencialmente al SISTEMA P (sistema de periodo constante o periódico)?',
    options: [
      'Se establece un período constante entre pedidos, y el tamaño del pedido varía según existencias y demanda pronosticada',
      'El tamaño del lote pedido es siempre idéntico y los pedidos se disparan aleatoriamente',
      'No se realizan pedidos durante todo el año calendario',
      'Aplica únicamente cuando los precios del petróleo caen en el mercado internacional'
    ],
    correctAnswer: 'Se establece un período constante entre pedidos, y el tamaño del pedido varía según existencias y demanda pronosticada',
    explanation: 'En el Sistema P, las revisiones se hacen en intervalos de tiempo fijos y constantes, calculando en cada momento una cantidad variable para alcanzar el nivel objetivo.',
    difficulty: 'avanzado'
  },
  {
    id: 38,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿Cuál es la característica principal del SISTEMA Q (sistema de volumen económico de pedido)?',
    options: [
      'Tiene el mismo tamaño de lote y se ordena cuando es necesario según el nivel de existencias y demanda prevista',
      'Se ordena todos los días viernes a las 5:00 p.m. sin importar cuántas unidades queden',
      'El lote cambia en cada compra pero las fechas de entrega son fijas e inamovibles',
      'No requiere registrar las entradas y salidas de almacén'
    ],
    correctAnswer: 'Tiene el mismo tamaño de lote y se ordena cuando es necesario según el nivel de existencias y demanda prevista',
    explanation: 'El Sistema Q mantiene un tamaño de lote constante (Q fijo) y se emite un nuevo pedido cada vez que las existencias alcanzan el punto de reorden fijado.',
    difficulty: 'avanzado'
  },
  {
    id: 39,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿Bajo qué premisas operan los MODELOS DETERMINÍSTICOS de inventarios?',
    options: [
      'Demanda y plazo de entrega son constantes y conocidos; precio por unidad constante e independiente del pedido',
      'La demanda es completamente desconocida y se rige por la teoría del caos',
      'El costo de transporte aumenta exponencialmente con cada kilómetro recorrido',
      'Los pedidos se reciben en cantidades aleatorias sin fecha acordada con los proveedores'
    ],
    correctAnswer: 'Demanda y plazo de entrega son constantes y conocidos; precio por unidad constante e independiente del pedido',
    explanation: 'En los modelos determinísticos, todos los parámetros clave (demanda, plazo de entrega o lead time, precios y costos de pedido) se asumen conocidos y constantes con certeza.',
    difficulty: 'experto'
  },
  {
    id: 40,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿Qué método matemático ampliamente conocido se ubica dentro de los modelos determinísticos para el control de inventarios?',
    options: [
      'El método EOQ (Economic Order Quantity o Cantidad Económica de Pedido)',
      'El método de Montecarlo con variables estocásticas múltiples',
      'El diagrama de espina de pescado de Ishikawa',
      'El modelo de regresión no lineal de caja negra'
    ],
    correctAnswer: 'El método EOQ (Economic Order Quantity o Cantidad Económica de Pedido)',
    explanation: 'El documento indica expresamente: "Dentro de este modelo, se encuentra el método EOQ que permite el control de los inventarios".',
    difficulty: 'intermedio'
  },
  {
    id: 41,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿En qué se diferencian los MODELOS PROBABILÍSTICOS O ALEATORIOS de los determinísticos?',
    options: [
      'En los probabilísticos la demanda se conoce solamente en términos de probabilidades',
      'En los probabilísticos la demanda es 100% certera y no existen riesgos de ruptura',
      'Los probabilísticos solo se pueden calcular con calculadoras mecánicas antiguas',
      'No existe diferencia matemática ni operativa entre ambos modelos'
    ],
    correctAnswer: 'En los probabilísticos la demanda se conoce solamente en términos de probabilidades',
    explanation: 'En los modelos estocásticos o probabilísticos, la demanda no es fija ni determinística, sino que sigue una distribución de probabilidades con incertidumbre asociada.',
    difficulty: 'avanzado'
  },
  {
    id: 42,
    type: 'true_false',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿Verdadero o Falso? En el Sistema P, el tamaño de lote pedido siempre permanece fijo e idéntico en cada ciclo de revisión.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. En el Sistema P lo que es fijo es el PERIODO de tiempo entre pedidos, mientras que el TAMAÑO del pedido varía según existencias y demanda.',
    difficulty: 'avanzado'
  },
  {
    id: 43,
    type: 'short_answer',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos',
    prompt: '¿Cuáles son las siglas en inglés del modelo determinístico conocido como "Cantidad Económica de Pedido"?',
    correctAnswer: 'EOQ',
    acceptableAnswers: ['eoq', 'e.o.q.', 'metodo eoq', 'modelo eoq'],
    explanation: 'EOQ (Economic Order Quantity) es el modelo clásico para determinar el lote óptimo que minimiza los costos combinados de orden y tenencia de inventario.',
    difficulty: 'intermedio'
  },

  // --- SISTEMA DE CONTROL Y OBSOLESCENCIA ---
  {
    id: 44,
    type: 'multiple_choice',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Cuál de las siguientes es una función esencial del SISTEMA DE CONTROL en inventarios según el texto?',
    options: [
      'Notificar situaciones fuera de lo común que pueden ser síntomas de un mal funcionamiento del sistema',
      'Obligar a los clientes a comprar productos defectuosos mediante cláusulas punitivas',
      'Modificar manualmente los balances contables para mostrar ganancias irreales',
      'Eliminar las auditorías periódicas de inventario físico'
    ],
    correctAnswer: 'Notificar situaciones fuera de lo común que pueden ser síntomas de un mal funcionamiento del sistema',
    explanation: 'Las funciones del sistema de control citadas son: mantener registro actualizado, informar cuándo y cuánto pedir, notificar anomalías/síntomas y elaborar informes de gestión.',
    difficulty: 'avanzado'
  },
  {
    id: 45,
    type: 'multiple_choice',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Cómo define el documento el concepto técnico de "OBSOLESCENCIA" en el contexto de inventarios?',
    options: [
      'La cualidad del desuso de un objeto surgida por mal funcionamiento o porque su utilidad es insuficiente o superada por otro objeto',
      'La pérdida transitoria de valor causada únicamente por la inflación monetaria del país',
      'La venta con descuento del 50% autorizada por el departamento comercial durante el Black Friday',
      'El traslado de mercancías entre dos bodegas de la misma ciudad'
    ],
    correctAnswer: 'La cualidad del desuso de un objeto surgida por mal funcionamiento o porque su utilidad es insuficiente o superada por otro objeto',
    explanation: 'El texto indica: "La obsolescencia es la cualidad del desuso de un objeto, la cual surgirá a partir de su mal funcionamiento o porque su utilidad se ha vuelto insuficiente o superada por otro objeto que de alguna manera lo reemplaza".',
    difficulty: 'avanzado'
  },
  {
    id: 46,
    type: 'multiple_choice',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Cuáles son las tres consecuencias negativas de la obsolescencia de productos en el inventario citadas textualmente en la Unidad 3?',
    options: [
      'Implica una pérdida que afecta los activos, algunos productos requerirán destrucción física con costo, y puede ocasionar la obsolescencia de otros productos dependientes',
      'Aumento del impuesto a la renta, duplicación del espacio físico útil y sanciones de la superintendencia de salud',
      'Obligación de regalar productos a los empleados, multas laborales y reducción del horario de trabajo',
      'Incremento artificial del valor en bolsa, mejora de liquidez inmediata y ascenso automático de operarios'
    ],
    correctAnswer: 'Implica una pérdida que afecta los activos, algunos productos requerirán destrucción física con costo, y puede ocasionar la obsolescencia de otros productos dependientes',
    explanation: 'El documento enumera textualmente estas 3 consecuencias: 1) pérdida que afecta los activos, 2) destrucción física con costos asociados, y 3) obsolescencia en cadena de productos dependientes.',
    difficulty: 'experto'
  },
  {
    id: 47,
    type: 'true_false',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Verdadero o Falso? La destrucción física de productos obsoletos representa una ganancia neta para la empresa porque libera espacio sin acarrear ningún costo asociado.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. La destrucción física de inventario obsoleto tiene costos operativos, logísticos y ambientales adicionales para la empresa, además de la pérdida del activo.',
    difficulty: 'intermedio'
  },
  {
    id: 48,
    type: 'true_false',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Verdadero o Falso? La obsolescencia de un componente específico puede provocar que otros productos que dependían de él también queden obsoletos.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. En ensambles y cadenas dependientes, la pérdida de vigencia de una parte crítica inhabilita el uso de los ítems complementarios vinculados.',
    difficulty: 'avanzado'
  },
  {
    id: 49,
    type: 'short_answer',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Qué condición negativa sufre un artículo almacenado cuando su utilidad se vuelve insuficiente o es superado por un sustituto tecnológico?',
    correctAnswer: 'obsolescencia',
    acceptableAnswers: ['obsolescencia', 'obsoleto', 'obsolescencia de inventario', 'la obsolescencia'],
    explanation: 'La obsolescencia ocurre cuando un bien deja de ser demandado o funcional debido a innovación tecnológica, vencimiento o reemplazo por nuevas alternativas.',
    difficulty: 'intermedio'
  },
  {
    id: 50,
    type: 'multiple_choice',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: 'Según la conclusión y resumen de la Unidad 3, ¿cuál es el beneficio integral primordial de adoptar un sistema de gestión y control de inventarios en la empresa?',
    options: [
      'Calcular lotes óptimos de pedidos y tiempos precisos de reabastecimiento para controlar todas las entradas y salidas, optimizando el uso del capital en la toma de decisiones',
      'Desconectar el área de compras del resto de la cadena de suministros para actuar de forma independiente',
      'Eliminar por completo los registros contables y reemplazar los informes a la gerencia por intuición visual',
      'Garantizar que no existan sobrantes ni faltantes sin necesidad de emplear fórmulas matemáticas ni modelos'
    ],
    correctAnswer: 'Calcular lotes óptimos de pedidos y tiempos precisos de reabastecimiento para controlar todas las entradas y salidas, optimizando el uso del capital en la toma de decisiones',
    explanation: 'El resumen final enfatiza que el sistema permite calcular lotes óptimos, tiempos precisos de reabastecimiento, controlar flujos de almacén y optimizar el uso del capital de trabajo para la alta dirección.',
    difficulty: 'experto'
  },

  // --- MODELOS CUANTITATIVOS, EOQ Y CURVAS DE COSTO TOTAL ---
  {
    id: 51,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: 'En el modelo clásico de Harris-Wilson (EOQ), ¿qué condición matemática fundamental define el punto donde el costo total anual de inventario es mínimo?',
    options: [
      'La igualdad exacta entre el costo anual de emitir pedidos y el costo anual de mantenimiento/posesión',
      'El punto donde el costo de ordenar supera al triple del costo de adquisición unitario',
      'El nivel de inventario donde el stock de seguridad es exactamente idéntico a la demanda promedio',
      'La intersección de la curva de demanda acumulada con la capacidad máxima volumétrica del almacén'
    ],
    correctAnswer: 'La igualdad exacta entre el costo anual de emitir pedidos y el costo anual de mantenimiento/posesión',
    explanation: 'En el modelo EOQ básico, la curva de costo total alcanza su valor mínimo en el punto exacto donde el costo anual de ordenar (S * D / Q) se iguala con el costo anual de mantener existencias (H * Q / 2).',
    difficulty: 'avanzado'
  },
  {
    id: 52,
    type: 'true_false',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Verdadero o Falso? En el modelo EOQ clásico, si la demanda anual se cuadruplica y los demás parámetros permanecen constantes, el tamaño del lote óptimo de pedido (Q*) se duplica.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. Debido a que el tamaño óptimo de pedido está en función de la raíz cuadrada de la demanda (sqrt(D)), si D se multiplica por 4, sqrt(4) = 2, por lo que el lote Q* se duplica exactamente.',
    difficulty: 'experto'
  },
  {
    id: 53,
    type: 'short_answer',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Qué sigla en inglés (3 letras) o en español (CEP/LEC) designa la cantidad de pedido que minimiza la suma de los costos anuales de ordenar y de mantener existencias?',
    correctAnswer: 'EOQ',
    acceptableAnswers: ['EOQ', 'CEP', 'LEC', 'lote economico de compras', 'lote economico de pedido', 'economic order quantity', 'cantidad economica de pedido'],
    explanation: 'EOQ (Economic Order Quantity), conocido en español como Lote Económico de Compras (LEC) o Cantidad Económica de Pedido (CEP), es el modelo clásico para optimizar el tamaño de reaprovisionamiento.',
    difficulty: 'avanzado'
  },
  {
    id: 54,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: 'Al evaluar una propuesta de descuentos por volumen de compra, ¿por qué razón técnica no basta con seleccionar simplemente el tramo de menor precio unitario?',
    options: [
      'Porque comprar lotes mayores eleva sustancialmente el costo anual de mantenimiento y capital inmovilizado, lo cual puede superar el ahorro generado por el descuento unitario',
      'Porque los proveedores rescinden la garantía técnica cuando se ordenan lotes superiores al promedio de mercado',
      'Porque el costo de emisión de órdenes se vuelve infinito al comprar cantidades superiores al EOQ',
      'Porque la normativa contable prohíbe asentar descuentos comerciales en el libro de almacén'
    ],
    correctAnswer: 'Porque comprar lotes mayores eleva sustancialmente el costo anual de mantenimiento y capital inmovilizado, lo cual puede superar el ahorro generado por el descuento unitario',
    explanation: 'El análisis de descuentos por volumen exige calcular el Costo Total Anual (adquisición + ordenación + mantenimiento). Aunque el precio unitario y el costo de ordenar bajen, el incremento en el inventario promedio eleva el costo de posesión.',
    difficulty: 'experto'
  },
  {
    id: 55,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: 'En el cálculo del costo de mantenimiento o posesión de inventarios (tasa H o Ch), ¿cuál componente suele representar habitualmente la mayor proporción económica?',
    options: [
      'El costo de oportunidad del capital financiero inmovilizado en las existencias (tasa de corte o WACC)',
      'La prima de seguros contra incendios del edificio administrativo',
      'El costo del papel y tintas utilizados en la impresión de las guías de despacho',
      'La amortización de las carretillas manuales utilizadas en la descarga'
    ],
    correctAnswer: 'El costo de oportunidad del capital financiero inmovilizado en las existencias (tasa de corte o WACC)',
    explanation: 'El costo del capital invertido (fondos atados al inventario que no generan rendimientos en otras inversiones o que devengan intereses bancarios) suele representar entre el 10% y el 25% del valor del inventario anual.',
    difficulty: 'avanzado'
  },
  {
    id: 56,
    type: 'true_false',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Verdadero o Falso? El modelo de Cantidad Económica de Producción (EPQ o POQ) asume que la entrega del lote ocurre en forma instantánea y simultánea al momento del pedido.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. El modelo EPQ asume reabastecimiento gradual a una tasa finita de producción diaria (p) que es superior a la tasa de demanda diaria (d), acumulándose existencias a un ritmo neto de (p - d).',
    difficulty: 'avanzado'
  },
  {
    id: 57,
    type: 'short_answer',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Cómo se denomina el costo en el que incurre una organización cuando no dispone de inventario suficiente para atender la demanda, generando ventas perdidas o retrasos?',
    correctAnswer: 'costo de rotura',
    acceptableAnswers: ['costo de rotura', 'costo de agotamiento', 'rotura de stock', 'costo de escasez', 'costo por faltante', 'stockout cost', 'faltante', 'costo de quiebre de stock', 'quiebre de stock'],
    explanation: 'El costo de rotura de stock o de agotamiento incluye el margen de utilidad perdido, penalizaciones contractuales, fletes extraordinarios y la pérdida intangible de buena voluntad del cliente.',
    difficulty: 'avanzado'
  },
  {
    id: 58,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: 'Si las tasas de interés y el costo de capital de una empresa se incrementan significativamente, ¿cómo debería comportarse la política óptima de tamaño de lote (EOQ)?',
    options: [
      'Debería reducirse el tamaño del lote, ordenando cantidades menores con mayor frecuencia para disminuir el capital inmovilizado',
      'Debería aumentarse el tamaño del lote para anticipar compras antes de que los precios suban',
      'Debería mantenerse exactamente igual, pues las tasas financieras no influyen en el modelo EOQ',
      'Debería eliminarse la reposición y operar únicamente bajo inventario cero sin reposición'
    ],
    correctAnswer: 'Debería reducirse el tamaño del lote, ordenando cantidades menores con mayor frecuencia para disminuir el capital inmovilizado',
    explanation: 'Al aumentar el costo de capital, se eleva la tasa de mantenimiento H (ubicada en el denominador de la fórmula EOQ = sqrt(2DS/H)), lo que resulta matemáticamente en un menor lote óptimo Q*.',
    difficulty: 'experto'
  },
  {
    id: 59,
    type: 'true_false',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Verdadero o Falso? La adopción de tecnologías digitales como EDI o portales B2B automatizados reduce el costo de emisión por pedido (S), propiciando lotes de reabastecimiento más pequeños.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. Al reducir drásticamente los costos administrativos y de colocación de órdenes (S), la empresa puede realizar pedidos más frecuentes y de menor volumen, reduciendo el inventario promedio.',
    difficulty: 'avanzado'
  },
  {
    id: 60,
    type: 'short_answer',
    category: 'demanda',
    categoryLabel: 'Demanda de Inventarios',
    prompt: '¿Qué factor estadístico (representado comúnmente con la letra Z) mide el número de desviaciones estándar requeridas para garantizar un nivel de servicio al cliente predeterminado?',
    correctAnswer: 'factor de servicio Z',
    acceptableAnswers: ['factor Z', 'z', 'coeficiente z', 'puntaje z', 'factor de seguridad', 'puntuacion z', 'valor z', 'desviacion z', 'factor de nivel de servicio'],
    explanation: 'El factor Z proviene de la distribución normal estándar y pondera la desviación estándar de la demanda para calcular el stock de seguridad necesario según la probabilidad deseada de no incurrir en rotura.',
    difficulty: 'experto'
  },

  // --- STOCK DE SEGURIDAD, ROP Y CONTROL ESTOCÁSTICO ---
  {
    id: 61,
    type: 'multiple_choice',
    category: 'demanda',
    categoryLabel: 'Demanda de Inventarios',
    prompt: 'Si la demanda diaria tiene una desviación estándar σ_d y el tiempo de entrega (Lead Time) es constante en L días, ¿cuál es la fórmula estadística correcta para determinar la desviación estándar de la demanda durante el lead time (σ_L)?',
    options: [
      'σ_L = √(L) * σ_d',
      'σ_L = L * (σ_d)²',
      'σ_L = σ_d / √(L)',
      'σ_L = (L + σ_d) / 2'
    ],
    correctAnswer: 'σ_L = √(L) * σ_d',
    explanation: 'Dado que la varianza es aditiva para variables independientes (Var_L = L * Var_d), la desviación estándar durante el tiempo de entrega es la raíz cuadrada de la varianza: σ_L = √(L) * σ_d.',
    difficulty: 'experto'
  },
  {
    id: 62,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Cuál es la formulación matemática canónica del Punto de Reorden (ROP) cuando se opera bajo condiciones de incertidumbre y se cuenta con un stock de seguridad (SS)?',
    options: [
      'ROP = (Demanda promedio por período * Tiempo de entrega) + Stock de Seguridad',
      'ROP = (Demanda anual / 365) * (1 - Nivel de servicio)',
      'ROP = Tamaño del lote económico (EOQ) - Stock de Seguridad',
      'ROP = Inventario Máximo Teórico / Costo de Mantenimiento Anual'
    ],
    correctAnswer: 'ROP = (Demanda promedio por período * Tiempo de entrega) + Stock de Seguridad',
    explanation: 'El ROP debe cubrir el consumo esperado durante el tiempo que tarda el proveedor en entregar (d * L) más el colchón de protección frente a variaciones imprevistas (SS).',
    difficulty: 'avanzado'
  },
  {
    id: 63,
    type: 'true_false',
    category: 'demanda',
    categoryLabel: 'Demanda de Inventarios',
    prompt: '¿Verdadero o Falso? Incrementar el nivel de servicio al cliente del 95% al 99% requiere duplicar exactamente la inversión monetaria en stock de seguridad.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. Para un 95% de nivel de servicio, Z ≈ 1.645; para un 99%, Z ≈ 2.326. El incremento en stock de seguridad es de aproximadamente 41%, no el 100%. (El crecimiento exponencial ocurre al intentar alcanzar el 99.9% o 100%).',
    difficulty: 'experto'
  },
  {
    id: 64,
    type: 'short_answer',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística de Inventarios',
    prompt: '¿Qué término técnico (en inglés o español) define el tiempo transcurrido desde que se genera la orden de compra hasta que el material está disponible para su uso en bodega?',
    correctAnswer: 'lead time',
    acceptableAnswers: ['lead time', 'tiempo de entrega', 'tiempo de suministro', 'plazo de entrega', 'tiempo de ciclo de pedido', 'tiempo de reaprovisionamiento'],
    explanation: 'El Lead Time o tiempo de suministro abarca el procesamiento del pedido, fabricación, embalaje, transporte, recepción e inspección técnica en almacén.',
    difficulty: 'avanzado'
  },
  {
    id: 65,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: 'En el modelo del "vendedor de periódicos" (Newsvendor Model) para productos perecederos o con ciclo de vida corto, ¿qué relación matemática define la probabilidad crítica óptima P(d ≤ Q*)?',
    options: [
      'Cu / (Cu + Co), donde Cu es el costo por faltante y Co es el costo por excedente/sobrante',
      'Co / (Cu * Co), calculando la media armónica de las pérdidas',
      '(Cu + Co) / Demanda media del período',
      '1 - (Costo de adquisición / Precio unitario de venta)'
    ],
    correctAnswer: 'Cu / (Cu + Co), donde Cu es el costo por faltante y Co es el costo por excedente/sobrante',
    explanation: 'La fractila crítica óptima es Cu / (Cu + Co). Si el costo de quedarse corto (Cu) es alto relativo a sobrar (Co), la empresa debe asumir un inventario mayor al valor medio esperado.',
    difficulty: 'experto'
  },
  {
    id: 66,
    type: 'true_false',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Verdadero o Falso? En un sistema de revisión continua (Sistema Q o de punto de reorden), los pedidos de reabastecimiento se emiten exclusivamente en fechas fijas de calendario preestablecidas.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. El sistema de revisión continua revisa el nivel de existencias tras cada transacción y emite un pedido de tamaño fijo Q cada vez que el stock alcanza el ROP, independientemente del día del calendario.',
    difficulty: 'avanzado'
  },
  {
    id: 67,
    type: 'multiple_choice',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Cuál es una característica diferencial clave del Sistema de Revisión Periódica (Sistema P) respecto al de Revisión Continua (Sistema Q)?',
    options: [
      'Requiere un mayor stock de seguridad, debido a que debe proteger frente a la incertidumbre durante el período de revisión más el lead time (P + L)',
      'Carece por completo de la capacidad de agrupar órdenes a un mismo proveedor',
      'Exige colocar sensores de pesaje en tiempo real en cada estantería del almacén',
      'El tamaño del lote ordenado es constante y predeterminado en cada revisión'
    ],
    correctAnswer: 'Requiere un mayor stock de seguridad, debido a que debe proteger frente a la incertidumbre durante el período de revisión más el lead time (P + L)',
    explanation: 'En el sistema periódico (P), la empresa está expuesta al riesgo de rotura durante todo el intervalo de revisión más el tiempo de entrega del pedido (P + L), obligando a mantener un colchón de seguridad más robusto.',
    difficulty: 'experto'
  },
  {
    id: 68,
    type: 'short_answer',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: 'En los sistemas de revisión periódica con reposición a nivel meta, ¿cómo se denomina el inventario tope predeterminado (T o M) hasta el cual se ordena producto en cada ciclo?',
    correctAnswer: 'nivel objetivo de inventario',
    acceptableAnswers: ['nivel objetivo', 'nivel objetivo de inventario', 'target inventory level', 'nivel maximo de reposicion', 'nivel maximo', 'nivel de inventario objetivo', 'stock maximo meta'],
    explanation: 'El nivel objetivo de inventario (T) se calcula para cubrir la demanda esperada durante (P + L) más el stock de seguridad: T = d*(P + L) + SS. La cantidad pedida es q = T - Inventario actual.',
    difficulty: 'experto'
  },
  {
    id: 69,
    type: 'multiple_choice',
    category: 'demanda',
    categoryLabel: 'Demanda de Inventarios',
    prompt: 'En la teoría de gestión de la cadena de suministro, ¿cuál es la distinción fundamental entre demanda "independiente" y demanda "dependiente"?',
    options: [
      'La demanda independiente proviene directamente de los clientes en el mercado externo, mientras que la dependiente se deriva y calcula a partir del plan de producción de otros artículos',
      'La demanda independiente se gestiona con MRP y la dependiente con métodos Delphi cualitativos',
      'La demanda independiente aplica exclusivamente a materiales en proceso (WIP) y la dependiente a repuestos finales',
      'La demanda dependiente no puede ser calculada de manera determinística bajo ninguna circunstancia'
    ],
    correctAnswer: 'La demanda independiente proviene directamente de los clientes en el mercado externo, mientras que la dependiente se deriva y calcula a partir del plan de producción de otros artículos',
    explanation: 'La demanda independiente está sujeta a las fuerzas del mercado y requiere pronósticos; la demanda dependiente (partes, subensambles) se calcula de forma exacta mediante la lista de materiales (BOM).',
    difficulty: 'avanzado'
  },
  {
    id: 70,
    type: 'true_false',
    category: 'demanda',
    categoryLabel: 'Demanda de Inventarios',
    prompt: '¿Verdadero o Falso? El Plan Maestro de Producción (MPS) y la Lista de Materiales (BOM) constituyen los insumos principales para el cálculo de la demanda dependiente en sistemas MRP.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. El sistema MRP toma el MPS (cuántos productos terminados hacer y cuándo) y "hace explotar" el BOM para determinar exactamente cuántos componentes y materias primas se requerirán.',
    difficulty: 'avanzado'
  },

  // --- CLASIFICACIÓN ABC MULTICRITERIO Y PARETO AVANZADO ---
  {
    id: 71,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: 'Al realizar un análisis de inventario ABC multicriterio, ¿qué factor cualitativo de alta relevancia debe combinarse con el valor monetario para evitar desatender insumos económicos pero vitales?',
    options: [
      'La criticidad operativa del artículo (impacto de su ausencia en la detención de la planta o servicio)',
      'El peso volumétrico en kilogramos de los envases secundarios',
      'El color y acabado estético de la etiqueta del proveedor',
      'La cercanía geográfica del representante de ventas del fabricante'
    ],
    correctAnswer: 'La criticidad operativa del artículo (impacto de su ausencia en la detención de la planta o servicio)',
    explanation: 'Un repuesto económico (ej. un sensor de 10 dólares) puede clasificarse como C por valor monetario, pero si su falta detiene una línea entera de producción, su criticidad exige políticas de control de Tipo A.',
    difficulty: 'experto'
  },
  {
    id: 72,
    type: 'short_answer',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Qué ley o principio sociológico-económico empírico, fundamentado en la distribución 80-20, da sustento matemático a la clasificación ABC de existencias?',
    correctAnswer: 'principio de pareto',
    acceptableAnswers: ['principio de pareto', 'ley de pareto', 'pareto', 'diagrama de pareto', 'regla 80 20', 'regla de pareto'],
    explanation: 'El Principio de Pareto establece que aproximadamente el 80% de los efectos (o valor acumulado) proviene del 20% de las causas (o referencias de inventario).',
    difficulty: 'intermedio'
  },
  {
    id: 73,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Cuál de las siguientes directrices de gestión y control es la más indicada para los artículos clasificados en la categoría A?',
    options: [
      'Conteos cíclicos con alta frecuencia, pronósticos rigurosos, seguimiento estricto de discrepancias y revisión continua de niveles de stock',
      'Conteos visuales semestrales aproximados y órdenes de compra anuales masivas',
      'Delegación completa de compras en operarios de línea sin registro contable',
      'Adquisición de lotes sobredimensionados para prescindir de controles de calidad'
    ],
    correctAnswer: 'Conteos cíclicos con alta frecuencia, pronósticos rigurosos, seguimiento estricto de discrepancias y revisión continua de niveles de stock',
    explanation: 'Los ítems A concentran el 70-80% de la inversión de capital, por lo que requieren el mayor esfuerzo analítico, registros exactos, cálculo continuo de parámetros y auditorías periódicas.',
    difficulty: 'avanzado'
  },
  {
    id: 74,
    type: 'true_false',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Verdadero o Falso? En un inventario estándar, los artículos de la Clase C suelen representar cerca del 50% de las referencias totales en catálogo (SKUs), pero solo acumulan entre el 5% y el 10% del valor monetario total.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. La Clase C concentra una enorme cantidad de referencias de bajo costo individual que, en conjunto, representan una fracción reducida del capital invertido.',
    difficulty: 'avanzado'
  },
  {
    id: 75,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Qué matriz bidimensional se utiliza en la gestión moderna de bodegas para cruzar el valor económico de las existencias con la velocidad o frecuencia de rotación de los artículos?',
    options: [
      'Matriz ABC - FMS (Fast, Medium, Slow movers)',
      'Algoritmo de Floyd-Warshall para ruteo de carga',
      'Matriz BCG de crecimiento-participación de marca',
      'Diagrama de Ishikawa para control de calibración'
    ],
    correctAnswer: 'Matriz ABC - FMS (Fast, Medium, Slow movers)',
    explanation: 'La matriz ABC-FMS combina el valor del consumo anual (ABC) con la velocidad de movimiento físico (FMS), permitiendo optimizar tanto las políticas de compras como la ubicación de slotting en bodega.',
    difficulty: 'experto'
  },
  {
    id: 76,
    type: 'true_false',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Verdadero o Falso? En el análisis XYZ complementario al ABC, los artículos del grupo Z se caracterizan por presentar una demanda constante y sumamente predecible sin variabilidad.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. En el análisis de predictibilidad XYZ, los artículos X tienen demanda constante y muy predecible; los Y presentan fluctuaciones estacionales regulares; y los Z tienen demanda esporádica e impredecible.',
    difficulty: 'experto'
  },
  {
    id: 77,
    type: 'short_answer',
    category: 'tipos_caracteristicas',
    categoryLabel: 'Tipos y Características',
    prompt: '¿Qué sigla en inglés (3 letras) identifica la unidad mínima de referencia de inventario que distingue a un artículo por talla, color, marca o presentación única en catálogo?',
    correctAnswer: 'SKU',
    acceptableAnswers: ['SKU', 'sku', 'stock keeping unit', 'unidad de mantenimiento de existencias', 'unidad de mantenimiento de existencias sku'],
    explanation: 'SKU (Stock Keeping Unit) es el código alfanumérico único asignado a cada producto o variante individual dentro del sistema de administración de almacenes.',
    difficulty: 'intermedio'
  },
  {
    id: 78,
    type: 'multiple_choice',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: 'Para los artículos de la Clase C de bajo costo unitario (ej. tornillería básica, arandelas), ¿cuál es la estrategia más costo-eficiente para su administración?',
    options: [
      'Sistemas de control visual simplificado (como el sistema de dos cajones o Two-Bin) y pedidos de lotes amplios para minimizar costos de gestión',
      'Auditorías diarias con pesaje de cada unidad en balanza analítica',
      'Negociación de contratos futuros en bolsas internacionales de commodities',
      'Mantenimiento de stocks de seguridad cero con despacho aéreo urgente'
    ],
    correctAnswer: 'Sistemas de control visual simplificado (como el sistema de dos cajones o Two-Bin) y pedidos de lotes amplios para minimizar costos de gestión',
    explanation: 'Para la Clase C, el costo administrativo de un control estricto superaría el valor de los artículos. Se recomiendan métodos simples, compras por volumen y revisiones visuales periódicas.',
    difficulty: 'avanzado'
  },
  {
    id: 79,
    type: 'true_false',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Verdadero o Falso? Un artículo con costo unitario de 5 dólares cuya escasez obligaría a detener una turbina termoeléctrica debe ser gestionado bajo las mismas directrices de bajo esfuerzo aplicadas a la Clase C ordinaria.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. Aunque su valor monetario sea bajo, la criticidad de falla es extrema. El análisis multicriterio lo reclasifica como insumo estratégico con máximas garantías de disponibilidad.',
    difficulty: 'avanzado'
  },
  {
    id: 80,
    type: 'short_answer',
    category: 'clasificacion_abc',
    categoryLabel: 'Clasificación ABC de Inventarios',
    prompt: '¿Cómo se denomina el tradicional sistema visual de control de reabastecimiento donde se utiliza un compartimiento de consumo activo y un segundo compartimiento de reserva cuyo uso dispara el pedido?',
    correctAnswer: 'sistema de dos cajones',
    acceptableAnswers: ['sistema de dos cajones', 'dos cajones', 'two bin', 'sistema two bin', 'metodo de dos cajones', 'sistema de doble compartimiento', 'two-bin system'],
    explanation: 'El sistema Two-Bin (dos cajones) es un método de reorden visual donde la reserva del segundo cajón cubre la demanda durante el tiempo de entrega mientras llega el nuevo pedido.',
    difficulty: 'avanzado'
  },

  // --- EXACTITUD DE REGISTROS, CONTEO CÍCLICO Y KPIS ---
  {
    id: 81,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿Qué mide específicamente el indicador logístico IRA (Inventory Record Accuracy o Exactitud del Registro de Inventario)?',
    options: [
      'El porcentaje de referencias o SKUs donde el conteo físico real coincide con las existencias registradas en el sistema informático (dentro de tolerancias permitidas)',
      'La tasa de depreciación contable de los edificios y bodegas comerciales',
      'La cantidad de kilómetros recorridos por unidad de combustible en la flota logística',
      'El margen comercial bruto obtenido antes de pagar comisiones de venta'
    ],
    correctAnswer: 'El porcentaje de referencias o SKUs donde el conteo físico real coincide con las existencias registradas en el sistema informático (dentro de tolerancias permitidas)',
    explanation: 'El IRA refleja la confiabilidad del sistema de información. Un registro inexacto induce a compras innecesarias, roturas inesperadas y fallas en la planificación de la producción.',
    difficulty: 'avanzado'
  },
  {
    id: 82,
    type: 'short_answer',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿Cómo se denomina la metodología de auditoría continua en la que se cuenta un número predeterminado de artículos cada día a lo largo del año sin suspender las operaciones del almacén?',
    correctAnswer: 'conteo ciclico',
    acceptableAnswers: ['conteo ciclico', 'conteos ciclicos', 'inventario ciclico', 'cycle counting', 'recuento ciclico'],
    explanation: 'El conteo cíclico (Cycle Counting) audita de forma continua diferentes grupos de ítems según su criticidad y clasificación ABC, manteniendo la exactitud de los registros permanentemente.',
    difficulty: 'avanzado'
  },
  {
    id: 83,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿Cuál es la principal ventaja operativa del conteo cíclico continuo frente al inventario físico general anual tradicional?',
    options: [
      'Permite detectar y corregir las causas raíz de las discrepancias en tiempo real sin requerir el cierre o paralización de las operaciones comerciales de la empresa',
      'Exonera a la empresa de presentar estados financieros auditados a los organismos tributarios',
      'Garantiza que el valor contable de los inventarios se revalúe automáticamente al alza cada trimestre',
      'Elimina la necesidad de utilizar lectores de códigos de barras o terminales de radiofrecuencia'
    ],
    correctAnswer: 'Permite detectar y corregir las causas raíz de las discrepancias en tiempo real sin requerir el cierre o paralización de las operaciones comerciales de la empresa',
    explanation: 'El inventario anual solo revela errores meses después de ocurridos y paraliza la planta. El conteo cíclico previene la acumulación de distorsiones y fomenta la mejora continua de procesos.',
    difficulty: 'avanzado'
  },
  {
    id: 84,
    type: 'true_false',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿Verdadero o Falso? En un plan riguroso de conteo cíclico, los artículos Clase A deben programarse para ser auditados con mayor frecuencia (ej. mensual o bimensual) que los artículos Clase C.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. Al enfocar la frecuencia de auditoría en los artículos de mayor valor (A), se asegura el control estricto de la mayor parte del capital con un uso eficiente del personal.',
    difficulty: 'intermedio'
  },
  {
    id: 85,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿Cómo se define formalmente el índice de Rotación de Inventarios (Inventory Turnover Ratio) para un período contable anual?',
    options: [
      'Costo de las Mercancías Vendidas (CMV) dividido entre el Inventario Promedio valorizado al costo',
      'Ingresos brutos por ventas multiplicados por la cantidad física de unidades en bodega',
      'Utilidad neta después de impuestos dividida entre el valor de las compras del último mes',
      'Inventario final disponible restado de los gastos operativos de almacenamiento'
    ],
    correctAnswer: 'Costo de las Mercancías Vendidas (CMV) dividido entre el Inventario Promedio valorizado al costo',
    explanation: 'La rotación de inventarios mide cuántas veces se renueva y comercializa el inventario en el año: Rotación = CMV / Inventario Promedio (ambos medidos consistentemente al costo).',
    difficulty: 'avanzado'
  },
  {
    id: 86,
    type: 'short_answer',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: 'Si una empresa presenta un Costo de Mercancías Vendidas anual de $2.400.000 USD y mantiene un inventario promedio de $200.000 USD, ¿cuál es su índice anual de rotación de inventarios?',
    correctAnswer: '12',
    acceptableAnswers: ['12', '12 veces', '12 rotaciones', 'doce', '12 veces al ano'],
    explanation: 'Rotación = CMV / Inventario Promedio = $2.400.000 / $200.000 = 12 veces al año (el inventario se renueva en promedio una vez cada mes).',
    difficulty: 'avanzado'
  },
  {
    id: 87,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: 'Si una compañía registra una rotación de inventarios de 4 veces al año, ¿a cuántos Días de Venta de Inventario (DSI o Días de Cobertura) equivale aproximadamente considerando un año comercial de 360 días?',
    options: [
      '90 días',
      '45 días',
      '180 días',
      '30 días'
    ],
    correctAnswer: '90 días',
    explanation: 'DSI (Días de Inventario) = 360 días / Rotación = 360 / 4 = 90 días de ventas respaldadas en inventario.',
    difficulty: 'avanzado'
  },
  {
    id: 88,
    type: 'true_false',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿Verdadero o Falso? Perseguir una rotación de inventarios extremadamente alta nunca genera efectos negativos ni riesgos sobre la rentabilidad operativa de la empresa.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. Una rotación forzada a niveles excesivos puede dejar a la empresa sin stock de seguridad, provocando roturas recurrentes, pérdidas de ventas, sobrecostos de fletes urgentes y pérdida de clientes.',
    difficulty: 'experto'
  },
  {
    id: 89,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: 'El indicador GMROI (Gross Margin Return on Investment) es crucial en la gestión empresarial de retail e inventarios. ¿Qué evalúa concretamente este indicador?',
    options: [
      'El margen de ganancia bruta obtenido por cada peso o dólar monetario invertido en inventario promedio',
      'La rentabilidad neta de la maquinaria industrial por hora de trabajo continuo',
      'La rotación de las cuentas comerciales por cobrar a clientes morosos',
      'El porcentaje de merma física originado por evaporación natural en silos'
    ],
    correctAnswer: 'El margen de ganancia bruta obtenido por cada peso o dólar monetario invertido en inventario promedio',
    explanation: 'GMROI = Margen Bruto Total / Costo Promedio del Inventario. Mide la productividad financiera del capital atado a las mercancías.',
    difficulty: 'experto'
  },
  {
    id: 90,
    type: 'short_answer',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Qué término técnico en inglés (comenzando por "S") o en español designa la pérdida o merma desconocida de inventario originada por hurto, averías no registradas o errores de conteo?',
    correctAnswer: 'shrinkage',
    acceptableAnswers: ['shrinkage', 'merma', 'merma de inventario', 'perdida desconocida', 'shrink', 'mermas'],
    explanation: 'El Shrinkage o merma desconocida es la diferencia negativa entre el inventario contable y el inventario físico real resultante de hurtos, daños u omisiones operativas.',
    difficulty: 'avanzado'
  },

  // --- EFECTO LÁTIGO, JIT, COLABORACIÓN Y CONTROL ESTRATÉGICO ---
  {
    id: 91,
    type: 'multiple_choice',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística de Inventarios',
    prompt: '¿Qué fenómeno logístico describe el "Efecto Látigo" (Bullwhip Effect) en las redes de suministro?',
    options: [
      'La creciente amplificación de la variabilidad en los pedidos a medida que se asciende aguas arriba desde el cliente final hacia los fabricantes y proveedores de materia prima',
      'La depreciación acelerada de los activos vehiculares provocada por el mal estado de las vías',
      'El incremento brusco en las tasas aduaneras de importación en puertos secos',
      'La reducción progresiva del precio de venta al consumidor final debido a economías de escala'
    ],
    correctAnswer: 'La creciente amplificación de la variabilidad en los pedidos a medida que se asciende aguas arriba desde el cliente final hacia los fabricantes y proveedores de materia prima',
    explanation: 'Pequeñas fluctuaciones en la demanda del consumidor final se transforman en oscilaciones dramáticas de pedidos e inventarios en los eslabones superiores de la cadena.',
    difficulty: 'experto'
  },
  {
    id: 92,
    type: 'true_false',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística de Inventarios',
    prompt: '¿Verdadero o Falso? Entre los causantes comprobados del Efecto Látigo se destacan la colocación de pedidos por lotes grandes (batch ordering) y los juegos de escasez o racionamiento.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. La actualización individual de pronósticos, pedidos en lotes grandes, fluctuaciones artificiales de precios y pedidos exagerados ante escasez percibida son los detonantes clásicos del efecto látigo.',
    difficulty: 'experto'
  },
  {
    id: 93,
    type: 'short_answer',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística de Inventarios',
    prompt: '¿Qué sigla en inglés (3 letras) designa el modelo de integración logística en el que el proveedor asume la responsabilidad de vigilar los niveles de stock y reabastecer al comprador?',
    correctAnswer: 'VMI',
    acceptableAnswers: ['VMI', 'vmi', 'vendor managed inventory', 'inventario administrado por el proveedor', 'inventario gestionado por el proveedor'],
    explanation: 'En VMI (Vendor Managed Inventory), el proveedor cuenta con visibilidad directa del inventario y ventas del cliente para programar de forma óptima el reabastecimiento continuo.',
    difficulty: 'avanzado'
  },
  {
    id: 94,
    type: 'multiple_choice',
    category: 'concepcion_logistica',
    categoryLabel: 'Concepción Logística de Inventarios',
    prompt: '¿En qué consiste legal y financieramente el modelo de "Inventario en Consignación" (Consignment Stock)?',
    options: [
      'Los materiales están físicamente en el almacén del cliente, pero la propiedad y el costo de capital siguen en cabeza del proveedor hasta que son consumidos o comercializados',
      'El comprador adquiere la totalidad de las existencias con pago anticipado y asume todos los riesgos de obsolescencia de inmediato',
      'Los bienes son donados a entidades gubernamentales para deducir impuestos de renta',
      'El proveedor prohíbe al cliente utilizar los materiales hasta que transcurran seis meses de su recepción'
    ],
    correctAnswer: 'Los materiales están físicamente en el almacén del cliente, pero la propiedad y el costo de capital siguen en cabeza del proveedor hasta que son consumidos o comercializados',
    explanation: 'El inventario en consignación reduce el capital de trabajo del comprador a la vez que garantiza al proveedor disponibilidad inmediata en el punto de consumo.',
    difficulty: 'experto'
  },
  {
    id: 95,
    type: 'true_false',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Verdadero o Falso? En la filosofía de manufactura Just-In-Time (JIT / Lean), el exceso de inventario se concibe como un amortiguador deseable que protege a la empresa contra defectos de calidad.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Falso',
    explanation: 'Falso. JIT considera el inventario acumulado como un desperdicio (muda) que oculta los problemas reales de proceso (averías, mala calidad, desajustes de tiempos). Reducir el inventario obliga a corregir las causas de fondo.',
    difficulty: 'avanzado'
  },
  {
    id: 96,
    type: 'short_answer',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Qué palabra japonesa (originaria del sistema Toyota y que traduce "tarjeta" o "letrero visual") nombra la herramienta empleada para autorizar el movimiento o producción de lotes en un sistema Pull?',
    correctAnswer: 'kanban',
    acceptableAnswers: ['kanban', 'tarjeta kanban', 'sistema kanban'],
    explanation: 'Kanban es un sistema de señales visuales que sincroniza la producción y el reabastecimiento en función del consumo real aguas abajo, impidiendo la sobreproducción.',
    difficulty: 'intermedio'
  },
  {
    id: 97,
    type: 'multiple_choice',
    category: 'actividades_procesos',
    categoryLabel: 'Actividades y Procesos de Inventario',
    prompt: '¿En qué consiste la técnica logística de distribución conocida como "Cross-docking"?',
    options: [
      'Transferir la mercancía directamente desde los vehículos de recepción entrantes hacia los vehículos de despacho salientes, minimizando o eliminando el tiempo de permanencia y almacenamiento',
      'Acomodar los pallets en forma de cruz sobre las estanterías metálicas para optimizar la ventilación de silos',
      'Transportar mercancías únicamente a través de embarcaciones de carga fluvial',
      'Inspeccionar el 100% de los paquetes mediante rayos gamma antes de ingresarlos a bodega'
    ],
    correctAnswer: 'Transferir la mercancía directamente desde los vehículos de recepción entrantes hacia los vehículos de despacho salientes, minimizando o eliminando el tiempo de permanencia y almacenamiento',
    explanation: 'El Cross-docking consolida y distribuye pedidos en tránsito sin requerir acomodo en racks ni costos de almacenaje de larga estancia, acelerando drásticamente el flujo de productos.',
    difficulty: 'avanzado'
  },
  {
    id: 98,
    type: 'true_false',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: '¿Verdadero o Falso? Bajo las Normas Internacionales de Información Financiera (NIIF / NIC 2), el método contable de valoración de inventarios UEPS (Últimas en Entrar, Primeras en Salir / LIFO) está expresamente prohibido.',
    options: ['Verdadero', 'Falso'],
    correctAnswer: 'Verdadero',
    explanation: 'Verdadero. La Norma Internacional de Contabilidad 2 (NIC 2) prohíbe el método UEPS/LIFO debido a que no refleja el flujo físico real de la mayoría de bienes y subvalora el inventario en balance general frente a precios corrientes.',
    difficulty: 'experto'
  },
  {
    id: 99,
    type: 'multiple_choice',
    category: 'control_obsolescencia',
    categoryLabel: 'Control y Obsolescencia',
    prompt: 'Cuando la empresa identifica inventario de movimiento nulo o "stock muerto" (dead stock), ¿cuál es el curso de acción gerencial aconsejado antes de proceder con su castigo y baja contable definitiva?',
    options: [
      'Explorar estrategias de liquidación rápida, tales como promociones con descuento, ventas en lote a canales secundarios, acuerdos de devolución/canje con proveedores o reacondicionamiento',
      'Reclasificar contablemente las pérdidas como gastos de investigación y desarrollo sin informar a auditoría',
      'Comprar más unidades del mismo artículo para promediar a la baja el valor unitario en libros',
      'Destruir físicamente las mercancías sin documentar la baja para evitar auditorías fiscales'
    ],
    correctAnswer: 'Explorar estrategias de liquidación rápida, tales como promociones con descuento, ventas en lote a canales secundarios, acuerdos de devolución/canje con proveedores o reacondicionamiento',
    explanation: 'Antes de declarar la pérdida total, la empresa debe intentar recuperar liquidez y liberar espacio físico mediante canales de descuento, acuerdos con proveedores o reutilización de partes.',
    difficulty: 'avanzado'
  },
  {
    id: 100,
    type: 'short_answer',
    category: 'sistemas_modelos',
    categoryLabel: 'Sistemas y Modelos de Inventarios',
    prompt: '¿Qué sigla en inglés (3 letras) nombra los sistemas de software de Planificación de Requerimientos de Materiales que calculan las órdenes de reabastecimiento dependiente a partir del MPS y el BOM?',
    correctAnswer: 'MRP',
    acceptableAnswers: ['MRP', 'mrp', 'material requirements planning', 'mrp i', 'planificacion de requerimientos de materiales'],
    explanation: 'MRP (Material Requirements Planning) calcula las necesidades netas de componentes en el tiempo, desglosando el plan maestro de producción y coordinando órdenes de compra y órdenes de fabricación.',
    difficulty: 'avanzado'
  }
];

export function getRandomEvaluationQuestions(count: number = 20): Question[] {
  // Shuffle array using Fisher-Yates algorithm
  const shuffled = [...QUESTIONS_DATABASE];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

export function evaluateAnswer(question: Question, rawUserAnswer: string): boolean {
  if (!rawUserAnswer || rawUserAnswer.trim() === '') return false;
  const cleaned = rawUserAnswer.trim();

  if (question.type === 'multiple_choice' || question.type === 'true_false') {
    return cleaned.toLowerCase() === String(question.correctAnswer).toLowerCase();
  }

  if (question.type === 'short_answer') {
    const normalizedInput = cleanTextForComparison(cleaned);
    const normalizedCorrect = cleanTextForComparison(String(question.correctAnswer));

    if (normalizedInput === normalizedCorrect) return true;

    if (question.acceptableAnswers && question.acceptableAnswers.length > 0) {
      return question.acceptableAnswers.some(ans => cleanTextForComparison(ans) === normalizedInput);
    }
  }

  return false;
}

function cleanTextForComparison(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"']/g, '') // remove punctuation
    .replace(/\s+/g, ' ')
    .trim();
}
