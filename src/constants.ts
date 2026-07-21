export const SUPERVISORES = [
  'Casanobas Jorge',
  'Cocco Ruben',
  'Cottitto Carlos',
  'De Crudis Brian',
  'Desabre Daniel',
  'Fonteñez Fernando',
  'Gonzalez Gaston',
  'Guillen Julian',
  'Juliano Mario',
  'Lucero Roberto',
  'Petrizzo Gonzalo',
  'Quinteros Daniel',
  'Romero Javier',
  'Torres Rodrigo',
  'Urundo Juan Carlos',
];

export const SUPERVISOR_PASSWORDS: Record<string, string> = {
  'Casanobas Jorge': 'casanobas123',
  'Cocco Ruben': 'cocco123',
  'Cottitto Carlos': 'cottitto123',
  'De Crudis Brian': 'decrudis123',
  'Desabre Daniel': 'desabre123',
  'Fonteñez Fernando': 'fontez123',
  'Gonzalez Gaston': 'gonzalez123',
  'Guillen Julian': 'guillen123',
  'Juliano Mario': 'juliano123',
  'Lucero Roberto': 'lucero123',
  'Petrizzo Gonzalo': 'petrizzo123',
  'Quinteros Daniel': 'quinteros123',
  'Romero Javier': 'romero123',
  'Torres Rodrigo': 'torres123',
  'Urundo Juan Carlos': 'urundo123',
};

export const CLIENTES = [
  'Banco Coinag',
  'Banco Columbia',
  'Banco Credicoop',
  'Banco de Santa Fe',
  'Banco del Sol',
  'Banco Galicia',
  'Banco La Pampa',
  'Banco Neuquén',
  'Banco Patagonia',
  'Banco Saenz',
  'C.A.S.I.',
  'CABAL',
  'I.M.F.C.',
];

export const SUCURSALES = [
  'Depósito Munro',
  'Maipú 66',
  'Rivadavia 611 Piso 3 Call-Center',
  'Rivadavia 611 Piso 4 Gcia. Sistemas',
  'Tucumán 661',
  'Inm. Chilavert 2870',
  'Inm. Segurola 1284',
  'Inm. Galecor',
  'Inm. Country Hebraica',
  'Inm. Varela 1001',
  '001 Centro',
  '002 Núñez',
  '003 Ramos Mejía',
];

export const OBJETIVOS_MAP: Record<string, string[]> = {
  'Banco Credicoop': [
    'Control de acceso',
    'Ronda interna',
    'Ronda perimetral',
    'Atención al cliente',
    'Prevención',
  ],
  'Banco Galicia': [
    'Control de acceso',
    'Ronda interna',
    'Custodia de valores',
    'Prevención',
    'Atención al público',
  ],
  default: [
    'Control de acceso',
    'Ronda interna',
    'Ronda perimetral',
    'Prevención',
    'Custodia',
  ],
};


export const TIPOS_SUPERVISION = [
  'Supervisión completa',
  'Apertura de lobby',
  'Cierre de lobby',
];

// Tipos de supervisión que solo requieren registrar la novedad,
// omitiendo las secciones de auditoría (personal, entrevista y eventos).
export const TIPOS_SOLO_NOVEDAD = ['Apertura de lobby', 'Cierre de lobby'];

export const EVENTOS = [
  'Supervisión espontánea',
  'Aviso de robo',
  'Aviso de prevención',
  'Falta CCTV',
  'Falta 220V',
  'Retiro llave lobby',
  'Retiro llave sucursal',
  'Entrego llave lobby',
  'Entrego llave sucursal',
];

export const ENTREGAS = [
  'Planilla verde',
  'Planilla azul',
  'Planilla blanca',
  'Libro de guardia',
  'Uniforme',
  'Credencial CABA',
  'Credencial PBA',
  'Documentación RRHH',
];
